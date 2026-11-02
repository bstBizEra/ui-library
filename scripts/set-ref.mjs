import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OWN = "bstBizEra/ui-library/";

// Pins every same-repo registry dependency to `ref`, so installing at a tag pulls its dependencies from that tag.
export function setRef(rootDir, ref) {
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
  const ref = process.argv[2];
  if (!ref) {
    console.error("usage: node scripts/set-ref.mjs <ref>   e.g. v1.0.0");
    process.exit(1);
  }
  console.log(`${setRef(process.cwd(), ref).changed} entries changed`);
}
