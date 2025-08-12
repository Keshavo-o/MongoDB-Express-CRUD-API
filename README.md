# Express + MongoDB CRUD API
## A simple Node.js and Express application connected to MongoDB using Mongoose. Demonstrates full CRUD (Create, Read, Update, Delete) operations with middleware for logging and user validation.

## Features
MongoDB + Mongoose integration

Create, Read, Update, Delete users

Middleware for request logging and user existence check

Logs all requests to log.txt

## Installation
npm install 
node index.js

### Server runs at: http://localhost:3030

## API Endpoints
### GET	/	Hello World message
### GET	/users	Get all users
### GET	/users/:id	Get user by ID
### POST	/users	Create new user
### PATCH	/users/:id	Update user by ID
### DELETE	/users/:id	Delete user by ID

## Notes:
Only works for application/x-www-form-urlencoded request bodies (for POST/PATCH).

__v field is automatically added by Mongoose to track document version.

