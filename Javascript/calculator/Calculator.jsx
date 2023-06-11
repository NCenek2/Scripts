import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [topString, setTopString] = useState("0");
  const [bottomString, setBottomString] = useState("0");
  const [resetCalc, setResetCalc] = useState(false);

  const resetAC = () => {
    setTopString("0");
    setBottomString("0");
  };

  // console.log(topString, bottomString);

  const onSymbol = (event) => {
    setResetCalc(false);
    const { id } = event.target;
    // console.log(topString, "oldTopString");
    const oldTopString = topString;
    let newTopString = oldTopString + id;
    // console.log(newTopString, "newTopString");

    if (/\d+.?\d*[/*+-]\d?.?\d+/.test(oldTopString)) {
      // console.log("On Symbol -> evaluating number without digit");
      // console.log(typeof id, id);
      const evaluatedString = eval(oldTopString).toString();
      setTopString(evaluatedString + id);
      setBottomString(id);
    } else if (/\d+.?\d*[/*+-]\d+.?\d*/.test(oldTopString)) {
      // console.log("On Symbol -> evaluating number");
      // console.log(typeof id, id);
      const evaluatedString = eval(oldTopString).toString();
      setTopString(evaluatedString + id);
      setBottomString(id);
    } else if (/\d+.?\d*[/*+][+/*]/.test(newTopString)) {
      // console.log("On Symbol -> second symbol not -");
      setTopString(oldTopString);
    } else if (/\d+.?\d*[-]{2}$/.test(newTopString)) {
      // console.log("On Symbol -> second symbol w/ -");
    } else if (/\d+.?\d*[-][*/+-]$/.test(newTopString)) {
      // console.log("No onther symbol after negative");
    } else if (/\d+.?\d*[/*+-][+/*-][*/+-]/.test(newTopString)) {
      // console.log("On Symbol -> No more symbols");
    } else if (/\d+.?\d*[/*+-]?/.test(newTopString)) {
      // console.log("On Symbol -> adding symbol");
      setTopString(newTopString);
      setBottomString(id);
    } else {
      // console.log("On Symbol -> no case :(");
    }
  };

  const onDecimal = (event) => {
    const { id } = event.target;
    const oldTopString = topString;
    let newTopString = oldTopString + id;

    if (resetCalc) {
      setTopString("0" + id);
      setResetCalc(false);
      return undefined;
    }

    if (/\d+.?\d*[-/+*]+\d*[.]\d*.$/.test(newTopString)) {
      // console.log("Enough Dots");
    } else if (/\d+.?\d*[-/+*]+\d*[.][.]$/.test(newTopString)) {
      // console.log("onDecimal => second number, no more dots");
    } else if (/\d+.?\d*[-/+*]+\d*./.test(newTopString)) {
      // console.log("onDecimal => Second Number, first dot");
      setTopString(newTopString);
      setBottomString(id);
    } else if (/\d+.?\d*[-/+*]+.$/.test(newTopString)) {
      // console.log("onDecimal => Second Number, no number dot");
      setTopString(newTopString);
    } else if (/\d+[.]\d*.$/.test(newTopString)) {
      // console.log("onDecimal => no dot after first number");
    } else if (/\d+.$/.test(newTopString)) {
      // console.log("onDecimal => first dot with int");
      setTopString(newTopString);
      setBottomString(id);
    } else if (/\d+.+\d?.$/.test(newTopString)) {
      // console.log("onDecimal => no more first number dots, 1");
    } else if (/\d+.$/.test(newTopString)) {
      // console.log("onDecimal => first number ,first dot");
      setTopString(newTopString);
      setBottomString(id);
    } else if (/\d+[.][.]$/.test(newTopString)) {
      // console.log("onDecimal => first number, consecutive dots");
    } else {
      // console.log("onDecimal => do nothing");
    }
  };

  const onNumber = (event) => {
    const { id } = event.target;
    // console.log(id, "On Number -> ID", typeof id);
    if (resetCalc) {
      setTopString(id);
      setBottomString(id);
      setResetCalc(false);
      return undefined;
    }
    if (bottomString === "0" && topString === "0") {
      // console.log("onNumber -> initial case");

      setTopString((prevTopString) => id);
      setBottomString((prevBottomString) => id);
    } else if (/\d+[*-+/]/.test(bottomString)) {
      // console.log("onNumber -> second number case");
      setTopString((prevTopString) => prevTopString + id);
      setBottomString((prevBottomString) => id);
    } else {
      // console.log("onNumber -> else case (adding number)");
      setTopString((prevTopString) => prevTopString + id);
      setBottomString((prevBottomString) => id);
    }
    setResetCalc(false);
  };

  const onEqual = () => {
    // console.log("equal pressed");
    let oldTopString = topString;

    if (/\d+.?\d?[-/+*]{2}$]/.test(oldTopString)) {
      // console.log("Do nothing on equal, 1");
    } else if (/\d+.?\d?[-/+*]$/.test(oldTopString)) {
      // console.log("Do nothing on equal ,2");
    } else if (/\d+.?\d*[-+/*][.]$/.test(oldTopString)) {
      let array = oldTopString.split("");
      array.pop();
      array.pop();
      const newArray = array.join("");
      setTopString(newArray);
      setBottomString(newArray);
    } else if (/\d+.?\d?[.]$/.test(oldTopString)) {
      let array = oldTopString.split("");
      array.pop();
      const newArray = array.join("");
      // console.log("Do nothing on equal, 3", typeof newArray);
      const number = eval(newArray).toString();
      setTopString(number);
      setBottomString(number);
    } else if (/\d+[.]$/.test(oldTopString)) {
      let array = oldTopString.split("");
      array.pop();
      const newArray = array.join("");
      setTopString(newArray);
      setBottomString(newArray);
    } else {
      const number = eval(topString).toString();
      setTopString(number);
      setBottomString(number);
      // console.log(topString);
      // console.log(bottomString);
    }

    setResetCalc(true);
  };

  return (
    <React.Fragment>
      <div className="calculator-container">
        <span className="calculator-header">
          <span className="calculator-display">{topString}</span>
          <span className="calculator-display">{bottomString}</span>
        </span>
        <button className="calculator-button" id="AC" onClick={resetAC}>
          AC
        </button>
        <button className="calculator-button" id="/" onClick={onSymbol}>
          /
        </button>
        <button className="calculator-button" id="*" onClick={onSymbol}>
          X
        </button>
        <button className="calculator-button" id="7" onClick={onNumber}>
          7
        </button>
        <button className="calculator-button" id="8" onClick={onNumber}>
          8
        </button>
        <button className="calculator-button" id="9" onClick={onNumber}>
          9
        </button>
        <button className="calculator-button" id="-" onClick={onSymbol}>
          -
        </button>
        <button className="calculator-button" id="4" onClick={onNumber}>
          4
        </button>
        <button className="calculator-button" id="5" onClick={onNumber}>
          5
        </button>
        <button className="calculator-button" id="6" onClick={onNumber}>
          6
        </button>
        <button className="calculator-button" id="+" onClick={onSymbol}>
          +
        </button>
        <button className="calculator-button" id="1" onClick={onNumber}>
          1
        </button>
        <button className="calculator-button" id="2" onClick={onNumber}>
          2
        </button>
        <button className="calculator-button" id="3" onClick={onNumber}>
          3
        </button>
        <button className="calculator-button" id="=" onClick={() => onEqual()}>
          =
        </button>
        <button className="calculator-button" id="0" onClick={onNumber}>
          0
        </button>
        <button
          className="calculator-button"
          id="."
          onClick={(event) => onDecimal(event)}
        >
          .
        </button>
      </div>
    </React.Fragment>
  );
};

export default Calculator;
