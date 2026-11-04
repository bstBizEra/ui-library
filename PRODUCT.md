# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Library items: shadcn registry files (React, Tailwind v4). Portal (`portal/`): Next.js + shadcn on the Base UI base, importing the item source files from this repo so samples always match the repo. Runs locally; no deploy target decided.

## Users

The repo owner and their coding agents. They open the portal to see what an item looks like and how it behaves before installing it into a project, and to copy the pinned install command.

## Product Purpose

`bstBizEra/ui-library` is the house component library: house and vendored shadcn registry items, installed with `npx shadcn@latest add bstBizEra/ui-library/<item>#vX.Y.Z`. The portal shows each item live with its states, so a reuse decision is made from the real component, not from a catalogue line. Success: an agent or the owner can pick or rule out an item in under a minute.

## Positioning

Every sample is the repo's own source file, at the current tag, with its licence and upstream named. It is a working reference for this library only, not a marketing site.

## Operating Context

`CATALOG.md` is generated from the `registry.json` files by `scripts/catalog.mjs`; the portal should take item names, descriptions, install commands, source and licence from the same registry data rather than a second copy. Agents read `CATALOG.md` via the `ui-library` skill; the portal is for looking.

## Capabilities and Constraints

- Items today (v1.0.2): `components/theme-toggle`, `components/locale-switcher`, `components/dropzone`, `icons/flag`, `icons/animated-search`, `animation/text-effect`, `blocks/hero-centered`.
- Items expect shadcn's `@/lib/utils` (`cn`); `lucide-react` is the icon set.
- Known accessibility waivers: an open Base UI menu scores 96 unless the trigger is off-centre (axe-core#4832); documented in README.
- Vendored items keep their `// Source:` / `// Licence:` header after the imports; full texts in `THIRD_PARTY.md`.
- Undecided: public deploy.

## Evidence on Hand

Item files, `registry.json` per category, `CATALOG.md`, `README.md`, `THIRD_PARTY.md`. No screenshots, users or usage numbers exist; do not invent them.

## Product Principles

- The sample is the shipped file; never a re-implementation.
- One source of item metadata: the registry files.
- Show states (empty, error, reduced motion, dark) next to the default, since that is where reuse decisions go wrong.
- The install command is always one click away and pinned to a tag.

## Accessibility & Inclusion

Lighthouse accessibility 100 in light and dark, except documented waivers.
