"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type NavGroup = { layer: string; items: { slug: string; title: string }[] }

export function ItemNav({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname()
  // Below md the list collapses behind a button, so the item reaches the first viewport.
  const [open, setOpen] = useState(false)
  const current = pathname.split("/items/")[1]

  return (
    <nav aria-label="Items">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="item-list"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm md:hidden"
      >
        <span>
          Items{current && <span className="ml-2 font-mono text-muted-foreground">{current}</span>}
        </span>
        <ChevronDownIcon aria-hidden="true" className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>
      <div id="item-list" className={cn("mt-4 flex-col gap-4 md:mt-0 md:flex", open ? "flex" : "hidden")}>
        {groups.map((g) => (
          <div key={g.layer}>
            <h2 className="px-2 pb-1 text-xs font-medium text-muted-foreground capitalize">{g.layer}</h2>
            <ul className="flex flex-col">
              {g.items.map((i) => {
                const active = pathname === `/items/${i.slug}`
                return (
                  <li key={i.slug}>
                    <Link
                      href={`/items/${i.slug}`}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-md px-2 py-1.5 font-mono text-[13px] transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                        active && "bg-border font-semibold text-foreground hover:bg-border hover:text-foreground"
                      )}
                    >
                      {i.slug}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}
