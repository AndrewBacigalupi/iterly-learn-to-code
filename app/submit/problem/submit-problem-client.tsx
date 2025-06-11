"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Send, Trash } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface ProblemSubmissionForm {
  title: string;
  description: string;
  difficulty: string;
  tags: string;
  functionName: string;
  testCases: TestCase[];
  solution: string;
}

interface SubmitProblemClientProps {
  session: Session | null;
}

export function SubmitProblemClient({ session }: SubmitProblemClientProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<ProblemSubmissionForm>({
    title: "",
    description: "",
    difficulty: "",
    tags: "",
    functionName: "",
    testCases: [{ input: "", expectedOutput: "" }],
    solution: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      toast("Please sign in to submit a problem");
      return;
    }

    if (
      !form.title ||
      !form.description ||
      !form.difficulty ||
      !form.functionName
    ) {
      toast("Please fill in all required fields");
      return;
    }

    if (form.testCases.some((tc) => !tc.input || !tc.expectedOutput)) {
      toast("Please complete all test cases");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/submit/problem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          tags: form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit problem");
      }

      toast("Problem submitted successfully! It will be reviewed by our team.");
      router.push("/contribute");
    } catch (error) {
      console.error("Error submitting problem:", error);
      toast("Failed to submit problem. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const updateForm = (
    field: keyof ProblemSubmissionForm,
    value: string | TestCase[]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addTestCase = () => {
    updateForm("testCases", [
      ...form.testCases,
      { input: "", expectedOutput: "" },
    ]);
  };

  const removeTestCase = (index: number) => {
    const newTestCases = form.testCases.filter((_, i) => i !== index);
    updateForm("testCases", newTestCases);
  };

  const updateTestCase = (
    index: number,
    field: keyof TestCase,
    value: string
  ) => {
    const newTestCases = form.testCases.map((testCase, i) =>
      i === index ? { ...testCase, [field]: value } : testCase
    );
    updateForm("testCases", newTestCases);
  };

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-muted-foreground mb-6">
            Please sign in to submit a problem for review.
          </p>
          <Button onClick={() => router.push("/contribute")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Contribute
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/contribute">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Contribute
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2">Submit a Problem</h1>
          <p className="text-muted-foreground">
            Create a LeetCode-style coding problem for the community. Your
            submission will be reviewed by our team.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Problem Details</CardTitle>
            <CardDescription>
              Fill in the details for your coding problem. All fields marked
              with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title" className="mb-2 block">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => updateForm("title", e.target.value)}
                  placeholder="e.g., Two Sum"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="mb-2 block">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => updateForm("description", e.target.value)}
                  placeholder="Describe the problem clearly. Include examples and constraints."
                  rows={6}
                  required
                />
              </div>

              <div>
                <Label htmlFor="difficulty" className="mb-2 block">
                  Difficulty *
                </Label>
                <Select
                  value={form.difficulty}
                  onValueChange={(value) => updateForm("difficulty", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags" className="mb-2 block">
                  Tags
                </Label>
                <Input
                  id="tags"
                  value={form.tags}
                  onChange={(e) => updateForm("tags", e.target.value)}
                  placeholder="arrays, hash-table, two-pointers (comma-separated)"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Add relevant algorithmic tags separated by commas
                </p>
              </div>

              <div>
                <Label htmlFor="functionName" className="mb-2 block">
                  Function Name *
                </Label>
                <Input
                  id="functionName"
                  value={form.functionName}
                  onChange={(e) => updateForm("functionName", e.target.value)}
                  placeholder="e.g., twoSum"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The name of the function users will implement
                </p>
              </div>

              <div>
                <Label className="mb-2 block">Test Cases *</Label>
                <div className="space-y-3 mt-2">
                  {form.testCases.map((testCase, index) => (
                    <div key={index} className="border rounded-lg p-4 relative">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium text-sm">
                          Test Case {index + 1}
                        </span>
                        {form.testCases.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeTestCase(index)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid gap-3">
                        <div>
                          <Label
                            htmlFor={`input-${index}`}
                            className="mb-2 block"
                          >
                            Input
                          </Label>
                          <Textarea
                            id={`input-${index}`}
                            value={testCase.input}
                            onChange={(e) =>
                              updateTestCase(index, "input", e.target.value)
                            }
                            placeholder='{"nums": [2,7,11,15], "target": 9}'
                            rows={2}
                            required
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`output-${index}`}
                            className="mb-2 block"
                          >
                            Expected Output
                          </Label>
                          <Input
                            id={`output-${index}`}
                            value={testCase.expectedOutput}
                            onChange={(e) =>
                              updateTestCase(
                                index,
                                "expectedOutput",
                                e.target.value
                              )
                            }
                            placeholder="[0,1]"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addTestCase}
                  className="mt-3"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Test Case
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Provide test cases in JSON format for the function parameters
                </p>
              </div>

              <div>
                <Label htmlFor="solution" className="mb-2 block">
                  Solution Explanation
                </Label>
                <Textarea
                  id="solution"
                  value={form.solution}
                  onChange={(e) => updateForm("solution", e.target.value)}
                  placeholder="Explain the approach and solution..."
                  rows={4}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Optional explanation of the solution approach
                </p>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full"
                size="lg"
              >
                {submitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Problem for Review
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
