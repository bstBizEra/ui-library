// Lao kip (LAK) amounts: whole kip only, grouped with commas, the ₭ sign after the number.

const grouping = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 })

export function formatLakDigits(amount: number): string {
  return grouping.format(amount)
}

export function formatLak(amount: number): string {
  return `${formatLakDigits(amount)} ₭`
}

// Every non-digit is dropped: commas and dots are grouping in kip, a minus sign is not an amount.
export function parseLak(text: string): number | null {
  const digits = text.replace(/\D/g, "")
  if (!digits) return null
  const amount = Number(digits)
  return Number.isSafeInteger(amount) ? amount : null
}

// Index in `formatted` right after its `digitCount`-th digit, so the caret stays put when commas move.
export function caretAfterDigits(formatted: string, digitCount: number): number {
  if (digitCount <= 0) return 0
  let seen = 0
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i]) && ++seen === digitCount) return i + 1
  }
  return formatted.length
}
