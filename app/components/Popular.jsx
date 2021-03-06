import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './popular.css';

import { fetchPopularRepos, } from '../common/api';

// stateless functional component 
function SelectLanguage ({ selectedLanguage, onSelect }) {
	const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

	return (
		<ul className='languages'>
			{languages.map((lang) => (
					<li
						style={lang === selectedLanguage ? { color: '#d0021b'}: null} 
						onClick={() => onSelect(lang)}
						key={lang}>
						{lang}
					</li>
				)
			)}
		</ul>
	)
}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};

function RepoGrid ({ repos }) {
	return (
		<ul className='popular-list'>
			{repos.map(({ name, stargazers_count, owner, html_url }, index) => {
				return (
					<li key={name} 
						className='popular-item'>
						<div className='popular-rank'>#{index + 1}</div>
						<ul className='space-list-items'>
							<li>
								<img 
									className='avatar'
									src={owner.avatar_url}
									alt={`Avatar for ${owner.login}`} />
							</li>
							<li>
								<a href={html_url}>{name}</a>
							</li>
							<li>@{owner.login}</li>
							<li>{stargazers_count} stars</li>
						</ul>
					</li>
				)
			})}
		</ul>
	)
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

		fetchPopularRepos(lang)
			.then((repos) => this.setState(() => ({ repos })));
	}

	render() {
		const { selectedLanguage, repos } = this.state;

		return (
			<div>
				<SelectLanguage 
				selectedLanguage={this.state.selectedLanguage} 
				onSelect={this.updateLanguage} />
				{!repos
					? <p>LOADING</p>
					: <RepoGrid repos={repos} />
				}
				
			</div>
		);
	}
}

export default Popular;