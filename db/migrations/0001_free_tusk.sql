ALTER TABLE "puzzles" RENAME COLUMN "expected_output" TO "answer";--> statement-breakpoint
ALTER TABLE "puzzle_submissions" RENAME COLUMN "input" TO "example_input";--> statement-breakpoint
ALTER TABLE "puzzle_submissions" RENAME COLUMN "expected_output" TO "answer";--> statement-breakpoint
ALTER TABLE "puzzle_submissions" ADD COLUMN "real_input" text NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN "id";