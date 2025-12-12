
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
	validationButton.addEventListener("click", () => getTextInput( proposition, score ), { once: true });
}

function getTextInput( proposition, score ) {
	let textInput = document.getElementById("inputEcriture");
	if (textInput.value == proposition) {
		textInput.value = "";
		startGame( score + 1 );
	}
	else {
		textInput.value = "";
		startGame( score );
	}

}

function startGame( score ) {
	let mode = getRadioInput();
	let proposition = setProposition( mode, score );

	setScore( score );

	getValidationButton( proposition, score );
}