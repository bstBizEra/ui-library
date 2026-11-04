// Copies every registry item into the portal where the shadcn CLI would install it,
// and writes lib/items.json (metadata for the shell) from the same registry files CATALOG.md uses.
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { describe } from "../../scripts/catalog.mjs"

const portal = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const root = path.resolve(portal, "..")
const tag = execFileSync("git", ["describe", "--tags", "--abbrev=0"], { cwd: root, encoding: "utf8" }).trim()

const items = []
for (const inc of JSON.parse(fs.readFileSync(path.join(root, "registry.json"), "utf8")).include) {
  const layerDir = path.join(root, path.dirname(inc))
  for (const item of JSON.parse(fs.readFileSync(path.join(root, inc), "utf8")).items) {
    for (const file of item.files ?? []) {
      // registry:ui lands in components/ui, everything else in components (shadcn CLI default aliases).
      const dest = path.join(portal, "components", file.type === "registry:ui" ? "ui" : "", path.basename(file.path))
      fs.copyFileSync(path.join(layerDir, file.path), dest)
    }
    const d = describe(item, layerDir)
    items.push({
      name: item.name,
      slug: item.name.split("/").pop(),
      layer: path.dirname(inc),
      title: item.title,
      description: item.description,
      kind: d.kind,
      source: d.source,
      licence: d.licence,
      dependencies: item.dependencies ?? [],
      registryDependencies: (item.registryDependencies ?? []).map((r) => r.replace(/^bstBizEra\/ui-library\//, "").replace(/#.*$/, "")),
      install: `npx shadcn@latest add bstBizEra/ui-library/${item.name}#${tag}`,
    })
  }
}

fs.writeFileSync(path.join(portal, "lib", "items.json"), JSON.stringify({ tag, items }, null, 2) + "\n")
console.log(`synced ${items.length} items at ${tag}`)

// An item with no demo entry would show in the nav and 404, so stop the build instead.
const demosSource = fs.readFileSync(path.join(portal, "demos", "index.tsx"), "utf8")
const missing = items.filter((i) => !new RegExp(`^\\s+"?${i.slug}"?: \\{`, "m").test(demosSource)).map((i) => i.slug)
if (missing.length) {
  console.error(`no samples in demos/index.tsx for: ${missing.join(", ")}`)
  process.exit(1)
}
