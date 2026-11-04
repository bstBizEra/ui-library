# ui-library

A shadcn source registry on GitHub. No build step: the CLI reads `registry.json` and its `include` entries.

```bash
npx shadcn@latest add bstBizEra/ui-library/components/theme-toggle#v1.4.0
```

Items are named `<layer>/<item>` (for example `components/theme-toggle`). Pin a version with `#<ref>`. See `CATALOG.md` for every item, what it is for and its licence.

Items expect shadcn's `@/lib/utils` (`cn`) from `shadcn init`.

## Install the skill

On another machine or in a cloud session, install the agent skill with `npx skills add bstBizEra/ui-library --skill ui-library -g`.

## Portal

`portal/` is a local Next.js app that shows every item live, each state in light and dark side by side, with its pinned install command. Run `npm install` once in `portal/`, then `npm run serve` (production build on port 3000; `-- --port <n>` to change it). It copies the item files from this repo on every build (`npm run sync`), so it always shows the current files at the latest tag. A new item needs an entry in `portal/demos/index.tsx` listing its states.

## Adding an item

1. Put the file in its layer folder (`icons/`, `components/`, `animation/`, `blocks/`) and add an entry to that layer's `registry.json`. Paths are relative to the layer file. The `description` starts with "Use when" wording: it becomes the catalogue line.
2. Vendored code: add the header comment (`// Source:`, `// Upstream:`, `// Copied:`, `// Licence:`, and `// Local change:` if any) directly after the import block, not at the top of the file: the shadcn CLI strips every comment before a file's first statement or directive, so a leading header would not reach the consumer. `"use client"` stays the first statement. Add an entry in `THIRD_PARTY.md`. `npm run check` fails a vendored file whose header comes first or lacks `// Source:` or `// Licence:`.
3. Run `npm test`, `npm run check` and `npx shadcn@latest registry validate`, then run the entry checks below in a Base UI app and a Radix app (results are recorded under Verification).

### Entry checks

- The item installs by its GitHub address and `npm run build` passes in both apps.
- The installed copy still carries the `// Source:` and `// Licence:` lines (vendored items).
- The browser console has no errors (dev build).
- The item works by keyboard and with a real pointer.
- Lighthouse accessibility scores 100: navigation and snapshot mode, light and dark. Dark runs use an emulated `prefers-color-scheme`.
- The Impeccable detector is clean and the audit has no P0 or P1.

## Releasing

1. Update the tag by hand in `AGENTS.md`, `skills/ui-library/SKILL.md`, the install examples in `README.md`, and the `check` script in `package.json` (both places). `npm run check` runs `scripts/check-tag.mjs` and fails, naming the file, if one of them still has another tag.
2. `node scripts/set-ref.mjs vX.Y.Z` pins same-repo dependencies to the new tag.
3. `node scripts/catalog.mjs vX.Y.Z` regenerates `CATALOG.md`.
4. `npm test`, `npm run check`, `npx shadcn@latest registry validate`.
5. Commit `release: vX.Y.Z`.
6. Tag and push (`git tag vX.Y.Z && git push origin main vX.Y.Z`). This step needs the owner's OK.
7. Reinstall the global skill from the new tag (see "Install the skill").

## Verification

Installed from `f732fd2` in two fresh Next.js apps (shadcn `base-nova` on Base UI, `radix-nova` on Radix) with `npx shadcn@latest add bstBizEra/ui-library/components/locale-switcher#<sha> bstBizEra/ui-library/components/theme-toggle#<sha>`. Both apps build.

### icons/flag and components/locale-switcher

Verified 2026-11-03 against `f732fd2` (library-default modal menu): Base UI ✓, Radix ✓. Menu opens, picking ລາວ updates the label and closes the menu, ArrowDown + Enter picks, ລາວ not clipped in light and dark. Impeccable audit: no P0/P1. Detector: clean. Lighthouse accessibility (desktop): Base UI 100 in all four runs (navigation light/dark, menu-open snapshot light/dark; trigger off-centre, see the known issue below); Radix 100 in navigation light/dark and 94 in the menu-open snapshot (see the known issue below).

