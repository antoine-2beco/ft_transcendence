const $ = (id) => document.getElementById(id);

const logEl = $("log");
const boardEl = $("board");

const registerBtn = $("register");
const loginBtn = $("login");
const queueBtn = $("queue");
const playAiBtn = $("playai");
const statusEl = $("status");
const addFriendBtn = $("addFriend");
const friendIdInput = $("friendId");
const uploadPicBtn = $("uploadPic");
const profilePicInput = $("profilePic");
const profilePreview = $("profilePreview");
const myPfpEl = $("myPfp");
const newUsernameInput = $("newUsername");
const updateUsernameBtn = $("updateUsername");
const removeFriendBtn = $("removeFriend");
const removeFriendInput = $("removeFriendId");
const forfeitBtn = $("forfeit");
const leaveQueueBtn = $("leaveQueue");

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

async function loadMyProfilePicture() {
    const res = await fetch("/api/profile", { credentials: "include" });
    if (!res.ok) return;
  
    const data = await res.json().catch(() => null);
    const url = data?.user?.profile_picture_url;
  
    if (url && myPfpEl) {
      myPfpEl.src = url;
      myPfpEl.style.display = "inline-block";
    } else if (myPfpEl) {
      myPfpEl.style.display = "none";
    }
}

function connectWs() {
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
	return;
  }

  ws = new WebSocket(`wss://${location.host}/ws`);

  ws.onopen = () => {
	log("WS open");
	queueBtn.disabled = false;
	playAiBtn.disabled = false;
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
    if (msg.type === "queue:left") {
        log("Left queue");
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

    if (msg.type === "game:manualForfeit") {
        setStatus(`Game ended by forfeit. Winner: ${msg.winner}`);
        gameId = null;
        mySymbol = null;
        queueBtn.disabled = false;
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
    await loadMyProfilePicture();
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

playAiBtn.addEventListener("click", () => {
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING))
    ws.close();

  ws = new WebSocket(`wss://${location.host}/ws-ai`);

  ws.onopen = () => {
    log("AI WS open");
    ws.send(JSON.stringify({ type: "queue:join" }));
  };

  ws.onclose = (e) => log("AI WS closed", e.code, e.reason || "");
  ws.onerror = () => log("AI WS error");

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    log("WS:", msg.type);

    if (msg.type === "match:found") {
      gameId = msg.gameId;
      mySymbol = msg.symbol;
      board = msg.board;
      log("AI game started. gameId=", gameId, "symbol=", mySymbol);
      renderBoard();
    }

    if (msg.type === "state") {
      board = msg.board;
      renderBoard();
      if (msg.winner) {
        alert(msg.winner === "draw" ? "Draw!" : `${msg.winner} wins!`);
      }
    }
  };
});

window.addEventListener("load", async () => {
  me = await getMe();
  if (me) {
	log("Already logged in as", me.username);
    await loadMyProfilePicture();
	connectWs();
	playAiBtn.disabled = false;
  } else {
	log("Not logged in");
	queueBtn.disabled = true;
  }
});

addFriendBtn.addEventListener("click", async () => {
    const friendId = friendIdInput.value.trim();
  
    if (!friendId) {
      log("Please enter a user ID");
      return;
    }
  
    const res = await fetch(`/api/addFriend/${friendId}`, {
      method: "POST",
      credentials: "include",
    });
  
    const data = await res.json().catch(() => ({}));
  
    log("addFriend", res.status, JSON.stringify(data));
});

uploadPicBtn.addEventListener("click", async () => {
    const file = profilePicInput.files[0];
  
    if (!file) {
      log("No file selected");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    const res = await fetch("/api/profilePicUpload", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
  
    const data = await res.json().catch(() => ({}));
  
    log("upload", res.status, JSON.stringify(data));
  
    if (res.ok && data.profile_picture_url) {
      profilePreview.src = data.profile_picture_url;
    }
});

profilePicInput.addEventListener("change", () => {
    const file = profilePicInput.files[0];
    if (!file) return;
  
    profilePreview.src = URL.createObjectURL(file);
});

updateUsernameBtn.addEventListener("click", async () => {
    const username = newUsernameInput.value.trim();
    if (!username) {
      log("Please enter a username");
      return;
    }
  
    const res = await fetch("/api/editUsername", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username }),
    });
  
    const data = await res.json().catch(() => ({}));
    log("updateUsername", res.status, JSON.stringify(data));
  
    if (res.ok) {
      setStatus(`Username updated to ${data.username}`);
      me = await getMe();
    }
});

removeFriendBtn.addEventListener("click", async () => {
    const friendId = removeFriendInput.value.trim();
  
    if (!friendId) {
      log("Please enter a user ID");
      return;
    }
  
    if (!Number.isInteger(Number(friendId))) {
      log("Invalid ID");
      return;
    }
  
    const res = await fetch(`/api/removeFriend/${friendId}`, {
      method: "DELETE",
      credentials: "include",
    });
  
    const data = await res.json().catch(() => ({}));
  
    log("removeFriend", res.status, JSON.stringify(data));
});

forfeitBtn.addEventListener("click", () => {
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    if (gameId == null) return;
  
    ws.send(JSON.stringify({ type: "game:manualForfeit", gameId }));
    setStatus("You forfeited.");
});

leaveQueueBtn.addEventListener("click", () => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      log("WS not open");
      return;
    }
  
    ws.send(JSON.stringify({ type: "queue:leave" }));
    log("Sent queue:leave");
});

setInterval(() => {
    fetch("/api/onlineUpdater", { method: "POST", credentials: "include" })
        .catch(() => {});
}, 30_000);