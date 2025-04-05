import type { Metadata } from "next"
import { CategoryPage } from "@/components/category-page"

export const metadata: Metadata = {
  title: "Politics News - Pulse News",
  description: "Latest politics news, analysis, and updates from around the world",
}

export default function PoliticsPage() {
  return (
    <CategoryPage category="Politics" description="Latest politics news, analysis, and updates from around the world" />
  )
}

