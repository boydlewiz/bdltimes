import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Beige_Minimalist_Personal_Business_LinkedIn_Banner_1_-removebg-preview-RyXERBH3oG7AdNZmpgXjWxeQzEGtND.png"
                alt="BDL"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Delivering accurate, timely, and insightful news coverage since 2020
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/politics"
                  className="text-muted-foreground hover:text-primary transition-colors fancy-link"
                >
                  Politics
                </Link>
              </li>
              <li>
                <Link href="/tech" className="text-muted-foreground hover:text-primary transition-colors fancy-link">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/sports" className="text-muted-foreground hover:text-primary transition-colors fancy-link">
                  Sports
                </Link>
              </li>
              <li>
                <Link
                  href="/entertainment"
                  className="text-muted-foreground hover:text-primary transition-colors fancy-link"
                >
                  Entertainment
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors fancy-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors fancy-link">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors fancy-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors fancy-link">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg">Subscribe</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest news and updates delivered directly to your inbox.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-l-md border border-r-0 border-primary/20 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="rounded-r-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">© 2025 BDL. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

