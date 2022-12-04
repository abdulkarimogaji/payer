package models

import "time"

type User struct {
	Id        int64     `json:"id,omitempty"`
	FirstName string    `json:"firstName,omitempty"`
	LastName  string    `json:"lastName,omitempty"`
	Email     string    `json:"email,omitempty"`
	Password  string    `json:"password,omitempty"`
	CreatedAt time.Time `json:"createdAt,omitempty"`
	UpdatedAt time.Time `json:"updatedAt,omitempty"`
}

type MarkdownItem struct {
	Id        int
	Title     string
	CoverImg  string
	CreatedAt time.Time
	UpdatedAt time.Time
}
