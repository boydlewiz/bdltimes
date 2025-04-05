import Link from "next/link"
import { ArrowUpRight, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTrendingArticles } from "@/lib/articles"

export function TrendingArticles() {
  const trendingArticles = getTrendingArticles(4)

  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {trendingArticles.map((article, index) => (
        <Card
          key={article.id}
          className="overflow-hidden transition-all duration-200 hover:shadow-md border-primary/10 shadow-sm"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 bg-gradient-to-r from-primary/5 to-transparent">
            <Badge variant="outline" className="px-2 py-1 border-primary/20 bg-primary/5">
              {article.category}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="mr-1 h-4 w-4 text-primary" />
              {article.views ? `${Math.floor(article.views / 1000)}K` : "0"}
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-4">
            <Link href={`/article/${article.slug}`} className="group flex flex-col space-y-2" scroll={true}>
              <h3 className="line-clamp-2 font-serif font-semibold group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground dark:text-gray-300">{article.date}</span>
                <ArrowUpRight className="h-4 w-4 text-primary opacity-0 transition-all group-hover:opacity-100" />
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

