package api

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func (app *Application) createNewPrompt(w http.ResponseWriter, r *http.Request) {

	// Read the request body.
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return
	}

	// Write the response body
	// w.Header().Set("Content-Type", "text/plain")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	header := w.Header()
	header.Set("Access-Control-Allow-Methods", header.Get("Allow"))
	// header.Set("Access-Control-Allow-Headers", "Authorization")
	// header.Set("Access-Control-Allow-Origin", "*")
	header.Set("Vary", "Origin")
	header.Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
	header.Set("Access-Control-Allow-Credentials", "true")

	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, string(body))
}

func (app *Application) getPrompt(w http.ResponseWriter, r *http.Request) {

	// Write the response body
	w.Header().Set("Content-Type", "text/plain")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "Getting...")
}
