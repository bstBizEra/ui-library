---
name: ui-library
description: Use when building or changing UI in a shadcn project (components.json present), or when asked for an icon, block, animation or component. Installs pieces from the bstBizEra/ui-library registry instead of hand-writing them.
---

# ui-library

A shadcn source registry: `bstBizEra/ui-library`.

## Rules

1. Read `CATALOG.md` first. It lists every item with a "Use when" line, the install command and the licence.
   The catalogue is `CATALOG.md` in the repo: https://github.com/bstBizEra/ui-library/blob/v1.1.0/CATALOG.md (read it with `gh api repos/bstBizEra/ui-library/contents/CATALOG.md?ref=v1.1.0 -H "Accept: application/vnd.github.raw"`, or a web fetch), or `D:/bst_AgentsWorkspace/Tools/ui-library/CATALOG.md` on the owner's PC.
2. If an item fits, install it with the pinned address. Never hand-write a piece the catalogue lists.
   `npx shadcn@latest add bstBizEra/ui-library/<item>#v1.1.0`
   (for example `bstBizEra/ui-library/components/theme-toggle#v1.1.0`). Always keep the `#<tag>`.
3. Items expect shadcn's `@/lib/utils` (`cn`) from `shadcn init`. Run `shadcn init` first if the project has no `components.json`.
4. Installed files are yours: edit them in the project, not in this repo. Vendored items keep their header comment (source, licence).
5. If nothing in the catalogue fits, check the "Not in the library yet" section of `CATALOG.md`, then write the piece in the project.

## Adding an item to this repo

Follow "Adding an item" and the entry checks in `README.md`: a layer folder (`icons/`, `components/`, `animation/`, `blocks/`), a `registry.json` entry with a "Use when" description, a header comment on vendored files, a `THIRD_PARTY.md` entry for third-party code, then `npm test`, `npm run check` and `npx shadcn@latest registry validate`. `CATALOG.md` is generated: run `node scripts/catalog.mjs <tag>`.
