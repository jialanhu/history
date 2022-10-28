package config

import (
	"io/ioutil"

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

func LoadConfig() {
	yFile, err := ioutil.ReadFile("./config/config.yaml")
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
