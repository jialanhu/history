package user

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

func NewUserRoutes(handler *gin.RouterGroup) {
	r := &userRoutes{utils.GetMysql()}
	h := handler.Group("/users")
	{
		h.GET("/:id", r.findUser)
		h.POST("/", r.register)
		h.DELETE("/:id", r.deactivate)
	}
	r.db.AutoMigrate(&entities.User{})
}

// @Summary     register
// @Description user register
// @Tags  	    users
// @Accept      json
// @Produce     json
// @Param				request body user.RegisterDto true "User required name && email"
// @Success     200 {object} entities.User
// @Router      /users [post]
func (r *userRoutes) register(c *gin.Context) {
	var user entities.User
	if err := c.ShouldBindJSON(&user); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	r.db.Create(&user)
	c.JSON(http.StatusOK, user)
}

// @Summary     findUser
// @Description get user
// @Tags  	    users
// @Accept      json
// @Produce     json
// @Param 			id	path	int	ture	"User ID"
// @Success     200 {object} entities.User
// @Failure     404 {object} utils.HttpErorr
// @Router      /users/{id} [get]
func (r *userRoutes) findUser(c *gin.Context) {
	var user entities.User
	id := c.Param("id")
	if result := r.db.Take(&user, id); result.RowsAffected < 1 {
		utils.ErrorResponse(c, http.StatusNotFound, "Not Found")
		return
	}
	c.JSON(http.StatusOK, user)
}

// @Summary     deactivate
// @Description delete user
// @Tags  	    users
// @Accept      json
// @Produce     json
// @Param 			id	path	int	ture	"User ID"
// @Success     200 {object} utils.HttpDeleteResponse
// @Failure     404 {object} utils.HttpErorr
// @Router      /users/{id} [delete]
func (r *userRoutes) deactivate(c *gin.Context) {
	var user entities.User
	id := c.Param("id")
	var result *gorm.DB
	if result = r.db.Take(&user, id); result.RowsAffected < 1 {
		utils.ErrorResponse(c, http.StatusNotFound, "Not Found")
		return
	}
	// 使用 DeletedAt gorm.DeletedAt 软删除
	result = r.db.Delete(&user)
	c.JSON(http.StatusOK, &utils.HttpDeleteResponse{DeleteItems: result.RowsAffected})
}
