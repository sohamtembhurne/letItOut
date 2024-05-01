package routes

import (
	"letItOut/controllers"

	"github.com/gorilla/mux"
)

func SetupUserRoutes(r *mux.Router) {
	r.HandleFunc("", controllers.GetUsers).Methods("GET")
}
