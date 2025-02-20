export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizAttempt {
  id: string;
  timestamp: number;
  score: number;
  timePerQuestion: number[];
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: number[];
  timeRemaining: number;
  isComplete: boolean;
  showFeedback: boolean;
}