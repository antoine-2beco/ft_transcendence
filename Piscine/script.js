

function identificationSystem() {
	let tries = 0;

	while (tries < 3) {
		let userPass = prompt("Entrez votre code d'acces : ");

		if (userPass === "qwerty") {
			console.log("Hello World !");
			break;
		} else {
			console.log("Acces refuse !")
		}
		tries++;
	}
}

function elementsHandling() {
	let baliseZoneLeJeu = document.getElementById("zoneLeJeu"); // recupere le HTMLElement avec l'id du div
	console.log(baliseZoneLeJeu); // print le HTMLElement en console
	console.log(baliseZoneLeJeu.clientHeight);

	let baliseZoneLeJeuSpan = document.querySelector("#zoneLeJeu span");
	console.log(baliseZoneLeJeuSpan);

	let listInputRadio = document.querySelectorAll(".zoneChoix input");
	for (let i = 0; i < listInputRadio.length; i++) {
		console.log(listInputRadio[i]);
		if (listInputRadio[i].checked == true)
			console.log(listInputRadio[i].id + " is checked !") 
	}
}

// identificationSystem();
elementsHandling();