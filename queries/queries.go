package queries

const CreateTableUser = `CREATE TABLE IF NOT EXISTS user (
  id BIGINT(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)`

const CreateUser = `INSERT INTO user(firstName, lastName, email, password, createdAt, updatedAt) VALUES(?,?, ?, ?, ?, ?)`

const GetUserById = `SELECT id, firstName, lastName, email, password, createdAt, updatedAt FROM user WHERE id = ? `

const DeleteUser = `DELETE FROM user WHERE id = ?`
