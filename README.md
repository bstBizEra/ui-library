# ui-library

A shadcn source registry on GitHub. No build step: the CLI reads `registry.json` and its `include` entries.

```bash
npx shadcn@latest add bstBizEra/ui-library/components/theme-toggle
```

Items are named `<layer>/<item>` (for example `components/theme-toggle`). Pin a version with `#<ref>`.

## Verification

Installed from `f732fd2` in two fresh Next.js apps (shadcn `base-nova` on Base UI, `radix-nova` on Radix) with `npx shadcn@latest add bstBizEra/ui-library/components/locale-switcher#<sha> bstBizEra/ui-library/components/theme-toggle#<sha>`. Both apps build.

### icons/flag and components/locale-switcher

Verified 2026-11-03 against `f732fd2` (library-default modal menu): Base UI ✓, Radix ✓. Menu opens, picking ລາວ updates the label and closes the menu, ArrowDown + Enter picks, ລາວ not clipped in light and dark. Impeccable audit: no P0/P1. Detector: clean. Lighthouse accessibility (desktop): Base UI 100 in all four runs (trigger off-centre) (navigation light/dark, menu-open snapshot light/dark); Radix 100 in navigation light/dark and 94 in the menu-open snapshot (see the known issue below).

**Known issue (Base UI): centred trigger.** With the menu open, Lighthouse can score 96 (`aria-hidden-focus` on six `<span aria-hidden="true" tabindex="0" data-base-ui-focus-guard>` nodes) when the trigger sits over the viewport centre: axe's modal check probes the centre and passes through the backdrop's cut-out over the trigger. 100 was measured with the trigger off-centre; reproduced 2026-11-03 with `@base-ui/react` 1.9.0. Upstream: axe-core#4832, base-ui#5237. Take open-menu snapshots with the trigger off-centre, or waive with this reason.

**Known issue (Radix): menu-open `aria-hidden-focus`.** Radix's modal DropdownMenu sets `aria-hidden` on all content outside the menu, including `<main>`, which holds the still-focusable trigger. axe reports `aria-hidden-focus` (plus `landmark-one-main` and the agentic accessibility-tree audit). The same happens for every shadcn Radix DropdownMenu, so it is waived for this item. `modal={false}` was tried: it fixes Radix but makes Base UI fail on its own focus guards (axe-core#4832), so the default is kept.

### components/theme-toggle

Verified 2026-11-03: Base UI ✓, Radix ✓. `aria-pressed` follows the chosen mode in both apps. Detector: clean. Lighthouse accessibility (desktop): navigation light 100, dark 100 in both apps.

### icons/animated-search

Vendored from lucide-animated (`pqoqubbw/icons`, MIT; see `THIRD_PARTY.md`) because upstream's GitHub registry.json lists `search.tsx` but the file is at `icons/search.tsx`, so `pqoqubbw/icons/search#<sha>` cannot be installed. Verified 2026-11-03 against `72f7f1d`: Base UI ✓, Radix ✓ (installed by GitHub address, `npm run build` passes in both). Hover animation confirmed with a real pointer hover; the svg transform animated in both apps. Impeccable audit 18/20: P0 0, P1 0, P2 2, P3 1. Rendered in an outline `Button` labelled "Search" (icon `aria-hidden`); the icon animates on hover of the whole button (via the `SearchIconHandle` ref). Detector: clean. Lighthouse accessibility (desktop): navigation light 100, dark 100 in both apps. Open P2s: the animation does not honour `prefers-reduced-motion` (wrap the app in `<MotionConfig reducedMotion="user">`) and has no focus cue.

### animation/text-effect

Vendored from Motion Primitives (`ibelick/motion-primitives`, MIT; see `THIRD_PARTY.md`) with one local change: it renders plain text when `prefers-reduced-motion` is set, because upstream ignores it. Verified 2026-11-03 against `a10114e`: Base UI ✓, Radix ✓ (installed by GitHub address, `npm run build` passes in both; the install did not touch `globals.css`). Browser check with emulated reduced motion: `no-preference` animates (per-word opacity 0, then staggered to 1 over about 0.7 s); `reduce` renders `<h2 class="...">text</h2>` with no child elements at opacity 1, in both apps. Impeccable audit 18/20: P0 0, P1 0, P2 1, P3 2 (server HTML starts hidden until hydration). Detector: clean. Lighthouse accessibility (desktop): navigation light 100, dark 100 in both apps. Audit: `task-7-audit-text-effect.md` (in the workflow repo).

### blocks/hero-centered

Vendored from Tailark (`tailark/blocks`, MIT; see `THIRD_PARTY.md`), dusk hero one. Local changes: header, brand logo strip and screenshot removed (neutral placeholder instead), `<main>` became `<section>`, and buttons use `buttonVariants` on `<a>` so one file works on both bases. Needs the `button` item (built in) and `lucide-react`. Verified 2026-11-03 against `a10114e`: Base UI ✓, Radix ✓ (installed by GitHub address, `npm run build` passes in both; rendered at `/hero`). Impeccable audit 17/20: P0 0, P1 0, P2 1 (badge arrow hover ignores reduced motion), P3 4. Detector: clean. Lighthouse accessibility (desktop, includes the colour-contrast audit, which passed): navigation light 100, dark 100 in both apps. At 360 px wide there is no horizontal scroll; the buttons are 32 px tall.

### components/dropzone

Vendored from Kibo UI (`shadcnblocks/kibo`, MIT; see `THIRD_PARTY.md`) with two local changes: `getRootProps({ role: "button" })` (react-dropzone's default `role="presentation"` on the focusable root fails axe `presentation-role-conflict`; Lighthouse accessibility was 99 before) and `aria-hidden="true"` on the inner file input (the button's accessible name was "file upload: No file chosen ..." and stayed stale after choosing a file). Verified 2026-11-03 against `f8411e6`: Base UI ✓, Radix ✓ (installed by GitHub address, `npm run build` passes in both). Accessible name now is the visible text: "Upload a file Drag and drop or click to upload Accepts image/png less than 1.00MB." before choosing and "ok.png Drag and drop or click to replace" after (Chrome a11y tree, both apps). Keyboard: Tab focuses the root and Enter and Space open the file picker (input `click()` called, real key presses, both apps). A rejected `.txt` against `image/png` shows "File type must be one of image/png, .png" as text. Lighthouse accessibility (desktop), mouse away from the control: navigation light 100, dark 100; snapshot with the error on screen light 100, dark 100, in both apps. Known defect: with the mouse over the control in the light theme, Lighthouse accessibility drops to 95 in both apps (`color-contrast` 4.34:1, 12px `text-muted-foreground` #737373 on the outline Button's `hover:bg-muted` #f5f5f5, needs 4.5:1); dark hover is 100 (Base UI). It comes from the shared Button and theme tokens plus upstream's `text-xs` caption, not from a dropzone-only class, and was not changed. Impeccable audit 17/20 earlier, updated in `task-8-audit.md` (in the workflow repo). Detector: clean.

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
