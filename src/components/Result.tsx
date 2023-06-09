import { IsResult } from '../interface';

const Result = (props: IsResult) => {
  return (
    <div data-category={props.category}>
      <p className="title">
        <span>You are </span>
        {props.title}
      </p>
      <p>
        <img
          className="img-responsive "
          src={`img/${props.image}`}
          alt={props.title}
        />
      </p>
      <p className="bold">{props.description}</p>
    </div>
  );
};
export default Result;
