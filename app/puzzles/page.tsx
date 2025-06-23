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
import { dbExport } from "@/lib/db";
import { puzzleCompletions, puzzles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { CheckCircle, Clock, Play, Trophy } from "lucide-react";
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


export default async function PuzzlesPage() {
  const session = await auth();

  // Fetch all puzzles from database
  const allPuzzles = await dbExport.select().from(puzzles).orderBy(puzzles.number);

  // Fetch user's completed puzzles if logged in
  let completedPuzzleIds: string[] = [];
  if (session?.user?.id) {
    const userCompletions = await dbExport
      .select({ puzzleId: puzzleCompletions.puzzleId })
      .from(puzzleCompletions)
      .where(eq(puzzleCompletions.userId, session.user.id));

    completedPuzzleIds = [...new Set(userCompletions.map((c) => c.puzzleId))];
  }

  // Calculate stats
  const totalCompletions = session?.user?.id
    ? await dbExport
        .select()
        .from(puzzleCompletions)
        .where(eq(puzzleCompletions.userId, session.user.id))
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Logic Puzzles</h1>
          <p className="text-muted-foreground mb-4">
            Solve Advent of Code-style puzzles by analyzing the input and
            providing the correct output. These puzzles test your
            problem-solving skills and logical thinking.
          </p>
          {!session && (
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Sign in to track your progress!</strong> You can solve
                puzzles without an account, but signing in allows you to save
                your solutions and track your success rate.
              </p>
            </div>
          )}
        </div>

        <div className="grid gap-6">
          {allPuzzles.map((puzzle) => {
            const isCompleted = completedPuzzleIds.includes(puzzle.id);

            return (
              <Card
                key={puzzle.id}
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
                        {puzzle.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {puzzle.description}
                      </CardDescription>
                    </div>
                    <Badge className={getDifficultyColor(puzzle.difficulty)}>
                      {puzzle.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {puzzle.tags && (
                      <div className="flex flex-wrap gap-2">
                        {puzzle.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div>
                      <strong className="text-sm">Example:</strong>
                      <div className="mt-2 grid md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">Input:</span>
                          <code className="block mt-1 p-2 bg-muted rounded">
                            {puzzle.example_input}
                          </code>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Output:</span>
                          <code className="block mt-1 p-2 bg-muted rounded">
                            [Hidden until solved]
                          </code>
                        </div>
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
                        <Link href={`/puzzles/${puzzle.id}`}>
                          <Play className="h-4 w-4 mr-2" />
                          {isCompleted ? "View Solution" : "Solve Puzzle"}
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
              <Trophy className="h-5 w-5 text-yellow-500" />
              Your Puzzle Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {completedPuzzleIds.length}
                </div>
                <div className="text-sm text-muted-foreground">Solved</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {allPuzzles.length - completedPuzzleIds.length}
                </div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {allPuzzles.length > 0
                    ? Math.round(
                        (completedPuzzleIds.length / allPuzzles.length) * 100
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
                  {totalCompletions.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Attempts
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
