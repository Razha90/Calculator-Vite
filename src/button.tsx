interface ButtonProps {
    text: string,
    symbol: string,
    className: string,
    id: string,
    setInput: React.Dispatch<React.SetStateAction<string>>
    input: string,
    setResult: React.Dispatch<React.SetStateAction<string[]>>,
    result: string[],
    setOperator: React.Dispatch<React.SetStateAction<boolean>>,
    operator: boolean,
    setDisplay: React.Dispatch<React.SetStateAction<string>>,
    display: string,
    isDecimal: boolean,
    SetDecimal: React.Dispatch<React.SetStateAction<boolean>>,
};

function Button( {id,isDecimal, SetDecimal ,display, setDisplay ,setOperator, operator ,input,setInput,text, symbol, className, setResult, result}: ButtonProps) {
    function saveInput() {
        if ((input == "" && symbol == "0")|| (input == "" && symbol == ".") ) {
            return;
        }
        if (text == "."&& !operator) {
            return;
        }
        let checkDesimal = false;
        try {
            const lastInput = input.charAt(input.length - 1)
            checkDesimal = /^[.]+$/.test(lastInput)
        } catch (error) {
            checkDesimal = false
        }
        if (text == "." && checkDesimal) {
            SetDecimal(true)
            return;
        }
        // alert('babi')

        if (text == "." &&isDecimal) {
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
            setInput(input.slice(0, -1));
            setDisplay(display.slice(0, -1));
        }

        if (text == "AC") {
            setInput("");
            setResult([""]);
            setDisplay("");
        }

        let checkDesimal = false;
        try {
            const lastInput = display.charAt(display.length - 1)
            checkDesimal = /[+\-*\/]/g.test(lastInput)
        } catch (error) {
            checkDesimal = false
        }

        if (checkDesimal) {
            return;
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
                SetDecimal(false)
                break;
            case "-":
                setInput(input + symbol);
                setDisplay(display + text);
                SetDecimal(false)
                break;
            case "*":
                setInput(input + symbol);
                setDisplay(display + text);
                SetDecimal(false)
                break;
            case "/":
                setInput(input + symbol);
                setDisplay(display + text);
                SetDecimal(false)
                break;
            case "=":
                let checking = /[+\-*\/]/g.test(display)
                if(!checking){ return;}
                let evale = eval(display);
                let jumlah = evale.toString();
                addNewData(input + symbol + jumlah);
                setDisplay(jumlah);
                setInput(jumlah);
                // SetDecimal(/^[.]+$/.test(jumlah))
                break;
                
        }
    }

    return (
        <button id={id} onClick={className == "number"  ? saveInput : operation} className={className}>{symbol}</button>
    ) 
}

export default Button