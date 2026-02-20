# Projet

## Roles

- Project Owner

- Projet Manager

- Technical Lead

- Developers

A definir

## Bonnes pratiques

### Regular Communication (Meetings)

- Mardi 12h
- Vendredi 12h

### Task Organization

- Github Projects (Kandan)

### Work Breakdown

- Docker (DB, routes, etc)
- Backend
	- Game (Websocket)
	- API User
	- API Statistics
- Frontend
	- Home (Matchmaking / IA)
	- Play Game
	- User Profile
	- Leaderboard
	- Historique


### Code reviews

- En meeting
- Attendre le review avant de merge

### Documentation

- Sur le Readme

### Communication Channel

- Whatsapp
- Discord pour calls

## On fait quoi ?

- Jeu OXO
- User Profile Management

## Modules

### Web

- [x] Major: Use a framework for both the frontend and backend.
- [x] Major: Implement real-time features using WebSockets or similar technology.
- [x] Minor: Use an ORM for the database.

### Accessibility and Internationalization

- [] Minor: Support for multiple languages (at least 3 languages)
	- Implement i18n (internationalization) system.
	- At least 3 complete language translations.
	- Language switcher in the UI.
	- All user-facing text must be translatable.
- [] Minor: Support for additional browsers.
	- Full compatibility with at least 2 additional browsers (Firefox, Safari, Edge, etc.).
	- Test and fix all features in each browser.
	- Document any browser-specific limitations.
	- Consistent UI/UX across all supported browsers.

### User Management

- [] Major: Standard user management and authentication.
	- Users can update their profile information.
	- Users can upload an avatar (with a default avatar if none provided).
	- Users can add other users as friends and see their online status.
	- Users have a profile page displaying their information.
- [] Minor: Game statistics and match history (requires a game module).
	- Track user game statistics (wins, losses, ranking, level, etc.).
	- Display match history (1v1 games, dates, results, opponents).
	- Show achievements and progression.
	- Leaderboard integration.

### Artificial Intelligence

- [x] Major: Introduce an AI Opponent for games.
	- The AI must be challenging and able to win occasionally.
	- The AI should simulate human-like behavior (not perfect play).
	- If you implement game customization options, the AI must be able to use them.
	- You must be able to explain your AI implementation during evaluation.

### Gaming and user experience
- [x] Major: Implement a complete web-based game where users can play against each
other.
	- The game can be real-time multiplayer (e.g., Pong, Chess, Tic-Tac-Toe, Card games, etc.).
	- Players must be able to play live matches.
	- The game must have clear rules and win/loss conditions.
	- The game can be 2D or 3D.
- [x] Major: Remote players — Enable two players on separate computers to play the
same game in real-time.
	- Handle network latency and disconnections gracefully.
	- Provide a smooth user experience for remote gameplay.
	- Implement reconnection logic.


### Module custom

- [x] Minor: Light/Dark Mode


## Base de donnees

### Table 1 : User

- Infos
- Derniere modification
- Stats
- Choix de langue
- Amis

### Table 2 : Parties

Historique des parties globales

- Opposants
- Gain
- Date/Heure


