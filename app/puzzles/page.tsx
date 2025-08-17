import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { dbExport } from "@/lib/db";
import { puzzleCompletions, puzzles } from "@/lib/db/schema";
import { getCategoriesWithCounts } from "@/lib/categories";
import { eq, sql } from "drizzle-orm";
import { 
  ArrowRight,
  Trophy
} from "lucide-react";
import Link from "next/link";

export default async function PuzzlesPage() {
  const session = await auth();

  // Fetch puzzle counts by category
  const categoryStats = await dbExport
    .select({
      category: puzzles.category,
      count: sql<number>`count(*)`.as('count')
    })
    .from(puzzles)
    .groupBy(puzzles.category);

  // Fetch user's completed puzzles if logged in
  let completedPuzzleIds: string[] = [];
  let totalCompletions = 0;
  if (session?.user?.id) {
    const userCompletions = await dbExport
      .select({ puzzleId: puzzleCompletions.puzzleId })
      .from(puzzleCompletions)
      .where(eq(puzzleCompletions.userId, session.user.id));

    completedPuzzleIds = [...new Set(userCompletions.map((c) => c.puzzleId))];
    totalCompletions = userCompletions.length;
  }

  // Get total puzzle count
  const totalPuzzles = categoryStats.reduce((sum, cat) => sum + cat.count, 0);

  // Get categories with their puzzle counts
  const categories = getCategoriesWithCounts(categoryStats);

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

        {/* Categories Grid */}
        <div className="grid gap-6 mb-8">
          {categories.map((category) => (
            <Card key={category.id} className="group transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                    <div className={`p-4 rounded-lg ${category.bgColor} flex-shrink-0`}>
                      <category.icon className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-2xl mb-2">
                        <span className="break-words">{category.title}</span>
                      </CardTitle>
                      <CardDescription className="text-base mb-3 mr-2">
                        {category.description}
                      </CardDescription>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                        <span>{category.puzzleCount} puzzles</span>
                        <Badge variant="secondary" className="w-fit">
                          {category.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Button 
                      asChild 
                      size="lg"
                      className="w-full sm:w-auto group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      <Link href={`/puzzles/categories/${category.id}`}>
                        <span className="hidden sm:inline">Start {category.title}</span>
                        <span className="sm:hidden">Start</span>
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {session && (
          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Your Puzzle Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {completedPuzzleIds.length}
                </div>
                <div className="text-sm text-muted-foreground">Solved</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {totalPuzzles - completedPuzzleIds.length}
                </div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {totalPuzzles > 0
                    ? Math.round(
                        (completedPuzzleIds.length / totalPuzzles) * 100
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
                  {totalCompletions}
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
