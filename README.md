# The Galactic Eatery

## Custom API From Scratch

![Galactic Eatery Output](/front_end/assets/images/last_output2.png)

## Project Context

Utilizing all the skills we've developed over the last two trimesters, we have created our very own API from start to finish. We designed it, narrowed down what should be included in our MVP (minimum viable product), and worked together as a team to bring our idea to life.

## Galactic Eatery Description

Welcome to the Galactic Eatery Project. This repository contains the code for an automatic consultation of the menu of different exotic dishes across the Galaxy.

After the design stage, we began creating and populating locally the data into our database, so that later our API could interact with it.

For the backend, once our database <b>MongoDB</b> was in place and populated with data, we built our API to interact with our data. In this project, our API retrieves data from the database. We then mapped the database data to more useful models (just in case). Finally, we sent it back in an HTTP response using the correct status codes. During development, we used <b>Postman</b> to ensure our API was working properly.

After integrating with the backend, we developed a single-page frontend application that leverages the API to display data to the user. Even though the backend categorizes different search endpoints, the frontend displays data featuring dishes categorized by their planet of origin across the galaxy.

## Tech Stack Used in this Project

| Category   | Tool         |
| ---------- | ------------ |
| Languages  | JavaScript   |
| Frameworks | Node.js      |
|            | Express      |
| Libraries  | JQuery       |
|            | bcryptjs     |
|            | cors         |
|            | jsonwebtoken |
|            | mongodb      |
| Testing    | jest         |
|            | supertest    |
| Tools      | Docker       |
|            | Postman      |
| DBMS       | MongoDB      |

## Repository General Structure

The following is the directory structure of our project:

| Directory/File                |
| ----------------------------- |
| the-galactic-eatery/          |
| ├── Dockerfile                |
| ├── Makefile                  |
| ├── README.md                 |
| [├── back_end/](/back_end/)   |
| │ ├── API_DOC.md              |
| │ ├── connection.js           |
| │ ├── galactic_menu.js        |
| │ ├── index.js                |
| │ ├── models/                 |
| │ │ └── User.js               |
| │ ├── package-lock.json       |
| │ ├── package.json            |
| │ ├── test/                   |
| │ │ └── backend.test.js       |
| │ └── users.json              |
| [├── front_end/](/front_end/) |
| │ ├── assets/                 |
| │ │ ├── css/                  |
| │ │ ├── images/               |
| │ │ └── webfonts/             |
| │ ├── bootstrap/              |
| │ ├── index.html              |
| │ ├── index.js                |
| │ └── index_original.html     |
| └── init.d-mongod             |

## Getting Started

To get started with the Galactic Eatery Backend, follow these steps:

1. Clone this repository to your local machine.
2. Follow the steps in the Makefile to execute the Dockerfile and create your enviroment.
3. Go to the backend folder and install the required dependencies by running `npm install`.
4. Start your mongo service : `service mongod start`.
5. Start the server by running `node index.js`.
6. Create and populate your data base with `node galactic_menu.js`.
7. You're all set! The server should now be running on `http://localhost:5000`.

## Usage

### API Endpoint Filters.

To test every route using the GET method in your terminal, you can use the curl command to display the information.

- ALL Dishes = `curl http://127.0.0.1:5000/dishes/`

- Name = `curl http://127.0.0.1:5000/dishes/name?name=quasar-9`

- Price = `curl http://127.0.0.1:5000/dishes/price?minPrice=20&maxPrice=30`

- Planet of Origin = `curl http://127.0.0.1:5000/dishes/black%20hole`

When you execute this command, it will send a GET request to the specified URL and it will display the response from the server in your terminal in JSON format. You can test it as well in your web browser using the http protocol.

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
```

## Authors

- [Alton Andrews](https://github.com/AAndrews-1982)
- [Josh Davis](https://github.com/JD037)
- [Carlos Alarcon](https://github.com/carlalap)
