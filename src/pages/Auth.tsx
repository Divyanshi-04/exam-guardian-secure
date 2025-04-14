
import React from "react"
import { UserAuthForm } from "@/components/ui/user-auth-form"
import { Icons } from "@/components/ui/icons"

export default function AuthPage() {
  return (
    <div className="container relative h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-indigo-600" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.fileText className="mr-2 h-6 w-6" />
          Exam Guardian Secure
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "This platform has transformed our online exams, ensuring academic integrity 
              while providing a smooth, secure testing experience for our students."
            </p>
            <footer className="text-sm">Professor Sarah Johnson, University of Education</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome to Exam Guardian
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to continue to your secure examination platform
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking sign in, you agree to our{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
