package entities

import "time"

type User struct {
	ID        uint
	Name      string
	Email     string `gorm:"index"`
	CreatedAt time.Time
	UpdatedAt time.Time
	Deleted   bool
}
