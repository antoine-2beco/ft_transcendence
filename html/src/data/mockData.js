const USER_COUNT = 100;
const GAME_COUNT = 300;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toISOString().split('T')[0];
};

const generateUsers = () => {
  const users = [];
  const statuses = ['online', 'offline', 'in-game'];

  for (let i = 1; i <= USER_COUNT; i++) {
    const friendsIds = [];
    const friendLimit = (i === 1) ? 15 : getRandomInt(0, 5);

    while (friendsIds.length < friendLimit) {
      const randomFriendId = getRandomInt(1, USER_COUNT);
      if (randomFriendId !== i && !friendsIds.includes(randomFriendId)) {
        friendsIds.push(randomFriendId);
      }
    }

    const wins = getRandomInt(0, 100);
    const losses = getRandomInt(0, 100);
    const ties = getRandomInt(0, 20);
    const calculatedElo = 1000 + (wins * 10) - (losses * 5);

    users.push({
      id: i,
      username: `Player_${i}`,
      email: `player${i}@example.com`,
      password_hash: "generic_hash",
      profile_picture_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=Player_${i}`,
      language: "en",
      status: getRandomItem(statuses),
      elo: calculatedElo < 0 ? 0 : calculatedElo,
      wins: wins,
      losses: losses,
      ties: ties,
      friends: friendsIds
    });
  }
  return users;
};

export const MOCK_USERS = generateUsers();


const generateGames = () => {
  const games = [];
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3);

  for (let i = 1; i <= GAME_COUNT; i++) {
    let p1Id = getRandomInt(1, USER_COUNT);
    let p2Id = getRandomInt(1, USER_COUNT);

    while (p1Id === p2Id) {
      p2Id = getRandomInt(1, USER_COUNT);
    }

    let winnerId = null;
    if (Math.random() > 0.1) {
      winnerId = Math.random() > 0.5 ? p1Id : p2Id;
    }

    games.push({
      id: 1000 + i,
      player1_id: p1Id,
      player2_id: p2Id,
      winner_id: winnerId,
      created_at: randomDate(startDate, endDate)
    });
  }
  return games.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const MOCK_GAMES = generateGames();
