import React from 'react';

import { IntroProps } from '../interface';

const Intro = (props: IntroProps): JSX.Element => {
  // detect click on buttons
  React.useEffect(() => {
    const buttons = document.querySelectorAll('button[data-choice]');
    buttons.forEach((button) => {
      button.addEventListener('click', handleChoice as EventListener);
    });
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener('click', handleChoice as EventListener);
      });
    };
  }, []);

  // set user choice on click
  function handleChoice(event: MouseEvent) {
    event.preventDefault();

    const target = event.currentTarget as HTMLButtonElement;
    const selectedChoice: string | undefined = target.dataset.choice;
    props.choiceChanger(selectedChoice);

    const buttons = document.querySelectorAll('button[data-choice]');
    buttons.forEach((button) => {
      if (button === target) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  //display quiz titles listing from quizInfo
  const quizTitlesElements = props.quizInfo?.map((quiz, i) => {
    return (
      <li key={i}>
        <button data-choice={quiz.quiz_type}>
          <img
            className="img-responsive"
            src={`img/${quiz.quiz_icon}`}
            alt={quiz.quiz_title}
          />
          <span>{quiz.quiz_title}</span>
        </button>
      </li>
    );
  });

  return (
    <div>
      <p>Let's find out who you really are!</p>
      <ul className="quiz-selection-list">{quizTitlesElements}</ul>
      <button
        className="primary"
        disabled={props.choice === undefined}
        onClick={() => props.start(props.choice)}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Intro;
