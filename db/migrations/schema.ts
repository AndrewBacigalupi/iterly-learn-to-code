import { pgTable, unique, text, timestamp, uuid, boolean, foreignKey, integer, jsonb, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const verificationTokens = pgTable("verification_tokens", {
	identifier: text().notNull(),
	token: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	unique("verification_tokens_token_unique").on(table.token),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text(),
	email: text().notNull(),
	emailVerified: timestamp({ mode: 'string' }),
	image: text(),
	isAdmin: boolean("is_admin").default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const accounts = pgTable("accounts", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text("provider_account_id").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text(),
	idToken: text("id_token"),
	sessionState: text("session_state"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "accounts_user_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const problemSubmissions = pgTable("problem_submissions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	problemId: uuid("problem_id").notNull(),
	code: text().notNull(),
	language: text().notNull(),
	status: text().notNull(),
	runtime: integer(),
	memory: integer(),
	submittedAt: timestamp("submitted_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "problem_submissions_user_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.problemId],
			foreignColumns: [problems.id],
			name: "problem_submissions_problem_id_problems_id_fk"
		}).onDelete("cascade"),
]);

export const problems = pgTable("problems", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: text().notNull(),
	description: text().notNull(),
	difficulty: text().notNull(),
	tags: text().array(),
	functionName: text("function_name"),
	testCases: jsonb("test_cases").notNull(),
	starterCode: jsonb("starter_code"),
	solution: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const puzzleCompletions = pgTable("puzzle_completions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	puzzleId: uuid("puzzle_id").notNull(),
	solution: text().notNull(),
	completedAt: timestamp("completed_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "puzzle_completions_user_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.puzzleId],
			foreignColumns: [puzzles.id],
			name: "puzzle_completions_puzzle_id_puzzles_id_fk"
		}).onDelete("cascade"),
]);

export const sessions = pgTable("sessions", {
	sessionToken: text("session_token").primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "sessions_user_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const problemSubmissionsContrib = pgTable("problem_submissions_contrib", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	title: text().notNull(),
	description: text().notNull(),
	difficulty: text().notNull(),
	tags: text().array(),
	functionName: text("function_name"),
	testCases: jsonb("test_cases").notNull(),
	starterCode: jsonb("starter_code"),
	solution: text(),
	status: text().default('pending').notNull(),
	adminNotes: text("admin_notes"),
	submittedAt: timestamp("submitted_at", { mode: 'string' }).defaultNow().notNull(),
	reviewedAt: timestamp("reviewed_at", { mode: 'string' }),
	reviewedBy: uuid("reviewed_by"),
	publishedProblemId: uuid("published_problem_id"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "problem_submissions_contrib_user_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.reviewedBy],
			foreignColumns: [users.id],
			name: "problem_submissions_contrib_reviewed_by_users_id_fk"
		}),
	foreignKey({
			columns: [table.publishedProblemId],
			foreignColumns: [problems.id],
			name: "problem_submissions_contrib_published_problem_id_problems_id_fk"
		}),
]);

export const puzzles = pgTable("puzzles", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: text().notNull(),
	description: text().notNull(),
	difficulty: text().notNull(),
	tags: text().array(),
	exampleInput: text("example_input").notNull(),
	expectedOutput: text("expected_output").notNull(),
	hint: text(),
	explanation: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	realInput: varchar("real_input", { length: 100 }),
	number: integer(),
	exampleEx: text("example_ex"),
});

export const puzzleSubmissions = pgTable("puzzle_submissions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	title: text().notNull(),
	description: text().notNull(),
	difficulty: text().notNull(),
	tags: text().array(),
	input: text().notNull(),
	expectedOutput: text("expected_output").notNull(),
	hint: text(),
	explanation: text(),
	status: text().default('pending').notNull(),
	adminNotes: text("admin_notes"),
	submittedAt: timestamp("submitted_at", { mode: 'string' }).defaultNow().notNull(),
	reviewedAt: timestamp("reviewed_at", { mode: 'string' }),
	reviewedBy: uuid("reviewed_by"),
	publishedPuzzleId: uuid("published_puzzle_id"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "puzzle_submissions_user_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.reviewedBy],
			foreignColumns: [users.id],
			name: "puzzle_submissions_reviewed_by_users_id_fk"
		}),
	foreignKey({
			columns: [table.publishedPuzzleId],
			foreignColumns: [puzzles.id],
			name: "puzzle_submissions_published_puzzle_id_puzzles_id_fk"
		}),
]);
