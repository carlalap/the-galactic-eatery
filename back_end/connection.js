/* Script use to Connect to mongoDB Atlas database
* exec:  npm start from the package.json file
*/
const {MongoClient} = require("mongodb")
const client = new MongoClient("mongodb://127.0.0.1:27017/galactic_menu");

// create a function to connect db and return the object of that connection
const connectDB = () => {
    return client.connect()
    .then((dbClient) => {return dbClient})
    .catch((error) => {return error})
}

// Export module to another
module.exports = {connectDB}