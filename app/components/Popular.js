import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './popular.css';

import API from '../common/api';

// // stateless functional component 
// const SelectLanguage = ({props}) => {
// 	let languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

// 	return(
// 		<ul className='languages'>
// 			{languages.map((lang) => {
// 				return (
// 					<li
// 					style={lang === props.selectedLanguage ? { color: '#d0021b'}: null} 
// 					onClick={props.onSelect.bind(null, lang)}
// 					key={lang}>
// 						{lang}
// 					</li>
// 				)
// 			})}
// 		</ul>
// 	)
// }

class SelectLanguage extends Component {
	render() {
		var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

		return (
			<ul className='languages'>
				{languages.map((lang) => {
					return (
						<li
						style={lang === this.props.selectedLanguage ? { color: '#d0021b'}: null} 
						onClick={this.props.onSelect.bind(null, lang)}
						key={lang}>
							{lang}
						</li>
					)
				})}
			</ul>
		);
	}
}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};

class RepoGrid extends Component {
	render() {
		return (
			<ul className='popular-list'>
				{this.props.repos.map((repo, index) => {
					return (
						<li key={repo.name} 
							className='popular-item'>
							<div className='popular-rank'>#{index + 1}</div>
							<ul className='space-list-items'>
								<li>
									<img 
										className='avatar'
										src={repo.owner.avatar_url}
										alt={`Avatar for ${repo.owner.login}`} />
								</li>
								<li>
									<a href={repo.html_url}>{repo.name}</a>
								</li>
								<li>@{repo.owner.login}</li>
								<li>{repo.stargazers_count} stars</li>
							</ul>
						</li>
					)
				})}
			</ul>
		)
	}
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
}

class Popular extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: 'All', // default state
			repos: null 
		};

		// bind the function to the context of Popular's this
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage(lang) {
		this.setState(() => {
			return {
				selectedLanguage: lang,
				repos: null
			}
		});

		API.fetchPopularRepos(lang)
			.then((repos) => { 
				this.setState(() => {
					return {
						repos: repos
					}
				})
			});
	}

	render() {
		return (
			<div>
				<SelectLanguage 
				selectedLanguage={this.state.selectedLanguage} 
				onSelect={this.updateLanguage} />
				{!this.state.repos
					? <p>LOADING</p>
					: <RepoGrid repos={this.state.repos} />
				}
				
			</div>
		);
	}
}

export default Popular;