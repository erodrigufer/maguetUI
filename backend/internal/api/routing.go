package api

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/justinas/alice"
)

// routes, define the routing of the server.
func (app *Application) routes() http.Handler {

	// TODO: maybe? the recover panic can be directly set at the router as a
	// field of the router's struct.
	standardMiddleware := alice.New(app.recoverPanic, app.logRequest, secureHeaders)

	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/v1/test", app.testGetReq)
	router.HandlerFunc(http.MethodPost, "/v1/echo", app.echoResponse)
	router.HandlerFunc(http.MethodPost, "/v1/prompt", app.handlePrompt)

	router.GlobalOPTIONS = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("Access-Control-Request-Method") != "" {
			// Set CORS headers
			header := w.Header()
			header.Set("Access-Control-Allow-Methods", header.Get("Allow"))
			header.Set("Access-Control-Allow-Headers", r.Header.Get("Access-Control-Request-Headers"))
			// header.Set("Access-Control-Allow-Origin", "*")
			header.Set("Vary", "Origin")
			header.Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
			header.Set("Access-Control-Allow-Credentials", "true")
		}

		// Adjust status code to 204
		w.WriteHeader(http.StatusNoContent)
	})

	return standardMiddleware.Then(router)
}
