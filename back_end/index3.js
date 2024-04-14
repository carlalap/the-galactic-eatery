// import express framework
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation
const fs = require('fs'); // Import filesystem module
const cors = require('cors'); // cors middleware
const path = require('path'); // Import the path module

// Middleware for handling CORS POLICY
// Enable CORS for all requests
app.use(cors());
app.use(express.json());

// get connection.js module
const mongoDB = require("./connection");

// configuring API to work wiht JSON format
app.use(express.static(path.join(__dirname, '..', 'front_end')));


// Helper function to execute MongoDB query
async function executeMongoQuery(filter, response) {
    try {
        const connect = await mongoDB.connectDB();
        const controller = connect.db().collection("dishes");
        const rows = await controller.find(filter).toArray();
        response.json(rows);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

// Define the search path in the backend that matches the frontend path
app.get('/search', (req, res) => {
    const { type, term } = req.query;
    const priceOption = req.query.priceOption;

    if (type === 'planet') {
        searchByPlanet(term, res);
    } else if (type === 'price' && priceOption) {
        let minPrice, maxPrice;

        if (priceOption === '100') {
            minPrice = 10;
            maxPrice = 21;
        } else if (priceOption === '200') {
            minPrice = 22;
            maxPrice = 31;
        } else if (priceOption === '300') {
            minPrice = 32;
            maxPrice = 41;
        } else {
            return res.status(400).send('Invalid price option');
        }

        searchByPrice(minPrice, maxPrice, res);
    } else {
        res.status(400).send('Invalid search type or parameters');
    }
});


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

// Endpoint to filter dishes by NAME
app.get("/dishes/name", async (request, response) => {
    const { name } = request.query;

    if (!name) {
        return response.status(400).send("Name parameter is required");
    }

    const filter = { name: { $regex: new RegExp(name, 'i') } };
    console.log("name:", name);
    console.log("filter:", filter);

    executeMongoQuery(filter, response);
});

// Function to filter dishes by PRICE
function searchByPrice(minPrice, maxPrice, response) {
    if (!minPrice || !maxPrice) {
        return response.status(400).send("minPrice and maxPrice parameters are required");
    }

    const filter = {
        price: {
            $gte: parseFloat(minPrice),
            $lte: parseFloat(maxPrice)
        }
    };

    console.log("price:", minPrice, maxPrice);
    console.log("filter:", filter);

    executeMongoQuery(filter, response);
}

// Endpoint to filter dishes by PLANET OF ORIGIN
function searchByPlanet(planet_of_origin, response) {
    const filter = { planet_of_origin: { $regex: new RegExp(planet_of_origin, 'i') } };
    console.log("planet_of_origin:", planet_of_origin);
    console.log("filter:", filter);

    executeMongoQuery(filter, response);
}


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
