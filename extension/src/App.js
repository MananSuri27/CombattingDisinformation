import './App.css';
import { useState, useEffect } from 'react';
import { removeStopwords } from 'stopword';
import { Logo } from './Logo/Logo';
import { MainPrediction } from './MainPrediction/MainPrediction';

function App() {
	const [ url, setUrl ] = useState('');
	const [ title, setTitle ] = useState('');
	const [ strap, setStrap ] = useState('');
	const [ predictionData, setPredictionData ] = useState({});
	const [ loading, setLoading ] = useState(true);
	const [ newsLoading, setNewsLoading ] = useState(true);

	useEffect(() => {
		const queryInfo = { active: true, lastFocusedWindow: true };

	}, []);
	return (
		<div>
			<Logo />
      <MainPrediction bias={"left"} fact={"mixed"} pred={99}/>
		</div>
	);
}

export default App;
