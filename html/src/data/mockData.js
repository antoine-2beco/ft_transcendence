export const MOCK_USERS = [
  {
    id: 1,
    username: "Sachito",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    stats: { wins: 42, losses: 5, elo: 1500 },
    history: [
      { id: 101, opponent: "Neo", result: "WIN", score: "3 - 1", date: "2023-11-10" },
      { id: 102, opponent: "Trinity", result: "WIN", score: "3 - 0", date: "2023-11-08" },
      { id: 103, opponent: "Smith", result: "WIN", score: "3 - 0", date: "2023-11-05" },
      { id: 104, opponent: "Neo", result: "LOSS", score: "2 - 3", date: "2023-11-01" }
    ]
  },
  {
    id: 2,
    username: "Neo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neo",
    stats: { wins: 20, losses: 10, elo: 1200 },
    history: [
      { id: 101, opponent: "Sachito", result: "LOSS", score: "1 - 3", date: "2023-11-10" },
      { id: 104, opponent: "Sachito", result: "WIN", score: "3 - 2", date: "2023-11-01" },
      { id: 105, opponent: "Smith", result: "WIN", score: "3 - 0", date: "2023-10-28" }
    ]
  },
  {
    id: 3,
    username: "Trinity",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Trinity",
    stats: { wins: 15, losses: 15, elo: 1050 },
    history: [
      { id: 102, opponent: "Sachito", result: "LOSS", score: "0 - 3", date: "2023-11-08" },
      { id: 106, opponent: "Smith", result: "WIN", score: "3 - 1", date: "2023-10-30" },
      { id: 107, opponent: "Smith", result: "LOSS", score: "2 - 3", date: "2023-10-25" }
    ]
  },
  {
    id: 4,
    username: "Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Smith",
    stats: { wins: 5, losses: 20, elo: 800 },
    history: [
      { id: 103, opponent: "Sachito", result: "LOSS", score: "0 - 3", date: "2023-11-05" },
      { id: 105, opponent: "Neo", result: "LOSS", score: "0 - 3", date: "2023-10-28" },
      { id: 106, opponent: "Trinity", result: "LOSS", score: "1 - 3", date: "2023-10-30" },
      { id: 107, opponent: "Trinity", result: "WIN", score: "3 - 2", date: "2023-10-25" }
    ]
  }
];
