ALTER TABLE "puzzles" ADD COLUMN "input" text NOT NULL;--> statement-breakpoint
ALTER TABLE "puzzles" ADD COLUMN "expected_output" text NOT NULL;--> statement-breakpoint
ALTER TABLE "puzzles" ADD COLUMN "hint" text;--> statement-breakpoint
ALTER TABLE "puzzles" ADD COLUMN "explanation" text;--> statement-breakpoint
ALTER TABLE "puzzles" DROP COLUMN "sample_input";--> statement-breakpoint
ALTER TABLE "puzzles" DROP COLUMN "sample_output";--> statement-breakpoint
ALTER TABLE "puzzles" DROP COLUMN "solution";