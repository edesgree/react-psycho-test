export interface IntroProps {
  startGame: (quizTypeChosen: string) => void;
  quizInfo?: IsQuiz[];
  choice?: string | undefined;
  choiceChanger: (choice: string | undefined) => void;
}
export interface IsQuestionProps {
  id: string;
  question: string;
  user_choice: IsOption | null;
  options: IsOption[];
  quiz_completed: boolean;
  updateUserChoice: (id: string, choice: IsOption) => void;
}
export interface IsData {
  quiz_title: string;
  questions: IsQuestion[];
  results: IsResult[];
  quizType: string;
}
export interface IsQuizData extends IsQuestion {
  id: string;
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
export interface IsQuizProps extends IsQuiz {
  resetGame: () => void;
}
export interface IsQuiz {
  quiz_type: string;
  quiz_title: string;
  quiz_icon: string;
  questions: IsQuestion[];
  results: IsResult[];
  points: IsPoint[];
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
