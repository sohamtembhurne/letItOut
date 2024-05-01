package routes

import (
	"encoding/json"
	auth "letItOut/middlewares"
	"net/http"

	"github.com/gorilla/mux"
)

func setupAuthRoutes(r *mux.Router) {
	r.Use(auth.AuthMiddleware)

	r.HandleFunc("", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		response := map[string]interface{}{
			"message": "Verified",
			"success": true,
		}
		json.NewEncoder(w).Encode(response)
	})
}
