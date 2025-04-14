
import React, { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icons } from "@/components/ui/icons"

interface ScreenMonitorProps {
  onViolation?: (type: string) => void
  maxViolations?: number
  onMaxViolationsReached?: () => void
}

export function ScreenMonitor({ 
  onViolation, 
  maxViolations = 3,
  onMaxViolationsReached 
}: ScreenMonitorProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isFocused, setIsFocused] = useState(true)
  const [violationCount, setViolationCount] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const warningTimeoutRef = useRef<number | null>(null)
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isDocVisible = !document.hidden
      setIsVisible(isDocVisible)
      
      if (!isDocVisible) {
        handleViolation('visibility')
      }
    }
    
    const handleFocus = () => {
      setIsFocused(true)
    }
    
    const handleBlur = () => {
      setIsFocused(false)
      handleViolation('focus')
    }
    
    // Monitor tab/window visibility and focus
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)
    
    // Setup fullscreen detection
    const fullscreenHandler = () => {
      if (!document.fullscreenElement) {
        handleViolation('fullscreen')
      }
    }
    
    document.addEventListener('fullscreenchange', fullscreenHandler)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
      document.removeEventListener('fullscreenchange', fullscreenHandler)
      
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current)
      }
    }
  }, [])
  
  // Track violations and show warnings
  const handleViolation = (type: string) => {
    setViolationCount(prev => {
      const newCount = prev + 1
      if (newCount >= maxViolations && onMaxViolationsReached) {
        onMaxViolationsReached()
      }
      return newCount
    })
    
    if (onViolation) {
      onViolation(type)
    }
    
    setShowWarning(true)
    
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current)
    }
    
    warningTimeoutRef.current = window.setTimeout(() => {
      setShowWarning(false)
    }, 5000)
  }
  
  return (
    <>
      {showWarning && (
        <Alert variant="destructive" className="fixed top-4 right-4 w-auto z-50 animate-in fade-in slide-in-from-top-5 duration-300">
          <Icons.alert className="h-4 w-4" />
          <AlertTitle>Warning: Suspicious Activity Detected!</AlertTitle>
          <AlertDescription>
            Leaving the exam window is not allowed. This activity has been recorded.
            Violations: {violationCount}/{maxViolations}
          </AlertDescription>
        </Alert>
      )}
      <div className="hidden">
        {/* Hidden status tracker for debugging */}
        <p>Visible: {isVisible ? 'Yes' : 'No'}</p>
        <p>Focused: {isFocused ? 'Yes' : 'No'}</p>
        <p>Violations: {violationCount}</p>
      </div>
    </>
  )
}
