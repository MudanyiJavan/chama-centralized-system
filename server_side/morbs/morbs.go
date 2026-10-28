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
		// 1. MUST match your exact React server URL (Do NOT use "*")
		AllowOrigins:  []string{"http://localhost:5173", "http://localhost:3000"},
		AllowMethods:  []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:  []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders: []string{"Content-Length"},
		// 2. MUST be set to true so browsers allow sending HttpOnly cookies
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	router.GET("/users", restful_API.Getprofiles)
	router.GET("/chamas", restful_API.Getchamas)
	router.POST("/userd", restful_API.PostUsers)
	router.POST("/login", restful_API.User_login)

	router.Run("localhost:8080")

}
