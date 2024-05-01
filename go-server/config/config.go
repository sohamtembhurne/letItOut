package config

import (
	"context"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func LoadEnvVar(key string) string {
	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		panic("Error loading .env file")
	}

	return os.Getenv(key)
}

func ConnectToDB() *mongo.Client {
	// Load env file
	MONGO_URI := LoadEnvVar("MONGODB_URL")

	// Connect to the database.
	clientOptions := options.Client().ApplyURI(MONGO_URI)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		panic(err)
	}

	// Check the connection.
	err = client.Ping(context.Background(), nil)
	if err != nil {
		panic(err)
	} else {
		fmt.Println("Connected to mongoDB!!!")
	}
	return client
}

var Conn = ConnectToDB()
