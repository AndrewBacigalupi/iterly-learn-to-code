import { dbExport } from "@/lib/db";
import { puzzles } from "@/lib/db/schema";
import { eq, lt, gt, isNotNull, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Get current puzzle to find its number
    const currentPuzzle = await dbExport
      .select({ number: puzzles.number })
      .from(puzzles)
      .where(eq(puzzles.id, id))
      .limit(1);

    if (currentPuzzle.length === 0) {
      return NextResponse.json(
        { error: "Puzzle not found" },
        { status: 404 }
      );
    }

    const currentNumber = currentPuzzle[0].number;
    
    // If current puzzle has no number, we can't determine navigation
    if (currentNumber === null) {
      return NextResponse.json({
        previous: null,
        next: null,
      });
    }

    // Get previous puzzle - order by number in descending order to get the highest number less than current
    const previousPuzzle = await dbExport
      .select({ id: puzzles.id, title: puzzles.title, number: puzzles.number })
      .from(puzzles)
      .where(lt(puzzles.number, currentNumber))
      .orderBy(desc(puzzles.number))
      .limit(1);

    // Get next puzzle
    const nextPuzzle = await dbExport
      .select({ id: puzzles.id, title: puzzles.title, number: puzzles.number })
      .from(puzzles)
      .where(gt(puzzles.number, currentNumber))
      .orderBy(puzzles.number)
      .limit(1);

    return NextResponse.json({
      previous: previousPuzzle.length > 0 ? previousPuzzle[0] : null,
      next: nextPuzzle.length > 0 ? nextPuzzle[0] : null,
    });
  } catch (error) {
    console.error("Error finding puzzle navigation:", error);
    return NextResponse.json(
      { error: "Failed to find puzzle navigation" },
      { status: 500 }
    );
  }
} 