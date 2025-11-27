"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressBar from '@/components/ProgressBar';
const puzzleNumbers = Array.from({ length: 14 }, (_, i) => i + 1);
export default function PuzzleList() {
  const [progress, setProgress] = useState({});
  useEffect(() => {
    const saved = {};
    puzzleNumbers.forEach(n => {
      const val = localStorage.getItem('puzzle_' + n);
      saved[n] = val === 'true';
    });
    setProgress(saved);
  }, []);
  return (<main className="max-w-2xl mx-auto mt-12 space-y-6"><h1 className="text-4xl text-center mb-6">Choose a Puzzle</h1><ProgressBar /><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{puzzleNumbers.map(n => (<Link key={n} href={`/puzzles/${n}`}><Card className={`border hover:border-blue-500 transition ${progress[n] ? 'bg-green-800 border-green-600' : 'bg-gray-800 border-gray-700'}`}><CardHeader><CardTitle className="text-center flex justify-between"><span>Puzzle {n}</span>{progress[n] ? (<span className="text-green-400 text-sm">✔</span>) : (<span className="text-red-400 text-sm">•</span>)}</CardTitle></CardHeader></Card></Link>))}</div></main>);
}