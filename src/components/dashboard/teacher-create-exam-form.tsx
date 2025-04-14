
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

export function TeacherCreateExamForm() {
  const navigate = useNavigate()
  const [isUploading, setIsUploading] = useState(false)
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // In a real app, we would submit the form data to the server
    setTimeout(() => {
      navigate("/teacher-dashboard")
    }, 1500)
  }
  
  const simulateFileUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
    }, 2000)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Exam Details</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Exam Details</CardTitle>
              <CardDescription>
                Set the basic information for your exam.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="exam-title">Exam Title</Label>
                <Input id="exam-title" placeholder="e.g., Midterm Exam" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="e.g., Mathematics" required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exam-date">Date</Label>
                  <Input id="exam-date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exam-time">Start Time</Label>
                  <Input id="exam-time" type="time" required />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (mins)</Label>
                  <Input id="duration" type="number" min="5" placeholder="60" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total-marks">Total Marks</Label>
                  <Input id="total-marks" type="number" min="1" placeholder="100" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Add any special instructions or information about the exam."
                  className="min-h-32"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Questions</CardTitle>
              <CardDescription>
                Add questions to your exam or upload a document.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <p className="text-sm text-muted-foreground">Choose how you want to add questions:</p>
                
                <div className="flex flex-col space-y-4">
                  <Card className={cn("border-2 border-dashed cursor-pointer hover:border-primary/50 transition-colors")}>
                    <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="mb-4 rounded-full bg-primary/10 p-4">
                        <Icons.upload className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold">Upload Document</h3>
                      <p className="text-sm text-muted-foreground max-w-md mt-1 mb-4">
                        Upload a PDF, Word, or other document containing your questions.
                      </p>
                      <Button 
                        type="button" 
                        onClick={simulateFileUpload}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <>
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>Select Files</>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className={cn("border-2 border-dashed cursor-pointer hover:border-primary/50 transition-colors")}>
                    <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="mb-4 rounded-full bg-primary/10 p-4">
                        <Icons.edit className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold">Create Questions</h3>
                      <p className="text-sm text-muted-foreground max-w-md mt-1 mb-4">
                        Create multiple-choice, true/false, or short answer questions.
                      </p>
                      <Button type="button">Create Questions</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Exam Settings</CardTitle>
              <CardDescription>
                Configure security and monitoring settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Prevent Tab Switching</Label>
                    <p className="text-sm text-muted-foreground">
                      Alert if students switch browser tabs during the exam.
                    </p>
                  </div>
                  <Input type="checkbox" className="h-4 w-4" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Auto-Submit on Violations</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically submit the exam after 3 security violations.
                    </p>
                  </div>
                  <Input type="checkbox" className="h-4 w-4" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Randomize Questions</Label>
                    <p className="text-sm text-muted-foreground">
                      Shuffle the order of questions for each student.
                    </p>
                  </div>
                  <Input type="checkbox" className="h-4 w-4" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Show Results Immediately</Label>
                    <p className="text-sm text-muted-foreground">
                      Display exam results to students right after submission.
                    </p>
                  </div>
                  <Input type="checkbox" className="h-4 w-4" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => navigate("/teacher-dashboard")}>
                Cancel
              </Button>
              <Button type="submit">Create Exam</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  )
}
