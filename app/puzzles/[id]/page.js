"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import { useRouter } from "next/navigation";
import { puzzles } from "../../../puzzleData";

export default function PuzzlePage({ params }) {
  const { id } = params;
  const puzzleId = parseInt(id, 10);
  const router = useRouter();

  const puzzle = puzzles[puzzleId - 1]; // current puzzle
  const [answer, setAnswer] = useState("");
  const [solved, setSolved] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    // Load saved progress
    const stored = localStorage.getItem(`puzzle-${id}-solved`);
    if (stored === "true") {
      setSolved(true);
      setFeedback("OIKEIN RAKAS!!! Oot ihana. PUS!");
    }
  }, [id]);

  const checkAnswer = () => {
    if (answer.trim() === String(puzzle.answer)) {
      setSolved(true);
      localStorage.setItem(`puzzle-${id}-solved`, "true");
      setFeedback("OIKEIN RAKAS!!! Oot ihana. PUS!");
    } else {
      setFeedback("Väärin meni kulta. Yritä uudestaan tai saat pusun <3");
    }
  };

  const goToNextPuzzle = () => {
    if (puzzleId < puzzles.length) {
      router.push(`/puzzles/${puzzleId + 1}`);
    } else {
      router.push("/final");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <ProgressBar />

      <Card className={solved ? "border-green-500 shadow-green-300 shadow" : ""}>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold">Puzzle {id}</h2>

          <p className="mt-2 text-gray-300">{puzzle.question}</p>

          <input
            type="text"
            className="border p-2 w-full mt-4 rounded text-black"
            placeholder="Enter your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <Button onClick={checkAnswer} className="mt-4">
            Check Answer
          </Button>

          {/* Feedback message */}
          {feedback && (
            <p className={`mt-4 ${solved ? "text-green-400" : "text-red-400"} font-semibold`}>
              {feedback}
            </p>
          )}

          {solved && (
            <Button
              onClick={goToNextPuzzle}
              className="mt-4 bg-green-600 hover:bg-green-700"
            >
              Next Puzzle →
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
