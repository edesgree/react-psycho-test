import React from 'react';
import Question from './Question';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';

export default function Quiz(props) {
  const [quizData, setQuizData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [quizCompleted, setQuizCompleted] = React.useState(false);
  const [gameStartCount, setGameStartCount] = React.useState(0);
  const [totalScore, setTotalScore] = React.useState(0);
  const nbQuestions = 10;

  const fetchData = async () => {
    // get questions from API
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${nbQuestions}`
    );
    const data = await res.json();

    // store data in a custom object
    const customData = [];
    data.results.forEach((item) => {
      customData.push({
        id: nanoid(),
        all_answers: randomizeAnswers([
          item.correct_answer,
          ...item.incorrect_answers
        ]),
        question: decode(item.question),
        correct_answer: item.correct_answer,
        user_correct: false,
        user_choice: null
      });
    });
    // set Quiz Data with this custom object
    setQuizData(customData);
    setLoading(false);
  };

  // each time GameStartCount is updated, a new quiz is rendered with score reset
  React.useEffect(() => {
    fetchData();
    setQuizCompleted(false);
    setLoading(true);
    setTotalScore(0);
  }, [gameStartCount]);

  // used to randomize answers array
  const randomizeAnswers = (arr) => arr.sort(() => Math.random() - 0.5);

  // check if answers are correct or not
  function handleFinalCheck(event) {
    event.preventDefault();
    setQuizCompleted(true);
    let currentScore = 0;
    quizData.forEach((question) => {
      if (question.correct_answer === question.user_choice) {
        currentScore += 1;
        question.user_correct = true;
      }
    });
    // update score
    setTotalScore(currentScore);
  }

  // restart game by updating GameStartCount state
  function handleRestart() {
    setGameStartCount((prevCount) => prevCount + 1);
  }
  // update quizData to show what the user chose
  function updateUserChoice(id, selectedAnswer) {
    setQuizData((prevQuizData) =>
      prevQuizData.map((data) => {
        return data.id === id ? { ...data, user_choice: selectedAnswer } : data;
      })
    );
  }
  // question elements rendering
  const questionsElements = quizData.map((item) => {
    return (
      <Question
        key={item.id}
        id={item.id}
        question={item.question}
        correct_answer={item.correct_answer}
        all_answers={item.all_answers}
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
}
