import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./client"

export const metadata: Metadata = {
  title: "BDL News - Stay Informed",
  description: "A cutting-edge news platform with real-time updates and personalized content",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}

import "./globals.css"

import "./globals.css"



import './globals.css'