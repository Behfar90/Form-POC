PROJECT := $(notdir $(CURDIR))

.PHONY: up down build logs restart clean db

up:
	docker compose up -d

down:
	docker compose down

build:
	docker compose build --no-cache

logs:
	docker compose logs -f

restart:
	docker compose restart

clean:
	docker compose down -v

db:
	docker run --rm \
		-v $(PROJECT)_sqlite_data:/data \
		alpine sh -c "apk add -q sqlite && sqlite3 /data/registrations.db '.headers on' '.mode column' 'SELECT * FROM registrations;'"
