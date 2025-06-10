import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, Puzzle, Trophy, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Learn to <span className="text-primary">Scode</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Master programming through hands-on puzzles and coding challenges
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn to Scode is a platform designed to help you improve your
            programming skills through practical problem-solving. Whether you're
            a beginner or an experienced developer, our collection of puzzles
            and coding problems will challenge you to think critically and write
            better code.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/puzzles">Start with Puzzles</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/problems">Try Coding Problems</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What You'll Find Here
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Puzzle className="h-5 w-5 text-primary" />
                  Advent of Code Style Puzzles
                </CardTitle>
                <CardDescription>
                  Challenge yourself with creative problem-solving puzzles that
                  test your logic and algorithmic thinking.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Solve puzzles at your own pace</li>
                  <li>• Paste your solutions to track progress</li>
                  <li>• View explanations and alternative approaches</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Interactive Coding Problems
                </CardTitle>
                <CardDescription>
                  Practice with LeetCode-style problems with instant feedback
                  and multiple language support.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Real-time code execution</li>
                  <li>• Multiple programming languages</li>
                  <li>• Automated test case validation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Track Your Progress
                </CardTitle>
                <CardDescription>
                  Sign in to save your solutions and monitor your improvement
                  over time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Save completed puzzles and problems</li>
                  <li>• View your solution history</li>
                  <li>• Track your learning journey</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Community Driven
                </CardTitle>
                <CardDescription>
                  Help grow the platform by contributing new problems and
                  improvements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Open source and collaborative</li>
                  <li>• Submit your own puzzles</li>
                  <li>• Help improve the platform</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-12 bg-muted/50 rounded-lg">
        <div className="max-w-2xl mx-auto text-center px-6">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-6">
            You can explore all puzzles and problems without signing in. Create
            an account to track your progress and save your solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/puzzles">Browse Puzzles</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/problems">View Problems</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
