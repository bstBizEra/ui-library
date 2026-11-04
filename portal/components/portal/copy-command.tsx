"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)
  // The path may truncate; the pinned tag never does.
  const [path, tag] = command.split("#")
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-lg border bg-muted/50 py-1.5 pr-1.5 pl-3">
      <code className="flex min-w-0 font-mono text-[13px]" title={command}>
        <span className="truncate">{path}</span>
        {tag && <span className="shrink-0">#{tag}</span>}
      </code>
      <Button
        size="sm"
        className="shrink-0"
        onClick={async () => {
          await navigator.clipboard.writeText(command)
          setCopied(true)
          setTimeout(() => setCopied(false), 1600)
        }}
      >
        {copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </Button>
    </div>
  )
}
