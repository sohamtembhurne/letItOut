package routes

import "github.com/gorilla/mux"

func SetupRoutes(r *mux.Router) {
	authRouter := r.PathPrefix("/verify").Subrouter()
	userRouter := r.PathPrefix("/user").Subrouter()

	SetupUserRoutes(userRouter)
	setupAuthRoutes(authRouter)
}
