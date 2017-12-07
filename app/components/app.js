import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './app.css';

import Nav from './Nav';
import Popular from './Popular';

// state 
// lifecycle event 
// UI => render view

class App extends Component {
	render() {
		return(
			<Router>
				<div className='container'>
					<Nav />
					<Route path='/popular' component={Popular} />
				</div>
			</Router>
			
		);
	}
}

export default App;