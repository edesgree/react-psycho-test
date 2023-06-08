import React from 'react';
import Question from './Question';
import Result from './Result';
import Loading from './ui/Loading';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';

import {
  IsQuizProps,
  IsQuizData,
  IsOption,
  IsQuestion,
  IsPoint,
  IsResult
} from '../interface';

const Quiz: React.FC<IsQuizProps> = ({ quizSelected, resetGame }) => {
  console.log('quizSelected', quizSelected);
  const [quizData, setQuizData] = React.useState<IsQuizData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [quizCompleted, setQuizCompleted] = React.useState<boolean>(false);
  const [questionsRemaining, setQuestionsRemaining] =
    React.useState<boolean>(false);
  const [gameStartCount, setGameStartCount] = React.useState<number>(0);
  const [totalScore, setTotalScore] = React.useState<IsPoint[]>();

  React.useEffect(() => {
    console.log('loading state', loading);
  }, [loading]);
  // each time GameStartCount is updated, a new quiz is rendered with score reset
  React.useEffect(() => {
    const nbQuestions: number | undefined = Math.min(
      3,
      quizSelected.questions.length
    );
    const fetchQuizData = () => {
      // store question data in a custom object
      const customData: IsQuizData[] = [];
      quizSelected.questions
        .slice(0, nbQuestions)
        .forEach((item: IsQuestion) => {
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
    };
    setLoading(true);
    fetchQuizData();
    setQuizCompleted(false);
    // reset score
    resetScore();
  }, [gameStartCount]);

  // used to randomize answers array
  const randomizeAnswers = (arr: IsOption[]): IsOption[] =>
    arr.sort(() => Math.random() - 0.5);

  // add the points for each category, check if all questions have been answered
  function handleFinalCheck(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    // check if all questions have been answered
    let allAnswered = true;

    const currentScore: IsPoint[] = [
      { category: 'A', point: 0 },
      { category: 'B', point: 0 },
      { category: 'C', point: 0 },
      { category: 'D', point: 0 }
    ];
    quizData.forEach((question) => {
      console.log('question', question);
      // assign points for each category
      for (let i = 0; i < quizSelected.points?.length; i++) {
        if (
          question.user_choice?.category === quizSelected.points[i]?.category
        ) {
          currentScore[i].point += quizSelected.points[i]?.point;
        }
      }
      // check if all questions have been answered
      if (question.user_choice === undefined || question.user_choice === null) {
        allAnswered = false;
        console.log('question not answered', question);
      }
      console.log('currentScore', currentScore);
      console.log('score A', currentScore[0].point);
      console.log('score B', currentScore[1].point);
      console.log('score C', currentScore[2].point);
      console.log('score D', currentScore[3].point);
    });
    console.log('allAnswered', allAnswered);
    if (!allAnswered) {
      console.log('Please answer all questions');
      setQuestionsRemaining(true);
      return;
    }
    setQuizCompleted(true);
    // update score
    setTotalScore(currentScore);
  }
  // reset score
  function resetScore() {
    setTotalScore((prevTotalScore) => {
      const updatedTotalScore = prevTotalScore?.map((score) => {
        return { ...score, point: 0 };
      });
      return updatedTotalScore;
    });
  }
  // restart game by updating GameStartCount state
  function handleRestart(): void {
    setGameStartCount((prevCount) => prevCount + 1);
    resetGame();
  }
  // update quizData to show what the user chose
  function updateUserChoice(id: string, choice: IsOption) {
    setQuizData((prevQuizData) =>
      prevQuizData.map((data) => {
        return data.id === id ? { ...data, user_choice: choice } : data;
      })
    );
    console.log('quizData after user choice', quizData);
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
  // total score rendering
  const totalScoreElements = totalScore?.map((item) => {
    return (
      <div key={nanoid()}>
        <p>
          {item.category} : {item.point}
        </p>
      </div>
    );
  });

  // your personal score rendering
  const totalScoreSorted = totalScore?.sort((a, b) => b.point - a.point)[0];

  // results text rendering
  const resultsElements = quizSelected.results
    ?.filter((cat: IsResult) => cat.category === totalScoreSorted?.category)
    .map((item: IsResult) => {
      return (
        <Result
          key={nanoid()}
          category={item.category}
          title={item.title}
          image={item.image}
          description={item.description}
        />
      );
    });
  console.log('resultsElements', resultsElements);
  return (
    <section className="quiz">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <img
            className="img-responsive"
            width={100}
            src={`img/${quizSelected.quiz_icon}`}
            alt={quizSelected.quiz_title}
          />
          <h2>{quizSelected.quiz_title}</h2>
          {!quizCompleted && (
            <div className="quiz-questions">{questionsElements}</div>
          )}
          <footer className="quiz-footer">
            {!quizCompleted && (
              <>
                {questionsRemaining && (
                  <p className="error">Please answer all questions</p>
                )}
                <button className="primary" onClick={handleFinalCheck}>
                  Check your results
                </button>
              </>
            )}
            {quizCompleted && (
              <div>
                {/*totalScoreElements*/}
                {resultsElements}

                <button className="primary" onClick={handleRestart}>
                  Start new test
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
