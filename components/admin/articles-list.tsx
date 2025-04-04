"use client"

import { useState } from "react"
import { MoreHorizontal, Plus, Search, Trash2, Edit, Eye, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

interface ArticlesListProps {
  onCreateArticle: () => void
  onEditArticle: (id: string) => void
}

export function ArticlesList({ onCreateArticle, onEditArticle }: ArticlesListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null)

  // Mock articles data
  const articles = [
    {
      id: "1",
      title: "Breakthrough in Renewable Energy Storage Promises Global Impact",
      status: "Published",
      category: "Tech",
      author: "Sarah Johnson",
      date: "April 3, 2025",
      views: 256000,
    },
    {
      id: "2",
      title: "Global Leaders Gather for Climate Summit",
      status: "Published",
      category: "Politics",
      author: "Michael Chen",
      date: "April 2, 2025",
      views: 189000,
    },
    {
      id: "3",
      title: "New AI Model Breaks Performance Records",
      status: "Published",
      category: "Tech",
      author: "David Wilson",
      date: "April 1, 2025",
      views: 145000,
    },
    {
      id: "4",
      title: "Upcoming Space Mission to Test New Propulsion System",
      status: "Draft",
      category: "Science",
      author: "Sarah Johnson",
      date: "April 3, 2025",
      views: 0,
    },
    {
      id: "5",
      title: "Analysis: Economic Outlook for Q3 2025",
      status: "Scheduled",
      category: "Business",
      author: "Jennifer Lee",
      date: "April 5, 2025",
      views: 0,
    },
  ]

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteClick = (id: string) => {
    setArticleToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    // In a real app, this would call an API to delete the article
    toast({
      title: "Article deleted",
      description: "The article has been permanently deleted.",
    })
    setDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Articles</h2>
        <Button onClick={onCreateArticle}>
          <Plus className="mr-2 h-4 w-4" />
          New Article
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">
                <Button variant="ghost" className="p-0 font-medium">
                  Title
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium">
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium">
                  Views
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No articles found.
                </TableCell>
              </TableRow>
            ) : (
              filteredArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        article.status === "Published"
                          ? "default"
                          : article.status === "Draft"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {article.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>{article.date}</TableCell>
                  <TableCell>{article.views > 0 ? article.views.toLocaleString() : "-"}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditArticle(article.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteClick(article.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the article and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

