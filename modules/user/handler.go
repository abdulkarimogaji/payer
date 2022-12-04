package user

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/abdulkarimogaji/payer/models"
	"github.com/abdulkarimogaji/payer/queries"
	"github.com/abdulkarimogaji/payer/utils"
)

type UserHandler struct {
	DB *sql.DB
}

func NewUserHandler(db *sql.DB) *UserHandler {
	return &UserHandler{
		DB: db,
	}
}

func (u *UserHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	log.Println("request details", r.URL, r.URL.RawPath, r.Method)
	switch r.Method {
	case http.MethodGet:
		if r.URL.Path == "/" {
			u.listUserHandler(w, r)
			return
		}
		u.readUserHandler(w, r)
	case http.MethodPost:
		u.createUserHandler(w, r)
	case http.MethodPut:
		u.updateUserHandler(w, r)
	case http.MethodDelete:
		u.deleteUserHandler(w, r)
	default:
		utils.JsonNotFoundResponse(w)
	}
}

func (u *UserHandler) listUserHandler(w http.ResponseWriter, r *http.Request) {
	utils.JsonResponse(w, 200, "Success", models.User{Id: 12, FirstName: "Abdul"})
}
func (u *UserHandler) readUserHandler(w http.ResponseWriter, r *http.Request) {
	idStr, err := utils.ExtractId(r)
	if err != nil {
		utils.JsonNotFoundResponse(w)
		return
	}
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		utils.JsonNotFoundResponse(w)
		return
	}
	var user models.User
	row := u.DB.QueryRow(queries.GetUserById, id)
	err = row.Scan(&user.Id, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		utils.JsonResponse(w, 404, "User not found", err)
		return
	}
	utils.JsonResponse(w, 200, "Found", user)
}
func (u *UserHandler) deleteUserHandler(w http.ResponseWriter, r *http.Request) {
	idStr, err := utils.ExtractId(r)
	if err != nil {
		utils.JsonNotFoundResponse(w)
		return
	}
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		utils.JsonNotFoundResponse(w)
		return
	}
	prep, err := u.DB.Prepare(queries.DeleteUser)
	if err != nil {
		utils.JsonResponse(w, 500, err.Error(), err)
		return
	}
	res, err := prep.Exec(id)
	if err != nil {
		utils.JsonResponse(w, 500, err.Error(), err)
		return
	}
	deleteCount, err := res.RowsAffected()
	if err != nil || deleteCount < 1 {
		utils.JsonNotFoundResponse(w)
		return
	}
	utils.JsonResponse(w, 200, "Delete Successful", id)
}
func (u *UserHandler) createUserHandler(w http.ResponseWriter, r *http.Request) {
	user := models.User{}
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		utils.JsonResponse(w, 400, "Bad request", err)
		return
	}
	// parse body into student Struct
	prep, err := u.DB.Prepare(queries.CreateUser)
	if err != nil {
		utils.JsonResponse(w, 500, err.Error(), map[string]string{})
		return
	}

	// set timestamps
	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()

	res, err := prep.Exec(user.FirstName, user.LastName, user.Email, user.Password, user.CreatedAt, user.UpdatedAt)
	if err != nil {
		utils.JsonResponse(w, 500, err.Error(), map[string]string{})
		return
	}
	newId, err := res.LastInsertId()

	if err == nil {
		user.Id = newId
	}
	utils.JsonResponse(w, 201, "user created successfully", user)
}
func (u *UserHandler) updateUserHandler(w http.ResponseWriter, r *http.Request) {

}
