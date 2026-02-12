import { MOCK_USERS } from '@/data/mockData';

export const loginAPI = async (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.username === "Sachito");

      if (password !== 'error' && user) {
        resolve({
          token: "fake-jwt-token-xyz-123",
          user: user
        });
      } else {
        reject("Identifiants incorrects");
      }
    }, 500);
  });
};

export const getProfileAPI = async (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === "fake-jwt-token-xyz-123") {
        resolve(MOCK_USERS.find(u => u.username === "Sachito"));
      } else {
        reject("Session expirée");
      }
    }, 300);
  });
};

export const registerAPI = async (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = MOCK_USERS.find(u => u.username.toLowerCase() === username.toLowerCase());

      if (exists) {
        reject("Ce pseudo est déjà pris.");
      } else {
        const newUser = {
          id: Date.now(),
          username: username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          status: 'online',
          stats: { wins: 0, losses: 0, elo: 1000 }
        };

        MOCK_USERS.push(newUser);

        resolve({
          token: "fake-jwt-token-new-user",
          user: newUser
        });
      }
    }, 500);
  });
};
