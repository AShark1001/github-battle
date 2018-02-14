import axios from 'axios';

// rate-limiting github	
// const ID = "your_client_id";
// const SECRET = "your_secret_id";
// const PARAMS = `&client_id=${ID}&client_secret=${SECRET}`;

function getProfile (username) {
	return axios.get(`https://api.github.com/users/${username}`)
		.then((user) => user.data);
}

function getRepos (username) {
	return axios.get(`https://api.github.com/users/${username}/repos`);
}

function getStarCount (repos) {
	return repos.data.reduce((count, repo) => {
		return count + repo.stargazers_count;
	}, 0);
}

function calculateScore ({ followers }, repos) {
	return (followers * 3) + getStarCount(repos);
}

function handleError (error) {
	console.warn(error);
	return null;
}

function getUserData (player) {
	return Promise.all([
		getProfile(player),
		getRepos(player)
	]).then(([profile,repos]) => ({
		profile,
		score: calculateScore(profile, repos)
	}));
}

function sortPlayers (players) {
	return players.sort((a,b) =>  b.score - a.score);
}

export function	battle (players) {
	return Promise.all(players.map(getUserData))
	 .then(sortPlayers)
	 .catch(handleError);
}

export function fetchPopularRepos (language) {
	let encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

	return axios.get(encodedURI)
		.then((response) => {
			return response.data.items;
	});
}