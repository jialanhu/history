package controller

import (
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	_ "gin/docs"
	"gin/internal/user"
)

// @title           Swagger Example API
// @version         1.0
// @description     This is a sample server celler server.
// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      localhost:8080
// @BasePath  /api/v1

func NewRouter(handler *gin.Engine) {

	v1 := handler.Group("/api/v1")
	{
		user.NewUserRoutes(v1)
	}

	// 使用环境变量控制是否禁用swagger
	handler.GET("/swagger/*any", ginSwagger.DisablingWrapHandler(swaggerFiles.Handler, "DISABLING_SWAGGER_HANDLER"))
}
