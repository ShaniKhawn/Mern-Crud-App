const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shani386",
  database: "mysql-crud-app",
});

db.connect((err) => {
  if (err) {
    console.log("Unable to connect to the database:", err);
  } else {
    console.log("Connected to MySQL database!");
  }
});

module.exports = db;