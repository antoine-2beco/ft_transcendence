*This project has been created as part of the 42 curriculum by Sacha, ade-beco, esteba, akloster*

# Description

## ft_transcendence Real-Time Multiplayer OXO

**ft_transcendence** is a real-time multiplayer OXO (Tic-Tac-Toe) web application where users can compete against each other remotely or challenge an AI opponent, all from the browser.

### Key Features

- **Real-time gameplay**: live matches via WebSockets between remote players
- **User management**: registration, authentication, profiles, avatars, and friends list with online status
- **AI opponent**: computer player with human-like behavior
- **Match history & statistics**: wins, losses, rankings, and a global leaderboard
- **Internationalization**: multi-language support (English / French / Dutch)
- **Light/Dark mode**: user-selectable theme

### Tech Stack

- **Frontend:** Vue.js 3 (Vite, Pinia, Vue Router, Vue I18n)
- **Backend:** Fastify (Node.js 20)
- **Database:** PostgreSQL 16
- **Reverse Proxy:** Nginx (with self-signed TLS)
- **Containerization:** Docker Compose

---

# Instructions

## Prerequisites

- **Git**
- **Docker Engine** (v20.10+) and **Docker Compose** (v2+)
- **Make** (optional, for convenience targets)
- A machine with ports **8080**, **4430**, **8787**, and **8081** available

## Step-by-step Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd ft_transcendence
```

### 2. Configure environment variables

Copy the example environment file and fill in the required values:

```bash
cp .env.example .env
```

Edit `.env` with the following variables:

| Variable             | Description                                  | Example           |
|----------------------|----------------------------------------------|--------------------|
| `HOSTNAME`           | Hostname used for the Nginx certificate      | `transcendence`    |
| `LAN_IP`             | LAN IP address of the host machine           | `192.168.1.42`     |
| `POSTGRES_DB`        | PostgreSQL database name                     | `appdb`            |
| `POSTGRES_USER`      | PostgreSQL user                              | `appuser`          |
| `POSTGRES_PASSWORD`  | PostgreSQL password                          | *(choose a strong password)* |
| `JWT_SECRET`         | Secret key used to sign JWT tokens           | *(random string)*  |
| `VITE_DEFAULT_LOCALE`| Default UI language (`en`, `fr` or `nl`)     | `en`               |

### 3. Build and start the application

Using **Make** (recommended):

```bash
# Build images and start all containers in one command
make

# Or step by step:
make build   # Build Docker images
make up      # Start containers in detached mode
```

Using **Docker Compose** directly:

```bash
docker compose build
docker compose up -d
```

### 4. Access the application

| Service       | URL                           |
|---------------|-------------------------------|
| **Frontend**  | `https://localhost:4430`      |
| **Frontend (HTTP)** | `http://localhost:8080`  |
| **Backend API** | `http://localhost:8787`     |
| **Adminer (DB UI)** | `http://localhost:8081` |

> **Note:** The Nginx container generates a self-signed TLS certificate on first start, so your browser will show a security warning (expected in development).

## Stopping & Cleaning Up

```bash
make stop    # Stop containers (preserves data)
make down    # Stop containers and remove volumes (resets database)
```

## Other Useful Commands

```bash
make start   # Restart previously stopped containers
make status  # Show running containers (docker ps)
```


# Resources

