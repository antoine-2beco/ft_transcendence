// start the game
document.addEventListener("DOMContentLoaded",  () => startGame(0));

// handle game mode
document.querySelectorAll(".optionSource input")[0].addEventListener("change", () => startGame(0));
document.querySelectorAll(".optionSource input")[1].addEventListener("change", () => startGame(0));

// handle share btn
document.querySelector(".zonePartage button").addEventListener("click", () => sharePopup());
document.querySelector(".popupBackground").addEventListener("click", (event) => hideSharePopup(event));
document.querySelector(".popup button").addEventListener("click", () => sendShareForm());