import { MOCK_GAMES } from '@/data/mockData';

export const getAllGames = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(MOCK_GAMES);
    }, 500);
  });
};

export const getUserGames = async (username) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const myGames = MOCK_GAMES.filter(game =>
        game.player1 === username || game.player2 === username
      );
      resolve([...myGames].reverse());
    }, 500);
  });
};
