import { db } from "../db.js";

const games = new Map();
const userToGame = new Map();
const TURN_MS = 60_000;

function clearTurnTimer(game) 
{
    if (game.turnTimer) clearTimeout(game.turnTimer);
    game.turnTimer = null;
    game.turnStartedAt = null;
}

async function endGameByForfeit(gameId, game, loserSymbol, reason) 
{
    if (!game || game.finished) return;
  
    game.finished = true;
    clearTurnTimer(game);
  
    const winnerSymbol = loserSymbol === "X" ? "O" : "X";
    const winnerId = game.playerIds[winnerSymbol];
    const loserId = game.playerIds[loserSymbol];
  
    await db("games").insert({
        player1_id: game.playerIds.X,
        player2_id: game.playerIds.O,
        winner_id: winnerId,
    });
  
    await db("users").where({ id: winnerId }).increment({ wins: 1, elo: 10 });
    await db("users").where({ id: loserId }).increment({ losses: 1, elo: -10 });
  
    for (const s of ["X", "O"]) 
    {
        const sock = game.sockets[s];
        if (sock) 
        {
            sock.send(JSON.stringify({
            type: "game:forfeit",
            gameId,
            reason,
            loser: loserSymbol,
            winner: winnerSymbol,
            }));
        }
    }
  
    userToGame.delete(game.playerIds.X);
    userToGame.delete(game.playerIds.O);
    games.delete(gameId);
}

