export interface IntroProps {
  start: () => void;
}
export interface IsQuestionProps {
  id: string;
  question: string;
  user_choice: IsOption | null;
  options: IsOption[];
  quiz_completed: boolean;
  updateUserChoice: (id: string, choice: IsOption) => void;
}
export interface IsQuizData {
  id: string;
  question: string;
  options: IsOption[];
  user_choice: IsOption | null;
}
export interface IsOption {
  category: string;
  option: string;
}
export interface IsQuestion {
  question: string;
  options: IsOption[];
}
export interface IsQuiz {
  quiz_title: string;
  questions: IsQuestion[];
  results: IsResult[];
  quizType: string;
}
export interface IsResult {
  category: string;
  description: string;
  title: string;
  image: string;
}
export interface IsPoint {
  category: string;
  point: number;
}
