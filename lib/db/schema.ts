import { relations } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// Users table for Auth.js
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").notNull().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull(),
});

export const verificationTokens = pgTable("verification_tokens", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires").notNull(),
});

// Puzzles table (Advent of Code style)
export const puzzles = pgTable("puzzles", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(), // easy, medium, hard
  tags: text("tags").array(),
  sampleInput: text("sample_input"),
  sampleOutput: text("sample_output"),
  solution: text("solution"), // Optional solution explanation
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Problems table (LeetCode style with Judge0)
export const problems = pgTable("problems", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(), // easy, medium, hard
  tags: text("tags").array(),
  testCases: jsonb("test_cases").notNull(), // Array of {input, expectedOutput}
  starterCode: jsonb("starter_code"), // Object with language as key, code as value
  solution: text("solution"), // Optional solution explanation
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User puzzle completions
export const puzzleCompletions = pgTable("puzzle_completions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  puzzleId: uuid("puzzle_id")
    .notNull()
    .references(() => puzzles.id, { onDelete: "cascade" }),
  solution: text("solution").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

// User problem submissions
export const problemSubmissions = pgTable("problem_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  problemId: uuid("problem_id")
    .notNull()
    .references(() => problems.id, { onDelete: "cascade" }),
  code: text("code").notNull(),
  language: text("language").notNull(),
  status: text("status").notNull(), // accepted, wrong_answer, time_limit_exceeded, etc.
  runtime: integer("runtime"), // in milliseconds
  memory: integer("memory"), // in KB
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  puzzleCompletions: many(puzzleCompletions),
  problemSubmissions: many(problemSubmissions),
}));

export const puzzlesRelations = relations(puzzles, ({ many }) => ({
  completions: many(puzzleCompletions),
}));

export const problemsRelations = relations(problems, ({ many }) => ({
  submissions: many(problemSubmissions),
}));

export const puzzleCompletionsRelations = relations(
  puzzleCompletions,
  ({ one }) => ({
    user: one(users, {
      fields: [puzzleCompletions.userId],
      references: [users.id],
    }),
    puzzle: one(puzzles, {
      fields: [puzzleCompletions.puzzleId],
      references: [puzzles.id],
    }),
  })
);

export const problemSubmissionsRelations = relations(
  problemSubmissions,
  ({ one }) => ({
    user: one(users, {
      fields: [problemSubmissions.userId],
      references: [users.id],
    }),
    problem: one(problems, {
      fields: [problemSubmissions.problemId],
      references: [problems.id],
    }),
  })
);
