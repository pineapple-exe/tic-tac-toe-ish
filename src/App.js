import './App.css';
import React from 'react';
import './board.css';
import './Board.js';
import Game from './Game.js';
import Form from './Form';

function App() {
  const [names, setNames] = React.useState({playerX: null, playerO: null});

  const handleCallback = (names) => {
    setNames(names);
  }

  return (
    <div className="App">
      {  names.playerX == null ? 
        <Form onSubmit={setNames} parentCallback={handleCallback} /> :
        <Game players={names} />
      }
    </div>
  );
}

export default App;
