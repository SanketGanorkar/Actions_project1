const express = require("express");

// Creating an instance of express
const app = express();
const PORT = 8000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample user data stored in-memory (instead of fetching from an API)
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 25 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 28 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 30 },
];

// Root route
app.get("/", (req, res) => {
  console.log("Root endpoint hit");
  res.send({ message: "Success" });
});

// Get all users
app.get("/users", (req, res) => {
  res.json({
    data: users,
  });
});

// Get a single user by ID
app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // delibrately removed {} after ({data:user,})
  res.json(
    data: user,
  );
});

// Add a new user (POST request)
app.post("/users", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, email, and age",
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    age,
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User added successfully",
    data: newUser,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
