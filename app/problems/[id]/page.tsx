import { auth } from "@/lib/auth";
import { ProblemPageClient } from "./problem-page-client";

export default async function ProblemPage() {
  const session = await auth();
  return <ProblemPageClient session={session} />;
}
