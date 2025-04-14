
import React from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { StudentUpcomingExams } from "@/components/dashboard/student-upcoming-exams"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

// Mock data
const mockExams = [
  {
    id: "exam-1",
    title: "Midterm Examination",
    subject: "Computer Science",
    date: "April 20, 2025",
    time: "10:00 AM",
    duration: 120,
    status: "upcoming" as const
  },
  {
    id: "exam-2",
    title: "Physics Quiz 3",
    subject: "Physics",
    date: "April 16, 2025",
    time: "2:00 PM",
    duration: 45,
    status: "available" as const
  },
  {
    id: "exam-3",
    title: "Mathematics Test",
    subject: "Calculus",
    date: "April 10, 2025",
    time: "9:00 AM",
    duration: 90,
    status: "completed" as const
  },
  {
    id: "exam-4",
    title: "Literature Essay",
    subject: "English Literature",
    date: "April 25, 2025",
    time: "11:30 AM",
    duration: 180,
    status: "upcoming" as const
  },
]

// Stats data for the dashboard
const stats = [
  {
    title: "Upcoming Exams",
    value: "2",
    icon: Icons.calendar,
    description: "Scheduled in the next 30 days"
  },
  {
    title: "Available Now",
    value: "1",
    icon: Icons.fileText,
    description: "Ready to take"
  },
  {
    title: "Completed",
    value: "1",
    icon: Icons.check,
    description: "Finished exams"
  },
]

export default function StudentDashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader title="Student Dashboard" userType="student" />
      
      <main className="flex-1 p-6 md:p-8 pt-6">
        <div className="grid gap-6">
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
          <StudentUpcomingExams exams={mockExams} />
          
          {/* Recent Activity - Could be expanded in the future */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent exam activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-2 rounded-lg bg-muted/50">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Icons.check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Mathematics Test completed</p>
                    <p className="text-xs text-muted-foreground">April 10, 2025 at 10:30 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-2 rounded-lg">
                  <div className="rounded-full bg-muted/80 p-2">
                    <Icons.eye className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Viewed Physics Quiz details</p>
                    <p className="text-xs text-muted-foreground">April 5, 2025 at 3:15 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
