import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login - Pulse News",
  description: "Login to your Pulse News account",
}

export default function LoginPage() {
  return (
    <div className="container relative flex-1 flex items-center justify-center py-12 md:py-24">
      <LoginForm />
    </div>
  )
}

