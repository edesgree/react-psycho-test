import React from 'react';

interface IntroProps {
  start: () => void;
  test: number;
}
export default function Intro(props: IntroProps): JSX.Element {
  return (
    <div>
      <p>Let's play a random trivia!</p>
      <button className="primary" onClick={props.start}>
        Start Quiz {props.test}
      </button>
    </div>
  );
}
