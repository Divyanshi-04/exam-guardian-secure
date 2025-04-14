
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

const Index = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Icons.fileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Exam Guardian Secure</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/auth")}>
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl mb-6">
              Secure Online Examinations for the Digital Age
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              Maintain academic integrity with cutting-edge monitoring tools that prevent cheating while providing a smooth testing experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => navigate("/auth")}>
                <Icons.user className="mr-2 h-5 w-5" />
                Try Student Demo
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
                <Icons.fileText className="mr-2 h-5 w-5" />
                Try Teacher Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Powerful Features for Secure Testing
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6 shadow-sm border">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  <Icons.eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tab Switching Prevention</h3>
                <p className="text-muted-foreground">
                  Automatically detect and prevent students from accessing unauthorized resources during exams.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm border">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  <Icons.clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Time Management</h3>
                <p className="text-muted-foreground">
                  Set precise time limits for examinations with automatic submission when time expires.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm border">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  <Icons.upload className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Multiple Question Formats</h3>
                <p className="text-muted-foreground">
                  Support for various question types including multiple choice, essay, and file upload questions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your online testing?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Join educational institutions worldwide using Exam Guardian to maintain academic integrity.
            </p>
            <Button size="lg" variant="secondary" onClick={() => navigate("/auth")}>
              Get Started Today
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icons.fileText className="h-5 w-5 text-primary" />
              <span className="font-semibold">Exam Guardian Secure</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Exam Guardian. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">
                Privacy
              </Button>
              <Button variant="ghost" size="sm">
                Terms
              </Button>
              <Button variant="ghost" size="sm">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index
