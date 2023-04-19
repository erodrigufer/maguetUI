package main

import (
	"net/http"

	"github.com/erodrigufer/maguetUI/backend/internal/api"
)

func main() {

	port := 8000

	app := api.NewApplication(port)

	app.InfoLog.Printf("Starting server at port %d", port)

	err := app.Srv.ListenAndServe()
	if err != http.ErrServerClosed {
		app.ErrorLog.Fatal(err)
	}

}
