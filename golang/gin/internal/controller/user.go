package controller

import (
	"gin/internal/entities"
	"gin/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type userRoutes struct {
	db *gorm.DB
}

func NewUserRoutes(handler *gin.Engine) {
	r := &userRoutes{utils.GetMysql()}
	h := handler.Group("/users")
	r.db.AutoMigrate(&entities.User{})
	h.GET("/:id", r.findUser)
	h.POST("/", r.register)
	h.DELETE("/:id", r.deactivate)
}

func (r *userRoutes) register(c *gin.Context) {
	var user entities.User
	if err := c.ShouldBindJSON(&user); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	r.db.Create(&user)
	c.JSON(http.StatusOK, user)
}

func (r *userRoutes) findUser(c *gin.Context) {
	var user entities.User
	id := c.Param("id")
	if result := r.db.Take(&user, id); result.RowsAffected < 1 {
		utils.ErrorResponse(c, http.StatusNotFound, "Not Found")
		return
	}
	c.JSON(http.StatusOK, user)
}

func (r *userRoutes) deactivate(c *gin.Context) {
	var user entities.User
	id := c.Param("id")
	var result *gorm.DB
	if result = r.db.Take(&user, id); result.RowsAffected < 1 {
		utils.ErrorResponse(c, http.StatusNotFound, "Not Found")
		return
	}
	result = r.db.Model(&user).Update("deleted", true)
	c.JSON(http.StatusOK, gin.H{
		"deleteItems": result.RowsAffected,
	})
}
