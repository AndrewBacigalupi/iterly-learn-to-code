import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { dbExport } from "@/lib/db";
import {
  problemSubmissions,
  problemSubmissionsContrib,
  puzzleCompletions,
  puzzleSubmissions,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Code,
  ExternalLink,
  FileText,
  Plus,
  RefreshCw,
  Trophy,
  User,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "easy":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "hard":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
}

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  // Fetch user's puzzle completions
  const userPuzzleCompletions = await dbExport
    .select()
    .from(puzzleCompletions)
    .where(eq(puzzleCompletions.userId, session.user.id));

  // Fetch user's problem submissions (solving attempts)
  const userProblemSolveAttempts = await dbExport
    .select()
    .from(problemSubmissions)
    .where(eq(problemSubmissions.userId, session.user.id));

  // Fetch user's puzzle submissions (contributions)
  const userPuzzleSubmissions = await dbExport
    .select({
      id: puzzleSubmissions.id,
      title: puzzleSubmissions.title,
      description: puzzleSubmissions.description,
      difficulty: puzzleSubmissions.difficulty,
      tags: puzzleSubmissions.tags,
      example_input: puzzleSubmissions.example_input,
      answer: puzzleSubmissions.answer,
      hint: puzzleSubmissions.hint,
      explanation: puzzleSubmissions.explanation,
      status: puzzleSubmissions.status,
      adminNotes: puzzleSubmissions.adminNotes,
      submittedAt: puzzleSubmissions.submittedAt,
      reviewedAt: puzzleSubmissions.reviewedAt,
      publishedPuzzleId: puzzleSubmissions.publishedPuzzleId,
    })
    .from(puzzleSubmissions)
    .where(eq(puzzleSubmissions.userId, session.user.id));

  // Fetch user's problem submissions (contributions)
  const userProblemSubmissions = await dbExport
    .select({
      id: problemSubmissionsContrib.id,
      title: problemSubmissionsContrib.title,
      description: problemSubmissionsContrib.description,
      difficulty: problemSubmissionsContrib.difficulty,
      tags: problemSubmissionsContrib.tags,
      functionName: problemSubmissionsContrib.functionName,
      testCases: problemSubmissionsContrib.testCases,
      starterCode: problemSubmissionsContrib.starterCode,
      solution: problemSubmissionsContrib.solution,
      status: problemSubmissionsContrib.status,
      adminNotes: problemSubmissionsContrib.adminNotes,
      submittedAt: problemSubmissionsContrib.submittedAt,
      reviewedAt: problemSubmissionsContrib.reviewedAt,
      publishedProblemId: problemSubmissionsContrib.publishedProblemId,
    })
    .from(problemSubmissionsContrib)
    .where(eq(problemSubmissionsContrib.userId, session.user.id));

  // Calculate stats
  const puzzlesCompleted = userPuzzleCompletions.length;
  const problemsSolved = [
    ...new Set(
      userProblemSolveAttempts
        .filter((s) => s.status === "accepted")
        .map((s) => s.problemId)
    ),
  ].length;
  const totalSolveSubmissions = userProblemSolveAttempts.length;
  const successRate =
    totalSolveSubmissions > 0
      ? Math.round(
          (userProblemSolveAttempts.filter((s) => s.status === "accepted")
            .length /
            totalSolveSubmissions) *
            100
        )
      : 0;

  // Calculate additional stats
  const totalContributions =
    userPuzzleSubmissions.length + userProblemSubmissions.length;
  const approvedContributions =
    userPuzzleSubmissions.filter((s) => s.status === "approved").length +
    userProblemSubmissions.filter((s) => s.status === "approved").length;
  const contributionSuccessRate =
    totalContributions > 0
      ? Math.round((approvedContributions / totalContributions) * 100)
      : 0;

  // Calculate streak (consecutive days with activity)
  const allActivityDates = [
    ...userPuzzleCompletions.map((c) => c.completedAt),
    ...userProblemSolveAttempts
      .filter((s) => s.status === "accepted")
      .map((s) => s.submittedAt),
  ].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let currentStreak = 0;
  if (allActivityDates.length > 0) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let checkDate = new Date(today);
    let hasActivityToday = false;

    for (const activityDate of allActivityDates) {
      const activityDay = new Date(activityDate);
      activityDay.setHours(0, 0, 0, 0);
      checkDate.setHours(0, 0, 0, 0);

      if (activityDay.getTime() === checkDate.getTime()) {
        currentStreak++;
        hasActivityToday = true;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (activityDay.getTime() < checkDate.getTime()) {
        break;
      }
    }

    // If no activity today, check if streak should start from yesterday
    if (!hasActivityToday && currentStreak === 0) {
      checkDate = new Date(yesterday);
      for (const activityDate of allActivityDates) {
        const activityDay = new Date(activityDate);
        activityDay.setHours(0, 0, 0, 0);
        checkDate.setHours(0, 0, 0, 0);

        if (activityDay.getTime() === checkDate.getTime()) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else if (activityDay.getTime() < checkDate.getTime()) {
          break;
        }
      }
    }
  }

  // Find favorite language (most used in successful problem submissions)
  const languageCount: Record<string, number> = {};
  userProblemSolveAttempts
    .filter((s) => s.status === "accepted")
    .forEach((s) => {
      languageCount[s.language] = (languageCount[s.language] || 0) + 1;
    });

  const favoriteLanguage =
    Object.entries(languageCount).sort(([, a], [, b]) => b - a)[0]?.[0] ||
    "None";

  // Get recent activity (last 10 completions/submissions)
  const recentActivity = [
    ...userPuzzleCompletions.map((completion) => ({
      type: "puzzle_completion" as const,
      title: "Puzzle Completed",
      date: completion.completedAt,
      status: "completed" as const,
    })),
    ...userProblemSolveAttempts
      .filter((sub) => sub.status === "accepted")
      .map((submission) => ({
        type: "problem_solved" as const,
        title: "Problem Solved",
        date: submission.submittedAt,
        status: "solved" as const,
      })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={session.user?.image || ""}
                    alt={session.user?.name || ""}
                  />
                  <AvatarFallback className="text-lg">
                    {session.user?.name?.charAt(0) ||
                      session.user?.email?.charAt(0) ||
                      "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">
                    {session.user?.name || "Anonymous User"}
                  </h1>
                  <p className="text-muted-foreground">{session.user?.email}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Member since {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {puzzlesCompleted}
              </div>
              <div className="text-sm text-muted-foreground">
                Puzzles Completed
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {problemsSolved}
              </div>
              <div className="text-sm text-muted-foreground">
                Problems Solved
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {totalSolveSubmissions}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Submissions
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {successRate}%
              </div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        {activity.type === "puzzle_completion" ? (
                          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <Code className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{activity.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(activity.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    No recent activity yet. Start solving puzzles and problems!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Profile Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                Profile Stats
              </CardTitle>
              <CardDescription>Your coding journey highlights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <div className="font-medium">Current Streak</div>
                    <div className="text-sm text-muted-foreground">
                      Days of consecutive activity
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {currentStreak}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <div className="font-medium">Favorite Language</div>
                    <div className="text-sm text-muted-foreground">
                      Most used programming language
                    </div>
                  </div>
                  <Badge variant="outline">{favoriteLanguage}</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <div className="font-medium">Contributions</div>
                    <div className="text-sm text-muted-foreground">
                      Puzzles + Problems submitted
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {totalContributions}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <div className="font-medium">Contribution Success</div>
                    <div className="text-sm text-muted-foreground">
                      Approval rate for submissions
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {contributionSuccessRate}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Submissions Section */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Your Submissions
            </CardTitle>
            <CardDescription>
              Puzzles and problems you've contributed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href="/submit/puzzle">
                    <Plus className="h-3 w-3 mr-1" />
                    Submit Puzzle
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/submit/problem">
                    <Plus className="h-3 w-3 mr-1" />
                    Submit Problem
                  </Link>
                </Button>
              </div>

              {/* Puzzle Submissions */}
              {userPuzzleSubmissions.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    Puzzle Submissions ({userPuzzleSubmissions.length})
                  </h3>
                  <div className="space-y-3">
                    {userPuzzleSubmissions.map((submission) => (
                      <div
                        key={submission.id}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{submission.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {submission.description.substring(0, 100)}...
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge
                                className={getStatusColor(submission.status)}
                              >
                                {submission.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(
                              submission.submittedAt
                            ).toLocaleDateString()}
                          </div>
                        </div>

                        {submission.status === "approved" &&
                          submission.publishedPuzzleId && (
                            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                              <CheckCircle className="h-4 w-4" />
                              <span>Published successfully!</span>
                              <Button asChild size="sm" variant="outline">
                                <Link
                                  href={`/puzzles/${submission.publishedPuzzleId}`}
                                >
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  View Live
                                </Link>
                              </Button>
                            </div>
                          )}

                        {submission.status === "rejected" && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                              <AlertCircle className="h-4 w-4" />
                              <span>Submission rejected</span>
                            </div>
                            {submission.adminNotes && (
                              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded p-3">
                                <p className="text-sm text-red-800 dark:text-red-200">
                                  <strong>Admin feedback:</strong>{" "}
                                  {submission.adminNotes}
                                </p>
                              </div>
                            )}
                            <Button asChild size="sm" variant="outline">
                              <Link
                                href={`/submit/puzzle?resubmit=${submission.id}`}
                                className="flex items-center gap-1"
                              >
                                <RefreshCw className="h-3 w-3" />
                                Resubmit
                              </Link>
                            </Button>
                          </div>
                        )}

                        {submission.status === "pending" && (
                          <div className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400">
                            <Clock className="h-4 w-4" />
                            <span>Under review</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Problem Submissions */}
              {userProblemSubmissions.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Code className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    Problem Submissions ({userProblemSubmissions.length})
                  </h3>
                  <div className="space-y-3">
                    {userProblemSubmissions.map((submission) => (
                      <div
                        key={submission.id}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{submission.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {submission.description.substring(0, 100)}...
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge
                                className={getStatusColor(submission.status)}
                              >
                                {submission.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(
                              submission.submittedAt
                            ).toLocaleDateString()}
                          </div>
                        </div>

                        {submission.status === "approved" &&
                          submission.publishedProblemId && (
                            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                              <CheckCircle className="h-4 w-4" />
                              <span>Published successfully!</span>
                              <Button asChild size="sm" variant="outline">
                                <Link
                                  href={`/problems/${submission.publishedProblemId}`}
                                >
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  View Live
                                </Link>
                              </Button>
                            </div>
                          )}

                        {submission.status === "rejected" && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                              <AlertCircle className="h-4 w-4" />
                              <span>Submission rejected</span>
                            </div>
                            {submission.adminNotes && (
                              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded p-3">
                                <p className="text-sm text-red-800 dark:text-red-200">
                                  <strong>Admin feedback:</strong>{" "}
                                  {submission.adminNotes}
                                </p>
                              </div>
                            )}
                            <Button asChild size="sm" variant="outline">
                              <Link
                                href={`/submit/problem?resubmit=${submission.id}`}
                                className="flex items-center gap-1"
                              >
                                <RefreshCw className="h-3 w-3" />
                                Resubmit
                              </Link>
                            </Button>
                          </div>
                        )}

                        {submission.status === "pending" && (
                          <div className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400">
                            <Clock className="h-4 w-4" />
                            <span>Under review</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No submissions message */}
              {userPuzzleSubmissions.length === 0 &&
                userProblemSubmissions.length === 0 && (
                  <div className="text-center py-4">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <h3 className="font-medium mb-1 text-sm">
                      No submissions yet
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Contribute to the community!
                    </p>
                  </div>
                )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
