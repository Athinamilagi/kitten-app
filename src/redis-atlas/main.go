package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/rs/cors"
)

var client *redis.Client

func init() {
	// Initialize Redis client
	ctx := context.Background()
	client = redis.NewClient(&redis.Options{
		Addr:     "redis-15216.c325.us-east-1-4.ec2.cloud.redislabs.com:15216",
		Password: "eOVoPJpRakLYLDtRzzpGJptzKml3LMTs",
		DB:       0,
	})

	// Test the connection
	pong, err := client.Ping(ctx).Result()
	if err != nil {
		fmt.Println("Error connecting to Redis:", err)
		os.Exit(1)
	}
	fmt.Println("Connected to Redis:", pong)
}

func main() {
	// Create a new mux router
	mux := http.NewServeMux()

	// Define routes
	mux.HandleFunc("/addUser", addUser)
	mux.HandleFunc("/leaderboard", getLeaderboard)
	mux.HandleFunc("/deleteUser", deleteUser)

	// Create a new CORS handler
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"}, // Allow requests from localhost:3000
	})

	// Wrap the mux router with CORS middleware
	handler := c.Handler(mux)

	fmt.Println("Server running on port 8080...")
	http.ListenAndServe(":8080", handler)
}

func addUser(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	// Parse request body
	var user struct {
		Name  string    `json:"name"`
		Score int       `json:"score"`
		Time  time.Time `json:"time"`
	}
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Set user score in Redis
	err = client.Set(ctx, user.Name, user.Score, 0).Err()
	if err != nil {
		http.Error(w, "Failed to add user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func getLeaderboard(w http.ResponseWriter, r *http.Request) {
	// Set CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Predefined sample leaderboard data
	leaderboard := map[string]int{
		"John":  100,
		"Alice": 90,
		"Bob":   80,
	}

	// Marshal leaderboard data to JSON
	leaderboardJSON, err := json.Marshal(leaderboard)
	if err != nil {
		http.Error(w, "Failed to format leaderboard data", http.StatusInternalServerError)
		return
	}

	// Set response headers
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	// Write leaderboard data as JSON response
	_, err = w.Write(leaderboardJSON)
	if err != nil {
		http.Error(w, "Failed to write leaderboard data", http.StatusInternalServerError)
		return
	}
}

func deleteUser(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	// Parse request body
	var user struct {
		Name string `json:"name"`
	}
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Delete user from Redis
	err = client.Del(ctx, user.Name).Err()
	if err != nil {
		http.Error(w, "Failed to delete user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
