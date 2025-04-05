"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserButton } from "@/components/auth/user-button"
import { useAuth } from "@/lib/auth"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const { isAuthenticated } = useAuth()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <div className="flex items-center justify-between border-b pb-4">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Beige_Minimalist_Personal_Business_LinkedIn_Banner_1_-removebg-preview-RyXERBH3oG7AdNZmpgXjWxeQzEGtND.png"
              alt="BDL"
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex items-center gap-2"></div>
        </div>

        <div className="flex flex-col space-y-6 py-6">
          <div className="flex flex-col space-y-3">
            <Link
              href="/"
              className="text-lg font-medium hover:text-primary transition-colors fancy-link"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/politics"
              className="text-lg font-medium hover:text-primary transition-colors fancy-link"
              onClick={() => setOpen(false)}
            >
              Politics
            </Link>
            <Link
              href="/tech"
              className="text-lg font-medium hover:text-primary transition-colors fancy-link"
              onClick={() => setOpen(false)}
            >
              Tech
            </Link>
            <Link
              href="/sports"
              className="text-lg font-medium hover:text-primary transition-colors fancy-link"
              onClick={() => setOpen(false)}
            >
              Sports
            </Link>
            <Link
              href="/entertainment"
              className="text-lg font-medium hover:text-primary transition-colors fancy-link"
              onClick={() => setOpen(false)}
            >
              Entertainment
            </Link>
            <Link
              href="/live-chat"
              className="text-lg font-medium hover:text-primary transition-colors fancy-link flex items-center"
              onClick={() => setOpen(false)}
            >
              <Video className="h-4 w-4 mr-2 text-primary" />
              Live Chat
            </Link>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">More</p>
            <div className="flex flex-col space-y-3">
              <Link
                href="/about"
                className="text-sm hover:text-primary transition-colors fancy-link"
                onClick={() => setOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-sm hover:text-primary transition-colors fancy-link"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-sm hover:text-primary transition-colors fancy-link"
                onClick={() => setOpen(false)}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm hover:text-primary transition-colors fancy-link"
                onClick={() => setOpen(false)}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-auto border-t pt-4">
          {!isAuthenticated ? (
            <div className="flex flex-col gap-2">
              <Button asChild className="w-full" variant="outline">
                <Link href="/login" onClick={() => setOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/register" onClick={() => setOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Account</span>
              <UserButton />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

