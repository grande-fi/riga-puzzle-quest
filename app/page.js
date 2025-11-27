"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const startPuzzle = () => {
    let nextPuzzle = 1;
    for (let i = 1; i <= 14; i++) {
      if (localStorage.getItem(`puzzle-${i}-solved`) !== "true") {
        nextPuzzle = i;
        break;
      }
      // If all solved, nextPuzzle remains 15
      if (i === 14) nextPuzzle = 15;
    }

    if (nextPuzzle <= 14) {
      router.push(`/puzzles/${nextPuzzle}`);
    } else {
      router.push("/final");
    }
  };

  const resetProgress = () => {
    for (let i = 1; i <= 14; i++) {
      localStorage.removeItem(`puzzle-${i}-solved`);
    }
    alert("Progressi nollattu! 😎");
  };

  return (
    <div className="max-w-xl mx-auto mt-20 text-center">
      <h1 className="text-3xl font-bold mb-8">Riga Puzzle Quest</h1>
      
      <div className="flex flex-col gap-4">
        <Button onClick={startPuzzle}>
          Aloita Puzzle
        </Button>

        <Button onClick={resetProgress} className="bg-red-600 hover:bg-red-700">
          Reset
