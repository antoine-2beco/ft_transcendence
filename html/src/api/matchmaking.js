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

export const joinQueue = async () => {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
	  console.log("WS not open");
    return;
  }
  ws.send(JSON.stringify({ type: "queue:join" }));
  console.log("Sent join queue");
}

export const leaveMatchmaking = async () => {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
	  console.log("WS not open");
	  return;
  }
  ws.send(JSON.stringify({ type: "close" }));
  console.log("Sent close");
}

// queueBtn.addEventListener("click", () => {
//   if (!ws || ws.readyState !== WebSocket.OPEN) {
// 	log("WS not open");
// 	return;
//   }
//   ws.send(JSON.stringify({ type: "queue:join" }));
//   log("Sent queue:join");
// });

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