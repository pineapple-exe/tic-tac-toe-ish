import React from "react";
import Board from "./Board";

const generateCoordinate = (position, move) => {
  let col;
  let row;

  const positions = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15]
  ];

  for (let i = 0; i < positions.length; i++) {
    if (positions[i].includes(position)) {
      row = i;
      col = positions[i].indexOf(position);
      break;
    }
  }
  return `${col},${row}: ${move}`;
}

export default function Game(props) {
  const [history, setHistory] = React.useState([{squares: Array(16).fill(null), move: null}]);
  const [stepNumber, setStepNumber] = React.useState(0);
  const [xIsNext, setXIsNext] = React.useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      [0, 5, 10, 15],
      [3, 6, 9, 12]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
        return { winner: squares[a], squares: [a, b, c, d] }
      }
    }
    return null;
  }

  const handleClick = (i) => {
    const historyCopy = history.slice();
    const current = historyCopy[history.length - 1];
    const currentSquares = current.squares.slice();
    const winnerEntity = calculateWinner(currentSquares);

    if (currentSquares[i] || winnerEntity) {
        return;
    }

    currentSquares[i] = xIsNext ? 'X' : 'O';

    const updatedHistory = historyCopy.concat({squares: currentSquares, move: generateCoordinate(i, currentSquares[i])});

    setHistory(updatedHistory);
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  }

  return (
    <Board
      squares={history[history.length - 1].squares}
      onClick={(i) => handleClick(i)}
      isWinner={() => calculateWinner(history[history.length - 1].squares.slice())}
    />
    // <GameInfo />
  );
}

// function GameInfo(props) {

//   const timeTravel = (step) => {
//     setStepNumber(step);
//   }
// const moves = history.map((snapShot, step) => {
//     const desc = step ? 
//     'Go to move # ' + step :
//     'Go to game start';

//     const stepExpression = (step === this.state.stepNumber) ? 
//                             <b>{desc}</b> : 
//                             desc;

//     const coordinateLine = history.map((obj) => obj.coordinates).some(value => value != null);
//     const visibleCoordinateLine = coordinateLine ? history.map((obj) => obj.coordinates).toString().replace(',', '') : '';

//     return (
//       <li key={step}>
//         <button onClick={() => this.timeTravel(step)}>
//           {stepExpression}
//         </button>
//         <span className="coordinates">
//           {'Coordinates: ' + visibleCoordinateLine}
//         </span>
//       </li>
//     );
//   });