function startTurnTimer(gameId, game) 
{
    clearTurnTimer(game);
  
    game.turnStartedAt = Date.now();
    game.turnTimer = setTimeout(() => {
        endGameByForfeit(gameId, game, game.turn, "timeout")
            .catch((e) => console.error("turn timeout forfeit failed", e));
    }, TURN_MS);
}
  

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
        
        ws.userId = Number(user.sub);
        ws.username = user.username;
        ws.send(JSON.stringify({ type: "hello", username: ws.username }));
        const existingGameId = userToGame.get(Number(ws.userId));
        if (existingGameId != null) 
        {
            const game = games.get(existingGameId);
            if (game && !game.finished) 
            {
                const symbol = game.playerIds.X === ws.userId ? "X" : game.playerIds.O === ws.userId ? "O" : null;
        
                if (symbol) 
                {
                    game.sockets[symbol] = ws;
            
                    const d = game.disconnect[symbol];
                    if (d.timer) clearTimeout(d.timer);
                    d.timer = null;
                    d.at = null;
            
                    ws.send(JSON.stringify({
                        type: "reconnected",
                        gameId: existingGameId,
                        symbol,
                        board: game.board,
                        turn: game.turn,
                    }));
            
                    const other = symbol === "X" ? "O" : "X";
                    const otherWs = game.sockets[other];
                    if (otherWs) 
                    {
                        otherWs.send(JSON.stringify({
                        type: "opponent:reconnected",
                        gameId: existingGameId,
                        }));
                    }
                }
            }
        }

        ws.on("message", async (raw) => {
            const msg = JSON.parse(raw.toString());
        
            if (msg.type === "queue:join") 
            {
                if (userToGame.has(Number(ws.userId))) 
                {
                    ws.send(JSON.stringify({ type: "error", message: "user already in a game" }));
                    return;
                }
                if (waitingPlayer === null) 
                {
                    waitingPlayer = ws;
                    ws.send(JSON.stringify({ type: "queue:waiting" }));
                    return;
                }
                if (waitingPlayer === ws) 
                {
                    ws.send(JSON.stringify({ type: "queue:waiting" }));
                    return;
                }
                if (waitingPlayer.userId === Number(ws.userId)) 
                {
                    ws.send(JSON.stringify({ type: "error", message: "same user twice" }));
                    return;
                }

                else 
                {
                    gameId = nextGameId++;
            
                    const game = {
                        board: Array(9).fill(null),
                        turn: "X",
                        finished: false,
              
                        playerIds: {
                            X: Number(waitingPlayer.userId),
                            O: Number(ws.userId),
                        },
              
                        sockets: {
                            X: waitingPlayer,
                            O: ws,
                        },
              
                        disconnect: {
                            X: { timer: null, at: null },
                            O: { timer: null, at: null },
                        },
                    };
                      
                    games.set(gameId, game);
                    userToGame.set(game.playerIds.X, gameId);
                    userToGame.set(game.playerIds.O, gameId);
                    startTurnTimer(gameId, game);
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
            if (msg.type === "queue:leave") 
            {
                if (waitingPlayer === ws) 
                {
                    waitingPlayer = null;
            
                    ws.send(JSON.stringify({
                        type: "queue:left"
                    }));
                } 
                else 
                {
                    ws.send(JSON.stringify({
                        type: "error",
                        message: "not in queue"
                    }));
                }
            
                return;
            }
            if (msg.type === "move") 
            {
                const gameId = Number(msg.gameId);
                const cell = Number(msg.cell);
              
                if (!Number.isInteger(gameId)) return;
                if (!Number.isInteger(cell) || cell < 0 || cell > 8) return;
              
                const game = games.get(gameId);
                if (!game || game.finished) return;
              
                const symbol =
                    game.playerIds.X === ws.userId ? "X" :
                    game.playerIds.O === ws.userId ? "O" :
                    null;
              
                if (!symbol) return;
                if (game.turn !== symbol) return;
                if (game.board[cell] !== null) return;
              
                game.board[cell] = symbol;
              
                const winner = checkWinner(game.board);
              
                if (winner) 
                {
                    game.finished = true;
                    clearTurnTimer(game);
                
                    let winnerId = null;
                    if (winner === "X") winnerId = game.playerIds.X;
                    else if (winner === "O") winnerId = game.playerIds.O;
                
                    await db("games").insert({
                        player1_id: game.playerIds.X,
                        player2_id: game.playerIds.O,
                        winner_id: winnerId,
                    });
                
                    if (winner === "draw") 
                    {
                        await db("users")
                        .whereIn("id", [game.playerIds.X, game.playerIds.O])
                        .increment("ties", 1);
                    } 
                    else 
                    {
                        const winnerUserId = winner === "X" ? game.playerIds.X : game.playerIds.O;
                        const loserUserId  = winner === "X" ? game.playerIds.O : game.playerIds.X;
                
                        await db("users").where({ id: winnerUserId }).increment("wins", 1).increment("elo", 10);
                        await db("users").where({ id: loserUserId }).increment("losses", 1).decrement("elo", 10);
                    }

                    for (const s of ["X", "O"]) 
                    {
                        const sock = game.sockets[s];
                        if (sock) 
                        {
                            sock.send(JSON.stringify({
                                type: "state",
                                gameId,
                                board: game.board,
                                turn: game.turn,
                                winner,
                            }));
                        }
                    }
                    userToGame.delete(game.playerIds.X);
                    userToGame.delete(game.playerIds.O);
                    games.delete(gameId);
                    return;
                }
              
                game.turn = symbol === "X" ? "O" : "X";
                startTurnTimer(gameId, game);
              
                for (const s of ["X", "O"]) 
                {
                    const sock = game.sockets[s];
                    if (sock) 
                    {
                        sock.send(JSON.stringify({
                        type: "state",
                        gameId,
                        board: game.board,
                        turn: game.turn,
                        winner: null,
                        }));
                    }
                }
              
                return;
            }
            if (msg.type === "game:manualForfeit") 
            {
                const gameId = Number(msg.gameId);
                if (!Number.isInteger(gameId)) return;
              
                const game = games.get(gameId);
                if (!game || game.finished) return;
              
                const symbol =
                    game.playerIds.X === ws.userId ? "X" :
                    game.playerIds.O === ws.userId ? "O" :
                    null;
              
                if (!symbol) return;
              
                const other = symbol === "X" ? "O" : "X";
                const winnerId = game.playerIds[other];
                const loserId = game.playerIds[symbol];
              
                game.finished = true;
              
                await db("games").insert({
                    player1_id: game.playerIds.X,
                    player2_id: game.playerIds.O,
                    winner_id: winnerId,
                });
              
                await db("users").where({ id: winnerId }).increment({ wins: 1, elo: 10 });
                await db("users").where({ id: loserId }).increment({ losses: 1, elo: -10 });
              
                for (const s of ["X", "O"]) 
                {
                    const sock = game.sockets[s];
                    if (sock) 
                    {
                            sock.send(JSON.stringify({
                                type: "game:manualForfeit",
                                gameId,
                                by: symbol,
                                winner: other, 
                            }));
                    }
                }

                clearTurnTimer(game);
                userToGame.delete(game.playerIds.X);
                userToGame.delete(game.playerIds.O);
                games.delete(gameId);
              
                return;
            }
        });
        
        ws.on("close", async () => {
            clearInterval(pingInterval);
      
            if (waitingPlayer === ws) waitingPlayer = null;
      
            const gameId = userToGame.get(ws.userId);
            if (!gameId) return;
      
            const game = games.get(gameId);
            if (!game || game.finished) return;
      
            const symbol = game.playerIds.X === ws.userId ? "X" : game.playerIds.O === ws.userId ? "O" : null;
      
            if (!symbol) return;
      
            game.sockets[symbol] = null;
      
            const other = symbol === "X" ? "O" : "X";
            const otherWs = game.sockets[other];
      
            if (otherWs) 
            {
                otherWs.send(JSON.stringify({
                    type: "opponent:disconnected",
                    gameId,
                    seconds: 30,
                }));
            }
      
            if (!game.disconnect[symbol].timer) 
            {
                game.disconnect[symbol].at = Date.now();
        
                game.disconnect[symbol].timer = setTimeout(async () => {
                    if (game.finished) return;
                    if (game.sockets[symbol] !== null) return;
        
                    game.finished = true;
        
                    const winnerSymbol = other;
                    const winnerId = game.playerIds[winnerSymbol];
        
                    const loserSymbol = winnerSymbol === "X" ? "O" : "X";
                    const loserId = game.playerIds[loserSymbol];

                    await db("games").insert({
                        player1_id: game.playerIds.X,
                        player2_id: game.playerIds.O,
                        winner_id: winnerId,
                    });
                    await db("users").where({ id: winnerId })
                        .increment("wins", 1)
                        .increment("elo", 10);

                    await db("users").where({ id: loserId })
                        .increment("losses", 1)
                        .decrement("elo", 10);
        
                    const stillThere = game.sockets[other];
                    if (stillThere) 
                    {
                        stillThere.send(JSON.stringify({
                            type: "game:forfeit",
                            gameId,
                        }));
                    }
        
                    userToGame.delete(game.playerIds.X);
                    userToGame.delete(game.playerIds.O);
                    games.delete(gameId);
                }, 30_000);
            }
        });
    });
}