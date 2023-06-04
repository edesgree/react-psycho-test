import React from 'react';

import Intro from './components/Intro';
import Quiz from './components/Quiz';

function App() {
  const [gameStart, setGameStart] = React.useState(false);
  function startGame(): void {
    setGameStart(true);
  }
  return (
    <main className="App">
      <header>
        <h1>Quizzy</h1>
      </header>
      {!gameStart && <Intro test="33" start={startGame} />}
      {gameStart && <Quiz start={startGame} />}
    </main>
  );
}

export default App;
