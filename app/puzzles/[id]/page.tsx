import { auth } from "@/lib/auth";
import { dbExport } from "@/lib/db";
import { puzzles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { PuzzlePageClient } from "./puzzle-page-client";

export default async function PuzzlePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const session = await auth();
  const { id } = await params;

  // Fetch puzzle data to get category information
  const puzzle = await dbExport
    .select({ title: puzzles.title, number: puzzles.number })
    .from(puzzles)
    .where(eq(puzzles.id, id))
    .limit(1);

  if (puzzle.length === 0) {
    notFound();
  }

  // For now, all puzzles are in the "Basics" category
  const category = "Basics";

  return <PuzzlePageClient session={session} category={category} />;
}
