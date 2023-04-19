package api

import (
	"errors"
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

const auth_token_name = "MAGUET_TOKEN"

func GetAuthToken() (string, error) {
	homePath := os.Getenv("HOME")
	envFile := fmt.Sprintf("%s/.maguet.env", homePath)
	if err := godotenv.Load(envFile); err != nil {
		return "", errors.New("error loading .env file")
	}

	authToken := os.Getenv(auth_token_name)

	if authToken == "" {
		return "", fmt.Errorf("auth token not set, please set the %s environmental variable", auth_token_name)
	}
	return authToken, nil
}
