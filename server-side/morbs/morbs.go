package main

import (
	"example.com/morbs/restful_API"

	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()
	router.GET("/profile", restful_API.GetAlbums)
	router.GET("users", restful_API.Getprofiles)
	router.POST("/albums", restful_API.PostAlbums)

	router.Run("localhost:8080")

}
