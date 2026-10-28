package restful_API

import (
	"errors"
	"fmt"
	"net/http"

	"example.com/morbs/data_access"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

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
	cookieValue, err := c.Cookie("session_token")
	fmt.Println(cookieValue)
	if err != nil {
		// If the cookie isn't present, return unauthorized
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized: Session cookie missing"})
		return
	}
	verified_token, err := token_valid(cookieValue)
	fmt.Println(verified_token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "invalid token"})
		return
	}

	chama_data, err := data_access.Chama_profiles(verified_token)
	fmt.Println(chama_data)
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

func token_valid(token string) (string, error) {
	validtoken, err := jwt.Parse(token, func(token *jwt.Token) (any, error) {
		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return hmacSampleSecret, nil
	}, jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Alg()}))
	if err != nil {
		return "", err
	}
	if claims, ok := validtoken.Claims.(jwt.MapClaims); ok && validtoken.Valid {
		// FIX: Assert that the interface value is a string
		if id, ok := claims["id"].(string); ok {
			return id, nil
		}
		return "", errors.New("id claim is not a string")
	}
	return "", errors.New("invalid token structure")
}
