import { dbExport } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const result = await dbExport.query.puzzles.findFirst({
      where: (puzzles, { eq }) => eq(puzzles.id, id),
    });

    if (!result) {
      return NextResponse.json({ error: "Puzzle not found" }, { status: 404 });
    }

    // Don't send the expected output to the client for security
    const { expectedOutput, ...puzzleData } = result;

    return NextResponse.json(puzzleData);
  } catch (error) {
    console.error("Error fetching puzzle:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
