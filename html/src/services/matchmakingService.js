import { reactive } from 'vue';

export const state = reactive({
  board: Array(9).fill(null),
  winner: null,
  turn: true
});

export const playMove = (index) => {
  mockServerReceiveMove(index);
};

export const resetGame = () => {
  mockServerReset();
};


const WIN_PATTERNS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let serverBoard = Array(9).fill(null);

const mockServerReceiveMove = (index) => {
  if (serverBoard[index] || checkWinner(serverBoard)) return;

  serverBoard[index] = 'X';
  syncClient();

  if (!checkWinner(serverBoard)) {
    setTimeout(() => {
      const empty = serverBoard.map((v, i) => v === null ? i : null).filter(v => v !== null);
      if (empty.length > 0) {
        serverBoard[empty[Math.floor(Math.random() * empty.length)]] = 'O';
        syncClient();
      }
    }, 500);
  }
};

const mockServerReset = () => {
  serverBoard.fill(null);
  syncClient();
};

const checkWinner = (board) => {
  for (const p of WIN_PATTERNS) {
    if (board[p[0]] && board[p[0]] === board[p[1]] && board[p[0]] === board[p[2]])
      return board[p[0]];
  }
  return !board.includes(null) ? 'draw' : null;
};

const syncClient = () => {
  const winner = checkWinner(serverBoard);
  state.board = [...serverBoard];
  state.winner = winner;
  const moves = serverBoard.filter(c => c !== null).length;
  state.turn = (moves % 2 === 0) && !winner;
};
