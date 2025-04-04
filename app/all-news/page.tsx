import type { Metadata } from "next"
import { AllNewsPage } from "@/components/all-news-page"

export const metadata: Metadata = {
  title: "All News - BDL Times",
  description: "Browse all the latest news articles from BDL Times",
}

export default function AllNews() {
  return <AllNewsPage />
}

