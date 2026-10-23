package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// For HMAC signing method, the key can be any []byte. It is recommended to generate
// a key using crypto/rand or something equivalent. You need the same key for signing
// and validating.
var hmacSampleSecret []byte

func main() {
	validtoken, error := encoding_token()
	fmt.Println(validtoken, error)

	name, bar, error := decoding_token(validtoken)
	fmt.Println(name, bar, error)

	router := gin.Default()
	router.GET("/albums", getAlbums)
	router.POST("/albums", postAlbums)

	router.Run("localhost:8080")

}

// creating, signing, and encoding a JWT token using the HMAC signing method
func encoding_token() (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"foo":  "bar",
		"name": "mudanyi",
		"nbf":  time.Date(2015, 10, 10, 12, 0, 0, 0, time.UTC).Unix(),
	})
	tokenString, err := token.SignedString(hmacSampleSecret)

	if err != nil {
		return "", err
	}
	return tokenString, nil

}

func decoding_token(generated_token string) (string, string, error) {
	token, err := jwt.Parse(generated_token, func(token *jwt.Token) (any, error) {
		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return hmacSampleSecret, nil
	}, jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Alg()}))
	if err != nil {
		log.Fatal(err)
	}

	claims := token.Claims.(jwt.MapClaims)
	validname, bar := claims["name"].(string), claims["foo"].(string)
	return validname, bar, nil
}

type album struct {
	ID     string  `json:"id"`
	Title  string  `json:"title"`
	Artist string  `json:"artist"`
	Price  float64 `json:"price"`
}

var albums = []album{
	{ID: "1", Title: "Blue Train", Artist: "John Coltrane", Price: 56.99},
	{ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
	{ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
}

type response_token struct {
	Token string `json:"token"`
}

// post request
func postAlbums(c *gin.Context) {
	var newAlbum album
	validtoken, error := encoding_token()
	fmt.Println(validtoken, error)
	xx := response_token{validtoken}
	// Call BindJSON to bind the received JSON to
	// newAlbum.
	if err := c.BindJSON(&newAlbum); err != nil {
		return
	}

	// Add the new album to the slice.
	albums = append(albums, newAlbum)
	c.IndentedJSON(http.StatusCreated, xx)
}

type testHeader struct {
	Rate   int    `header:"Rate"`
	Domain string `header:"Domain"`
}

// get request with header
func getAlbums(c *gin.Context) {
	h := testHeader{}
	if err := c.ShouldBindHeader(&h); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"Rate": h.Rate, "Domain": h.Domain})
	name, bar, error := decoding_token(h.Domain)
	fmt.Println(name, bar, error)
	c.IndentedJSON(http.StatusOK, albums)
}
