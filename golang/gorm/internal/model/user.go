package model

type User struct {
	ID      uint
	Name    string
	Email   string `gorm:"index"`
	Deleted bool
}
