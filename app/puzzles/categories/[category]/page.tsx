import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { dbExport } from "@/lib/db";
import { puzzleCompletions, puzzles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { 
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Clock,
  Play
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const categories = {
  basics: {
    title: "Basics",
    description: "Fundamental programming concepts and simple algorithms",
    icon: BookOpen,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950"
  }
};

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

export default async function CategoryPuzzlesPage({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}) {
  const { category } = await params;
  const session = await auth();
  
  const categoryData = categories[category as keyof typeof categories];
  if (!categoryData) {
    notFound();
  }

  // Fetch all puzzles from database (same as original puzzles page)
  const allPuzzles = await dbExport.select().from(puzzles).orderBy(puzzles.number);

  // Fetch user's completed puzzles if logged in (same as original puzzles page)
  let completedPuzzleIds: string[] = [];
  if (session?.user?.id) {
    const userCompletions = await dbExport
      .select({ puzzleId: puzzleCompletions.puzzleId })
      .from(puzzleCompletions)
      .where(eq(puzzleCompletions.userId, session.user.id));

    completedPuzzleIds = [...new Set(userCompletions.map((c) => c.puzzleId))];
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/puzzles/categories">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Link>
          </Button>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-4 rounded-lg ${categoryData.bgColor}`}>
            <categoryData.icon className={`h-12 w-12 ${categoryData.color}`} />
          </div>
          <div>
            <h1 className="text-4xl font-bold">{categoryData.title}</h1>
            <p className="text-lg text-muted-foreground mt-2">
              {categoryData.description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <span>{allPuzzles.length} puzzles</span>
          <span>All puzzles are beginner-friendly</span>
        </div>

        {!session && (
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 mt-4">
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Sign in to track your progress!</strong> You can solve
              puzzles without an account, but signing in allows you to save
              your solutions and track your success rate.
            </p>
          </div>
        )}
      </div>

      {/* Puzzles List */}
      <div className="max-w-4xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold">Puzzles</h2>
        {allPuzzles.map((puzzle) => {
          const isCompleted = completedPuzzleIds.includes(puzzle.id);

          return (
            <Card 
              key={puzzle.id} 
              className={`group hover:shadow-md transition-all duration-300 ${
                isCompleted ? "ring-2 ring-green-500 dark:ring-green-600" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <CardTitle className="text-2xl flex items-center gap-2">
                        {puzzle.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      {isCompleted ? (
                        <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
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
                  </div>
                  
                  <div className="flex items-center gap-2 ml-6">
                    <Button 
                      asChild 
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      <Link href={`/puzzles/${puzzle.id}`}>
                        <Play className="h-4 w-4" />
                        {isCompleted ? "View Puzzle" : "Start Puzzle"}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="max-w-4xl mx-auto mt-12 flex items-center justify-between">
        <Button asChild variant="outline">
          <Link href="/puzzles/categories">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Link>
        </Button>
        
        <div className="text-sm text-muted-foreground">
          Ready to start solving? Pick any puzzle to begin!
        </div>
      </div>
    </div>
  );
} 