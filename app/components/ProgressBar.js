import { useEffect, useState } from 'react';
export default function ProgressBar() {
  const total = 14;
  const [completed, setCompleted] = useState(0);
  useEffect(() => {
    const update = () => {
      let count = 0;
      for (let i = 1; i <= total; i++) {
        if (localStorage.getItem('puzzle_' + i) === 'true') count++;
      }
      setCompleted(count);
    };
    update();
    window.addEventListener('storage', update);
    return () => window.removeEventListener('storage', update);
  }, []);
  const percentage = (completed / total) * 100;
  return (<div className="w-full bg-gray-700 rounded h-6 mt-4"><div className="bg-green-500 h-6 rounded" style={{ width: `${percentage}%`, transition: 'width 0.5s' }}></div><p className="text-center mt-1">{completed}/{total} puzzles solved</p></div>);
}