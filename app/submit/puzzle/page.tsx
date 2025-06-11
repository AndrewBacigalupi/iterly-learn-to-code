import { auth } from "@/lib/auth";
import { SubmitPuzzleClient } from "./submit-puzzle-client";

export default async function SubmitPuzzlePage() {
  const session = await auth();
  return <SubmitPuzzleClient session={session} />;
}
