import type { Metadata } from "next"
import { CategoryPage } from "@/components/category-page"

export const metadata: Metadata = {
  title: "Sports News - Pulse News",
  description: "Latest sports updates, scores, highlights, and analysis",
}

export default function SportsPage() {
  return <CategoryPage category="Sports" description="Latest sports updates, scores, highlights, and analysis" />
}

