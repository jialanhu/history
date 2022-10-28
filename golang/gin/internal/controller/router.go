package controller

import (
	"github.com/gin-gonic/gin"
)

func NewRouter(handler *gin.Engine) {
	// handler.GET("/", func(ctx *gin.Context) {
	// 	ctx.JSON(http.StatusOK, gin.H{
	// 		"message": "hello mother fuck",
	// 	})
	// })

	NewUserRoutes(handler)
}
