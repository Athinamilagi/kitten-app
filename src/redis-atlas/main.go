package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-redis/redis/v8"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"sort"
)

var client *redis.Client

func init() {
	ctx := context.Background()
	client = redis.NewClient(&redis.Options{
		Addr:     "redis-15216.c325.us-east-1-4.ec2.cloud.redislabs.com:15216",
		Password: "eOVoPJpRakLYLDtRzzpGJptzKml3LMTs",
		DB:       0,
	})

	// Test the connection
	_, err := client.Ping(ctx).Result()
	if err != nil {
		fmt.Println("Error connecting to Redis:", err)
		return
	}
}

// Struct for storing user data
type User struct {
	Name  string `json:"name"`
	Score int    `json:"score"`
}

// Add MarshalJSON method to User struct
func (u User) MarshalJSON() ([]byte, error) {
	return json.Marshal(struct {
		Name  string `json:"name"`
		Score int    `json:"score"`
	}{
		Name:  u.Name,
		Score: u.Score,
	})
}

// Function to add a new user
func addUser(w http.ResponseWriter, r *http.Request) {
	// Parse request body
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()

	// Check if the user already exists
	existingScore, err := client.Get(ctx, user.Name).Result()
	if err == redis.Nil {
		// User does not exist, add the new user
		err = client.Set(ctx, user.Name, user.Score, 0).Err()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	} else if err != nil {
		// Error while checking for existing user
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	} else {
		// User exists, update the score
		existingScoreInt, err := strconv.Atoi(existingScore)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		user.Score += existingScoreInt
		err = client.Set(ctx, user.Name, user.Score, 0).Err()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	w.WriteHeader(http.StatusOK)
}

// Function to update user score
func updateUser(w http.ResponseWriter, r *http.Request) {
	// Parse query parameters
	queryValues := r.URL.Query()
	userName := queryValues.Get("name")

	// Parse request body
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()

	// Check if the user already exists
	existingScore, err := client.Get(ctx, userName).Result()
	if err == redis.Nil {
		// User does not exist, add the new user
		err = client.Set(ctx, userName, user.Score, 0).Err()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	} else if err != nil {
		// Error while checking for existing user
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	} else {
		// User exists, update the score
		existingScoreInt, err := strconv.Atoi(existingScore)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		user.Score += existingScoreInt
		err = client.Set(ctx, userName, user.Score, 0).Err()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	w.WriteHeader(http.StatusOK)
}

// Function to get the leaderboard
func leaderboard(w http.ResponseWriter, r *http.Request) {
	    // Get all the users and sort them by score
    ctx := context.Background()
    users := make(map[string]int)
    iter := client.Scan(ctx, 0, "", 0).Iterator() // Provide all required arguments for Scan
    for iter.Next(ctx) {
        item := iter.Val() // Use Val method to get the value
        score, err := client.Get(ctx, item).Result()
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        users[item], _ = strconv.Atoi(score)
    }
    if err := iter.Err(); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    sortedUsers := make([]User, 0, len(users))
	
    sort.Slice(sortedUsers, func(i, j int) bool { return sortedUsers[i].Score > sortedUsers[j].Score })

    // Convert the map to a slice of User structs
    var userSlice []User
    for user, score := range users {
        userSlice = append(userSlice, User{user, score})
    }

    // Return the leaderboard as JSON
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(userSlice)
}

func main() {
	r := mux.NewRouter()

	// Define API endpoints
	r.HandleFunc("/addUser", addUser).Methods("POST")
	r.HandleFunc("/updateUser/{name}", updateUser).Methods("PUT")
	r.HandleFunc("/leaderboard", leaderboard).Methods("GET")

	// Apply middleware
	r.Use(handlers.CORS(
		handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		handlers.AllowedOrigins([]string{"http://localhost:3000"}), // Allow requests from React app
		handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"}),
	))

	// Start the server on port 3000
	http.ListenAndServe(":3000", r)
}
