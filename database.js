const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(
    path.join(__dirname, "studysync.db")
);

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('student', 'tutor'))
    );
`);

console.log("StudySync database is ready!");

module.exports = db;