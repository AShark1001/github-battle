import React, { Component } from 'react';
import './app.css';

import Popular from './Popular';

// state 
// lifecycle event 
// UI => render view

class App extends Component {
	render() {
		return(
			<div className='container'>
				<Popular />
			</div>
		);
	}
}

export default App;