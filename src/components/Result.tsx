import React from 'react';
const Result = (props) => {
  return (
    <div key={props.key}>
      <p>{props.category}</p>
      <p>{props.title}</p>
      <p>
        <img src={`${props.image}`} alt={props.title} />
      </p>
      <p>{props.description}</p>
    </div>
  );
};
export default Result;
