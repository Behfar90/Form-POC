package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	_ "api/db"
	"api/handlers"
)

func main() {
	app := fiber.New()

	allowOrigins := os.Getenv("CORS_ALLOW_ORIGINS")
	if allowOrigins == "" {
		allowOrigins = "http://localhost:5173"
	}

	app.Use(cors.New(cors.Config{
		AllowOrigins: allowOrigins,
		AllowHeaders: "Origin, Content-Type, Accept",
		AllowMethods: "GET, POST",
	}))

	app.Get("/form-details", handlers.GetFormDetails)
	app.Post("/registrations", handlers.PostRegistration)

	log.Fatal(app.Listen(":8080"))
}
