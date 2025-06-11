import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { problemSubmissions_contrib, puzzleSubmissions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import AdminSubmissionReview from "./AdminSubmissionReview";

export default async function AdminPage() {
  const session = await auth();

  // Check if user is admin
  // @ts-ignore - session.user may have isAdmin from database
  if (!session?.user?.isAdmin || session.user.isAdmin !== true) {
    redirect("/");
  }

  // Fetch pending puzzle submissions
  const pendingPuzzles = await db
    .select()
    .from(puzzleSubmissions)
    .where(eq(puzzleSubmissions.status, "pending"))
    .orderBy(puzzleSubmissions.submittedAt);

  // Fetch pending problem submissions
  const pendingProblems = await db
    .select()
    .from(problemSubmissions_contrib)
    .where(eq(problemSubmissions_contrib.status, "pending"))
    .orderBy(problemSubmissions_contrib.submittedAt);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Review and manage submitted puzzles and problems.
          </p>
        </div>

        <AdminSubmissionReview
          puzzleSubmissions={pendingPuzzles}
          problemSubmissions={pendingProblems}
        />
      </div>
    </div>
  );
}
