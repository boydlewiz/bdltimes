"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserProfile } from "@/components/auth/user-profile"
import { useAuth } from "@/lib/auth"

export default function ProfilePage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container py-10">
      <UserProfile />
    </div>
  )
}

