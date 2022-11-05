package models

import "time"

type Student struct {
	Id        int
	FullName  string
	Guardian  Guardian
	School    School
	Email     string
	Phone     string
	createdAt time.Time
	updatedAt time.Time
}

type Guardian struct {
	Id        int
	FullName  string
	Email     string
	Phone     string
	createdAt time.Time
	updatedAt time.Time
}

type School struct {
	Id        int
	Name      string
	Location  string
	Email     string
	Phone     string
	createdAt time.Time
	updatedAt time.Time
}

type PurchaseItem struct {
	Id        int
	School    School
	Price     int
	Currency  string
	createdAt time.Time
	updatedAt time.Time
}

type Purchase struct {
	PurchaseItem PurchaseItem
	Guardian     Guardian
	Student      Student
	createdAt    time.Time
	updatedAt    time.Time
}
