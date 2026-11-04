"use client"

import { useEffect } from "react"

// Tells the portal page how tall this sample frame's content is, so the iframe never scrolls.
// It also answers a request, in case the page hydrated after the first report.
export function ReportHeight() {
  useEffect(() => {
    const post = () => window.parent.postMessage({ type: "frame-height", height: document.body.scrollHeight }, "*")
    const onRequest = (e: MessageEvent) => e.data?.type === "frame-height-request" && post()
    const observer = new ResizeObserver(post)
    observer.observe(document.body)
    window.addEventListener("message", onRequest)
    return () => {
      observer.disconnect()
      window.removeEventListener("message", onRequest)
    }
  }, [])
  return null
}
