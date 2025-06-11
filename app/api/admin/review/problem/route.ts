import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { problemSubmissions_contrib, problems } from "@/lib/db/schema";
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
      .from(problemSubmissions_contrib)
      .where(eq(problemSubmissions_contrib.id, submissionId))
      .limit(1);

    if (submission.length === 0) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    const problemSubmission = submission[0];

    if (action === "approve") {
      // Create basic starter code for multiple languages (admin can edit later)
      const basicStarterCode = {
        javascript: `function ${problemSubmission.functionName}() {\n    // Your code here\n}`,
        python: `def ${problemSubmission.functionName}():\n    # Your code here\n    pass`,
        java: `class Solution {\n    public returnType ${problemSubmission.functionName}() {\n        // Your code here\n    }\n}`,
        cpp: `class Solution {\npublic:\n    returnType ${problemSubmission.functionName}() {\n        // Your code here\n    }\n};`,
      };

      // Create the problem in the main problems table
      await db.insert(problems).values({
        title: problemSubmission.title,
        description: problemSubmission.description,
        difficulty: problemSubmission.difficulty,
        tags: problemSubmission.tags,
        functionName: problemSubmission.functionName,
        testCases: problemSubmission.testCases,
        starterCode: problemSubmission.starterCode || basicStarterCode,
        solution: problemSubmission.solution,
      });

      // Update submission status to approved
      await db
        .update(problemSubmissions_contrib)
        .set({
          status: "approved",
          reviewedAt: new Date(),
          reviewedBy: session.user.id,
          adminNotes: adminNotes || null,
        })
        .where(eq(problemSubmissions_contrib.id, submissionId));
    } else if (action === "reject") {
      // Update submission status to rejected
      await db
        .update(problemSubmissions_contrib)
        .set({
          status: "rejected",
          reviewedAt: new Date(),
          reviewedBy: session.user.id,
          adminNotes: adminNotes || null,
        })
        .where(eq(problemSubmissions_contrib.id, submissionId));
    }

    return NextResponse.json({
      message: `Problem ${action}d successfully`,
      published: action === "approve",
    });
  } catch (error) {
    console.error("Error reviewing problem submission:", error);
    return NextResponse.json(
      { error: "Failed to review submission" },
      { status: 500 }
    );
  }
}
