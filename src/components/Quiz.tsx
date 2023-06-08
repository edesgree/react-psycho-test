import React from 'react';
import Question from './Question';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';
import localQuizData from '../data/superhero.json';
import {
  IsQuizData,
  IsOption,
  IsQuestion,
  IsPoint,
  IsResult
} from '../interface';
console.log('localQuizData', localQuizData);

const Quiz = () => {
  const [points, setPoints] = React.useState<IsPoint[]>();
  const [quizData, setQuizData] = React.useState<IsQuizData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [quizCompleted, setQuizCompleted] = React.useState<boolean>(false);
  const [gameStartCount, setGameStartCount] = React.useState<number>(0);
  const [totalScore, setTotalScore] = React.useState<IsPoint[]>();
  const [results, setResults] = React.useState<IsResult[]>();
  const nbQuestions = 10;
  console.log('test');
  const fetchData = () => {
    // get questions
    console.log('localQuizData.questions', localQuizData.questions);
    const dataQuestions: IsQuestion[] = localQuizData.questions;

    // get points
    const dataPoints: IsPoint[] = localQuizData.points;
    setPoints(dataPoints);

    // get results
    const dataResults: IsResult[] = localQuizData.results;
    setResults(dataResults);

    //console.log(data);

    // store data in a custom object
    const customData: IsQuizData[] = [];
    dataQuestions.slice(0, nbQuestions).forEach((item: IsQuestion) => {
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
    console.log('customData', customData);
  };

  // each time GameStartCount is updated, a new quiz is rendered with score reset
  React.useEffect(() => {
    fetchData();
    setQuizCompleted(false);
    setLoading(true);
    setTotalScore([
      { category: 'A', point: 0 },
      { category: 'B', point: 0 },
      { category: 'C', point: 0 },
      { category: 'D', point: 0 }
    ]);
  }, [gameStartCount]);

  // used to randomize answers array
  const randomizeAnswers = (arr: IsOption[]): IsOption[] =>
    arr.sort(() => Math.random() - 0.5);

  // add the points for each category
  function handleFinalCheck(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setQuizCompleted(true);

    const currentScore: IsPoint[] = [
      { category: 'A', point: 0 },
      { category: 'B', point: 0 },
      { category: 'C', point: 0 },
      { category: 'D', point: 0 }
    ];
    quizData.forEach((question) => {
      console.log('question', question);
      // assign points for each category
      for (let i = 0; i < points.length; i++) {
        if (question.user_choice?.category === points[i].category) {
          currentScore[i].point += points[i].point;
        }
      }

      console.log('currentScore', currentScore);
      console.log('score A', currentScore[0].point);
      console.log('score B', currentScore[1].point);
      console.log('score C', currentScore[2].point);
      console.log('score D', currentScore[3].point);
    });
    // update score
    setTotalScore(currentScore);
  }

  // restart game by updating GameStartCount state
  function handleRestart(): void {
    setGameStartCount((prevCount) => prevCount + 1);
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
  const yourCategoryResult = totalScore?.sort((a, b) => b.point - a.point)[0];

  // results text rendering
  const resultsElements = results
    ?.filter((cat) => cat.category === yourCategoryResult?.category)
    .map((item) => {
      return (
        <div key={nanoid()}>
          <p>{item.category}</p>
          <p>{item.title}</p>
          <p>{item.description}</p>
        </div>
      );
    });
  console.log('resultsElements', resultsElements);
  return (
    <section className="quiz">
      {/* 
      {loading ? (
        'loading...'
      ) : (
        */}
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
              <p>You scored :</p>
              {totalScoreElements}
              {resultsElements}

              <button className="primary" onClick={handleRestart}>
                Start new game
              </button>
            </div>
          )}
        </footer>
      </div>
      {/* 
      )}
      */}
    </section>
  );
};
export default Quiz;
