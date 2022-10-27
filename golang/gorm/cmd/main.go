package main

import (
	"gorm/internal/model"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// https://github.com/go-sql-driver/mysql#dsn-data-source-name
const DSN = "root:secret@tcp(127.0.0.1:3306)/test?charset=utf8mb4&parseTime=True&loc=Local"

func main() {
	db, err := gorm.Open(mysql.Open(DSN), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true, // 禁止自动创建数据库外键约束
	})
	if err != nil {
		panic("failed to connect mysql")
	}

	// 自动迁移schema, 创建表、外键、约束、列、索引
	// 会该改变大小、精度、是否为空, 改变列的类型
	// 但不会删除未使用的列
	// 默认
	db.Set("gorm:table_options", "ENGINE=InnoDB").AutoMigrate(&model.User{})
	//
	tx := db.Session(&gorm.Session{}).Debug() // debug 方法以 session 为单位调整 log level 为 info

	email := "this is my Email"
	user := model.User{Name: "this is my name", Email: email}
	// insert
	result := tx.Create(&user) // 通过数据的指针来创建
	log.Println(user)          // 返回插入数据的自增主键会放入指针的对象中
	if result.Error != nil {
		log.Println(result.Error) // 返回错误
	} else {
		log.Panicln(result.RowsAffected) // 插入记录的条数
	}

	// select
	tx.First(&user, "email=?", email) // user 为 nil, 使用 email 查询
	log.Println(user)

	// update
	name := "this is my fucking name"
	tx.Model(&user).Update("name", name) // user 有值, 默认使用主键作为条件
	//tx.First(&user)                      // 一样使用主键作为条件, 并且更改完会更改 user 变量的值
	log.Println(user)

	// delete
	tx.Delete(&user)
	tx.First(&user, "email=?", email) // user 有值, 还额外使用 email 作为参数会带两个条件, 使用 and 组合条件
	log.Println(user)                 // 没有查到不会覆盖原有值
}
