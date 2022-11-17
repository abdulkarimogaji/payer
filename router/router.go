package router

import (
	"html/template"
	"net/http"

	"github.com/abdulkarimogaji/payer/modules/student"
	"github.com/abdulkarimogaji/payer/utils"
	"github.com/abdulkarimogaji/payer/views"
)

func NewRouter() http.Handler {
	mux := http.NewServeMux()
	sh := student.NewStudentHandler()

	mux.Handle("/api/student/", http.StripPrefix("/api/student", sh))
	mux.HandleFunc("/api/", healthCheck)
	mux.HandleFunc("/", homePage())
	mux.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("./public"))))
	// mux.Handle("/views/", http.StripPrefix("/views/", http.FileServer(http.Dir("./views"))))
	return utils.RecoverMiddleware(utils.LogMiddleware(utils.CORSMiddleware(mux)))
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
	tmpl := template.Must(template.New("").Parse(views.Home))
	return func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" || r.Method != http.MethodGet {
			notFoundPage(w, r)
			return
		}
		tmpl.Execute(w, "")
	}
}

var notFoundPage = func() http.HandlerFunc {
	tmpl := template.Must(template.New("").Parse(views.Not_found))
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tmpl.Execute(w, "")
	})
}()
