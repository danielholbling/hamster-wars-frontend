import React from 'react';
import './App.css';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import Start from './components/Start';
import Battle from './components/Battle';
import Stats from './components/Stats';
import Upload from './components/Upload';

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<div>
						<h1>Hamster</h1>
						<img src="/fathamster.png" alt="logo" />
						<h1>Wars</h1>
					</div>
					<nav>
						<NavLink to="/" activeClassName="active" exact={true}>Start</NavLink>
						<NavLink to="/battle/:id1/:id2" activeClassName="active">Battle</NavLink>
						<NavLink to="/statistics" activeClassName="active">Stats</NavLink>
						<NavLink to="/upload" activeClassName="active">Upload</NavLink>
					</nav>
				</header>
				<main>
					<Switch>
						<Route path="/upload"><Upload /></Route>
						<Route path="/statistics"><Stats /></Route>
						<Route path="/battle/:id1/:id2"><Battle /></Route>
						<Route path="/"><Start /></Route>
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;
