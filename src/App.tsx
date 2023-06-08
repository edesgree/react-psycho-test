import React from 'react';

import Intro from './components/Intro';
import Quiz from './components/Quiz';

function App() {
  const [gameStart, setGameStart] = React.useState<boolean>(false);
  const [quizType, setQuizType] = React.useState<string>('');
  function startGame(): void {
    setGameStart(true);
    setQuizType('superhero');
  }

  return (
    <main className="App">
      <header>
        <h1>Psy test</h1>
      </header>
      {!gameStart && <Intro start={startGame} />}
      {gameStart && <Quiz quizType={quizType} />}
    </main>
  );
}

export default App;
