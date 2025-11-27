"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { puzzles } from "../../puzzleData";

export default function PuzzlesList() {
  const router = useRouter();
  const [solvedStatus, setSolvedStatus] = useState([]);

  useEffect(() => {
    // Run only in the browser
    const status = puzzles.map((_, index) => {
      const id = index + 1;
      return localStorage.getItem(`puzzle-${id}-solved`) === "true";
    });
    setSolvedStatus(status);
  }, []);

  const goToPuzzle = (id) => {
    router.push(`/puzzles/${id}`);
  };

  if (solvedStatus.length === 0) return null; // wait for client

  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold mb-6">Riga Puzzle Quest</h1>
      <p className="mb-4">Valitse puzzle siirtyäksesi siihen:</p>

      <div className="flex flex-col gap-3">
        {puzzles.map((puzzle, index) => {
          const puzzleId = index + 1;
          const solved = solvedStatus[index];
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
