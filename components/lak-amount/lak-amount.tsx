"use client"

import { useRef } from "react"

import { cn } from "@/lib/utils"
import { caretAfterDigits, formatLak, formatLakDigits, parseLak } from "@/lib/lak"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"

type InputProps = Omit<React.ComponentProps<typeof InputGroupInput>, "value" | "defaultValue" | "onChange" | "type">

// Controlled: value is whole kip, or null when the field is empty.
// Grouping commas appear as you type; anything that is not a digit is ignored, so pasting "1.250.000 ₭" works.
export function LakAmountInput({
  value,
  onValueChange,
  max = Number.MAX_SAFE_INTEGER,
  className,
  ...props
}: InputProps & {
  value: number | null
  onValueChange: (value: number | null) => void
  max?: number
}) {
  const input = useRef<HTMLInputElement>(null)

  return (
    <InputGroup className={className}>
      <InputGroupInput
        ref={input}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={value === null ? "" : formatLakDigits(value)}
        onChange={(e) => {
          const text = e.target.value
          const caret = e.target.selectionStart ?? text.length
          let digitsBefore = text.slice(0, caret).replace(/\D/g, "").length
          const next = parseLak(text)
          if (next !== null && next > max) digitsBefore -= 1 // the refused digit
          else onValueChange(next)
          // After React renders (or restores the old text when nothing changed), put the caret back
          // after the same digit; without this it jumps to the end whenever the commas move.
          requestAnimationFrame(() => {
            const el = input.current
            if (!el || document.activeElement !== el) return
            const at = caretAfterDigits(el.value, digitsBefore)
            el.setSelectionRange(at, at)
          })
        }}
        className="text-right tabular-nums"
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupText>₭</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}

// An amount as text, e.g. 1,250,000 ₭. `data` keeps the machine value for scripts and tests.
export function LakAmount({ amount, className }: { amount: number; className?: string }) {
  return (
    <data value={amount} className={cn("tabular-nums", className)}>
      {formatLak(amount)}
    </data>
  )
}
