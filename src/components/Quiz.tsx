import React from 'react';
import Question from './Question';
import Result from './Result';
import Loading from './ui/Loading';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';
import { motion } from 'framer-motion';

import {
  IsQuizProps,
  IsQuizData,
  IsOption,
  IsQuestion,
  IsPoint,
  IsResult
} from '../interface';

const Quiz: React.FC<IsQuizProps> = ({
  resetGame,
  question_nb,
  ...quizSelected
}) => {
  const { quiz_title, quiz_icon, questions, results, points } = quizSelected;
  const [quizData, setQuizData] = React.useState<IsQuizData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [quizCompleted, setQuizCompleted] = React.useState<boolean>(false);
  const [questionsRemaining, setQuestionsRemaining] =
    React.useState<boolean>(false);
  const [gameStartCount, setGameStartCount] = React.useState<number>(0);
  const [totalScore, setTotalScore] = React.useState<IsPoint[]>();
  const [allAnswered, setAllAnswered] = React.useState<boolean>(false);
  // each time GameStartCount is updated, a new quiz is rendered with score reset
  React.useEffect(() => {
    const nbQuestions: number | undefined = Math.min(
      question_nb,
      questions.length
    );
    const fetchQuizData = () => {
      // store question data in a custom object
      const customData: IsQuizData[] = [];
      questions.slice(0, nbQuestions).forEach((item: IsQuestion) => {
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

  // check if all questions have been answered
  function checkAllAnswered() {
    //check if all questions have been answered using every
    const isAllAnswered = quizData.every((question) => {
      return (
        question.user_choice !== undefined && question.user_choice !== null
      );
    });
    setAllAnswered(isAllAnswered);
    console.log('allAnswered', allAnswered);
    return isAllAnswered;
    /*
    quizData.forEach((question) => {
      let count = quizData.length;
      if (question.user_choice !== undefined && question.user_choice !== null) {
        setAllAnswered(true);
      } else {
        count--;
      }
      console.log('question not answered:', count);
    });

    setAllAnswered(true);
    console.log('all questions have been answered!');
    */
  }

  // add the points for each category, check if all questions have been answered
  function handleFinalCheck(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const currentScore: IsPoint[] = [
      { category: 'A', point: 0 },
      { category: 'B', point: 0 },
      { category: 'C', point: 0 },
      { category: 'D', point: 0 }
    ];
    quizData.forEach((question) => {
      // assign points for each category
      for (let i = 0; i < points?.length; i++) {
        if (question.user_choice?.category === points[i]?.category) {
          currentScore[i].point += points[i]?.point;
        }
      }

      console.log(` score A: ${currentScore[0].point} score B: ${currentScore[1].point} score C: ${currentScore[2].point} score D: ${currentScore[3].point} 
      `);
    });
    checkAllAnswered();
    console.log('allAnswered', allAnswered);
    // if questions are remaining, display error message
    if (!checkAllAnswered()) {
      console.log('Please answer all questions');
      setQuestionsRemaining(true);
      return;
    }

    setQuizCompleted(true);
    console.log('quizCompleted', quizCompleted);
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
  }

  // question elements rendering
  const questionsElements = quizData.map((item: IsQuizData, index: number) => {
    return (
      <Question
        key={item.id}
        id={item.id}
        index={index}
        question={item.question}
        options={item.options}
        updateUserChoice={updateUserChoice}
        user_choice={item.user_choice}
        quiz_completed={quizCompleted}
        allAnswered={allAnswered}
        checkAllAnswered={checkAllAnswered}
        last={index === quizData.length - 1 ? true : false}
      />
    );
  });

  // personal score rendering
  const totalScoreSorted = totalScore?.sort((a, b) => b.point - a.point)[0];

  // results text rendering
  const resultsElements = results
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

  return (
    <section className="quiz">
      {loading ? (
        <Loading />
      ) : (
        <>
          <img
            className="img-responsive"
            width={100}
            src={`img/${quiz_icon}`}
            alt={quiz_title}
          />
          <h2>{quiz_title}</h2>
          {!quizCompleted && (
            <div className="quiz-questions">{questionsElements}</div>
          )}
          <motion.footer className="quiz-footer">
            {!quizCompleted && (
              <>
                {questionsRemaining && (
                  <p className="error">Please answer all questions</p>
                )}
                <button
                  className="primary" /*
                  className={`${!allAnswered ? 'disabled' : ''} primary`}
                  disabled={!allAnswered}
                  */
                  onClick={handleFinalCheck}
                >
                  Check your results
                </button>
              </>
            )}
            {quizCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {resultsElements}
                <button className="primary" onClick={handleRestart}>
                  Start new test
                </button>
              </motion.div>
            )}
          </motion.footer>
        </>
      )}
    </section>
  );
};
export default Quiz;
