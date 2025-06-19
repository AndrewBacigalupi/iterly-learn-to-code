import { auth } from "@/lib/auth";
import { dbExport } from "@/lib/db";
import { puzzleCompletions } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ solved: false });
    }

    const completion = await dbExport
      .select()
      .from(puzzleCompletions)
      .where(
        and(
          eq(puzzleCompletions.userId, session.user.id),
          eq(puzzleCompletions.puzzleId, id)
        )
      )
      .limit(1);

    return NextResponse.json({ solved: completion.length > 0 });
  } catch (error) {
    console.error("Error checking puzzle status:", error);
    return NextResponse.json({ solved: false });
  }
}
