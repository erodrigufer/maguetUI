package api

import (
	"fmt"
	"net/http"
	"time"
)

// newServer, return a new instance of the server.
// port, defines the port at which the server will listen.
func (app *Application) newServer(port int) *http.Server {
	srv := &http.Server{
		Addr:         fmt.Sprintf(":%d", port),
		ErrorLog:     app.ErrorLog,
		Handler:      app.routes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return srv
}

// serverError, sends an error message to the error logger and
// then sends a generic 500 Internal Server Error response to the client.
func (app *Application) serverError(w http.ResponseWriter, err error) {
	// trace := fmt.Sprintf("%s\n%s", err.Error(), debug.Stack())

	// The first parameter of Output equals the calldepth, which is the count
	// of the number of frames to skip when computing the file name
	// and line number. So basically, just go back on the stack trace to display
	// the name of function (file) which called the error logging helper
	// function.

	// app.ErrorLog.Output(2, trace)
	app.ErrorLog.Print(err)
	http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
}