**Known issue (Base UI): centred trigger.** With the menu open, Lighthouse can score 96 (`aria-hidden-focus` on six `<span aria-hidden="true" tabindex="0" data-base-ui-focus-guard>` nodes) when the trigger sits over the viewport centre: axe's modal check probes the centre and passes through the backdrop's cut-out over the trigger. 100 was measured with the trigger off-centre; reproduced 2026-11-03 with `@base-ui/react` 1.9.0. Upstream: axe-core#4832, base-ui#5237. Take open-menu snapshots with the trigger off-centre, or waive with this reason.

**Known issue (Radix): menu-open `aria-hidden-focus`.** Radix's modal DropdownMenu sets `aria-hidden` on all content outside the menu, including `<main>`, which holds the still-focusable trigger. axe reports `aria-hidden-focus` (plus `landmark-one-main` and the agentic accessibility-tree audit). The same happens for every shadcn Radix DropdownMenu, so it is waived for this item. `modal={false}` was tried: it fixes Radix but makes Base UI fail on its own focus guards (axe-core#4832), so the default is kept.

### components/theme-toggle

Verified 2026-11-03: Base UI ✓, Radix ✓. `aria-pressed` follows the chosen mode in both apps. Detector: clean. Lighthouse accessibility (desktop): navigation light 100, dark 100 in both apps.

### icons/animated-search

Vendored from lucide-animated (`pqoqubbw/icons`, MIT; see `THIRD_PARTY.md`) because upstream's GitHub registry.json lists `search.tsx` but the file is at `icons/search.tsx`, so `pqoqubbw/icons/search#<sha>` cannot be installed. Verified 2026-11-03 against `72f7f1d`: Base UI ✓, Radix ✓ (installed by GitHub address, `npm run build` passes in both). Hover animation confirmed with a real pointer hover; the svg transform animated in both apps. Impeccable audit 18/20: P0 0, P1 0, P2 2, P3 1. Rendered in an outline `Button` labelled "Search" (icon `aria-hidden`); the icon animates on hover of the whole button (via the `SearchIconHandle` ref). Detector: clean. Lighthouse accessibility (desktop): navigation light 100, dark 100 in both apps. Open P2s: the animation does not honour `prefers-reduced-motion` (wrap the app in `<MotionConfig reducedMotion="user">`) and has no focus cue.

### animation/text-effect

Vendored from Motion Primitives (`ibelick/motion-primitives`, MIT; see `THIRD_PARTY.md`) with one local change: it renders plain text when `prefers-reduced-motion` is set, because upstream ignores it. The preference is read in an effect (state starts `false`), not with `useReducedMotion()`, so the first client render matches the server HTML; with the old hook a Next.js dev console showed a React hydration error for reduced-motion users (reproduced and fixed 2026-11-03). Consequences: reduced-motion users get the animated tree on the server and until hydration (the server HTML starts at opacity 0; the delay was not timed), then plain text; under reduced motion `onAnimationStart` and `onAnimationComplete` do not fire. Verified 2026-11-03 against `a10114e`: Base UI ✓, Radix ✓ (installed by GitHub address, `npm run build` passes in both; the install did not touch `globals.css`). Browser check with emulated reduced motion: `no-preference` animates (per-segment opacity 0, then staggered to 1 over about 0.7 s); `reduce` renders `<h2 class="...">text</h2>` with no child elements at opacity 1, in both apps. Impeccable audit 18/20: P0 0, P1 0, P2 1, P3 2 (server HTML starts hidden until hydration). Detector: clean. Lighthouse accessibility (desktop): navigation light 100, dark 100 in both apps. Re-checked 2026-11-03 in a Next.js 16 dev server with the effect-based fix: `reduce` gives no console errors and `<p>Hello world</p>` with no child elements at opacity 1; `no-preference` gives no console errors and the three spans fade from 0 to 1 within about 0.7 s.

### blocks/hero-centered

