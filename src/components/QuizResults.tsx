import { QuizAttempt } from '../types';
import { Trophy, RotateCcw, History } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  attempts: QuizAttempt[];
  onReset: () => void;
}

export function QuizResults({ score, totalQuestions, attempts, onReset }: QuizResultsProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-4xl font-bold text-blue-600">
          {score} / {totalQuestions}
        </p>
        <p className="text-gray-600 mt-2">
          {(score / totalQuestions * 100).toFixed(0)}% Correct
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-700 mb-4">
          <History className="w-5 h-5" />
          <h3 className="font-semibold">Previous Attempts</h3>
        </div>
        
        <div className="space-y-3">
          {attempts.slice().reverse().map((attempt, index) => (
            <div
              key={`${attempt.id}-${index}`}
              className="bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {new Date(attempt.timestamp).toLocaleDateString()}
                </span>
                <span className="font-semibold">
                  {attempt.score} / {totalQuestions}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
      >
        <RotateCcw className="w-5 h-5" />
        Try Again
      </button>
    </div>
  );
}