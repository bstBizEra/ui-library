import { cn } from "@/lib/utils"

export type FlagCode = "en" | "lo" | "th" | "zh"

// Inline SVG flags — render consistently on every OS (Windows has no flag emoji).
export function Flag({ code, className }: { code: FlagCode; className?: string }) {
  const cls = cn("inline-block h-3.5 w-5 shrink-0 rounded-[2px] ring-1 ring-black/10", className)
  switch (code) {
    case "en":
      return (
        <svg viewBox="0 0 60 40" className={cls} aria-hidden>
          <rect width="60" height="40" fill="#012169" />
          <path d="M0 0 60 40 M60 0 0 40" stroke="#fff" strokeWidth="8" />
          <path d="M0 0 60 40 M60 0 0 40" stroke="#C8102E" strokeWidth="4" />
          <path d="M30 0V40 M0 20H60" stroke="#fff" strokeWidth="12" />
          <path d="M30 0V40 M0 20H60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      )
    case "lo":
      return (
        <svg viewBox="0 0 60 40" className={cls} aria-hidden>
          <rect width="60" height="40" fill="#CE1126" />
          <rect y="10" width="60" height="20" fill="#002868" />
          <circle cx="30" cy="20" r="7" fill="#fff" />
        </svg>
      )
    case "th":
      return (
        <svg viewBox="0 0 60 40" className={cls} aria-hidden>
          <rect width="60" height="40" fill="#A51931" />
          <rect y="6.7" width="60" height="26.6" fill="#F4F5F8" />
          <rect y="13.3" width="60" height="13.3" fill="#2D2A4A" />
        </svg>
      )
    case "zh":
      return (
        <svg viewBox="0 0 60 40" className={cls} aria-hidden>
          <rect width="60" height="40" fill="#DE2910" />
          <text x="7" y="23" fontSize="20" fill="#FFDE00">★</text>
          <text x="25" y="9" fontSize="7" fill="#FFDE00">★</text>
          <text x="32" y="15" fontSize="7" fill="#FFDE00">★</text>
          <text x="32" y="24" fontSize="7" fill="#FFDE00">★</text>
          <text x="25" y="30" fontSize="7" fill="#FFDE00">★</text>
        </svg>
      )
  }
}
