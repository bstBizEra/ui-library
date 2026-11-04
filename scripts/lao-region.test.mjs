import assert from "node:assert/strict";
import { test } from "node:test";

import { LAO_PROVINCES } from "../components/lao-region/lao-regions.ts";
import { matchesLaoRegion, normalizeLaoSearch } from "../components/lao-region/lao-region-search.ts";

const find = (en) => LAO_PROVINCES.find((p) => p.en === en);

test("holds 17 provinces and Vientiane Capital with 148 districts", () => {
  assert.equal(LAO_PROVINCES.length, 18);
  assert.equal(LAO_PROVINCES.reduce((n, p) => n + p.districts.length, 0), 148);
  assert.ok(find("Vientiane Capital"));
  assert.equal(find("Louangphabang").districts.length, 12); // Lao Statistics Bureau count
});

test("finds provinces by English, common spelling, ISO code or Lao", () => {
  const lp = find("Louangphabang");
  assert.ok(matchesLaoRegion(lp, "louang"));
  assert.ok(matchesLaoRegion(lp, "Luang Prabang"));
  assert.ok(matchesLaoRegion(lp, "luangprabang"));
  assert.ok(matchesLaoRegion(lp, "LA-LP"));
  assert.ok(matchesLaoRegion(lp, "ຫຼວງພະບາງ"));
  assert.ok(!matchesLaoRegion(lp, "savan"));
});

test("treats the two ways of writing ຫຼ ໜ ໝ as the same", () => {
  assert.equal(normalizeLaoSearch("ຫລວງ"), normalizeLaoSearch("ຫຼວງ"));
  assert.equal(normalizeLaoSearch("ຫນອງ"), normalizeLaoSearch("ໜອງ"));
  assert.ok(matchesLaoRegion(find("Louangphabang"), "ຫລວງພະບາງ"));
});

test("finds districts by English or Lao", () => {
  const chanthabuly = find("Vientiane Capital").districts.find((d) => d.en === "Chanthabuly");
  assert.ok(matchesLaoRegion(chanthabuly, "chantha"));
  assert.ok(matchesLaoRegion(chanthabuly, "ຈັນທະ"));
  assert.ok(matchesLaoRegion(chanthabuly, ""));
});
