import { IsResult } from '../interface';

const Result = (props: IsResult) => {
  return (
    <div key={props.key}>
      {/*<p>{props.category}</p>*/}
      <p className="title">
        <span>You are </span>
        {props.title}
      </p>
      <p>
        <img
          className="img-responsive "
          src={`${props.image}`}
          alt={props.title}
        />
      </p>
      <p className="bold">{props.description}</p>
    </div>
  );
};
export default Result;
