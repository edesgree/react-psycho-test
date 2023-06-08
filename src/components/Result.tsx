import { IsResult } from '../interface';
interface ResultProps extends IsResult {
  key: string;
}
const Result = (props: ResultProps) => {
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
