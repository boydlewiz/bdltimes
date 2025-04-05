"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminSidebar } from "@/components/admin/sidebar"
import { ArticlesList } from "@/components/admin/articles-list"
import { ArticleEditor } from "@/components/admin/article-editor"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"
import { UserManagement } from "@/components/admin/user-management"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("articles")
  const [isCreatingArticle, setIsCreatingArticle] = useState(false)
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null)

  const handleCreateArticle = () => {
    setIsCreatingArticle(true)
    setEditingArticleId(null)
  }

  const handleEditArticle = (id: string) => {
    setEditingArticleId(id)
    setIsCreatingArticle(true)
  }

  const handleBackToList = () => {
    setIsCreatingArticle(false)
    setEditingArticleId(null)
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <TabsList>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="articles">
            {isCreatingArticle ? (
              <ArticleEditor articleId={editingArticleId} onBack={handleBackToList} />
            ) : (
              <ArticlesList onCreateArticle={handleCreateArticle} onEditArticle={handleEditArticle} />
            )}
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

