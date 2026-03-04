import axios from 'axios'

export const login = async (username, password) => {
    return await axios.post('/api/login', {username, password});
  }

export const register = async (username, email, password) => {
    return await axios.post('/api/register', {username, email, password});
  }

export const checkAuth = async () => {
    return await axios.get('/api/me')
}

export const logout = async () => {
    await axios.post('/api/logout');
}

export const getProfile = async () => {
    return await axios.get('/api/profile');
}

export const getGames = async (id) => {
    const response = await axios.get('/api/match-history', {id});
    return response.data.games;
}

export const getLeaderboard = async () => {
    const response = await axios.get('/api/leaderboard');
    return response.data.users;
}

export const addFriend = async (id) => {
    return await axios.post(`/api/addFriend/${id}`);
}

export const removeFriend = async (id) => {
    return await axios.delete(`/api/removeFriend/${id}`);
}

export const editUsername = async (username) => {
    return await axios.patch(`/api/editUsername`, {username},);
}

export const uploadProfilePicture = async (uploadProfilePicture) => {
    const formData = new FormData();
    formData.append('file', uploadProfilePicture);
    return await axios.post(`/api/profilePicUpload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export const setStatus = async (status) => {
    return await(axios.post('/api/statusUpdater', {status}));
}