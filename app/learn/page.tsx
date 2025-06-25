import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { getArticles, getArticleIcon } from "@/lib/articles";

export default function LearnPage() {
  const articles = getArticles();

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
      {/* Hero Section */}
      <section className="text-center py-8 sm:py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
            Let's <span className="text-blue-300 italic">Learn</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4 sm:mb-8">
            Start your programming journey with our beginner-friendly articles
          </p>
          <p className="text-base sm:text-lg text-muted-foreground mb-2 max-w-3xl mx-auto">
            Whether you're completely new to programming or looking to refresh your knowledge, 
            these articles will guide you through essential concepts with clear explanations and examples.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4 sm:gap-6">
            {articles.map((article) => {
              const IconComponent = getArticleIcon(article.icon);
              
              return (
                <Card key={article.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
                      <div className="flex flex-row sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full">
                        <div className={`p-3 sm:p-4 rounded-lg ${
                          article.bgColor === 'bg-blue-50' ? 'bg-blue-50 dark:bg-blue-950' :
                          article.bgColor === 'bg-green-50' ? 'bg-green-50 dark:bg-green-950' :
                          article.bgColor === 'bg-purple-50' ? 'bg-purple-50 dark:bg-purple-950' :
                          article.bgColor === 'bg-orange-50' ? 'bg-orange-50 dark:bg-orange-950' :
                          article.bgColor === 'bg-indigo-50' ? 'bg-indigo-50 dark:bg-indigo-950' :
                          'bg-gray-50 dark:bg-gray-800'
                        }`}>
                          <IconComponent className={`h-7 w-7 sm:h-8 sm:w-8 ${
                            article.color === 'text-blue-600' ? 'text-blue-600 dark:text-blue-400' :
                            article.color === 'text-green-600' ? 'text-green-600 dark:text-green-400' :
                            article.color === 'text-purple-600' ? 'text-purple-600 dark:text-purple-400' :
                            article.color === 'text-orange-600' ? 'text-orange-600 dark:text-orange-400' :
                            article.color === 'text-indigo-600' ? 'text-indigo-600 dark:text-indigo-400' :
                            'text-gray-600 dark:text-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg sm:text-2xl mb-1 sm:mb-2 flex items-center gap-2">
                            <span className="text-muted-foreground font-mono text-base sm:text-lg">{article.number}.</span>
                            {article.title}
                          </CardTitle>
                          <CardDescription className="text-sm sm:text-base mb-2 sm:mb-3 mr-0 sm:mr-4 ">
                            {article.description}
                          </CardDescription>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{article.duration}</span>
                            </div>
                            <Badge variant="secondary">{article.difficulty}</Badge>
                          </div>
                        </div>
                      </div>
                      <Button 
                        asChild 
                        size="lg"
                        className="w-full sm:w-auto mt-3 sm:mt-0 group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        <Link href={`/learn/${article.id}`}>
                          Read Article
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 sm:py-12 text-center bg-muted/30 rounded-lg mt-6">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-4 sm:mb-6 text-base sm:text-lg">
            Begin with the first article and work your way through the fundamentals!
          </p>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href={`/learn/${articles[0]?.id}`}>
              Start Learning
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 