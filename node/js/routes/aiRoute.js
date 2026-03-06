const games = new Map();
let nextGameId = 1;

function checkWinner(b) {
    const wins = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6],
    ];
  
    for (const [a, c, d] of wins) 
    {
        if (b[a] && b[a] === b[c] && b[a] === b[d])
            return b[a];
    }
  
    if (b.every((x) => x !== null)) return "draw";
    return null;
}

function aiMove(board) {
	console.log("AI is thinking...");
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6],
    ];

    for (const [a, b, c] of wins) {
        if (board[a] === "O" && board[b] === "O" && !board[c]) return c;
        if (board[a] === "O" && board[c] === "O" && !board[b]) return b;
        if (board[b] === "O" && board[c] === "O" && !board[a]) return a;
    }

    for (const [a, b, c] of wins) {
        if (board[a] === "X" && board[b] === "X" && !board[c]) return c;
        if (board[a] === "X" && board[c] === "X" && !board[b]) return b;
        if (board[b] === "X" && board[c] === "O" && !board[a]) return a;
    }

    const empties = board.map((v, i) => v === null ? i : null).filter(i => i !== null);
    return empties[Math.floor(Math.random() * empties.length)];
}

export async function aiRoute(fastify) {
    fastify.get("/ws-ai", { websocket: true }, (ws, req) => {
        let gameId = null;
        let user;

        try {
            const token = req.cookies?.token;
            user = fastify.jwt.verify(token);
        } catch {
            ws.close(1008, "auth required");
            return;
        }

        const pingInterval = setInterval(() => {
            if (ws.readyState === ws.OPEN)
                ws.ping();
        }, 25_000);

        ws.userId = user.sub;
        ws.username = user.username;

        gameId = nextGameId++;

        const game = {
            board: Array(9).fill(null),
            turn: "X",
            finished: false,
            player: ws,
        };

        games.set(gameId, game);

        ws.send(JSON.stringify({
            type: "match:found",
            gameId,
            symbol: "X",
            board: game.board,
            turn: game.turn,
        }));

        ws.on("message", (raw) => {
            const msg = JSON.parse(raw.toString());

            if (msg.type === "move") {
                const { gameId: msgGameId, cell, symbol } = msg;
                const game = games.get(Number(msgGameId));
                if (!game || game.finished) return;
                if (game.turn !== symbol) return;
                if (game.board[cell] !== null) return;

                game.board[cell] = symbol;
                game.turn = "O";

                let winner = checkWinner(game.board);
                if (winner) {
                    game.finished = true;
                    ws.send(JSON.stringify({
                        type: "state",
                        gameId: Number(msgGameId),
                        board: game.board,
                        turn: game.turn,
                        winner,
                    }));
                    return;
                }

                const aiCell = aiMove(game.board);
                game.board[aiCell] = "O";
                game.turn = "X";

                winner = checkWinner(game.board);
                if (winner)
                    game.finished = true;

                ws.send(JSON.stringify({
                    type: "state",
                    gameId: Number(msgGameId),
                    board: game.board,
                    turn: game.turn,
                    winner,
                }));
            }

            if (msg.type === "game:manualForfeit") {
                const id = Number(msg.gameId);
                const game = games.get(id);
                if (!game || game.finished) return;

                game.finished = true;

                ws.send(JSON.stringify({
                    type: "game:manualForfeit",
                    gameId: id,
                    by: "X",
                    winner: "O",
                }));

                games.delete(id);
            }
        });

        ws.on("close", () => {
            clearInterval(pingInterval);
            if (gameId !== null) {
                games.delete(gameId);
            }
        });
    });
}