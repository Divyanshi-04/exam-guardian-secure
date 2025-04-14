
import React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/ui/icons"

interface Exam {
  id: string
  title: string
  subject: string
  date: string
  timeSlot: string
  duration: number
  totalStudents: number
  status: "scheduled" | "active" | "completed" | "draft"
}

interface TeacherExamsListProps {
  exams: Exam[]
}

export function TeacherExamsList({ exams }: TeacherExamsListProps) {
  const navigate = useNavigate()
  
  const getStatusColor = (status: Exam["status"]) => {
    switch(status) {
      case "scheduled": return "bg-indigo-100 text-indigo-800"
      case "active": return "bg-green-100 text-green-800"
      case "completed": return "bg-slate-100 text-slate-800"
      case "draft": return "bg-amber-100 text-amber-800"
      default: return "bg-slate-100 text-slate-800"
    }
  }
  
  const handleViewExam = (examId: string) => {
    navigate(`/teacher/exam/${examId}`)
  }
  
  const handleCreateExam = () => {
    navigate('/teacher/create-exam')
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Exams</h2>
        <Button onClick={handleCreateExam}>
          <Icons.edit className="mr-2 h-4 w-4" />
          Create New Exam
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
                  <span className="font-medium">{exam.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{exam.duration} mins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Students:</span>
                  <span className="font-medium">{exam.totalStudents}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex gap-2">
              <Button 
                className="flex-1" 
                variant="outline"
                onClick={() => handleViewExam(exam.id)}
              >
                <Icons.eye className="mr-2 h-4 w-4" />
                View
              </Button>
              
              {exam.status === "active" ? (
                <Button className="flex-1" variant="default">
                  <Icons.eye className="mr-2 h-4 w-4" />
                  Monitor
                </Button>
              ) : exam.status === "draft" ? (
                <Button className="flex-1" variant="default">
                  <Icons.edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              ) : null}
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
