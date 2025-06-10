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
import { CheckCircle, Clock, Star } from "lucide-react";
import Link from "next/link";

// Mock data for now - in a real app, this would come from the database
const mockPuzzles = [
  {
    id: "1",
    title: "Two Sum Arrays",
    description:
      "Given an array of integers and a target sum, find two numbers that add up to the target.",
    difficulty: "easy" as const,
    tags: ["arrays", "hash-table"],
    sampleInput: "[2, 7, 11, 15], target = 9",
    sampleOutput: "[0, 1]",
  },
  {
    id: "2",
    title: "String Palindrome Checker",
    description:
      "Determine if a given string is a palindrome, ignoring spaces and case.",
    difficulty: "easy" as const,
    tags: ["strings", "two-pointers"],
    sampleInput: '"A man a plan a canal Panama"',
    sampleOutput: "true",
  },
  {
    id: "3",
    title: "Binary Tree Traversal",
    description:
      "Implement in-order, pre-order, and post-order traversal of a binary tree.",
    difficulty: "medium" as const,
    tags: ["trees", "recursion"],
    sampleInput: "Tree: [1,null,2,3]",
    sampleOutput: "Inorder: [1,3,2]",
  },
  {
    id: "4",
    title: "Graph Shortest Path",
    description:
      "Find the shortest path between two nodes in an unweighted graph using BFS.",
    difficulty: "medium" as const,
    tags: ["graphs", "bfs"],
    sampleInput: "Graph edges: [[0,1],[1,2],[2,3]], start: 0, end: 3",
    sampleOutput: "[0,1,2,3]",
  },
  {
    id: "5",
    title: "Dynamic Programming Fibonacci",
    description:
      "Calculate the nth Fibonacci number using dynamic programming optimization.",
    difficulty: "hard" as const,
    tags: ["dynamic-programming", "optimization"],
    sampleInput: "n = 10",
    sampleOutput: "55",
  },
];

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

  // In a real app, you would fetch user completions from the database
  // const userCompletions = session ? await db.query.puzzleCompletions.findMany({
  //   where: eq(puzzleCompletions.userId, session.user.id),
  // }) : [];

  const mockCompletedPuzzleIds = session ? ["1", "2"] : []; // Mock completed puzzles for demo

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Programming Puzzles</h1>
          <p className="text-muted-foreground mb-4">
            Challenge yourself with these Advent of Code style puzzles. Each
            puzzle tests different aspects of programming and problem-solving
            skills.
          </p>
          {!session && (
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Sign in to track your progress!</strong> You can solve
                puzzles without an account, but signing in allows you to save
                your solutions and track completed puzzles.
              </p>
            </div>
          )}
        </div>

        <div className="grid gap-6">
          {mockPuzzles.map((puzzle) => {
            const isCompleted = mockCompletedPuzzleIds.includes(puzzle.id);

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

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Sample Input:</strong>
                        <code className="block mt-1 p-2 bg-muted rounded text-xs">
                          {puzzle.sampleInput}
                        </code>
                      </div>
                      <div>
                        <strong>Expected Output:</strong>
                        <code className="block mt-1 p-2 bg-muted rounded text-xs">
                          {puzzle.sampleOutput}
                        </code>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {isCompleted ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            Completed
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Not started
                          </span>
                        )}
                      </div>
                      <Button asChild>
                        <Link href={`/puzzles/${puzzle.id}`}>
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
              <Star className="h-5 w-5 text-yellow-500" />
              Your Progress
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {mockCompletedPuzzleIds.length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {mockPuzzles.length - mockCompletedPuzzleIds.length}
                </div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {Math.round(
                    (mockCompletedPuzzleIds.length / mockPuzzles.length) * 100
                  )}
                  %
                </div>
                <div className="text-sm text-muted-foreground">Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{mockPuzzles.length}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
