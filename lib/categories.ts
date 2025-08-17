import { 
  BookOpen, 
  Code,
  Brain,
  Zap,
  Target,
  Calculator,
  Puzzle,
  TreePine,
  Network,
  Database,
  LucideIcon
} from "lucide-react";

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  difficulty: string;
  puzzleCount: number;
}

// Icon and styling mappings for different categories
const categoryMappings: Record<string, {
  icon: LucideIcon;
  color: string;
  bgColor: string;
  difficulty: string;
  description: string;
}> = {
  "Basics": {
    icon: BookOpen,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    difficulty: "Beginner",
    description: "Start your puzzle-solving journey with fundamental programming concepts. These puzzles focus on basic logic, variables, and simple algorithms."
  },
  "Algorithms": {
    icon: Code,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950",
    difficulty: "Intermediate",
    description: "Dive into algorithmic thinking with sorting, searching, and optimization problems."
  },
  "Data Structures": {
    icon: Database,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950",
    difficulty: "Intermediate",
    description: "Master arrays, linked lists, trees, graphs, and other fundamental data structures."
  },
  "Math": {
    icon: Calculator,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950",
    difficulty: "Intermediate",
    description: "Mathematical puzzles involving number theory, geometry, and computational mathematics."
  },
  "Logic": {
    icon: Brain,
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-50 dark:bg-pink-950",
    difficulty: "Beginner",
    description: "Pure logic puzzles that test your reasoning and problem-solving skills."
  },
  "Optimization": {
    icon: Zap,
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-950",
    difficulty: "Advanced",
    description: "Complex optimization problems requiring efficient algorithms and clever solutions."
  },
  "Graph Theory": {
    icon: Network,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-50 dark:bg-indigo-950",
    difficulty: "Advanced",
    description: "Explore graphs, trees, and network-based problems with traversal and pathfinding."
  },
  "Dynamic Programming": {
    icon: Target,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950",
    difficulty: "Advanced",
    description: "Master the art of breaking down complex problems into simpler subproblems."
  },
  "Trees": {
    icon: TreePine,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950",
    difficulty: "Intermediate",
    description: "Binary trees, BSTs, and tree traversal algorithms."
  }
};

// Default category for unknown categories
const defaultCategoryMapping = {
  icon: Puzzle,
  color: "text-gray-600 dark:text-gray-400",
  bgColor: "bg-gray-50 dark:bg-gray-950",
  difficulty: "Mixed",
  description: "A collection of diverse puzzles to challenge your problem-solving skills."
};

// Helper function to get category by id (slug)
export function getCategoryById(id: string): Category | undefined {
  // Convert slug back to title (e.g., "data-structures" -> "Data Structures")
  const title = id.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  const mapping = categoryMappings[title] || defaultCategoryMapping;
  
  return {
    id,
    title,
    description: mapping.description,
    icon: mapping.icon,
    color: mapping.color,
    bgColor: mapping.bgColor,
    difficulty: mapping.difficulty,
    puzzleCount: 0 // This will be filled in by the calling function
  };
}

// Helper function to convert category title to URL-friendly slug
export function categoryToSlug(categoryName: string): string {
  return categoryName.toLowerCase().replace(/\s+/g, '-');
}

// Helper function to generate categories from database stats
export function getCategoriesWithCounts(categoryStats: { category: string | null; count: number }[]): Category[] {
  return categoryStats
    .filter(stat => stat.category !== null) // Filter out null categories
    .map(stat => {
      const categoryName = stat.category!;
      const slug = categoryToSlug(categoryName);
      const mapping = categoryMappings[categoryName] || defaultCategoryMapping;
      
      return {
        id: slug,
        title: categoryName,
        description: mapping.description,
        icon: mapping.icon,
        color: mapping.color,
        bgColor: mapping.bgColor,
        difficulty: mapping.difficulty,
        puzzleCount: stat.count
      };
    })
    .sort((a, b) => {
      // Sort by difficulty order: Beginner -> Intermediate -> Advanced -> Mixed
      const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'Mixed': 4 };
      const aOrder = difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 5;
      const bOrder = difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 5;
      
      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }
      
      // If same difficulty, sort alphabetically
      return a.title.localeCompare(b.title);
    });
}