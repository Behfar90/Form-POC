# Public Form POC

A lightweight proof-of-concept for a public-facing club registration form. Users select a membership type, enter their personal details, review their submission, and register. All is done in a simple 3-step flow. Form configuration is served by a Go API; submissions are persisted in a SQLite database.

---

## Running the App

### Clone the repo

```bash
git clone https://github.com/Behfar90/Form-POC.git
cd Form-POC
```

> **`make` availability:** `make` comes pre-installed on Mac. On Linux, install it with `sudo apt install make` (Debian/Ubuntu) or `sudo dnf install make` (Fedora/RHEL) if missing. On Windows, use [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) (recommended) or install `make` via [Chocolatey](https://chocolatey.org/) (`choco install make`) or [Scoop](https://scoop.sh/) (`scoop install make`).

---

### Option 1 — Docker

**Prerequisites:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) — no other runtimes needed.

**First-time setup:**

1. Start Docker Desktop
2. Build the images:
   ```bash
   make docker-build
   ```
3. Start the containers:
   ```bash
   make docker-up
   ```
4. Open [http://localhost:3000](http://localhost:3000)

**Inspect the database:**

```bash
make docker-db
```

Prints all rows in the `registrations` table. The app doesn't need to be stopped first.

**All Docker commands:**

| Command               | Description                                  |
| --------------------- | -------------------------------------------- |
| `make docker-build`   | Build images (re-run after code changes)     |
| `make docker-up`      | Start containers in the background           |
| `make docker-down`    | Stop containers                              |
| `make docker-logs`    | Tail container logs                          |
| `make docker-restart` | Restart containers                           |
| `make docker-clean`   | Stop containers and wipe the database volume |
| `make docker-db`      | Print all rows in the registrations table    |

**Reset and rebuild from scratch:**

```bash
make docker-clean
make docker-build
make docker-up
```

---

**How it works**

```
Browser → http://localhost:3000
              │
              ▼
         nginx (app container)
         ├── /               → serves the React app
         ├── /form-details   → proxied to Go API (api container)
         └── /registrations  → proxied to Go API (api container)
                                      │
                                      ▼
                              SQLite database
                          (persisted in a Docker volume)
```

The `api` container is not exposed directly — all traffic goes through nginx. The SQLite database is stored in a named Docker volume so data survives container restarts.

---

### Option 2 — Locally (without Docker)

**Prerequisites:** [Go](https://go.dev/dl/) 1.21+ and [Node.js](https://nodejs.org/) 18+

1. Install frontend dependencies:

   ```bash
   cd app && npm install
   ```

2. Start the API in one terminal:

   ```bash
   cd api && go run .
   ```

   Runs on [http://localhost:8080](http://localhost:8080)

3. Start the frontend in a second terminal:
   ```bash
   cd app && npm start
   ```
   Runs on [http://localhost:5173](http://localhost:5173)

---

### Option 3 — Local with make commands

Same as Option 2, but from the project root:

```bash
# Install frontend dependencies once
make setup

# Start both API and frontend together (Ctrl+C stops both)
make start

# Or start them independently
make start-api   # API on http://localhost:8080
make start-app   # Frontend on http://localhost:5173
```

## Technologies Used

| Layer            | Technology         | Reason                                                                                  |
| ---------------- | ------------------ | --------------------------------------------------------------------------------------- |
| Frontend         | React + TypeScript | Component model suits a multi-step form; TypeScript catches data shape mismatches early |
| Frontend         | clsx               | Simple utility for conditional class names, keeps JSX clean                             |
| Frontend         | lucide-react       | A lightweight icon library for React                                                    |
| Build tool       | Vite               | Fast dev server with minimal configuration                                              |
| Backend          | Go + Fiber         | Low overhead, single binary, clean JSON handling                                        |
| Database         | SQLite             | No server to manage; appropriate for a POC with low write concurrency                   |
| Proxy            | nginx              | Serves the static build and proxies API calls, keeping the API off the public port      |
| Containerisation | Docker Compose     | One command to run the full stack with no local runtimes required                       |

---

## Suggested Improvements

- **Form configuration management** — currently the form details are hardcoded in the API (with form description part missing there!); a more flexible approach would be to store form details in the database and serve them from there
- **Authentication** — the registrations endpoint is open; reads should require some form of auth
- **Duplicate detection** — reject submissions with the same email address for the same form
- **Email confirmation** — send a confirmation email on successful registration
- **Phone number validation** — add client-side validation for the phone number field using a third-party library like `libphonenumber-js`
- **Improved user-input handling** — provide more user-friendly hints/messages on Step 2 user inputs (instead of a bad pattern block).

---

## Use of AI assistance in this Project

The AI assistant used in this project is Claude Code by Anthropic. It was first brought in planning phase to brainstrom the overall approach to implement the app, and to weigh up both FE and BE package options to use (in terms of the tradeoff between the value each library provides agaisnt the complexity and bundle weight it adds to the project).

On the frontend, Claude Code was selectively used to generate repetitive boilerplate code (e.g. to avoid writing form fields manually). At the end, I used Caude Code as a **Chaos Engineering** tool to show me out-of-my-sight bad patterns, non-obvious bugs, and ofc the gaps in responsive behavior.

On the backend, Claude Code generated the boilerplate for the API endpoints and database interactions, helped to produce the `Dockerfile`, `docker-compose.yml`, and `Makefile` commands and more importantly, served as a Go reference to refresh my memory on syntax and best practices, since I hadn't used it for years.

Finally, I used Claude Code to draft most of this README file content, including the instructions and the architecture diagram, primarily for the sake of speed. The content was then reviewed, edited, and extended by hand.
