import { auth } from "@/lib/auth";
import { dbExport } from "@/lib/db";
import { problemSubmissionsContrib, puzzleSubmissions } from "@/lib/db/schema";
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
  const pendingPuzzles = (await dbExport
    .select()
    .from(puzzleSubmissions)
    .where(eq(puzzleSubmissions.status, "pending"))
    .orderBy(puzzleSubmissions.submittedAt)).map(puzzle => ({
      ...puzzle,
      submittedAt: new Date(puzzle.submittedAt),
      reviewedAt: puzzle.reviewedAt ? new Date(puzzle.reviewedAt) : null
    }));

  // Fetch pending problem submissions
  const pendingProblems = (await dbExport
    .select()
    .from(problemSubmissionsContrib)
    .where(eq(problemSubmissionsContrib.status, "pending"))
    .orderBy(problemSubmissionsContrib.submittedAt)).map(problem => ({
      ...problem,
      submittedAt: new Date(problem.submittedAt),
      reviewedAt: problem.reviewedAt ? new Date(problem.reviewedAt) : null
    }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Review and manage submitted puzzles and problems.
          </p>
        </div>

        {/* <AdminSubmissionReview
          // puzzleSubmissions={pendingPuzzles}
          // problemSubmissions={pendingProblems}
        /> */}
      </div>
    </div>
  );
}
