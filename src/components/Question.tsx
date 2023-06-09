import React from 'react';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';
import { IsQuestionProps, IsOption } from '../interface';
const Question: React.FC<IsQuestionProps> = (props) => {
  const [choice, setChoice] = React.useState<IsOption | undefined>();

  // set user choice on click
  function handleChoice(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    // click allowed if quiz is completed (check answers button clicked)
    if (!props.quiz_completed) {
      const target = event.target as HTMLButtonElement;
      const selectedOption: IsOption = {
        option: target.value || '',
        category: target.dataset.category || ''
      };
      console.log('selectedOption', selectedOption);
      setChoice(selectedOption);
    }
  }

  React.useEffect(() => {
    // update quiz object with choice each time the choice state is changed
    if (choice !== undefined) {
      props.updateUserChoice(props.id, choice);
    }
  }, [choice]);

  const answersElements = props.options?.map((answer) => {
    // assign correct css style to button
    function getButtonStyle(): string {
      let style = '';
      if (!props.quiz_completed) {
        if (choice && answer.option === choice.option) {
          style = 'active';
        }
      } else {
        style = 'desactive ';
      }
      return style;
    }

    return (
      <button
        key={nanoid()}
        onClick={handleChoice}
        value={answer.option}
        className={getButtonStyle()}
        data-category={answer.category}
      >
        {decode(answer.option)}
      </button>
    );
  });
  return (
    <div className="question">
      <h3 className="question-title">{props.question}</h3>

      <div className="question-answers">{answersElements}</div>
    </div>
  );
};
export default Question;
