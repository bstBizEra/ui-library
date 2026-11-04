---
name: ui-library portal
description: Every ui-library item rendered live in each state, light and dark, with its pinned install command.
colors:
  background: "oklch(1 0 0)"
  foreground: "oklch(0.145 0 0)"
  primary: "oklch(0.205 0 0)"
  primary-foreground: "oklch(0.985 0 0)"
  muted: "oklch(0.97 0 0)"
  muted-foreground: "oklch(0.556 0 0)"
  border: "oklch(0.922 0 0)"
  ring: "oklch(0.708 0 0)"
  sidebar: "oklch(0.985 0 0)"
  sidebar-accent: "oklch(0.97 0 0)"
  background-dark: "oklch(0.145 0 0)"
  foreground-dark: "oklch(0.985 0 0)"
  primary-dark: "oklch(0.922 0 0)"
  primary-foreground-dark: "oklch(0.205 0 0)"
  muted-dark: "oklch(0.269 0 0)"
  muted-foreground-dark: "oklch(0.708 0 0)"
  border-dark: "oklch(1 0 0 / 10%)"
  ring-dark: "oklch(0.556 0 0)"
  sidebar-dark: "oklch(0.205 0 0)"
  sidebar-accent-dark: "oklch(0.269 0 0)"
typography:
  headline:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.333
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.429
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.333
  identifier:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  md: "0.5rem"
  lg: "0.625rem"
  xl: "0.875rem"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
components:
  button-copy:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    height: "28px"
    padding: "0 10px"
  install-command:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.foreground}"
    typography: "{typography.identifier}"
    rounded: "{rounded.lg}"
    padding: "6px 6px 6px 12px"
  nav-link:
    textColor: "{colors.foreground}"
    typography: "{typography.identifier}"
    rounded: "{rounded.md}"
    padding: "6px 8px"
  nav-link-hover:
    backgroundColor: "{colors.sidebar-accent}"
  nav-link-active:
    backgroundColor: "{colors.border}"
    textColor: "{colors.foreground}"
  state-matrix:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.xl}"
  state-label-cell:
    backgroundColor: "{colors.muted}"
    typography: "{typography.title}"
    padding: "16px"
---

# Design System: ui-library portal

## Overview

**Creative North Star: "The Proof Sheet"**

The portal is a contact sheet for components: every state of one item printed side by side, light and dark, on a neutral ground that does not argue with the samples. The shell is shadcn base-nova on the neutral base colour, with its tokens shipped unchanged, because a sample has to look in the portal exactly as it will in a consuming app. Any tuning of the tokens would make the portal lie.

Density is working-reference density: a 15rem sidebar of item slugs grouped by layer, then the item's name, one use-when line, a meta row, and the install command, then the state matrix. Structure comes from 1px hairlines and a faint muted tint on label cells, never from shadow or colour. The only colour on the page is what the samples bring, and the dark column is itself the strongest tonal block.

Built with Next.js and shadcn on Base UI; type is Geist for prose and labels, Geist Mono for anything a person types.

**Key Characteristics:**
- Achromatic shell: base-nova neutral tokens, unedited, in both themes.
- Flat surfaces divided by hairline borders and a muted/50 tint.
- Mono only for typed identifiers: item slugs, the install command, the version tag.
- The light and dark sample columns sit next to each other; neither is behind a toggle.
- Gently rounded containers (8px to 14px) from the single `--radius` of 0.625rem.

## Colors

A strictly neutral, zero-chroma ladder from shadcn base-nova; the shell owns no hue.

### Primary
- **Ink** (primary; light near-black, dark near-white): the only filled control in the shell, the Copy button. Hover drops it to 80% opacity.

### Neutral
- **Paper** (background): page and sample-frame ground; in dark the frame ground is the near-black that makes the dark column read as a block.
- **Graphite** (foreground): all body text, the item slug, the active nav link.
- **Fog** (muted): at 50% opacity, the fill of the state-label column, the matrix header row and the install-command well.
- **Pewter** (muted-foreground): the use-when line, meta row, group labels, state notes, the version tag.
- **Hairline** (border): every divider; in dark it is white at 10%. It also fills the active nav link.
- **Haze** (ring): focus rings, used at 50% for the global outline and the button ring.
- **Off-white Rail** (sidebar): the sidebar ground, one step off the page in light and lifted to 0.205 in dark.
- **Rail Hover** (sidebar-accent): nav link hover fill.

### Named Rules
**The Unchanged Tokens Rule.** The `:root` and `.dark` blocks in `portal/app/globals.css` are base-nova neutral as generated. Do not retune a token to fix the shell; fix the shell's class instead. Unused base tokens (chart ramp, destructive, the dark `sidebar-primary` blue) stay as generated and are not part of the shell's palette.

**The Columns Are The Colour Rule.** The shell stays achromatic so the samples are the only colour on the page. A shell element that introduces a hue competes with the thing being judged.

## Typography

**Body Font:** Geist (with ui-sans-serif, system-ui)
**Label/Mono Font:** Geist Mono (with ui-monospace)

**Character:** One sans for everything you read, one mono for everything you type. Both are loaded with `next/font` in the shell layout and again in the frame layout, so samples render in the same faces.

