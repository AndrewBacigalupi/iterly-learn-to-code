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
import { getCategoriesWithCounts } from "@/lib/categories";
import { sql } from "drizzle-orm";
import { 
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default async function PuzzleCategoriesPage() {
  // Fetch puzzle counts by category
  const categoryStats = await dbExport
    .select({
      category: puzzles.category,
      count: sql<number>`count(*)`.as('count')
    })
    .from(puzzles)
    .groupBy(puzzles.category);

  // Get categories with their puzzle counts
  const categories = getCategoriesWithCounts(categoryStats);

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      {/* Header */}
      <section className="text-center py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
            P<span className="tracking-wide">u</span><span className=" text-blue-300 tracking-wide font-style: italic">zz</span>les
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-1">
            Choose a category to start solving puzzles
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-6 sm:py-8">
        <div className="max-w-4xl mx-auto mb-8 sm:mb-10">
          <div className="grid gap-4 sm:gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="group transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                    <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                      <div className={`p-3 sm:p-4 rounded-lg ${category.bgColor} flex-shrink-0`}>
                        <category.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${category.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl sm:text-2xl mb-2">
                          <span className="break-words">{category.title}</span>
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base mb-3 mr-2">
                          {category.description}
                        </CardDescription>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                          <span>{category.puzzleCount} puzzles</span>
                          <Badge variant="secondary" className="w-fit">
                            {category.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button 
                        asChild 
                        size="lg"
                        className="w-full sm:w-auto group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        <Link href={`/puzzles/categories/${category.id}`}>
                          <span className="hidden sm:inline">Start {category.title}</span>
                          <span className="sm:hidden">Start</span>
                          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 sm:py-12 text-center bg-muted/30 rounded-lg mx-4 sm:mx-0">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to Start Solving?</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
            Choose a category that matches your skill level and start solving puzzles!
          </p>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/puzzles/categories/basics">
              Start with Basics
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 