package handlers

import (
	"api/db"
	"api/models"
	"regexp"
	"time"

	"github.com/gofiber/fiber/v2"
)

var (
	nameRegex  = regexp.MustCompile(`^[A-Za-z]+ [A-Za-z]+$`)
	emailRegex = regexp.MustCompile(`^[^@\s]+@[^@\s]+\.[^@\s]+$`)
	phoneRegex = regexp.MustCompile(`^\+?[0-9]+$`)
)

func validate(r models.Registration) string {
	if r.FormID == "" {
		return "formId is required"
	}
	if r.MemberTypeID == "" {
		return "memberTypeId is required"
	}
	if !nameRegex.MatchString(r.Name) {
		return "name must contain a first and last name with letters only"
	}
	if !emailRegex.MatchString(r.Email) {
		return "email is invalid"
	}
	if !phoneRegex.MatchString(r.Phone) {
		return "phone must contain only numbers and an optional leading +"
	}
	birthDate, err := time.Parse(time.RFC3339, r.BirthDate)
	if err != nil {
		return "birthDate must be a valid ISO 8601 date"
	}
	now := time.Now().UTC()
	if birthDate.After(now) {
		return "birthDate cannot be in the future"
	}
	if birthDate.Before(now.AddDate(-150, 0, 0)) {
		return "birthDate cannot be more than 150 years ago"
	}
	if _, err := time.Parse(time.RFC3339, r.SubmittedAt); err != nil {
		return "submittedAt must be a valid ISO 8601 date"
	}
	return ""
}

func PostRegistration(c *fiber.Ctx) error {
	var registration models.Registration
	if err := c.BodyParser(&registration); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid request body",
		})
	}

	if msg := validate(registration); msg != "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": msg,
		})
	}

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
	)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to save registration",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Registration successful",
	})
}
