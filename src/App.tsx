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
  const [loading, setLoading] = React.useState<boolean>(true);
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
  }

  //grab data from local data/data.json file
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

  return (
    <main className="App">
      <header>
        <h1>Psy test</h1>
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
