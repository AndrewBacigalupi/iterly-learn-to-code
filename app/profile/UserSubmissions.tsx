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
  AlertCircle,
  CheckCircle,
  Clock,
  ExternalLink,
  FileText,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import type { PuzzleSubmission } from "@/lib/db/schema";

interface UserSubmissionsProps {
  initialSubmissions: PuzzleSubmission[];
}

function getStatusColor(status: string) {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
}

export default function UserSubmissions({ initialSubmissions }: UserSubmissionsProps) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (submissionId: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    
    setDeletingId(submissionId);
    try {
      const res = await fetch(`/api/submit/puzzle/${submissionId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete submission");
      
      toast("Submission deleted successfully");
      setSubmissions(prev => prev.filter(s => s.id !== submissionId));
    } catch (error) {
      console.error(error);
      toast.error("Error deleting submission");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          Your Submissions
        </CardTitle>
        <CardDescription>
          Puzzles you've contributed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button asChild size="sm" variant="outline">
              <Link href="/submit/puzzle">
                <Plus className="h-3 w-3 mr-1" />
                Submit Puzzle
              </Link>
            </Button>
          </div>

          {/* Puzzle Submissions */}
          {submissions.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                Puzzle Submissions ({submissions.length})
              </h3>
              <div className="space-y-3">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{submission.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {submission.description.substring(0, 100)}...
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getStatusColor(submission.status)}>
                            {submission.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-sm text-muted-foreground">
                        <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
                        {(submission.status === "pending" || submission.status === "rejected") && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(submission.id)}
                            disabled={deletingId === submission.id}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            {deletingId === submission.id ? "Deleting..." : "Delete"}
                          </Button>
                        )}
                      </div>
                    </div>

                    {submission.status === "approved" && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                          <CheckCircle className="h-4 w-4" />
                          <span>Submission approved!</span>
                        </div>
                        {submission.adminNotes && (
                          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded p-3">
                            <p className="text-sm text-green-800 dark:text-green-200">
                              <strong>Admin notes:</strong> {submission.adminNotes}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {submission.status === "rejected" && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                          <AlertCircle className="h-4 w-4" />
                          <span>Submission rejected</span>
                        </div>
                        {submission.adminNotes && (
                          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded p-3">
                            <p className="text-sm text-red-800 dark:text-red-200">
                              <strong>Admin feedback:</strong> {submission.adminNotes}
                            </p>
                          </div>
                        )}
                        <Button asChild size="sm" variant="outline">
                          <Link
                            href={`/submit/puzzle?resubmit=${submission.id}`}
                            className="flex items-center gap-1"
                          >
                            <RefreshCw className="h-3 w-3" />
                            Resubmit
                          </Link>
                        </Button>
                      </div>
                    )}

                    {submission.status === "pending" && (
                      <div className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400">
                        <Clock className="h-4 w-4" />
                        <span>Under review</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No submissions message */}
          {submissions.length === 0 && (
            <div className="text-center py-4">
              <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-medium mb-1 text-sm">
                No submissions yet
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Contribute to the community!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}