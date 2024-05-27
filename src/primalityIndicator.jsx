import React from "react";
import Badge from "react-bootstrap/Badge";

const PrimalityIndicator = (props) => {
  return (
    <div>
      {props.num.toString()} is...
      <br />
      {props.isPrime ? (
        <h4>
          <Badge pill variant="success">
            PRIME
          </Badge>
        </h4>
      ) : (
        <h4>
          <Badge pill variant="danger">
            COMPOSITE
          </Badge>
        </h4>
      )}
    </div>
  );
};

export default PrimalityIndicator;
