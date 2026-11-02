import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { checkRegistry } from "./check-registry.mjs";

// Builds a one-item registry in a temp dir and returns its errors.
function run({ registryDependencies, dependencies, source = "export const x = 1;", filePath = "x.tsx" }) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "check-registry-"));
  fs.mkdirSync(path.join(root, "components"));
  fs.writeFileSync(path.join(root, "registry.json"), JSON.stringify({ include: ["components/registry.json"] }));
  const item = { name: "components/x", files: [{ path: filePath, type: "registry:component" }] };
  if (registryDependencies) item.registryDependencies = registryDependencies;
  if (dependencies) item.dependencies = dependencies;
  fs.writeFileSync(path.join(root, "components", "registry.json"), JSON.stringify({ items: [item] }));
  fs.writeFileSync(path.join(root, "components", path.basename(filePath.replaceAll("\\", "/"))), source);
  return checkRegistry(root).errors;
}

test("unpinned GitHub dependency is an error", () => {
  const errors = run({ registryDependencies: ["acme/ui/button"] });
  assert.equal(errors.length, 1);
  assert.match(errors[0], /components\/x/);
  assert.match(errors[0], /unpinned/);
});

test("SHA-pinned dependency passes", () => {
  assert.deepEqual(run({ registryDependencies: ["acme/ui/button#" + "a".repeat(40)] }), []);
});

test("tag-pinned dependency passes", () => {
  assert.deepEqual(run({ registryDependencies: ["acme/ui/button#v1.2.3"] }), []);
});

test("versioned https URL passes, unversioned fails", () => {
  assert.deepEqual(run({ registryDependencies: ["https://x.dev/r/v2/button.json"] }), []);
  assert.equal(run({ registryDependencies: ["https://x.dev/r/button.json"] }).length, 1);
});

test('built-in name "dropdown-menu" passes', () => {
  assert.deepEqual(run({ registryDependencies: ["dropdown-menu"] }), []);
});

test("undeclared lucide-react import is an error", () => {
  const src = 'import { Sun } from "lucide-react";\nimport React from "react";\nimport { cn } from "@/lib/utils";\nimport "./a.css";\n';
  const errors = run({ source: src });
  assert.equal(errors.length, 1);
  assert.match(errors[0], /components\/x/);
  assert.match(errors[0], /lucide-react/);
});

test("declared import passes, including versioned declaration and subpaths", () => {
  const src = 'import { Sun } from "lucide-react";\nexport { a } from "@scope/pkg/sub";\n';
  assert.deepEqual(run({ source: src, dependencies: ["lucide-react@0.400.0", "@scope/pkg"] }), []);
});

test("backslash path is an error", () => {
  const errors = run({ filePath: "sub" + String.fromCharCode(92) + "x.tsx" });
  assert.ok(errors.some((e) => /components\/x/.test(e) && /backslash/.test(e)));
});
