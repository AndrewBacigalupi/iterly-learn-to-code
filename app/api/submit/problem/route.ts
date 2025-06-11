import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { problemSubmissions_contrib } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      difficulty,
      tags,
      functionName,
      testCases,
      solution,
      resubmitId,
    } = body;

    // Validate required fields
    if (!title || !description || !difficulty || !functionName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!testCases || !Array.isArray(testCases) || testCases.length === 0) {
      return NextResponse.json(
        { error: "At least one test case is required" },
        { status: 400 }
      );
    }

    // If this is a resubmission, delete the old rejected submission
    if (resubmitId) {
      await db
        .delete(problemSubmissions_contrib)
        .where(
          and(
            eq(problemSubmissions_contrib.id, resubmitId),
            eq(problemSubmissions_contrib.userId, session.user.id),
            eq(problemSubmissions_contrib.status, "rejected")
          )
        );
    }

    // Create new submission
    await db.insert(problemSubmissions_contrib).values({
      userId: session.user.id,
      title,
      description,
      difficulty,
      tags: tags || [],
      functionName,
      testCases,
      solution: solution || null,
      status: "pending",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting problem:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
