import './App.css';
import { useState, useEffect } from 'react';
import { removeStopwords } from 'stopword';
import { Logo } from './Logo/Logo';
import { MainPrediction } from './MainPrediction/MainPrediction';
import { Suggested } from './Suggested/Suggested';

function App() {
	const [ url, setUrl ] = useState('');
	const [ title, setTitle ] = useState('');
	const [ strap, setStrap ] = useState('');
	const [ predictionData, setPredictionData ] = useState({});
	const [ loading, setLoading ] = useState(true);
	const [ newsLoading, setNewsLoading ] = useState(true);
	/**
   * Get current URL
   */
	useEffect(() => {
		const queryInfo = { active: true, lastFocusedWindow: true };

		chrome.tabs &&
			chrome.tabs.query(queryInfo, (tabs) => {
				const url = tabs[0].url;
				const title = tabs[0].title.split('|')[0];
				const key = removeStopwords(title.split(' '));
				fetch('http://127.0.0.1:5000/predict', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ text: title, url: url })
				})
					.then((res) => res.json())
					.then((res) => {
						if (res.newsdata !== 0){
							if (res.newsdata.articles.length >= 2) {
								let article = res.newsdata.articles[1];
								setStrap({
									title: article.title.split('-')[0].split('|')[0],
									url: article.url,
									image: article.urlToImage
								});
							} else {
								let article = res.newsdata.articles[0];
								setStrap({
									title: article.title.split('-')[0].split('|')[0],
									url: article.url,
									image: article.urlToImage
								});
							}
						}
						setNewsLoading(false);
						setLoading(false);
						setPredictionData({
							bias: res.bias,
							fact: res.fact,
							pred: Math.floor(parseFloat(res.pred) * 100)
						});
					});
				setUrl(url);
				setTitle(title);
				// let stringbuilder = key.join(' OR ');

				// fetch(
				// 	'https://newsapi.org/v2/everything?apiKey=d4eb5b20793e4892bebe84ce789ff3f9&sortBy=relevancy&sources=the-hindu,the-times-of-india,the-washington-post&pageSize=3&qInTitle=' +
				// 		stringbuilder
				// )
				// 	.then((res) => res.json())
				// 	.then((res) => {
				// 		if (res.articles) {
				// 			if (res.articles.length >= 2) {
				// 				let article = res.articles[1];
				// 				setStrap({
				// 					title: article.title.split('-')[0].split('|')[0],
				// 					url: article.url,
				// 					image: article.urlToImage
				// 				});
				// 			} else {
				// 				let article = res.articles[0];
				// 				setStrap({
				// 					title: article.title.split('-')[0].split('|')[0],
				// 					url: article.url,
				// 					image: article.urlToImage
				// 				});
				// 			}
				// 			setNewsLoading(false);
				// 		}
				// 	});
			});
	}, []);
	return (
		<div>
			<Logo />
			{!loading && (
				<MainPrediction bias={predictionData.bias} fact={predictionData.fact} pred={predictionData.pred} url={url} />
			)}
			{!newsLoading && strap && <Suggested title={strap.title} link={strap.url} image={strap.image} />}
		</div>
	);
}

export default App;
