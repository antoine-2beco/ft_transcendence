const $ = (id) => document.getElementById(id);

const logEl = $("log");
const boardEl = $("board");

const registerBtn = $("register");
const loginBtn = $("login");
const queueBtn = $("queue");
const statusEl = $("status");

let ws = null;
let me = null;
let gameId = null;
let mySymbol = null;
let board = Array(9).fill(null);

function setStatus(text) {
    if (statusEl) statusEl.textContent = text;
    log(text);
}

function log(...args) {
  const line = args.map(String).join(" ");
  console.log(line);
  logEl.textContent += line + "\n";
}

async function api(path, body) {
  const res = await fetch(path, {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	credentials: "include",
	body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { res, data };
}

async function getMe() 
{
    const res = await fetch("/api/me", { credentials: "include" });
  
    if (res.status === 401) return null;
    if (!res.ok) 
    {
        log("getMe failed:", res.status);
        return null;
    }  
    const data = await res.json().catch(() => null);
    return data?.user || null;
}

function connectWs() {
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
	return;
  }

  ws = new WebSocket(`wss://${location.host}/ws`);

  ws.onopen = () => {
	log("WS open");
	queueBtn.disabled = false;
  };

  ws.onclose = (e) => {
	log("WS closed", e.code, e.reason || "");
	queueBtn.disabled = true;
    if (me) setTimeout(connectWs, 1000);
  };

  ws.onerror = () => log("WS error");

  ws.onmessage = (e) => {
	const msg = JSON.parse(e.data);
	log("WS:", msg.type);

	if (msg.type === "queue:waiting") {
	  log("Waiting for opponent...");
	}

	if (msg.type === "match:found") {
	  gameId = msg.gameId;
	  mySymbol = msg.symbol;
	  board = msg.board;
	  log("Match found. gameId=", gameId, "symbol=", mySymbol);
	  renderBoard();
	}

    if (msg.type === "reconnected") {
        gameId = msg.gameId;
        mySymbol = msg.symbol;
        board = msg.board;
        setStatus(`Reconnected. You are ${mySymbol}`);
        renderBoard();
    }
    
    if (msg.type === "opponent:disconnected") {
        setStatus(`Opponent disconnected. Auto-win in ${msg.seconds}s if they don't return.`);
    }
    
    if (msg.type === "opponent:reconnected") {
        setStatus("Opponent reconnected.");
    }
    
    if (msg.type === "game:forfeit") {
        setStatus("Opponent did not return. You win by forfeit.");
    }

	if (msg.type === "state") {
	  board = msg.board;
	  renderBoard();
	  if (msg.winner) {
		alert(msg.winner === "draw" ? "Draw!" : `${msg.winner} wins!`);
	  }
	}
  };
}

function renderBoard() {
  boardEl.innerHTML = "";

  board.forEach((cell, i) => {
	const btn = document.createElement("button");
	btn.style.height = "60px";
	btn.style.fontSize = "24px";
	btn.textContent = cell || "-";

	btn.onclick = () => {
	  if (!ws || ws.readyState !== WebSocket.OPEN) return;
	  if (gameId == null) return;

	  ws.send(JSON.stringify({
		type: "move",
		gameId,
		cell: i,
		symbol: mySymbol,
	  }));
	};

	boardEl.appendChild(btn);
  });
}


registerBtn.addEventListener("click", async () => {
  const username = $("usernameregister").value.trim();
  const email = $("emailregister").value.trim();
  const password = $("passwordregister").value;

  const { res, data } = await api("/api/register", { username, email, password });
  log("register", res.status, JSON.stringify(data));
});

loginBtn.addEventListener("click", async () => {
  const username = $("usernamelogin").value.trim();
  const password = $("passwordlogin").value;

  const { res, data } = await api("/api/login", { username, password });
  log("login", res.status, JSON.stringify(data));

  me = await getMe();
  if (me) {
	log("Logged in as", me.username);
	connectWs();
  } else {
	log("Login failed (no /me)");
  }
});

queueBtn.addEventListener("click", () => {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
	log("WS not open");
	return;
  }
  ws.send(JSON.stringify({ type: "queue:join" }));
  log("Sent queue:join");
});

window.addEventListener("load", async () => {
  me = await getMe();
  if (me) {
	log("Already logged in as", me.username);
	connectWs();
  } else {
	log("Not logged in");
	queueBtn.disabled = true;
  }
});