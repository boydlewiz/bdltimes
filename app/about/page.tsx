import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "About Us - Pulse News",
  description: "Learn about Pulse News, our mission, and our team",
}

export default function AboutPage() {
  return (
    <div className="container space-y-10 py-6 md:py-10">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">About Pulse News</h1>
        <p className="text-xl text-muted-foreground">
          Delivering accurate, timely, and insightful news coverage since 2020
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
            At Pulse News, we believe in the power of informed citizens. Our mission is to provide accurate, unbiased,
            and timely news coverage that helps our readers understand the complex world around them.
          </p>
          <p className="text-lg text-muted-foreground">
            We are committed to journalistic integrity, factual reporting, and in-depth analysis that goes beyond
            headlines to provide context and insight on the stories that matter most.
          </p>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Pulse News headquarters"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Our Values</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Accuracy</h3>
              <p className="text-muted-foreground">
                We verify facts and sources to ensure our reporting is accurate and reliable.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Independence</h3>
              <p className="text-muted-foreground">
                We maintain editorial independence and report without fear or favor.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Transparency</h3>
              <p className="text-muted-foreground">We are transparent about our sources, methods, and corrections.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                We embrace new technologies to deliver news in engaging and accessible ways.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Our Team</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Sarah Johnson",
              role: "Editor-in-Chief",
              bio: "Sarah has over 15 years of experience in journalism and has led Pulse News since its founding.",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Michael Chen",
              role: "Political Editor",
              bio: "Michael specializes in political reporting with a focus on international relations and policy analysis.",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Jessica Martinez",
              role: "Sports Editor",
              bio: "Jessica brings her experience as a former athlete to her coverage of sports news and analysis.",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "David Wilson",
              role: "Technology Editor",
              bio: "David covers the latest in tech innovations, digital trends, and their impact on society.",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Robert Taylor",
              role: "Entertainment Editor",
              bio: "Robert's background in film and media studies informs his coverage of entertainment news.",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Jennifer Lee",
              role: "Business Editor",
              bio: "Jennifer brings her expertise in economics and finance to her coverage of business news.",
              image: "/placeholder.svg?height=300&width=300",
            },
          ].map((person, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-3">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image src={person.image || "/placeholder.svg"} alt={person.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{person.name}</h3>
                <p className="text-primary font-medium">{person.role}</p>
                <p className="text-sm text-muted-foreground mt-2">{person.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

