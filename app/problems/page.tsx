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
import { CheckCircle, Clock, Code, Play } from "lucide-react";
import Link from "next/link";

// Mock data for now - in a real app, this would come from the database
const mockProblems = [
  {
    id: "1",
    title: "Reverse String",
    description:
      "Write a function that reverses a string. The input string is given as an array of characters.",
    difficulty: "easy" as const,
    tags: ["strings", "two-pointers"],
    testCases: [
      {
        input: '["h","e","l","l","o"]',
        expectedOutput: '["o","l","l","e","h"]',
      },
      {
        input: '["H","a","n","n","a","h"]',
        expectedOutput: '["h","a","n","n","a","H"]',
      },
    ],
    languages: ["javascript", "python", "java", "cpp"],
  },
  {
    id: "2",
    title: "Valid Parentheses",
    description:
      "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "easy" as const,
    tags: ["stack", "strings"],
    testCases: [
      { input: '"()"', expectedOutput: "true" },
      { input: '"()[]{}"', expectedOutput: "true" },
      { input: '"(]"', expectedOutput: "false" },
    ],
    languages: ["javascript", "python", "java", "cpp"],
  },
  {
    id: "3",
    title: "Merge Two Sorted Lists",
    description:
      "You are given the heads of two sorted linked lists. Merge the two lists into one sorted list.",
    difficulty: "easy" as const,
    tags: ["linked-list", "recursion"],
    testCases: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        expectedOutput: "[1,1,2,3,4,4]",
      },
      { input: "list1 = [], list2 = []", expectedOutput: "[]" },
    ],
    languages: ["javascript", "python", "java", "cpp"],
  },
  {
    id: "4",
    title: "Binary Tree Inorder Traversal",
    description:
      "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    difficulty: "medium" as const,
    tags: ["tree", "depth-first-search", "stack"],
    testCases: [
      { input: "root = [1,null,2,3]", expectedOutput: "[1,3,2]" },
      { input: "root = []", expectedOutput: "[]" },
    ],
    languages: ["javascript", "python", "java", "cpp"],
  },
  {
    id: "5",
    title: "Longest Palindromic Substring",
    description:
      "Given a string s, return the longest palindromic substring in s.",
    difficulty: "medium" as const,
    tags: ["string", "dynamic-programming"],
    testCases: [
      { input: '"babad"', expectedOutput: '"bab" or "aba"' },
      { input: '"cbbd"', expectedOutput: '"bb"' },
    ],
    languages: ["javascript", "python", "java", "cpp"],
  },
  {
    id: "6",
    title: "Median of Two Sorted Arrays",
    description:
      "Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.",
    difficulty: "hard" as const,
    tags: ["array", "binary-search", "divide-and-conquer"],
    testCases: [
      { input: "nums1 = [1,3], nums2 = [2]", expectedOutput: "2.0" },
      { input: "nums1 = [1,2], nums2 = [3,4]", expectedOutput: "2.5" },
    ],
    languages: ["javascript", "python", "java", "cpp"],
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

export default async function ProblemsPage() {
  const session = await auth();

  // Mock completed problems for demo
  const mockCompletedProblemIds = session ? ["1", "2", "4"] : [];

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
          {mockProblems.map((problem) => {
            const isCompleted = mockCompletedProblemIds.includes(problem.id);

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
                      {problem.tags.map((tag) => (
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
                        {problem.languages.map((lang) => (
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
                        {problem.testCases
                          .slice(0, 2)
                          .map((testCase, index) => (
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
                        {problem.testCases.length > 2 && (
                          <p className="text-xs text-muted-foreground">
                            +{problem.testCases.length - 2} more test cases...
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
                  {mockCompletedProblemIds.length}
                </div>
                <div className="text-sm text-muted-foreground">Solved</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {mockProblems.length - mockCompletedProblemIds.length}
                </div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {Math.round(
                    (mockCompletedProblemIds.length / mockProblems.length) * 100
                  )}
                  %
                </div>
                <div className="text-sm text-muted-foreground">
                  Success Rate
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">{mockProblems.length}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
