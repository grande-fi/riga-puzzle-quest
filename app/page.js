"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

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
        <Button onClick={() => router.push("/puzzles/1")}>
          Aloita Puzzle 1
        </Button>

        <Button onClick={resetProgress} className="bg-red-600 hover:bg-red-700">
          Reset Progress
        </Button>
      </div>
    </div>
  );
}
