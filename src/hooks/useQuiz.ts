import { useState, useEffect } from 'react';
import { QuizState, QuizAttempt } from '../types';
import { questions } from '../data/questions';

const SECONDS_PER_QUESTION = 30;
const FEEDBACK_DELAY = 1500; // 1.5 seconds to show feedback

export function useQuiz() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: new Array(questions.length).fill(-1),
    timeRemaining: SECONDS_PER_QUESTION,
    isComplete: false,
    showFeedback: false
  });

  const [attempts, setAttempts] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem('quizAttempts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (!quizState.isComplete && quizState.timeRemaining > 0 && !quizState.showFeedback) {
      const timer = setInterval(() => {
        setQuizState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizState.timeRemaining, quizState.isComplete, quizState.showFeedback]);

  useEffect(() => {
    if (quizState.timeRemaining === 0) {
      handleNextQuestion();
    }
  }, [quizState.timeRemaining]);

  const handleAnswer = (answerIndex: number) => {
    if (quizState.isComplete || quizState.showFeedback) return;

    setQuizState(prev => ({
      ...prev,
      answers: prev.answers.map((ans, i) => 
        i === prev.currentQuestionIndex ? answerIndex : ans
      ),
      showFeedback: true
    }));

    // Automatically move to next question after showing feedback
    setTimeout(() => {
      handleNextQuestion();
    }, FEEDBACK_DELAY);
  };

  const handleNextQuestion = () => {
    setQuizState(prev => {
      const nextIndex = prev.currentQuestionIndex + 1;
      const isComplete = nextIndex >= questions.length;

      if (isComplete) {
        const score = calculateScore();
        const attempt: QuizAttempt = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          score,
          timePerQuestion: questions.map((_, i) => 
            SECONDS_PER_QUESTION - (i === prev.currentQuestionIndex ? prev.timeRemaining : 0)
          )
        };
        
        setAttempts(prevAttempts => {
          const newAttempts = [...prevAttempts, attempt];
          localStorage.setItem('quizAttempts', JSON.stringify(newAttempts));
          return newAttempts;
        });
      }

      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        timeRemaining: SECONDS_PER_QUESTION,
        isComplete,
        showFeedback: false
      };
    });
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return score + (quizState.answers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      answers: new Array(questions.length).fill(-1),
      timeRemaining: SECONDS_PER_QUESTION,
      isComplete: false,
      showFeedback: false
    });
  };

  return {
    currentQuestion: questions[quizState.currentQuestionIndex],
    currentAnswer: quizState.answers[quizState.currentQuestionIndex],
    timeRemaining: quizState.timeRemaining,
    isComplete: quizState.isComplete,
    showFeedback: quizState.showFeedback,
    progress: {
      current: quizState.currentQuestionIndex + 1,
      total: questions.length
    },
    score: calculateScore(),
    attempts,
    handleAnswer,
    handleNextQuestion,
    resetQuiz
  };
}