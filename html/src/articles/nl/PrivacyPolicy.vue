<template>
  <div class="article">
	<h1>Privacybeleid</h1>
	<p class="last-updated">Laatst bijgewerkt: 17 februari 2026</p>

	<section>
	  <h2>1. Inleiding</h2>
	  <p>
		Dit privacybeleid beschrijft hoe ons Tic-Tac-Toe multiplayer platform
		("het Platform") uw persoonlijke gegevens verzamelt, gebruikt en beschermt.
		Dit Platform is een lokaal gehost schoolproject en is niet bedoeld voor
		publiek of commercieel gebruik.
	  </p>
	</section>

	<section>
	  <h2>2. Informatie die we verzamelen</h2>

	  <h3>2.1 Informatie die u verstrekt</h3>
	  <ul>
		<li><strong>E-mailadres</strong> — verzameld tijdens registratie om uw account te identificeren.</li>
		<li><strong>Wachtwoord</strong> — opgeslagen in gehashte vorm om uw account te beveiligen. We slaan nooit uw wachtwoord in klare tekst op en hebben er ook geen toegang toe.</li>
		<li><strong>Gebruikersnaam / Weergavenaam</strong> — gebruikt om u te identificeren tijdens het spelen.</li>
	  </ul>

	  <h3>2.2 Automatisch verzamelde informatie</h3>
	  <ul>
		<li><strong>Sessiecookies</strong> — essentiële cookies die worden gebruikt om u ingelogd te houden en uw sessie te behouden. Deze zijn strikt noodzakelijk voor de werking van het Platform.</li>
		<li><strong>JWT-tokens</strong> — gebruikt voor authenticatie en sessiebeheer.</li>
		<li><strong>IP-adressen</strong> — kunnen worden geregistreerd door onze Nginx reverse proxy en serverlogs als onderdeel van de normale werking.</li>
		<li><strong>Browser User-Agent</strong> — kan standaard worden vastgelegd in serverlogs.</li>
		<li><strong>WebSocket-verbinding metadata</strong> — inclusief verbindingstijdstippen en sessieduur, gegenereerd tijdens realtime gameplay.</li>
	  </ul>

	  <h3>2.3 Spelgegevens</h3>
	  <ul>
		<li><strong>Spelgeschiedenis</strong> — records van gespeelde spellen, inclusief resultaten (overwinningen, verliezen, gelijkspelen).</li>
		<li><strong>Spelstatusgegevens</strong> — tijdelijke gegevens met betrekking tot actieve wedstrijden en matchmaking.</li>
	  </ul>
	</section>

	<section>
	  <h2>3. Hoe we uw informatie gebruiken</h2>
	  <p>Uw informatie wordt uitsluitend gebruikt voor de volgende doeleinden:</p>
	  <ul>
		<li>Aanmaken, authenticatie en beheer van uw account.</li>
		<li>Mogelijk maken van realtime multiplayer gameplay via WebSocket-verbindingen.</li>
		<li>Bijhouden van spelgeschiedenis en statistieken gekoppeld aan uw account.</li>
		<li>Onderhouden van serverlogs voor debug- en ontwikkelingsdoeleinden.</li>
	  </ul>
	</section>

	<section>
	  <h2>4. Cookies</h2>
	  <p>
		Het Platform gebruikt alleen <strong>essentiële cookies</strong> die nodig zijn voor
		authenticatie en sessiebeheer. We gebruiken geen analytische,
		advertentie- of trackingcookies van derden.
	  </p>
	</section>

	<section>
	  <h2>5. Gegevensopslag en beveiliging</h2>
	  <p>
		Alle gegevens worden lokaal opgeslagen op de serverinfrastructuur die dit
		project host. Het Platform draait binnen Docker-containers op een lokaal netwerk
		en is niet blootgesteld aan het openbare internet. Hoewel we redelijke
		maatregelen nemen om uw gegevens te beschermen, is geen enkel systeem volledig veilig.
	  </p>
	</section>

	<section>
	  <h2>6. Gegevensdeling</h2>
	  <p>
		We verkopen, verhandelen of delen uw persoonlijke informatie niet met derden.
		Alle gegevens blijven op de lokaal gehoste server.
	  </p>
	</section>

	<section>
	  <h2>7. Gegevensbewaring</h2>
	  <p>
		Uw gegevens worden bewaard voor de duur van dit schoolproject. Na
		voltooiing van het project kunnen alle gegevens, inclusief accounts, spelgeschiedenis en serverlogs,
		worden verwijderd.
	  </p>
	</section>

	<section>
	  <h2>8. Uw rechten</h2>
	  <p>U kunt verzoeken om:</p>
	  <ul>
		<li>Toegang te krijgen tot de persoonlijke gegevens die we over u hebben.</li>
		<li>Onjuiste informatie te corrigeren.</li>
		<li>Uw account en bijbehorende gegevens te verwijderen.</li>
	  </ul>
	  <p>
		Om een van deze rechten uit te oefenen, neemt u contact op met de
		projectbeheerders.
	  </p>
	</section>

	<section>
	  <h2>9. Wijzigingen in dit beleid</h2>
	  <p>
		We kunnen dit privacybeleid bijwerken naarmate het project evolueert.
		Eventuele wijzigingen zullen op deze pagina worden weergegeven met een bijgewerkte revisiedatum.
	  </p>
	</section>

	<section>
	  <h2>10. Contact</h2>
	  <p>
		Als u vragen heeft over dit privacybeleid, neemt u dan rechtstreeks contact op
		met het projectteam.
	  </p>
	</section>
  </div>
</template>
