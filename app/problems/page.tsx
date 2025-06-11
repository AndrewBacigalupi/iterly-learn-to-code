import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { problems, problemSubmissions } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { CheckCircle, Clock, Code, Play } from "lucide-react";
import Link from "next/link";

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "easy":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "hard":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
}

export default async function ProblemsPage() {
  const session = await auth();

  // Fetch all problems from database
  const allProblems = await db
    .select()
    .from(problems)
    .orderBy(problems.createdAt);

  // Fetch user's successful submissions if logged in
  let completedProblemIds: string[] = [];
  if (session?.user?.id) {
    const userSubmissions = await db
      .select({ problemId: problemSubmissions.problemId })
      .from(problemSubmissions)
      .where(
        and(
          eq(problemSubmissions.userId, session.user.id),
          eq(problemSubmissions.status, "accepted")
        )
      );

    completedProblemIds = [...new Set(userSubmissions.map((s) => s.problemId))];
  }

  // Calculate stats
  const totalSubmissions = session?.user?.id
    ? await db
        .select()
        .from(problemSubmissions)
        .where(eq(problemSubmissions.userId, session.user.id))
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Coding Problems</h1>
          <p className="text-muted-foreground mb-4">
            Practice with LeetCode-style problems featuring real-time code
            execution and automated testing. Choose from multiple programming
            languages and get instant feedback on your solutions.
          </p>
          {!session && (
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Sign in to track your progress!</strong> You can solve
                problems without an account, but signing in allows you to save
                your submissions and track your success rate.
              </p>
            </div>
          )}
        </div>

        <div className="grid gap-6">
          {allProblems.map((problem) => {
            const isCompleted = completedProblemIds.includes(problem.id);
            const testCases = problem.testCases as Array<{
              input: string;
              expectedOutput: string;
            }>;
            const starterCode = problem.starterCode as Record<string, string>;
            const supportedLanguages = Object.keys(starterCode);

            return (
              <Card
                key={problem.id}
                className={`transition-all hover:shadow-md ${
                  isCompleted ? "ring-2 ring-green-500" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {isCompleted && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        {problem.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {problem.description}
                      </CardDescription>
                    </div>
                    <Badge className={getDifficultyColor(problem.difficulty)}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {problem.tags?.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div>
                      <strong className="text-sm">Supported Languages:</strong>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {supportedLanguages.map((lang) => (
                          <Badge
                            key={lang}
                            variant="outline"
                            className="text-xs"
                          >
                            <Code className="h-3 w-3 mr-1" />
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <strong className="text-sm">Test Cases:</strong>
                      <div className="mt-2 space-y-2">
                        {testCases.slice(0, 2).map((testCase, index) => (
                          <div
                            key={index}
                            className="grid md:grid-cols-2 gap-4 text-xs"
                          >
                            <div>
                              <span className="text-muted-foreground">
                                Input:
                              </span>
                              <code className="block mt-1 p-2 bg-muted rounded">
                                {testCase.input}
                              </code>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Output:
                              </span>
                              <code className="block mt-1 p-2 bg-muted rounded">
                                {testCase.expectedOutput}
                              </code>
                            </div>
                          </div>
                        ))}
                        {testCases.length > 2 && (
                          <p className="text-xs text-muted-foreground">
                            +{testCases.length - 2} more test cases...
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {isCompleted ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            Solved
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Not attempted
                          </span>
                        )}
                      </div>
                      <Button asChild>
                        <Link href={`/problems/${problem.id}`}>
                          <Play className="h-4 w-4 mr-2" />
                          {isCompleted ? "View Solution" : "Solve Problem"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {session && (
          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-500" />
              Your Coding Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {completedProblemIds.length}
                </div>
                <div className="text-sm text-muted-foreground">Solved</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {allProblems.length - completedProblemIds.length}
                </div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {allProblems.length > 0
                    ? Math.round(
                        (completedProblemIds.length / allProblems.length) * 100
                      )
                    : 0}
                  %
                </div>
                <div className="text-sm text-muted-foreground">
                  Success Rate
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {totalSubmissions.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Submissions
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
