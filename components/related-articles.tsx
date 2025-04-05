import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getRelatedArticles } from "@/lib/articles"
import { ArrowRight } from "lucide-react"

interface RelatedArticlesProps {
  currentSlug: string
}

export function RelatedArticles({ currentSlug }: RelatedArticlesProps) {
  const relatedArticles = getRelatedArticles(currentSlug, 3)

  if (relatedArticles.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">No related articles found.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {relatedArticles.map((article) => (
        <Card key={article.id} className="overflow-hidden article-card hover-3d group">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <Badge className="absolute top-3 right-3 bg-primary/80 text-white">{article.category}</Badge>
          </div>
          <CardHeader className="p-4 border-b border-primary/10">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{article.date}</span>
            </div>
            <h3 className="line-clamp-2 text-lg font-semibold mt-2 group-hover:text-primary transition-colors">
              <Link href={`/article/${article.slug}`} scroll={true}>
                {article.title}
              </Link>
            </h3>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <p className="line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
          </CardContent>
          <CardFooter className="p-4 border-t border-primary/10 bg-primary/5">
            <Link
              href={`/article/${article.slug}`}
              className="text-sm font-medium text-primary hover:underline flex items-center w-full justify-between group"
              scroll={true}
            >
              <span>Read More</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

