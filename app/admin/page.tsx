import { auth } from "@/lib/auth";
import { dbExport } from "@/lib/db";
import { puzzleSubmissions } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import AdminSubmissionReview from "./AdminSubmissionReview";


export default async function AdminPage() {
  const session = await auth();

  // TEMPORARY: Bypass admin check for testing
  // TODO: Re-enable admin check after testing
  // @ts-ignore - session.user may have isAdmin from database
  // if (!session?.user?.isAdmin || session.user.isAdmin !== true) {
  //   redirect("/");
  // }

  // Fetch all puzzle submissions grouped by status
  const allSubmissions = await dbExport
    .select()
    .from(puzzleSubmissions)
    .orderBy(desc(puzzleSubmissions.submittedAt));

  const pendingPuzzles = allSubmissions.filter(s => s.status === "pending");
  const approvedPuzzles = allSubmissions.filter(s => s.status === "approved");
  const rejectedPuzzles = allSubmissions.filter(s => s.status === "rejected");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Review and manage submitted puzzles
          </p>
        </div>





      
        <AdminSubmissionReview
          pendingSubmissions={pendingPuzzles}
          approvedSubmissions={approvedPuzzles}
          rejectedSubmissions={rejectedPuzzles}
        />
      </div>
    </div>
  );
}
