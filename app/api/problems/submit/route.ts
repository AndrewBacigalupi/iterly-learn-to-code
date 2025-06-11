import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { problemSubmissions } from "@/lib/db/schema";
import { judge0, SupportedLanguage } from "@/lib/judge0";
import { NextRequest, NextResponse } from "next/server";

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface SubmitCodeRequest {
  problemId: string;
  code: string;
  language: SupportedLanguage;
  testCases: TestCase[];
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { problemId, code, language, testCases }: SubmitCodeRequest =
      await request.json();

    if (!problemId || !code || !language || !testCases) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Run the code against test cases using Judge0
    const results = await judge0.runTestCases(code, language, testCases);

    // Determine the overall status
    const allPassed = results.every((result) => result.passed);
    const status = allPassed ? "accepted" : "wrong_answer";

    // Save submission to database
    await db.insert(problemSubmissions).values({
      userId: session.user.id,
      problemId,
      code,
      language,
      status,
      runtime: 0, // Would be provided by Judge0
      memory: 0, // Would be provided by Judge0
    });

    return NextResponse.json({
      status,
      results,
      runtime: 0,
      memory: 0,
    });
  } catch (error) {
    console.error("Error submitting solution:", error);
    return NextResponse.json(
      { error: "Failed to submit solution" },
      { status: 500 }
    );
  }
}
