import { MOCK_USERS, MOCK_FRIENDS } from '@/data/mockData';

export const getMyFriends = async (currentUserId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const relationships = MOCK_FRIENDS.filter(f => f.userId === currentUserId || f.friendId === currentUserId);

      const friendIds = relationships.map(r => r.userId === currentUserId ? r.friendId : r.userId);

      const friendsList = MOCK_USERS.filter(user => friendIds.includes(user.id));

      resolve(friendsList);
    }, 500);
  });
};
