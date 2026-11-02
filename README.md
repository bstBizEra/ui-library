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

## License

MIT
