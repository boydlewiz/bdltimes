import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { CategoryFilter } from "@/components/category-filter"
import { getArticlesByCategory } from "@/lib/articles"
import { ArrowRight } from "lucide-react"

interface CategoryPageProps {
  category: string
  description: string
}

export function CategoryPage({ category, description }: CategoryPageProps) {
  const articles = getArticlesByCategory(category)
  const featuredArticle = articles[0]
  const remainingArticles = articles.slice(1)

  return (
    <div className="container space-y-10 py-6 md:py-10">
      <section className="space-y-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">{category} News</h1>
          <p className="text-xl text-muted-foreground">{description}</p>
        </div>

        <CategoryFilter activeCategory={category} />
      </section>

      {featuredArticle && (
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-lg border border-primary/20 bg-background card-shine hover-3d group">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto overflow-hidden">
                <Image
                  src={featuredArticle.image || "/placeholder.svg?height=800&width=800"}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent md:bg-gradient-to-b"></div>
              </div>
              <div className="flex flex-col justify-center space-y-4 p-6 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="space-y-2">
                  <Badge className="inline-block bg-primary text-white shadow-md">{featuredArticle.category}</Badge>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl group-hover:text-primary transition-colors">
                    {featuredArticle.title}
                  </h1>
                  <p className="text-xl text-muted-foreground">{featuredArticle.excerpt}</p>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">By {featuredArticle.author}</span>
                  </div>
                  <div className="text-muted-foreground">{featuredArticle.date}</div>
                </div>
                <Button asChild size="lg" className="w-fit ripple group">
                  <Link href={`/article/${featuredArticle.slug}`} scroll={true} className="flex items-center">
                    Read Full Story
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {remainingArticles.map((article, index) => (
            <Card
              key={article.id}
              className="overflow-hidden article-card card-shine hover-3d group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg?height=200&width=400"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <Badge className="absolute top-3 right-3 bg-primary/80 text-white shadow-md">{article.category}</Badge>
              </div>
              <CardHeader className="p-4 bg-primary/5 border-b border-primary/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                  <span className="text-xs font-medium text-primary">By {article.author}</span>
                </div>
                <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">
                  <Link href={`/article/${article.slug}`} className="fancy-link" scroll={true}>
                    {article.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <p className="line-clamp-3 text-sm text-muted-foreground text-pretty">{article.excerpt}</p>
              </CardContent>
              <CardFooter className="p-4 bg-primary/5 border-t border-primary/10">
                <Button asChild variant="ghost" className="w-full ripple group">
                  <Link
                    href={`/article/${article.slug}`}
                    scroll={true}
                    className="flex items-center justify-between text-primary"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-10">
        <NewsletterSignup />
      </section>
    </div>
  )
}

