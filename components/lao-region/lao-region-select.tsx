"use client"

import { useId } from "react"

import { cn } from "@/lib/utils"
import { LAO_PROVINCES, type LaoDistrict, type LaoProvince } from "@/lib/lao-regions"
import { matchesLaoRegion } from "@/lib/lao-region-search"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox"
import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"

export type LaoRegionValue = { province: string | null; district: string | null }

const TEXT = {
  en: {
    province: "Province",
    district: "District",
    pickProvince: "Pick a province first",
    search: "Type in English or Lao",
    none: "No match",
    showProvinces: "Show provinces",
    showDistricts: "Show districts",
  },
  lo: {
    province: "ແຂວງ",
    district: "ເມືອງ",
    pickProvince: "ເລືອກແຂວງກ່ອນ",
    search: "ພິມພາສາລາວ ຫຼື ອັງກິດ",
    none: "ບໍ່ພົບ",
    showProvinces: "ສະແດງແຂວງ",
    showDistricts: "ສະແດງເມືອງ",
  },
}

// shadcn's ComboboxInput draws its chevron as a button with no accessible name (axe button-name),
// so this draws the same chevron with a label instead. It stays out of the tab order: keyboard users open the list
// from the input (ArrowDown), and Base UI hides the rest of the field from screen readers while the list is open.
function NamedTrigger({ label, disabled }: { label: string; disabled?: boolean }) {
  return (
    <InputGroupAddon align="inline-end">
      <InputGroupButton
        size="icon-xs"
        variant="ghost"
        render={<ComboboxTrigger aria-label={label} tabIndex={-1} />}
        className="data-pressed:bg-transparent"
        disabled={disabled}
      />
    </InputGroupAddon>
  )
}

// Controlled: value holds P-codes ({ province: "LA06", district: "LA0601" }). Picking another province clears the district.
// `lang` sets which name leads in the field and the labels; every option shows both, and search matches either.
export function LaoRegionSelect({
  value,
  onValueChange,
  lang = "en",
  className,
}: {
  value: LaoRegionValue
  onValueChange: (value: LaoRegionValue) => void
  lang?: "en" | "lo"
  className?: string
}) {
  const id = useId()
  const text = TEXT[lang]
  const province = LAO_PROVINCES.find((p) => p.code === value.province) ?? null
  const district = province?.districts.find((d) => d.code === value.district) ?? null
  const name = (item: LaoProvince | LaoDistrict) => (lang === "lo" ? item.lo : item.en)

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)} lang={lang === "lo" ? "lo" : undefined}>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-province`}>{text.province}</Label>
        <Combobox
          items={LAO_PROVINCES}
          value={province}
          onValueChange={(p: LaoProvince | null) => onValueChange({ province: p?.code ?? null, district: null })}
          itemToStringLabel={name}
          // The hidden form input carries the P-code, not the whole object.
          itemToStringValue={(p: LaoProvince) => p.code}
          isItemEqualToValue={(a: LaoProvince, b: LaoProvince) => a.code === b.code}
          filter={(p: LaoProvince, query: string) => matchesLaoRegion(p, query)}
        >
          <ComboboxInput id={`${id}-province`} placeholder={text.search} className="w-full" showTrigger={false}>
            <NamedTrigger label={text.showProvinces} />
          </ComboboxInput>
          <ComboboxContent>
            <ComboboxEmpty>{text.none}</ComboboxEmpty>
            <ComboboxList>
              {(p: LaoProvince) => (
                <ComboboxItem key={p.code} value={p}>
                  <RegionName item={p} lang={lang} />
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-district`}>{text.district}</Label>
        <Combobox
          items={province?.districts ?? []}
          value={district}
          onValueChange={(d: LaoDistrict | null) => onValueChange({ province: value.province, district: d?.code ?? null })}
          itemToStringLabel={name}
          itemToStringValue={(d: LaoDistrict) => d.code}
          isItemEqualToValue={(a: LaoDistrict, b: LaoDistrict) => a.code === b.code}
          filter={(d: LaoDistrict, query: string) => matchesLaoRegion(d, query)}
          disabled={!province}
        >
          <ComboboxInput id={`${id}-district`} placeholder={province ? text.search : text.pickProvince} disabled={!province} className="w-full" showTrigger={false}>
            <NamedTrigger label={text.showDistricts} disabled={!province} />
          </ComboboxInput>
          <ComboboxContent>
            <ComboboxEmpty>{text.none}</ComboboxEmpty>
            <ComboboxList>
              {(d: LaoDistrict) => (
                <ComboboxItem key={d.code} value={d}>
                  <RegionName item={d} lang={lang} />
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  )
}

// The leading name in the chosen language, the other one after it, quieter.
function RegionName({ item, lang }: { item: LaoProvince | LaoDistrict; lang: "en" | "lo" }) {
  const [first, second] = lang === "lo" ? [item.lo, item.en] : [item.en, item.lo]
  return (
    <span className="flex min-w-0 items-baseline gap-2">
      <span lang={lang === "lo" ? "lo" : undefined}>{first}</span>
      <span lang={lang === "lo" ? undefined : "lo"} className="truncate text-muted-foreground">
        {second}
      </span>
    </span>
  )
}
