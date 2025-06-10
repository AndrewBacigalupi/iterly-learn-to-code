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
import { Calendar, CheckCircle, Code, Trophy, User } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  // Mock data for demo - in a real app, this would come from the database
  const mockStats = {
    puzzlesCompleted: 12,
    problemsSolved: 8,
    totalSubmissions: 45,
    successRate: 73,
    joinDate: "2024-01-15",
    favoriteLanguage: "JavaScript",
    streak: 7,
  };

  const mockRecentActivity = [
    {
      type: "puzzle",
      title: "Two Sum Arrays",
      date: "2024-01-20",
      status: "completed",
    },
    {
      type: "problem",
      title: "Valid Parentheses",
      date: "2024-01-19",
      status: "solved",
    },
    {
      type: "puzzle",
      title: "String Palindrome",
      date: "2024-01-18",
      status: "completed",
    },
    {
      type: "problem",
      title: "Merge Sorted Lists",
      date: "2024-01-17",
      status: "attempted",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
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
                    Joined {new Date(mockStats.joinDate).toLocaleDateString()}
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
              <div className="text-2xl font-bold text-green-600">
                {mockStats.puzzlesCompleted}
              </div>
              <div className="text-sm text-muted-foreground">
                Puzzles Completed
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {mockStats.problemsSolved}
              </div>
              <div className="text-sm text-muted-foreground">
                Problems Solved
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {mockStats.totalSubmissions}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Submissions
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {mockStats.successRate}%
              </div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your latest puzzle and problem attempts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      {activity.type === "puzzle" ? (
                        <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <Code className="h-4 w-4 text-blue-600" />
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
                      variant={
                        activity.status === "completed" ||
                        activity.status === "solved"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        activity.status === "completed" ||
                        activity.status === "solved"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : ""
                      }
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
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
                  <div className="text-2xl font-bold text-orange-600">
                    {mockStats.streak}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <div className="font-medium">Favorite Language</div>
                    <div className="text-sm text-muted-foreground">
                      Most used programming language
                    </div>
                  </div>
                  <Badge variant="outline">{mockStats.favoriteLanguage}</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <div className="font-medium">Total Progress</div>
                    <div className="text-sm text-muted-foreground">
                      Puzzles + Problems completed
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {mockStats.puzzlesCompleted + mockStats.problemsSolved}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
