package db

import (
	"database/sql"
	"log"
	"os"

	_ "modernc.org/sqlite"
)

var DB *sql.DB

func init() {
	dbPath := os.Getenv("DB_PATH")
	if dbPath == "" {
		dbPath = "./registrations.db"
	}

	var err error
	DB, err = sql.Open("sqlite", dbPath)
	if err != nil {
		log.Fatalf("failed to open database: %v", err)
	}

	_, err = DB.Exec(`
        CREATE TABLE IF NOT EXISTS registrations (
            id            INTEGER PRIMARY KEY AUTOINCREMENT,
            form_id       TEXT NOT NULL,
            member_type_id TEXT NOT NULL,
            name          TEXT NOT NULL,
            email         TEXT NOT NULL,
            phone         TEXT NOT NULL,
            birth_date    TEXT NOT NULL,
            submitted_at  TEXT NOT NULL
        )
    `)
	if err != nil {
		log.Fatalf("failed to create table: %v", err)
	}
}
