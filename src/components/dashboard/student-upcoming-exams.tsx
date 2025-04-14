
import React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

interface Exam {
  id: string
  title: string
  subject: string
  date: string
  time: string
  duration: number
  status: "upcoming" | "available" | "completed"
}

interface UpcomingExamsProps {
  exams: Exam[]
}

export function StudentUpcomingExams({ exams }: UpcomingExamsProps) {
  const navigate = useNavigate()
  
  const getStatusColor = (status: Exam["status"]) => {
    switch(status) {
      case "upcoming": return "bg-indigo-100 text-indigo-800"
      case "available": return "bg-green-100 text-green-800"
      case "completed": return "bg-slate-100 text-slate-800"
      default: return "bg-slate-100 text-slate-800"
    }
  }
  
  const startExam = (examId: string) => {
    navigate(`/exam/${examId}`)
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Exams</h2>
        <Button variant="outline" size="sm">
          <Icons.calendar className="mr-2 h-4 w-4" />
          View All
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <Card key={exam.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{exam.title}</CardTitle>
                <Badge className={cn("ml-2", getStatusColor(exam.status))}>
                  {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                </Badge>
              </div>
              <CardDescription>{exam.subject}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{exam.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{exam.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{exam.duration} mins</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button 
                className="w-full" 
                disabled={exam.status !== "available"}
                onClick={() => startExam(exam.id)}
              >
                {exam.status === "available" ? (
                  <>
                    <Icons.fileText className="mr-2 h-4 w-4" />
                    Start Exam
                  </>
                ) : exam.status === "upcoming" ? (
                  "Not Available Yet"
                ) : (
                  "Completed"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Helper function to get a properly formatted className
function cn(...inputs: string[]) {
  return inputs.filter(Boolean).join(" ")
}
