import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getArticlesByCategory } from "@/lib/articles"
import { ArrowRight } from "lucide-react"

interface ArticleGridProps {
  category: string
  limit?: number
}

export function ArticleGrid({ category, limit = 6 }: ArticleGridProps) {
  const articles = getArticlesByCategory(category).slice(0, limit)

  if (articles.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No articles found in this category.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <Card key={article.id} className="overflow-hidden article-card border-primary/10 shadow-sm">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={article.image || "/placeholder.svg?height=200&width=400"}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-102"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent" />
            <Badge className="absolute top-3 right-3 bg-primary/80 text-white">{article.category}</Badge>
          </div>
          <CardHeader className="p-4 bg-primary/5 border-b border-primary/10">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{article.date}</span>
              <span className="text-xs font-medium text-primary">By {article.author}</span>
            </div>
            <CardTitle className="line-clamp-2 text-xl font-serif mt-2 group-hover:text-primary transition-colors">
              <Link href={`/article/${article.slug}`} className="hover:text-primary transition-colors" scroll={true}>
                {article.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <p className="line-clamp-3 text-sm text-muted-foreground text-pretty">{article.excerpt}</p>
          </CardContent>
          <CardFooter className="p-4 bg-primary/5 border-t border-primary/10">
            <Button asChild variant="ghost" className="w-full group hover:bg-primary/10">
              <Link
                href={`/article/${article.slug}`}
                className="flex items-center justify-center text-primary"
                scroll={true}
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

