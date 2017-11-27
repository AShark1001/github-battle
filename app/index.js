import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './app.css';

// state 
// lifecycle event 
// UI => render view

class App extends Component {
	render() {
		return(
			<div>
				Hello from React!
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
);