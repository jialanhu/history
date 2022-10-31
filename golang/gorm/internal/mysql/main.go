package mysql

import (
	"gorm/internal/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// https://github.com/go-sql-driver/mysql#dsn-data-source-name
const dsn = "root:secret@tcp(127.0.0.1:3306)/test?charset=utf8mb4&parseTime=True&loc=Local"

func Run() {
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true, // 禁止自动创建数据库外键约束
	})
	if err != nil {
		panic("failed to connect mysql")
	}

	model.Test(db)
}
