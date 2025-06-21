import { auth } from "@/lib/auth";
import { dbExport } from "@/lib/db";
import { puzzleCompletions } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

interface SubmitPuzzleRequest {
  puzzleId: string;
  answer: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { answer }: { answer: string } = await request.json();

    if (!answer || !answer.trim()) {
      return NextResponse.json(
        { error: "Answer is required" },
        { status: 400 }
      );
    }

    // Get the puzzle with the expected output (server-side only)
    const puzzle = await dbExport.query.puzzles.findFirst({
      where: (puzzles, { eq }) => eq(puzzles.id, id),
    });

    if (!puzzle) {
      return NextResponse.json({ error: "Puzzle not found" }, { status: 404 });
    }

    // Check if the answer is correct (case-insensitive, trimmed)
    const userAnswer = answer.trim().toLowerCase();
    const correctAnswer = puzzle.answer.trim().toLowerCase();
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      // Check if user has already solved this puzzle
      const existingCompletion = await dbExport
        .select()
        .from(puzzleCompletions)
        .where(
          and(
            eq(puzzleCompletions.userId, session.user.id),
            eq(puzzleCompletions.puzzleId, id)
          )
        )
        .limit(1);

      // If not already completed, save the completion
      if (existingCompletion.length === 0) {
        await dbExport.insert(puzzleCompletions).values({
          userId: session.user.id,
          puzzleId: id,
          solution: answer.trim(),
        });
      }
    }

    return NextResponse.json({
      correct: isCorrect,
      explanation: isCorrect ? puzzle.explanation : null,
      hint: !isCorrect ? puzzle.hint : null,
    });
  } catch (error) {
    console.error("Error submitting puzzle solution:", error);
    return NextResponse.json(
      { error: "Failed to submit solution" },
      { status: 500 }
    );
  }
}
