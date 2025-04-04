"use client"

import Link from "next/link"
import { BarChart3, FileText, Home, LogOut, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="text-xl">PULSE</span>
            <span className="text-sm text-muted-foreground">Admin</span>
          </Link>
          <SidebarTrigger className="ml-auto md:hidden" />
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={activeTab === "articles"} onClick={() => setActiveTab("articles")}>
                <button>
                  <FileText className="h-4 w-4" />
                  <span>Articles</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={activeTab === "analytics"} onClick={() => setActiveTab("analytics")}>
                <button>
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={activeTab === "users"} onClick={() => setActiveTab("users")}>
                <button>
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/">
                  <Home className="h-4 w-4" />
                  <span>View Site</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/logout">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Link>
          </Button>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}

