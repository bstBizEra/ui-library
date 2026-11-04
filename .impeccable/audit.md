# Audit: ui-library portal

Date 2026-11-04. Target: `portal/` shell and sample frames (`app/(shell)`, `app/(frame)`, `components/portal`, `demos`). The synced library items were out of scope; their own findings live in the README's Verification section.

Evidence: production build on localhost; Lighthouse (desktop, navigation and snapshot, light and dark; mobile snapshot dark); `impeccable detect --json` on source and on the rendered dropzone page; computed styles and target sizes read in Chrome at 1440, 390 and 320 px; text at 200% at 320 px; source grep for hard-coded colours and sizes.

## Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 4 | Sidebar layer headings (h2) come before the page h1 in DOM order |
| 2 | Performance | 3 | Every sample frame boots its own Next runtime, eagerly |
| 3 | Theming | 4 | -- |
| 4 | Responsive Design | 3 | Copy button and home link meet 24 px but not 44 px |
| 5 | Implementation Integrity | 4 | Detector: Geist flagged as overused (waived, see below) |
| **Total** | | **18/20** | **Excellent** |

## Implementation Integrity Verdict

Pass. The shell is base-nova tokens unchanged, so samples render exactly as in a consuming app; the only colour is the light and dark columns. Source detector: clean. Rendered detector: one finding, `overused-font` (Geist, 71% of text). Waived: Geist is shadcn's Next default, and the direction contract keeps the consuming-app defaults on purpose ("tokens unchanged"); a distinctive face would misrepresent how items look in real projects.

## Executive Summary

- Audit Health Score: **18/20** (Excellent)
- Issues: P0 0, P1 0, P2 2, P3 4
- Top issues: Copy fails silently where the Clipboard API is unavailable; all sample frames load eagerly.
- Next: `/impeccable harden` for the Copy failure path, then `/impeccable polish`.

## Detailed Findings

**[P2] Copy fails silently without the Clipboard API**
- Location: `portal/components/portal/copy-command.tsx`, onClick
- Category: Implementation Integrity
- Impact: Opened over the LAN address `next start` prints (plain http, not localhost), `navigator.clipboard` is undefined; the click throws and the button never changes, so the visitor cannot tell the command was not copied.
- Recommendation: Wrap the write in try/catch; on failure show "Copy failed" and select the command text so it can be copied by hand.
- Suggested command: `/impeccable harden`
- **Resolved 2026-11-04:** the write is in try/catch; on failure the button reads "Copy failed: press Ctrl+C" for 4 s and the full command is selected. A copy handler on the command puts the exact one-line text on the clipboard (a plain selection would split path and `#tag` onto two lines, since they are separate flex items). Checked with `clipboard.writeText` forced to reject: label, selection and copied text as described. The LAN address itself timed out from the test browser, so the missing-API case was exercised by the rejection, not reached by URL.

**[P2] Sample frames load eagerly, each with its own runtime**
- Location: `portal/components/portal/sample-frame.tsx`
- Category: Performance
- Impact: The dropzone page starts six documents at once (the JS is cached after the first). Fine at seven items; grows with states per item.
- Recommendation: `loading="lazy"` on frames below the first row, keeping the height handshake (it already copes with late hydration).
- Suggested command: `/impeccable optimize`
- **Resolved 2026-11-04, with a limit:** rows after the first carry `loading="lazy"`; a state flagged `eager` (the locale-switcher's open menu) loads with the page, because a self-opening sample loaded mid-scroll would pull focus away from the visitor. On today's pages Chrome still loads every frame at once: native lazy loading defers only beyond its distance threshold (about 1,250–2,500 px), and the lowest frame starts near 1,300 px. The attribute pays off as items gain states. While fixing this, the focus hand-back moved from the frame's height report to the page's `blur` event: the height report could arrive before the menu took focus, which left focus in the dark "Open" frame.

**[P3] Heading order: sidebar h2s precede the h1**
- Location: `portal/components/portal/item-nav.tsx` (layer headings)
- Category: Accessibility
- Impact: Screen-reader heading lists start with "components, icons…" before the item name. Lighthouse passes.
- Recommendation: Make the layer labels non-heading text inside the nav (lists already group them), or `aria-labelledby` groups.
- Suggested command: `/impeccable polish`

**[P3] Touch targets under 44 px**
- Location: Copy button (28 px tall), "ui-library" home link (24 px)
- Category: Responsive
- Impact: Meets WCAG 2.5.8 (24 px) but is small for a thumb.
- Recommendation: `size="default"` on the Copy button below md; pad the home link.
- Suggested command: `/impeccable adapt`

**[P3] Hero sample never shows its widest layout**
- Location: `app/(shell)/items/[slug]/page.tsx`, wide rows
- Category: Responsive
- Impact: The hero frame is about 976 px wide at a 1440 viewport, under the block's xl breakpoint.
- Recommendation: Let wide rows span the label column too, or note the frame width in the row.
- Suggested command: `/impeccable layout`

**[P3] Contract wording drift**
- Location: `.impeccable/surfaces/portal-app-shell-items-slug-page-tsx.md` OWN-WORLD
- Category: Implementation Integrity
- Impact: Says "system sans"; the build ships Geist (as DESIGN.md records).
- Recommendation: Change the contract to "Geist sans (the base-nova default)".
- Suggested command: `/impeccable document`

## Patterns & Systemic Issues

None systemic. Both P2s are edge paths (non-secure origin, growth in states), not repeated shortcuts.

## Positive Findings

- Lighthouse accessibility 100 in all runs; every iframe has a title; the open-menu sample hands focus and scroll back to the page on load.
- No hard-coded colours in portal code; dark and light come from the frame's own `<html class>`, so popups render in the right theme.
- No horizontal scroll at 320 px, including 200% text.
- Item metadata comes from the registry files, the same source as CATALOG.md; the build stops if an item has no samples.
- `font-mono` now maps through `@theme` (`--font-mono`), so Geist Mono no longer depends on the html class overriding Tailwind's fallback.

## Recommended Actions

1. **[P2] `/impeccable harden`**: Copy failure path in copy-command.tsx.
2. **[P2] `/impeccable optimize`**: lazy-load sample frames below the first row.
3. **[P3] `/impeccable polish`**: heading order in the nav, touch target sizes, contract wording.
