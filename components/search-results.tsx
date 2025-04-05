"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { searchArticles, type Article } from "@/lib/articles"

interface SearchResultsProps {
  query: string
}

export function SearchResults({ query: initialQuery }: SearchResultsProps) {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Article[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery)
      performSearch(initialQuery)
    }
  }, [initialQuery])

  const performSearch = (searchQuery: string) => {
    setIsSearching(true)

    // Simulate API delay
    setTimeout(() => {
      const searchResults = searchArticles(searchQuery)
      setResults(searchResults)
      setIsSearching(false)
    }, 500)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) return

    // Update URL with search query
    router.push(`/search?q=${encodeURIComponent(query)}`)
    performSearch(query)
  }

  return (
    <div className="container space-y-8 py-6 md:py-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Search Results</h1>
        {initialQuery && <p className="text-xl text-muted-foreground">Showing results for "{initialQuery}"</p>}
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-8"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={!query.trim() || isSearching}>
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </form>

      {isSearching ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={article.image || "/placeholder.svg?height=200&width=400"}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{article.category}</Badge>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <CardTitle className="line-clamp-2 text-xl">
                  <Link href={`/article/${article.slug}`} scroll={true}>
                    {article.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="line-clamp-3 text-sm text-muted-foreground">{article.excerpt}</p>
              </CardContent>
              <CardFooter className="p-4">
                <Button asChild variant="ghost" className="w-full">
                  <Link href={`/article/${article.slug}`} scroll={true}>
                    Read More
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : initialQuery ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">No results found</h2>
          <p className="text-muted-foreground">
            We couldn't find any articles matching "{initialQuery}". Please try a different search term.
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Search for articles</h2>
          <p className="text-muted-foreground">Enter a search term above to find relevant articles.</p>
        </div>
      )}
    </div>
  )
}

