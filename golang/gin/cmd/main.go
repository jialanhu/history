package main

import (
	"gin/config"
	"gin/internal/app"
)

func main() {
	config.LoadConfig()
	app.Run()
}
