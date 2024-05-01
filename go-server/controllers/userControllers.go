package controllers

import (
	"context"
	"encoding/json"
	"letItOut/config"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
)

func GetUsers(w http.ResponseWriter, r *http.Request) {
	// user := User{Name: "John Doe", Age: 30}
	coll := config.Conn.Database("secrets").Collection("users")

	cursor, err := coll.Find(context.TODO(), bson.D{{}})

	if err != nil {
		panic(err)
	}

	var results []map[string]interface{}

	for cursor.Next(context.Background()) {
		var result map[string]interface{}
		err := cursor.Decode(&result)

		if err != nil {
			panic(err)
		}

		results = append(results, result)
	}

	jsonBytes, err := json.Marshal(results)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonBytes)
}
