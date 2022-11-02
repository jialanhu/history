package config

import (
	"io/ioutil"
	"log"
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
		Port         int
		UserName     string
		Password     string
		Host         string
		DB           string
		Charset      string
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
	yFile, err := ioutil.ReadFile(path)
	if err != nil {
		panic(err)
	}
	err = yaml.Unmarshal(yFile, &cfg)
	if err != nil {
		panic(err)
	}
}

func GetConfig() Config {
	return cfg
}
