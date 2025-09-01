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
  CheckCircle,
  Keyboard,
  Cable
} from "lucide-react";
import Link from "next/link";
import { getArticles, getArticleIcon } from "@/lib/articles";

export default function LearnPage() {
  const articles = getArticles();

  interface Resource {
    title: string,
    link: string,
    color: string
  }

  const resources: Resource[] = [
    { 
      title: "W3 Schools", 
      link: "https://www.w3schools.com/",
      color: "green"
    },
    { 
      title: "Geeks for Geeks", 
      link: "https://www.geeksforgeeks.org/",
      color: "white"
    },
    { 
      title: "Python For Everybody", 
      link: "https://www.py4e.com/",
      color: "blue"
    },
    {
      title: "Jim's CS Topics", 
      link: "https://users.cs.utah.edu/~germain/PPS/Topics/",
      color: "red"
    },
    { 
      title: "Khan Academy - Python", 
      link: "https://www.khanacademy.org/computing/intro-to-python-fundamentals",
      color: "blue"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Let's <span className="italic text-blue-300">Learn</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're completely new to programming or looking to refresh
            your knowledge, we're here to help you understand essential concepts
            and build practical skills.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {articles.map((article) => {
              const IconComponent = getArticleIcon(article.icon);

              return (
                <Card
                  key={article.id}
                  className="h-full group transition-colors"
                >
                  <CardContent className="h-full">
                    <div className="w-full h-full flex flex-col sm:flex-row sm:items-center items-start justify-between gap-4">
                      <div className="flex w-full sm:w-auto items-start sm:items-center gap-4">
                        <div className="p-3 rounded-md bg-muted/30">
                          <IconComponent className={`h-8 w-8 ${article.color}`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="sm:text-2xl text-lg mb-1 flex items-center gap-2">
                            <span className="text-muted-foreground font-mono text-base sm:text-lg">
                              {article.number}.
                            </span>
                            {article.title}
                          </CardTitle>
                          <CardDescription className="text-sm sm:text-base">
                            {article.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Button
                        asChild
                        size="lg"
                        className="w-full sm:w-auto sm:ml-auto group-hover:bg-primary group-hover:text-primary-foreground"
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
      <section className="py-12 ">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Looking for other resources?
          </h2>
          <p className="text-muted-foreground mb-6 text-center">
            Our team recommends checking out these sites
          </p>
          <div className="text-center  ">
            <p className="mb-8">
              {resources.map((resource) => {
              return (
                <Button variant="outline" key={resource.title} className="mr-1 ml-1">
                  <a href={resource.link}>{resource.title}</a>
                </Button>
              );
            })}
            </p>
            <h2>Looking to increase your words per minute on the keyboard? 
              We recommend <a href="https://monkeytype.com/" className="italic text-yellow-400 hover:text-yellow-500 hover:underline">Monkey<span className="italic hover:underline hover:text-gray-600 text-gray-400">Type</span></a></h2>
          </div>
        </div>
      </section>
    </div>
  );
} 