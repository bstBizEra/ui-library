"use client"

import { useState } from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Flag, type FlagCode } from "@/components/ui/flag"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type LocaleOption<L extends FlagCode = FlagCode> = {
  value: L
  label: string
  // Font class for the label, e.g. a Lao font for "ລາວ".
  className?: string
}

// Controlled: the app decides what a change does (cookie + router.refresh, a context, a new URL).
// No asChild/render on the trigger, so it works on Base UI and Radix shadcn projects alike.
export function LocaleSwitcher<L extends FlagCode>({
  value,
  options,
  onValueChange,
  label = "Language",
  className,
}: {
  value: L
  options: LocaleOption<L>[]
  onValueChange: (value: L) => void
  label?: string
  className?: string
}) {
  const current = options.find((o) => o.value === value) ?? options[0]
  // Base UI radio items keep the menu open on click; Radix closes it. Close it ourselves so both match.
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={(next: boolean) => setOpen(next)}>
      <DropdownMenuTrigger
        aria-label={`${label}: ${current.label}`}
        className={cn(
          "inline-flex items-center gap-2 rounded-md border border-input bg-background px-2.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
      >
        <Flag code={current.value} />
        <span className={current.className}>{current.label}</span>
        <ChevronDownIcon className="size-3.5 text-muted-foreground" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(v) => {
            onValueChange(v as L)
            setOpen(false)
          }}
        >
          {options.map((o) => (
            <DropdownMenuRadioItem key={o.value} value={o.value} lang={o.value}>
              <Flag code={o.value} />
              <span className={o.className}>{o.label}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
