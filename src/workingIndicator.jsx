import React from "react";
import Spinner from "react-bootstrap/Spinner";

const WorkingIndicator = () => {
  return (
    <div>
      <br />
      <Spinner animation="grow" />
      <br />
      Working...
    </div>
  );
};

export default WorkingIndicator;
