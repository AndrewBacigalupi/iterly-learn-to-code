import articlesData from './articles.json';
import { 
  BookOpen, 
  Code, 
  Brain, 
  Zap, 
  Target,
  LucideIcon
} from "lucide-react";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Code,
  Brain,
  Zap,
  Target,
};

export interface Article {
  number: number;
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  duration: string;
  difficulty: string;
  content: string;
}

export function getArticles(): Article[] {
  return articlesData as Article[];
}

export function getArticleById(id: string): Article | undefined {
  return getArticles().find(article => article.id === id);
}

export function getArticleIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || BookOpen;
} 