// models/Users.js
const fs = require('fs');

// Function to read users from JSON file
function getUsers() {
    const usersData = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    return usersData.users;
}

module.exports = {
    getUsers
};
