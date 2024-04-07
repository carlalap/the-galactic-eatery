// import express framework
const express = require('express');
const app = express();


// get connection.js module
const mongoDB = require("./connection");

// configuring API to work wiht JSON format
app.use(express.json());

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

// Listening for requests on port 3000
app.listen(5000, () => {
    console.log('now listening for request on port 5000\n');
  });
