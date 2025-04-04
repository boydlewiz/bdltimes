"use client"

import { useSearchParams } from "next/navigation"
import { SearchResults } from "@/components/search-results"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  return <SearchResults query={query} />
}

