import './App.css';
import { useState } from 'react';
import { fetchQuote } from './quotes';

function App() {
  const [quote, setQuote] = useState('Please wait');

  fetchQuote('http://localhost:8080')
    .then((result) => setQuote(result))
    .catch((err) => setQuote(err.toString()));

  return (
    <div className="App">
      <header className="App-header">My quote is: {quote}</header>
    </div>
  );
}

export default App;
