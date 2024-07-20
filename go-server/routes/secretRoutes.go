package routes

import (
	"letItOut/controllers"

	"github.com/gorilla/mux"
)

func setupSecretRoutes(r *mux.Router) {
	r.HandleFunc("", controllers.GetSecrets).Methods("GET")
	r.HandleFunc("", controllers.PostSecret).Methods("POST")
	r.HandleFunc("", controllers.UpdateSecret).Methods("PUT")
}
