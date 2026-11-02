import { ArrowRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"

// Source: https://github.com/tailark/blocks/blob/8139698115c1341bfd2e3e286c04bb4d8146f472/registry/bases/base/dusk/blocks/hero-section/one/hero-section.tsx
// Upstream: tailark/blocks@8139698115c1341bfd2e3e286c04bb4d8146f472
// Copied: 2026-11-03
// Licence: MIT (see THIRD_PARTY.md)
// Local changes: dropped the header, the brand logo strip and the next/link, next/image imports;
// the Base UI-only Button `render` prop became buttonVariants on plain <a> so it works on Base UI and Radix;
// the screenshot is a neutral placeholder; <main> became <section>.

export default function HeroCentered() {
  return (
    <section className="overflow-hidden">
      <div className="relative pt-24 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="px-6 text-center sm:mx-auto lg:mr-auto lg:mt-0">
            <a
              href="#link"
              className="group mx-auto flex w-fit items-center gap-3 rounded-full p-1 pl-4 transition-colors duration-300">
              <span className="text-sm font-medium">New:</span>
              <span className="text-muted-foreground text-sm">Introducing the living customer graph</span>

              <div className="size-6 overflow-hidden rounded-full duration-500">
                <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                  <span className="flex size-6">
                    <ArrowRight className="m-auto size-3" aria-hidden="true" />
                  </span>
                  <span className="flex size-6">
                    <ArrowRight className="m-auto size-3" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </a>

            <h1 className="mx-auto mt-8 max-w-4xl text-balance text-5xl font-medium tracking-tight md:text-6xl lg:mt-12 xl:text-7xl">Customer universe, beautifully connected</h1>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-balance md:text-lg">Every account, signal, conversation, and next move in one living workspace that helps teams turn momentum into revenue.</p>

            <div className="mt-6 flex flex-col items-center justify-center gap-2 md:flex-row">
              <a href="#" className={buttonVariants()}>
                <span className="text-nowrap">Explore the graph</span>
              </a>
              <a href="#" className={buttonVariants({ variant: "ghost" })}>
                <span className="text-nowrap">Watch the flow</span>
              </a>
            </div>
          </div>

          <div className="relative mt-8 overflow-hidden p-6 max-sm:-mr-56 sm:mt-16">
            <div className="rounded-4xl mask-t-from-25% mask-t-to-65% bg-linear-to-b absolute inset-0 border to-zinc-600"></div>
            <div className="bg-background ring-foreground/6.5 before:mask-radial-at-top-left before:mask-radial-from-65% before:mask-radial-[100%_60%] before:ring-foreground before:border-foreground/10 relative rounded-2xl p-2 shadow-xl shadow-black/50 ring before:absolute before:-inset-px before:z-10 before:size-56 before:rounded-tl-2xl before:border-l before:border-t">
              <div className="bg-foreground/2 z-1 absolute inset-0 rounded-2xl"></div>
              <div role="img" aria-label="Product screenshot placeholder" className="bg-muted aspect-15/8 relative rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
