package utils

import "github.com/gin-gonic/gin"

type HttpErorr struct {
	Error string `json:"error" example:"message"`
}

func ErrorResponse(c *gin.Context, code int, msg string) {
	c.AbortWithStatusJSON(code, HttpErorr{msg})
}
