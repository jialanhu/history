package app

import (
	"fmt"
	"gin/config"
	"gin/internal/controller"
	"gin/internal/utils"

	"github.com/gin-gonic/gin"
)

func Run() {
	cfg := config.GetConfig()
	utils.InitMysql()

	r := gin.Default()
	controller.NewRouter(r)
	r.Run("localhost:" + fmt.Sprint(cfg.Http.Port))
}
