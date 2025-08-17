import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  puzzleCompletions,
  puzzleSubmissions,
  puzzles
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  CheckCircle,
  Code,
  Trophy,
  User,
} from "lucide-react";
import { redirect } from "next/navigation";
import UserSubmissions from "./UserSubmissions";



export default async function ProfilePage() {
  const session = await auth();

  // Use a test user ID for testing
  const userId = session?.user?.id || "df7fa600-8e52-4bf7-9cc9-ca3a5ae23f42";

  // Fetch user's puzzle completions
  const userPuzzleCompletions = await dbExport
    .select( {
      id: puzzleCompletions.id,
      userId: puzzleCompletions.userId,
      puzzleId: puzzleCompletions.puzzleId,
      solution: puzzleCompletions.solution,
      completedAt: puzzleCompletions.completedAt,
      title: puzzles.title,
    }

    )
    .from(puzzleCompletions)
    .innerJoin(puzzles, eq(puzzleCompletions.puzzleId, puzzles.id))
    .where(eq(puzzleCompletions.userId, userId));

  // Fetch user's puzzle submissions (contributions)
  let userPuzzleSubmissions = await dbExport
    .select()
    .from(puzzleSubmissions)
    .where(eq(puzzleSubmissions.userId, userId));

  
  // Calculate stats
  const puzzlesCompleted = userPuzzleCompletions.length;
  const successRate = puzzlesCompleted / userPuzzleSubmissions.length;
  

  // Calculate additional stats
  const totalContributions = userPuzzleSubmissions.length;
  const approvedContributions =
    userPuzzleSubmissions.filter((s) => s.status === "approved").length;
  const contributionSuccessRate =
    totalContributions > 0
      ? Math.round((approvedContributions / totalContributions) * 100)
      : 0;

  // Calculate streak (consecutive days with activity)
  const allActivityDates = userPuzzleCompletions
  .map((c) => c.completedAt)
  .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

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

  
  // Get recent activity (last 10 completions/submissions)
const recentActivity = userPuzzleCompletions
  .map((completion) => ({
    type: "puzzle_completion" as const,
    title: completion.title,        // ← careful here
    date: completion.completedAt,   // ← valid inside map
    status: "completed" as const,
  }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 10);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  {/* Left side: avatar + name/email */}
                  <div className="flex items-center gap-4  ">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session?.user?.image || ""}
                        alt={session?.user?.name || "Test User"}
                      />
                      <AvatarFallback className="text-lg">
                        {session?.user?.name?.charAt(0) ||
                          session?.user?.email?.charAt(0) ||
                          "T"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h1 className="text-2xl sm:text-4xl font-bold">
                        {session?.user?.name || "Test User"}
                      </h1>
                      <p className="text-muted-foreground">{session?.user?.email || "test@example.com"}</p>
                    </div>
                  </div>

                  {/* Right side: puzzles completed */}
                  <div className="text-center sm:mr-24 m-8">
                    <div className="text-2xl sm:text-4xl font-bold text-green-600 dark:text-green-400">
                      {puzzlesCompleted}
                    </div>
                    <div className="text-md sm:text-lg text-muted-foreground">
                      Puzzles Completed
                    </div>
                  </div>
                </div>
              </CardHeader>
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
                    No recent activity yet. Start solving puzzles!
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
                    <div className="font-medium">Contributions</div>
                    <div className="text-sm text-muted-foreground">
                      Puzzles submitted
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {totalContributions}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Submissions Section */}
        <UserSubmissions initialSubmissions={userPuzzleSubmissions} />
      </div>
    </div>
  );
}
