import { useState } from "react";
import "./App.css";

function App() {
  const [currentMark, setCurrentMark] = useState("X");
  const [gridMark, setGridMark] = useState(Array(9).fill(null));
  const [resultText, setResultText] = useState("");

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const insertMark = (e) => {
    if (gridMark[e] === null) {
      let newGridMark = gridMark.slice();
      newGridMark[e] = currentMark;
      setGridMark(newGridMark);
      setCurrentMark(currentMark === "X" ? "O" : "X");
      const result = calculateWinner(newGridMark);
      if (null !== result) {
        setResultText(`"${result}" WON.`);
      }
      if (!newGridMark.includes(null)) {
        setResultText(`DRAW :|`);
      }
    }
  };

  const markUp = gridMark.map((value, index) => {
    return (
      <div
        key={index}
        onClick={() => {
          insertMark(index);
        }}
      >
        {value}
      </div>
    );
  });

  return (
    <div className="App">
      <div className="Board">{markUp}</div>
      <h2>{resultText}</h2>
    </div>
  );
}

export default App;
