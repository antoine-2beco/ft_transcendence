import { MOCK_USERS } from '@/data/mockData';

export const getLeaderboard = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      const sortedUsers = [...MOCK_USERS].sort((a, b) => b.elo - a.elo);
      resolve(sortedUsers);
    }, 500);
  });
};
