import { auth } from "@/lib/auth";
import { dbExport } from "@/lib/db";
import { puzzleSubmissions } from "@/lib/db/schema";
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
      input,
      expectedOutput,
      hint,
      explanation,
      resubmitId,
    } = body;

    // Validate required fields
    if (!title || !description || !difficulty || !input || !expectedOutput) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // If this is a resubmission, delete the old rejected submission
    if (resubmitId) {
      await dbExport
        .delete(puzzleSubmissions)
        .where(
          and(
            eq(puzzleSubmissions.id, resubmitId),
            eq(puzzleSubmissions.userId, session.user.id),
            eq(puzzleSubmissions.status, "rejected")
          )
        );
    }

    // Create new submission
    await dbExport.insert(puzzleSubmissions).values({
      userId: session.user.id,
      title,
      description,
      difficulty,
      tags: tags || [],
      input,
      expectedOutput,
      hint: hint || null,
      explanation: explanation || null,
      status: "pending",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting puzzle:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
