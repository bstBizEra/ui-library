import assert from "node:assert/strict";
import { test } from "node:test";

import { caretAfterDigits, formatLak, formatLakDigits, lakUnitLabel, parseLak } from "../components/lak-amount/lak.ts";

test("formats whole kip with grouping and the kip sign", () => {
  assert.equal(formatLak(1250000), "1,250,000 ₭");
  assert.equal(formatLak(0), "0 ₭");
  assert.equal(formatLakDigits(999), "999");
  assert.equal(formatLakDigits(1000), "1,000");
});

test("writes the unit in Lao on request", () => {
  assert.equal(formatLak(1250000, "lao"), "1,250,000 ກີບ");
  assert.equal(formatLak(1250000, "symbol"), "1,250,000 ₭");
  assert.equal(lakUnitLabel("lao"), "ກີບ");
  assert.equal(lakUnitLabel(), "₭");
});

test("parses typed or pasted text to whole kip", () => {
  assert.equal(parseLak("1250000"), 1250000);
  assert.equal(parseLak("1,250,000 ₭"), 1250000);
  assert.equal(parseLak("1.250.000"), 1250000); // dots are grouping here, never decimals
  assert.equal(parseLak("007"), 7);
  assert.equal(parseLak(""), null);
  assert.equal(parseLak("ກີບ"), null);
  assert.equal(parseLak("-5"), 5); // no negative amounts
});

test("refuses amounts past the safe integer range", () => {
  assert.equal(parseLak("9".repeat(20)), null);
});

test("finds the caret position after the nth digit", () => {
  assert.equal(caretAfterDigits("1,250,000", 0), 0);
  assert.equal(caretAfterDigits("1,250,000", 1), 1);
  assert.equal(caretAfterDigits("1,250,000", 2), 3);
  assert.equal(caretAfterDigits("1,250,000", 7), 9);
});
