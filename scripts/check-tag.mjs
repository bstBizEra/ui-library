import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Files that pin the release tag by hand (see "Releasing" in README.md).
export const TAG_FILES = ["AGENTS.md", "skills/ui-library/SKILL.md", "README.md", "package.json"];
const TAG = /^v\d+\.\d+\.\d+$/;

export function checkTag(rootDir, tag) {
  if (!TAG.test(tag ?? "")) return { ok: false, message: `not a release tag: "${tag}" (expected vX.Y.Z)` };
  const bad = [];
  for (const f of TAG_FILES) {
    const found = new Set(fs.readFileSync(path.join(rootDir, f), "utf8").match(/\bv\d+\.\d+\.\d+\b/g) ?? []);
    if (!found.has(tag) || found.size > 1) bad.push(`${f} names ${[...found].join(", ") || "no tag"}`);
  }
  return bad.length
    ? { ok: false, message: `release tag mismatch (expected ${tag}): ${bad.join("; ")}` }
    : { ok: true, message: `release tag ${tag} is consistent` };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const r = checkTag(process.cwd(), process.argv[2]);
  (r.ok ? console.log : console.error)(r.message);
  process.exit(r.ok ? 0 : 1);
}
