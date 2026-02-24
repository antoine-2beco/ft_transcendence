import axios from 'axios'

export const getProfile = async (id) => {
	try {
		const response = await axios.get('/api/profile',
			{id},
			{
			headers: {
				"Content-Type": "application/json"
			}
		});
		return response.data.user;
	} catch (e) {
		throw (e);
	}
}

export const getGames = async (id) => {
	try {
		const response = await axios.get('api/match-history',
			{id},
			{
			headers: {
				"Content-Type": "application/json"
			}
		});
		return (response.data.games);
	} catch (e) {
		throw (e);
	}
}
