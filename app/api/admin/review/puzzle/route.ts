import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { puzzleSubmissions, puzzles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    // Check if user is admin
    // @ts-ignore - session.user may have isAdmin from database
    if (!session?.user?.isAdmin || session.user.isAdmin !== true) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const { submissionId, action, adminNotes } = await request.json();

    if (!submissionId || !action) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the submission
    const submission = await db
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
      // Create the puzzle in the main puzzles table
      await db.insert(puzzles).values({
        title: puzzleSubmission.title,
        description: puzzleSubmission.description,
        difficulty: puzzleSubmission.difficulty,
        tags: puzzleSubmission.tags,
        input: puzzleSubmission.input,
        expectedOutput: puzzleSubmission.expectedOutput,
        hint: puzzleSubmission.hint,
        explanation: puzzleSubmission.explanation,
      });

      // Update submission status to approved
      await db
        .update(puzzleSubmissions)
        .set({
          status: "approved",
          reviewedAt: new Date(),
          reviewedBy: session.user.id,
          adminNotes: adminNotes || null,
        })
        .where(eq(puzzleSubmissions.id, submissionId));
    } else if (action === "reject") {
      // Update submission status to rejected
      await db
        .update(puzzleSubmissions)
        .set({
          status: "rejected",
          reviewedAt: new Date(),
          reviewedBy: session.user.id,
          adminNotes: adminNotes || null,
        })
        .where(eq(puzzleSubmissions.id, submissionId));
    }

    return NextResponse.json({
      message: `Puzzle ${action}d successfully`,
      published: action === "approve",
    });
  } catch (error) {
    console.error("Error reviewing puzzle submission:", error);
    return NextResponse.json(
      { error: "Failed to review submission" },
      { status: 500 }
    );
  }
}
