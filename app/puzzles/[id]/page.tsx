import { auth } from "@/lib/auth";
import { dbExport } from "@/lib/db";
import { puzzles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { PuzzlePageClient } from "./puzzle-page-client";

export default async function PuzzlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;

  // Fetch puzzle data to get category information
  const result = await dbExport
    .select({ title: puzzles.title, number: puzzles.number, category: puzzles.category })
    .from(puzzles)
    .where(eq(puzzles.id, id))
    .limit(1);

  if (result.length === 0) {
    notFound();
  }

  const { category } = result[0];
  console.log("CATEGORY: " + category);

  return <PuzzlePageClient session={session} category={category ?? "General"} />;
}
