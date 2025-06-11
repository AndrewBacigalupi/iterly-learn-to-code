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
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const [submitting, setSubmitting] = useState(false);
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
      router.push("/contribute");
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
          <h1 className="text-3xl font-bold mb-2">Submit a Puzzle</h1>
          <p className="text-muted-foreground">
            Create an Advent of Code-style puzzle for the community. Your
            submission will be reviewed by our team.
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
                  placeholder="math, arrays, strings (comma-separated)"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Add relevant tags separated by commas
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
                  placeholder="1,2,3,4,5,6"
                  rows={3}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The input data that users will analyze
                </p>
              </div>

              <div>
                <Label htmlFor="expectedOutput" className="mb-2 block">
                  Expected Output *
                </Label>
                <Input
                  id="expectedOutput"
                  value={form.expectedOutput}
                  onChange={(e) => updateForm("expectedOutput", e.target.value)}
                  placeholder="12"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The correct answer for the given input
                </p>
              </div>

              <div>
                <Label htmlFor="hint" className="mb-2 block">
                  Hint
                </Label>
                <Textarea
                  id="hint"
                  value={form.hint}
                  onChange={(e) => updateForm("hint", e.target.value)}
                  placeholder="Try to identify which numbers are even..."
                  rows={2}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Optional hint to help users who are stuck
                </p>
              </div>

              <div>
                <Label htmlFor="explanation" className="mb-2 block">
                  Explanation
                </Label>
                <Textarea
                  id="explanation"
                  value={form.explanation}
                  onChange={(e) => updateForm("explanation", e.target.value)}
                  placeholder="The even numbers in the input are 2, 4, and 6. Their sum is 2 + 4 + 6 = 12."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Explanation shown to users after they solve the puzzle
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
                    Submit Puzzle for Review
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
