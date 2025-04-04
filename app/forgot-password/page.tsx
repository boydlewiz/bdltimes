import type { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "Forgot Password - Pulse News",
  description: "Reset your Pulse News account password",
}

export default function ForgotPasswordPage() {
  return (
    <div className="container relative flex-1 flex items-center justify-center py-12 md:py-24">
      <ForgotPasswordForm />
    </div>
  )
}

