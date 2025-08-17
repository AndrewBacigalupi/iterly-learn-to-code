import { pgTable, unique, text, timestamp, uuid, boolean, foreignKey, integer, jsonb, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { InferSelectModel } from "drizzle-orm";



export const verificationTokens = pgTable("verification_tokens", {
	identifier: text().notNull(),
	token: text().notNull(),
	expires: timestamp().notNull(),
}, (table) => [
	unique("verification_tokens_token_unique").on(table.token),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text(),
	email: text().notNull(),
	emailVerified: timestamp(),
	image: text(),
	isAdmin: boolean("is_admin").default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const accounts = pgTable("accounts", {
	userId: uuid("user_id").notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text("provider_account_id").notNull(),
	refresh_token: text("refresh_token"),
	access_token: text("access_token"),
	expires_at: integer("expires_at"),
	token_type: text("token_type"),
	scope: text(),
	id_token: text("id_token"),
	session_state: text("session_state"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "accounts_userId_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "accounts_user_id_users_id_fk"
		}).onDelete("cascade"),
]);


export const puzzleCompletions = pgTable("puzzle_completions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	puzzleId: uuid("puzzle_id").notNull(),
	solution: text().notNull(),
	title: text().notNull().default("Unknown Puzzle"),
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
	expires: timestamp().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "sessions_user_id_users_id_fk"
		}).onDelete("cascade"),
]);


export const puzzles = pgTable("puzzles", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: text().notNull(),
	description: text().notNull(),
	difficulty: text().notNull(),
	tags: text().array(),
	example_input: text("example_input").notNull(),
	answer: text().notNull(),
	hint: text(),
	explanation: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	real_input: varchar("real_input", { length: 100 }),
	number: integer(),
	category: text()
});

export const puzzleSubmissions = pgTable("puzzle_submissions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	title: text().notNull(),
	description: text().notNull(),
	difficulty: text().notNull(),
	answer: text("answer").notNull(),
	hint: text(),
	explanation: text(),
  	real_input: text("real_input").notNull(),
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

export type PuzzleSubmission = InferSelectModel<typeof puzzleSubmissions>;
export type Puzzle = InferSelectModel<typeof puzzles>;
