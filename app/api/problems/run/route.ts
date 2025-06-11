import { judge0, SupportedLanguage } from "@/lib/judge0";
import { NextRequest, NextResponse } from "next/server";

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface RunCodeRequest {
  code: string;
  language: SupportedLanguage;
  testCases: TestCase[];
  functionName?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { code, language, testCases, functionName }: RunCodeRequest =
      await request.json();

    if (!code || !language || !testCases) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Run the code against test cases using Judge0
    const results = await judge0.runTestCases(
      code,
      language,
      testCases,
      functionName
    );

    return NextResponse.json({
      results,
      runtime: 0, // Judge0 would provide this
      memory: 0, // Judge0 would provide this
    });
  } catch (error) {
    console.error("Error running code:", error);
    return NextResponse.json({ error: "Failed to run code" }, { status: 500 });
  }
}
