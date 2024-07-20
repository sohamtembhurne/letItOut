package routes

import (
	"letItOut/controllers"
	auth "letItOut/middlewares"

	"github.com/gorilla/mux"
)

func setupAuthRoutes(r *mux.Router) {
	r.Use(auth.AuthMiddleware)
	r.HandleFunc("", controllers.Verify).Methods("POST")

}
