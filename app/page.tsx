import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingArticles } from "@/components/trending-articles"
import { FeaturedArticle } from "@/components/featured-article"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { ArticleGrid } from "@/components/article-grid"
import { CategoryFilter } from "@/components/category-filter"

export default function Home() {
  return (
    <div className="container space-y-10 py-6 md:py-10">
      <section className="space-y-6">
        <FeaturedArticle />
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Trending Now</h2>
          <Link href="/trending" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        <TrendingArticles />
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Browse by Category</h2>
          <CategoryFilter activeCategory="All" />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="politics">Politics</TabsTrigger>
            <TabsTrigger value="tech">Tech</TabsTrigger>
            <TabsTrigger value="sports">Sports</TabsTrigger>
            <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ArticleGrid category="All" limit={6} />
          </TabsContent>

          <TabsContent value="politics">
            <ArticleGrid category="Politics" limit={6} />
          </TabsContent>

          <TabsContent value="tech">
            <ArticleGrid category="Tech" limit={6} />
          </TabsContent>

          <TabsContent value="sports">
            <ArticleGrid category="Sports" limit={6} />
          </TabsContent>

          <TabsContent value="entertainment">
            <ArticleGrid category="Entertainment" limit={6} />
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button asChild size="lg">
            <Link href="/all-news">View All Articles</Link>
          </Button>
        </div>
      </section>

      <section className="py-10">
        <NewsletterSignup />
      </section>
    </div>
  )
}

