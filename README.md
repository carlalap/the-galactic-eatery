# The Galactic Eatery

## Custom API From Scratch

## Project Context

Utilizing all the skills we've developed over the last two trimesters, we have created our very own API from start to finish. We designed it, narrowed down what should be included in our MVP (minimum viable product), and worked together as a team to bring our idea to life.

## Galactic Eatery Backend

Welcome to the Galactic Eatery Backend! This repository contains the backend code for the Galactic Eatery project, a school project for managing a galactic restaurant's backend operations.

## Getting Started

To get started with the Galactic Eatery Backend, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies by running `npm install`.
3. Start the server by running `node index.js`.
4. You're all set! The server should now be running on `http://localhost:5000`.

## Usage

### Registering a New User

To register a new user, send a POST request to `/register` with the user's username and password in the request body in JSON format:

```bash
curl -X POST \
  http://localhost:5000/register \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD"
}'

### Logging In

To log in, send a POST request to `/login` with the user's username and password in the request body in JSON format:

curl -X POST \
  http://localhost:5000/login \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD"
}'

After successful login, you will receive a JWT token in the response.

### Accessing Protected Routes

To access protected routes, include the JWT token in the Authorization header with the Bearer scheme:

curl -X GET \
  http://localhost:5000/protected \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'

Replace `YOUR_JWT_TOKEN` with the JWT token received after logging in.

## Note

Passwords are securely hashed using bcrypt before being stored in the database. Even though passwords are initially stored as plaintext in the `users.json` file, once a user registers or logs in, their password will be securely hashed in the database.
