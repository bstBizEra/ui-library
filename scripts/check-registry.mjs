import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SHA = /^[0-9a-f]{40}$/;
const TAG = /^v\d+\.\d+\.\d+$/;

// Built-in shadcn name: no "/", "@" prefix, "://" or "#".
const isBuiltIn = (d) => !/[/#]/.test(d) && !d.startsWith("@") && !d.includes("://");

function isPinned(d) {
  if (d.startsWith("https://")) {
    const u = new URL(d);
    if (u.hostname === "raw.githubusercontent.com") return /^\/[^/]+\/[^/]+\/[0-9a-f]{40}\//.test(u.pathname);
    return /@\d|\/v\d/.test(u.pathname);
  }
  const ref = d.split("#")[1];
  return ref !== undefined && (SHA.test(ref) || TAG.test(ref));
}

// shortcut: regex scan, not a parser; misses dynamic import() and specifiers in comments/strings.
const IMPORT_RE = /(?:^|[\s;}])(?:import|export)\s*(?:[^"';]*?\sfrom\s*)?["']([^"']+)["']/g;

function pkgName(spec) {
  const parts = spec.split("/");
  return spec.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}

const stripVersion = (d) => d.replace(/(?<=.)@[^/@]*$/, "");

export function checkRegistry(rootDir) {
  const errors = [];
  const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
  const root = readJson(path.join(rootDir, "registry.json"));

  for (const inc of root.include ?? []) {
    const incPath = path.join(rootDir, inc);
    for (const item of readJson(incPath).items ?? []) {
      const err = (rule, msg) => errors.push(`${item.name}: ${rule} ${msg}`);

      for (const d of item.registryDependencies ?? []) {
        if (!isBuiltIn(d) && !isPinned(d)) err("unpinned registry dependency", `"${d}"`);
      }

      const declared = new Set((item.dependencies ?? []).map(stripVersion));
      for (const f of item.files ?? []) {
        if (f.path.includes("\\")) {
          err("backslash in file path", `"${f.path}"`);
          continue;
        }
        const file = path.join(path.dirname(incPath), f.path);
        if (!fs.existsSync(file)) {
          err("missing file", `"${f.path}"`);
          continue;
        }
        const src = fs.readFileSync(file, "utf8");
        if (/^\/\/ Source:/m.test(src)) {
          const first = src.split(/\r?\n/).find((l) => l.trim() !== "");
          if (/^\s*(\/\/|\/\*|\*)/.test(first)) {
            err("header comment before the first statement", `in "${f.path}": the header must come after the imports because the shadcn CLI strips leading comments`);
          }
          if (!/^\/\/ Licence:/m.test(src)) err("vendored file lacks", `a "// Licence:" line in "${f.path}"`);
        }
        for (const [, spec] of src.matchAll(IMPORT_RE)) {
          if (spec.startsWith(".") || spec.startsWith("@/")) continue;
          const name = pkgName(spec);
          if (name === "react" || name === "react-dom" || declared.has(name)) continue;
          err("undeclared import", `"${name}" (add it to dependencies)`);
        }
      }
    }
  }
  return { errors };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { errors } = checkRegistry(process.cwd());
  errors.forEach((e) => console.error(e));
  console.log(errors.length ? `${errors.length} error(s)` : "registry ok");
  process.exit(errors.length ? 1 : 0);
}
