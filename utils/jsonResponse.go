package utils

import (
	"encoding/json"
	"net/http"
)

type jsonResp struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Data    any    `json:"data"`
}

func JsonResponse(w http.ResponseWriter, status int, message string, data any) {
	w.Header().Set("Content-Type", "application/json")
	resp := jsonResp{status, message, data}
	encoder := json.NewEncoder(w)
	encoder.Encode(resp)
}

func JsonNotFoundResponse(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	JsonResponse(w, http.StatusNotFound, "Resource Not Found", nil)
}
