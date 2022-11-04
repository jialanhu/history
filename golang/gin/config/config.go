package config

import (
	"log"
	"os"
	"path/filepath"
	"runtime"

	"gopkg.in/yaml.v3"
)

type (
	Config struct {
		Http  `yaml:"http"`
		Mysql `yaml:"mysql"`
	}

	Mysql struct {
		DSN          string
		MaxIdleConns int
		MaxOpenConns int
	}

	Http struct {
		Port int
	}
)

var cfg Config

func init() {
	_, currentFile, _, _ := runtime.Caller(0)
	path := filepath.Join(filepath.Dir(currentFile), "./config.yaml")
	log.Println(path)
	yFile, err := os.ReadFile(path)
	if err != nil {
		panic(err)
	}
	err = yaml.Unmarshal(yFile, &cfg)
	if err != nil {
		panic(err)
	}
	MYSQL_DSN := os.Getenv("MYSQL_DSN")
	if MYSQL_DSN == "" {
		panic("env MYSQL_DSN is nil")
	}
	cfg.Mysql.DSN = MYSQL_DSN
}

func GetConfig() Config {
	return cfg
}
