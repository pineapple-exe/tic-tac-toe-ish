import React from 'react';

export default function Form(props) {
    const [names, setNames] = React.useState({playerX: 'X', playerO: 'O'});

    const submit = (event) => {
        props.parentCallback(names);
        event.preventDefault();
    }

    return (
        <form onSubmit={submit}>
            <input 
                type="text" 
                placeholder="Player X" 
                name="player-x" 
                onChange={(e) => setNames({ ...names,
                    playerX: e.target.value
                })}
            />

            <input 
                type="text" 
                placeholder="Player O" 
                name="player-o" 
                onChange={(e) => setNames({ ...names,
                    playerO: e.target.value
                })}
            />

            <button type="submit">Submit</button>
        </form>
    );
}