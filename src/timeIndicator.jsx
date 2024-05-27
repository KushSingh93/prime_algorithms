import React from "react";
import Badge from "react-bootstrap/Badge";

const TimeIndicator = (props) => {
  return (
    <h5>
      Time taken: <Badge variant="secondary">{props.time.toFixed(3)} ms</Badge>
    </h5>
  );
};

export default TimeIndicator;
