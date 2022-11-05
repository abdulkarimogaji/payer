package student

import (
	"net/http"
	"strconv"

	"github.com/abdulkarimogaji/payer/models"
	"github.com/abdulkarimogaji/payer/utils"
)

type StudentHandler struct{}

func NewStudentHandler() *StudentHandler {
	return &StudentHandler{}
}

func (sh *StudentHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		if r.URL.Path == "/" {
			sh.listTaskHandler(w, r)
			return
		}
		sh.readTaskHandler(w, r)
	case http.MethodPost:
		sh.createTaskHandler(w, r)
	case http.MethodPut:
		sh.updateTaskHandler(w, r)
	case http.MethodDelete:
		sh.deleteTaskHandler(w, r)
	default:
		utils.JsonNotFoundResponse(w)
	}
}

func (sh *StudentHandler) listTaskHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: List Tasks
	utils.JsonResponse(w, 200, "Success", models.Student{Id: 12, FullName: "Abdul"})
}
func (sh *StudentHandler) readTaskHandler(w http.ResponseWriter, r *http.Request) {
	idStr, err := utils.ExtractId(r)
	if err != nil {
		utils.JsonNotFoundResponse(w)
		return
	}
	id, err := strconv.Atoi(idStr)
	if err != nil {
		utils.JsonNotFoundResponse(w)
		return
	}
	utils.JsonResponse(w, 200, "Found", models.Student{Id: id})
	// TODO: Read Task by ID
}
func (sh *StudentHandler) deleteTaskHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: Delete Task by ID
}
func (sh *StudentHandler) createTaskHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: Create Task by ID
}
func (sh *StudentHandler) updateTaskHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: Update Task by ID
}
