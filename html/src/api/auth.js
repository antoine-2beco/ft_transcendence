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
		return response.data.username;
    } catch (error) {
      void (error);
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
      void (error);
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
    void (error);
  }
}