
export const joinQueue = async (ws) => {
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