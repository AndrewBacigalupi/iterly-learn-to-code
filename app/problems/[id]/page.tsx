"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Code,
  Play,
  XCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  testCases: Array<{ input: string; expectedOutput: string }>;
  starterCode: Record<string, string>;
}

interface TestResult {
  passed: boolean;
  output?: string;
  error?: string;
  expected: string;
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

export default function ProblemPage() {
  const params = useParams();
  const { data: session } = useSession();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblem();
  }, [params.id]);

  useEffect(() => {
    if (problem && selectedLanguage && problem.starterCode[selectedLanguage]) {
      setCode(problem.starterCode[selectedLanguage]);
    }
  }, [problem, selectedLanguage]);

  const fetchProblem = async () => {
    try {
      const response = await fetch(`/api/problems/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setProblem(data);
        const languages = Object.keys(data.starterCode);
        if (languages.length > 0) {
          setSelectedLanguage(languages[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching problem:", error);
    } finally {
      setLoading(false);
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
        }),
      });

      const result = await response.json();

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
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionResult(result);
      }
    } catch (error) {
      console.error("Error submitting solution:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
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
          <h1 className="text-2xl font-bold mb-4">Problem Not Found</h1>
          <p className="text-muted-foreground">
            The problem you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const languages = Object.keys(problem.starterCode);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{problem.title}</CardTitle>
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
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Test Cases</h3>
                  <div className="space-y-3">
                    {problem.testCases.map((testCase, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="grid grid-cols-1 gap-2">
                          <div>
                            <span className="text-sm font-medium">Input:</span>
                            <code className="block mt-1 p-2 bg-muted rounded text-sm">
                              {testCase.input}
                            </code>
                          </div>
                          <div>
                            <span className="text-sm font-medium">
                              Expected Output:
                            </span>
                            <code className="block mt-1 p-2 bg-muted rounded text-sm">
                              {testCase.expectedOutput}
                            </code>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Editor */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Code Editor
                </CardTitle>
                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Write your solution here..."
                  className="font-mono text-sm min-h-[300px] resize-none"
                />

                <div className="flex gap-2">
                  <Button
                    onClick={runCode}
                    disabled={isRunning || !code.trim()}
                    className="flex-1"
                    variant="outline"
                  >
                    {isRunning ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Run Code
                      </>
                    )}
                  </Button>

                  {session && (
                    <Button
                      onClick={submitSolution}
                      disabled={isSubmitting || !code.trim()}
                      className="flex-1"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Submit
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {!session && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Sign in to submit your solution and track your progress.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        {submissionResult && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {submissionResult.status === "accepted" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                {submissionResult.status === "accepted"
                  ? "Accepted!"
                  : "Failed"}
              </CardTitle>
              {submissionResult.runtime && submissionResult.memory && (
                <CardDescription>
                  Runtime: {submissionResult.runtime}ms | Memory:{" "}
                  {submissionResult.memory}KB
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="results">
                <TabsList>
                  <TabsTrigger value="results">Test Results</TabsTrigger>
                </TabsList>
                <TabsContent value="results" className="space-y-2">
                  {submissionResult.results.map((result, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-3 ${
                        result.passed
                          ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                          : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {result.passed ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">
                          Test Case {index + 1}
                        </span>
                      </div>

                      {result.error && (
                        <div>
                          <span className="text-sm font-medium">Error:</span>
                          <code className="block mt-1 p-2 bg-muted rounded text-sm text-red-600">
                            {result.error}
                          </code>
                        </div>
                      )}

                      {result.output && (
                        <div>
                          <span className="text-sm font-medium">
                            Your Output:
                          </span>
                          <code className="block mt-1 p-2 bg-muted rounded text-sm">
                            {result.output}
                          </code>
                        </div>
                      )}

                      <div>
                        <span className="text-sm font-medium">Expected:</span>
                        <code className="block mt-1 p-2 bg-muted rounded text-sm">
                          {result.expected}
                        </code>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
