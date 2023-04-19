package api

import (
	"fmt"
	"net/http"

	"github.com/erodrigufer/maguetUI/backend/internal/openai"
)

type ClientPromptRequest struct {
	PromptText string `json:"promptText"`
}

type PromptResponse struct {
	ResponseText string `json:"responseText"`
}

func (app *Application) handlePrompt(w http.ResponseWriter, r *http.Request) {
	// Avoid CORS problems.
	header := w.Header()
	header.Set("Access-Control-Allow-Methods", header.Get("Allow"))
	header.Set("Vary", "Origin")
	header.Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
	header.Set("Access-Control-Allow-Credentials", "true")

	prompt, err := extractPrompt(w, r)
	if err != nil {
		err = fmt.Errorf("Error extracting prompt from client: %v", err)
		app.serverError(w, err)
		return
	}

	resp, err := app.sendCompletionReq(app.ClientOpenAI, prompt, 0.3)
	if err != nil {
		err = fmt.Errorf("Error sending prompt to OpenAI API: %v", err)
		app.serverError(w, err)
		return
	}

	err = sendPromptResp(w, resp)
	if err != nil {
		err = fmt.Errorf("Error sending prompt response to client: %v", err)
		app.serverError(w, err)
		return
	}

}

func extractPrompt(w http.ResponseWriter, r *http.Request) (string, error) {
	clientReq := new(ClientPromptRequest)
	err := readJSON(w, r, clientReq)
	if err != nil {
		return "", fmt.Errorf("error decoding JSON client request: %w", err)
	}

	return clientReq.PromptText, nil
}

func (app *Application) sendCompletionReq(api openai.ChatGPTResponder, prompt string, temp float32) (string, error) {
	app.InfoLog.Print("Sending completion request to ChatGPT API.")
	resp, err := api.RequestCompletion(prompt, temp)
	if err != nil {
		return "", fmt.Errorf("Request for completion failed: %w", err)
	}

	return resp, nil

}

// sendPromptResp, send response of prompt back to the client.
func sendPromptResp(w http.ResponseWriter, apiResp string) error {
	respEncode := new(PromptResponse)
	respEncode.ResponseText = apiResp
	err := writeJSON(w, http.StatusOK, respEncode)
	if err != nil {
		return fmt.Errorf("error encoding and sending JSON response: %w", err)
	}

	return nil

}
