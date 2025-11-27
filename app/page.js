"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [ready, setReady] = useState(false); // ensure client-side
  const [nextPuzzle, setNextPuzzle] = useState(1);

  useEffect(() => {
    // runs only in browser
    let firstUnsolved = 1;
    for (let i = 1; i <= 14; i++) {
      if (localStorage.getItem(`puzzle-${i}-solved`) !== "true") {
        firstUnsolved = i;
        break;
      }
      if (i === 14) firstUnsolved = 15; // all solved
    }
    setNextPuzzle(firstUnsolved);
    setReady(true);
  }, []);

  const startPuzzle = () => {
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
    setNextPuzzle(1);
  };

  if (!ready) return null; // wait for client-side

  return (
    <div className="max-w-xl mx-auto mt-20 text-center">
      <h1 className="text-3xl font-bold mb-8">Riga Puzzle Quest</h1>
      
      <div className="flex flex-col gap-4">
        <Button onClick={startPuzzle}>
          Aloita Puzzle
        </Button>

        <Button onClick={resetProgress} className="bg-red-600 hover:bg-red-700">
          Reset Progress
        </Button>
      </div>
    </div>
  );
}
