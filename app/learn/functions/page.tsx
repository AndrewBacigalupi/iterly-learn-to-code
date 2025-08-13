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
                Functions
            </h1>
            <p className="text-2xl text-muted-foreground mb-12 text-center">
                Breaking problems down into smaller, more manageable parts
            </p>

            <div className="ml-4">
                <p className="text-xl leading-relaxed mb-4">
                    A mathematical function is something that takes an input value 
                    and produces a single corresponding output. 
                    A given input <span className="italic">always</span> produces the same output. In computer science,
                    functions are conceptually similar but far less strict. Functions may take input, 
                    but they also can be run without any input. Similarly, computer science functions may return a value, 
                    but they also may only perform an action without returning a specific output value. 
                    <br />
                    <br />
                    To execute a function, its name must be "called", always with trailing () parentheses that 
                    include any input values that are being given to the function. 
                    When program’s <span className="italic">control flow</span> (order of execution) reaches a function call, someFunction(), it jumps to 
                    the function itself, runs the code in there, and then <span className="italic">returns</span> (accurate verb, eh?) to the point of the call. 
                    <br />
                    <br />
                    While we continue development of our own educational articles, 
                    we recommend checking out <a className="underline"href="https://www.w3schools.com/programming/prog_variables.php">this article</a> on variables more generally 
                    and <a className="underline" href="https://www.w3schools.com/programming/prog_data_types.php">this other article</a> by the same authors that explains data types, the categories into which different variables fall. 
                </p>
                
            </div>
            
        </div>
        

        
      </div>
    </div>
  );
}