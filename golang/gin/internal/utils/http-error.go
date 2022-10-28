package utils

import "github.com/gin-gonic/gin"

type httpErorr struct {
	Error string `json:"error" example:"message"`
}

func ErrorResponse(c *gin.Context, code int, msg string) {
	c.AbortWithStatusJSON(code, httpErorr{msg})
}
