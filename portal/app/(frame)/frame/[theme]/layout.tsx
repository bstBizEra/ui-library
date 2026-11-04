import { Geist, Geist_Mono } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Suspense } from "react"

import "../../../globals.css"
import { ReportHeight } from "@/components/portal/report-height"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export function generateStaticParams() {
  return [{ theme: "light" }, { theme: "dark" }]
}

// Root layout for sample frames: each frame is a real page in one fixed theme, so menus that
// portal to <body> render in that theme too.
export default async function FrameLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ theme: string }>
}) {
  const { theme } = await params
  return (
    <html
      lang="en"
      // overflow-hidden: the portal sizes every frame to its content, so a sub-pixel overflow must not draw a scrollbar.
      className={cn("antialiased font-sans overflow-hidden", theme === "dark" && "dark", geist.variable, fontMono.variable)}
      style={{ colorScheme: theme === "dark" ? "dark" : "light" }}
    >
      <body className="bg-background text-foreground">
        {/* Samples that keep state in the URL (data-table) read it through nuqs; frames are static, so suspend until the client reads it. */}
        <NuqsAdapter>
          <Suspense>{children}</Suspense>
        </NuqsAdapter>
        <ReportHeight />
      </body>
    </html>
  )
}
