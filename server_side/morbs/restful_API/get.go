package restful_API

import (
	"fmt"
	"net/http"

	"example.com/morbs/data_access"
	"github.com/gin-gonic/gin"
)

func GetAlbums(c *gin.Context) {

	name, contact, email, err := data_access.Single_query()
	if err != nil {
		// Handle the error so the server doesn't crash or insert bad data
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch profile data"})
		return
	}
	newprofile := profile{
		name, contact, email,
	}
	profiles = append(profiles, newprofile)

	c.IndentedJSON(http.StatusOK, profiles)
}
func Getprofiles(c *gin.Context) {
	profile_data, err := data_access.Multi_query()
	if err != nil {
		// Handle the error so the server doesn't crash or insert bad data
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch profile data"})
		fmt.Println(err)
		return
	}

	c.IndentedJSON(http.StatusOK, profile_data)
}
func Getchamas(c *gin.Context) {
	chama_data, err := data_access.Chama_profile()
	if err != nil {
		// Handle the error so the server doesn't crash or insert bad data
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch profile data"})
		fmt.Println(err)
		return
	}
	c.IndentedJSON(http.StatusOK, chama_data)
}

type profile struct {
	Name    string `json:"name"`
	Contact int64  `json:"contact"`
	Email   string `json:"email"`
}

var profiles = []profile{}
