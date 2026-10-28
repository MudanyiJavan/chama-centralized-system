package restful_API

import (
	"net/http"

	"errors"
	"fmt"
	"time"

	"example.com/morbs/data_access"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func PostUsers(c *gin.Context) {
	var newUser user

	// Call BindJSON to bind the received JSON to
	if err := c.BindJSON(&newUser); err != nil {
		return
	}
	data := newUser
	name1 := data.Fname
	name2 := data.Sname
	cont := data.Contact
	email := data.Email
	pass := data.Password
	// Add the new album to the slice.
	response, err := data_access.Account_creation(name1, name2, int64(cont), email, pass)
	if err != nil {
		c.IndentedJSON(http.StatusCreated, err)
		return
	}
	client_token, err := token_generation(response)
	if err != nil {
		c.IndentedJSON(http.StatusCreated, err)
	}
	c.SetCookie(
		"session_token", // Cookie name
		client_token,    // Cookie value
		3600*24,         // MaxAge in seconds (e.g., 24 hours)
		"/",             // Path (available to the entire site)
		"",              // Domain (blank defaults to the current host)
		true,            // Secure (set to true for HTTPS in production)
		true,            // HttpOnly (blocks client-side JavaScript access)
	)
	c.IndentedJSON(http.StatusCreated, gin.H{"message": "Account created successfully"})
}

type user struct {
	Fname    string  `json:"fname"`
	Sname    string  `json:"sname"`
	Contact  float64 `json:"contact"`
	Email    string  `json:"email"`
	Password string  `json:"password"`
}

var hmacSampleSecret []byte

func token_generation(id string) (string, error) {
	// Create a new token object, specifying signing method and the claims
	// you would like it to contain.
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":   id,
		"name": "Morbs",
		"nbf":  time.Now().Add(-10 * time.Second).Unix(),
	})
	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString(hmacSampleSecret)

	return tokenString, err
}
func token_validation(token string) (string, error) {
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

func User_login(c *gin.Context) {
	var login_details user_credentials
	if err := c.BindJSON(&login_details); err != nil {
		return
	}
	data := login_details
	Pass := data.Password

	id, err := data_access.Login_Authentication(Pass)
	if err != nil {
		c.IndentedJSON(http.StatusCreated, err)
		return
	}

	client_token, err := token_generation(id)
	if err != nil {
		c.IndentedJSON(http.StatusCreated, err)
	}
	fmt.Println(client_token)
	c.SetCookie(
		"session_token", // Cookie name
		client_token,    // Cookie value
		3600*24,         // MaxAge in seconds (e.g., 24 hours)
		"/",             // Path (available to the entire site)
		"localhost",     // Domain (blank defaults to the current host)
		false,           // Secure (set to true for HTTPS in production)
		true,            // HttpOnly (blocks client-side JavaScript access)
	)
	c.IndentedJSON(http.StatusCreated, gin.H{"message": "logged in successfully"})
}

type user_credentials struct {
	Contact  int64  `json:"contact"`
	Password string `json:"password"`
}
