import axios from 'axios' ;

export const login = async (username, password) => {
	const response = await axios.post('/api/login', 
	{username, password},
	{
		headers: {
			"Content-Type": "application/json"
		}
	});
	return response.data.username;
  }

export const register = async (username, email, password) => {
	const response = await axios.post('/api/register', 
	{username, email, password},
	{
		headers: {
			"Content-Type": "application/json"
		}
	});
	return response.data.username;
  }

export const getProfile = async () => {
	try {
      const response = await axios.get('/api/me',
		{
			headers: {
				"Content-Type": "application/json"
			}
		});
		return response;
    } catch (error) {
		  this.logout();
      throw error;
    }
}

export const logout = async () => {
  await axios.post('/api/logout');
}