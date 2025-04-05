import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ArticleNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center space-y-4 py-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Article Not Found</h1>
      <p className="text-xl text-muted-foreground">The article you're looking for doesn't exist or has been removed.</p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/all-news">Browse All Articles</Link>
        </Button>
      </div>
    </div>
  )
}

