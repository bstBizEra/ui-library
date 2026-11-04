// Lao phone numbers (+856). Mobile: 20 then 8 digits, written 20 5551 2345.
// Landline: a 2-digit area code (21 Vientiane, 31, 41, …) then 6 digits, written 21 412 345.
// shortcut: two shapes only, from the common published formats; add others (VoIP 30 numbers) when a project needs them.

const COUNTRY = "856"

function isMobile(digits: string) {
  return digits.startsWith("20")
}

function maxLength(digits: string) {
  return isMobile(digits) ? 10 : 8
}

// The national digits from anything typed or pasted: drops spaces and punctuation,
// a leading +856 / 856, and the domestic trunk 0, then cuts at the allowed length.
export function laoPhoneDigits(text: string): string {
  let digits = text.replace(/\D/g, "")
  if (/^\s*\+?\s*856/.test(text) || (digits.startsWith(COUNTRY) && digits.length > 10)) digits = digits.slice(COUNTRY.length)
  digits = digits.replace(/^0+/, "")
  return digits.slice(0, maxLength(digits))
}

export function formatLaoPhoneNational(digits: string): string {
  const groups = isMobile(digits) ? [2, 4, 4] : [2, 3, 3]
  const parts: string[] = []
  let at = 0
  for (const size of groups) {
    if (at >= digits.length) break
    parts.push(digits.slice(at, at + size))
    at += size
  }
  return parts.join(" ")
}

export function formatLaoPhone(digits: string): string {
  return `+${COUNTRY} ${formatLaoPhoneNational(digits)}`
}

// +8562055512345 for a complete number, null while it is incomplete.
export function toE164(digits: string): string | null {
  return digits.length > 0 && digits.length === maxLength(digits) ? `+${COUNTRY}${digits}` : null
}

// Index in `formatted` right after its `digitCount`-th digit, so the caret stays put when spaces move.
export function caretAfterDigits(formatted: string, digitCount: number): number {
  if (digitCount <= 0) return 0
  let seen = 0
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i]) && ++seen === digitCount) return i + 1
  }
  return formatted.length
}
