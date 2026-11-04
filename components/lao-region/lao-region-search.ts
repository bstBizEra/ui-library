// Search for provinces and districts in English or Lao.

// Lowercase, no spaces or hyphens, and one spelling for the Lao letters that have two (ຫລ/ຫຼ, ຫນ/ໜ, ຫມ/ໝ),
// so "Luang Prabang", "luangprabang" and "ຫລວງພະບາງ" all match.
export function normalizeLaoSearch(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\s\-.]/g, "")
    .replace(/ຫລ/g, "ຫຼ")
    .replace(/ຫນ/g, "ໜ")
    .replace(/ຫມ/g, "ໝ")
}

type Searchable = { code?: string; iso?: string; en: string; lo: string; aliases?: string[] }

export function matchesLaoRegion(item: Searchable, query: string): boolean {
  const q = normalizeLaoSearch(query)
  if (!q) return true
  return [item.en, item.lo, item.iso, ...(item.aliases ?? [])].some((name) => name && normalizeLaoSearch(name).includes(q))
}
