import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  BookOpen, 
  Code, 
  ArrowRight, 
  Brain, 
  Zap, 
  Target,
  Clock,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

export default function LearnPage() {
  const articles = [
    {
      number: 1,
      id: "intro-to-programming",
      title: "Introduction to Programming",
      description: "Learn what programming is, why it's valuable, and how to get started on your coding journey.",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      duration: "15 minutes",
      difficulty: "Beginner"
    },
    {
      number: 2,
      id: "variables-and-data-types",
      title: "Variables and Data Types",
      description: "Understand how to store and work with different types of data in your programs.",
      icon: Code,
      color: "text-green-600",
      bgColor: "bg-green-50",
      duration: "20 minutes",
      difficulty: "Beginner"
    },
    {
      number: 3,
      id: "control-flow",
      title: "Control Flow: Making Decisions",
      description: "Learn how to make your programs respond to different conditions using if statements and loops.",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      duration: "25 minutes",
      difficulty: "Beginner"
    },
    {
      number: 4,
      id: "functions",
      title: "Functions: Reusable Code",
      description: "Create reusable blocks of code with functions to make your programs more organized and efficient.",
      icon: Brain,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      duration: "30 minutes",
      difficulty: "Beginner"
    },
    {
      number: 5,
      id: "arrays-and-lists",
      title: "Arrays and Lists",
      description: "Work with collections of data efficiently using arrays and lists.",
      icon: Zap,
      color: "text-red-600",
      bgColor: "bg-red-50",
      duration: "25 minutes",
      difficulty: "Beginner"
    },
    {
      number: 6,
      id: "problem-solving-basics",
      title: "Problem Solving Basics",
      description: "Learn a systematic approach to solving programming problems step by step.",
      icon: CheckCircle,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      duration: "35 minutes",
      difficulty: "Intermediate"
    }
  ];

  // Sort articles by number just in case
  const sortedArticles = articles.sort((a, b) => a.number - b.number);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Learn to <span className="text-primary">Code</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Start your programming journey with our beginner-friendly articles
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Whether you're completely new to programming or looking to refresh your knowledge, 
            these articles will guide you through essential concepts with clear explanations and examples.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Learning Articles
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedArticles.map((article) => (
              <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                <CardHeader className="pb-4">
                  <div className={`p-3 rounded-lg ${article.bgColor} w-fit mb-3`}>
                    <article.icon className={`h-6 w-6 ${article.color}`} />
                  </div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-muted-foreground font-mono text-base">{article.number}.</span>
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {article.duration}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      article.difficulty === "Beginner" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {article.difficulty}
                    </span>
                  </div>
                  <div className="mt-auto">
                    <Button 
                      asChild 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      <Link href={`/learn/${article.id}`}>
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
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
          <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-6">
            Pick any article that interests you and start your programming journey today. 
            Each article builds on the previous ones, so we recommend starting from the top.
          </p>
          <Button asChild size="lg">
            <Link href="/learn/intro-to-programming">
              Start with Introduction to Programming
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 