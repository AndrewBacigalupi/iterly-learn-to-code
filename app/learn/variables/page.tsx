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

export default function LearnPage() {

  return (
     <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <Button>
          <Link href="/learn">← Back to Articles</Link>
        </Button>
        <div>
            <h1 className="text-4xl md:text-5xl mt-10 font-bold mb-6 text-center">
            Variables
            </h1>
            <p className="text-2xl text-muted-foreground mb-12 text-center">
                Store essential data and information that could change
            </p>

            <div className="ml-4">
                <p className="text-xl leading-relaxed mb-4">
                    A variable, in its purest mathematical form, is something that changes. In computer science, 
                    a variable is a location in memory that holds data of some kind, or type, such as an integer (whole number),
                    a string (word/collection of characters), or boolean (either true or false). These values can be changed or 
                    kept untouched, but the fact that we can store information for later use in our programs is one of 
                    the most profound and powerful in computer science.
                    <br />
                    <br />
                    While we continue development of our own educational articles, 
                    we recommend checking out <a className="underline hover:text-gray-500" href="https://www.w3schools.com/programming/prog_variables.php">this article</a> on variables more generally 
                    and <a className="underline hover:text-gray-500" href="https://www.w3schools.com/programming/prog_data_types.php">this other article</a> by the same authors that explains data types, the categories into which different variables fall. 
                </p>
                
            </div>
            
        </div>
        

        
      </div>
    </div>
  );
}