/* globals BigInt */

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import DeterministicPrimalityTest from "./deterministicTest";
import FermatPrimalityTest from "./fermatTest";
import { bigPrimes, biggerPrimes } from "./bigPrimes";
import carmichaelNums from "./carmichaelNums";

const App = () => {
  const [num, setNum] = useState(BigInt("115297905820819"));
  const [formNum, setFormNum] = useState("115297905820819");
  const [confidence, setConf] = useState(99.9);
  const [iter, setIter] = useState(4);
  const [wrongInput, setWrongInput] = useState(false);

  const handleSubmit = () => {
    try {
      let inputToNum = BigInt(formNum.toString().replace(/,/g, ""));
      if (inputToNum < 2) {
        setWrongInput(true);
      } else {
        setWrongInput(false);
        setNum(inputToNum);
        setIter(Math.ceil(Math.log2(100 / (100 - confidence))));
      }
    } catch {
      setWrongInput(true);
    }
  };

  const handleTryPrime = () => {
    setFormNum(biggerPrimes[Math.floor(Math.random() * biggerPrimes.length)]);
  };

  const handleTryComposite = () => {
    let p1 = bigPrimes[Math.floor(Math.random() * bigPrimes.length)];
    let p2 = bigPrimes[Math.floor(Math.random() * bigPrimes.length)];
    setFormNum(p1 * p2);
  };

  const handleTryCarmichael = () => {
    setFormNum(
      carmichaelNums[Math.floor(Math.random() * carmichaelNums.length)]
    );
  };

  return (
    <div class="text-center">
      <h2>Primality test</h2>
      <h3>Deterministic vs Probabilistic algorithms</h3>
      <a
        href="https://github.com/kanishk509/prime-determ-vs-prob"
        target="_blank"
        rel="noopener noreferrer"
      >
        (view source code)
      </a>
      <div class="my-4">
        <div class="my-2">
          Number:{" "}
          <input
            type="text"
            value={formNum}
            onChange={(e) => setFormNum(e.target.value)}
            onKeyPress={(e) => {
              if (e.charCode === 13) handleSubmit();
            }}
          />{" "}
          {wrongInput ? (
            <i class="text-danger">(Enter an integer &ge; 2)</i>
          ) : null}
        </div>
        <div class="my-2">
          <Button
            bsPrefix="btn btn-secondary btn-sm m-1"
            onClick={handleTryPrime}
          >
            Try a big prime
          </Button>
          <Button
            bsPrefix="btn btn-secondary btn-sm m-1"
            onClick={handleTryComposite}
          >
            Try a non-prime with big prime factors
          </Button>
          <Button
            bsPrefix="btn btn-secondary btn-sm m-1"
            onClick={handleTryCarmichael}
          >
            Try a Carmichael number (see note 4)
          </Button>
        </div>
        <div class="my-2">
          Min. Confidence % (for probabilistic algo.):{" "}
          <input
            type="text"
            value={confidence}
            style={{ width: "10%" }}
            onChange={(e) => setConf(e.target.value)}
            onKeyPress={(e) => {
              if (e.charCode === 13) handleSubmit();
            }}
          />{" "}
          %
        </div>
        <Button variant="primary" size="sm" onClick={handleSubmit}>
          Is this a prime?
        </Button>
      </div>
      <div class="container-fluid row">
        <div class="col">
          <DeterministicPrimalityTest num={num} />
        </div>
        <div class="col">
          <FermatPrimalityTest num={num} iterations={iter} />
        </div>
      </div>
      <br />
      <p class="text-left">
        <b class="ml-4">Notes.</b>
        <ol>
          <li>
            The deterministic test will finish very fast if the given number has
            even one very small factor. For example 14266523201 (= 7 *
            2038074743).
            <br />
            In such cases, the perfomance advantage of the probabilistic
            algorithm is not apparent.
          </li>
          <li>
            The performance advantage of the probabilistic algorithm over the
            deterministic one can be clearly seen when the number is a big prime
            or a product of two or more big primes. For example 115297905820819
            (= 7445521 * 15485539).
          </li>
          <li>
            Fermat's primality test is based on{" "}
            <a
              href="https://en.wikipedia.org/wiki/Fermat%27s_little_theorem"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fermat's little theorem
            </a>
            . If it finds some suitable base A (1 &lt; A &lt; N-1) such that A
            <sup>N-1</sup> ≢ 1 (mod N), then it can declare with 100% confidence
            that n is composite.
            <br />
            However, if it doesn't find any such base, it declares N as a prime,
            but with a margin of error. The probability of a false positive
            declaration as prime is bounded by 2<sup>-K</sup> (assuming N is not
            a Carmichael number) where K is the number of iterations of the
            algorithm.
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Carmichael_number"
              target="_blank"
              rel="noopener noreferrer"
            >
              Carmichael numbers
            </a>{" "}
            are composite numbers with very high probability of being
            misclassified as a prime by the Fermat's test. (This is because, for
            a Carmichael number C, all values of A with gcd(A, C) = 1 also
            satisfy A<sup>C-1</sup> ≡ 1 (mod C)).
            <br />
            This is one of the biggest flaws of the Fermat's primality test and
            the reason why in practice, more robust probabilistic tests (like
            the{" "}
            <a
              href="https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test"
              target="_blank"
              rel="noopener noreferrer"
            >
              Miller–Rabin test)
            </a>{" "}
            are used.
          </li>
        </ol>
      </p>
    </div>
  );
};

export default App;
