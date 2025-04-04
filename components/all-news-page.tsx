"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { ArticleGrid } from "@/components/article-grid"
import { CategoryFilter } from "@/components/category-filter"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"

export function AllNewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would trigger a search API call
    console.log("Searching for:", searchQuery)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  const handleFilterApply = () => {
    // In a real app, this would apply the filters and refresh the articles
    console.log("Applied filters:", { category: selectedCategory, sortBy })
  }

  return (
    <div className="container space-y-8 py-6 md:py-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">All News</h1>
        <p className="text-xl text-muted-foreground">Browse all the latest news articles from Pulse News</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <form onSubmit={handleSearch} className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Articles</SheetTitle>
                <SheetDescription>Refine your article search with these filters.</SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Politics", "Tech", "Sports", "Entertainment"].map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleCategoryChange(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Sort By</h3>
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button onClick={handleFilterApply}>Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="hidden sm:block">
        <CategoryFilter activeCategory={selectedCategory} />
      </div>

      <ArticleGrid category={selectedCategory} />
    </div>
  )
}

