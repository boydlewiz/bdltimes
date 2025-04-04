import type { Metadata } from "next"
import { AdminDashboard } from "@/components/admin/dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard - Pulse News",
  description: "Manage your content and monitor analytics",
}

export default function AdminPage() {
  return <AdminDashboard />
}

