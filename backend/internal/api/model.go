package api

import (
	"log"
	"net/http"
	"os"

	"github.com/erodrigufer/maguetUI/backend/internal/openai"
)

const API_VERSION = "1.0"

// Application, object to interact with API from within main cmd file.
type Application struct {
	// Srv, *http.Server
	Srv *http.Server
	// ErrorLog, log server errors.
	ErrorLog *log.Logger
	// InfoLog, informative server logger.
	InfoLog *log.Logger
	// AuthToken, AuthToken for OpenAI API.
	AuthToken string
	// ClientOpenAI, client to interact with OpenAI API.
	ClientOpenAI *openai.OpenAIClient
}

// NewApplication, create a new Application struct that hosts the loggers and
// http.Server
func NewApplication(port int) *Application {
	app := new(Application)
	// Create a logger for INFO messages, the prefix "INFO" and a tab will be
	// displayed before each log message. The flags Ldate and Ltime provide the
	// local date and time.
	app.InfoLog = log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)

	// Create an ERROR messages logger, additionally use the Lshortfile flag to
	// display the file's name and line number for the error.
	app.ErrorLog = log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	app.Srv = app.newServer(port)

	authToken, err := GetAuthToken()
	if err != nil {
		app.ErrorLog.Fatalf("error retrieving auth token: %v", err)
	}
	app.AuthToken = authToken

	app.ClientOpenAI = openai.NewClient(app.AuthToken)

	return app
}
