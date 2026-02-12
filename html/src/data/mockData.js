export const MOCK_USERS = [
  {
    id: 1,
    username: "Sachito",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    stats: { wins: 42, losses: 5, elo: 1500 }
  },
  {
    id: 2,
    username: "Neo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neo",
    stats: { wins: 20, losses: 10, elo: 1200 }
  },
  {
    id: 3,
    username: "Trinity",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Trinity",
    stats: { wins: 15, losses: 15, elo: 1050 }
  },
  {
    id: 4,
    username: "Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Smith",
    stats: { wins: 5, losses: 20, elo: 800 }
  }
];

export const MOCK_GAMES = [
  { id: 101, player1: "Sachito", player2: "Neo", winner: "Sachito", date: "2023-11-10" },
  { id: 102, player1: "Trinity", player2: "Sachito", winner: "Sachito", date: "2023-11-08" },
  { id: 103, player1: "Smith", player2: "Neo", winner: "Neo", date: "2023-11-05" },
  { id: 104, player1: "Neo", player2: "Trinity", winner: "Draw", date: "2023-11-01" },
  { id: 105, player1: "Sachito", player2: "Smith", winner: "Sachito", date: "2023-10-28" }
];

export const MOCK_FRIENDS = [
  { userId: 1, friendId: 2 },
  { userId: 1, friendId: 3 }
];
