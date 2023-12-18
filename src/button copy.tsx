import React, { useEffect } from "react";

interface ButtonProps {
    text: string,
    symbol: string,
    className: string,
    setInput: React.Dispatch<React.SetStateAction<string>>
    input: string,
    setResult: React.Dispatch<React.SetStateAction<string[]>>,
    result: string[],
    setOperator: React.Dispatch<React.SetStateAction<boolean>>,
    operator: boolean,
    setDisplay: React.Dispatch<React.SetStateAction<string>>,
    display: string,
    isDecimal: boolean,
    SetDecimal: React.Dispatch<React.SetStateAction<boolean>>
};

function Button({
  isDecimal,
  SetDecimal,
  display,
  setDisplay,
  setOperator,
  operator,
  input,
  setInput,
  text,
  symbol,
  className,
  setResult,
}: ButtonProps) {
  function saveInput() {
    if ((input === "" && symbol === "0") || (input === "" && symbol === ".")) {
      return;
    }

    if (text === "." && !isDecimal) {
      SetDecimal(true);
    }

    if (text === "." && isDecimal) {
      return;
    }

    setInput(input + symbol);
    setDisplay(display + text);
    if (!operator) {
      setOperator(true);
    }
  }

  function operationDefault() {
    switch (text) {
      case "+":
      case "-":
      case "*":
      case "/":
        setInput(input + symbol);
        setDisplay(display + text);
        break;
      case "=":
        const result = eval(display); // Gunakan metode lain untuk menghitung hasil
        addNewData(input + symbol + result);
        setDisplay(result);
        setInput(result);
        SetDecimal(/^[.]+$/.test(result));
        // alert(/[\.]/g.test(result)); // Gunakan ini jika Anda memang memerlukan alert
        break;
      case "AC":
        setInput("");
        setResult([""]);
        break;
      case "<-":
        setInput(input.slice(0, -1));
        setDisplay(display.slice(0, -1));
        break;
      default:
        // Logika default jika text tidak cocok dengan kasus di atas
    }

    if (text !== "=") {
      setOperator(false);
    }

    if (isDecimal) {
      SetDecimal(false);
    }
  }

  useEffect(() => {
    if (symbol === "<-") {
      setOperator(true);
    }

    if (operator && input !== "" && !(input === "" && symbol === "<-")) {
      operationDefault();
    }
  }, [operator, input, symbol, isDecimal, SetDecimal, setOperator, operationDefault]);

  const addNewData = (newData: string) => {
    setResult((prevResult) => [...prevResult, newData]);
  };

  return (
    <button onClick={className === "number" ? saveInput : operationDefault} className={className}>
      {symbol}
    </button>
  );
}

export default Button;
