import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      puzzleCount: puzzleCount,
      difficulty: "Beginner"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <section className="text-center py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Puzzles
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Choose a category to start solving puzzles
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={`p-4 rounded-lg ${category.bgColor}`}>
                        <category.icon className={`h-8 w-8 ${category.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{category.title}</CardTitle>
                        <CardDescription className="text-base mb-3 mr-2">
                          {category.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{category.puzzleCount} puzzles</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            {category.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
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