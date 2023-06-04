interface IntroProps {
  start: () => void;
  testt: boolean;
}
const Intro = (props: IntroProps): JSX.Element => {
  return (
    <div>
      <p>Let's play a random trivia!</p>
      <button className="primary" onClick={props.start}>
        Start Quiz {props.testt}
      </button>
    </div>
  );
};

export default Intro;
