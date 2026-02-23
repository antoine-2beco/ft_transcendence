<template>
  <div class="policy-container">
	<h1>Privacy Policy</h1>
	<p class="last-updated">Last Updated:  February 17, 2026</p>

	<section>
	  <h2>1. Introduction</h2>
	  <p>
		This Privacy Policy describes how our Tic-Tac-Toe multiplayer platform
		("the Platform") collects, uses, and protects your personal information.
		This Platform is a locally hosted school project and is not intended for
		public or commercial use.
	  </p>
	</section>

	<section>
	  <h2>2. Information We Collect</h2>

	  <h3>2.1 Information You Provide</h3>
	  <ul>
		<li><strong>Email Address</strong> — collected during registration to identify your account.</li>
		<li><strong>Password</strong> — stored in hashed form to secure your account. We never store or have access to your plain-text password.</li>
		<li><strong>Username / Display Name</strong> — used to identify you during gameplay.</li>
	  </ul>

	  <h3>2.2 Information Collected Automatically</h3>
	  <ul>
		<li><strong>Session Cookies</strong> — essential cookies used to keep you logged in and maintain your session. These are strictly necessary for the Platform to function.</li>
		<li><strong>JWT Tokens</strong> — used for authentication and session management.</li>
		<li><strong>IP Addresses</strong> — may be recorded by our Nginx reverse proxy and server logs as part of normal operation.</li>
		<li><strong>Browser User-Agent</strong> — may be captured in server logs by default.</li>
		<li><strong>WebSocket Connection Metadata</strong> — including connection timestamps and session duration, generated during real-time gameplay.</li>
	  </ul>

	  <h3>2.3 Gameplay Data</h3>
	  <ul>
		<li><strong>Game History</strong> — records of games played, including results (wins, losses, draws).</li>
		<li><strong>Game State Data</strong> — temporary data related to active matches and matchmaking.</li>
	  </ul>
	</section>

	<section>
	  <h2>3. How We Use Your Information</h2>
	  <p>Your information is used solely for the following purposes:</p>
	  <ul>
		<li>Account creation, authentication, and session management.</li>
		<li>Enabling real-time multiplayer gameplay via WebSocket connections.</li>
		<li>Tracking game history and statistics tied to your account.</li>
		<li>Maintaining server logs for debugging and development purposes.</li>
	  </ul>
	</section>

	<section>
	  <h2>4. Cookies</h2>
	  <p>
		The Platform uses only <strong>essential cookies</strong> required for
		authentication and session management. We do not use any analytics,
		advertising, or third-party tracking cookies.
	  </p>
	</section>

	<section>
	  <h2>5. Data Storage and Security</h2>
	  <p>
		All data is stored locally on the server infrastructure hosting this
		project. The Platform runs within Docker containers on a local network
		and is not exposed to the public internet. While we take reasonable
		measures to protect your data, no system is completely secure.
	  </p>
	</section>

	<section>
	  <h2>6. Data Sharing</h2>
	  <p>
		We do not sell, trade, or share your personal information with any third
		parties. All data remains on the locally hosted server.
	  </p>
	</section>

	<section>
	  <h2>7. Data Retention</h2>
	  <p>
		Your data is retained for the duration of this school project. Upon
		project completion, all data including accounts, game history, and server
		logs may be deleted.
	  </p>
	</section>

	<section>
	  <h2>8. Your Rights</h2>
	  <p>You may request to:</p>
	  <ul>
		<li>Access the personal data we hold about you.</li>
		<li>Correct any inaccurate information.</li>
		<li>Delete your account and associated data.</li>
	  </ul>
	  <p>
		To exercise any of these rights, please contact the project
		administrators.
	  </p>
	</section>

	<section>
	  <h2>9. Changes to This Policy</h2>
	  <p>
		We may update this Privacy Policy as the project evolves. Any changes
		will be reflected on this page with an updated revision date.
	  </p>
	</section>

	<section>
	  <h2>10. Contact</h2>
	  <p>
		If you have any questions about this Privacy Policy, please reach out to
		the project team directly.
	  </p>
	</section>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  data() {
	return {
	  lastUpdated: new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	  }),
	};
  },
};
</script>

<style scoped>
.policy-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.7;
  color: #e0e0e0;
}

h1 {
  font-size: 2rem;
  margin-bottom: 0.25rem;
}

.last-updated {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.3rem;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #333;
}

h3 {
  font-size: 1.1rem;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

section {
  margin-bottom: 1.5rem;
}

ul {
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}

p {
  margin-bottom: 0.75rem;
}
</style>