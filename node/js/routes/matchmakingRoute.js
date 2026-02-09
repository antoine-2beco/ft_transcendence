const games = new Map();

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

export async function matchmakingRoute(fastify)
{
    let waitingPlayer = null;
    let nextGameId = 1;

    fastify.get("/ws", { websocket: true }, (ws, req) => {
        // fastify.log.info({ cookie: req.headers.cookie }, "WS cookie header");
        let gameId = null;
        // let symbol = null;
        let user;
        try 
        {
            const token = req.cookies?.token;
            user = fastify.jwt.verify(token);
        } 
        catch 
        {
            ws.close(1008, "auth required");
            return;
        }
        const pingInterval = setInterval(() => {
            if (ws.readyState === ws.OPEN)
                ws.ping();
        }, 25_000);
        
        ws.userId = user.sub;
        ws.username = user.username;
        ws.send(JSON.stringify({ type: "hello", username: ws.username }));
    
        ws.on("message", (raw) => {
            const msg = JSON.parse(raw.toString());
        
            if (msg.type === "queue:join") 
            {
                if (waitingPlayer === null) 
                {
                    waitingPlayer = ws;
                    ws.send(JSON.stringify({ type: "queue:waiting" }));
                } 
                else 
                {
                    gameId = nextGameId++;
            
                    const game = {
                        board: Array(9).fill(null),
                        turn: "X",
                        finished: false,
                        players: {
                          X: waitingPlayer,
                          O: ws,
                        },
                    };
                      
                    games.set(gameId, game);
                        waitingPlayer.send(JSON.stringify({
                            type: "match:found",
                            gameId,
                            symbol: "X",
                            board: game.board,
                            turn: game.turn,
                    }));
                      
                    ws.send(JSON.stringify({
                        type: "match:found",
                        gameId,
                        symbol: "O",
                        board: game.board,
                        turn: game.turn,
                    }));
                      
                    waitingPlayer = null;
                }
            }
            if (msg.type === "move") 
            {
                const { gameId, cell, symbol } = msg;
                const game = games.get(gameId);
                if (!game || game.finished) return;
              
                if (game.turn !== symbol) return;
                if (game.board[cell] !== null) return;
              
                game.board[cell] = symbol;
                game.turn = symbol === "X" ? "O" : "X";
              
                const winner = checkWinner(game.board);
                if (winner)
                  game.finished = true;
              
                for (const p of Object.values(game.players)) 
                {
                    p.send(JSON.stringify({
                        type: "state",
                        gameId,
                        board: game.board,
                        turn: game.turn,
                        winner,
                    }));
                }
            }
        });
        
        ws.on("close", () => {
            clearInterval(pingInterval);
            if (waitingPlayer === ws) 
                waitingPlayer = null;
        });
    });
}