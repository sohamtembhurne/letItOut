package auth

import (
	"encoding/json"
	"fmt"
	"letItOut/config"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var key = config.LoadEnvVar("TOKEN_KEY")
var tokenKey = []byte(key)

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		tokenString := r.Header.Get("Authorization")

		if tokenString == "" {
			w.WriteHeader(http.StatusUnauthorized)
			response := map[string]interface{}{
				"message": "Token missing",
				"success": false,
			}
			json.NewEncoder(w).Encode(response)
			return
		}
		tokenString = tokenString[len("Bearer "):]

		user, err := verifyToken(tokenString)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			response := map[string]interface{}{
				"message": "Invalid token",
				"success": false,
				"user":    user.Username,
				"userId":  user.Id,
			}
			json.NewEncoder(w).Encode(response)
			return
		}

		r.Header.Set("X-User-Id", user.Id)
		r.Header.Set("X-Username", user.Username)
		next.ServeHTTP(w, r)
	})
}

func GenerateToken(id string, username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"id":       id,
			"username": username,
			"exp":      time.Now().Add(time.Hour * 24).Unix(),
		})

	tokenString, err := token.SignedString(tokenKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

type tokenBody struct {
	Id       string
	Username string
	jwt.RegisteredClaims
}

func verifyToken(tokenString string) (*tokenBody, error) {
	claims := &tokenBody{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return tokenKey, nil
	})
	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return claims, nil
}
