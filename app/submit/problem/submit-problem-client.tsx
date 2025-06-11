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
import { ArrowLeft, Plus, Send, Trash2 } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
  const searchParams = useSearchParams();
  const resubmitId = searchParams.get("resubmit");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ProblemSubmissionForm>({
    title: "",
    description: "",
    difficulty: "",
    tags: "",
    functionName: "",
    testCases: [{ input: "", expectedOutput: "" }],
    solution: "",
  });

  // Load existing submission data if resubmitting
  useEffect(() => {
    if (resubmitId && session) {
      setLoading(true);
      fetch(`/api/submit/problem/${resubmitId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const submission = data.submission;
            setForm({
              title: submission.title,
              description: submission.description,
              difficulty: submission.difficulty,
              tags: submission.tags?.join(", ") || "",
              functionName: submission.functionName || "",
              testCases: submission.testCases || [
                { input: "", expectedOutput: "" },
              ],
              solution: submission.solution || "",
            });
          }
        })
        .catch((error) => {
          console.error("Error loading submission:", error);
          toast("Failed to load submission data");
        })
        .finally(() => setLoading(false));
    }
  }, [resubmitId, session]);

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

    // Validate test cases
    const validTestCases = form.testCases.filter(
      (tc) => tc.input.trim() && tc.expectedOutput.trim()
    );

    if (validTestCases.length === 0) {
      toast("Please add at least one test case");
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
          testCases: validTestCases,
          resubmitId: resubmitId || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit problem");
      }

      toast("Problem submitted successfully! It will be reviewed by our team.");
      router.push("/profile");
    } catch (error) {
      console.error("Error submitting problem:", error);
      toast("Failed to submit problem. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const updateForm = (field: keyof ProblemSubmissionForm, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addTestCase = () => {
    setForm((prev) => ({
      ...prev,
      testCases: [...prev.testCases, { input: "", expectedOutput: "" }],
    }));
  };

  const removeTestCase = (index: number) => {
    if (form.testCases.length > 1) {
      setForm((prev) => ({
        ...prev,
        testCases: prev.testCases.filter((_, i) => i !== index),
      }));
    }
  };

  const updateTestCase = (
    index: number,
    field: keyof TestCase,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      testCases: prev.testCases.map((tc, i) =>
        i === index ? { ...tc, [field]: value } : tc
      ),
    }));
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <p>Loading submission data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/profile">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2">
            {resubmitId ? "Resubmit Problem" : "Submit a Problem"}
          </h1>
          <p className="text-muted-foreground">
            {resubmitId
              ? "Update your problem based on the admin feedback and resubmit for review."
              : "Create a LeetCode-style problem for the community. Your submission will be reviewed by our team."}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Problem Details</CardTitle>
            <CardDescription>
              Fill in the details for your problem. All fields marked with * are
              required.
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
                  placeholder="Describe the problem clearly. What should the function do?"
                  rows={4}
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
                  placeholder="e.g., arrays, hash-table, two-pointers (comma-separated)"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Optional. Separate multiple tags with commas.
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
                <p className="text-sm text-muted-foreground mt-1">
                  The name of the main function users will implement.
                </p>
              </div>

              <div>
                <Label className="mb-2 block">Test Cases *</Label>
                <div className="space-y-4">
                  {form.testCases.map((testCase, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Test Case {index + 1}</h4>
                        {form.testCases.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTestCase(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
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
                            placeholder="[2,7,11,15], 9"
                            rows={2}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`output-${index}`}
                            className="mb-2 block"
                          >
                            Expected Output
                          </Label>
                          <Textarea
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
                            rows={2}
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
              </div>

              <div>
                <Label htmlFor="solution" className="mb-2 block">
                  Solution Explanation
                </Label>
                <Textarea
                  id="solution"
                  value={form.solution}
                  onChange={(e) => updateForm("solution", e.target.value)}
                  placeholder="Optional explanation of the solution approach and algorithm"
                  rows={4}
                />
              </div>

              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    {resubmitId ? "Resubmit Problem" : "Submit Problem"}
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
