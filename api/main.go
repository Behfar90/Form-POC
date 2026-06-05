package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	_ "api/db"
	"api/handlers"
)

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "Origin, Content-Type, Accept",
		AllowMethods: "GET, POST",
	}))

	app.Get("/form-details", handlers.GetFormDetails)
	app.Post("/registrations", handlers.PostRegistration)

	log.Fatal(app.Listen(":8080"))
}
