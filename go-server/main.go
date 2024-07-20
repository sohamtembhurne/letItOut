package main

import (
	"fmt"
	"letItOut/config"
	"letItOut/routes"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	port := config.LoadEnvVar("PORT")

	r := mux.NewRouter()
	routes.SetupRoutes(r)

	corsOpts := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // Update with specific origins if necessary
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	c := corsOpts.Handler(r)

	fmt.Println("Server running on", port)
	http.ListenAndServe(port, c)
}
