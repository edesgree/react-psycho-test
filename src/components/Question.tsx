import React from 'react';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';

interface QuestionProps {
  id: string;
  question: string;
  correct_answer: string;
  user_choice: string | null;
  all_answers: string[];
  quiz_completed: boolean;
  updateUserChoice: (id: string, choice: string) => void;
}
const Question: React.FC<QuestionProps> = (props) => {
  const [choice, setChoice] = React.useState('');

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
    props.updateUserChoice(props.id, choice);
  }, [choice]);

  const answersElements = props.all_answers?.map((answer) => {
    // assign correct css style to button
    function getButtonStyle(): string {
      let style = '';
      if (!props.quiz_completed) {
        if (answer === choice) {
          style = 'active';
        }
      } else {
        style = 'desactive ';
        if (answer === props.correct_answer) {
          style += 'correct';
        } else if (answer === props.user_choice) {
          style += 'wrong';
        } else {
          style += 'not-selected';
        }
      }
      return style;
    }

    return (
      <button
        key={nanoid()}
        onClick={handleChoice}
        value={answer}
        className={getButtonStyle()}
      >
        {decode(answer)}
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
