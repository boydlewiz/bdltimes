"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function AnalyticsDashboard() {
  // Mock data for analytics
  const viewsData = [
    { name: "Mar 28", views: 4000 },
    { name: "Mar 29", views: 3500 },
    { name: "Mar 30", views: 5000 },
    { name: "Mar 31", views: 4800 },
    { name: "Apr 1", views: 6000 },
    { name: "Apr 2", views: 8500 },
    { name: "Apr 3", views: 10200 },
  ]

  const engagementData = [
    { name: "Mar 28", likes: 240, comments: 120, shares: 80 },
    { name: "Mar 29", likes: 300, comments: 150, shares: 90 },
    { name: "Mar 30", likes: 350, comments: 180, shares: 120 },
    { name: "Mar 31", likes: 280, comments: 140, shares: 95 },
    { name: "Apr 1", likes: 400, comments: 200, shares: 150 },
    { name: "Apr 2", likes: 520, comments: 260, shares: 180 },
    { name: "Apr 3", likes: 620, comments: 310, shares: 210 },
  ]

  const categoryData = [
    { name: "Politics", value: 35 },
    { name: "Tech", value: 25 },
    { name: "Sports", value: 15 },
    { name: "Entertainment", value: 12 },
    { name: "Business", value: 8 },
    { name: "Health", value: 5 },
  ]

  // Update chart colors to match the new purple theme
  const COLORS = ["#8B5CF6", "#6D28D9", "#FFBB28", "#FF8042", "#C084FC", "#A855F7"]

  const topArticles = [
    {
      title: "Breakthrough in Renewable Energy Storage Promises Global Impact",
      views: 256000,
      engagement: 12400,
      avgReadTime: "6:42",
    },
    {
      title: "Global Leaders Gather for Climate Summit",
      views: 189000,
      engagement: 9300,
      avgReadTime: "5:18",
    },
    {
      title: "New AI Model Breaks Performance Records",
      views: 145000,
      engagement: 7800,
      avgReadTime: "4:55",
    },
    {
      title: "Championship Finals Set for Weekend Showdown",
      views: 132000,
      engagement: 6500,
      avgReadTime: "3:47",
    },
    {
      title: "Award-Winning Director Announces New Film",
      views: 118000,
      engagement: 5900,
      avgReadTime: "4:12",
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics Dashboard</h2>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-primary/20 shadow-md">
          <CardHeader className="pb-2 bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-muted-foreground">+24% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow hover:-translate-y-1 duration-300">
          <CardHeader className="pb-2 bg-gradient-to-r from-primary/10 to-transparent">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.8%</div>
            <p className="text-xs text-muted-foreground">+1.2% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow hover:-translate-y-1 duration-300">
          <CardHeader className="pb-2 bg-gradient-to-r from-primary/10 to-transparent">
            <CardTitle className="text-sm font-medium">Avg. Read Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4:32</div>
            <p className="text-xs text-muted-foreground">+0:18 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="views">
        <TabsList>
          <TabsTrigger value="views">Views</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="views" className="pt-4">
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-primary/10">
              <CardTitle>Daily Views</CardTitle>
              <CardDescription>Total article views over the past 7 days</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] p-6">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={viewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltipContent>
                              <div className="font-semibold">{payload[0].payload.name}</div>
                              <div className="flex items-center">
                                <div className="font-medium">Views: {payload[0].value?.toLocaleString()}</div>
                              </div>
                            </ChartTooltipContent>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="views" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="pt-4">
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-primary/10">
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>Likes, comments, and shares over the past 7 days</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] p-6">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltipContent>
                              <div className="font-semibold">{payload[0].payload.name}</div>
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center">
                                  <div className="mr-2 h-2 w-2 rounded-full bg-[#8B5CF6]" />
                                  <div className="font-medium">Likes: {payload[0].value}</div>
                                </div>
                                <div className="flex items-center">
                                  <div className="mr-2 h-2 w-2 rounded-full bg-[#A855F7]" />
                                  <div className="font-medium">Comments: {payload[1].value}</div>
                                </div>
                                <div className="flex items-center">
                                  <div className="mr-2 h-2 w-2 rounded-full bg-[#C084FC]" />
                                  <div className="font-medium">Shares: {payload[2].value}</div>
                                </div>
                              </div>
                            </ChartTooltipContent>
                          )
                        }
                        return null
                      }}
                    />
                    <Line type="monotone" dataKey="likes" stroke="#8B5CF6" strokeWidth={2} />
                    <Line type="monotone" dataKey="comments" stroke="#A855F7" strokeWidth={2} />
                    <Line type="monotone" dataKey="shares" stroke="#C084FC" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="pt-4">
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-primary/10">
              <CardTitle>Content by Category</CardTitle>
              <CardDescription>Distribution of article views by category</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] p-6">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-primary/10">
          <CardTitle>Top Performing Articles</CardTitle>
          <CardDescription>Articles with the highest views and engagement</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-primary/5">
                  <th className="p-4 text-left font-medium">Title</th>
                  <th className="p-4 text-right font-medium">Views</th>
                  <th className="p-4 text-right font-medium">Engagement</th>
                  <th className="p-4 text-right font-medium">Avg. Read Time</th>
                </tr>
              </thead>
              <tbody>
                {topArticles.map((article, index) => (
                  <tr key={index} className="border-b last:border-0 hover:bg-primary/5 transition-colors">
                    <td className="p-4 pr-4">{article.title}</td>
                    <td className="p-4 text-right">{article.views.toLocaleString()}</td>
                    <td className="p-4 text-right">{article.engagement.toLocaleString()}</td>
                    <td className="p-4 text-right">{article.avgReadTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

