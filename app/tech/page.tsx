import type { Metadata } from "next"
import { CategoryPage } from "@/components/category-page"

export const metadata: Metadata = {
  title: "Technology News - Pulse News",
  description: "Breaking tech news, reviews, and insights on the latest innovations",
}

export default function TechPage() {
  return (
    <CategoryPage category="Tech" description="Breaking tech news, reviews, and insights on the latest innovations" />
  )
}

