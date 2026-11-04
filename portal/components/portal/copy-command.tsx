"use client"

import { useRef, useState } from "react"
import { CheckIcon, CopyIcon, TriangleAlertIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CopyCommand({ command }: { command: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle")
  const code = useRef<HTMLElement>(null)
  // The path may truncate; the pinned tag never does.
  const [path, tag] = command.split("#")

  async function copy() {
    let next: "copied" | "failed" = "copied"
    try {
      // Missing over plain http on a LAN address, and refusable by the browser.
      await navigator.clipboard.writeText(command)
    } catch {
      // Select the full command so Ctrl+C works; truncation is visual only.
      const range = document.createRange()
      range.selectNodeContents(code.current!)
      window.getSelection()?.removeAllRanges()
      window.getSelection()?.addRange(range)
      next = "failed"
    }
    setStatus(next)
    setTimeout(() => setStatus("idle"), next === "failed" ? 4000 : 1600)
  }

  return (
    <div className="flex min-w-0 items-center gap-2 rounded-lg border bg-muted/50 py-1.5 pr-1.5 pl-3">
      <code
        ref={code}
        className="flex min-w-0 font-mono text-[13px]"
        title={command}
        // Path and tag are separate flex items, so a plain selection copies them on two lines.
        onCopy={(e) => {
          e.preventDefault()
          e.clipboardData.setData("text/plain", command)
        }}
      >
        <span className="truncate">{path}</span>
        {tag && <span className="shrink-0">#{tag}</span>}
      </code>
      <Button size="sm" className="shrink-0" onClick={copy}>
        {status === "copied" ? <CheckIcon aria-hidden="true" /> : status === "failed" ? <TriangleAlertIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
        <span aria-live="polite">{status === "copied" ? "Copied" : status === "failed" ? "Copy failed: press Ctrl+C" : "Copy"}</span>
      </Button>
    </div>
  )
}
