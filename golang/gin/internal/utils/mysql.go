package utils

import (
	"gin/config"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func InitMysql() {
	c := config.GetConfig().Mysql

	var err error
	db, err = gorm.Open(mysql.Open(c.DSN), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true, // 禁止自动创建数据库外键约束
	})
	if err != nil {
		panic(err)
	}
	sqlDB, err := db.DB()
	if err != nil {
		panic(err)
	}
	sqlDB.SetMaxIdleConns(c.MaxIdleConns)
	sqlDB.SetMaxOpenConns(c.MaxOpenConns)
}

func GetMysql() *gorm.DB {
	return db
}
