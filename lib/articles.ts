// Mock article data - in a real app, this would come from a database or CMS
export interface Article {
  id: string | number
  title: string
  excerpt: string
  content?: string
  author: string
  authorTitle?: string
  date: string
  publishDate?: string
  readTime?: string
  category: string
  tags?: string[]
  image: string
  slug: string
  views?: number
  status?: string
  featured?: boolean
}

const allArticles: Article[] = [
  {
    id: "1",
    title: "Breakthrough in Renewable Energy Storage Promises Global Impact",
    excerpt:
      "Scientists have developed a revolutionary energy storage technology that could accelerate the transition to renewable energy worldwide.",
    author: "Sarah Johnson",
    authorTitle: "Senior Science Correspondent",
    date: "April 3, 2025",
    publishDate: "April 3, 2025",
    readTime: "8 min read",
    category: "Tech",
    tags: ["Renewable Energy", "Technology", "Climate", "Innovation"],
    image: "/placeholder.svg?height=600&width=1200",
    slug: "renewable-energy-breakthrough",
    views: 256000,
    featured: true,
  },
  {
    id: "2",
    title: "Global Leaders Gather for Climate Summit",
    excerpt: "World leaders meet to discuss urgent climate action and new emission targets.",
    author: "Michael Chen",
    authorTitle: "Political Correspondent",
    date: "April 2, 2025",
    publishDate: "April 2, 2025",
    readTime: "6 min read",
    category: "Politics",
    tags: ["Climate Change", "Global Policy", "Environment", "International Relations"],
    image: "/placeholder.svg?height=600&width=1200",
    slug: "climate-summit",
    views: 189000,
    featured: true,
  },
  {
    id: "3",
    title: "New AI Model Breaks Performance Records",
    excerpt: "Researchers unveil groundbreaking AI system that outperforms humans on complex tasks.",
    author: "David Wilson",
    date: "April 1, 2025",
    category: "Tech",
    image: "/placeholder.svg?height=200&width=400",
    slug: "ai-breakthrough",
    views: 145000,
  },
  {
    id: "4",
    title: "Championship Finals Set for Weekend Showdown",
    excerpt: "Top teams prepare for the ultimate battle in this season's championship finals.",
    author: "Jessica Martinez",
    date: "March 31, 2025",
    category: "Sports",
    image: "/placeholder.svg?height=200&width=400",
    slug: "championship-finals",
    views: 132000,
  },
  {
    id: "5",
    title: "Award-Winning Director Announces New Film",
    excerpt: "Acclaimed filmmaker reveals details about upcoming project with star-studded cast.",
    author: "Robert Taylor",
    date: "March 30, 2025",
    category: "Entertainment",
    image: "/placeholder.svg?height=200&width=400",
    slug: "new-film-announcement",
    views: 118000,
  },
  {
    id: "6",
    title: "Economic Forecast Shows Growth Despite Challenges",
    excerpt: "Analysts predict economic expansion in the coming quarters despite global uncertainties.",
    author: "Jennifer Lee",
    date: "March 29, 2025",
    category: "Politics",
    image: "/placeholder.svg?height=200&width=400",
    slug: "economic-forecast",
    views: 105000,
  },
  {
    id: "7",
    title: "Revolutionary Smartphone Features Unveiled",
    excerpt: "Tech giant introduces next-generation smartphone with innovative capabilities.",
    author: "David Wilson",
    date: "March 28, 2025",
    category: "Tech",
    image: "/placeholder.svg?height=200&width=400",
    slug: "smartphone-features",
    views: 98000,
  },
  {
    id: "8",
    title: "Major Policy Shift Announced in Healthcare Reform",
    excerpt:
      "Government unveils comprehensive changes to healthcare system aimed at improving access and affordability.",
    author: "Michael Chen",
    date: "March 27, 2025",
    category: "Politics",
    image: "/placeholder.svg?height=200&width=400",
    slug: "healthcare-reform",
    views: 92000,
  },
  {
    id: "9",
    title: "Underdog Team Makes Stunning Playoff Comeback",
    excerpt: "Against all odds, underdog team overcomes deficit to secure playoff victory.",
    author: "Jessica Martinez",
    date: "March 26, 2025",
    category: "Sports",
    image: "/placeholder.svg?height=200&width=400",
    slug: "playoff-comeback",
    views: 87000,
  },
  {
    id: "10",
    title: "Streaming Platform Announces Groundbreaking Original Series",
    excerpt: "Major streaming service reveals ambitious new series with revolutionary storytelling approach.",
    author: "Robert Taylor",
    date: "March 25, 2025",
    category: "Entertainment",
    image: "/placeholder.svg?height=200&width=400",
    slug: "streaming-series",
    views: 76000,
  },
  {
    id: "11",
    title: "Breakthrough in Quantum Computing Achieved",
    excerpt:
      "Scientists report major advancement in quantum computing technology that could revolutionize data processing.",
    author: "Sarah Johnson",
    date: "March 24, 2025",
    category: "Tech",
    image: "/placeholder.svg?height=200&width=400",
    slug: "quantum-computing",
    views: 72000,
  },
  {
    id: "12",
    title: "Historic Peace Agreement Signed Between Rival Nations",
    excerpt: "After decades of conflict, two rival nations sign comprehensive peace agreement.",
    author: "Michael Chen",
    date: "March 23, 2025",
    category: "Politics",
    image: "/placeholder.svg?height=200&width=400",
    slug: "peace-agreement",
    views: 68000,
  },
  {
    id: "13",
    title: "Record-Breaking Performance at World Championships",
    excerpt: "Athlete shatters world record with extraordinary performance at international competition.",
    author: "Jessica Martinez",
    date: "March 22, 2025",
    category: "Sports",
    image: "/placeholder.svg?height=200&width=400",
    slug: "world-record",
    views: 65000,
  },
  {
    id: "14",
    title: "Acclaimed Novel Adaptation Coming to Theaters",
    excerpt: "Bestselling novel gets star-studded film adaptation set to premiere next month.",
    author: "Robert Taylor",
    date: "March 21, 2025",
    category: "Entertainment",
    image: "/placeholder.svg?height=200&width=400",
    slug: "novel-adaptation",
    views: 61000,
  },
  {
    id: "15",
    title: "New Cybersecurity Threat Targets Critical Infrastructure",
    excerpt: "Security experts warn of sophisticated new cyber attack targeting essential services.",
    author: "David Wilson",
    date: "March 20, 2025",
    category: "Tech",
    image: "/placeholder.svg?height=200&width=400",
    slug: "cybersecurity-threat",
    views: 58000,
  },
]

export function getAllArticles(): Article[] {
  return allArticles
}

export function getArticlesByCategory(category: string): Article[] {
  if (category === "All") {
    return allArticles
  }
  return allArticles.filter((article) => article.category === category)
}

export function getFeaturedArticles(): Article[] {
  return allArticles.filter((article) => article.featured)
}

export function getTrendingArticles(limit = 4): Article[] {
  return [...allArticles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, limit)
}

export function getRelatedArticles(currentSlug: string, limit = 3): Article[] {
  const currentArticle = allArticles.find((article) => article.slug === currentSlug)
  if (!currentArticle) return []

  return allArticles
    .filter(
      (article) =>
        article.slug !== currentSlug &&
        (article.category === currentArticle.category ||
          (article.tags && currentArticle.tags && article.tags.some((tag) => currentArticle.tags?.includes(tag)))),
    )
    .slice(0, limit)
}

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find((article) => article.slug === slug)
}

export function searchArticles(query: string): Article[] {
  const lowercaseQuery = query.toLowerCase()
  return allArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.excerpt.toLowerCase().includes(lowercaseQuery) ||
      article.category.toLowerCase().includes(lowercaseQuery) ||
      article.author.toLowerCase().includes(lowercaseQuery) ||
      article.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}

