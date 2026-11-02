import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { setRef } from "./set-ref.mjs";

// Builds a one-item registry in a temp dir; returns the result and the rewritten dependencies.
function run(registryDependencies, ref = "v1.0.0") {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "set-ref-"));
  fs.mkdirSync(path.join(root, "components"));
  fs.writeFileSync(path.join(root, "registry.json"), JSON.stringify({ include: ["components/registry.json"] }, null, 2) + "\n");
  const layer = path.join(root, "components", "registry.json");
  fs.writeFileSync(layer, JSON.stringify({ items: [{ name: "components/x", registryDependencies }] }, null, 2) + "\n");
  const result = setRef(root, ref);
  const text = fs.readFileSync(layer, "utf8");
  return { result, text, deps: JSON.parse(text).items[0].registryDependencies };
}

test("rewrites own dependency to the given tag", () => {
  const { deps, text } = run(["bstBizEra/ui-library/icons/flag#abc"]);
  assert.deepEqual(deps, ["bstBizEra/ui-library/icons/flag#v1.0.0"]);
  assert.ok(text.endsWith("}\n"));
});

test("adds a ref when missing", () => {
  assert.deepEqual(run(["bstBizEra/ui-library/icons/flag"]).deps, ["bstBizEra/ui-library/icons/flag#v1.0.0"]);
});

test("leaves third-party pins alone", () => {
  const third = ["acme/ui/button#" + "a".repeat(40), "button"];
  assert.deepEqual(run(third).deps, third);
});

test("returns the number changed", () => {
  const { result } = run(["bstBizEra/ui-library/a#v1.0.0", "bstBizEra/ui-library/b", "bstBizEra/ui-library/c#x", "button"]);
  assert.deepEqual(result, { changed: 2 });
});
