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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Editor from "@monaco-editor/react";
import confetti from "canvas-confetti";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Code,
  Play,
  Send,
  Trophy,
  User,
} from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  functionName?: string;
  testCases: Array<{ input: string; expectedOutput: string }>;
  starterCode: Record<string, string>;
}

interface TestResult {
  passed: boolean;
  output?: string;
  error?: string;
  expected: string;
  status?: string;
  time?: string;
  memory?: number;
}

interface SubmissionResult {
  status:
    | "accepted"
    | "wrong_answer"
    | "time_limit_exceeded"
    | "runtime_error"
    | "compile_error";
  results: TestResult[];
  runtime?: number;
  memory?: number;
}

// localStorage keys
const STORAGE_KEYS = {
  LANGUAGE: "learn-to-scode-language",
  CODE_PREFIX: "learn-to-scode-code-",
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

// Get Monaco language mapping
function getMonacoLanguage(language: string): string {
  const languageMap: Record<string, string> = {
    javascript: "javascript",
    python: "python",
    java: "java",
    cpp: "cpp",
    c: "c",
    typescript: "typescript",
  };
  return languageMap[language] || "javascript";
}

// Celebration function
function triggerCelebration() {
  // Burst of confetti from multiple angles
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    startVelocity: 30,
    spread: 360,
    particleCount: Math.floor(count / 2),
  };

  // Left side
  confetti({
    ...defaults,
    angle: 60,
    origin: { x: 0.1, y: 0.7 },
  });

  // Right side
  confetti({
    ...defaults,
    angle: 120,
    origin: { x: 0.9, y: 0.7 },
  });

  // Center burst
  confetti({
    ...defaults,
    angle: 90,
    origin: { x: 0.5, y: 0.7 },
    spread: 180,
  });
}

interface ProblemPageClientProps {
  session: Session | null;
}

