import React, { useState } from 'react';

function App() {
  const [partita, setPartita] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [number, setNumber] = useState('');
  const [resultText, setResultText] = useState('');

  const handleInputChange = (e) => {
    setNumber(e.target.value);
  };

  const startGame = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:8080/partita", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    setPartita(data);
    setLoading(false);
  };

  const guessNumber = async () => {
    const response = await fetch(`http://localhost:8080/partita/${partita.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ numero: parseInt(number) })
    });
    const result = await response.json();
    if (result.risultato === -1) {
      setResultText("Numero troppo piccolo!");
    } else if (result.risultato === 1) {
      setResultText("Numero troppo grande!");
    } else {
      setResultText("Hai indovinato il numero!");
    }
    setShowResults(true);
  };

  return (
    <div className="App">
      <h2>Indovina il Numero da 1 a 100</h2>
      <button onClick={startGame}>
        {isLoading ? 'Caricamento...' : 'Inizia la Partita'}
      </button>
      {partita && (
        <> <p>ID della Partita: {partita.id}</p>
          <div>
            <label htmlFor="numberInput">Indovina il Numero:</label>
            <input type="number" id="numberInput" value={number} onChange={handleInputChange}/>
            <button onClick={guessNumber}> Indovina </button>
          </div>
          {showResults && ( <p>Risultato: {resultText}</p>)}
        </>
      )}
    </div>
  );
}

export default App;
