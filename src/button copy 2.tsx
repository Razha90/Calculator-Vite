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

function Button( {isDecimal, SetDecimal,display, setDisplay ,setOperator, operator ,input,setInput,text, symbol, className, setResult, result}: ButtonProps) {
    function saveInput() {
        
        
        if ((input == "" && symbol == "0")|| (input == "" && symbol == ".") ) {
            return;
        }

        if (text == "." && !isDecimal) {
            SetDecimal(true);
        }
        
        if (text == "." && isDecimal) {
            return;
        }


        setInput(input + symbol);
        setDisplay(display + text);
        if (!operator) {
            setOperator(true);
        }
    }

    // const updateResult = (newValue: string) => {
    //     setResult((prevResult) => {
    //       const updatedResult = [...prevResult.slice(0, -1), prevResult.slice(-1)[0] + newValue];
    //       return updatedResult;
    //     });
    //   };

      const addNewData = (newData: string) => {
        setResult((prevResult) => [...prevResult, newData]);
      };

    function operation() {
        if (text == "<-") {
            setOperator(true);
        }
        if (!operator) {
            return;
        }
        if (input == "" && symbol == "<-") {
            return;
        }

        switch (text) {
            case "+":
                setInput(input + symbol);
                setDisplay(display + text);
                break;
            case "-":
                setInput(input + symbol);
                setDisplay(display + text);
                break;
            case "*":
                setInput(input + symbol);
                setDisplay(display + text);
                break;
            case "/":
                setInput(input + symbol);
                setDisplay(display + text);
                break;
            case "=":
                let jumlah = eval(display);
                addNewData(input + symbol + jumlah);
                setDisplay(jumlah);
                setInput(jumlah);
                SetDecimal(/^[.]+$/.test(jumlah))
                alert(/[\.]/g.test(jumlah))
                break;
            case "AC":
                setInput("");
                setResult([""]);
                break;
            case "<-":
                setInput(input.slice(0, -1));
                setDisplay(display.slice(0, -1));
                return;
                break;
        }
        if (text != "=") {
            setOperator(false);
        }
        if (isDecimal) {
            SetDecimal(false);
        }
    }

    return (
        <button onClick={className == "number"  ? saveInput : operation} className={className}>{symbol}</button>
    ) 
}

export default Button