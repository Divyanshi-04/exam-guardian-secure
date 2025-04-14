
import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

interface ExamTimerProps {
  durationMinutes: number
  onTimeUp: () => void
  className?: string
}

export function ExamTimer({ durationMinutes, onTimeUp, className }: ExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60)
  const [isWarning, setIsWarning] = useState(false)
  
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp()
      return
    }
    
    // Set warning state when 5 minutes or less remain
    if (timeLeft <= 300 && !isWarning) {
      setIsWarning(true)
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [timeLeft, onTimeUp, isWarning])
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <Card className={cn("border-none shadow-md", 
      isWarning ? "bg-warning/10 text-warning" : "bg-muted/50", 
      className)}>
      <CardContent className="p-4 flex items-center justify-center space-x-2">
        <Icons.clock className={cn("h-5 w-5", isWarning && "animate-pulse")} />
        <span className="text-lg font-semibold">{formatTime(timeLeft)}</span>
      </CardContent>
    </Card>
  )
}
