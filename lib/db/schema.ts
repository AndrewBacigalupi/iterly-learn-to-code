import { relations } from "drizzle-orm";
import {
  boolean,
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
  isAdmin: boolean("is_admin").default(false).notNull(), // Admin status
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
  input: text("input").notNull(), // The puzzle input data
  expectedOutput: text("expected_output").notNull(), // The correct answer
  hint: text("hint"), // Optional hint for users
  explanation: text("explanation"), // Optional explanation after solving
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
  functionName: text("function_name"), // Name of the main function to call
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

// Puzzle submissions (for community contributions)
export const puzzleSubmissions = pgTable("puzzle_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(),
  tags: text("tags").array(),
  input: text("input").notNull(),
  expectedOutput: text("expected_output").notNull(),
  hint: text("hint"),
  explanation: text("explanation"),
  status: text("status").default("pending").notNull(), // pending, approved, rejected
  adminNotes: text("admin_notes"), // Admin feedback
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: uuid("reviewed_by").references(() => users.id),
});

// Problem submissions (for community contributions)
export const problemSubmissions_contrib = pgTable(
  "problem_submissions_contrib",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    difficulty: text("difficulty").notNull(),
    tags: text("tags").array(),
    functionName: text("function_name"),
    testCases: jsonb("test_cases").notNull(),
    starterCode: jsonb("starter_code"),
    solution: text("solution"),
    status: text("status").default("pending").notNull(), // pending, approved, rejected
    adminNotes: text("admin_notes"), // Admin feedback
    submittedAt: timestamp("submitted_at").defaultNow().notNull(),
    reviewedAt: timestamp("reviewed_at"),
    reviewedBy: uuid("reviewed_by").references(() => users.id),
  }
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  puzzleCompletions: many(puzzleCompletions),
  problemSubmissions: many(problemSubmissions),
  puzzleSubmissions: many(puzzleSubmissions),
  problemSubmissions_contrib: many(problemSubmissions_contrib),
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

export const puzzleSubmissionsRelations = relations(
  puzzleSubmissions,
  ({ one }) => ({
    user: one(users, {
      fields: [puzzleSubmissions.userId],
      references: [users.id],
    }),
    reviewer: one(users, {
      fields: [puzzleSubmissions.reviewedBy],
      references: [users.id],
    }),
  })
);

export const problemSubmissionsContribRelations = relations(
  problemSubmissions_contrib,
  ({ one }) => ({
    user: one(users, {
      fields: [problemSubmissions_contrib.userId],
      references: [users.id],
    }),
    reviewer: one(users, {
      fields: [problemSubmissions_contrib.reviewedBy],
      references: [users.id],
    }),
  })
);
