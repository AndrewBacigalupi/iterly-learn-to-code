import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { problemSubmissions_contrib } from "@/lib/db/schema";
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
      functionName,
      testCases,
      solution,
    } = await request.json();

    // Validate required fields
    if (
      !title ||
      !description ||
      !difficulty ||
      !functionName ||
      !testCases?.length
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate test cases
    for (const testCase of testCases) {
      if (!testCase.input || !testCase.expectedOutput) {
        return NextResponse.json(
          { error: "All test cases must have input and expected output" },
          { status: 400 }
        );
      }
    }

    // Insert the submission
    const submission = await db
      .insert(problemSubmissions_contrib)
      .values({
        userId: session.user.id,
        title,
        description,
        difficulty,
        tags: tags || [],
        functionName,
        testCases,
        solution: solution || null,
      })
      .returning();

    return NextResponse.json({
      message: "Problem submitted successfully",
      submissionId: submission[0].id,
    });
  } catch (error) {
    console.error("Error submitting problem:", error);
    return NextResponse.json(
      { error: "Failed to submit problem" },
      { status: 500 }
    );
  }
}
