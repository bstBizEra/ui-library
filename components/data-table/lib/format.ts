export function formatDate(
  date: Date | string | number | undefined,
  opts: Intl.DateTimeFormatOptions = {},
) {
  if (!date) return "";

  try {
    return new Intl.DateTimeFormat("en-US", {
      month: opts.month ?? "long",
      day: opts.day ?? "numeric",
      year: opts.year ?? "numeric",
      ...opts,
    }).format(new Date(date));
  } catch {
    return "";
  }
}

// Source: https://github.com/sadmann7/tablecn/blob/2d74ac5827aa7abf60e334759e38cf7cdcb24d54/src/lib/format.ts
// Upstream: sadmann7/tablecn@2d74ac5827aa7abf60e334759e38cf7cdcb24d54
// Copied: 2026-11-04
// Licence: MIT (see THIRD_PARTY.md)
