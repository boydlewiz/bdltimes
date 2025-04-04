import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Register - Pulse News",
  description: "Create a new Pulse News account",
}

export default function RegisterPage() {
  return (
    <div className="container relative flex-1 flex items-center justify-center py-12 md:py-24">
      <RegisterForm />
    </div>
  )
}

