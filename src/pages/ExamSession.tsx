
import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { DashboardHeader } from "@/components/dashboard-header"
import { ExamTimer } from "@/components/exam-timer"
import { ScreenMonitor } from "@/components/screen-monitor"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icons } from "@/components/ui/icons"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock exam data
const mockExamQuestions = {
  "exam-1": {
    title: "Midterm Examination",
    subject: "Computer Science",
    duration: 120,
    questions: [
      {
        id: "q1",
        question: "What is the time complexity of a binary search algorithm?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
        type: "multiple-choice"
      },
      {
        id: "q2",
        question: "Explain the concept of recursion and provide a simple example.",
        type: "long-answer"
      },
      {
        id: "q3",
        question: "What is the difference between a stack and a queue?",
        type: "long-answer"
      }
    ]
  },
  "exam-2": {
    title: "Physics Quiz 3",
    subject: "Physics",
    duration: 45,
    questions: [
      {
        id: "q1",
        question: "Newton's second law states that force equals:",
        options: ["Mass times velocity", "Mass times acceleration", "Mass divided by acceleration", "Mass squared"],
        type: "multiple-choice"
      },
      {
        id: "q2",
        question: "Calculate the force required to accelerate a 1000kg car from 0 to 100 km/h in 10 seconds.",
        type: "long-answer"
      }
    ]
  }
}

