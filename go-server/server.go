package main

import (
	"fmt"
	"letItOut/config"
	"letItOut/routes"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	port := config.LoadEnvVar("PORT")
	r := mux.NewRouter()

	routes.SetupRoutes(r)

	fmt.Println("Server running on", port)
	http.ListenAndServe(port, r)
}
