import data from "./items.json"

export type Item = (typeof data.items)[number]

export const tag = data.tag
export const items: Item[] = data.items
export const layers = [...new Set(items.map((i) => i.layer))]

export function getItem(slug: string) {
  return items.find((i) => i.slug === slug)
}
