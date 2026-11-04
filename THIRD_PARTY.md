# Third-party sources

## pqoqubbw/icons (lucide-animated)

- Repo: https://github.com/pqoqubbw/icons
- Commit: 4662fff2b60fdcf4751b32013606756caf7c4c26
- Vendored: `icons/search.tsx` as `icons/animated-search.tsx` (header comment added, otherwise unchanged)
- Licence: MIT

```text
MIT License

Copyright (c) 2024-2026 pqoqubbw

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

## tailark/blocks

- Repo: https://github.com/tailark/blocks
- Commit: 8139698115c1341bfd2e3e286c04bb4d8146f472
- Vendored: `registry/bases/base/dusk/blocks/hero-section/one/hero-section.tsx` as `blocks/hero-centered.tsx` (header comment added; header, logo strip and image removed, Button `render` prop replaced by `buttonVariants` on `<a>`, `<main>` changed to `<section>`)
- Licence: MIT

```text
MIT License

Copyright (c) 2025 Irung

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## ibelick/motion-primitives

- Repo: https://github.com/ibelick/motion-primitives
- Commit: 120f64f6ca60348e251f929e9c81f11ccbe45eda
- Vendored: `components/core/text-effect.tsx` as `animation/text-effect.tsx` (header comment added; local change: when `prefers-reduced-motion` is set, `useReducedMotion()` makes it render the text in the same element and className without animation; the preference is read in an effect so the first client render matches the server HTML)
- Licence: MIT

```text
MIT License

Copyright (c) 2024 ibelick

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
app/page.tsx

```

## components/dropzone

- Source: Kibo UI dropzone, https://github.com/shadcnblocks/kibo/blob/3d63cdb15b79d972e3dc38a10997987672f9b263/packages/dropzone/index.tsx
- Repo: https://github.com/shadcnblocks/kibo
- Commit: 3d63cdb15b79d972e3dc38a10997987672f9b263
- Vendored: `packages/dropzone/index.tsx` as `components/dropzone.tsx` (header comment added; local changes: (1) `getRootProps({ role: "button" })` instead of `getRootProps()`, because react-dropzone defaults the root to `role="presentation"`, which on this focusable button fails axe presentation-role-conflict and Lighthouse accessibility; (2) `aria-hidden="true"` on the inner file input, so the button's accessible name comes from its visible content instead of "file upload: No file chosen"; (3) `group` on the root and `group-hover:text-foreground` on the three `text-muted-foreground` captions, so they stay readable on the hovered button: `hover:bg-muted` made them 4.34:1)
- Licence: MIT

```text
Copyright (c) 2023 — Present shadcnblocks

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## components/data-table

- Source: tablecn data table, Base UI variant, https://github.com/sadmann7/tablecn/tree/2d74ac5827aa7abf60e334759e38cf7cdcb24d54/src/registry/bases/base
- Repo: https://github.com/sadmann7/tablecn
- Commit: 2d74ac5827aa7abf60e334759e38cf7cdcb24d54
- Vendored: the 19 files of the upstream `data-table` registry item, taken from `src/registry/bases/base/` (components, `ui/faceted.tsx`, `ui/direction.tsx`, `hooks/use-data-table.ts`) plus the shared `src/hooks/use-debounced-callback.ts` and `src/lib/*` files, into `components/data-table/` (header comment added to each). Local changes, named in each file's header: (1) imports rewritten from `@/registry/bases/base/...` to the shadcn aliases a consumer project has; (2) `IconPlaceholder` replaced with the lucide-react icon it resolves to, which upstream's own registry build does for lucide projects; (3) `cn` imported from `@/lib/utils` instead of the `cn` package. Upstream's GitHub `registry.json` only lists the Radix files, so a pinned GitHub install gives Radix code; its hosted Base UI build is a newer, different item with no commit to pin.
- Licence: MIT

```text
MIT License

Copyright (c) 2024 Sadman Sakib

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
