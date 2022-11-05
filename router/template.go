package router

import "html/template"

var defaultFuncs = template.FuncMap{
	"defTitle": func(ip interface{}) string {
		v, ok := ip.(string)
		if !ok || (ok && v == "") {
			return "Default Title"
		}
		return v
	},
}
var templateFiles = []string{
	"./views/base.gohtml",
}

func templateLayout(files ...string) []string {
	return append(templateFiles, files...)
}
