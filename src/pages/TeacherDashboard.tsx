
import React from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TeacherExamsList } from "@/components/dashboard/teacher-exams-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Icons } from "@/components/ui/icons"

// Mock data
const mockExams = [
  {
    id: "exam-1",
    title: "Midterm Examination",
    subject: "Computer Science",
    date: "April 20, 2025",
    timeSlot: "10:00 AM - 12:00 PM",
    duration: 120,
    totalStudents: 35,
    status: "scheduled" as const
  },
  {
    id: "exam-2",
    title: "Physics Quiz 3",
    subject: "Physics",
    date: "April 16, 2025",
    timeSlot: "2:00 PM - 2:45 PM",
    duration: 45,
    totalStudents: 28,
    status: "active" as const
  },
  {
    id: "exam-3",
    title: "Mathematics Test",
    subject: "Calculus",
    date: "April 10, 2025",
    timeSlot: "9:00 AM - 10:30 AM",
    duration: 90,
    totalStudents: 40,
    status: "completed" as const
  },
  {
    id: "exam-4",
    title: "Literature Essay",
    subject: "English Literature",
    date: "TBD",
    timeSlot: "TBD",
    duration: 180,
    totalStudents: 0,
    status: "draft" as const
  },
]

// Stats data for the dashboard
const stats = [
  {
    title: "Total Exams",
    value: "4",
    icon: Icons.fileText,
    description: "All exams created"
  },
  {
    title: "Active Exams",
    value: "1",
    icon: Icons.fileText,
    description: "Currently in progress"
  },
  {
    title: "Total Students",
    value: "103",
    icon: Icons.user,
    description: "Enrolled across all exams"
  },
]

export default function TeacherDashboard() {
  const navigate = useNavigate()
  
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader title="Teacher Dashboard" userType="teacher" />
      
      <main className="flex-1 p-6 md:p-8 pt-6">
        <div className="grid gap-6">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, Professor</h1>
            <div className="flex gap-2">
              <Button onClick={() => navigate("/teacher/create-exam")}>
                <Icons.edit className="mr-2 h-4 w-4" />
                Create Exam
              </Button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex flex-col">
                    <CardTitle className="text-3xl font-bold">{stat.value}</CardTitle>
                    <CardDescription className="text-sm">{stat.title}</CardDescription>
                  </div>
                  <div className="rounded-full bg-primary/10 p-3">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Exams List */}
          <TeacherExamsList exams={mockExams} />
          
          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start" onClick={() => navigate("/teacher/create-exam")}>
                    <Icons.edit className="mr-2 h-4 w-4" />
                    Create Exam
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Icons.user className="mr-2 h-4 w-4" />
                    Manage Students
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Icons.upload className="mr-2 h-4 w-4" />
                    Upload Questions
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Icons.fileText className="mr-2 h-4 w-4" />
                    Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Active Now</CardTitle>
                <CardDescription>Students currently taking exams</CardDescription>
              </CardHeader>
              <CardContent>
                {mockExams.some(exam => exam.status === "active") ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Physics Quiz 3</p>
                        <p className="text-sm text-muted-foreground">28 students active</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Icons.eye className="mr-2 h-4 w-4" />
                        Monitor
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="rounded-full bg-muted p-3 mb-3">
                      <Icons.clock className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">No active exams at the moment</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
