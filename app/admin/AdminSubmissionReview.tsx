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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Check, Eye, MessageSquare, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import type { PuzzleSubmission } from "@/lib/db/schema";

interface ProblemSubmission {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  tags: string[] | null;
  functionName: string | null;
  testCases: any; // JSONB field from database
  solution: string | null;
  submittedAt: Date;
  status: string;
}

interface AdminSubmissionReviewProps {
  puzzleSubmissions: PuzzleSubmission[];
  problemSubmissions: ProblemSubmission[];
}

type SelectedSubmission = (PuzzleSubmission | ProblemSubmission) & {
  type: "puzzle" | "problem";
};

export default function AdminSubmissionReview({
  puzzleSubmissions,
  problemSubmissions,
}: AdminSubmissionReviewProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<SelectedSubmission | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleReview = async (
    submissionId: string,
    action: "approve" | "reject",
    type: "puzzle" | "problem"
  ) => {
    setProcessing(true);

    try {
      const response = await fetch(`/api/admin/review/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submissionId,
          action,
          adminNotes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to review submission");
      }

      const result = await response.json();

      if (action === "approve") {
        toast("Submission approved and published!");
      } else {
        toast("Submission rejected with feedback.");
      }

      // Reload the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error("Error reviewing submission:", error);
      toast("Failed to review submission");
    } finally {
      setProcessing(false);
      setReviewDialogOpen(false);
      setAdminNotes("");
    }
  };

  const openReviewDialog = (submission: PuzzleSubmission | ProblemSubmission, type: "puzzle" | "problem") => {
    setSelectedSubmission({ ...submission, type });
    setReviewDialogOpen(true);
    setAdminNotes("");
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

  return (
    <div>
      <Tabs defaultValue="puzzles" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="puzzles">
            Puzzle Submissions ({puzzleSubmissions.length})
          </TabsTrigger>
          <TabsTrigger value="problems">
            Problem Submissions ({problemSubmissions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="puzzles" className="space-y-6">
          {puzzleSubmissions.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  No pending puzzle submissions
                </p>
              </CardContent>
            </Card>
          ) : (
            puzzleSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {submission.title}
                        <Badge
                          className={getDifficultyColor(submission.difficulty)}
                        >
                          {submission.difficulty}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Submitted on{" "}
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{submission.title}</DialogTitle>
                            <DialogDescription>
                              Puzzle Preview
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <strong>Description:</strong>
                              <p className="mt-1">{submission.description}</p>
                            </div>
                            <div>
                              <strong>Input:</strong>
                              <code className="block mt-1 p-2 bg-muted rounded text-sm">
                                {submission.example_input}
                              </code>
                            </div>
                            <div>
                              <strong>Expected Output:</strong>
                              <code className="block mt-1 p-2 bg-muted rounded text-sm">
                                {submission.answer}
                              </code>
                            </div>
                            {submission.hint && (
                              <div>
                                <strong>Hint:</strong>
                                <p className="mt-1">{submission.hint}</p>
                              </div>
                            )}
                            {submission.explanation && (
                              <div>
                                <strong>Explanation:</strong>
                                <p className="mt-1">{submission.explanation}</p>
                              </div>
                            )}
                            {submission.tags && submission.tags.length > 0 && (
                              <div>
                                <strong>Tags:</strong>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {submission.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openReviewDialog(submission, "puzzle")}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {submission.description}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="problems" className="space-y-6">
          {problemSubmissions.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  No pending problem submissions
                </p>
              </CardContent>
            </Card>
          ) : (
            problemSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {submission.title}
                        <Badge
                          className={getDifficultyColor(submission.difficulty)}
                        >
                          {submission.difficulty}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Submitted on{" "}
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{submission.title}</DialogTitle>
                            <DialogDescription>
                              Problem Preview
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <strong>Description:</strong>
                              <p className="mt-1 whitespace-pre-wrap">
                                {submission.description}
                              </p>
                            </div>
                            <div>
                              <strong>Function Name:</strong>
                              <code className="ml-2">
                                {submission.functionName || "Not specified"}
                              </code>
                            </div>
                            <div>
                              <strong>Test Cases:</strong>
                              <div className="space-y-2 mt-2">
                                {(
                                  submission.testCases as Array<{
                                    input: string;
                                    expectedOutput: string;
                                  }>
                                )?.map(
                                  (
                                    testCase: {
                                      input: string;
                                      expectedOutput: string;
                                    },
                                    index: number
                                  ) => (
                                    <div
                                      key={index}
                                      className="p-2 border rounded"
                                    >
                                      <div className="text-sm font-medium">
                                        Test Case {index + 1}
                                      </div>
                                      <div className="grid grid-cols-2 gap-2 mt-1">
                                        <div>
                                          <span className="text-xs text-muted-foreground">
                                            Input:
                                          </span>
                                          <code className="block text-xs p-1 bg-muted rounded">
                                            {testCase.input}
                                          </code>
                                        </div>
                                        <div>
                                          <span className="text-xs text-muted-foreground">
                                            Output:
                                          </span>
                                          <code className="block text-xs p-1 bg-muted rounded">
                                            {testCase.expectedOutput}
                                          </code>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                            {submission.solution && (
                              <div>
                                <strong>Solution:</strong>
                                <p className="mt-1 whitespace-pre-wrap">
                                  {submission.solution}
                                </p>
                              </div>
                            )}
                            {submission.tags && submission.tags.length > 0 && (
                              <div>
                                <strong>Tags:</strong>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {submission.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openReviewDialog(submission, "problem")}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {submission.description}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Review{" "}
              {selectedSubmission?.type === "puzzle" ? "Puzzle" : "Problem"}
            </DialogTitle>
            <DialogDescription>{selectedSubmission?.title}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="adminNotes">Admin Notes (optional)</Label>
              <Textarea
                id="adminNotes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add notes for the submitter..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setReviewDialogOpen(false)}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedSubmission?.id && selectedSubmission?.type) {
                  handleReview(
                    selectedSubmission.id,
                    "reject",
                    selectedSubmission.type
                  );
                }
              }}
              disabled={processing}
            >
              <X className="h-4 w-4 mr-1" />
              Reject
            </Button>
            <Button
              onClick={() => {
                if (selectedSubmission?.id && selectedSubmission?.type) {
                  handleReview(
                    selectedSubmission.id,
                    "approve",
                    selectedSubmission.type
                  );
                }
              }}
              disabled={processing}
            >
              <Check className="h-4 w-4 mr-1" />
              Approve & Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
