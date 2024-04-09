// import express framework
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation
const fs = require('fs'); // Import filesystem module


// get connection.js module
const mongoDB = require("./connection");

// configuring API to work wiht JSON format
app.use(express.json());

// Register a new user
app.post("/register", async (request, response) => {
    const { username, password } = request.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Read users from JSON file
        const usersData = JSON.parse(fs.readFileSync('users.json', 'utf8'));
        const users = usersData.users;

        // Check if the username already exists
        if (users.find(user => user.username === username)) {
            return response.status(400).send("Username already exists");
        }

        // Save the user to the JSON file
        users.push({ username, password: hashedPassword });
        fs.writeFileSync('users.json', JSON.stringify({ users }));

        response.status(201).send("User registered successfully");
    } catch (error) {
        response.status(500).send("Error registering user");
    }
});

// Login route
app.post("/login", async (request, response) => {
    const { username, password } = request.body;

    try {
        // Read users from JSON file
        const usersData = JSON.parse(fs.readFileSync('users.json', 'utf8'));
        const users = usersData.users;

        // Find the user in the JSON file
        const user = users.find(user => user.username === username);

        // If user not found or password is incorrect
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return response.status(401).send("Invalid username or password");
        }

        // Create a JWT token
        const token = jwt.sign({ username: user.username }, "your_secret_key");

        // Send the token as response
        response.status(200).json({ token });
    } catch (error) {
        response.status(500).send("Error logging in");
    }
});

// Protected route
app.get("/protected", verifyToken, (request, response) => {
    // Return data only if the token is verified
    response.status(200).send("Protected data");
});

// Middleware to verify JWT token
function verifyToken(request, response, next) {
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.status(401).send("Unauthorized access");
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, "your_secret_key");
        request.user = decoded;
        next();
    } catch (error) {
        return response.status(401).send("Invalid token");
    }
}

// GET method
app.get("/dishes", (request, response) => {
    // getting list of name of dish
    mongoDB.connectDB()
    .then((connect) => {
        const controller = connect.db().collection("dishes");
        // it will find all element and convert them in an array
        controller.find().toArray()
            .then((rows) => response.send(rows))
            .catch((error) => response.send(error));
    })
})

// POST method
app.post("/dishes/create", (request, response) => {
    // getting list of name of dish
    mongoDB.connectDB()
    .then((connect) => {
        const controller = connect.db().collection("dishes");
        controller.insertOne(request.body)
        .then(() => response.send("New dish created")) 
        .catch((error) => response.send(error)); 
    })
});

// Listening for requests on port 5000
app.listen(5000, () => {
    console.log('now listening for request on port 5000\n');
  });
