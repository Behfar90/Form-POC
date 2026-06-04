package handlers

import (
	"github.com/gofiber/fiber/v2"

	"api/models"
)

var mockFormDetails = models.FormDetails{
	ClubID: "britsport",
	FormID: "B171388180BC457D9887AD92B6CCFC86",
	Title:  "Coding camp summer 2025",
	RegistrationOpens: "2024-12-16T00:00:00Z",
	MemberTypes: []models.MemberType{
		{ID: "8FE4113D4E4020E0DCF887803A886981", Name: "Active Member"},
		{ID: "4237C55C5CC3B4B082CBF2540612778E", Name: "Social Member"},
	},
}

func GetFormDetails(c *fiber.Ctx) error {
	return c.JSON(mockFormDetails)
}
