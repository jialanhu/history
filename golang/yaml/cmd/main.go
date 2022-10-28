package main

import (
	"fmt"
	"yaml/config"
)

func main() {

	fmt.Println("start")
	cfg := config.LoadConfig()

	fmt.Println(cfg, cfg.Mysql.UserName)
}
