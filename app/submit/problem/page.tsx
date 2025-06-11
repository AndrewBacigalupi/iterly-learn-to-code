import { auth } from "@/lib/auth";
import { SubmitProblemClient } from "./submit-problem-client";

export default async function SubmitProblemPage() {
  const session = await auth();
  return <SubmitProblemClient session={session} />;
}
