import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center space-y-4 py-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}

