"use client";

import { useRouter } from "next/navigation";
import { puzzles } from "../../puzzleData";
import { Button } from "@/components/ui/button";

export default function PuzzlesList() {
  const router = useRouter();

  const goToPuzzle = (id) => {
    router.push(`/puzzles/${id}`);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold mb-6">Riga Puzzle Quest</h1>
      <p className="mb-4">Valitse puzzle siirtyäksesi siihen:</p>

      <div className="flex flex-col gap-3">
        {puzzles.map((puzzle, index) => {
          const puzzleId = index + 1;
          const solved = localStorage.getItem(`puzzle-${puzzleId}-solved`) === "true";
          return (
            <Button
              key={puzzleId}
              onClick={() => goToPuzzle(puzzleId)}
              className={solved ? "bg-green-600 hover:bg-green-700" : ""}
            >
              Puzzle {puzzleId} {solved ? "(Solved)" : ""}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
