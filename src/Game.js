import React from "react";
import Board from "./Board";

export default function Game(props) {
  const [history, setHistory] = React.useState([{squares: Array(16).fill(null), move: null}]);
  const [stepNumber, setStepNumber] = React.useState(0);
  const [xIsNext, setXIsNext] = React.useState(true);
  // const [winner, setWinner] = React.useState(null);
  // const [status, setStatus] = React.useState(props.players.playerX);

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
        return { winner: (squares[a] === 'X' ? props.players.playerX : props.players.playerO), squares: [a, b, c, d] }
      }
    }
    return null;
  }

  const handleClick = (i) => {
    const historyCopy = history.slice();
    const current = historyCopy[stepNumber];
    const currentSquares = current.squares.slice();
    const winnerEntity = calculateWinner(currentSquares);

    if (currentSquares[i] || winnerEntity) {
        return;
    }

    currentSquares[i] = xIsNext ? 'X' : 'O';

    const updatedHistory = historyCopy.slice(0, stepNumber + 1).concat({squares: currentSquares, move: generateCoordinate(i, currentSquares[i])});
    const updatedStepNumber = stepNumber + 1;

    setHistory(updatedHistory);
    setStepNumber(updatedStepNumber);
    setXIsNext(!xIsNext);
  }

  const timeTravel = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    // setHistory(history.slice(0, step + 1));
  }

  const status = () => {
    let statusExpression;
    const winnerEntity = calculateWinner(history[stepNumber].squares);

    if (winnerEntity) {
      statusExpression = 'Winner: ' + winnerEntity.winner;
    }
    else {
      statusExpression = 'Turn: ' + xIsNext ? props.players.playerX : props.players.playerO;
    }

    return (
        <p>{statusExpression}</p>
    );
  }

  const moves = history.map((snapShot, step) => {
      const desc = step ? 
      'Go to move # ' + step :
      'Go to game start';

      const stepExpression = (step === stepNumber) ? 
                              <b>{desc}</b> : 
                              desc;

      const coordinateLine = step > 0 ? 
      'Coordinate: ' + snapShot.move
      : null;

      return (
      <li key={step}>
        <button onClick={() => timeTravel(step)}>
          {stepExpression}
        </button>

        <span className="coordinates">
          {coordinateLine}
        </span>
      </li>
      );
  });

  return (
    <div className="game">
      <Board
        squares={history[stepNumber].squares}
        onClick={(i) => handleClick(i)}
        isWinner={() => calculateWinner(history[stepNumber].squares)}
      />
      <div className="game-info">

        <div className="status">
          {status()}
        </div>

        <ol className="moves">
          {moves}
        </ol>

      </div>
   </div>
  );
}