export function ProblemPageClient({ session }: ProblemPageClientProps) {
  const params = useParams();
  const router = useRouter();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSolved, setIsSolved] = useState(false);
  const [checkingSolvedStatus, setCheckingSolvedStatus] = useState(true);

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    fetchProblem();
  }, [params.id]);

  useEffect(() => {
    if (session && params.id) {
      checkSolvedStatus();
    } else {
      setCheckingSolvedStatus(false);
    }
  }, [session, params.id]);

  useEffect(() => {
    if (problem && selectedLanguage) {
      // Load saved code for this problem and language, or use starter code
      const codeKey = `${STORAGE_KEYS.CODE_PREFIX}${problem.id}-${selectedLanguage}`;
      const savedCode = localStorage.getItem(codeKey);

      if (savedCode) {
        setCode(savedCode);
      } else if (problem.starterCode[selectedLanguage]) {
        setCode(problem.starterCode[selectedLanguage]);
      }
    }
  }, [problem, selectedLanguage]);

  // Save code to localStorage whenever it changes
  useEffect(() => {
    if (problem && selectedLanguage && code) {
      const codeKey = `${STORAGE_KEYS.CODE_PREFIX}${problem.id}-${selectedLanguage}`;
      localStorage.setItem(codeKey, code);
    }
  }, [problem, selectedLanguage, code]);

  const fetchProblem = async () => {
    try {
      const response = await fetch(`/api/problems/${params.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch problem");
      }
      const data = await response.json();
      setProblem(data);

      // Set default language if none selected
      if (!selectedLanguage && data.starterCode) {
        const availableLanguages = Object.keys(data.starterCode);
        if (availableLanguages.length > 0) {
          setSelectedLanguage(availableLanguages[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching problem:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkSolvedStatus = async () => {
    try {
      const response = await fetch(`/api/problems/${params.id}/status`);
      if (response.ok) {
        const data = await response.json();
        setIsSolved(data.solved);
      }
    } catch (error) {
      console.error("Error checking solved status:", error);
    } finally {
      setCheckingSolvedStatus(false);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, newLanguage);
  };

  const goToNextProblem = async () => {
    try {
      const response = await fetch(`/api/problems/next?current=${params.id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.nextProblem) {
          router.push(`/problems/${data.nextProblem.id}`);
        } else {
          // No more problems, go back to problems list
          router.push("/problems");
        }
      }
    } catch (error) {
      console.error("Error finding next problem:", error);
      router.push("/problems");
    }
  };

  const runCode = async () => {
    if (!problem || !selectedLanguage || !code.trim()) return;

    setIsRunning(true);
    setSubmissionResult(null);

    try {
      const response = await fetch("/api/problems/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language: selectedLanguage,
          testCases: problem.testCases,
          functionName: problem.functionName,
        }),
      });

      const result = await response.json();

      console.log("JUDGE0 RESULT", result);

      if (response.ok) {
        const allPassed = result.results.every((r: TestResult) => r.passed);
        setSubmissionResult({
          status: allPassed ? "accepted" : "wrong_answer",
          results: result.results,
          runtime: result.runtime,
          memory: result.memory,
        });
      } else {
        setSubmissionResult({
          status: "runtime_error",
          results: [],
        });
      }
    } catch (error) {
      console.error("Error running code:", error);
      setSubmissionResult({
        status: "runtime_error",
        results: [],
      });
    } finally {
      setIsRunning(false);
    }
  };

  const submitSolution = async () => {
    if (!problem || !selectedLanguage || !code.trim() || !session) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/problems/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: problem.id,
          code,
          language: selectedLanguage,
          testCases: problem.testCases,
          functionName: problem.functionName,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionResult(result);

        // If this is the first time solving the problem, celebrate!
        if (result.status === "accepted" && !isSolved) {
          setIsSolved(true);
          setTimeout(() => {
            triggerCelebration();
          }, 500); // Delay celebration slightly for better UX
        }
      }
    } catch (error) {
      console.error("Error submitting solution:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || checkingSolvedStatus) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-2/3 mb-8"></div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="h-96 bg-muted rounded"></div>
              <div className="h-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Problem not found</h1>
          <Button onClick={() => router.push("/problems")}>
            Back to Problems
          </Button>
        </div>
      </div>
    );
  }

  const availableLanguages = Object.keys(problem.starterCode);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {isSolved && <CheckCircle className="h-8 w-8 text-green-500" />}
              {problem.title}
            </h1>
          </div>

          {problem.tags && (
            <div className="flex flex-wrap gap-2 mb-4">
              {problem.tags.map((tag) => (
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
              <CardTitle>Problem Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div dangerouslySetInnerHTML={{ __html: problem.description }} />

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">Examples:</h4>
                {problem.testCases.slice(0, 2).map((testCase, index) => (
                  <div key={index} className="mb-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">
                          Input:
                        </span>
                        <code className="block mt-1 p-2 bg-muted rounded text-sm">
                          {testCase.input}
                        </code>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">
                          Output:
                        </span>
                        <code className="block mt-1 p-2 bg-muted rounded text-sm">
                          {testCase.expectedOutput}
                        </code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {isSolved && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-4 w-4 text-green-600" />
                    <strong className="text-green-800 dark:text-green-200">
                      Problem Solved!
                    </strong>
                  </div>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Congratulations! You've successfully solved this problem.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Code Editor */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Code Editor</CardTitle>
                <Select
                  value={selectedLanguage}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLanguages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4" />
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>
                Write your solution in {selectedLanguage}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border rounded-md overflow-hidden">
                <Editor
                  height="400px"
                  language={getMonacoLanguage(selectedLanguage)}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollbar: {
                      vertical: "auto",
                      horizontal: "auto",
                    },
                    automaticLayout: true,
                  }}
                  theme="vs-dark"
                />
              </div>

              <div className="p-4 space-y-4">
                {isSolved ? (
                  // Show Next Problem button for solved problems
                  <div className="flex gap-3">
                    <Button onClick={goToNextProblem} className="flex-1">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Next Problem
                    </Button>
                  </div>
                ) : (
                  // Show Run/Submit buttons for unsolved problems
                  <div className="flex gap-3">
                    <Button
                      onClick={runCode}
                      disabled={isRunning || !code.trim()}
                      className="flex-1"
                      variant="outline"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {isRunning ? "Running..." : "Run Code"}
                    </Button>

                    {session ? (
                      <Button
                        onClick={submitSolution}
                        disabled={isSubmitting || !code.trim()}
                        className="flex-1"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        {isSubmitting ? "Submitting..." : "Submit Solution"}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => signIn("github")}
                        className="flex-1"
                        variant="outline"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Sign in to Submit
                      </Button>
                    )}
                  </div>
                )}

                {submissionResult && (
                  <div
                    className={`mt-4 p-4 rounded-lg border ${
                      submissionResult.status === "accepted"
                        ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                        : "bg-muted/50 border-border"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {submissionResult.status === "accepted" ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="font-semibold text-green-700 dark:text-green-300">
                            🎉 All Tests Passed!{" "}
                            {!isSolved && "Problem Solved!"}
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-5 w-5 text-red-500" />
                          <span className="font-semibold">
                            Some Tests Failed
                          </span>
                        </>
                      )}
                    </div>

                    <div className="space-y-2">
                      {submissionResult.results.map((result, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded border text-sm ${
                            result.passed
                              ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                              : "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">
                              Test Case {index + 1}
                            </span>
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                result.passed
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              }`}
                            >
                              {result.passed ? "Passed" : "Failed"}
                            </span>
                          </div>
                          {result.error && (
                            <div className="text-red-600 dark:text-red-400">
                              <strong>Error:</strong> {result.error}
                            </div>
                          )}
                          {!result.passed && result.output && (
                            <div>
                              <div>
                                <strong>Your Output:</strong> {result.output}
                              </div>
                              <div>
                                <strong>Expected:</strong> {result.expected}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {submissionResult.runtime !== undefined && (
                      <div className="mt-3 text-sm text-muted-foreground">
                        Runtime: {submissionResult.runtime}ms | Memory:{" "}
                        {submissionResult.memory || 0}KB
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
