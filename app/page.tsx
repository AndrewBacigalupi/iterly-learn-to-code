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
    transition: { duration: 0.6, ease: "easeOut" }
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
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 mb-16 md:mb-24">
        <motion.div 
          className="max-w-4xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-8 md:mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Challenges that grow <span className="text-blue-300 italic">with</span> you.
          </motion.h1>
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
            <Button asChild size="lg">
              <Link href="/puzzles/categories">Start with Puzzles</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/learn">Learn How to Code</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            What You'll Find Here
          </motion.h2>
          <motion.p 
            className="text-lg text-center text-muted-foreground mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Learn to Scode is a platform designed to help you improve your
            programming skills through practical problem-solving and guided learning.
            Whether you're a beginner or an experienced developer, our puzzles
            and educational content will challenge you to think critically and write
            better code.
          </motion.p>
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
        </div>
      </section>

      {/* Getting Started Section */}
      <motion.section 
        className="py-12 bg-muted/50 rounded-lg"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl text-center px-6">
          <motion.h2 
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to Start Learning?
          </motion.h2>
          <motion.p 
            className="text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            You can explore all puzzles and learning content without signing in. Create
            an account to track your progress and save your solutions.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button asChild>
              <Link href="/puzzles/categories">Browse Puzzles</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/learn">Start Learning</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
