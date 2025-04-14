
import React from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TeacherCreateExamForm } from "@/components/dashboard/teacher-create-exam-form"

export default function TeacherCreateExam() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader 
        title="Create New Exam" 
        userType="teacher" 
        showBackButton 
        backTo="/teacher-dashboard" 
      />
      
      <main className="flex-1 p-6 md:p-8 pt-6">
        <div className="max-w-5xl mx-auto">
          <TeacherCreateExamForm />
        </div>
      </main>
    </div>
  )
}
