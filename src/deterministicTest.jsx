/* globals BigInt */

import React, { useState, useEffect } from "react";
import PrimalityIndicator from "./primalityIndicator";
import WorkingIndicator from "./workingIndicator";
import TimeIndicator from "./timeIndicator";

const findFactor = (n, callBack) => {
  n = BigInt(n);
  let indx = BigInt(2);
  const batchSize = 10000;

  const processBatch = () => {
    let cnt = batchSize;
    for (; indx * indx <= n && cnt > 0; indx++, cnt--) {
      if (n % indx === 0n) {
        callBack([indx, n / indx]);
        return;
      }
    }
    if (indx * indx <= n) {
      setTimeout(processBatch, 0);
    } else {
      callBack([1n, n]);
    }
  };
  processBatch();
};

const DeterministicPrimalityTest = (props) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [factors, setFactors] = useState([1, 0]);
  const [timeTaken, setTimeTaken] = useState(0);
  const [num, setNum] = useState(2);

  useEffect(() => {
    setIsProcessing(true);
    setNum(props.num);

    let timerStart = performance.now();
    findFactor(props.num, (computedFactors) => {
      setFactors(computedFactors);
      let timerEnd = performance.now();
      setTimeTaken(timerEnd - timerStart);
      setIsProcessing(false);
    });
  }, [props.num]);

  return (
    <div>
      <h4>Deterministic Check</h4>
      {isProcessing ? (
        <WorkingIndicator />
      ) : (
        <div>
          <PrimalityIndicator num={num} isPrime={factors[0] < 2} />
          {factors[0] > 1 ? (
            <p class="my-2">
              Factors found: {factors[0].toString()} x {factors[1].toString()}
            </p>
          ) : (
            <p class="my-2">Could not factorize.</p>
          )}
          <TimeIndicator time={timeTaken} />
        </div>
      )}
    </div>
  );
};

export default DeterministicPrimalityTest;
