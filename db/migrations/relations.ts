import { relations } from "drizzle-orm/relations";
import { users, accounts, problemSubmissions, problems, puzzleCompletions, puzzles, sessions, problemSubmissionsContrib, puzzleSubmissions } from "@/lib/db/schema";

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
	problemSubmissions: many(problemSubmissions),
	puzzleCompletions: many(puzzleCompletions),
	sessions: many(sessions),
	problemSubmissionsContribs_userId: many(problemSubmissionsContrib, {
		relationName: "problemSubmissionsContrib_userId_users_id"
	}),
	problemSubmissionsContribs_reviewedBy: many(problemSubmissionsContrib, {
		relationName: "problemSubmissionsContrib_reviewedBy_users_id"
	}),
	puzzleSubmissions_userId: many(puzzleSubmissions, {
		relationName: "puzzleSubmissions_userId_users_id"
	}),
	puzzleSubmissions_reviewedBy: many(puzzleSubmissions, {
		relationName: "puzzleSubmissions_reviewedBy_users_id"
	}),
}));

export const problemSubmissionsRelations = relations(problemSubmissions, ({one}) => ({
	user: one(users, {
		fields: [problemSubmissions.userId],
		references: [users.id]
	}),
	problem: one(problems, {
		fields: [problemSubmissions.problemId],
		references: [problems.id]
	}),
}));

export const problemsRelations = relations(problems, ({many}) => ({
	problemSubmissions: many(problemSubmissions),
	problemSubmissionsContribs: many(problemSubmissionsContrib),
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

export const problemSubmissionsContribRelations = relations(problemSubmissionsContrib, ({one}) => ({
	user_userId: one(users, {
		fields: [problemSubmissionsContrib.userId],
		references: [users.id],
		relationName: "problemSubmissionsContrib_userId_users_id"
	}),
	user_reviewedBy: one(users, {
		fields: [problemSubmissionsContrib.reviewedBy],
		references: [users.id],
		relationName: "problemSubmissionsContrib_reviewedBy_users_id"
	}),
	problem: one(problems, {
		fields: [problemSubmissionsContrib.publishedProblemId],
		references: [problems.id]
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