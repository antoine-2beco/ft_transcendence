import { useGameStore } from '../stores/game';

export const start = async () => {
  const game = useGameStore();
  let ws = game.matchmaking.ws;

	if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING))
		return;
	
	ws = new WebSocket(`wss://${location.host}/ws`);
  console.log(ws);
	
  ws.onopen = () => {
	  console.log("WS open");
  };

  ws.onclose = (e) => {
	  console.log("WS closed", e.code, e.reason || "");
  };

  ws.onerror = () => console.log("WS error");

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    console.log("WS:", msg.type);

    if (msg.type === "queue:waiting") {
      console.log("Waiting for opponent...");
      game.searching = true;
    }

    if (msg.type === "match:found") {
      game.matchmaking.gameId = msg.gameId;
      game.symbol = msg.symbol;
      game.board = msg.board;
      game.opponent = true;
    }

    if (msg.type === "state") {
      game.board = msg.board;
      if (!msg.winner)
        game.isPlayerTurn = false;
      else if (msg.winner == "draw")
        game.isPlayerTurn = true;
      else
        game.winner = msg.winner;
    }
  };
}

export const joinQueue = async (ws) => {
  console.log(ws);
  if (!ws || ws.readyState !== WebSocket.OPEN) {
	  console.log("WS not open");
    return;
  }
  ws.send(JSON.stringify({ type: "queue:join" }));
  console.log("Sent join queue");
}

export const leaveMatchmaking = async (ws) => {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
	  console.log("WS not open");
	  return;
  }
  ws.send(JSON.stringify({ type: "close" }));
  console.log("Sent close");
}

export const playMove = async (ws, cell, gameId, symbol) => {
  if (!ws || ws.readyState !== WebSocket.OPEN)
    return;
  if (gameId == null)
    return;

  ws.send(JSON.stringify({
    type: "move",
    gameId,
    cell,
    symbol,
  }));
}

// playAiBtn.addEventListener("click", () => {
//   if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING))
//     ws.close();

//   ws = new WebSocket(`wss://${location.host}/ws-ai`);

//   ws.onopen = () => {
//     log("AI WS open");
//     ws.send(JSON.stringify({ type: "queue:join" }));
//   };

//   ws.onclose = (e) => log("AI WS closed", e.code, e.reason || "");
//   ws.onerror = () => log("AI WS error");

//   ws.onmessage = (e) => {
//     const msg = JSON.parse(e.data);
//     log("WS:", msg.type);

//     if (msg.type === "match:found") {
//       gameId = msg.gameId;
//       mySymbol = msg.symbol;
//       board = msg.board;
//       log("AI game started. gameId=", gameId, "symbol=", mySymbol);
//       renderBoard();
//     }

//     if (msg.type === "state") {
//       board = msg.board;
//       renderBoard();
//       if (msg.winner) {
//         alert(msg.winner === "draw" ? "Draw!" : `${msg.winner} wins!`);
//       }
//     }
//   };
// });