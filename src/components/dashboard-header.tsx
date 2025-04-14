
import React from "react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

interface DashboardHeaderProps {
  title: string
  showBackButton?: boolean
  backTo?: string
  userType: "student" | "teacher"
  className?: string
}

export function DashboardHeader({
  title,
  showBackButton = false,
  backTo = "/",
  userType,
  className,
}: DashboardHeaderProps) {
  const navigate = useNavigate()

  return (
    <header className={cn("flex items-center justify-between py-4 px-6 bg-background border-b", className)}>
      <div className="flex items-center gap-4">
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(backTo)}
            aria-label="Go back"
          >
            <Icons.chevronLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Icons.settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Help">
          <Icons.help className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium hidden sm:block">
            {userType === "student" ? "Student Account" : "Teacher Account"}
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            aria-label="Log out"
          >
            <Icons.logout className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
