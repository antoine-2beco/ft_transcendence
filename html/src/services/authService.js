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
