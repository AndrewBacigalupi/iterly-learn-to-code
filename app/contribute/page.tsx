import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Bug, Code, Github, Heart, Users, Puzzle} from "lucide-react";

export default function ContributePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Help  <span className="text-blue-300 font-style: italic">Build</span> Iterly
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join our community of developers and help create the best platform
              for learning programming through practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <a
                  href="https://github.com/AndrewBacigalupi/iterly-learn-to-code"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5 mr-2" />
                  View on GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a
                  href="https://github.com/AndrewBacigalupi/iterly-learn-to-code/issues/new/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Bug className="h-5 w-5 mr-2" />
                  Report Issues
                </a>
              </Button>
              <Button asChild size="lg">
                <a
                  href="/submit/puzzle"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Puzzle className="h-5 w-5 mr-2" />
                  Submit a Puzzle Idea
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              What is Iterly?
            </h2>
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p>
                Iterly is an open-source platform designed to help
                developers of all skill levels improve their programming
                abilities through hands-on practice. We believe that the best
                way to learn programming is by solving real problems and getting
                immediate feedback.
              </p>
              <p>
                Our platform brings entry-level puzzles the real-world input data 
                they never had, allowing beginner devlopers to feel the power of their 
                code from the start. 
              </p>
              <p>
                Built with modern technologies including Next.js, TypeScript,
                and Tailwind CSS, Iterly is designed to be fast, reliable, and 
                accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Ways to Contribute */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ways to Contribute
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Code Contributions
                </CardTitle>
                <CardDescription>
                  Help improve the platform by contributing code, fixing bugs,
                  or adding new features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                  <li>• Fix bugs and improve performance</li>
                  <li>• Add new features and functionality</li>
                  <li>• Improve UI/UX design</li>
                  <li>• Write and improve tests</li>
                </ul>
                <Button asChild variant="outline" size="sm">
                  <a
                    href="https://github.com/AndrewBacigalupi/iterly-learn-to-code/blob/main/README.md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Development Guide
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Content Creation
                </CardTitle>
                <CardDescription>
                  Help expand our library of puzzles and coding problems for
                  learners to solve.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                  <li>• Suggest new programming puzzles</li>
                  <li>• Write solution explanations</li>
                  <li>• Review and improve existing content</li>
                  <li>• Help us grow the educational value of Iterly!</li>
                </ul>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <a href="/submit/puzzle">Submit Puzzle Idea</a>
                  </Button>      
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bug className="h-5 w-5 text-primary" />
                  Bug Reports & Testing
                </CardTitle>
                <CardDescription>
                  Help us identify and fix issues to make the platform better
                  for everyone.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                  <li>• Report bugs and issues</li>
                  <li>• Test new features</li>
                  <li>• Suggest improvements</li>
                  <li>• Help with quality assurance</li>
                </ul>
                <Button asChild variant="outline" size="sm">
                  <a
                    href="https://github.com/AndrewBacigalupi/iterly-learn-to-code/issues/new"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Report an Issue
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Community Support
                </CardTitle>
                <CardDescription>
                  Help build and support our growing community of learners and
                  contributors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                  <li>• Answer questions in discussions</li>
                  <li>• Help new contributors get started</li>
                  <li>• Share the project with others</li>
                  <li>• Provide feedback and suggestions</li>
                </ul>
                <Button asChild variant="outline" size="sm">
                  <a
                    href="https://github.com/AndrewBacigalupi/iterly-learn-to-code/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Discussions
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Getting Started */}
        <section className="py-12 bg-muted/50 rounded-lg">
          <div className="max-w-2xl mx-auto text-center px-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              Ready to Contribute?
            </h2>
            <p className="text-muted-foreground mb-6">
              Whether you're a seasoned developer or just starting out, there
              are many ways to contribute to Iterly. Every contribution,
              no matter how small, helps make the platform better for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a
                  href="https://github.com/AndrewBacigalupi/iterly-learn-to-code"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-2" />
                  Fork on GitHub
                </a>
              </Button>
              <Button asChild variant="outline">
                <a
                  href="https://github.com/AndrewBacigalupi/iterly-learn-to-code/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Documentation
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Built With</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="font-semibold">Next.js</div>
                <div className="text-sm text-muted-foreground">
                  React Framework
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="font-semibold">TypeScript</div>
                <div className="text-sm text-muted-foreground">Type Safety</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="font-semibold">Tailwind CSS</div>
                <div className="text-sm text-muted-foreground">Styling</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="font-semibold">Drizzle ORM</div>
                <div className="text-sm text-muted-foreground">Database</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="font-semibold">Auth.js</div>
                <div className="text-sm text-muted-foreground">
                  Authentication
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="font-semibold">Neon</div>
                <div className="text-sm text-muted-foreground">PostgreSQL</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="font-semibold">shadcn/ui</div>
                <div className="text-sm text-muted-foreground">Components</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="font-semibold">Git/Github</div>
                <div className="text-sm text-muted-foreground">Version Control</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
