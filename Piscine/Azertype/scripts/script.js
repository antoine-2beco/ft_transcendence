
function getRadioInput() {
	let listRadioInput = document.querySelectorAll(".optionSource input");

	if (listRadioInput[0].checked == true) {
		return "mots";
	}
	else if (listRadioInput[1].checked == true) {
		return "phrases";
	}
}

function setProposition( mode, score ) {
	let proposition = document.querySelector(".zoneProposition");
	if (score == 3) 
		return endGame();
	if (mode == "mots")
		proposition.innerText = motsPropositions[score];
	else if (mode == "phrases")
		proposition.innerText = phrasesPropositions[score];
	return proposition.innerText;
}

function setScore( score ) {
	let scoreSpan = document.querySelector(".zoneScore span");
	scoreSpan.innerText = score;
	return scoreSpan.innerText;
}

function getValidationButton( proposition, score ) {
	let validationButton = document.getElementById("btnValiderMot");
	validationButton.addEventListener("click", getTextInput, { once: true });
}

function getTextInput() {
	let textInput = document.getElementById("inputEcriture");
	let proposition = document.querySelector(".zoneProposition").innerText;
	let score = document.querySelector(".zoneScore span").innerText;
	if (textInput.value == proposition) {
		textInput.value = "";
		return startGame( Number(score) + 1 );
	}
	else {
		textInput.value = "";
		return startGame( Number(score) );
	}

}

function endGame() {
	let score = document.querySelector(".zoneScore");

	let endGameTitle = document.createElement("p");
	let endGameDiv = document.createElement("div");

	endGameTitle.textContent = endGameMessage;
	endGameDiv.setAttribute("class", "zoneEndGame");

	endGameDiv.appendChild(endGameTitle);
	score.appendChild(endGameDiv);
}

function sharePopup() {
	let popupBackground = document.querySelector(".popupBackground");
	popupBackground.classList.add("active");
}

function hideSharePopup( event ) {
	let popupBackground = document.querySelector(".popupBackground");
	if (event.target === popupBackground)
		popupBackground.classList.remove("active");
}

function sendShareForm() {
	let nameInputForm = document.getElementById("nom");
	let emailInputForm = document.getElementById("email");
	let mailto = (`mailto:${emailInputForm.value}?subject=Partage du score sur Azertype&body=Bonjour, voici le score de ${nameInputForm.value} sur Azertype !`);
	location.href = mailto;
}

function startGame( score ) {
	let mode = getRadioInput();
	let proposition = setProposition( mode, score );

	setScore( score );

	getValidationButton( proposition, score );
}