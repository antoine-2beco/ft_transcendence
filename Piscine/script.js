

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



identificationSystem();