import './App.css';
import { useState, useEffect } from 'react';
import { removeStopwords } from 'stopword';

function App() {
  const [ url, setUrl ] = useState('');
	const [ title, setTitle ] = useState('');
	const [ strap, setStrap ] = useState('');
	const [ predictionData, setPredictionData ] = useState({});
	const [ loading, setLoading ] = useState(true);
	const [ newsLoading, setNewsLoading ] = useState(true);
  return (
    <div>
    </div>
  );
}

export default App;
