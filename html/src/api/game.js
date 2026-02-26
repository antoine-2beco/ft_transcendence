
export const joinQueue = async (ws) => {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
	  throw( {status: 500} );
  }
  ws.send(JSON.stringify({ type: "queue:join" }));
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

export const leaveQueue = async (ws) => {
  if (!ws || ws.readyState !== WebSocket.OPEN)
	  throw( {status: 500, message: "WS not open"} );
  console.log("sent leave queue")
  ws.send(JSON.stringify({ type: "queue:leave" }));
}

export const forfeit = async (ws) => {
  if (!ws || ws.readyState !== WebSocket.OPEN)
	  throw( {status: 500, message: "WS not open"} );
  console.log("sent forfeit")
  ws.send(JSON.stringify({ type: "game:manualForfeit" }));
}

export const leaveGame = async (ws) => {
  if (!ws || ws.readyState !== WebSocket.OPEN)
	  throw( {status: 500, message: "WS not open"} );
  ws.close()
}
