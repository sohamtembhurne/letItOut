package routes

import "github.com/gorilla/mux"

func SetupRoutes(r *mux.Router) {
	userRouter := r.PathPrefix("/user").Subrouter()

	SetupUserRoutes(userRouter)
}