Vendored from Tailark (`tailark/blocks`, MIT; see `THIRD_PARTY.md`), dusk hero one. Local changes: header, brand logo strip and screenshot removed (neutral placeholder instead), `<main>` became `<section>`, and buttons use `buttonVariants` on `<a>` so one file works on both bases. Needs Tailwind v4 (it uses v4 utilities), the `button` item (built in) and `lucide-react`. Verified 2026-11-03 against `a10114e`: Base UI ✓, Radix ✓ (installed by GitHub address, `npm run build` passes in both; rendered at `/hero`). Impeccable audit 17/20: P0 0, P1 0, P2 1 (badge arrow hover ignores reduced motion), P3 4. Detector: clean. Lighthouse accessibility (desktop, includes the colour-contrast audit, which passed): navigation light 100, dark 100 in both apps. At 360 px wide there is no horizontal scroll; the buttons are 32 px tall.

### components/dropzone

Vendored from Kibo UI (`shadcnblocks/kibo`, MIT; see `THIRD_PARTY.md`) with three local changes: `getRootProps({ role: "button" })` (react-dropzone's default `role="presentation"` on the focusable root fails axe `presentation-role-conflict`); `aria-hidden="true"` on the inner file input (the button's name was "file upload: No file chosen ..." and went stale); `group` on the root plus `group-hover:text-foreground` on the three `text-muted-foreground` captions (they were 4.34:1 on the hovered button, 12px). Verified 2026-11-03 against `79cde48`: Base UI ✓, Radix ✓ (installed by GitHub address, `npm run build` passes in both). Accessible name is the visible text: "Upload a file Drag and drop or click to upload Accepts image/png less than 1.00MB." before choosing, "ok.png Drag and drop or click to replace" after (checked on `f8411e6`, the same `aria-hidden` code). Keyboard: Tab focuses the root and Enter and Space open the file picker (checked on `f8411e6`). A rejected `.txt` against `image/png` shows "File type must be one of image/png, .png" as text. Caption contrast with the mouse over the control, measured: light 18.16:1, dark 16.28:1, both apps. Lighthouse accessibility (desktop): navigation light 100 in both apps; snapshot with the error on screen and the mouse over the control, light and dark, 100 in both apps (navigation dark and unhovered snapshots were 100 on `f8411e6`). Detector: clean.

Usage: the component only calls `onError` for a rejected file, so render that message yourself:

```tsx
const [error, setError] = useState<string | null>(null)
<Dropzone accept={{ "image/png": [".png"] }} onDrop={() => setError(null)} onError={(e) => setError(e.message)}>
  <DropzoneEmptyState />
  <DropzoneContent />
</Dropzone>
{error ? <p role="alert">{error}</p> : null}
```

### components/data-table

Vendored from tablecn (`sadmann7/tablecn@2d74ac5`, MIT; see `THIRD_PARTY.md`): the 19 files of its `data-table` item for Base UI, with imports rewritten to shadcn aliases, `IconPlaceholder` resolved to lucide icons and `cn` from `@/lib/utils`. **Base UI only.** Upstream's GitHub `registry.json` carries only the Radix files: `npx shadcn@latest add sadmann7/tablecn/data-table#2d74ac5827aa7abf60e334759e38cf7cdcb24d54` installs and builds in a Radix app (checked 2026-11-04) and fails to typecheck in a Base UI app, which is why this item exists. Upstream's hosted Base UI build (`@tablecn/data-table`) is a newer, larger item with no commit to pin, and `table-cn.vercel.app` did not answer from this network.

Verified 2026-11-04 against `216172b`: installed by GitHub address into a fresh Base UI app, all 19 installed files keep their `// Source:` and `// Licence:` lines, and `npm run build` passes with the table rendered on a page. In the portal: empty, filtered (`?status=overdue`, 16 rows, 2 pages) and paginated (`?page=3`, page 3 of 5) states render in light and dark; the toolbar, filters, column view and pager work by keyboard. Lighthouse accessibility (desktop) on the sample frame itself: navigation light 100, dark 100; snapshot with the Status filter open, light 100, dark 100. Detector: clean (only the waived Geist font finding).

Usage:
- Wrap the app in `NuqsAdapter` (`nuqs/adapters/next/app`): page, sorting and filters are read from the URL, so `?status=overdue&page=2` is a shareable view.
- Give every column an explicit `id`. `useDataTable` skips columns without one for sorting and filtering, even when they have an accessor.
- `mode: "client"` filters and pages the `data` you pass; the default `mode: "server"` expects `pageCount` and leaves the query to you.
- Statuses as plain `outline` badges: shadcn's `destructive` badge is 4.0:1 in light mode, under AA.

