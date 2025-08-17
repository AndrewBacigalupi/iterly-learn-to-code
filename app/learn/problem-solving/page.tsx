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
            Problem-Solving
          </h1>
          <p className="text-2xl text-muted-foreground mb-12 text-center">
            How can we simplify complex problems?
          </p>

          <div className="ml-4">
            <div className="text-xl leading-relaxed mb-4">
              <p className="mb-4">
                Problem solving is at the core of computer science, and there
                are a few key concepts to keep in mind and utilize when
                approaching problems, no matter how small. The first is
                decomposition, which is one of the greatest motivators for the
                use of functions. Decomposition is the practice of breaking down
                a problem into smaller, much simpler parts that can be combined
                back together to solve the larger problem.
              </p>
              <p className="mb-4">
                For example, imagine you were tasked with creating a search
                engine like Google. Seems pretty difficult, huh? But what if you
                broke it down like this:
              </p>

              <ul className="mb-4">
                <li>• Get input from the user </li>
                <li>
                  • Search for keywords in a dataset containing the information
                  on webpages
                </li>
                <li>• Rank the results by number of times the word appears</li>
                <li>• Display the rankings in greatest to least order</li>
              </ul>
              <p className="mb-4">
                That feels much more doable, or at least I would know where to start.
                Now, each of those tasks may still seem complicated, but the
                same process could be repeated until each sub-problem is small
                enough to feel manageable. The best part about your
                problem-solving strategies is that you can control how far you
                decompose the problem. Now, functions can take on each of the
                sub-problems and the code will start to organize itself by
                sub-problem and ease the solving process.
              </p>
              <p>
                While we continue development of our own educational articles,
                we recommend checking out{" "}
                <a
                  className="underline hover:text-gray-500"
                  href="https://www.bbc.co.uk/bitesize/guides/z7ddqhv/revision/1"
                >
                  this article
                </a>{" "}
                on the problem-solving process and computational thinking. It includes a series 
                of articles that all cover related and important topics. 
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}