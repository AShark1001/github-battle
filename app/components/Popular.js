import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './popular.css';

// stateless functional component 
const SelectLanguage = ({props}) => {
	let languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

	return(
		<ul className='languages'>
			{languages.map((lang) => {
				return (
					<li
					style={lang === props.selectedLanguage ? { color: '#d0021b'}: null} 
					onClick={props.onSelect.bind(null, lang)}
					key={lang}>
						{lang}
					</li>
				)
			})}
		</ul>
	)
}

// class SelectLanguage extends Component {
// 	render() {
// 		var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

// 		return (
// 			<ul className='languages'>
// 				{languages.map((lang) => {
// 					return (
// 						<li
// 						style={lang === this.props.selectedLanguage ? { color: '#d0021b'}: null} 
// 						onClick={this.props.onSelect.bind(null, lang)}
// 						key={lang}>
// 							{lang}
// 						</li>
// 					)
// 				})}
// 			</ul>
// 		);
// 	}
// }


SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};

class Popular extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: 'All' // default state
		};

		// bind the function to the context of Popular's this
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	updateLanguage(lang) {
		this.setState(() => {
			return {
				selectedLanguage: lang
			}
		});
	}

	render() {


		return (
			<div>
				<SelectLanguage 
				selectedLanguage={this.state.selectedLanguage} 
				onSelect={this.updateLanguage} />
			</div>
		);
	}
}

export default Popular;