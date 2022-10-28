package entities

import "time"

type User struct {
	ID        uint      `json:"id"`
	Name      string    `json:"name" binding:"required"`
	Email     string    `json:"email" binding:"required" gorm:"index"`
	CreatedAt time.Time `json:"create_at"`
	UpdatedAt time.Time `json:"update_at"`
	Deleted   bool      `json:"deleted"`
}
