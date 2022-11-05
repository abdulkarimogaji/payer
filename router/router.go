package router

import (
	"bytes"
	"fmt"
	"html/template"
	"io"
	"net/http"

	"github.com/abdulkarimogaji/payer/modules/student"
	"github.com/abdulkarimogaji/payer/utils"
)

var header = "Live"

func NewRouter() http.Handler {
	mux := http.NewServeMux()
	sh := student.NewStudentHandler()

	mux.Handle("/api/student/", http.StripPrefix("/api/student", sh))
	mux.HandleFunc("/api/", healthCheck)
	mux.HandleFunc("/", homePage())
	mux.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("./public"))))
	return utils.RecoverMiddleware(utils.LogMiddleware(mux))
}

func healthCheck(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/api/" || r.Method != http.MethodGet {
		utils.JsonNotFoundResponse(w)
		return
	}
	w.WriteHeader(http.StatusOK)
	utils.JsonResponse(w, 200, "Hello World", nil)
}

func homePage() http.HandlerFunc {
	files := templateLayout("./views/index.gohtml")
	template := template.Must(template.New("index").Funcs(defaultFuncs).ParseFiles(files...))
	return func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" || r.Method != http.MethodGet {
			notFoundPage(w, r)
			return
		}
		var buf bytes.Buffer
		if err := template.ExecuteTemplate(&buf, "base", map[string]interface{}{
			"Header": header,
		}); err != nil {
			fmt.Printf("ERR: %v\n", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
		io.Copy(w, &buf)
	}
}

var notFoundPage = func() http.HandlerFunc {
	files := templateLayout("./views/_notFound.gohtml")
	template := template.Must(template.New("index").Funcs(defaultFuncs).ParseFiles(files...))
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var buf bytes.Buffer
		if err := template.ExecuteTemplate(&buf, "base", nil); err != nil {
			fmt.Printf("ERR: %v\n", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
		io.Copy(w, &buf)
	})
}()
