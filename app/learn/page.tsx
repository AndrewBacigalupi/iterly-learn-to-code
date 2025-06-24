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
      <section className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {articles.map((article) => {
              const IconComponent = getArticleIcon(article.icon);
              
              return (
                <Card key={article.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className={`p-4 rounded-lg ${article.bgColor}`}>
                          <IconComponent className={`h-8 w-8 ${article.color}`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                            <span className="text-muted-foreground font-mono text-lg">{article.number}.</span>
                            {article.title}
                          </CardTitle>
                          <CardDescription className="text-base mb-3">
                            {article.description}
                          </CardDescription>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
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
                        className="group-hover:bg-primary group-hover:text-primary-foreground"
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
      <section className="py-12 text-center bg-muted/30 rounded-lg">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-6">
            Begin with the first article and work your way through the fundamentals!
          </p>
          <Button asChild size="lg">
            <Link href={`/learn/${articles[0]?.id}`}>
              Start Learning
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 