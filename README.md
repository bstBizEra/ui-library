# ui-library

A shadcn source registry on GitHub. No build step: the CLI reads `registry.json` and its `include` entries.

```bash
npx shadcn@latest add bstBizEra/ui-library/components/theme-toggle
```

Items are named `<layer>/<item>` (for example `components/theme-toggle`). Pin a version with `#<ref>`.

## Verification

Installed from `f732fd2` in two fresh Next.js apps (shadcn `base-nova` on Base UI, `radix-nova` on Radix) with `npx shadcn@latest add bstBizEra/ui-library/components/locale-switcher#<sha> bstBizEra/ui-library/components/theme-toggle#<sha>`. Both apps build.

### icons/flag and components/locale-switcher

Verified 2026-11-03 against `38cc504` (`modal={false}`): Base UI ✓, Radix ✓. Menu opens, picking ລາວ updates the label and closes the menu, ArrowDown + Enter picks, Escape closes and returns focus to the trigger, ລາວ not clipped in light and dark. Impeccable audit: no P0/P1. Detector: clean. Lighthouse accessibility (desktop): Radix 100 in all four runs (navigation light/dark, menu-open snapshot light/dark). Base UI navigation light/dark 100, but with the menu open 96 in light and dark: `aria-hidden-focus` on Base UI's own focus-guard spans (`aria-hidden` with `tabindex=0`) that a non-modal menu adds. With `modal` left on (`f732fd2`) the result was the reverse: Base UI 100, Radix 94.

### components/theme-toggle

Verified 2026-11-03: Base UI ✓, Radix ✓. `aria-pressed` follows the chosen mode in both apps. Detector: clean. Lighthouse accessibility (desktop): navigation light 100, dark 100 in both apps.

## License

MIT
