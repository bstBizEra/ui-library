import { notFound } from "next/navigation"

import { demos } from "@/demos"

export const dynamicParams = false

export function generateStaticParams() {
  return Object.entries(demos).flatMap(([slug, demo]) => demo.states.map((s) => ({ slug, state: s.id })))
}

export default async function FramePage({ params }: { params: Promise<{ slug: string; state: string }> }) {
  const { slug, state } = await params
  const sample = demos[slug]?.states.find((s) => s.id === state)
  if (!sample) notFound()
  const { wide, bleed } = demos[slug]
  return <main className={bleed ? "" : wide ? "p-6" : "flex items-start p-6"}>{sample.render()}</main>
}
