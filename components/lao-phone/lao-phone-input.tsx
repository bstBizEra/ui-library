"use client"

import { useRef } from "react"

import { cn } from "@/lib/utils"
import { caretAfterDigits, formatLaoPhone, formatLaoPhoneNational, laoPhoneDigits, toE164 } from "@/lib/lao-phone"
import { Flag } from "@/components/ui/flag"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"

type InputProps = Omit<React.ComponentProps<typeof InputGroupInput>, "value" | "defaultValue" | "onChange" | "type">

// Controlled: value is the national digits ("2055512345", or "" when empty). onValueChange also
// passes the E.164 form ("+8562055512345"), which is null until the number is complete.
// Pasting "+856 20 5551 2345", "856-20-…" or "020 …" all land as the same digits.
export function LaoPhoneInput({
  value,
  onValueChange,
  className,
  ...props
}: InputProps & {
  value: string
  onValueChange: (digits: string, e164: string | null) => void
}) {
  const input = useRef<HTMLInputElement>(null)

  return (
    <InputGroup className={className}>
      <InputGroupInput
        ref={input}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={formatLaoPhoneNational(value)}
        onChange={(e) => {
          const text = e.target.value
          const caret = e.target.selectionStart ?? text.length
          const digits = laoPhoneDigits(text)
          const digitsBefore = Math.min(laoPhoneDigits(text.slice(0, caret)).length, digits.length)
          onValueChange(digits, toE164(digits))
          // After React renders (or restores the old text when nothing changed), keep the caret after
          // the same digit; without this it jumps to the end whenever the spaces move.
          requestAnimationFrame(() => {
            const el = input.current
            if (!el || document.activeElement !== el) return
            const at = caretAfterDigits(el.value, digitsBefore)
            el.setSelectionRange(at, at)
          })
        }}
        className="tabular-nums"
        {...props}
      />
      <InputGroupAddon>
        <Flag code="lo" />
        <InputGroupText>+856</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}

// A number as a tap-to-call link, e.g. +856 20 5551 2345.
export function LaoPhone({ digits, className }: { digits: string; className?: string }) {
  const e164 = toE164(digits)
  const text = formatLaoPhone(digits)
  return e164 ? (
    <a href={`tel:${e164}`} className={cn("tabular-nums underline-offset-4 hover:underline", className)}>
      {text}
    </a>
  ) : (
    <span className={cn("tabular-nums", className)}>{text}</span>
  )
}
