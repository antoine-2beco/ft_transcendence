import axios from 'axios'

export const login = async (username, password) => {
    try {
      const response = await axios.post('/api/login',
		{username, password},
		{
			headers: {
				"Content-Type": "application/json"
			}
		});
		return response.data.username;
    } catch (error) {
      throw (error);
    }
  }

export const register = async (username, email, password) => {
    try {
      const response = await axios.post('/api/register',
		{username, email, password},
		{
			headers: {
				"Content-Type": "application/json"
			}
		});
		return response.data.username;
    } catch (error) {
		throw (error);
    }
  }

export const checkAuth = async () => {
	try {
      const response = await axios.get('/api/me',
		{
			headers: {
				"Content-Type": "application/json"
			}
		});
		return response;
    } catch (error) {
      throw(error);
    }
}

export const logout = async () => {
  try {
    await axios.post('/api/logout');
  } catch (error) {
    throw (error);
  }
}

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
		const response = await axios.get('/api/match-history',
			{id},
			{
			headers: {
				"Content-Type": "application/json"
			}
		});
		return response.data.games;
	} catch (e) {
		throw (e);
	}
}

export const getLeaderboard = async () => {
	try {
		const response = await axios.get('/api/leaderboard',
			{
			headers: {
				"Content-Type": "application/json"
			}
		});
		return response.data.users;
	} catch (e) {
		throw (e);
	}
}

export const addFriend = async (id) => {
	try {
		await axios.post(`/api/addFriend/${id}`,
			{
			headers: {
				"Content-Type": "application/json"
			}
		});
	} catch (e) {
		throw (e);
	}
}

export const removeFriend = async (id) => {
	try {
		await axios.delete(`/api/removeFriend/${id}`,
			{
			headers: {
				"Content-Type": "application/json"
			}
		});
	} catch (e) {
		throw (e);
	}
}

export const editUsername = async (username) => {
	try {
		await axios.patch(`/api/editUsername`,
			{ username },
			{
			headers: {
				"Content-Type": "application/json"
			}
		});
	} catch (e) {
		throw (e);
	}
}

export const uploadProfilePicture = async (uploadProfilePicture) => {
    try {
        const formData = new FormData();
        formData.append('file', uploadProfilePicture);
        const response = await axios.post(`/api/profilePicUpload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (e) {
        throw (e);
    }
}
