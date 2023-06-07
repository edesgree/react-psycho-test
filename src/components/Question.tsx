import React from 'react';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';
import { IsQuestionProps, IsOption } from '../interface';
const Question: React.FC<IsQuestionProps> = (props) => {
  const [choice, setChoice] = React.useState<IsOption>();

  // set user choice on click
  function handleChoice(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    // click allowed if quiz is completed (check answers button clicked)
    if (!props.quiz_completed) {
      const target = event.target as HTMLButtonElement;
      setChoice(target.value);
    }
  }

  React.useEffect(() => {
    // update quiz object with choice each time the choice state is changed
    props.updateUserChoice(props.id, choice.option);
  }, [choice]);

  const answersElements = props.options?.map((answer) => {
    // assign correct css style to button
    function getButtonStyle(): string {
      let style = '';
      if (!props.quiz_completed) {
        if (answer.option === choice.option) {
          style = 'active';
        }
      } else {
        style = 'desactive ';
        /*
        if (answer === props.correct_answer) {
          style += 'correct';
        } else if (answer === props.user_choice) {
          style += 'wrong';
        } else {
          style += 'not-selected';
        }
        */
      }
      return style;
    }

    return (
      <button
        key={nanoid()}
        onClick={handleChoice}
        value={answer.option}
        className={getButtonStyle()}
      >
        {decode(answer.option)}
      </button>
    );
  });
  return (
    <div className="question">
      <h2 className="question-title">{props.question}</h2>
      {/*correct_answer: {props.correct_answer}*/}
      <div className="question-answers">{answersElements}</div>
    </div>
  );
};
export default Question;
