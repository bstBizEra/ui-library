import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { buildCatalog, checkCatalog } from "./catalog.mjs";

// One house item in components/, one pointer in icons/, one vendored item in blocks/.
function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-"));
  const layers = {
    components: [{ name: "components/a", description: "Use when A.", files: [{ path: "a.tsx" }] }],
    icons: [{ name: "icons/p", description: "Pointer | item.", registryDependencies: ["pqoqubbw/icons/p#abc"] }],
    blocks: [{ name: "blocks/v", description: "Use when V.", files: [{ path: "v.tsx" }] }],
  };
  for (const [layer, items] of Object.entries(layers)) {
    fs.mkdirSync(path.join(root, layer));
    fs.writeFileSync(path.join(root, layer, "registry.json"), JSON.stringify({ items }));
  }
  fs.writeFileSync(path.join(root, "components", "a.tsx"), "export const A = 1;\n");
  fs.writeFileSync(path.join(root, "blocks", "v.tsx"), "// Source: https://x/y\n// Upstream: o/r@abc\n// Licence: MIT (see THIRD_PARTY.md)\nexport const V = 1;\n");
  fs.writeFileSync(path.join(root, "registry.json"), JSON.stringify({ include: ["components/registry.json", "icons/registry.json", "blocks/registry.json"] }));
  return root;
}

test("lists every item under its layer", () => {
  const md = buildCatalog(fixture(), "v1.0.0");
  const iComponents = md.indexOf("## components");
  const iIcons = md.indexOf("## icons");
  const iBlocks = md.indexOf("## blocks");
  assert.ok(iComponents >= 0 && iComponents < iIcons && iIcons < iBlocks);
  assert.ok(md.indexOf("`components/a`") > iComponents && md.indexOf("`components/a`") < iIcons);
  assert.ok(md.indexOf("`blocks/v`") > iBlocks);
  assert.match(md, /\| Item \| Kind \| Use when \| Install \| Source \| Licence \|/);
});

test("marks an item with no files as pointer", () => {
  const md = buildCatalog(fixture(), "v1.0.0");
  assert.match(md, /\| `icons\/p` \| pointer \|/);
  assert.match(md, /pqoqubbw\/icons\/p#abc/);
  assert.match(md, /\| `components\/a` \| house \|/);
  assert.match(md, /\| `blocks\/v` \| vendored \|.*o\/r@abc.*MIT/);
  assert.ok(md.includes("Pointer \\| item"));
});

test("install line uses the tag passed in", () => {
  const md = buildCatalog(fixture(), "v2.3.4");
  assert.match(md, /npx shadcn@latest add bstBizEra\/ui-library\/components\/a#v2\.3\.4/);
  assert.ok(!md.includes("#v1.0.0"));
});

test("stale CATALOG.md is reported", () => {
  const root = fixture();
  assert.equal(checkCatalog(root, "v1.0.0").ok, false);
  fs.writeFileSync(path.join(root, "CATALOG.md"), buildCatalog(root, "v1.0.0"));
  assert.equal(checkCatalog(root, "v1.0.0").ok, true);
  fs.appendFileSync(path.join(root, "CATALOG.md"), "x");
  assert.equal(checkCatalog(root, "v1.0.0").ok, false);
});
