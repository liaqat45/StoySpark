
export type Page = 'home' | 'stories' | 'story' | 'quiz' | 'progress' | 'login';

export interface Category {
  id: string;
  name: string;
  illustration: string;
  color: string;
  prompt: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Story {
  category: string;
  text: string;
  images: string[];
}

export interface QuizResult {
  storyCategory: string;
  score: number;
  total: number;
  timestamp: number;
}

export interface UserProgress {
  name: string;
  completedStories: string[];
  badges: string[];
  quizResults: QuizResult[];
}
