package main

import (
	"time"

	"example.com/morbs/restful_API"
	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.GET("/profile", restful_API.GetAlbums)
	router.GET("/users", restful_API.Getprofiles)
	router.GET("/chamas", restful_API.Getchamas)
	router.POST("/albums", restful_API.PostAlbums)

	router.Run("localhost:8080")
}
