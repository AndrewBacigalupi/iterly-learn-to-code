import { auth } from "@/lib/auth";
import { dbExport } from "@/lib/db";
import { puzzleSubmissions, puzzles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    // TEMPORARY: Bypass admin check for testing
    // TODO: Re-enable admin check after testing
    // @ts-ignore - session.user may have isAdmin from database
    // if (!session?.user?.isAdmin || session.user.isAdmin !== true) {
    //   return NextResponse.json(
    //     { error: "Admin access required" },
    //     { status: 403 }
    //   );
    // }

    const { submissionId, action, adminNotes } = await request.json();

    if (!submissionId || !action) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the submission
    const submission = await dbExport
      .select()
      .from(puzzleSubmissions)
      .where(eq(puzzleSubmissions.id, submissionId))
      .limit(1);

    if (submission.length === 0) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    const puzzleSubmission = submission[0];

    if (action === "approve") {
      // Simply update submission status to approved - NO automatic puzzle creation
      await dbExport
        .update(puzzleSubmissions)
        .set({
          status: "approved",
          reviewedAt: new Date().toISOString(),
          reviewedBy: session?.user?.id || "IterlyReviewer",
          adminNotes: adminNotes || null,
        })
        .where(eq(puzzleSubmissions.id, submissionId));
    } else if (action === "reject") {
      // Update submission status to rejected
      await dbExport
        .update(puzzleSubmissions)
        .set({
          status: "rejected",
          reviewedAt: new Date().toISOString(),
          reviewedBy: session?.user?.id || "IterlyReviewer",
          adminNotes: adminNotes || null,
        })
        .where(eq(puzzleSubmissions.id, submissionId));
    }

    return NextResponse.json({
      message: `Puzzle submission ${action}d successfully`,
      status: action === "approve" ? "approved" : "rejected",
    });
  } catch (error) {
    console.error("Error reviewing puzzle submission:", error);
    return NextResponse.json(
      { error: "Failed to review submission" },
      { status: 500 }
    );
  }
}
