import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { puzzleSubmissions } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const {
      title,
      description,
      difficulty,
      tags,
      input,
      expectedOutput,
      hint,
      explanation,
    } = await request.json();

    // Validate required fields
    if (!title || !description || !difficulty || !input || !expectedOutput) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert the submission
    const submission = await db
      .insert(puzzleSubmissions)
      .values({
        userId: session.user.id,
        title,
        description,
        difficulty,
        tags: tags || [],
        input,
        expectedOutput,
        hint: hint || null,
        explanation: explanation || null,
      })
      .returning();

    return NextResponse.json({
      message: "Puzzle submitted successfully",
      submissionId: submission[0].id,
    });
  } catch (error) {
    console.error("Error submitting puzzle:", error);
    return NextResponse.json(
      { error: "Failed to submit puzzle" },
      { status: 500 }
    );
  }
}
