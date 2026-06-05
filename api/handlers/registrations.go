package handlers

import (
	"api/db"
	"api/models"

	"github.com/gofiber/fiber/v2"
)

func PostRegistration(c *fiber.Ctx) error {
	var registration models.Registration;
	if err := c.BodyParser(&registration); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	};

	if registration.FormID == "" || registration.MemberTypeID == "" || registration.Name == "" || registration.Email == "" || registration.Phone == "" || registration.BirthDate == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "all required fields must be filled",
		})
	};

	_, err := db.DB.Exec(`
		INSERT INTO registrations (form_id, member_type_id, name, email, phone, birth_date, submitted_at)
		VALUES (?, ?, ?, ?, ?, ?, ?)`,
		registration.FormID,
		registration.MemberTypeID,
		registration.Name,
		registration.Email,
		registration.Phone,
		registration.BirthDate,
		registration.SubmittedAt,
	);

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to save registration",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Registration successful",
	})
}
	