### components/lak-amount

House item. `LakAmountInput` (controlled, value is whole kip or `null`, optional `max`) and `LakAmount` (read-only text in a `<data>` element), with the formatting in `lib/lak.ts` (`formatLak`, `formatLakDigits`, `parseLak`, `caretAfterDigits`; unit tests in `scripts/lak.test.mjs`). Kip is shown as whole kip grouped with commas and the ₭ sign after the number; every non-digit is dropped on input, so dots and commas in pasted text are read as grouping, never as decimals.

Verified 2026-11-04 in the portal (Base UI), with real keystrokes: typing `1250000` shows `1,250,000` (value `1250000`); typing `9` after the first digit gives `19,250,000` with the caret after the 9; a letter is ignored without moving the caret; pasting `1.250.000 ₭` gives `1,250,000`; with `max={5000000}` a digit that would pass it is refused and the caret stays; clearing gives `null`. Lighthouse accessibility (desktop) on the sample frames: empty, amount, limit and display states, navigation light 100 and dark 100 (8 runs). Detector: clean (source and rendered frames).

`unit="lao"` (added 2026-11-04) writes the unit as `ກີບ` instead of `₭`, in the input's addon and in `LakAmount`, marked `lang="lo"`; `₭` stays the default. Checked in the portal: the input reads `1,250,000` followed by `ກີບ`, and `<LakAmount amount={1250000} unit="lao" />` renders `1,250,000 ກີບ`. Geist has no Lao glyphs, so `ກີບ` falls back to the system Lao font; load a Lao web font in apps that need a fixed look. Lighthouse accessibility on the Lao-unit and display frames: navigation light 100, dark 100.

Not covered: screen readers, and phone keyboards (`inputMode="numeric"` is set but not tried on a device).

### components/lao-phone

House item. `LaoPhoneInput` (controlled; value is the national digits, `onValueChange(digits, e164)` hands back `+8562055512345` once the number is complete, `null` before) with the Lao flag and `+856` in front, and `LaoPhone` (a `tel:` link for a complete number). Logic in `lib/lao-phone.ts` (`formatLaoPhone`, `formatLaoPhoneNational`, `laoPhoneDigits`, `toE164`; unit tests in `scripts/lao-phone.test.mjs`). Needs `icons/flag`.

