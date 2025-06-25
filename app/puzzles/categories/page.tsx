import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dbExport } from "@/lib/db";
import { puzzles } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { 
  Puzzle,
  ArrowRight,
  BookOpen
} from "lucide-react";
import Link from "next/link";

export default async function PuzzleCategoriesPage() {
  // Fetch the highest puzzle number from the database
  const result = await dbExport
    .select({ maxNumber: sql<number>`MAX(${puzzles.number})` })
    .from(puzzles);
  
  const puzzleCount = result[0]?.maxNumber || 0;

  const categories = [
    {
      id: "basics",
      title: "Basics",
      description: "Start your puzzle-solving journey with fundamental programming concepts. These puzzles focus on basic logic, variables, and simple algorithms.",
      icon: BookOpen,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      puzzleCount: puzzleCount,
      difficulty: "Beginner"
    },
    {
      id: "coming-soon-1",
      title: "Coming Soon",
      description: "New puzzle category in development. Stay tuned for more challenging problems!",
      icon: BookOpen,
      color: "text-gray-400 dark:text-gray-500",
      bgColor: "bg-gray-50 dark:bg-gray-800",
      puzzleCount: 0,
      difficulty: "TBD",
      underConstruction: true
    },
    {
      id: "coming-soon-2", 
      title: "Coming Soon",
      description: "Another exciting puzzle category is being built. Check back later!",
      icon: BookOpen,
      color: "text-gray-400 dark:text-gray-500",
      bgColor: "bg-gray-50 dark:bg-gray-800",
      puzzleCount: 0,
      difficulty: "TBD",
      underConstruction: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <section className="text-center py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            P<span className="tracking-wide">u</span><span className=" text-blue-300 tracking-wide font-style: italic">zz</span>les
          </h1>
          <p className="text-xl text-muted-foreground mb-1">
            Choose a category to start solving puzzles
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid gap-6">
            {categories.map((category) => (
              <Card key={category.id} className={`group transition-all duration-300 ${
                category.underConstruction 
                  ? 'opacity-60 cursor-not-allowed hover:shadow-none' 
                  : 'hover:shadow-lg'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={`p-4 rounded-lg ${category.bgColor}`}>
                        <category.icon className={`h-8 w-8 ${category.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                          {category.title}
                          {category.underConstruction && (
                            <Badge variant="outline" className="text-xs">
                              Under Construction
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="text-base mb-3 mr-2">
                          {category.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{category.puzzleCount} puzzles</span>
                          <Badge variant="secondary">
                            {category.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {!category.underConstruction ? (
                      <Button 
                        asChild 
                        size="lg"
                        className="group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        <Link href={`/puzzles/categories/${category.id}`}>
                          Start {category.title}
                          <ArrowRight className=" h-5 w-5" />
                        </Link>
                      </Button>
                    ) : (
                      <Button 
                        size="lg"
                        variant="outline"
                        disabled
                        className="opacity-50"
                      >
                        Coming Soon
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 text-center bg-muted/30 rounded-lg">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Solving?</h2>
          <p className="text-muted-foreground mb-6">
            Choose a category that matches your skill level and start solving puzzles!
          </p>
          <Button asChild size="lg">
            <Link href="/puzzles/categories/basics">
              Start with Basics
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 