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

	c := cors.Default().Handler(r)

	fmt.Println("Server running on", port)
	http.ListenAndServe(port, c)
}
