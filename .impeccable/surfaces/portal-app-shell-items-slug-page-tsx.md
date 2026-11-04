---
version: 1
slug: "portal-app-shell-items-slug-page-tsx"
primary_target: "portal/app/(shell)/items/[slug]/page.tsx"
related_targets: ["portal/app/(shell)/items"]
---

# Portal (ui-library/portal)

Mode: Operate. Audience: the repo owner and their coding agents deciding whether to install an item. Task: see an item's real states in both themes and copy its pinned install command. Build path: code-led.

## Direction contract

THESIS: Every state of one item, in light and dark at once, so a reuse decision never depends on toggling. Refuses the docs-site default of one demo per page with a theme switch.

OWN-WORLD: shadcn base-nova neutral tokens, unchanged, because samples must look as they will in a consuming app. Shell: muted sidebar, hairline borders, system sans; mono for item slugs and install commands, since both are typed identifiers. The light and dark columns are the colour.

STORY: The visitor scans the sidebar, opens an item, reads one "Use when" line, scans the matrix, copies the install command or moves on.

FIRST VIEWPORT: 240px sidebar of items grouped by layer, with version. Main: item name, use-when line, kind/licence/dependency meta left; install command with Copy right. Below, the matrix: state label column, Light column, Dark column; full-width rows for blocks. Known waivers in a "Before you install" section under the matrix.

FORM: state matrix, position 3 on the ranked list (dealt lead). seed:841058fff9a6501a

Signature interaction: Copy confirms in place; the matrix is all live components, operable in both columns.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