Number shapes, checked 2026-11-04 against the national numbering plan Lao PDR registered with the ITU ([ITU-T National Numbering Plans: Lao P.D.R.](https://www.itu.int/oth/T0202000075/en), the document posted 2011-02-15):
- **Mobile:** `20` then an 8-digit subscriber number, shown `20 5551 2345`. The NAPT communication of 18 January 2011 records the change from 7 to 8 subscriber digits (for example `+856 20 5 XXX XXX` became `+856 20 55 XXX XXX`).
- **Landline:** a 2-digit area code then 6 digits, shown `21 412 345`. The plan's 1994 communication lists six-digit numbers with area codes 21 (Vientiane), 31, 41, 51, 54 and 71. Any 2-digit code is accepted, since newer provincial codes (23, 34, 36, 38, 61, 64, 74, 81, 84, 86, 88 on Wikipedia's "Telephone numbers in Laos") are not in the ITU document.
- **`030`:** not in the ITU plan. Wikipedia lists `030` as prepaid wireless without a length; operator dialing guides give 9 national digits. It is handled as `30` then 7 digits, shown `30 555 1234`, so such numbers are no longer cut at 8 digits. Treat this shape as unconfirmed until an official source lists it.

The ITU document was last updated in 2011; the plan may have changed since without a new ITU filing.

Verified 2026-11-04 in the portal (Base UI), with real keystrokes: typing `2055512345` shows `20 5551 2345` with E.164 `+8562055512345`; pasting `+856 20 5551 2345`, `856-20-5551-2345` and `020 5551 2345` all give the same digits, `(021) 412 345` gives `21 412 345`; an 11th mobile digit is refused; Backspace after the first `5` gives `20 5512 345` with the caret after `20`, and E.164 goes back to `null`. Lighthouse accessibility (desktop) on the empty, mobile, landline, incomplete and display frames: navigation light 100, dark 100 (10 runs). Detector: clean (source and rendered frames).

The `030` shape (added 2026-11-04) is covered by unit tests only: `030 555 1234` gives `305551234`, shown `+856 30 555 1234`, with E.164 `+856305551234`.

Not covered: screen readers, phone keyboards (`type="tel"` is set but not tried on a device), and browser autofill of `tel-national`.

### components/lao-region

House item. `LaoRegionSelect` (controlled; value is `{ province, district }` as P-codes such as `LA06` and `LA0601`, `null` when empty) shows two linked comboboxes: picking a province scopes and clears the district, and the district field is disabled until a province is chosen. `lang="lo"` puts Lao names and labels first; every option shows both names. Data in `lib/lao-regions.ts` (`LAO_PROVINCES`), search in `lib/lao-region-search.ts` (`matchesLaoRegion`, `normalizeLaoSearch`); unit tests in `scripts/lao-region.test.mjs`.

**Data.** 17 provinces and Vientiane Capital with their 148 districts, from the National Geographic Department of Lao PDR via OCHA and HDX ([COD-AB v01](https://data.humdata.org/dataset/cod-ab-lao), reviewed by OCHA 30 October 2025), licence CC BY-IGO (attribution in `THIRD_PARTY.md`). The district count of every province matches the Lao Statistics Bureau's "Number of Districts, Villages and Households by Provinces" ([LAOSIS](https://laosis.lsb.gov.la/statHtml/statHtml.do?orgId=856&tblId=DT_YEARBOOK_B001&language=en), 2024). Another public dataset (`open-admin-data/laos-administrative-divisions`) has the same 148 total but 7 provinces with different counts, so it was not used. English names keep the source's spelling (Louangphabang, Champasack, Xaignabouly); each province also matches its common spelling (Luang Prabang, Champasak, Sainyabuli…) and its ISO 3166-2 code (LA-LP…), taken from Wikipedia's "Provinces of Laos". The source writes every Lao district name with the abbreviation `ມ.` (district); it is dropped here. Source spellings are kept as published, including oddities such as Vientiane Capital's "Mayparkngum" (Lao ປາກງື່ມ).

**Search.** Case, spaces, hyphens and dots are ignored, and both ways of writing ຫຼ/ຫລ, ໜ/ຫນ and ໝ/ຫມ match, so `luang prabang`, `luangprabang`, `LA-LP`, `ຫຼວງພະບາງ` and `ຫລວງພະບາງ` all find Louangphabang.

**shadcn combobox trigger.** shadcn's `ComboboxInput` draws its chevron as a button with no accessible name (axe `button-name`, Lighthouse 94). This item draws the same chevron itself, labelled ("Show provinces" / "ສະແດງແຂວງ") and out of the tab order; keyboard users open the list from the input with ArrowDown.

Verified 2026-11-04 in the portal (Base UI), with real keystrokes: typing `luang prabang` lists only Louangphabang and Enter picks it (`{"province":"LA06","district":null}`); typing `ຫລວງ` lists the three ຫຼວງ provinces; in Luang Namtha, typing `nam` lists only Namtha; picking Savannakhet afterwards clears the district; the hidden form inputs carry `LA03` and the district code, not JSON. Lighthouse accessibility (desktop) on the empty, picked, Lao and province-only frames: navigation light 100, dark 100 (8 runs). Detector: clean (source and rendered frames).

**Known issue (Base UI): list-open `aria-hidden-focus`.** While a list is open, Base UI's focus manager sets `aria-hidden` on everything outside the field and its list for a typeable combobox (`markOthers` with `ariaHidden: modal || isUntrappedTypeableCombobox`, whatever `modal` is set to), so another focusable field on the page is reported: with the district list open and a province already chosen, a snapshot scores 96; with the province list open and the district disabled, 100. Every shadcn Base UI combobox does this; waived with this reason, not filed upstream yet.

Not covered: screen readers and phone keyboards; villages (the source has none at this level).

## License

MIT
