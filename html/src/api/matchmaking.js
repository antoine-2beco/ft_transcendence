
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
