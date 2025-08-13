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
            Conditionals and Control Flow
            </h1>
            <p className="text-2xl text-muted-foreground mb-12 text-center">
            Allow your code to make "decisions"
            </p>

            <div className="ml-4">
                <p className="text-xl leading-relaxed mb-4">
                    A conditional statement allows the program to execute specific, likely different, blocks of code depending on 
                    the truth of of a condition, which comes in the form of a boolean variable that is either true or false. 
                    Control flow is a term that describes how specific code, often conditionals,
                    can dictate which code runs when, or <span className="italic">control the flow</span> of the code. 
                    
                </p>
                <p className="text-xl leading-relaxed mb-4">
                    While we continue development of our own educational articles, 
                    we recommend checking out <a className="underline"href="https://www.geeksforgeeks.org/dsa/conditional-statements-in-programming/">this article</a> on conditionals and control flow. 
                </p>
            </div>
            
        </div>
        

        
      </div>
    </div>
  );
}