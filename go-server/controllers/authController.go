package controllers

import (
	"encoding/json"
	"net/http"
)

func Verify(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	response := map[string]interface{}{
		"message": "Verified",
		"status":  true,
	}
	json.NewEncoder(w).Encode(response)
}
