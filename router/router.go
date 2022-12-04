package router

import (
	"database/sql"
	"html/template"
	"log"
	"net/http"

	"github.com/abdulkarimogaji/payer/modules/user"
	"github.com/abdulkarimogaji/payer/queries"
	"github.com/abdulkarimogaji/payer/utils"
	"github.com/abdulkarimogaji/payer/views"
	_ "github.com/go-sql-driver/mysql"
)

func NewRouter() http.Handler {
	// connect db
	db, err := sql.Open("mysql", "root:markdown_password@tcp(database:33066)/markdown_dev?parseTime=true")

	if err != nil {
		log.Fatal(err)

	}

	_, err = db.Exec(queries.CreateTableUser)

	if err != nil {
		log.Fatal(err)
	}

	mux := http.NewServeMux()
	user := user.NewUserHandler(db)

	mux.Handle("/api/user/", http.StripPrefix("/api/user", user))
	mux.HandleFunc("/api/", healthCheck)
	mux.HandleFunc("/", homePage())
	mux.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("./public"))))
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
