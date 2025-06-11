import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { puzzleCompletions, puzzles } from "@/lib/db/schema";
import { eq, notInArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      // For unauthenticated users, return the first puzzle
      const firstPuzzle = await db
        .select({ id: puzzles.id })
        .from(puzzles)
        .orderBy(puzzles.createdAt)
        .limit(1);

      if (firstPuzzle.length > 0) {
        return NextResponse.json({ nextPuzzleId: firstPuzzle[0].id });
      } else {
        return NextResponse.json({ nextPuzzleId: null });
      }
    }

    // Get all puzzles the user has completed
    const completedPuzzles = await db
      .select({ puzzleId: puzzleCompletions.puzzleId })
      .from(puzzleCompletions)
      .where(eq(puzzleCompletions.userId, session.user.id));

    const completedPuzzleIds = completedPuzzles.map((cp) => cp.puzzleId);

    // Find the first puzzle that isn't completed
    let nextPuzzle;
    if (completedPuzzleIds.length > 0) {
      nextPuzzle = await db
        .select({ id: puzzles.id })
        .from(puzzles)
        .where(notInArray(puzzles.id, completedPuzzleIds))
        .orderBy(puzzles.createdAt)
        .limit(1);
    } else {
      // No puzzles completed, get the first one
      nextPuzzle = await db
        .select({ id: puzzles.id })
        .from(puzzles)
        .orderBy(puzzles.createdAt)
        .limit(1);
    }

    return NextResponse.json({
      nextPuzzleId: nextPuzzle.length > 0 ? nextPuzzle[0].id : null,
    });
  } catch (error) {
    console.error("Error finding next puzzle:", error);
    return NextResponse.json(
      { error: "Failed to find next puzzle" },
      { status: 500 }
    );
  }
}
