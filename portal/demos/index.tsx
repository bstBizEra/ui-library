import type { ReactNode } from "react"

import HeroCentered from "@/components/hero-centered"
import { SearchIcon } from "@/components/ui/animated-search"
import { Flag } from "@/components/ui/flag"

import { DataTableSample } from "./data-table-sample"
import { LakAmount } from "@/components/lak-amount"
import { LaoPhone } from "@/components/lao-phone-input"
import {
  DropzoneSample,
  LakAmountSample,
  LaoPhoneSample,
  LocaleSwitcherSample,
  SearchButtonSample,
  TextEffectSample,
  ThemeToggleSample,
} from "./samples"

export type SampleState = {
  id: string
  label: string
  // What this row shows that the others do not.
  note: string
  // Frame height in px; the frame is a real page, so menus and blocks need room.
  height: number
  // Search string the frame opens with, for items that keep their state in the URL.
  query?: string
  // Load with the page even below the first row: a sample that opens itself on load must do so
  // while the page can still hand focus back, not later while the visitor scrolls.
  eager?: boolean
  render: () => ReactNode
}

export type Demo = {
  // Blocks are page-wide: light and dark stack instead of sitting side by side.
  wide?: boolean
  // The sample draws its own page edges (a hero block), so its frame gets no padding.
  bleed?: boolean
  states: SampleState[]
  // Known issues worth knowing before install, from README "Verification".
  notes?: string[]
}

