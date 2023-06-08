import React from 'react';

import Intro from './components/Intro';
import Quiz from './components/Quiz';
import Loading from './components/ui/Loading';
import { IsQuiz } from './interface';
function App() {
  const [gameStart, setGameStart] = React.useState<boolean>(false);
  const [quizInfo, setQuizInfo] = React.useState<IsQuiz[]>();
  const [quizTitles, setQuizTitles] = React.useState<JSX.Element[]>();
  const [quizSelected, setQuizSelected] = React.useState<IsQuiz>();
  const [choice, setChoice] = React.useState<string | undefined>();

  function startGame(quizTypeChosen: string): void {
    setGameStart(true);
    setQuizSelected(
      quizInfo?.find((quiz) => quiz.quiz_type === quizTypeChosen)
    );
  }
  function resetGame(): void {
    setGameStart(false);
    setQuizSelected(undefined);
  }

  //grab data from data/data.json file
  const [loading, setLoading] = React.useState<boolean>(true);
  const fetchData = () => {
    fetch('./data/data.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
        <h1>Psy test</h1>
      </header>
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
                start={startGame}
              />
            </>
          )}
          {gameStart && (
            <Quiz quizSelected={quizSelected} resetGame={resetGame} />
          )}
        </>
      )}
    </main>
  );
}

export default App;
