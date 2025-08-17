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
            <h1 className="text-4xl md:text-5xl mt-16 font-bold mb-6 text-center">
            File Input (And Even Output)
            </h1>
            <p className="text-2xl text-muted-foreground mb-12 text-center">
                Access data and information stored in various file types
            </p>

            <div className="ml-4">
                <p className="text-xl leading-relaxed mb-4">
                    The entire goal of computing, and even software development, 
                    can often be boiled down to taking some input, doing any necessary computing or 
                    processing, and producing some output, which is hopefully useful for whoever 
                    wants it. 
                </p>
                <p className="text-xl leading-relaxed mb-6">
                    There are many ways to receive input in a program or operation:
                    from the command line (terminal), from a remote or other buttons, from
                    a text entry box, from files, and countless others. Writing data to and receiving data from files is very common in 
                    real-world software because various file types allow humans to much more easily view and 
                    read information (and text files are used for almost every puzzle on this site). 
                </p>
                
                <h2 className="text-2xl font-semibold mb-2 mt-4">File Input in Your Programs</h2>

                <p className="text-xl leading-relaxed mb-4">
                    To read input from files in your own code, you are going to need 
                    to identify for your program where the file is located. For small-scale 
                    operations like these puzzles, the file (.txt for plain text file) can simply be stored in the same 
                    directory (folder) as your code file (which could be .py for Python, .c/.cpp for C/C++,
                    or .java for Java). This way, when you give the file to whatever process your language
                    requires, the filename alone can be sent and the file opener will infer that the file 
                    is in the same, or <span className="italic">current working directory</span>, as your code file. 
                </p>

                <p className="text-xl leading-relaxed mb-4">
                    Now, this file opener process is different for each language.  
                </p>
                <p className="text-xl leading-relaxed mb-4">
                    For Python, 
                    the open() function can be used and it's quite simple to 
                    iterate over the lines in the file. Learn more about this process <a className="dark:hover:text-gray-600 hover:text-gray-300 underline text-gray-500 dark:text-gray-400"
                        href="https://www.w3schools.com/python/python_file_open.asp" >
                        here.
                        </a>
                </p>
                <p className="text-xl leading-relaxed mb-4">
                    For C++, you need to #include the ifstream class, which allows you to 
                    create an input file stream object that can move through the file for 
                    you. Including files or classes in C++ means that you are bringing in outside 
                    code that will allow you to perform more complicated tasks without writing the code yourself. 
                    These are used all the time in development and in this case, you are "including" the standard way of 
                    reading text file input in C++ into your program. It is most convenient to use the >> operator to bring the next
                    piece of input from the file (excluding whitespace). Learn more about C++'s slightly more complicated
                    process for file input/output <a className="dark:hover:text-gray-600 hover:text-gray-300 underline text-gray-500 dark:text-gray-400"
                        href="https://www.geeksforgeeks.org/cpp/file-handling-c-classes/" >
                        here
                    </a> from GeeksForGeeks, <a className="dark:hover:text-gray-600 hover:text-gray-300 underline text-gray-500 dark:text-gray-400"
                        href="https://www.w3schools.com/python/python_file_open.asp" >
                        here
                    </a> from W3Schools, and even a video <a className="dark:hover:text-gray-600 hover:text-gray-300 underline text-gray-500 dark:text-gray-400"
                        href="https://www.youtube.com/watch?v=wVhCnzFwxt4" >
                        here.
                    </a> 
                    
                </p>
                <p className="text-xl leading-relaxed mb-4">
                    In Java, the file input process uses what are called Object Scanners, which are Java's
                    equivalent of an input stream. The Scanner, File, and FileNotFoundException classes must be 
                    imported into your program, and then text files can be iterated over and read using the nextLine()
                    function. Learning Java as you take on these puzzles? Learn more about this process <a className="dark:hover:text-gray-600 hover:text-gray-300 underline text-gray-500 dark:text-gray-400"
                        href="https://www.w3schools.com/java/java_files_read.asp" >
                        here.
                        </a>
                </p>
                
                <h2 className="text-2xl font-semibold mb-2 mt-4">Output, Too?</h2> 
                <p className="text-xl leading-relaxed mb-4">
                    File input is going to be far more important for solving these puzzles, but file output
                    is also an important tool for working with file data. Most languages support processes
                    that are very similar to input for output and writing to files. For example, Python has 
                    a write() function like its read(), and C++ has ofstreams, which are Output File Streams 
                    and work just like ifstreams, Input File Streams. Learn more about Python writing <a className="dark:hover:text-gray-600 hover:text-gray-300 underline text-gray-500 dark:text-gray-400"
                        href="https://www.pythonmorsels.com/creating-and-writing-file-python/" >
                        here
                    </a>, C++ ofstreams <a className="dark:hover:text-gray-600 hover:text-gray-300 underline text-gray-500 dark:text-gray-400"
                        href="https://www.w3schools.com/cpp/ref_fstream_ofstream.asp" >
                        here
                    </a>, and Java file output   <a className="dark:hover:text-gray-600 hover:text-gray-300 underline text-gray-500 dark:text-gray-400"
                        href="https://www.w3schools.com/java/java_files_create.asp" >
                        here
                    </a>
                </p>
                <h2 className="text-2xl font-semibold mb-6 mt-6">Happy Input and Outputting!</h2>
            </div>
            
        </div>
        

        
      </div>
    </div>
  );
}