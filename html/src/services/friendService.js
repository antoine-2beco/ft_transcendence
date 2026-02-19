import { MOCK_USERS } from '@/data/mockData';

export const getMyFriends = async (currentUserId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = MOCK_USERS.find(u => u.id === currentUserId);
      if (!currentUser || !currentUser.friends) {
        resolve([]);
        return;
      }
      const friendsList = MOCK_USERS.filter(user =>
        currentUser.friends.includes(user.id)
      );
      resolve(friendsList);
    }, 500);
  });
};
