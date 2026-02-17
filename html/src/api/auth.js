import axios from 'axios' ;

export const login = async (username, password) => {
    try {
      const response = await axios.post('/api/login', 
		{username, password},
		{
			headers: {
				"Content-Type": "application/json"
			}
		});
		return response;
    } catch (error) {
      throw error;
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
		return response;
    } catch (error) {
      throw error;
    }
  }

export const getProfile = async () => {
	try {
      const response = await axios.get('/api/me',
		{
			headers: {
				"Content-Type": "application/json"
			}
		});
		return response.data.user.username;
    } catch (error) {
		  this.logout();
      throw error;
    }
}

export const logout = async () => {
  try {
    const response = await axios.post('/api/logout');
  } catch (error) {
    throw error;
  }
}