# ui-library

A shadcn source registry on GitHub. No build step: the CLI reads `registry.json` and its `include` entries.

```bash
npx shadcn@latest add bstBizEra/ui-library/components/theme-toggle
```

Items are named `<layer>/<item>` (for example `components/theme-toggle`). Pin a version with `#<ref>`.

## Verification

Installed from `f732fd2` in two fresh Next.js apps (shadcn `base-nova` on Base UI, `radix-nova` on Radix) with `npx shadcn@latest add bstBizEra/ui-library/components/locale-switcher#<sha> bstBizEra/ui-library/components/theme-toggle#<sha>`. Both apps build.

### icons/flag and components/locale-switcher

Verified 2026-11-03 against `f732fd2` (library-default modal menu): Base UI ✓, Radix ✓. Menu opens, picking ລາວ updates the label and closes the menu, ArrowDown + Enter picks, ລາວ not clipped in light and dark. Impeccable audit: no P0/P1. Detector: clean. Lighthouse accessibility (desktop): Base UI 100 in all four runs (navigation light/dark, menu-open snapshot light/dark); Radix 100 in navigation light/dark and 94 in the menu-open snapshot (see the known issue below).

**Known issue (Radix): menu-open `aria-hidden-focus`.** Radix's modal DropdownMenu sets `aria-hidden` on all content outside the menu, including `<main>`, which holds the still-focusable trigger. axe reports `aria-hidden-focus` (plus `landmark-one-main` and the agentic accessibility-tree audit). The same happens for every shadcn Radix DropdownMenu, so it is waived for this item. `modal={false}` was tried: it fixes Radix but makes Base UI fail on its own focus guards (axe-core#4832), so the default is kept.

### components/theme-toggle

Verified 2026-11-03: Base UI ✓, Radix ✓. `aria-pressed` follows the chosen mode in both apps. Detector: clean. Lighthouse accessibility (desktop): navigation light 100, dark 100 in both apps.

## License

MIT
