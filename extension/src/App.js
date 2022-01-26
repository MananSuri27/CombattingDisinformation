import './App.css';
import { useState, useEffect } from 'react';
import { removeStopwords } from 'stopword';
import { Logo } from './Logo/Logo';

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
		</div>
	);
}

export default App;
