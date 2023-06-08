import { IntroProps } from '../interface';

const Intro = (props: IntroProps): JSX.Element => {
  // set user choice on click
  const handleChoice = (quizType: string): void => {
    props.choiceChanger(quizType);
  };
  const handleStart = (): void => {
    if (props.choice) {
      props.startGame(props.choice);
    }
  };
  //display quiz titles listing from quizInfo
  const quizTitlesElements = props.quizInfo?.map((quiz, i) => {
    return (
      <li key={i}>
        <button
          data-choice={quiz.quiz_type}
          className={props.choice === quiz.quiz_type ? 'active' : ''}
          onClick={() => handleChoice(quiz.quiz_type)}
        >
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
        className={`${props.choice === undefined ? 'disabled' : ''} primary`}
        disabled={props.choice === undefined}
        onClick={handleStart}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Intro;
