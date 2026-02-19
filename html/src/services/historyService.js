import { MOCK_GAMES, MOCK_USERS } from '@/data/mockData';

const getName = (id) => MOCK_USERS.find(u => u.id === id)?.username || 'Inconnu';

export const getUserGames = async (userId) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const myGames = MOCK_GAMES.filter(g =>
        g.player1_id === userId || g.player2_id === userId
      );

      const formattedGames = myGames.map(g => ({
        id: g.id,
        date: g.created_at,
        player1: getName(g.player1_id),
        player2: getName(g.player2_id),
        winner: g.winner_id ? getName(g.winner_id) : 'Draw'
      }));

      resolve(formattedGames.reverse());
    }, 500);
  });
};

export const getAllGames = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            const formatted = MOCK_GAMES.map(g => ({
                id: g.id,
                date: g.created_at,
                player1: getName(g.player1_id),
                player2: getName(g.player2_id),
                winner: g.winner_id ? getName(g.winner_id) : 'Draw'
            }));
            resolve(formatted);
        }, 500);
    });
};
