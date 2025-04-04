"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface Comment {
  id: string
  author: string
  authorInitials: string
  authorAvatar?: string
  content: string
  date: string
  likes: number
  replies?: Comment[]
}

interface CommentSectionProps {
  articleSlug: string
}

export function CommentSection({ articleSlug }: CommentSectionProps) {
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock comments data
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Alex Johnson",
      authorInitials: "AJ",
      content: "This is a fascinating article! I particularly enjoyed the analysis of the potential economic impacts.",
      date: "2 hours ago",
      likes: 12,
      replies: [
        {
          id: "1-1",
          author: "Maria Garcia",
          authorInitials: "MG",
          content:
            "I agree, the economic analysis was very insightful. I'd love to see more articles like this in the future.",
          date: "1 hour ago",
          likes: 5,
        },
      ],
    },
    {
      id: "2",
      author: "Sam Wilson",
      authorInitials: "SW",
      content: "Great reporting! I have a question though - what are the implications for developing countries?",
      date: "3 hours ago",
      likes: 8,
    },
    {
      id: "3",
      author: "Taylor Kim",
      authorInitials: "TK",
      content: "I found this article very informative. Thanks for covering this important topic.",
      date: "5 hours ago",
      likes: 15,
    },
  ])

  const handleSubmitComment = () => {
    if (!comment.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newComment: Comment = {
        id: `${comments.length + 1}`,
        author: "You",
        authorInitials: "YO",
        content: comment,
        date: "Just now",
        likes: 0,
      }

      setComments([newComment, ...comments])
      setComment("")
      setIsSubmitting(false)

      toast({
        title: "Comment posted",
        description: "Your comment has been successfully posted.",
      })
    }, 1000)
  }

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 }
        }

        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply,
            ),
          }
        }

        return comment
      }),
    )
  }

  return (
    <div className="space-y-6" id="comments">
      <h2 className="text-3xl font-bold tracking-tight gradient-text">Comments ({comments.length})</h2>

      <Card className="border-primary/20 shadow-md">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-primary/10">
          <h3 className="text-lg font-medium">Join the conversation</h3>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <Textarea
              placeholder="Share your thoughts..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] border-primary/20 focus:border-primary"
            />
            <div className="flex justify-end">
              <Button onClick={handleSubmitComment} disabled={!comment.trim() || isSubmitting}>
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {comments.map((comment) => (
          <Card key={comment.id} className="border-primary/20 shadow-md hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Avatar className="border border-primary/20">
                  <AvatarImage src={comment.authorAvatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">{comment.authorInitials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{comment.author}</div>
                    <div className="text-xs text-muted-foreground">{comment.date}</div>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground hover:text-primary"
                      onClick={() => handleLikeComment(comment.id)}
                    >
                      Like ({comment.likes})
                    </Button>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-primary">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>

              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-12 mt-4 space-y-4 border-l-2 border-primary/10 pl-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-4">
                      <Avatar className="h-8 w-8 border border-primary/20">
                        <AvatarImage src={reply.authorAvatar} />
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {reply.authorInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{reply.author}</div>
                          <div className="text-xs text-muted-foreground">{reply.date}</div>
                        </div>
                        <p className="text-sm">{reply.content}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-muted-foreground hover:text-primary"
                          onClick={() => handleLikeComment(reply.id)}
                        >
                          Like ({reply.likes})
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

