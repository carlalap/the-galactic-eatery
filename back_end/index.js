// This file manage all API information to connect wiht the DB, logging and authentication

// import express framework
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation
const fs = require('fs'); // Import filesystem module
const cors = require('cors'); // cors middleware


// Enable CORS for all requests
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

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

// GET method to gather the information of ALL DISHES ++++++++++++++++++++++
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

// Endpoint to filter dishes by NAME   ++++++++++++++++++++++++++++++++++
app.get("/dishes/name", async (request, response) => {
    // getting filter parameters from query string
    const { name } = request.query;

    // Constructing the filter object based on provided parameters
    const filter ={ name: { $regex: new RegExp(name, 'i') } };

    if (!name) {
        return response.status(400).send("Name parameter is required");
    }
    console.log("name:", name); // Log the value of the 'name' parameter
    console.log("filter:", filter); // Log the value of the 'filter' object
    
    
    // Connecting to MongoDB and executing the query with the constructed filter
    mongoDB.connectDB()
    .then((connect) => {
        const controller = connect.db().collection("dishes");
        // it will find all element and convert them in an array
        controller.find(filter).toArray()
            .then((rows) => response.send(rows))
            .catch((error) => response.send(error));
    })
})

// Endpoint to filter dishes by PRICE +++++++++++++++++++++++++++++++++
app.get("/dishes/price", async (request, response) => {
    const { minPrice, maxPrice } = request.query;

    const filter = { 
        price: { 
            $gte: parseFloat(minPrice), 
            $lte: parseFloat(maxPrice) 
        } 
    };

    if (!minPrice || !maxPrice) {
        return response.status(400).send("minPrice and maxPrice parameters are required");
    }
    console.log("price:", minPrice, maxPrice ); // Log the value of the 'price' parameters
    console.log("filter:", filter); // Log the value of the 'filter' object

    // Connecting to MongoDB and executing the query with the constructed filter
    mongoDB.connectDB()
    .then((connect) => {
        const controller = connect.db().collection("dishes");
        // it will find all element and convert them in an array
        controller.find(filter).toArray()
            .then((rows) => response.send(rows))
            .catch((error) => response.send(error));
    })
});

// Endpoint to filter dishes by PLANET OF ORIGIN ++++++++++++++++++++++++++++++
app.get("/dishes/:planet_of_origin", async (request, response) => {
    const { planet_of_origin } = request.params; 

    if(!planet_of_origin) {
        return response.status(400).send("Planet of origin parameter is required");
    }

    console.log("planet_of_origin:", planet_of_origin); // Log the value of the 'planet_of_origin' parameter
    
    // Constructing the filter object based on provided parameters
    const filter ={ planet_of_origin: { $regex: new RegExp(planet_of_origin, 'i') } };

    console.log("filter:", filter); // Log the value of the 'filter' object
 
    // Connecting to MongoDB and executing the query with the constructed filter
    mongoDB.connectDB()
    .then((connect) => {
        const controller = connect.db().collection("dishes");
        // it will find all element and convert them in an array
        controller.find(filter).toArray()
        .then((rows) => {
            console.log("Retrieved data from database:", rows); // Log the retrieved data
            response.send(rows); // Send the retrieved data as the response
        })
        .catch((error) => {
            console.error("Error retrieving data from database:", error); // Log any error that occurs
            response.send(error); // Send the error as the response
        });
    })
});


// POST method, creates more dishes
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
    console.log('Now listening for request on port 5000\n');
  });
