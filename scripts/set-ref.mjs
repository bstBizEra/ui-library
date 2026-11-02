import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OWN = "bstBizEra/ui-library/";
const VALID_REF = /^(v\d+\.\d+\.\d+|[0-9a-f]{40})$/;
const USAGE = "usage: node scripts/set-ref.mjs <ref>   e.g. v1.0.0";

// Pins every same-repo registry dependency to `ref`, so installing at a tag pulls its dependencies from that tag.
export function setRef(rootDir, ref) {
  if (!VALID_REF.test(ref)) throw new Error(`invalid ref "${ref}": expected a tag like v1.0.0 or a 40-hex SHA`);
  let changed = 0;
  const rewrite = (file) => {
    const json = JSON.parse(fs.readFileSync(file, "utf8"));
    let dirty = false;
    for (const item of json.items ?? []) {
      item.registryDependencies = item.registryDependencies?.map((d) => {
        if (!d.startsWith(OWN)) return d;
        const next = `${d.split("#")[0]}#${ref}`;
        if (next !== d) (changed++, (dirty = true));
        return next;
      });
    }
    if (dirty) fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n");
  };
  const rootFile = path.join(rootDir, "registry.json");
  const root = JSON.parse(fs.readFileSync(rootFile, "utf8"));
  rewrite(rootFile);
  for (const inc of root.include ?? []) rewrite(path.join(rootDir, inc));
  return { changed };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    console.log(`${setRef(process.cwd(), process.argv[2] ?? "").changed} entries changed`);
  } catch (e) {
    console.error(`${e.message}\n${USAGE}`);
    process.exit(1);
  }
}
