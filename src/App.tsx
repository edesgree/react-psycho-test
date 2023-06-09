import React from 'react';

import Intro from './components/Intro';
import Quiz from './components/Quiz';
import Loading from './components/ui/Loading';
import { IsQuiz } from './interface';
function App() {
  const [gameStart, setGameStart] = React.useState<boolean>(false);
  const [quizInfo, setQuizInfo] = React.useState<IsQuiz[]>();
  const [quizSelected, setQuizSelected] = React.useState<IsQuiz>();
  const [choice, setChoice] = React.useState<string | undefined>();
  const QUESTIONS_NB = 8;
  function startGame(quizTypeChosen: string): void {
    setGameStart(true);
    setQuizSelected(
      quizInfo?.find((quiz) => quiz.quiz_type === quizTypeChosen)
    );
  }
  function resetGame(): void {
    setGameStart(false);

    // reset quiz selected and choice
    setQuizSelected(undefined);
    setChoice(undefined);

    console.log('quizSelected', quizSelected);
  }

  //grab data from data/data.json file
  const [loading, setLoading] = React.useState<boolean>(true);
  const fetchData = () => {
    fetch('./data/data.json')
      .then((response) => response.json())
      .then((data) => {
        setQuizInfo(data);
        setLoading(false);
      });
  };

  // call fetchData() when the component is mounted
  React.useEffect(() => {
    fetchData();
  }, []);
  React.useEffect(() => {
    console.log('choice', choice);
  }, [choice]);
  return (
    <main className="App">
      <header>
        <h1>Psychologeek</h1>
      </header>
      <div className="content">
        {loading ? (
          <Loading />
        ) : (
          <>
            {!gameStart && (
              <>
                <Intro
                  choiceChanger={setChoice}
                  choice={choice}
                  quizInfo={quizInfo}
                  startGame={startGame}
                />
              </>
            )}
            {gameStart && quizSelected && (
              <Quiz
                /*  
            quiz_type={quizSelected.quiz_type}
              quiz_title={quizSelected.quiz_title}
              quiz_icon={quizSelected.quiz_icon}
              questions={quizSelected.questions}
              results={quizSelected.results}
              points={quizSelected.points}
              */
                {...quizSelected}
                resetGame={resetGame}
                question_nb={QUESTIONS_NB}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default App;
