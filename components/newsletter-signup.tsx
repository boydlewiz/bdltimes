"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscribed!",
        description: "You've successfully signed up for our newsletter.",
      })
      setEmail("")
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="rounded-lg bg-gradient-to-br from-primary/5 to-transparent p-8 border border-primary/20 shadow-md">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">Stay informed with our newsletter</h2>
        <p className="mt-2 text-muted-foreground">Get the latest news and updates delivered directly to your inbox.</p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-md">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 border-primary/20 focus:border-primary"
          />
          <Button type="submit" disabled={loading} className="text-primary-foreground">
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          By subscribing, you agree to our Terms and Privacy Policy.
        </p>
      </form>
    </div>
  )
}

