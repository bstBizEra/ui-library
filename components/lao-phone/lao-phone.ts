// Lao phone numbers (+856), after the national numbering plan registered with the ITU
// (https://www.itu.int/oth/T0202000075/en, NAPT communication of 18.I.2011):
// - mobile: 20 then an 8-digit subscriber number, written 20 5551 2345;
// - landline: a 2-digit area code (21 Vientiane, 31, 41, 51, 54, 71, …) then 6 digits, written 21 412 345.
// The ITU plan has no 030 range; 030 (prepaid wireless) is taken as 30 then 7 digits, written 30 555 1234,
// from operator dialing guides, not an official source.

const COUNTRY = "856"

type Shape = { length: number; groups: number[] }

function shapeOf(digits: string): Shape {
  if (digits.startsWith("20")) return { length: 10, groups: [2, 4, 4] }
  if (digits.startsWith("30")) return { length: 9, groups: [2, 3, 4] }
  return { length: 8, groups: [2, 3, 3] }
}

function maxLength(digits: string) {
  return shapeOf(digits).length
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
  const { groups } = shapeOf(digits)
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
