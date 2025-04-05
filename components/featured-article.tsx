import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getFeaturedArticles } from "@/lib/articles"
import { ArrowRight } from "lucide-react"

export function FeaturedArticle() {
  const featuredArticles = getFeaturedArticles()
  const article = featuredArticles[0] // Get the first featured article

  if (!article) {
    return null
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/10 bg-background shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-square md:aspect-auto">
          <Image
            src={article.image || "/placeholder.svg?height=800&width=800"}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-102"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:bg-gradient-to-b" />
          <Badge className="absolute top-4 left-4 bg-primary hover:bg-primary/80 md:hidden">Breaking News</Badge>
        </div>
        <div className="flex flex-col justify-center space-y-6 p-8">
          <div className="space-y-3">
            <Badge className="hidden bg-primary hover:bg-primary/80 md:inline-block">Breaking News</Badge>
            <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl gradient-text">
              {article.title}
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">{article.excerpt}</p>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <span className="font-medium">By {article.author}</span>
            </div>
            <div className="text-muted-foreground">{article.date}</div>
          </div>
          <Button asChild size="lg" className="w-fit group">
            <Link href={`/article/${article.slug}`} scroll={true} className="text-primary-foreground">
              Read Full Story
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

