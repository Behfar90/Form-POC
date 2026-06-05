PROJECT := $(notdir $(CURDIR))

.PHONY: docker-up docker-down docker-build docker-logs docker-restart docker-clean docker-db setup start start-api start-app

docker-up:
	docker compose up -d

docker-down:
	docker compose down

docker-build:
	docker compose build --no-cache

docker-logs:
	docker compose logs -f

docker-restart:
	docker compose restart

docker-clean:
	docker compose down -v

docker-db:
	docker run --rm \
		-v $(PROJECT)_sqlite_data:/data \
		alpine sh -c "apk add -q sqlite && sqlite3 /data/registrations.db '.headers on' '.mode column' 'SELECT * FROM registrations;'"

# ── Local development (no Docker) ────────────────────────────────────────────

setup:
	cd app && npm install

start-api:
	cd api && go run .

start-app:
	cd app && npm start

start:
	@trap 'kill 0' EXIT; \
	(cd api && go run .) & \
	(cd app && npm install --silent && npm start) & \
	wait
