import assert from "node:assert/strict";
import { test } from "node:test";

import { formatLaoPhone, formatLaoPhoneNational, laoPhoneDigits, toE164 } from "../components/lao-phone/lao-phone.ts";

test("formats a mobile number as +856 20 xxxx xxxx", () => {
  assert.equal(formatLaoPhone("2055512345"), "+856 20 5551 2345");
  assert.equal(formatLaoPhoneNational("2055512345"), "20 5551 2345");
});

test("formats a landline as +856 <area> xxx xxx", () => {
  assert.equal(formatLaoPhone("21412345"), "+856 21 412 345");
});

test("formats partial input as you type", () => {
  assert.equal(formatLaoPhoneNational("2"), "2");
  assert.equal(formatLaoPhoneNational("205"), "20 5");
  assert.equal(formatLaoPhoneNational("205551"), "20 5551");
  assert.equal(formatLaoPhoneNational("2141"), "21 41");
});

test("reads pasted numbers in any common form", () => {
  assert.equal(laoPhoneDigits("+856 20 5551 2345"), "2055512345");
  assert.equal(laoPhoneDigits("856-20-5551-2345"), "2055512345");
  assert.equal(laoPhoneDigits("020 5551 2345"), "2055512345"); // domestic trunk 0
  assert.equal(laoPhoneDigits("(021) 412 345"), "21412345");
});

test("stops at the length the number type allows", () => {
  assert.equal(laoPhoneDigits("20555123456789"), "2055512345");
  assert.equal(laoPhoneDigits("214123456789"), "21412345");
});

test("gives E.164 only for a complete number", () => {
  assert.equal(toE164("2055512345"), "+8562055512345");
  assert.equal(toE164("21412345"), "+85621412345");
  assert.equal(toE164("20555"), null);
  assert.equal(toE164(""), null);
});
