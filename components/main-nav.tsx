"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { UserButton } from "@/components/auth/user-button"
import { SearchDialog } from "@/components/search-dialog"
import { Video } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()
  const { theme } = useTheme()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/politics",
      label: "Politics",
      active: pathname === "/politics",
    },
    {
      href: "/tech",
      label: "Tech",
      active: pathname === "/tech",
    },
    {
      href: "/sports",
      label: "Sports",
      active: pathname === "/sports",
    },
    {
      href: "/entertainment",
      label: "Entertainment",
      active: pathname === "/entertainment",
    },
    {
      href: "/live-chat",
      label: "Live Chat",
      active: pathname === "/live-chat",
      icon: <Video className="h-3 w-3 mr-1 text-primary" />,
    },
  ]

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="flex items-center mr-8">
          <div className="relative h-12 w-32">
            <Image src="/images/bdl-logo-light.png" alt="BDL" fill className="object-contain dark:hidden" />
            <Image src="/images/bdl-logo-dark.png" alt="BDL" fill className="object-contain hidden dark:block" />
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "transition-colors hover:text-primary fancy-link flex items-center",
                route.active ? "text-primary font-semibold" : "text-foreground/60",
              )}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <SearchDialog />
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  )
}

