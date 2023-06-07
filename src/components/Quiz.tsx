import React from 'react';
import Question from './Question';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';
import localQuizData from '../data/psychotest.json';
import {
  IsQuizData,
  IsOption,
  IsQuestion,
  IsQuiz,
  IsResult
} from '../interface';
console.log('localQuizData', localQuizData);

const Quiz = () => {
  const [quizData, setQuizData] = React.useState<IsQuizData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [quizCompleted, setQuizCompleted] = React.useState<boolean>(false);
  const [gameStartCount, setGameStartCount] = React.useState<number>(0);
  const [totalScore, setTotalScore] = React.useState<number[]>([0, 0, 0, 0]);
  const nbQuestions = 10;

  const fetchData = () => {
    // get questions
    console.log('localQuizData.questions', localQuizData.questions);
    const dataQuestions: IsQuestion[] = localQuizData.questions;
    //console.log(data);

    // store data in a custom object
    const customData: IsQuizData[] = [];
    dataQuestions.forEach((item: IsQuestion) => {
      customData.push({
        id: nanoid(),
        options: randomizeAnswers(item.options),
        question: decode(item.question),
        user_choice: null
      });
    });
    // set Quiz Data with this custom object
    setQuizData(customData);
    setLoading(false);
    console.log('loading', loading);
    console.log('customData', quizData);
  };

  // each time GameStartCount is updated, a new quiz is rendered with score reset
  React.useEffect(() => {
    fetchData();
    setQuizCompleted(false);
    setLoading(true);
    setTotalScore([0, 0, 0, 0]);
  }, [gameStartCount]);

  // used to randomize answers array
  const randomizeAnswers = (arr: IsOption[]): IsOption[] =>
    arr.sort(() => Math.random() - 0.5);

  // check if answers are correct or not
  function handleFinalCheck(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setQuizCompleted(true);
    const currentScore = [0, 0, 0, 0];
    quizData.forEach((question) => {
      switch (question.user_choice) {
        case 'A':
          currentScore[0] += 4;
          break;
        case 'B':
          currentScore[1] += 3;
          break;
        case 'C':
          currentScore[2] += 2;
          break;
        case 'D':
          currentScore[3] += 1;
          break;
      }
      console.log('currentScore', currentScore);
    });
    // update score
    setTotalScore(currentScore);
  }

  // restart game by updating GameStartCount state
  function handleRestart(): void {
    setGameStartCount((prevCount) => prevCount + 1);
  }
  // update quizData to show what the user chose
  function updateUserChoice(id: string, selectedAnswer: string) {
    setQuizData((prevQuizData) =>
      prevQuizData.map((data) => {
        return data.id === id ? { ...data, user_choice: selectedAnswer } : data;
      })
    );
  }
  // question elements rendering
  const questionsElements = quizData.map((item: IsQuizData) => {
    return (
      <Question
        key={item.id}
        id={item.id}
        question={item.question}
        options={item.options}
        updateUserChoice={updateUserChoice}
        user_choice={item.user_choice}
        quiz_completed={quizCompleted}
      />
    );
  });
  return (
    <section className="quiz">
      {loading ? (
        'loading...'
      ) : (
        <div>
          <div className="quiz-questions">{questionsElements}</div>

          <footer className="quiz-footer">
            {!quizCompleted && (
              <button className="primary" onClick={handleFinalCheck}>
                Check answers
              </button>
            )}
            {quizCompleted && (
              <div>
                <p>
                  You scored {totalScore}/{nbQuestions} correct answers
                </p>
                <button className="primary" onClick={handleRestart}>
                  Start new game
                </button>
              </div>
            )}
          </footer>
        </div>
      )}
    </section>
  );
};
export default Quiz;
