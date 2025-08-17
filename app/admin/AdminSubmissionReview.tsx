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

interface AdminSubmissionReviewProps {
  pendingSubmissions: PuzzleSubmission[];
  approvedSubmissions: PuzzleSubmission[];
  rejectedSubmissions: PuzzleSubmission[];
}

type SelectedSubmission = (PuzzleSubmission) & {
  type: "puzzle";
};

export default function AdminSubmissionReview({
  pendingSubmissions,
  approvedSubmissions,
  rejectedSubmissions,
}: AdminSubmissionReviewProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<SelectedSubmission | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleReview = async (
    submissionId: string,
    action: "approve" | "reject",
    type: "puzzle"
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
        toast("Submission approved! Status updated.");
      } else {
        toast("Submission rejected. Feedback sent to submitter.");
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

  const openReviewDialog = (submission: PuzzleSubmission, type: "puzzle") => {
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
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            Pending ({pendingSubmissions.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedSubmissions.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedSubmissions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          {pendingSubmissions.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  No pending puzzle submissions
                </p>
              </CardContent>
            </Card>
          ) : (
            pendingSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {submission.title}
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
                              <p className="mt-1 whitespace-pre-wrap">{submission.description}</p>
                            </div>
                            <div>
                              <strong className="mr-1">Difficulty:</strong>
                              <Badge className={getDifficultyColor(submission.difficulty)}>
                                {submission.difficulty}
                              </Badge>
                            </div>
                            <div>
                              <strong>Input Data:</strong>
                              <pre className="block mt-1 p-2 bg-muted rounded text-sm overflow-x-auto">
                                {submission.real_input}
                              </pre>
                            </div>
                            <div>
                              <strong>Answer:</strong>
                              <code className="block mt-1 p-2 bg-muted rounded text-sm">
                                {submission.answer}
                              </code>
                            </div>
                            {submission.hint && (
                              <div>
                                <strong>Hint:</strong>
                                <p className="mt-1 whitespace-pre-wrap">{submission.hint}</p>
                              </div>
                            )}
                            {submission.explanation && (
                              <div>
                                <strong>Explanation:</strong>
                                <p className="mt-1 whitespace-pre-wrap">{submission.explanation}</p>
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
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {submission.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(submission.difficulty)}>
                      {submission.difficulty}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-6">
          {approvedSubmissions.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  No approved puzzle submissions
                </p>
              </CardContent>
            </Card>
          ) : (
            approvedSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {submission.title}
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Approved
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Submitted on{" "}
                        {new Date(submission.submittedAt).toLocaleDateString()}
                        {submission.reviewedAt && (
                          <> • Reviewed on {new Date(submission.reviewedAt).toLocaleDateString()}</>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{submission.title}</DialogTitle>
                            <DialogDescription>
                              Approved Puzzle Submission
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <strong>Description:</strong>
                              <p className="mt-1 whitespace-pre-wrap">{submission.description}</p>
                            </div>
                            <div>
                              <strong>Difficulty:</strong>
                              <Badge className={getDifficultyColor(submission.difficulty)}>
                                {submission.difficulty}
                              </Badge>
                            </div>
                            <div>
                              <strong>Input Data:</strong>
                              <pre className="block mt-1 p-2 bg-muted rounded text-sm overflow-x-auto">
                                {submission.real_input}
                              </pre>
                            </div>
                            <div>
                              <strong>Answer:</strong>
                              <code className="block mt-1 p-2 bg-muted rounded text-sm">
                                {submission.answer}
                              </code>
                            </div>
                            {submission.hint && (
                              <div>
                                <strong>Hint:</strong>
                                <p className="mt-1 whitespace-pre-wrap">{submission.hint}</p>
                              </div>
                            )}
                            {submission.explanation && (
                              <div>
                                <strong>Explanation:</strong>
                                <p className="mt-1 whitespace-pre-wrap">{submission.explanation}</p>
                              </div>
                            )}
                            {submission.adminNotes && (
                              <div>
                                <strong>Admin Notes:</strong>
                                <p className="mt-1 whitespace-pre-wrap">{submission.adminNotes}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {submission.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(submission.difficulty)}>
                      {submission.difficulty}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-6">
          {rejectedSubmissions.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  No rejected puzzle submissions
                </p>
              </CardContent>
            </Card>
          ) : (
            rejectedSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {submission.title}
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                          Rejected
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Submitted on{" "}
                        {new Date(submission.submittedAt).toLocaleDateString()}
                        {submission.reviewedAt && (
                          <> • Reviewed on {new Date(submission.reviewedAt).toLocaleDateString()}</>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{submission.title}</DialogTitle>
                            <DialogDescription>
                              Rejected Puzzle Submission
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <strong>Description:</strong>
                              <p className="mt-1 whitespace-pre-wrap">{submission.description}</p>
                            </div>
                            <div className="flex gap-2">
                              <strong className="mr-1">Difficulty:</strong>
                              <div >
                                <Badge className={getDifficultyColor(submission.difficulty)}>
                                  {submission.difficulty}
                                </Badge>
                              </div>
                              
                            </div>
                            <div>
                              <strong>Input Data:</strong>
                              <pre className="block mt-1 p-2 bg-muted rounded text-sm overflow-x-auto">
                                {submission.real_input}
                              </pre>
                            </div>
                            <div>
                              <strong>Answer:</strong>
                              <code className="block mt-1 p-2 bg-muted rounded text-sm">
                                {submission.answer}
                              </code>
                            </div>
                            {submission.hint && (
                              <div>
                                <strong>Hint:</strong>
                                <p className="mt-1 whitespace-pre-wrap">{submission.hint}</p>
                              </div>
                            )}
                            {submission.explanation && (
                              <div>
                                <strong>Explanation:</strong>
                                <p className="mt-1 whitespace-pre-wrap">{submission.explanation}</p>
                              </div>
                            )}
                            {submission.adminNotes && (
                              <div>
                                <strong>Admin Notes:</strong>
                                <p className="mt-1 whitespace-pre-wrap">{submission.adminNotes}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {submission.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(submission.difficulty)}>
                      {submission.difficulty}
                    </Badge>
                  </div>
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
              Review Puzzle Submission
            </DialogTitle>
            <DialogDescription>
              {selectedSubmission?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded p-3 mb-6">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> This will only change the submission status. Approved submissions can be manually added to the puzzle library later if desired.
              </p>
            </div>
            <div>
              <div className="mb-3">
                <Label htmlFor="adminNotes">Admin Notes (optional)</Label>
              </div>
              
              <Textarea
                id="adminNotes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add notes for the submitter (required for rejections, optional for approvals)..."
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
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
