import { IntroProps } from '../interface';
const Intro = (props: IntroProps): JSX.Element => {
  return (
    <div>
      <p>Let's play a random trivia!</p>
      <button className="primary" onClick={props.start}>
        Start Quiz
      </button>
    </div>
  );
};

export default Intro;
