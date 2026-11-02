"use client"

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type ThemeMode = "system" | "light" | "dark"

const MODES = [
  { mode: "system", icon: MonitorIcon, label: "System" },
  { mode: "light", icon: SunIcon, label: "Light" },
  { mode: "dark", icon: MoonIcon, label: "Dark" },
] as const

// Controlled: the app stores the choice and applies it (class, data-theme, next-themes).
export function ThemeToggle({
  value,
  onValueChange,
  label = "Theme",
  className,
}: {
  value: ThemeMode
  onValueChange: (value: ThemeMode) => void
  label?: string
  className?: string
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("inline-flex items-center gap-0.5 rounded-full border border-input bg-background p-0.5", className)}
    >
      {MODES.map(({ mode, icon: Icon, label: modeLabel }) => {
        const active = value === mode
        return (
          <button
            key={mode}
            type="button"
            aria-label={modeLabel}
            title={modeLabel}
            aria-pressed={active}
            onClick={() => onValueChange(mode)}
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon className="size-4" aria-hidden />
          </button>
        )
      })}
    </div>
  )
}
