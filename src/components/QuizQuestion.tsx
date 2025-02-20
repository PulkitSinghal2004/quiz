import React from 'react';
import { Question } from '../types';
import { Timer, CheckCircle2, XCircle } from 'lucide-react';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: number;
  timeRemaining: number;
  onAnswer: (index: number) => void;
  showFeedback: boolean;
}

export function QuizQuestion({ question, selectedAnswer, timeRemaining, onAnswer, showFeedback }: QuizQuestionProps) {
  const getFeedbackStyles = (index: number) => {
    if (!showFeedback || selectedAnswer === -1) return '';
    
    if (index === question.correctAnswer) {
      return 'bg-green-100 border-green-500 text-green-700';
    }
    if (selectedAnswer === index) {
      return 'bg-red-100 border-red-500 text-red-700';
    }
    return 'opacity-50';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{question.text}</h2>
        <div className="flex items-center gap-2 text-gray-600">
          <Timer className="w-5 h-5" />
          <span className="font-mono">{timeRemaining}s</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            disabled={showFeedback}
            className={`w-full p-4 text-left rounded-lg border transition-all flex items-center justify-between
              ${selectedAnswer === index && !showFeedback ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}
              ${getFeedbackStyles(index)}`}
          >
            <span>{option}</span>
            {showFeedback && index === question.correctAnswer && (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            )}
            {showFeedback && selectedAnswer === index && index !== question.correctAnswer && (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className={`p-4 rounded-lg ${selectedAnswer === question.correctAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {selectedAnswer === question.correctAnswer ? (
            <p className="font-medium">Correct! Well done!</p>
          ) : (
            <p className="font-medium">
              Incorrect. The correct answer is: {question.options[question.correctAnswer]}
            </p>
          )}
        </div>
      )}
    </div>
  );
}