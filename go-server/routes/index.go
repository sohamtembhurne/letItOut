package routes

import (
	"github.com/gorilla/mux"
)

func SetupRoutes(r *mux.Router) {
	authRouter := r.PathPrefix("/verify").Subrouter()
	userRouter := r.PathPrefix("/user").Subrouter()
	secretRouter := r.PathPrefix("/secrets").Subrouter()

	setupUserRoutes(userRouter)
	setupSecretRoutes(secretRouter)
	setupAuthRoutes(authRouter)
}
