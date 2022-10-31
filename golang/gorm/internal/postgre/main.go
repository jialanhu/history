package postgre

import (
	"gorm/internal/model"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// 官方示例中为何 sslmode=disable ??
const dsn = "host=localhost user=postgres password=secret dbname=test port=5432  TimeZone=Asia/Shanghai"

func Run() {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect postgres")
	}

	model.Test(db)
}
