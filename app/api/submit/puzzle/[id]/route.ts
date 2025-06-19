import { auth } from "@/lib/auth";
import { dbExport } from "@/lib/db";
import { puzzleSubmissions } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract the ID from the URL path
    const urlSegments = request.nextUrl.pathname.split("/");
    const submissionId = urlSegments[urlSegments.length - 1];

    if (!submissionId) {
      return NextResponse.json({ error: "Missing submission ID" }, { status: 400 });
    }

    const submission = await dbExport
      .select()
      .from(puzzleSubmissions)
      .where(
        and(
          eq(puzzleSubmissions.id, submissionId),
          eq(puzzleSubmissions.userId, session.user.id)
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
    console.error("Error fetching puzzle submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
