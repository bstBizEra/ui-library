# ui-library

A shadcn source registry on GitHub. No build step: the CLI reads `registry.json` and its `include` entries.

```bash
npx shadcn@latest add bstBizEra/ui-library/components/theme-toggle
```

Items are named `<layer>/<item>` (for example `components/theme-toggle`). Pin a version with `#<ref>`.

## Verification

Installed from `f732fd2` in two fresh Next.js apps (shadcn `base-nova` on Base UI, `radix-nova` on Radix) with `npx shadcn@latest add bstBizEra/ui-library/components/locale-switcher#<sha> bstBizEra/ui-library/components/theme-toggle#<sha>`. Both apps build.

### icons/flag and components/locale-switcher

Verified 2026-11-03: Base UI ✓, Radix ✓. Menu opens, picking ລາວ updates the label and closes the menu, ArrowDown + Enter picks, ລາວ not clipped in light and dark. Impeccable audit: no P0/P1. Detector: clean. Lighthouse accessibility (desktop): navigation light 100, dark 100; menu open (snapshot) Base UI light 100, dark 100. Radix with the menu open scores 94 in light and dark: `aria-hidden-focus` on `main` (Radix's modal menu hides the page, trigger included) plus `landmark-one-main`, a knock-on of that `aria-hidden`.

### components/theme-toggle

Verified 2026-11-03: Base UI ✓, Radix ✓. `aria-pressed` follows the chosen mode in both apps. Detector: clean. Lighthouse accessibility (desktop): navigation light 100, dark 100 in both apps.

## License

MIT
