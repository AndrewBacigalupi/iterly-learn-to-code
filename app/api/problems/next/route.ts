import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { problems, problemSubmissions } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const { searchParams } = new URL(request.url);
    const currentProblemId = searchParams.get("current");

    if (!session?.user?.id) {
      // If not logged in, just get the first problem or next after current
      const allProblems = await db
        .select()
        .from(problems)
        .orderBy(problems.createdAt);

      if (currentProblemId) {
        const currentIndex = allProblems.findIndex(
          (p) => p.id === currentProblemId
        );
        const nextProblem = allProblems[currentIndex + 1];

        return NextResponse.json({
          nextProblem: nextProblem || null,
          hasNext: !!nextProblem,
        });
      }

      return NextResponse.json({
        nextProblem: allProblems[0] || null,
        hasNext: allProblems.length > 0,
      });
    }

    // Get all problems
    const allProblems = await db
      .select()
      .from(problems)
      .orderBy(problems.createdAt);

    // Get user's solved problems
    const solvedSubmissions = await db
      .select({ problemId: problemSubmissions.problemId })
      .from(problemSubmissions)
      .where(
        and(
          eq(problemSubmissions.userId, session.user.id),
          eq(problemSubmissions.status, "accepted")
        )
      );

    const solvedProblemIds = [
      ...new Set(solvedSubmissions.map((s) => s.problemId)),
    ];

    if (currentProblemId) {
      // Find next unsolved problem after current one
      const currentIndex = allProblems.findIndex(
        (p) => p.id === currentProblemId
      );

      // Look for next unsolved problem starting from current position
      for (let i = currentIndex + 1; i < allProblems.length; i++) {
        if (!solvedProblemIds.includes(allProblems[i].id)) {
          return NextResponse.json({
            nextProblem: allProblems[i],
            hasNext: true,
          });
        }
      }

      // If no unsolved problems after current, check if there are any unsolved problems at all
      const unsolvedProblems = allProblems.filter(
        (p) => !solvedProblemIds.includes(p.id)
      );

      return NextResponse.json({
        nextProblem: unsolvedProblems[0] || null,
        hasNext: unsolvedProblems.length > 0,
      });
    }

    // Find first unsolved problem
    const firstUnsolvedProblem = allProblems.find(
      (p) => !solvedProblemIds.includes(p.id)
    );

    return NextResponse.json({
      nextProblem: firstUnsolvedProblem || null,
      hasNext: !!firstUnsolvedProblem,
    });
  } catch (error) {
    console.error("Error finding next problem:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
