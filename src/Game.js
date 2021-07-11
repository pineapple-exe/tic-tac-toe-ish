handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (squares[i] || calculateWinner(squares)) {
        return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const newCoordinates = this.generateCoordinates(squares);

    this.setState({
        history: history.concat([{
            squares: squares,
            coordinates: newCoordinates,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext}
        );
    }

generateCoordinate(position, move) {
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

//SNIPPET I
// squares[i] = this.state.xIsNext ? 'X' : 'O';
// const coordinate = this.generateCoordinate(i, squares[i]);

// this.setState({
//     history: history.concat([{
//         squares: squares,
//         move: coordinate
//     }]),


//SNIPPET II
// const visibleCoordinateLine = coordinateLine ? history.map((obj) => obj.coordinates)[step].toString().replace(',', '') : '';


//SNIPPET III
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