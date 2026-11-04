"use client"

import { useEffect, useId, useRef, useState } from "react"
import { RotateCcwIcon } from "lucide-react"

import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/dropzone"
import { LakAmount, LakAmountInput } from "@/components/lak-amount"
import { LaoPhoneInput } from "@/components/lao-phone-input"
import { LaoRegionSelect, type LaoRegionValue } from "@/components/lao-region-select"
import type { LakUnit } from "@/lib/lak"
import { toE164 } from "@/lib/lao-phone"
import { Label } from "@/components/ui/label"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { ThemeToggle, type ThemeMode } from "@/components/theme-toggle"
import { SearchIcon, type SearchIconHandle } from "@/components/ui/animated-search"
import { Button } from "@/components/ui/button"
import { type FlagCode } from "@/components/ui/flag"
import { TextEffect, type PerType, type PresetType } from "@/components/ui/text-effect"

export function LakAmountSample({ initial, max, unit }: { initial: number | null; max?: number; unit?: LakUnit }) {
  const [value, setValue] = useState(initial)
  const id = useId()
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>{unit === "lao" ? <span lang="lo">ຈຳນວນເງິນ</span> : "Amount"}</Label>
      <LakAmountInput id={id} value={value} onValueChange={setValue} max={max} unit={unit} placeholder="0" />
      <p className="text-sm text-muted-foreground">
        {max !== undefined ? <>Limit <LakAmount amount={max} unit={unit} />. </> : null}
        Value: <code className="font-mono">{value === null ? "null" : value}</code>
      </p>
    </div>
  )
}

export function LaoRegionSample({ initial, lang }: { initial: LaoRegionValue; lang?: "en" | "lo" }) {
  const [value, setValue] = useState(initial)
  return (
    <div className="grid w-full max-w-xl gap-2">
      <LaoRegionSelect value={value} onValueChange={setValue} lang={lang} />
      <p className="text-sm break-all text-muted-foreground">
        Value: <code className="font-mono">{JSON.stringify(value)}</code>
      </p>
    </div>
  )
}

export function LaoPhoneSample({ initial }: { initial: string }) {
  const [digits, setDigits] = useState(initial)
  const [e164, setE164] = useState(() => toE164(initial))
  const id = useId()
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>Phone</Label>
      <LaoPhoneInput
        id={id}
        value={digits}
        onValueChange={(d, e) => {
          setDigits(d)
          setE164(e)
        }}
        placeholder="20 5551 2345"
      />
      <p className="text-sm text-muted-foreground">
        E.164: <code className="font-mono">{e164 ?? "null (incomplete)"}</code>
      </p>
    </div>
  )
}

export function ThemeToggleSample({ initial }: { initial: ThemeMode }) {
  const [value, setValue] = useState(initial)
  return <ThemeToggle value={value} onValueChange={setValue} />
}

const LOCALES = [
  { value: "en", label: "English" },
  { value: "lo", label: "ລາວ" },
  { value: "th", label: "ไทย" },
  { value: "zh", label: "中文" },
] as { value: FlagCode; label: string }[]

export function LocaleSwitcherSample({ initial, openOnLoad }: { initial: FlagCode; openOnLoad?: boolean }) {
  const [value, setValue] = useState(initial)
  const wrapper = useRef<HTMLDivElement>(null)
  // The item keeps its open state inside, so open it the way a user would rather than edit the item.
  useEffect(() => {
    if (openOnLoad) wrapper.current?.querySelector<HTMLElement>("[data-slot=dropdown-menu-trigger]")?.click()
  }, [openOnLoad])
  return (
    <div ref={wrapper}>
      <LocaleSwitcher value={value} options={LOCALES} onValueChange={setValue} />
    </div>
  )
}

export function DropzoneSample({ state }: { state: "empty" | "error" | "file" }) {
  const [error, setError] = useState<string | null>(
    state === "error" ? "File type must be one of image/png, .png" : null
  )
  const [files, setFiles] = useState<File[] | undefined>(() =>
    state === "file" ? [new File(["x"], "report.png", { type: "image/png" })] : undefined
  )
  return (
    <div className="w-full max-w-md">
      <Dropzone
        accept={{ "image/png": [".png"] }}
        maxSize={1024 * 1024}
        src={files}
        onDrop={(accepted) => {
          setFiles(accepted)
          setError(null)
        }}
        onError={(e) => setError(e.message)}
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
      {error && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function SearchButtonSample() {
  const icon = useRef<SearchIconHandle>(null)
  return (
    <Button
      variant="outline"
      onMouseEnter={() => icon.current?.startAnimation()}
      onMouseLeave={() => icon.current?.stopAnimation()}
      onFocus={() => icon.current?.startAnimation()}
      onBlur={() => icon.current?.stopAnimation()}
    >
      <SearchIcon ref={icon} size={16} aria-hidden="true" />
      Search
    </Button>
  )
}

export function TextEffectSample({ per, preset, text }: { per: PerType; preset: PresetType; text: string }) {
  const [run, setRun] = useState(0)
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <TextEffect key={run} per={per} preset={preset} as="p" className="text-3xl font-medium tracking-tight">
        {text}
      </TextEffect>
      <Button variant="outline" size="sm" onClick={() => setRun((n) => n + 1)}>
        <RotateCcwIcon aria-hidden="true" />
        Replay
      </Button>
    </div>
  )
}
