import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Link from "next/link"

import "../globals.css"
import { ItemNav } from "@/components/portal/item-nav"
import { ThemeProvider } from "@/components/theme-provider"
import { items, layers, tag } from "@/lib/items"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: { default: "ui-library", template: "%s · ui-library" },
  description: "Every ui-library item rendered live in each state, light and dark, with its pinned install command.",
}

const groups = layers.map((layer) => ({
  layer,
  items: items.filter((i) => i.layer === layer).map(({ slug, title }) => ({ slug, title })),
}))

export default function ShellLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("antialiased font-sans", fontMono.variable, geist.variable)}>
      <body>
        <ThemeProvider>
          <div className="min-h-svh md:grid md:grid-cols-[15rem_1fr]">
            <aside className="border-b bg-sidebar px-3 py-5 text-sidebar-foreground md:sticky md:top-0 md:h-svh md:overflow-y-auto md:border-r md:border-b-0">
              <p className="flex items-baseline gap-2 px-2 pb-5">
                <Link href="/" className="font-semibold">
                  ui-library
                </Link>
                <span className="font-mono text-xs text-muted-foreground">{tag}</span>
              </p>
              <ItemNav groups={groups} />
            </aside>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
