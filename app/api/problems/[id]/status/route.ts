import { auth } from "@/lib/auth";
import { dbExport } from "@/lib/db";
import { problemSubmissions } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ solved: false });
    }

    // Check if user has any accepted submissions for this problem
    const acceptedSubmission = await dbExport
      .select()
      .from(problemSubmissions)
      .where(
        and(
          eq(problemSubmissions.userId, session.user.id),
          eq(problemSubmissions.problemId, id),
          eq(problemSubmissions.status, "accepted")
        )
      )
      .limit(1);

    return NextResponse.json({
      solved: acceptedSubmission.length > 0,
      submissionId: acceptedSubmission[0]?.id || null,
    });
  } catch (error) {
    console.error("Error checking problem status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
