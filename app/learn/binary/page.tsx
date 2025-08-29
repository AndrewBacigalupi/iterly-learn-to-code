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
  Binary
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
            Binary Numbers
            </h1>
            <p className="text-2xl text-muted-foreground mb-12 text-center">
            The foundation of computing
            </p>

            <div className="ml-4">
                <p className="text-xl leading-relaxed mb-4">
                    A binary number is a number, just like the numbers we know and love, 
                    only it’s constructed using a base-2 system instead of our traditional 
                    base-10. Our base-10, or decimal, system has 10 possible values (0-9), 
                    and binary only has 2 (0 or 1). Base-2, or binary, is the language of computers. 
                    To understand a little more about why this is, check out <a className="underline hover:text-gray-500" href="https://www.youtube.com/watch?v=Xpk67YzOn5w">this video</a>.
                     
                </p>
                <p className="text-xl leading-relaxed mb-4">
                    It can be tricky to wrap your head 
                    around base-(something other than 10), but it’s important to know 
                    that the place values of a base-n system come in powers of n. 
                    This means that base-10 has a 1s place (10^0), a 10s place (10^1), 
                    a 100s place (10^2), and so on. This means that the furthest 
                    right digit of a binary number is the 1s place (2^0), then 
                    the 2s place (2^1), then the 4s place (2^2), then the 8s 
                    place (2^3), and so on. (If you are feeling like reviewing 
                    your powers of 2, now may be a good time to do that - it’s 
                    crucial to know them, or at least the first 10).
                </p>
                <p className="text-xl leading-relaxed mb-4">
                    An easy way to see the connection between decimal numbers and base-10 
                    is to sum each place value that is holding a 1 in the binary 
                    number. If the 16s place is 1, or sometimes called “on” because 
                    binary 1s and 0s represent transistors that either allow 
                    electricity or stop it, then 16 is added to the total. To put 
                    it all together: the binary number 11011 is converted to decimal: 
                    1 in the 1s place so add 1, 1 in the 2s place so add 2, 0 in the 
                    4s place, 1 in the 8s place so add 8, and 1 in the 16s place so 
                    add 16. The number is then 1 + 2 + 8 + 16 = 27. Decimal 27 is 11011. 

                </p>
                <p className="text-xl leading-relaxed mb-4">
                    To get another explanation and learn more, we recommend checking out <a className="underline hover:text-gray-500" href="https://www.aleksandrhovhannisyan.com/blog/binary-for-beginners/">this article</a>.

                </p>
                
            </div>
            
        </div>
        

        
      </div>
    </div>
  );
}