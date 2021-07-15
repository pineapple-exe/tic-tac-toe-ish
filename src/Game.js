import React from "react";
import Board from "./Board";

export default function Game(props) {
  const [history, setHistory] = React.useState([{squares: Array(16).fill(null), move: null, winnerEntity: null}]);
  const [stepNumber, setStepNumber] = React.useState(0);
  const [xIsNext, setXIsNext] = React.useState(true);

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
        const winnerName = squares[a] === 'X' ? 
                           props.players.playerX : 
                           props.players.playerO;

        return { winner: winnerName, squares: [a, b, c, d] }
      }
    }
    return null;
  }

  const handleClick = (i) => {
    const historyCopy = history.slice();
    const latest = historyCopy[stepNumber];
    const latestSquares = latest.squares.slice();

    if (latestSquares[i] || latest.winnerEntity) {
        return;
    }

    latestSquares[i] = xIsNext ? 'X' : 'O';

    const updatedStepNumber = stepNumber + 1;
    const freshWinnerEntity = calculateWinner(latestSquares);
    const updatedHistory = historyCopy.slice(0, updatedStepNumber)
                           .concat({squares: latestSquares, move: generateCoordinate(i, latestSquares[i]), winnerEntity: freshWinnerEntity});

    setHistory(updatedHistory);
    setStepNumber(updatedStepNumber);
    setXIsNext(!xIsNext);
  }

  const timeTravel = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const clearHistory = () => {
    setHistory([{squares: Array(16).fill(null), move: null, winnerEntity: null}]);
    setStepNumber(0);
    setXIsNext(true);
  }

  const status = () => {
    let statusExpression;

    if (history[stepNumber].winnerEntity) {
      statusExpression = 'Winner: ' + history[stepNumber].winnerEntity.winner;
    }
    else {
      const nextUp = xIsNext ? props.players.playerX : props.players.playerO;
      statusExpression = 'Next: ' + nextUp;
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
        <button className="timestamp" onClick={() => timeTravel(step)}>
          {stepExpression}
        </button>

        <span className="coordinate">
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
        winnerEntity={history[stepNumber].winnerEntity}
      />
      <div className="game-info">

        <div className="status">
          {status()}
        </div>

        <ol className="moves">
          {moves}
        </ol>

        <button className="clear" onClick={() => clearHistory()}>
          Clear history
        </button>
      </div>
   </div>
  );
}

