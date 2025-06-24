"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle, Lightbulb, Trophy, FileDown } from "lucide-react";
import { Session } from "next-auth";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Puzzle } from "@/lib/db/schema";
import Link from "next/link";
// @ts-ignore - confetti not typed
import confetti from "canvas-confetti";

// interface Puzzle {
//   id: string;
//   title: string;
//   description: string;
//   difficulty: string;
//   tags: string[];
//   input: string;
//   expectedOutput: string;
//   hint?: string;
//   explanation?: string;
// }

interface PuzzleStatus {
  solved: boolean;
}

interface SubmissionResult {
  correct: boolean;
  explanation?: string;
  hint?: string;
}

interface PuzzlePageClientProps {
  session: Session | null;
}

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

export function PuzzlePageClient({ session }: PuzzlePageClientProps) {
  const params = useParams();
  const router = useRouter();
  const puzzleId = params.id as string;

  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  // Load puzzle data and check solve status
  useEffect(() => {
    const loadPuzzleData = async () => {
      try {
        // Fetch puzzle data
        const puzzleResponse = await fetch(`/api/puzzles/${puzzleId}`);
        if (!puzzleResponse.ok) {
          throw new Error("Failed to fetch puzzle");
        }
        const puzzleData = await puzzleResponse.json();
        setPuzzle(puzzleData);

        // Check if user has solved this puzzle
        if (session) {
          const statusResponse = await fetch(`/api/puzzles/${puzzleId}/status`);
          if (statusResponse.ok) {
            const statusData: PuzzleStatus = await statusResponse.json();
            setIsSolved(statusData.solved);
          }
        }
      } catch (error) {
        console.error("Error loading puzzle:", error);
        toast("Failed to load puzzle data");
      } finally {
        setLoading(false);
      }
    };

    loadPuzzleData();
  }, [puzzleId, session]);

  // Load saved answer from localStorage
  useEffect(() => {
    if (puzzleId) {
      const savedAnswer = localStorage.getItem(`puzzle-${puzzleId}-answer`);
      if (savedAnswer) {
        setAnswer(savedAnswer);
      }
    }
  }, [puzzleId]);

  // Save answer to localStorage when it changes
  useEffect(() => {
    if (puzzleId && answer) {
      localStorage.setItem(`puzzle-${puzzleId}-answer`, answer);
    }
  }, [puzzleId, answer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      toast("Sign in required");
      return;
    }

    if (!answer.trim()) {
      toast("Answer required");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`/api/puzzles/${puzzleId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer: answer.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit solution");
      }

      const result: SubmissionResult = await response.json();

      if (result.correct) {
        // Trigger confetti celebration
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        setIsSolved(true);
        setExplanation(result.explanation || null);

        toast("Congratulations! You solved the puzzle!");

        // Clear saved answer on successful solve
        localStorage.removeItem(`puzzle-${puzzleId}-answer`);
      } else {
        toast("That's not quite right. Try again!");
        setShowHint(true);
      }
    } catch (error) {
      console.error("Error submitting solution:", error);
      toast("Failed to submit solution");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextPuzzle = async () => {
    try {
      const response = await fetch("/api/puzzles/next");
      if (response.ok) {
        const { nextPuzzleId } = await response.json();
        if (nextPuzzleId) {
          router.push(`/puzzles/${nextPuzzleId}`);
        } else {
          router.push("/puzzles");
        }
      }
    } catch (error) {
      console.error("Error finding next puzzle:", error);
      router.push("/puzzles");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!puzzle) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Puzzle not found</h1>
          <Button onClick={() => router.push("/puzzles")}>
            Back to Puzzles
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {isSolved && <CheckCircle className="h-8 w-8 text-green-500" />}
              {puzzle.title}
            </h1>
            <Badge className={getDifficultyColor(puzzle.difficulty)}>
              {puzzle.difficulty}
            </Badge>
          </div>

          {puzzle.tags && (
            <div className="flex flex-wrap gap-2 mb-4">
              {puzzle.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <Card>
            <CardHeader>
              <strong className="text-md">Puzzle Description</strong>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{puzzle.description}</p>

              <div>
                <strong className="text-md">Example Input:</strong>
                <code className="block mt-1 p-3 bg-muted rounded text-sm">
                  {puzzle.example_input}
                </code>
              </div>

              <div>
                <div className="mt-2">
                  {puzzle.explanation}
                </div>
              </div>

          

              {/* {isSolved && explanation && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-4 w-4 text-green-600" />
                    <strong className="text-green-800 dark:text-green-200">
                      Explanation
                    </strong>
                  </div>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    {explanation}
                  </p>
                </div>
              )} */}
            </CardContent>
          </Card>

          {/* Solution Input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Solution</CardTitle>
              <CardDescription>
                Analyze the input and provide the correct output
              </CardDescription>
              <a
                href={`/puzzleData/${puzzle.real_input}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="link" className="mt-2 hover:underline justify-start px-0 ">
                  <FileDown />View Your Puzzle Input
                </Button>
              </a>
            </CardHeader>
            <CardContent>
              {isSolved ? (
                <div className="space-y-4">
                  <div className="text-center p-6 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-1">
                      Puzzle Solved!
                    </h3>
                    <p className="text-green-600 dark:text-green-400 text-sm">
                      Great job on solving this puzzle!
                    </p>
                  </div>
                  <Button
                    onClick={handleNextPuzzle}
                    className="w-full"
                    size="lg"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Next Puzzle
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="answer" className="mb-2">
                      Your Answer
                    </Label>
                    <Input
                      id="answer"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Enter your answer..."
                      disabled={submitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting || !answer.trim()}
                    className="w-full"
                    size="lg"
                  >
                    {submitting
                      ? "Submitting..."
                      : session
                      ? "Submit Answer"
                      : "Sign in to Submit"}
                  </Button>

                  {!showHint && puzzle.hint && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowHint(true)}
                      className="w-full"
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Show Hint
                    </Button>
                  )}
                </form>
              )}
              {showHint && puzzle.hint && !isSolved && (
                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-yellow-600" />
                    <strong className="text-yellow-800 dark:text-yellow-200">
                      Hint
                    </strong>
                  </div>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    {puzzle.hint}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

