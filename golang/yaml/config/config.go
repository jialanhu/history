package config

import (
	"io/ioutil"
	"log"

	goYaml "gopkg.in/yaml.v3"
)

type (
	Config struct {
		Mysql `yaml:"mysql"`
	}

	Mysql struct {
		UserName string
		PassWord string
		Port     int
		Host     string
		DB   string
		Charset  string
	}
)

func LoadConfig() Config {
	yFile, err := ioutil.ReadFile("./config/config.yaml")
	if err != nil {
		log.Fatal(err)
	}

	cfg := Config{}
	err = goYaml.Unmarshal(yFile, &cfg)
	if err != nil {
		log.Fatal(err)
	}

	return cfg
}
