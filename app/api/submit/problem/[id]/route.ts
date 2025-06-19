import { auth } from "@/lib/auth";
import { dbExport } from "@/lib/db";
import { problemSubmissionsContrib } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract the `id` param from the URL
    const submissionId = request.nextUrl.pathname.split("/").pop();

    if (!submissionId) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const submission = await dbExport
      .select()
      .from(problemSubmissionsContrib)
      .where(
        and(
          eq(problemSubmissionsContrib.id, submissionId),
          eq(problemSubmissionsContrib.userId, session.user.id)
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
