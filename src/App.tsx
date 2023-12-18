import Button from "./button"
import { useState, useEffect } from "react"
import "./App.css"

const symbol: {symbol:string, text:string, class:string, id:string}[] = [
  {
    symbol: 'AC',
    text: 'AC',
    class: 'delete',
    id: "Delete"
  },
  {
    symbol: '÷',
    text: '/',
    class: 'divide',
    id: '/'
  },
  {
    symbol: '<-',
    text: '<-',
    class: 'backspace',
    id: 'Backspace'
  },
  {
    symbol: '7',
    text: '7',
    class: 'number',
    id: '7'
  },
  {
    symbol: '8',
    text: '8',
    class: 'number',
    id: '8'
  },
  {
    symbol: '9',
    text: '9',
    class: 'number',
    id: '9'
  },
  {
    symbol: '-',
    text: '-',
    class: 'subtract',
    id: '-'
  },
  {
    symbol: '4',
    text: '4',
    class: 'number',
    id: '4'
  },
  {
    symbol: '5',
    text: '5',
    class: 'number',
    id: '5'
  },
  {
    symbol: '6',
    text: '6',
    class: 'number',
    id: '6'
  },
  {
    symbol: '+',
    text: '+',
    class: 'add',
    id: '+'
  },
  {
    symbol: '1',
    text: '1',
    class: 'number',
    id: '1'
  },
  {
    symbol: '2',
    text: '2',
    class: 'number',
    id: '2'
  },
  {
    symbol: '3',
    text: '3',
    class: 'number',
    id: '3'
  },
  {
    symbol: '×',
    text: '*',
    class: 'multiply',
    id: 'x'
  },
  {
    symbol: '.',
    text: '.',
    class: 'number',
    id: '.'
  },
  {
    symbol: '0',
    text: '0',
    class: 'number',
    id: '0'
  },
  {
    symbol: '=',
    text: '=',
    class: 'equal',
    id: 'Enter'
  }
]

function App() {
  const [result, setResult] = useState([""])
  const [input, setInput] = useState("")
  const [display, setDisplay] = useState("")
  const [operation, setOperation] = useState(false)
  const [isDecimal, SetDecimal] = useState(false)

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // alert(event.key)
      symbol.forEach((item) => {
        if (event.key === item.id) {
          document.getElementById(item.id).click()
          // document.querySelector(`#${item.id}`).click()
        }
      });
    }    
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div id="wrap">
      <div id="container-display">
        <div id="saved">{result.map((item, index) => <div key={index}>{item}</div>)}</div>
        <div id="input">{input}</div>
      </div>
      <div className="button-container">
        {symbol.map((item, index) => {
          return <Button key={index} id={item.id} isDecimal={isDecimal} SetDecimal={SetDecimal} display={display} setDisplay={setDisplay} operator={operation} setOperator={setOperation}  setResult={setResult} result={result} setInput={setInput} input={input} text={item.text} symbol={item.symbol} className={item.class} />
        })}
      </div>
    </div>
  )
}

export default App
