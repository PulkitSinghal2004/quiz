import React from 'react';
import { useQuiz } from './hooks/useQuiz';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResults } from './components/QuizResults';
import { questions } from './data/questions';

function App() {
  const {
    currentQuestion,
    currentAnswer,
    timeRemaining,
    isComplete,
    showFeedback,
    progress,
    score,
    attempts,
    handleAnswer,
    handleNextQuestion,
    resetQuiz
  } = useQuiz();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {!isComplete ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Quiz Time!</h1>
                <span className="text-sm text-gray-500">
                  Question {progress.current} of {progress.total}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${(progress.current / progress.total) * 100}%`,
                  }}
                />
              </div>

              <QuizQuestion
                question={currentQuestion}
                selectedAnswer={currentAnswer}
                timeRemaining={timeRemaining}
                onAnswer={handleAnswer}
                showFeedback={showFeedback}
              />

              {!showFeedback && (
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {progress.current === progress.total ? 'Finish Quiz' : 'Skip Question'}
                </button>
              )}
            </div>
          ) : (
            <QuizResults
              score={score}
              totalQuestions={questions.length}
              attempts={attempts}
              onReset={resetQuiz}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;