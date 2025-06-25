import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  Code, 
  Brain, 
  Zap, 
  Target,
  Clock,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles, getArticleById, getArticleIcon } from "@/lib/articles";
import React from "react";

type tParams = Promise<{ article: string }>;

export default async function ArticlePage({
  params,
}: {
  params: tParams;
}) {
  const { article } = await params;

  const articles = getArticles();
  const articleData = getArticleById(article);

  if (!articleData) {
    notFound();
  }

  // Find next article
  const nextArticle = articles.find((a) => a.number === articleData.number + 1);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/learn">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Learn
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className={`p-4 rounded-lg ${
            articleData.bgColor === 'bg-blue-50' ? 'bg-blue-50 dark:bg-blue-950' :
            articleData.bgColor === 'bg-green-50' ? 'bg-green-50 dark:bg-green-950' :
            articleData.bgColor === 'bg-purple-50' ? 'bg-purple-50 dark:bg-purple-950' :
            articleData.bgColor === 'bg-orange-50' ? 'bg-orange-50 dark:bg-orange-950' :
            articleData.bgColor === 'bg-indigo-50' ? 'bg-indigo-50 dark:bg-indigo-950' :
            'bg-gray-50 dark:bg-gray-800'
          }`}>
            {React.createElement(getArticleIcon(articleData.icon), {
              className: `h-12 w-12 ${
                articleData.color === 'text-blue-600' ? 'text-blue-600 dark:text-blue-400' :
                articleData.color === 'text-green-600' ? 'text-green-600 dark:text-green-400' :
                articleData.color === 'text-purple-600' ? 'text-purple-600 dark:text-purple-400' :
                articleData.color === 'text-orange-600' ? 'text-orange-600 dark:text-orange-400' :
                articleData.color === 'text-indigo-600' ? 'text-indigo-600 dark:text-indigo-400' :
                'text-gray-600 dark:text-gray-400'
              }`,
            })}
          </div>
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-2">
              <span className="text-muted-foreground font-mono text-2xl">
                {articleData.number}.
              </span>
              {articleData.title}
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              {articleData.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{articleData.duration}</span>
          </div>
          <Badge variant="secondary">{articleData.difficulty}</Badge>
        </div>
      </div>

      {/* Article Content */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Article Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: articleData.content }}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button asChild variant="outline">
          <Link href="/learn">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learn
          </Link>
        </Button>
        {nextArticle ? (
          <Button asChild>
            <Link href={`/learn/${nextArticle.id}`}>
              Next Topic
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" disabled>
            End of Topics
          </Button>
        )}
      </div>
    </div>
  );
} 