import { relations } from "drizzle-orm/relations";
import { users, accounts, puzzleCompletions, puzzles, sessions, puzzleSubmissions } from "@/lib/db/schema";

export const accountsRelations = relations(accounts, ({one}) => ({
	user_userId: one(users, {
		fields: [accounts.userId],
		references: [users.id],
		relationName: "accounts_userId_users_id"
	}),
	user_user_id: one(users, {
		fields: [accounts.userId],
		references: [users.id],
		relationName: "accounts_userId_users_id"
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	accounts_userId: many(accounts, {
		relationName: "accounts_userId_users_id"
	}),
	accounts_user_id: many(accounts, {
		relationName: "accounts_userId_users_id"
	}),
	puzzleCompletions: many(puzzleCompletions),
	sessions: many(sessions),
	
	puzzleSubmissions_userId: many(puzzleSubmissions, {
		relationName: "puzzleSubmissions_userId_users_id"
	}),
	puzzleSubmissions_reviewedBy: many(puzzleSubmissions, {
		relationName: "puzzleSubmissions_reviewedBy_users_id"
	}),
}));


export const puzzleCompletionsRelations = relations(puzzleCompletions, ({one}) => ({
	user: one(users, {
		fields: [puzzleCompletions.userId],
		references: [users.id]
	}),
	puzzle: one(puzzles, {
		fields: [puzzleCompletions.puzzleId],
		references: [puzzles.id]
	}),
}));

export const puzzlesRelations = relations(puzzles, ({many}) => ({
	puzzleCompletions: many(puzzleCompletions),
	puzzleSubmissions: many(puzzleSubmissions),
}));

export const sessionsRelations = relations(sessions, ({one}) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	}),
}));

export const puzzleSubmissionsRelations = relations(puzzleSubmissions, ({one}) => ({
	user_userId: one(users, {
		fields: [puzzleSubmissions.userId],
		references: [users.id],
		relationName: "puzzleSubmissions_userId_users_id"
	}),
	user_reviewedBy: one(users, {
		fields: [puzzleSubmissions.reviewedBy],
		references: [users.id],
		relationName: "puzzleSubmissions_reviewedBy_users_id"
	}),
	puzzle: one(puzzles, {
		fields: [puzzleSubmissions.publishedPuzzleId],
		references: [puzzles.id]
	}),
}));