"use client"

import { useState } from "react"
import Link from "next/link"
import { BookmarkIcon, Share2, MessageSquare, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

export function ArticleActions({ slug }: { slug: string }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likeCount, setLikeCount] = useState(142)

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1)
    } else {
      setLikeCount((prev) => prev + 1)
      toast({
        title: "Article liked",
        description: "Your feedback helps us improve our content.",
      })
    }
    setLiked(!liked)
  }

  const handleSave = () => {
    setSaved(!saved)
    toast({
      title: saved ? "Removed from bookmarks" : "Saved to bookmarks",
      description: saved ? "Article removed from your reading list." : "Article added to your reading list.",
    })
  }

  const handleShare = (platform: string) => {
    // In a real app, this would use the Web Share API or create platform-specific share links
    const shareUrl = `https://pulse-news.example.com/article/${slug}`

    toast({
      title: `Shared on ${platform}`,
      description: `Article link: ${shareUrl}`,
    })
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={liked ? "default" : "outline"}
          size="sm"
          onClick={handleLike}
          className="flex items-center gap-1"
        >
          <ThumbsUp className="h-4 w-4" />
          <span>{likeCount}</span>
        </Button>

        <Button variant="outline" size="sm" asChild>
          <Link href={`#comments`} className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>Comments (24)</span>
          </Link>
        </Button>

        <Button
          variant={saved ? "default" : "outline"}
          size="sm"
          onClick={handleSave}
          className="flex items-center gap-1"
        >
          <BookmarkIcon className="h-4 w-4" />
          <span>{saved ? "Saved" : "Save"}</span>
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleShare("Twitter")}>Twitter</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("Facebook")}>Facebook</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("LinkedIn")}>LinkedIn</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("Email")}>Email</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(`https://pulse-news.example.com/article/${slug}`)
              toast({
                title: "Link copied",
                description: "Article link copied to clipboard.",
              })
            }}
          >
            Copy Link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