## Classic References & Documentation
- [examlpe tic tac toe application](https://www.freecodecamp.org/news/build-a-real-time-multiplayer-tic-tac-toe-game-using-websockets-and-microservices/)
- [Vue.js documentation](https://vuejs.org/guide/)
- [Fastify basics](https://fastify.dev/docs/latest/Guides/Getting-Started/)

## How was AI used ?

AI was used as a writing assistant to help produce clear, well-structured documentation. All AI-generated content was carefully reviewed and validated before being incorporated into the project.

# Team information
- Assigned role(s): PO, PM, Tech Lead, Developers, etc.

**Product Owner (PO)**: Defines the product vision, prioritizes features, and ensures the project meets user needs.  
**Project Manager (PM) / Scrum Master**: Facilitates team coordination and
removes obstacles.  
**Technical Lead / Architect**: Oversees technical decisions and architecture.  
**Developers**: Implement features and modules.  

# Project Management

The team held regular meetings twice a week (Tuesdays and Fridays) to review progress, distribute tasks, and align on priorities. Work was tracked and assigned through **GitHub Issues** and **GitHub Projects**. Day-to-day communication happened primarily via **WhatsApp**, with **Discord** used as a fallback when needed.

---

# Technical Stack

## Frontend Technologies

| Technology | Purpose |
|---|---|
| **Vue.js 3** | Core UI framework using the Composition API (`<script setup>`) for building the single-page application |
| **Vite** | Build tool and dev server providing fast HMR during development and optimized production bundles |
| **Pinia** | Official Vue state-management library, used for auth state (`useAuthStore`) and game state (`useGameStore`) |
| **Vue Router** | Client-side routing with navigation guards protecting authenticated views |
| **Vue I18n** | Translation files in JSON for English, French and Dutch |
| **Axios** | HTTP client for REST API calls to the Fastify backend |
| **PicoCSS** | Minimal, classless CSS framework providing clean styling with built-in light/dark theme support |
| **Native WebSocket API** | Real-time bidirectional communication for live multiplayer gameplay and AI matches |

## Backend Technologies

| Technology | Purpose |
|---|---|
| **Fastify** | High-performance Node.js web framework serving REST API and WebSocket endpoints |
| **@fastify/websocket** | WebSocket upgrade handling for real-time matchmaking and AI game routes |
| **@fastify/jwt** | JWT signing and verification for stateless authentication |
| **@fastify/cookie** | Cookie parsing/setting (JWT tokens stored in `httpOnly` secure cookies) |
| **@fastify/multipart** | Multipart form-data handling for profile picture uploads (5 MB limit) |
| **bcrypt** | Password hashing with 12 salt rounds for secure credential storage |
| **Knex.js** | SQL query builder for schema creation (`initdb.js`) and query composition |
| **Objection.js** | Lightweight ORM layer on top of Knex, providing model-based queries (`User` model) |
| **dotenv** | Environment variable loading for local development configuration |
| **Node.js 20** (Alpine) | Server runtime, chosen for stability and small container image size |

## Database

**PostgreSQL 16** (Alpine) was chosen as the relational database for the following reasons:

- **Data integrity**: Foreign key constraints, unique constraints, and check constraints (e.g., language validation limited to `en`, `fr`, `nl`) enforce consistency at the database level.
- **Native array support**: PostgreSQL's `integer[]` column type is used for the friends list, avoiding the need for a separate join table for this simple relationship.
- **ACID compliance**: Guarantees reliable recording of game results and user stat updates.
- **Mature ecosystem**: Excellent driver support via the `pg` npm package, seamlessly integrated with Knex and Objection.js.

The database schema is created programmatically on first boot via `initdb.js`, and data is persisted in a Docker named volume (`pgdata`) across container restarts.

**Adminer** is included as a lightweight database management UI exposed on port 8081 for development and debugging.

## Other Significant Technologies

### Infrastructure & DevOps

| Technology | Purpose |
|---|---|
| **Docker & Docker Compose** | Full containerization of the application: four services (`postgres`, `node`, `nginx`, `adminer`) defined in `docker-compose.yml`. Alpine-based images keep the footprint small. |
| **Nginx** | Reverse proxy and static file server handling TLS termination, API proxying (`/api/` → Fastify), WebSocket upgrade proxying (`/ws`), SPA fallback routing, and static serving of uploaded profile pictures. |
| **Self-signed TLS** | Both the Nginx and Node containers generate self-signed certificates at startup via their entrypoint scripts, ensuring all communication (browser ↔ Nginx ↔ Node) is encrypted even in development. |
| **Make** | Convenience `Makefile` wrapping Docker Compose commands (`build`, `up`, `down`, `start`, `stop`, `status`). |

## Justification for Major Technical Choices

| Decision | Rationale |
|---|---|
| **Vue.js 3 + Vite** | Lightweight, fast development feedback loop, and well-suited for SPAs. The Composition API enables clean, reusable logic in stores and components. |
| **Fastify over Express** | Significantly better performance, built-in validation, and a modern plugin architecture that avoids middleware ordering issues. |
| **WebSockets for gameplay** | Real-time bidirectional communication is essential for live multiplayer. HTTP polling would introduce unacceptable latency for a game requiring instant updates. |
| **PostgreSQL over SQLite/MongoDB** | Relational integrity (foreign keys, unique constraints) is critical for user accounts and game records. Array types simplified the friends list. |
| **JWT in httpOnly cookies** | More secure than `localStorage` (immune to XSS). The `httpOnly` flag prevents JavaScript access; `secure` + `sameSite` provide additional protection. |
| **PicoCSS** | Minimal CSS framework providing a polished look with near-zero class usage, keeping Vue templates clean. Native dark-mode support aligned with the project's theme-switching requirement. |

# Database Schema

## Entity-Relationship Diagram

```
┌──────────────────────────────┐         ┌──────────────────────────────┐
│            users             │         │            games             │
├──────────────────────────────┤         ├──────────────────────────────┤
│ id          SERIAL       PK  │◄──┐     │ id          SERIAL       PK  │
│ email       VARCHAR  UNIQUE  │   ├─────│ player1_id  INTEGER  FK, NN  │
│ username    VARCHAR  UNIQUE  │   ├─────│ player2_id  INTEGER  FK, NN  │
│ password_hash VARCHAR   NN   │   └─────│ winner_id   INTEGER     	FK  │
│ profile_picture_url     TEXT │         │ created_at  TIMESTAMP    NN  │
│ language    VARCHAR(2)  NN   │         └──────────────────────────────┘
│ elo         INTEGER     NN   │
│ wins        INTEGER     NN   │
│ losses      INTEGER     NN   │
│ ties        INTEGER     NN   │
│ friends     INTEGER[]   NN   │
└──────────────────────────────┘
```

## Tables

### `users`

Stores registered player accounts, statistics, and social data.

| Column               | Type         | Constraints                          | Default          |
|----------------------|--------------|--------------------------------------|------------------|
| `id`                 | `SERIAL`     | Primary Key, Auto-increment          | —                |
| `email`              | `VARCHAR`    | Not Null, Unique                     | —                |
| `username`           | `VARCHAR`    | Not Null, Unique                     | —                |
| `password_hash`      | `VARCHAR`    | Not Null                             | —                |
| `profile_picture_url`| `TEXT`       | Nullable                             | `NULL`           |
| `language`           | `VARCHAR(2)` | Not Null, CHECK (`en`, `fr`, `nl`)   | `'en'`           |
| `elo`                | `INTEGER`    | Not Null                             | `1000`           |
| `wins`               | `INTEGER`    | Not Null                             | `0`              |
| `losses`             | `INTEGER`    | Not Null                             | `0`              |
| `ties`               | `INTEGER`    | Not Null                             | `0`              |
| `friends`            | `INTEGER[]`  | Not Null                             | `'{}'::integer[]`|

### `games`

Records completed matches between two players.

| Column       | Type        | Constraints                                  | Default     |
|--------------|-------------|----------------------------------------------|-------------|
| `id`         | `SERIAL`    | Primary Key, Auto-increment                  | —           |
| `player1_id` | `INTEGER`   | Not Null, FK → `users.id` (ON DELETE CASCADE)| —           |
| `player2_id` | `INTEGER`   | Not Null, FK → `users.id` (ON DELETE CASCADE)| —           |
| `winner_id`  | `INTEGER`   | Nullable, FK → `users.id` (ON DELETE SET NULL)| `NULL`     |
| `created_at` | `TIMESTAMP` | Not Null                                     | `NOW()`     |

> **Note:** A `NULL` value for `winner_id` indicates a draw.

## Relationships

| Relationship             | Type      | Description                                                        |
|--------------------------|-----------|--------------------------------------------------------------------|
| `games.player1_id` → `users.id` | Many-to-One | Each game references the first player. Cascades on user deletion.  |
| `games.player2_id` → `users.id` | Many-to-One | Each game references the second player. Cascades on user deletion. |
| `games.winner_id` → `users.id`  | Many-to-One | References the winning player. Set to `NULL` if the user is deleted.|
| `users.friends`                  | Self-referencing array | PostgreSQL `integer[]` storing IDs of friend users. No FK constraint enforced at DB level; validated in application code. |

# Modules

## Summary

| #  | Module | Category | Size  | Points |
|----|--------|----------|-------|--------|
| 1  | Use a framework for both the frontend and backend | Web | Major | 2 |
| 2  | Implement real-time features using WebSockets | Web | Major | 2 |
| 3  | Use an ORM for the database | Web | Minor | 1 |
| 4  | Standard user management and authentication | User Management | Major | 2 |
| 5  | Game statistics and match history | User Management | Minor | 1 |
| 6  | Introduce an AI Opponent for games | Artificial Intelligence | Major | 2 |
| 7  | Implement a complete web-based multiplayer game | Gaming & UX | Major | 2 |
| 8  | Remote players | Gaming & UX | Major | 2 |
| 9  | Support for multiple languages (at least 3) | Accessibility & i18n | Minor | 1 |
| 10 | Light/Dark Mode | Module of Choice | Minor | 1 |
|    | **Total** | | **6 Major + 4 Minor** | **16** |

## Module Details

### 1. Use a Framework for Both the Frontend and Backend *(Major — 2 pts)*

**Justification:** The project requirements demand a structured, maintainable codebase on both sides. Using established frameworks accelerates development and ensures best practices.

**Implementation:**
- **Frontend:** Vue.js 3 with the Composition API (`<script setup>`), built with Vite. State management via Pinia (`useAuthStore`, `useGameStore`), client-side routing via Vue Router with navigation guards, and PicoCSS for styling.
- **Backend:** Fastify (Node.js 20) with a plugin-based architecture. Each feature is registered as an independent Fastify route plugin (e.g., `registerRoute`, `loginRoute`, `matchmakingRoute`).

**Key files:**
- Frontend entry: [`html/src/main.js`](html/src/main.js), [`html/src/App.vue`](html/src/App.vue), [`html/src/router/index.js`](html/src/router/index.js)
- Backend entry: [`node/js/index.js`](node/js/index.js)

**Team member(s):** ade-beco, Esteban, Sacha

---

### 2. Implement Real-Time Features Using WebSockets *(Major — 2 pts)*

**Justification:** A multiplayer game requires instant bidirectional communication. HTTP polling would introduce unacceptable latency for live gameplay.

**Implementation:**
- `@fastify/websocket` on the backend exposes `/ws` (PvP matchmaking) and `/ws-ai` (AI games).
- The matchmaking route manages a waiting queue, game creation, move validation, board state broadcast, disconnect/reconnect handling with a 30-second forfeit timer, and result persistence.
- The frontend connects via the native `WebSocket` API and processes typed JSON messages (`queue:join`, `match:found`, `state`, `move`, `reconnected`, `opponent:disconnected`, `game:forfeit`).
- Nginx proxies WebSocket upgrades with `Upgrade` and `Connection` headers.

**Key files:**
- [`node/js/routes/matchmakingRoute.js`](node/js/routes/matchmakingRoute.js)
- [`node/js/routes/aiRoute.js`](node/js/routes/aiRoute.js)
- [`html/src/stores/game.js`](html/src/stores/game.js), [`html/src/api/matchmaking.js`](html/src/api/matchmaking.js)
- [`nginx/default.conf`](nginx/default.conf) (WebSocket proxy block)

**Team member(s):** Esteban, akloster

---

### 3. Use an ORM for the Database *(Minor — 1 pt)*

**Justification:** An ORM reduces boilerplate SQL, prevents SQL injection, and provides a model-based abstraction that integrates cleanly with the application layer.

**Implementation:**
- **Knex.js** is used as the query builder for schema creation (`initdb.js`) and raw queries (e.g., `db("users").where(...).increment(...)`).
- **Objection.js** sits on top of Knex, providing the `User` model class with `query()`, `findById()`, `findOne()`, and `insert()` methods used across route handlers.
- The database connection is configured in `db.js` and bound to Objection via `Model.knex(db)`.

**Key files:**
- [`node/js/db.js`](node/js/db.js)
- [`node/js/models/User.js`](node/js/models/User.js)
- [`node/js/initdb.js`](node/js/initdb.js)

**Team member(s):** Esteban

---

### 4. Standard User Management and Authentication *(Major — 2 pts)*

**Justification:** Core requirement for any multi-user platform — users must be able to register, log in, manage their profile, and interact socially.

**Implementation:**
- **Registration:** Email validation, bcrypt password hashing (12 salt rounds), unique constraint enforcement on username/email. Route: `POST /register`.
- **Authentication:** Login verifies credentials with `bcrypt.compare`, issues a JWT (`@fastify/jwt`) stored in an `httpOnly`, `secure`, `sameSite: lax` cookie. Route: `POST /login`.
- **Session check:** `GET /me` returns the current user from the JWT. A shared `requireAuth` pre-handler verifies the cookie token on protected routes.
- **Profile:** `GET /profile` returns user info including stats, friends list, and avatar URL.
- **Avatar upload:** `POST /profilePicUpload` accepts JPEG/PNG/WebP (max 5 MB via `@fastify/multipart`), saves to `/app/uploads/` with a random filename, and updates the user's `profile_picture_url`. Uploaded files are served by Nginx at `/uploads/`.
- **Friends:** `POST /addFriend/:friendId` appends to the PostgreSQL `integer[]` friends column using `array_append`, with duplicate prevention via `whereRaw("NOT (? = ANY(friends))")`.
- **Logout:** `POST /logout` clears the authentication cookie.

**Key files:**
- [`node/js/routes/registerRoute.js`](node/js/routes/registerRoute.js)
- [`node/js/routes/loginRoute.js`](node/js/routes/loginRoute.js)
- [`node/js/routes/meRoute.js`](node/js/routes/meRoute.js)
- [`node/js/routes/logoutRoute.js`](node/js/routes/logoutRoute.js)
- [`node/js/routes/profileRoute.js`](node/js/routes/profileRoute.js)
- [`node/js/routes/profilePicUploadRoute.js`](node/js/routes/profilePicUploadRoute.js)
- [`node/js/routes/addFriendRoute.js`](node/js/routes/addFriendRoute.js)
- [`node/js/authPreHandler.js`](node/js/authPreHandler.js)
- [`html/src/stores/auth.js`](html/src/stores/auth.js), [`html/src/api/auth.js`](html/src/api/auth.js)
- [`html/src/views/LoginView.vue`](html/src/views/LoginView.vue), [`html/src/views/RegisterView.vue`](html/src/views/RegisterView.vue), [`html/src/views/UserProfileView.vue`](html/src/views/UserProfileView.vue), [`html/src/views/FriendsView.vue`](html/src/views/FriendsView.vue)

**Team member(s):** ade-beco, Esteban, Sacha

---

### 5. Game Statistics and Match History *(Minor — 1 pt)*

**Justification:** Required for tracking player progression and providing competitive context (leaderboard, win rates, match records).

**Implementation:**
- **Stats tracking:** After each game (PvP), the winner's `wins` and `elo` (+10) are incremented and the loser's `losses` and `elo` (−10) are decremented. Draws increment `ties` for both players. Stats are updated atomically in the matchmaking route's game-end logic.
- **Match history:** Every completed game is inserted into the `games` table with `player1_id`, `player2_id`, `winner_id`, and `created_at`. The `GET /match-history` endpoint joins against the `users` table to return usernames, profile pictures, Elo ratings, and the winner's name.
- **Leaderboard:** `GET /leaderboard` returns the top 50 users sorted by Elo descending, with wins, losses, ties, and profile pictures.
- **Frontend:** `HistoryView.vue` displays a global match log; `UserProfileView.vue` shows the last 5 matches for the logged-in user; `LeaderboardView.vue` provides a searchable, ranked list with win-rate calculation.

**Key files:**
- [`node/js/routes/matchHistoryRoute.js`](node/js/routes/matchHistoryRoute.js)
- [`node/js/routes/leaderboardRoute.js`](node/js/routes/leaderboardRoute.js)
- [`node/js/routes/matchmakingRoute.js`](node/js/routes/matchmakingRoute.js) (stats update logic)
- [`html/src/views/HistoryView.vue`](html/src/views/HistoryView.vue)
- [`html/src/views/LeaderboardView.vue`](html/src/views/LeaderboardView.vue)
- [`html/src/views/UserProfileView.vue`](html/src/views/UserProfileView.vue)

**Team member(s):** ade-beco, Esteban, Sacha

---

### 6. Introduce an AI Opponent for Games *(Major — 2 pts)*

**Justification:** Allows solo play when no opponent is available and fulfills the AI module requirement. The AI must be challenging but beatable.

**Implementation:**
- A dedicated WebSocket endpoint (`/ws-ai`) handles AI games server-side.
- The AI strategy uses a **priority-based heuristic**: (1) win if possible (complete a row of two `O`s), (2) block the player if they are about to win (two `X`s in a row), (3) otherwise play a random empty cell.
- This produces human-like behavior: the AI defends and attacks opportunistically but does not play perfectly (no minimax), making it beatable while still competitive.
- AI games are not recorded in the `games` table, keeping stats focused on PvP.

**Key files:**
- [`node/js/routes/aiRoute.js`](node/js/routes/aiRoute.js)
- [`html/src/stores/game.js`](html/src/stores/game.js) (AI mode connection)

**Team member(s):** akloster

---

### 7. Implement a Complete Web-Based Multiplayer Game *(Major — 2 pts)*

**Justification:** The core deliverable of the project — a fully playable game with clear rules, win/loss/draw conditions, and a polished UI.

**Implementation:**
- The game is **Tic-Tac-Toe (OXO)** played on a 3×3 grid.
- Win detection checks all 8 possible lines (3 rows, 3 columns, 2 diagonals). A draw is declared when all 9 cells are filled with no winner.
- The board is rendered in `GameView.vue` as a CSS grid of clickable cells. Moves are sent via WebSocket and validated server-side (correct turn, empty cell, active game).
- The game store (`useGameStore`) manages state transitions: mode selection → queue → match → gameplay → result → replay.

**Key files:**
- [`html/src/views/GameView.vue`](html/src/views/GameView.vue)
- [`html/src/stores/game.js`](html/src/stores/game.js)
- [`node/js/routes/matchmakingRoute.js`](node/js/routes/matchmakingRoute.js) (server-side game logic)

**Team member(s):** ade-beco, Esteban

---

### 8. Remote Players *(Major — 2 pts)*

**Justification:** Enables two players on separate machines to compete in real time, which is a core multiplayer requirement.

**Implementation:**
- Players connect from separate browsers/computers to the same WebSocket endpoint (`/ws`). Nginx reverse-proxies the connection with proper `Upgrade` headers and forwards cookies for authentication.
- A simple queue-based matchmaking system pairs the first waiting player with the next joiner. Each player receives their symbol (`X` or `O`) and the shared board state.
- **Reconnection logic:** If a player disconnects, a 30-second timer starts. The opponent is notified (`opponent:disconnected`). If the player reconnects within the window, the game resumes seamlessly (`reconnected`). If not, the disconnected player forfeits and the result is recorded.
- **Latency handling:** All game logic (turn validation, win detection) runs server-side. Clients simply render the authoritative state received from the server, eliminating desync issues.

**Key files:**
- [`node/js/routes/matchmakingRoute.js`](node/js/routes/matchmakingRoute.js) (reconnection and forfeit logic)
- [`nginx/default.conf`](nginx/default.conf) (WebSocket proxy configuration)
- [`html/src/stores/game.js`](html/src/stores/game.js) (reconnection message handling)

**Team member(s):** Esteban

---

### 9. Support for Multiple Languages *(Minor — 1 pt)*

**Justification:** Internationalization is required for accessibility. The project supports at least 3 complete language translations.

**Implementation:**
- **Vue I18n** is configured in `locales/index.js` with JSON translation files for English and French (Dutch translation file to be added for the third language).
- All user-facing text in templates uses `$t("key")` or the `useI18n()` composable.
- The `@intlify/unplugin-vue-i18n` Vite plugin pre-compiles translation messages for performance.
- The database enforces the language constraint at the schema level: `CHECK (language IN ('en','fr','nl'))`.
- A language switcher in the UI allows users to change their preferred language.

**Key files:**
- [`html/src/locales/index.js`](html/src/locales/index.js)
- [`html/src/locales/en.json`](html/src/locales/en.json)
- [`html/src/locales/fr.json`](html/src/locales/fr.json)
- [`html/vite.config.js`](html/vite.config.js) (VueI18nPlugin)
- [`node/js/initdb.js`](node/js/initdb.js) (language CHECK constraint)

**Team member(s):** ade-beco, Sacha

---

### 10. Light/Dark Mode *(Minor — 1 pt, Module of Choice)*

**Justification:** Enhances user experience by respecting user preferences and reducing eye strain. Selected as a custom minor module because it is a self-contained, user-facing feature that integrates naturally with PicoCSS's built-in theme support.

**Implementation:**
- The `ThemeSwitch.vue` component toggles the `data-theme` attribute on `<html>` between `"light"` and `"dark"`.
- The chosen theme is persisted in `localStorage` and restored on page load.
- If no preference is saved, the system preference (`prefers-color-scheme: dark`) is used as the default.
- PicoCSS natively responds to the `data-theme` attribute, so all components and styles adapt automatically without additional CSS.

**Key files:**
- [`html/src/components/ThemeSwitch.vue`](html/src/components/ThemeSwitch.vue)
- [`html/src/assets/main.css`](html/src/assets/main.css) (CSS custom properties)

**Team member(s):** Sacha

# Individual Contributions

## akloster

### Contributions

Implemented the **AI opponent game mode** on the backend, building the move strategy in [`node/js/routes/aiRoute.js`](node/js/routes/aiRoute.js) that prioritizes wins, blocks threats, and falls back to random placement. Created the **Privacy Policy** and **Terms of Service** footer components on both the frontend and backend, and authored the full **project README** documentation.

### Key Files & Components

| Area | Files |
|------|-------|
| AI game endpoint | [`node/js/routes/aiRoute.js`](node/js/routes/aiRoute.js) — WebSocket route (`/ws-ai`) |
| Legal pages | [`PrivacyPolicy.vue`](html/src/views/PrivacyPolicy.vue), [`TermsofService.vue`](html/src/views/TermsofService.vue) |
| Documentation | [`README2.md`](README2.md) — setup instructions, architecture, and module descriptions |

### Challenges & Solutions

> **Bridging frontend ↔ backend:** Understanding how Vue.js communicates with Fastify via Axios and WebSockets required hands-on experimentation and iterative debugging across the full stack.
>
> **Ramping up on JavaScript & frameworks:** Learning Vue 3, Fastify, and Pinia from scratch was overcome through code review with teammates and incremental feature development.

## ade-beco
### Contribution
- Linking back and front
### Challenges & Solutions
## Esteban
### Contribution
- Backend database management
- back end game (node.js)
- back end nginx revers proxy
### Challenges & Solutions
## Sacha
### Contribution
- front end
- set up front with mock data
- linking back and front
### Challenges & Solutions