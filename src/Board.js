import React from 'react';

function Square(props) {
    return (
      <button 
        className={`square ${props.isWinner.includes(props.index) ? "winning-square" : ""}`}
        onClick={(e) => props.onClick()}
      >
          {props.value}
      </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
        key={i}
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
        isWinner={this.props.isWinner(this.props.squares) ? this.props.isWinner(this.props.squares).squares : []}
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
                  <div className="board-row" key={i}>
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