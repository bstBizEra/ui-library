"use client"

import { useEffect, useRef, useState } from "react"

// minHeight leaves room for popups (menus portal out of the content flow, so they add no height).
export function SampleFrame({ src, title, minHeight, lazy }: { src: string; title: string; minHeight: number; lazy?: boolean }) {
  const ref = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(minHeight)

  useEffect(() => {
    // The frame and this page hydrate in either order, so ask until the frame answers;
    // after that its ResizeObserver keeps us current.
    const ask = setInterval(() => ref.current?.contentWindow?.postMessage({ type: "frame-height-request" }, "*"), 250)
    const mountedAt = performance.now()
    const scrollAtMount = window.scrollY
    let visitorActed = false
    const acted = () => (visitorActed = true)
    const actions = ["wheel", "touchmove", "keydown", "pointerdown"] as const
    actions.forEach((a) => window.addEventListener(a, acted, { once: true }))
    // A sample that opens itself on load (a menu) pulls focus, and the scroll, into its frame.
    // Give both back, but only right after load and before the visitor has done anything.
    // The page's window blurs the moment focus enters a frame, so check then, not when the frame reports.
    function onWindowBlur() {
      setTimeout(() => {
        if (visitorActed || performance.now() - mountedAt > 2000 || document.activeElement !== ref.current) return
        ref.current?.blur()
        window.scrollTo({ top: scrollAtMount })
      })
    }
    function onMessage(e: MessageEvent) {
      if (e.source !== ref.current?.contentWindow || e.data?.type !== "frame-height") return
      clearInterval(ask)
      setHeight(Math.max(minHeight, Math.ceil(e.data.height)))
    }
    window.addEventListener("message", onMessage)
    window.addEventListener("blur", onWindowBlur)
    return () => {
      clearInterval(ask)
      window.removeEventListener("message", onMessage)
      window.removeEventListener("blur", onWindowBlur)
      actions.forEach((a) => window.removeEventListener(a, acted))
    }
  }, [minHeight])

  // A 0px flex basis drops the iframe's default 150px height; the frame then fills a row its label makes taller.
  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      loading={lazy ? "lazy" : undefined}
      className="block w-full flex-[1_1_0px]"
      style={{ minHeight: height }}
    />
  )
}
