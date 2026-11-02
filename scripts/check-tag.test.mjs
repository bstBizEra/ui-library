import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { checkTag, TAG_FILES } from "./check-tag.mjs";

function fixture(tag) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "tag-"));
  for (const f of TAG_FILES) {
    fs.mkdirSync(path.dirname(path.join(root, f)), { recursive: true });
    fs.writeFileSync(path.join(root, f), `add bstBizEra/ui-library/x#${tag} and #${tag}\n`);
  }
  return root;
}

test("passes when every file names the tag", () => {
  assert.deepEqual(checkTag(fixture("v1.2.3"), "v1.2.3"), { ok: true, message: "release tag v1.2.3 is consistent" });
});

test("fails naming the file that has another tag", () => {
  const root = fixture("v1.2.3");
  fs.writeFileSync(path.join(root, "AGENTS.md"), "add x#v1.0.0\n");
  const r = checkTag(root, "v1.2.3");
  assert.equal(r.ok, false);
  assert.match(r.message, /AGENTS\.md.*v1\.0\.0/);
  assert.ok(!r.message.includes("README.md"));
});

test("rejects a malformed tag", () => {
  assert.equal(checkTag(fixture("v1.2.3"), "1.2").ok, false);
});
