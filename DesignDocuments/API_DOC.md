# Galactic Eatery Backend API Documentation

Welcome to the Galactic Eatery API documentation! Here, you'll find all the files responsible for creating and populating the MongoDB database, as well as the APIs, logging, and authentication methods for the localhost backend. This API enables you to search for various restaurant dishes across the universe, categorized by their name, price or planet of origin.

## Base URL

<http://localhost:5000>

## Authentication

Some endpoints require authentication using JSON Web Tokens (JWT). To authenticate, include the JWT token in the Authorization header of the request with the prefix Bearer.

Example:
Authorization: Bearer <JWT_TOKEN>

## Endpoints

### User Registration

URL: `/register`  
Method: `POST`  
Request Body:

- `username` (string, required): The username of the user.
- `password` (string, required): The password of the user.

Response:

- `201 Created`: User registered successfully.
- `400 Bad Request`: Username already exists.
- `500 Internal Server Error`: Error occurred during registration.

Example using cURL:

```bash
curl -X POST \
  http://localhost:5000/register \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD"
}'
```

### User Login

URL: `/login`
Method: `POST`
Request Body:

- `username` (string, required): The username of the user.
- `password` (string, required): The password of the user.

Response:

- `200 OK`: Login successful. Returns a JWT token.
- `401 Unauthorized`: Invalid username or password.
- `500 Internal Server Error`: Error occurred during login.

Example using cURL:

```bash
curl -X POST \
  http://localhost:5000/login \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD"
}'
```

### Get All Dishes

URL: `/dishes`
Method: `GET`
Response:

- `200 OK`: Returns an array of all dishes.
- `500 Internal Server Error`: Error occurred while fetching dishes.

Example using cURL:

```bash
curl -X GET \
  http://localhost:5000/dishes
```

### Filter Dishes by Name

URL: `/dishes/name`
Method: `GET`
Query Parameters:

- `name` (string, required): The name or partial name of the dish.

Response:

- `200 OK`: Returns an array of dishes matching the provided name.
- `400 Bad Request`: Name parameter is missing.
- `500 Internal Server Error`: Error occurred while filtering dishes.

Example using cURL:

```bash
curl -X GET \
  'http://localhost:5000/dishes/name?name=quasar-9'
```

### Filter Dishes by Planet of Origin

URL: `/dishes/:planet_of_origin`
Method: `GET`
URL Parameters:

- `planet_of_origin` (string, required): The planet of origin of the dish.

Response:

- `200 OK`: Returns an array of dishes from the specified planet of origin.
- `400 Bad Request`: Planet of origin parameter is missing.
- `500 Internal Server Error`: Error occurred while filtering dishes.

Example using cURL:

```bash
curl -X GET \
  'http://localhost:5000/dishes/planet_of_origin?planet_of_origin=black%20hole'
```

### Create a New Dish

URL: `/dishes/create`
Method: `POST`
Request Body: Dish object (JSON)
Response:

- `200 OK`: New dish created successfully.
- `500 Internal Server Error`: Error occurred while creating the dish.

Example using cURL:

```bash
curl -X POST \
  http://localhost:5000/dishes/create \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Dish Name",
    "description": "Dish Description",
    "price": 9.99,
    "planet_of_origin": "Earth"
  }'
```

## Note

- Passwords are securely hashed using bcrypt before being stored in the database. Even though passwords are initially stored as plaintext in the users.json file, once a user registers or logs in, their password will be securely hashed in the database.
- The API utilizes MongoDB as the database for storing dish information. Mongoose is used as the ODM (Object Document Mapper) to interact with the MongoDB database.
- The frontend of the Galactic Eatery is built using HTML, CSS, and JavaScript. It communicates with the backend API to retrieve and display data dynamically on the website.

[Back To Main](https://github.com/carlalap/the-galactic-eatery)
