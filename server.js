
const express = require("express");
const app = express();

app.use(express.json());

const tutors = [
  { id: 1, name: "Alex", subject: "Java" },
  { id: 2, name: "Jordan", subject: "Mathematics" },
  { id: 3, name: "Taylor", subject: "Science" }
];

app.get("/", (req, res) => {
  res.send("StudySync API is running!");
});

app.get("/api/tutors", (req, res) => {
  const subject = req.query.subject;

  const results = subject
    ? tutors.filter(t =>
        t.subject.toLowerCase().includes(subject.toLowerCase())
      )
    : tutors;

  res.json(results);
});

app.listen(3000, () => {
  console.log("StudySync running at http://localhost:3000");
});
