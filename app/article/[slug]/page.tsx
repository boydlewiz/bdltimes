import Image from "next/image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArticleActions } from "@/components/article-actions"
import { RelatedArticles } from "@/components/related-articles"
import { CommentSection } from "@/components/comment-section"
import { getArticleBySlug } from "@/lib/articles"

interface ArticlePageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: "Article Not Found - Pulse News",
      description: "The requested article could not be found.",
    }
  }

  return {
    title: `${article.title} - Pulse News`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishDate,
      authors: [article.author],
      tags: article.tags,
    },
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <article className="container max-w-4xl py-10">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{article.category}</Badge>
          {article.tags?.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{article.title}</h1>

        <p className="text-xl text-muted-foreground">{article.excerpt}</p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <span className="font-medium">By {article.author}</span>
              {article.authorTitle && <span className="text-sm text-muted-foreground">{article.authorTitle}</span>}
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div>{article.publishDate || article.date}</div>
            {article.readTime && <div>{article.readTime}</div>}
            {article.views && <div>{article.views.toLocaleString()} views</div>}
          </div>
        </div>
      </div>

      <div className="relative my-8 aspect-video overflow-hidden rounded-lg">
        <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" priority />
      </div>

      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{
          __html:
            article.content ||
            `
          <p>This is a sample article content. In a real application, this would contain the full article text with proper formatting.</p>
          
          <p>The article would discuss ${article.title} in detail, providing insights, analysis, and relevant information to the readers.</p>
          
          <h2>Key Points</h2>
          
          <p>The article would highlight key points related to the topic, providing a comprehensive overview of the subject matter.</p>
          
          <p>It would include quotes from experts, statistical data, and other relevant information to support the main arguments presented in the article.</p>
          
          <h2>Analysis</h2>
          
          <p>This section would provide an in-depth analysis of the topic, examining various perspectives and implications.</p>
          
          <p>The analysis would be backed by research, expert opinions, and factual information to ensure accuracy and credibility.</p>
          
          <h2>Conclusion</h2>
          
          <p>The article would conclude with a summary of the main points discussed and potential future developments related to the topic.</p>
        `,
        }}
      />

      <Separator className="my-10" />

      <ArticleActions slug={params.slug} />

      <Separator className="my-10" />

      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">Related Articles</h2>
        <RelatedArticles currentSlug={params.slug} />
      </div>

      <Separator className="my-10" />

      <CommentSection articleSlug={params.slug} />
    </article>
  )
}

