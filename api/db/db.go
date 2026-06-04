package db

import (
	"database/sql"
	"log"

	_ "modernc.org/sqlite"
)

var DB *sql.DB

func init() {
	var err error
	DB, err = sql.Open("sqlite", "./registrations.db")
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
