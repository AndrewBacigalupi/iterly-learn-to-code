import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { problemSubmissions_contrib } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const submissionId = params.id;

    // Fetch the submission, but only if it belongs to the current user
    const submission = await db
      .select()
      .from(problemSubmissions_contrib)
      .where(
        and(
          eq(problemSubmissions_contrib.id, submissionId),
          eq(problemSubmissions_contrib.userId, session.user.id)
        )
      )
      .limit(1);

    if (submission.length === 0) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      submission: submission[0],
    });
  } catch (error) {
    console.error("Error fetching problem submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
