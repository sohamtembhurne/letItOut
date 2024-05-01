package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"letItOut/config"
	auth "letItOut/middlewares"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type user struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	Name     string             `bson:"name, omitempty"`
	Email    string             `bson:"email, omitempty"`
	Password string             `bson:"password, omitempty"`
}

var coll = config.Conn.Database("secrets").Collection("users")

func GetUsers(w http.ResponseWriter, r *http.Request) {
	// user := User{Name: "John Doe", Age: 30}
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

// create user
func CreateUser(w http.ResponseWriter, r *http.Request) {
	var user user

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	// err = coll.FindOne(context.TODO(), bson.M{"email": user.Email}).Decode(&foundUser)
	existingUser := coll.FindOne(context.Background(), bson.M{"email": user.Email})
	if existingUser.Err() == nil {
		w.WriteHeader(200)
		response := map[string]interface{}{
			"message": "User already exists",
			"success": false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}
	// insert new user in db
	newUser, err := coll.InsertOne(context.Background(), user)
	if err != nil {
		w.WriteHeader(200)
		response := map[string]interface{}{
			"message": "Failed to create user",
			"success": false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	// generate toke
	token, err := auth.GenerateToken(newUser.InsertedID.(primitive.ObjectID).Hex(), user.Name)
	fmt.Println(err)
	if err != nil {
		w.WriteHeader(200)
		response := map[string]interface{}{
			"message": "Could not generate token",
			"success": false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	response := map[string]interface{}{
		"message": "New user created successfully",
		"success": true,
		"token":   token,
	}
	json.NewEncoder(w).Encode(response)
}

// login user
func LoginUser(w http.ResponseWriter, r *http.Request) {
	var body user

	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		panic(err)
	}

	trueUser := coll.FindOne(context.Background(), bson.M{"email": body.Email})
	if trueUser.Err() != nil {
		panic("problem")
	}

	var result user
	if err := trueUser.Decode(&result); err != nil {
		panic(err)
	}

	fmt.Println(result)
	fmt.Println(body)

	if result.Password != body.Password {
		response := map[string]interface{}{
			"message": "Wrong password",
			"success": true,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	token, _ := auth.GenerateToken(result.ID.Hex(), result.Name)

	response := map[string]interface{}{
		"message": "Successfully logged in",
		"success": true,
		"token":   token,
	}
	json.NewEncoder(w).Encode(response)

}
