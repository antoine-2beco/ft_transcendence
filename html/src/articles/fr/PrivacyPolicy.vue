<template>
  <div class="article">
	<h1>Politique de Confidentialité</h1>
	<p class="last-updated">Dernière mise à jour : 17 février 2026</p>

	<section>
	  <h2>1. Introduction</h2>
	  <p>
		Cette Politique de Confidentialité décrit comment notre plateforme multijoueur de Tic-Tac-Toe
		(« la Plateforme ») collecte, utilise et protège vos informations personnelles.
		Cette Plateforme est un projet scolaire hébergé localement et n'est pas destinée à un usage public ou commercial.
	  </p>
	</section>

	<section>
	  <h2>2. Informations que nous collectons</h2>

	  <h3>2.1 Informations que vous fournissez</h3>
	  <ul>
		<li><strong>Adresse e-mail</strong> — collectée lors de l'inscription pour identifier votre compte.</li>
		<li><strong>Mot de passe</strong> — stocké sous forme hachée pour sécuriser votre compte. Nous ne stockons jamais et n'avons jamais accès à votre mot de passe en clair.</li>
		<li><strong>Nom d'utilisateur / Nom affiché</strong> — utilisé pour vous identifier pendant le jeu.</li>
	  </ul>

	  <h3>2.2 Informations collectées automatiquement</h3>
	  <ul>
		<li><strong>Cookies de session</strong> — cookies essentiels utilisés pour vous maintenir connecté et conserver votre session. Ceux-ci sont strictement nécessaires au fonctionnement de la Plateforme.</li>
		<li><strong>Jetons JWT</strong> — utilisés pour l'authentification et la gestion de session.</li>
		<li><strong>Adresses IP</strong> — peuvent être enregistrées par notre reverse proxy Nginx et les journaux du serveur dans le cadre du fonctionnement normal.</li>
		<li><strong>User-Agent du navigateur</strong> — peut être capturé dans les journaux du serveur par défaut.</li>
		<li><strong>Métadonnées de connexion WebSocket</strong> — incluant les horodatages de connexion et la durée de session, générées pendant le jeu en temps réel.</li>
	  </ul>

	  <h3>2.3 Données de jeu</h3>
	  <ul>
		<li><strong>Historique de jeu</strong> — enregistrements des parties jouées, incluant les résultats (victoires, défaites, matchs nuls).</li>
		<li><strong>Données d'état de jeu</strong> — données temporaires liées aux parties actives et au matchmaking.</li>
	  </ul>
	</section>

	<section>
	  <h2>3. Comment nous utilisons vos informations</h2>
	  <p>Vos informations sont utilisées uniquement aux fins suivantes :</p>
	  <ul>
		<li>Création, authentification et gestion de votre compte.</li>
		<li>Permettre le jeu multijoueur en temps réel via des connexions WebSocket.</li>
		<li>Suivi de l'historique de jeu et des statistiques liées à votre compte.</li>
		<li>Conservation des journaux du serveur à des fins de débogage et de développement.</li>
	  </ul>
	</section>

	<section>
	  <h2>4. Cookies</h2>
	  <p>
		La Plateforme utilise uniquement des <strong>cookies essentiels</strong> nécessaires à
		l'authentification et à la gestion de session. Nous n'utilisons aucun cookie d'analyse,
		de publicité ou de suivi tiers.
	  </p>
	</section>

	<section>
	  <h2>5. Stockage et sécurité des données</h2>
	  <p>
		Toutes les données sont stockées localement sur l'infrastructure serveur hébergeant ce
		projet. La Plateforme s'exécute dans des conteneurs Docker sur un réseau local
		et n'est pas exposée à Internet public. Bien que nous prenions des mesures raisonnables
		pour protéger vos données, aucun système n'est totalement sécurisé.
	  </p>
	</section>

	<section>
	  <h2>6. Partage des données</h2>
	  <p>
		Nous ne vendons, n'échangeons ni ne partageons vos informations personnelles avec des tiers.
		Toutes les données restent sur le serveur hébergé localement.
	  </p>
	</section>

	<section>
	  <h2>7. Conservation des données</h2>
	  <p>
		Vos données sont conservées pendant la durée de ce projet scolaire. À la fin du projet,
		toutes les données, y compris les comptes, l'historique de jeu et les journaux du serveur,
		peuvent être supprimées.
	  </p>
	</section>

	<section>
	  <h2>8. Vos droits</h2>
	  <p>Vous pouvez demander à :</p>
	  <ul>
		<li>Accéder aux données personnelles que nous détenons à votre sujet.</li>
		<li>Corriger toute information inexacte.</li>
		<li>Supprimer votre compte et les données associées.</li>
	  </ul>
	  <p>
		Pour exercer l'un de ces droits, veuillez contacter les administrateurs du projet.
	  </p>
	</section>

	<section>
	  <h2>9. Modifications de cette politique</h2>
	  <p>
		Nous pouvons mettre à jour cette Politique de Confidentialité au fur et à mesure de l'évolution du projet.
		Toute modification sera reflétée sur cette page avec une date de révision mise à jour.
	  </p>
	</section>

	<section>
	  <h2>10. Contact</h2>
	  <p>
		Si vous avez des questions concernant cette Politique de Confidentialité, veuillez contacter directement l'équipe du projet.
	  </p>
	</section>
  </div>
</template>
