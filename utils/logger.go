package utils

import (
	"fmt"
	"net/http"
	"time"
)

func LogMiddleware(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Pre-work
		nw := time.Now()

		// Run Handler
		handler.ServeHTTP(w, r)

		// Post-work
		fmt.Printf("%s %s %s %s\n", r.RemoteAddr, r.Method, r.URL, time.Since(nw))
	})
}
