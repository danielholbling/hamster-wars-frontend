import React from 'react';
import './App.css';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<h1>Hamster Wars</h1>
					<nav>
						<NavLink to="/" activeClassName="active" exact={true}>Start</NavLink>
						<NavLink to="/battle/:id1/:id2" activeClassName="active">Battle</NavLink>
						<NavLink to="/stats" activeClassName="active">Stats</NavLink>
						<NavLink to="/upload" activeClassName="active">Upload new hamster</NavLink>
					</nav>
				</header>
				<main>
					<Switch>
						<Route path="/upload">Upload</Route>
						<Route path="/stats">Stats</Route>
						<Route path="/battle/:id1/:id2">Battle</Route>
						<Route path="/">Landing page</Route>
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;
