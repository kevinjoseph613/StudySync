const express = require("express");
const db = require("./database");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());
app.post("/api/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({
            error: "All fields are required."
        });
    }

    if (role !== "student" && role !== "tutor") {
        return res.status(400).json({
            error: "Role must be student or tutor."
        });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
            error: "Please enter a valid email address."
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            error: "Password must be at least 8 characters."
        });
    }

    try {
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = db.prepare(`
            INSERT INTO users (name, email, password, role)
            VALUES (?, ?, ?, ?)
        `).run(name.trim(), email.trim().toLowerCase(), hashedPassword, role);

        res.status(201).json({
            message: "Account created successfully.",
            userId: result.lastInsertRowid
        });

    } catch (error) {
      
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({
                error: "An account with this email already exists."
            });
        }

        console.error("Registration error:", error);

        res.status(500).json({
            error: "Unable to create account."
        });
    }
});
app.use(express.static(path.join(__dirname, "public")));


app.get("/api/tutors", (req, res) => {
    const subject = String(req.query.subject || "").trim();

    try {
        const tutors = db.prepare(`
            SELECT id, name, subject
            FROM tutors
            WHERE subject LIKE ?
            ORDER BY name
        `).all(`%${subject}%`);

        res.json(tutors);

    } catch (error) {
        console.error("Tutor search error:", error);

        res.status(500).json({
            error: "Unable to search tutors."
        });
    }
});

app.listen(3000, () => {
  console.log("StudySync running at http://localhost:3000");
});
