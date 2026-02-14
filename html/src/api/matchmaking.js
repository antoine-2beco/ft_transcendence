let ws = null;
let me = null;
let gameId = null;
let mySymbol = null;
let board = Array(9).fill(null);
// to check

export const start = async () => {
	if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING))
		return;
	
	ws = new WebSocket(`wss://${location.host}/ws`);
	
  ws.onopen = () => {
	console.log("WS open");
	// queueBtn.disabled = false;
  };

  ws.onclose = (e) => {
	console.log("WS closed", e.code, e.reason || "");
	// queueBtn.disabled = true;
  };

  ws.onerror = () => log("WS error");

  ws.onmessage = (e) => {
	const msg = JSON.parse(e.data);
	console.log("WS:", msg.type);

	if (msg.type === "queue:waiting") {
	  console.log("Waiting for opponent...");
	}

	if (msg.type === "match:found") {
	  gameId = msg.gameId;
	  mySymbol = msg.symbol;
	  board = msg.board;
	  console.log("Match found. gameId=", gameId, "symbol=", mySymbol);
	//   renderBoard();
	}

	if (msg.type === "state") {
	  board = msg.board;
	//   renderBoard();
	  if (msg.winner) {
		console.log(msg.winner === "draw" ? "Draw!" : `${msg.winner} wins!`);
	  }
	}
  };
}