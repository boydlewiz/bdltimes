"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface CategoryFilterProps {
  activeCategory: string
}

export function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  const router = useRouter()

  const categories = [
    { name: "All", path: "/" },
    { name: "Politics", path: "/politics" },
    { name: "Tech", path: "/tech" },
    { name: "Sports", path: "/sports" },
    { name: "Entertainment", path: "/entertainment" },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.name}
          variant={category.name === activeCategory ? "default" : "outline"}
          size="sm"
          onClick={() => router.push(category.path)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}

