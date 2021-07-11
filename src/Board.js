import React from 'react';

function Square(props) {
    return (
      <button 
        className={`square ${props.isWinner(props.index) ? "winning-square" : ""}`}
        onClick={props.onClick}
      >
          {props.value}
      </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
        isWinner={this.props.isWinner}
        index={i}
        />
      );
    }

    renderRow(indexInitial) {
      let indexIncrement = indexInitial;
      let squares = [];

      for (let i = 0; i < 4; i++) {
        squares.push(this.renderSquare(indexIncrement));
        indexIncrement++;
      }
      return squares;
    }

    renderRows(indexInitial) {
      let indexIncrement = indexInitial;
      let rows = [];

      for (let i = 0; i < 4; i++) {
        rows.push(
                  <div className="board-row">
                    {this.renderRow(indexIncrement)}
                  </div>
                );
        indexIncrement += 4;
      }
      return rows;
    }

    render() {  
      return (
        <div>
            {this.renderRows(0)}
        </div>
      );
    }
  }

export default Board;