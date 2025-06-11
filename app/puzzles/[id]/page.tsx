import { auth } from "@/lib/auth";
import { PuzzlePageClient } from "./puzzle-page-client";

export default async function PuzzlePage() {
  const session = await auth();
  return <PuzzlePageClient session={session} />;
}
