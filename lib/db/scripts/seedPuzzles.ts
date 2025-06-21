import { dbExport } from "@/lib/db";
import { puzzles } from "@/lib/db/schema";
import { readFileSync } from "fs";
import 'dotenv/config';

async function seed() {
  const rawData = readFileSync("lib/db/scripts/puzzles.json", "utf-8");
  const puzzleData = JSON.parse(rawData);

  for (const puzzle of puzzleData) {
    await dbExport.insert(puzzles).values(puzzle);
  }

  console.log("Puzzle data seeded.");
}

seed().catch((e) => {
  console.error("Seeding failed:", e);
  process.exit(1);
});
