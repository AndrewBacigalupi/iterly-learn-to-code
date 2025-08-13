"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, Puzzle, Trophy, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardAnimation = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  return (
    <div>
    <div className="container mx-auto px-4 py-8 justify-center max-w-4xl">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 mb-16 md:mb-24">
        <motion.div
          className="max-w-4xl mx-auto px-4"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }} 
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight mb-8 md:mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Challenges that grow{" "}
            <span className="text-blue-300 italic">with</span> you.
          </motion.h1>
          <motion.h2
            className="text-3l md:text-4xl  mb-4 md:mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Line by <span className="text-blue-300 italic">line</span>, puzzle
            by <span className="text-blue-300 italic">puzzle</span>.
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-12 md:mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Master programming through hands-on puzzles and structured learning
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button asChild size="xl">
              <Link href="/puzzles/categories" className="text-xl">
                Start with Puzzles
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link href="/learn" className="text-xl">
                Learn How to Code
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}

      <section className="py-12">
      <motion.div
        className="max-w-4xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
      >
        <motion.h1
         className="text-4xl tracking-tight font-bold text-center mb-8 md:mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0. }}
        >
          What You'll Find Here
        </motion.h1>

        <motion.p
          className="text-xl leading-relaxed mb-8"
          variants={fadeInUp}
        >
          <span className="font-bold">Iterly</span> is a beginner learn-to-code site
          that features puzzles with large-scale input data, giving new coders
          hands-on and real-world practice. Our puzzles focus on fundamental
          computer science principles, logical reasoning, and pattern recognition —
          skills that are critical for programmers.
        </motion.p>

        <motion.p
          className="text-xl leading-relaxed mb-8"
          variants={fadeInUp}
        >
          Learning to code can be a challenging process, but we hope you take it
          step-by-step, line-by-line, puzzle-by-puzzle — giving yourself the chance
          to make mistakes, practice, improve, and grow. Just as your code
          iterates over repeated actions, your learning will be an iterative
          process. Together, let's learn{" "}
          <span className=" ml-0.5 text-blue-300 font-bold italic">iterly</span>.
        </motion.p>
      </motion.div>
    </section>



       <section className="mb-20 ml-6 mr-10">
        <motion.div 
            className="grid md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={cardAnimation}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Puzzle className="h-5 w-5 text-primary mb-2" />
                    Advent of Code Style Puzzles
                  </CardTitle>
                  <CardDescription>
                    Challenge yourself with creative problem-solving puzzles that
                    test your logic and algorithmic thinking.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Solve puzzles at your own pace</li>
                    <li>• Paste your solutions to track progress</li>
                    <li>• View explanations and alternative approaches</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardAnimation}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Structured Learning Path
                  </CardTitle>
                  <CardDescription>
                    Follow our carefully crafted educational content designed to
                    build your skills progressively.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Beginner-friendly articles and tutorials</li>
                    <li>• Progressive difficulty levels</li>
                    <li>• Clear explanations and examples</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardAnimation}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 mb-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Track Your Progress
                  </CardTitle>
                  <CardDescription>
                    Sign in to save your solutions and monitor your improvement
                    over time.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Save completed puzzles</li>
                    <li>• View your solution history</li>
                    <li>• Track your learning journey</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardAnimation}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-primary" />
                    Community Driven
                  </CardTitle>
                  <CardDescription>
                    Help grow the platform by contributing new puzzles and
                    improvements.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Open source and collaborative</li>
                    <li>• Submit your own puzzles</li>
                    <li>• Help improve the platform</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>  
      </section>
    

    <section className="mb-20">
          <div {...fadeInUp} className="mb-6">
            <p className="text-xl leading-relaxed">
              Iterly is about puzzles, not programming languages. That means it’s up to you which
              language you want to learn. Your language, your goals, your learning.
            </p>
          </div>

          <div {...fadeInUp} className="rounded-lg mb-6">
            <p className="text-xl">
              Don’t worry if you don’t understand everything at first. Programming is learned through
              practice and experimentation!
            </p>
          </div>

          <div {...fadeInUp} className="mb-4">
            <p className="text-xl">
              Our{" "}
              <Link href="/learn/getting-started" className="underline">
                first article
              </Link>{" "}
              explains how to get set up and start solving puzzles. 
              <br />
              <br />
              Good luck, and thanks for being here!
            </p>
          </div>
    </section>


    




    </div>
   
    </div>

  );
}