export default function ExamSession() {
  const { examId } = useParams<{ examId: string }>()
  const navigate = useNavigate()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [confirmSubmit, setConfirmSubmit] = useState(false)
  const [examStarted, setExamStarted] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  
  // Get exam data based on ID
  const exam = examId && mockExamQuestions[examId as keyof typeof mockExamQuestions]
  
  // Handle exam not found
  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-center">Exam Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              The exam you're looking for doesn't exist or is no longer available.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate("/student-dashboard")}>
              Return to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }
  
  // Handle timer expiration
  const handleTimeUp = () => {
    setAlertMessage("Time's up! Your exam is being submitted automatically.")
    setAlertVisible(true)
    
    setTimeout(() => {
      navigate("/student-dashboard")
    }, 3000)
  }
  
  // Handle security violations
  const handleViolation = (type: string) => {
    setAlertMessage(`Security violation detected: ${type}. This has been recorded.`)
    setAlertVisible(true)
    
    setTimeout(() => {
      setAlertVisible(false)
    }, 5000)
  }
  
  // Handle max violations reached
  const handleMaxViolations = () => {
    setAlertMessage("Multiple security violations detected. Your exam will be submitted.")
    setAlertVisible(true)
    
    setTimeout(() => {
      navigate("/student-dashboard")
    }, 3000)
  }
  
  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }
  
  // Start exam
  const startExam = () => {
    toggleFullscreen()
    setExamStarted(true)
  }
  
  // Clean up fullscreen on unmount
  useEffect(() => {
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      }
    }
  }, [])
  
  // Pre-exam instructions
  if (!examStarted) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader 
          title={`${exam.title}`} 
          userType="student" 
          showBackButton 
          backTo="/student-dashboard" 
        />
        
        <main className="flex-1 p-6 flex items-center justify-center">
          <Card className="max-w-4xl w-full">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Important Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center">
                  <Icons.info className="h-5 w-5 mr-2 text-primary" />
                  Exam Details
                </h3>
                <ul className="space-y-1 text-sm">
                  <li><strong>Subject:</strong> {exam.subject}</li>
                  <li><strong>Duration:</strong> {exam.duration} minutes</li>
                  <li><strong>Questions:</strong> {exam.questions.length}</li>
                </ul>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center">
                  <Icons.alert className="h-5 w-5 mr-2 text-warning" />
                  Rules & Requirements
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Icons.check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                    <span>The exam will run in fullscreen mode. Exiting fullscreen will be logged.</span>
                  </li>
                  <li className="flex items-start">
                    <Icons.check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                    <span>Switching browser tabs or windows is not allowed and will be detected.</span>
                  </li>
                  <li className="flex items-start">
                    <Icons.check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                    <span>Multiple violations may result in automatic submission of your exam.</span>
                  </li>
                  <li className="flex items-start">
                    <Icons.check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                    <span>Ensure you have a stable internet connection before starting.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center">
                  <Icons.chrome className="h-5 w-5 mr-2 text-primary" />
                  Technical Requirements
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Icons.check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                    <span>Use a desktop or laptop computer (not a mobile device).</span>
                  </li>
                  <li className="flex items-start">
                    <Icons.check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                    <span>Use a modern browser (Chrome, Firefox, Edge, or Safari).</span>
                  </li>
                  <li className="flex items-start">
                    <Icons.check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                    <span>Allow browser permissions for fullscreen mode.</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => navigate("/student-dashboard")}>
                Cancel
              </Button>
              <Button onClick={startExam}>
                I Understand, Start Exam
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-muted/10">
      {/* Security Monitoring Component */}
      <ScreenMonitor 
        onViolation={handleViolation}
        maxViolations={3}
        onMaxViolationsReached={handleMaxViolations}
      />
      
      {/* Alert for notifications */}
      {alertVisible && (
        <Alert variant="destructive" className="fixed top-4 right-4 w-auto z-50 animate-in fade-in slide-in-from-top-5 duration-300">
          <Icons.alert className="h-4 w-4" />
          <AlertTitle>Alert</AlertTitle>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}
      
      {/* Exam Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-6">
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{exam.title}</h2>
            <p className="text-sm text-muted-foreground">{exam.subject}</p>
          </div>
          <div className="flex items-center gap-4">
            <ExamTimer 
              durationMinutes={exam.duration} 
              onTimeUp={handleTimeUp} 
              className="w-auto" 
            />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <>
                  <Icons.minimize className="mr-2 h-4 w-4" />
                  Exit Fullscreen
                </>
              ) : (
                <>
                  <Icons.maximize className="mr-2 h-4 w-4" />
                  Enter Fullscreen
                </>
              )}
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Exam Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-5xl space-y-6">
          <Tabs defaultValue="q1" className="w-full">
            <TabsList className="mb-4 flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
              {exam.questions.map((q, index) => (
                <TabsTrigger
                  key={q.id}
                  value={q.id}
                  className="h-9 rounded-md border bg-background data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Question {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {exam.questions.map((question, index) => (
              <TabsContent key={question.id} value={question.id} className="pt-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Question {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-lg">{question.question}</div>
                    
                    {question.type === "multiple-choice" && (
                      <div className="space-y-3 pt-3">
                        {question.options?.map((option, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              id={`q${index}-opt${idx}`} 
                              name={`question-${index}`} 
                              className="h-4 w-4 border-primary text-primary focus:ring-primary" 
                            />
                            <label htmlFor={`q${index}-opt${idx}`} className="text-base">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {question.type === "long-answer" && (
                      <Textarea 
                        placeholder="Type your answer here..." 
                        className="min-h-32" 
                      />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      {/* Exam Footer */}
      <footer className="sticky bottom-0 z-10 flex h-14 items-center border-t bg-background px-6">
        <div className="flex flex-1 items-center justify-between">
          <Button variant="outline" size="sm">
            <Icons.save className="mr-2 h-4 w-4" />
            Save Progress
          </Button>
          <Button 
            onClick={() => setConfirmSubmit(true)}
            size="sm"
          >
            <Icons.check className="mr-2 h-4 w-4" />
            Submit Exam
          </Button>
        </div>
      </footer>
      
      {/* Confirm Submit Dialog */}
      <Dialog open={confirmSubmit} onOpenChange={setConfirmSubmit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Exam</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your exam? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
            <Button variant="outline" onClick={() => setConfirmSubmit(false)}>
              Continue Exam
            </Button>
            <Button 
              onClick={() => {
                setConfirmSubmit(false)
                navigate("/student-dashboard")
              }}
            >
              Submit Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
