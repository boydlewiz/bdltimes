import type { Metadata } from "next"
import { AllNewsPage } from "@/components/all-news-page"

export const metadata: Metadata = {
  title: "All News - Pulse News",
  description: "Browse all the latest news articles from Pulse News",
}

export default function AllNews() {
  return <AllNewsPage />
}

