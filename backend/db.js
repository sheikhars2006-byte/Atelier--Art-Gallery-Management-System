// db.js - Database Connection File
const mysql = require('mysql2');

// Create connection to MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',           // Change this to your MySQL username
    password: 'Amanalisha1@',           // Change this to your MySQL password
    database: 'artgallery'
});

// Connect to database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('✅ Connected to MySQL Database: artgallery');
});

module.exports = connection;