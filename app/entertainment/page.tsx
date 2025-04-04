import type { Metadata } from "next"
import { CategoryPage } from "@/components/category-page"

export const metadata: Metadata = {
  title: "Entertainment News - Pulse News",
  description: "Celebrity news, movie reviews, music updates, and cultural trends",
}

export default function EntertainmentPage() {
  return (
    <CategoryPage
      category="Entertainment"
      description="Celebrity news, movie reviews, music updates, and cultural trends"
    />
  )
}

