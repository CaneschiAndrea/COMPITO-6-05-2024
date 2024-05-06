import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

async function App() {
  const [partita,setPartita] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [showresults, setResults]= useState(false);
  async function start(){
    const response = await fetch("http://localhost:8080/partita" , {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const r = await response.json();
    setPartita(r);
    setLoading(false);
    
  }
  return (
    <div className="App">
      <h2>INDOVINA NUMERO</h2>
      <button onClick={start}>Start the Game !!!</button>
      {showresults }
      {isLoading ?<p>Loading:</p> :<><span>ID:</span>{partita.id}</>}
    </div>
  );
}

export default App;
