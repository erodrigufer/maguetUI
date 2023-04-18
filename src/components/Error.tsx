import React from "react";
import "./components.css";

interface Props {
  errorMessage: string;
}

const Error = (props: Props) => {
  return (
    <>
      <div className="errorMessage">
        <p> Error</p>
        <p>While requesting a response, an error took place: </p>
        <p>{props.errorMessage}</p>
      </div>
    </>
  );
};

export default Error;