### Hierarchy
- **Headline** (Geist Mono 600, 1.5rem, 2rem line, tracking -0.025em): the item slug as the page title. It is a slug, so it is mono.
- **Body** (Geist 400, 1rem, 1.5): the use-when description under the title, muted, capped at max-w-2xl (42rem).
- **Title** (Geist 500, 0.875rem): state labels in the matrix and the "Before you install" heading.
- **Label** (Geist 500 or 400, 0.75rem): matrix column headers, sidebar layer groups (capitalized), the meta row and state notes.
- **Identifier** (Geist Mono 400, 13px): sidebar slugs and the install command; the version tag uses the same face at 0.75rem.
- **Wordmark** (Geist 600, 1rem): "ui-library" in the sidebar head.

### Named Rules
**The Typed Identifier Rule.** Mono is for strings a person types or pastes: item slugs, install commands, version tags. Descriptions, labels, notes and headings that are not identifiers stay in Geist.

## Layout

Below md (768px) the page is one column: the sidebar collapses to a bordered "Items" toggle showing the current slug, and each matrix row stacks its label, then a "Light" frame, then a "Dark" frame, each with a small theme caption. At md and up the shell becomes a two-column grid (15rem sidebar, fluid main); the sidebar is sticky at full viewport height and scrolls on its own. At xl (1280px) the header splits: title block left (max 42rem), install command right (max 38rem).

The state matrix is a three-column grid (10rem label column, then Light and Dark at equal width); items marked wide (blocks) use a two-column grid with light stacked above dark in one full-width cell. Spacing runs on a 4px base: 12px and 20px sidebar padding, 16px/24px main padding on mobile and 32px from md, 16px cell padding, 32px from the header to the matrix, 24px to the notes section. Sample frames are real pages in iframes that report their height, with a per-state minimum that leaves room for popups.

## Elevation & Depth

The shell is flat. Depth is tonal: the label column and header row sit on muted at 50%, the sidebar sits one step off the page, and every division is a 1px hairline. The matrix is a single bordered, rounded container with overflow clipped, so the dark column's corners follow the container. Shadows belong to the samples (base-nova menus and popovers carry their own) and are never added to shell chrome.

### Named Rules
**The Hairline Rule.** Shell structure is drawn with 1px border-colour lines and the muted tint, not with shadows or filled panels.

## Shapes

One radius token (0.625rem) drives everything through multipliers: 8px on nav links, the mobile Items toggle and the Copy button; 10px on the install-command well; 14px on the matrix container. No pills, no sharp corners in the shell. Icons are Lucide outlines at 14px to 16px.

## Components

### Buttons
Quiet and functional; the shell has exactly one filled button.
- **Shape:** gently rounded (8px; the sm size caps at min(radius-md, 12px)).
- **Copy (primary, sm):** ink fill, inverted text, 28px tall, 10px horizontal padding, 0.8rem medium label with a 14px Lucide Copy icon.
- **Hover / Focus / Active:** hover at 80% fill; focus-visible draws a ring-coloured border plus a 3px ring at 50%; active nudges down 1px.
- **Confirm:** on copy, the icon swaps to Check and the label to "Copied" for 1.6s, announced through aria-live. It confirms in place; nothing else moves.

### Install Command
- **Style:** a muted/50 well with a hairline border, 10px radius, holding the command in 13px mono and the Copy button on the right.
- **Behaviour:** the path truncates with an ellipsis; the `#vX.Y.Z` tag never does. The full command is in the title attribute.

### Navigation
- **Style:** sidebar of slugs in 13px mono, grouped under 12px medium muted layer labels, 8px radius, 6px by 8px padding.
- **States:** hover fills with sidebar-accent; the current item fills with the border colour and goes semibold, with aria-current="page"; focus-visible draws a 2px ring.
- **Mobile:** below md the list hides behind a full-width bordered toggle with a rotating chevron; choosing an item closes it.

### State Matrix (signature)
- **Structure:** a rounded (14px) bordered container; a muted/50 header row of 12px column labels (State, Light, Dark); one row per state with a muted/50 label cell (title plus note) and a live iframe per theme, divided by hairlines.
- **Frames:** each frame is a real page in one fixed theme, so menus that portal to body render in that theme. Samples are live and operable in both columns.
- **Notes:** "Before you install" follows the matrix as a 14px heading and a muted bulleted list, max 48rem.

## Do's and Don'ts

### Do:
- **Do** use the base-nova neutral tokens as generated, in both themes, for every shell surface.
- **Do** set slugs, install commands and version tags in Geist Mono; set everything else in Geist.
- **Do** divide shell regions with 1px border-colour hairlines and the muted/50 tint.
- **Do** show light and dark samples side by side in their own fixed-theme frames.
- **Do** keep the pinned tag visible whenever an install command truncates.

### Don't:
- **Don't** edit the token values in globals.css to adjust how the shell looks.
- **Don't** add a hue to shell chrome; the samples are the colour.
- **Don't** add shadows to shell chrome; leave the samples' own popover and menu shadows as they ship.
- **Don't** set descriptions, notes or headings that are not identifiers in mono.
