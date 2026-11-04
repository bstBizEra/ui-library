import { redirect } from "next/navigation"

import { items } from "@/lib/items"

export default function Home() {
  redirect(`/items/${items[0].slug}`)
}
