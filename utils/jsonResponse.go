package utils

import (
	"encoding/json"
	"io"
)

type jsonResp struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Data    any    `json:"data"`
}

func JsonResponse(w io.Writer, status int, message string, data any) {
	resp := jsonResp{status, message, data}
	encoder := json.NewEncoder(w)
	encoder.Encode(resp)
}
