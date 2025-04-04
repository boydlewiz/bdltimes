"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, ImagePlus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

interface ArticleEditorProps {
  articleId: string | null
  onBack: () => void
}

export function ArticleEditor({ articleId, onBack }: ArticleEditorProps) {
  // Mock article data for editing
  const existingArticle = articleId
    ? {
        id: articleId,
        title: "Breakthrough in Renewable Energy Storage Promises Global Impact",
        excerpt:
          "Scientists have developed a revolutionary energy storage technology that could accelerate the transition to renewable energy worldwide.",
        content:
          "In a groundbreaking development that could transform the global energy landscape, researchers have unveiled a new energy storage technology that addresses one of the biggest challenges in renewable energy: efficient and cost-effective storage.",
        category: "Tech",
        tags: ["Renewable Energy", "Technology", "Climate", "Innovation"],
        status: "Published",
        featuredImage: "/placeholder.svg?height=600&width=1200",
      }
    : null

  const [formData, setFormData] = useState({
    title: existingArticle?.title || "",
    excerpt: existingArticle?.excerpt || "",
    content: existingArticle?.content || "",
    category: existingArticle?.category || "",
    tags: existingArticle?.tags?.join(", ") || "",
    status: existingArticle?.status || "Draft",
    featuredImage: existingArticle?.featuredImage || "",
  })

  const [activeTab, setActiveTab] = useState("edit")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenerateAI = (field: string) => {
    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      if (field === "excerpt") {
        setFormData((prev) => ({
          ...prev,
          excerpt:
            "AI-generated summary: This groundbreaking article explores the latest advancements in renewable energy storage technology and its potential impact on global energy markets and climate change mitigation efforts.",
        }))
      } else if (field === "tags") {
        setFormData((prev) => ({
          ...prev,
          tags: "Renewable Energy, Technology, Climate, Innovation, Sustainability, Green Tech",
        }))
      }

      setIsGenerating(false)
      toast({
        title: "AI generation complete",
        description: `The ${field} has been generated based on your article content.`,
      })
    }, 1500)
  }

  const handleSave = (status: string) => {
    // In a real app, this would call an API to save the article
    toast({
      title: `Article ${articleId ? "updated" : "created"}`,
      description: `The article has been ${status === "Published" ? "published" : "saved as " + status.toLowerCase()}.`,
    })
    onBack()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold">{articleId ? "Edit Article" : "Create New Article"}</h2>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleSave("Draft")}>
            Save as Draft
          </Button>
          <Button onClick={() => handleSave("Published")}>Publish</Button>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter article title"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => handleGenerateAI("excerpt")}
                disabled={isGenerating || !formData.content}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate with AI
              </Button>
            </div>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Brief summary of the article"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Politics">Politics</SelectItem>
                  <SelectItem value="Tech">Tech</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="tags">Tags</Label>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={() => handleGenerateAI("tags")}
                  disabled={isGenerating || !formData.content}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate with AI
                </Button>
              </div>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Enter tags separated by commas"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="featuredImage">Featured Image</Label>
          <div className="flex items-center gap-4">
            <div className="relative aspect-video h-[150px] overflow-hidden rounded-md border bg-muted">
              {formData.featuredImage ? (
                <img
                  src={formData.featuredImage || "/placeholder.svg"}
                  alt="Featured image preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <ImagePlus className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Input
                id="featuredImage"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleInputChange}
                placeholder="Enter image URL or upload"
              />
              <Button variant="outline" size="sm">
                Upload Image
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between">
              <Label>Content</Label>
              <TabsList>
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="edit" className="mt-2">
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your article content here..."
                className="min-h-[400px]"
              />
            </TabsContent>

            <TabsContent value="preview" className="mt-2">
              <div className="min-h-[400px] rounded-md border p-4">
                {formData.content ? (
                  <div className="prose max-w-none dark:prose-invert">
                    {formData.content.split("\n").map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    No content to preview
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

