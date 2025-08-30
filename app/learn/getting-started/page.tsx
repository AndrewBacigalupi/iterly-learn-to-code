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

        <h1 className="text-2xl md:text-5xl mt-10 font-bold mb-6 text-center">
          Getting Started
        </h1>
        <p className="text-2xl text-muted-foreground mb-12 text-center">
          Get set up and start solving puzzles
        </p>

        <p className="text-xl leading-relaxed mb-4">Welcome!</p>

        <p className="text-xl leading-relaxed mb-8">
          To write and edit our code, we are going to need a text editor, and
          not just your average Word document or Note. Programmers have designed
          special code editing environments called IDEs, or Integrated
          Development Environments, that allow other programmers, like us, to
          more easily read, write, and work with our code.
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Choosing an IDE</h2>
          <p className="text-xl leading-relaxed mb-4">
            There are tons of IDEs to choose from, and there are two important
            types to distinguish.
          </p>
          <p className="text-xl leading-relaxed">
            The first is online IDEs, which allow coders to quickly write code
            and run it in the browser, with as little setup as possible. You can
            essentially search "[your language of choice] online IDE" and one
            will pop up. Here are some good online IDEs for&nbsp;
            <a
              className="underline hover:text-gray-500"
              href="https://www.online-python.com/"
            >
              Python
            </a>
            ,&nbsp;
            <a
              className="underline hover:text-gray-500"
              href="https://www.jdoodle.com/online-java-compiler"
            >
              Java
            </a>
            ,&nbsp;
            <a
              className="underline hover:text-gray-500"
              href="https://www.onlinegdb.com/online_c++_compiler"
            >
              C++
            </a>
            ,&nbsp;
            <a
              className="underline hover:text-gray-500"
              href="https://playcode.io/javascript"
            >
              JavaScript
            </a>
            ,&nbsp;
            <a
              className="underline hover:text-gray-500"
              href="https://www.jdoodle.com/compile-c-sharp-online"
            >
              C#
            </a>
            , and many more.
          </p>
        </div>

        <div className=" leading-relaxed text-xl mb-8">
          <p>
            Almost no serious programmers use these IDEs, however, because they
            lack one important quality: file storage. If you reload the page,
            your files may disappear! For this reason, programmers favor desktop
            IDEs (meaning actual applications), which open files from your
            computer's file manager (Finder on Mac or File Explorer on Windows).
            These files are then stored in your computer for later use. Some of
            the most popular are{" "}
            <a
              className="underline hover:text-gray-500"
              href="https://code.visualstudio.com/download"
            >
              VSCode
            </a>{" "}
            (any language),{" "}
            <a
              className="underline hover:text-gray-500"
              href="https://www.jetbrains.com/pycharm/"
            >
              PyCharm
            </a>{" "}
            (Python),{" "}
            <a
              className="underline hover:text-gray-500"
              href="https://www.jetbrains.com/idea/download/"
            >
              IntelliJ
            </a>{" "}
            (Java),{" "}
            <a
              className="underline hover:text-gray-500"
              href="https://www.jetbrains.com/clion/"
            >
              CLion
            </a>{" "}
            (C/C++), and{" "}
            <a
              className="underline hover:text-gray-500"
              href="https://atom-editor.cc/"
            >
              Atom
            </a>{" "}
            (any language).
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">What Next?</h3>
          <p className="text-xl mb-7 ">
            Once you choose a language and an IDE, you're ready to begin solving
            puzzles. To access the input data, you can place it in a text file
            that lives in the same directory (folder) as your code file. Your
            code file may be called code.py, and you would make a text (.txt)
            file right next to it called data.txt. Then, you can open that
            content using your code. The general workflow goes like this:
          </p>
          <ul className="text-xl font-bold leading-relaxed">
            <li>• Read through the puzzle, repeating until it makes sense.</li>
            <li>
              • Verify that the result you expect for the example data is
              correct
            </li>
            <li>
              • Brainstorm an algorithm or process that can perform the
              necessary task
            </li>
            <li>
              • Code that solution for the example data, verifying that it
              produces the correct result
            </li>
            <li>
              • Substitute the real data for the example data, run your code,
              and (hopefully) find the solution!
            </li>
          </ul>
        </div>

        <p className="text-xl leading-relaxed mb-8">
          It can feel overwhelming to learn about programming - there are so
          many things to learn and it seems like everyone else understands it
          all. A lot of us that have been coding for a while can still sometimes
          feel that way, so don't let that stop you. It will only get easier and
          easier to understand.
        </p>
        <h1 className="text-2xl">You got this!</h1>
      </div>
    </div>
  );
}