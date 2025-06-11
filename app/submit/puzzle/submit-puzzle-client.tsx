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
import { ArrowLeft, Send } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PuzzleSubmissionForm {
  title: string;
  description: string;
  difficulty: string;
  tags: string;
  input: string;
  expectedOutput: string;
  hint: string;
  explanation: string;
}

interface SubmitPuzzleClientProps {
  session: Session | null;
}

export function SubmitPuzzleClient({ session }: SubmitPuzzleClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resubmitId = searchParams.get("resubmit");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<PuzzleSubmissionForm>({
    title: "",
    description: "",
    difficulty: "",
    tags: "",
    input: "",
    expectedOutput: "",
    hint: "",
    explanation: "",
  });

  // Load existing submission data if resubmitting
  useEffect(() => {
    if (resubmitId && session) {
      setLoading(true);
      fetch(`/api/submit/puzzle/${resubmitId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const submission = data.submission;
            setForm({
              title: submission.title,
              description: submission.description,
              difficulty: submission.difficulty,
              tags: submission.tags?.join(", ") || "",
              input: submission.input,
              expectedOutput: submission.expectedOutput,
              hint: submission.hint || "",
              explanation: submission.explanation || "",
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
      toast("Please sign in to submit a puzzle");
      return;
    }

    if (
      !form.title ||
      !form.description ||
      !form.difficulty ||
      !form.input ||
      !form.expectedOutput
    ) {
      toast("Please fill in all required fields");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/submit/puzzle", {
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
        throw new Error("Failed to submit puzzle");
      }

      toast("Puzzle submitted successfully! It will be reviewed by our team.");
      router.push("/profile");
    } catch (error) {
      console.error("Error submitting puzzle:", error);
      toast("Failed to submit puzzle. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const updateForm = (field: keyof PuzzleSubmissionForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-muted-foreground mb-6">
            Please sign in to submit a puzzle for review.
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
            {resubmitId ? "Resubmit Puzzle" : "Submit a Puzzle"}
          </h1>
          <p className="text-muted-foreground">
            {resubmitId
              ? "Update your puzzle based on the admin feedback and resubmit for review."
              : "Create an Advent of Code-style puzzle for the community. Your submission will be reviewed by our team."}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Puzzle Details</CardTitle>
            <CardDescription>
              Fill in the details for your puzzle. All fields marked with * are
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
                  placeholder="e.g., Sum of Even Numbers"
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
                  placeholder="Describe the problem clearly. What should the user do with the input?"
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
                  placeholder="e.g., arrays, math, strings (comma-separated)"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Optional. Separate multiple tags with commas.
                </p>
              </div>

              <div>
                <Label htmlFor="input" className="mb-2 block">
                  Input Data *
                </Label>
                <Textarea
                  id="input"
                  value={form.input}
                  onChange={(e) => updateForm("input", e.target.value)}
                  placeholder="The input data that users will work with"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="expectedOutput" className="mb-2 block">
                  Expected Output *
                </Label>
                <Textarea
                  id="expectedOutput"
                  value={form.expectedOutput}
                  onChange={(e) => updateForm("expectedOutput", e.target.value)}
                  placeholder="The correct answer/output for the given input"
                  rows={2}
                  required
                />
              </div>

              <div>
                <Label htmlFor="hint" className="mb-2 block">
                  Hint
                </Label>
                <Textarea
                  id="hint"
                  value={form.hint}
                  onChange={(e) => updateForm("hint", e.target.value)}
                  placeholder="Optional hint to help users solve the puzzle"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="explanation" className="mb-2 block">
                  Explanation
                </Label>
                <Textarea
                  id="explanation"
                  value={form.explanation}
                  onChange={(e) => updateForm("explanation", e.target.value)}
                  placeholder="Optional explanation of the solution approach"
                  rows={3}
                />
              </div>

              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    {resubmitId ? "Resubmit Puzzle" : "Submit Puzzle"}
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