export const demos: Record<string, Demo> = {
  "theme-toggle": {
    states: [
      { id: "system", label: "System", note: 'value="system"', height: 96, render: () => <ThemeToggleSample initial="system" /> },
      { id: "dark", label: "Dark picked", note: 'value="dark"', height: 96, render: () => <ThemeToggleSample initial="dark" /> },
    ],
  },
  "locale-switcher": {
    states: [
      { id: "en", label: "English", note: 'value="en"', height: 96, render: () => <LocaleSwitcherSample initial="en" /> },
      { id: "open", label: "Open", note: "Menu opened on load; pick a language to close it", height: 208, eager: true, render: () => <LocaleSwitcherSample initial="en" openOnLoad /> },
      { id: "lo", label: "Lao label", note: 'value="lo": checks the Lao script is not clipped', height: 96, render: () => <LocaleSwitcherSample initial="lo" /> },
    ],
    notes: [
      "Lighthouse can score 96 with the menu open when the trigger sits at the viewport centre (Base UI focus guards, axe-core#4832). Take open-menu snapshots with the trigger off-centre.",
    ],
  },
  dropzone: {
    states: [
      { id: "empty", label: "Empty", note: "Accepts PNG up to 1 MB", height: 232, render: () => <DropzoneSample state="empty" /> },
      { id: "error", label: "Rejected file", note: "onError message rendered by the app", height: 264, render: () => <DropzoneSample state="error" /> },
      { id: "file", label: "File chosen", note: "src holds one file", height: 232, render: () => <DropzoneSample state="file" /> },
    ],
    notes: ["The component only calls onError; render the message yourself, as the Rejected file row does."],
  },
  flag: {
    states: [
      {
        id: "codes",
        label: "All codes",
        note: "en, lo, th, zh",
        height: 96,
        render: () => (
          <ul className="flex gap-6 text-sm">
            {(["en", "lo", "th", "zh"] as const).map((code) => (
              <li key={code} className="flex items-center gap-2">
                <Flag code={code} />
                <code className="font-mono text-muted-foreground">{code}</code>
              </li>
            ))}
          </ul>
        ),
      },
      { id: "large", label: "Sized up", note: 'className="h-8 w-auto"', height: 112, render: () => <div className="flex gap-4">{(["en", "lo", "th", "zh"] as const).map((c) => <Flag key={c} code={c} className="h-8 w-auto" />)}</div> },
    ],
  },
  "animated-search": {
    states: [
      { id: "button", label: "In a button", note: "Animates on hover and keyboard focus", height: 96, render: () => <SearchButtonSample /> },
      { id: "icon", label: "Icon alone", note: "Animates on its own hover; size={28}", height: 96, render: () => <SearchIcon aria-hidden="true" /> },
    ],
    notes: ["The animation does not honour prefers-reduced-motion; wrap the app in <MotionConfig reducedMotion=\"user\">."],
  },
  "text-effect": {
    states: [
      { id: "word", label: "Per word, fade", note: 'per="word" preset="fade"', height: 112, render: () => <TextEffectSample per="word" preset="fade" text="Ship the same UI twice" /> },
      { id: "char", label: "Per character, blur", note: 'per="char" preset="blur"', height: 112, render: () => <TextEffectSample per="char" preset="blur" text="Ship the same UI twice" /> },
    ],
    notes: ["With reduced motion the text renders plainly, after hydration; the server HTML starts hidden."],
  },
  "lak-amount": {
    states: [
      { id: "empty", label: "Empty", note: "value={null}; type or paste to fill", height: 120, render: () => <LakAmountSample initial={null} /> },
      { id: "filled", label: "Amount", note: "value={1250000}", height: 120, render: () => <LakAmountSample initial={1250000} /> },
      { id: "max", label: "With a limit", note: "max={5000000}: digits past the limit are refused", height: 140, render: () => <LakAmountSample initial={4800000} max={5000000} /> },
      { id: "lao", label: "Lao unit", note: 'unit="lao": ກີບ instead of ₭', height: 120, render: () => <LakAmountSample initial={1250000} unit="lao" /> },
      {
        id: "display",
        label: "Display",
        note: "<LakAmount amount={…} />",
        height: 112,
        render: () => (
          <ul className="grid gap-1 text-sm">
            {[0, 50000, 1250000, 987654321].map((n) => (
              <li key={n}>
                <LakAmount amount={n} />
              </li>
            ))}
            <li>
              <LakAmount amount={1250000} unit="lao" />
            </li>
          </ul>
        ),
      },
    ],
    notes: ["Whole kip only: kip has no cents in practice, so dots and commas in pasted text are read as grouping."],
  },
  "lao-phone": {
    states: [
      { id: "empty", label: "Empty", note: 'value=""', height: 120, render: () => <LaoPhoneSample initial="" /> },
      { id: "mobile", label: "Mobile", note: 'value="2055512345"', height: 120, render: () => <LaoPhoneSample initial="2055512345" /> },
      { id: "landline", label: "Landline", note: 'value="21412345" (Vientiane)', height: 120, render: () => <LaoPhoneSample initial="21412345" /> },
      { id: "partial", label: "Incomplete", note: "E.164 stays null until the number is whole", height: 120, render: () => <LaoPhoneSample initial="20555" /> },
      {
        id: "display",
        label: "Display",
        note: "<LaoPhone digits={…} />: complete numbers are tel: links",
        height: 96,
        render: () => (
          <ul className="grid gap-1 text-sm">
            <li>
              <LaoPhone digits="2055512345" />
            </li>
            <li>
              <LaoPhone digits="21412345" />
            </li>
          </ul>
        ),
      },
    ],
    notes: [
      "Two shapes: mobile 20 + 8 digits, landline area code + 6 digits. Other ranges (VoIP 30 numbers) are not handled yet.",
      "Store the E.164 value (+8562055512345) that onValueChange hands back; it is null while the number is incomplete.",
    ],
  },
  "data-table": {
    wide: true,
    states: [
      { id: "empty", label: "Empty", note: "data={[]}", height: 280, render: () => <DataTableSample rows="none" /> },
      { id: "filtered", label: "Filtered", note: "Status is Overdue, set in the URL", height: 560, query: "?status=overdue", render: () => <DataTableSample rows="all" /> },
      { id: "paginated", label: "Paginated", note: "47 synthetic invoices, page 3 of 5", height: 560, query: "?page=3", render: () => <DataTableSample rows="all" /> },
    ],
    notes: [
      "Wrap the app in NuqsAdapter (nuqs/adapters/next/app): filters, sorting and page live in the URL.",
      "Give every column an explicit id: useDataTable skips columns without one for sorting and filtering, even when they have an accessor.",
      "Base UI only. Radix projects install sadmann7/tablecn/data-table#2d74ac5827aa7abf60e334759e38cf7cdcb24d54.",
    ],
  },
  "hero-centered": {
    wide: true,
    bleed: true,
    states: [{ id: "default", label: "Default", note: "Placeholder copy and screenshot frame from the item", height: 480, render: () => <HeroCentered /> }],
    notes: ["Needs Tailwind v4."],
  },
}
