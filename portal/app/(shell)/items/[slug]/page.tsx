import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { CopyCommand } from "@/components/portal/copy-command"
import { SampleFrame } from "@/components/portal/sample-frame"
import { demos, type SampleState } from "@/demos"
import { getItem, items } from "@/lib/items"
import { cn } from "@/lib/utils"

export const dynamicParams = false

export function generateStaticParams() {
  return items.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return { title: (await params).slug }
}

const THEMES = ["light", "dark"] as const

// Rows after the first load lazily: every frame boots its own runtime.
function Frame({ slug, state, theme, lazy }: { slug: string; state: SampleState; theme: (typeof THEMES)[number]; lazy: boolean }) {
  return (
    <SampleFrame
      src={`/frame/${theme}/${slug}/${state.id}${state.query ?? ""}`}
      title={`${slug}, ${state.label}, ${theme} theme`}
      minHeight={state.height}
      lazy={lazy}
    />
  )
}

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getItem(slug)
  const demo = demos[slug]
  if (!item || !demo) notFound()

  const meta = [
    item.kind === "vendored" ? `vendored from ${item.source}` : "house item",
    item.licence,
    ...item.dependencies.map((d) => d.replace(/@[^@]*$/, "")),
  ]
  const ownDeps = items.filter((i) => item.registryDependencies.includes(i.name))
  const shadcnDeps = item.registryDependencies.filter((d) => !items.some((i) => i.name === d))

  return (
    <main className="min-w-0 px-4 py-6 md:px-8 md:py-8">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between xl:gap-10">
        <div className="max-w-2xl">
          <h1 className="font-mono text-2xl font-semibold tracking-tight">{item.slug}</h1>
          <p className="mt-2 text-pretty text-muted-foreground">{item.description}</p>
          <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
            {ownDeps.map((own) => (
              <Link key={own.slug} href={`/items/${own.slug}`} className="underline underline-offset-2 hover:text-foreground">
                needs {own.slug}
              </Link>
            ))}
            {/* The CLI installs built-in shadcn components itself, so they share one line. */}
            {shadcnDeps.length > 0 && <span>shadcn: {shadcnDeps.join(", ")}</span>}
          </p>
        </div>
        <div className="w-full xl:w-auto xl:max-w-[38rem]">
          <CopyCommand command={item.install} />
        </div>
      </header>

      <section aria-label="States" className="mt-8 overflow-hidden rounded-xl border">
        <div
          aria-hidden="true"
          className={cn(
            "hidden border-b bg-muted/50 text-xs font-medium text-muted-foreground md:grid",
            demo.wide ? "md:grid-cols-[10rem_1fr]" : "md:grid-cols-[10rem_1fr_1fr]"
          )}
        >
          <span className="px-4 py-2.5">State</span>
          {demo.wide ? (
            <span className="border-l px-4 py-2.5">Light, then dark</span>
          ) : (
            THEMES.map((t) => (
              <span key={t} className="border-l px-4 py-2.5 capitalize">
                {t}
              </span>
            ))
          )}
        </div>
        {demo.states.map((state, i) => (
          <div
            key={state.id}
            className={cn(
              "grid border-b last:border-b-0",
              demo.wide ? "md:grid-cols-[10rem_1fr]" : "md:grid-cols-[10rem_1fr_1fr]"
            )}
          >
            <div className="bg-muted/50 px-4 py-3 md:py-4">
              <h2 className="text-sm font-medium">{state.label}</h2>
              <p className="mt-0.5 text-xs text-pretty text-muted-foreground">{state.note}</p>
            </div>
            {demo.wide ? (
              <div className="divide-y border-t md:border-t-0 md:border-l">
                {THEMES.map((t) => (
                  <Frame key={t} slug={slug} state={state} theme={t} lazy={i > 0 && !state.eager} />
                ))}
              </div>
            ) : (
              THEMES.map((t) => (
                <div key={t} className="flex flex-col border-t md:border-t-0 md:border-l">
                  <p className="px-4 pt-2 text-xs text-muted-foreground capitalize md:hidden">{t}</p>
                  <Frame slug={slug} state={state} theme={t} lazy={i > 0 && !state.eager} />
                </div>
              ))
            )}
          </div>
        ))}
      </section>

      {demo.notes && (
        <section aria-labelledby="notes" className="mt-6 max-w-3xl">
          <h2 id="notes" className="text-sm font-medium">
            Before you install
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {demo.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
