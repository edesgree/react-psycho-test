export interface IsQuestionProps {
  id: string;
  question: string;
  user_choice: string | null;
  options: IsOption[];
  quiz_completed: boolean;
  updateUserChoice: (id: string, choice: string) => void;
}
export interface IsQuizData {
  id: string;
  question: string;
  options: IsOption[];
  user_choice: string | null;
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
}
export interface IsResult {
  category: string;
  description: string;
}