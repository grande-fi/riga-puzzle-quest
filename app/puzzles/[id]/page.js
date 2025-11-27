"use client";
import { useState, useEffect } from 'react';
import { puzzles } from '../../../puzzleData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ProgressBar';
export default function Puzzle({ params }) {
  const id = Number(params.id);
  const puzzle = puzzles[id - 1];
  const storageKey = 'puzzle_' + id;
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'true') setCorrect(true);
  }, []);
  function check() {
    if (answer.trim() === String(puzzle.answer)) {
      setCorrect(true);
      localStorage.setItem(storageKey, 'true');
      window.dispatchEvent(new Event('storage'));
    }
  }
  return (<main className="max-w-xl mx-auto mt-12"><ProgressBar /><Card className="bg-gray-800 border-gray-700 mt-4"><CardHeader><CardTitle className="text-3xl text-center">Puzzle {id}</CardTitle></CardHeader><CardContent className="space-y-4"><p>{puzzle.question}</p>{!correct && (<div className="flex gap-3"><input className="text-black px-3 py-2 rounded w-full" value={answer} onChange={e => setAnswer(e.target.value)} /><Button onClick={check}>Check</Button></div>)}{correct && (<p className="text-green-400 text-xl">Correct! Digit = <strong>{puzzle.answer}</strong> (Saved)</p>)}</CardContent></Card></main>);
}