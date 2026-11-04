# ui-library

A shadcn source registry on GitHub. No build step: the CLI reads `registry.json` and its `include` entries.

```bash
npx shadcn@latest add bstBizEra/ui-library/components/theme-toggle#v1.0.2
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

## License

MIT
