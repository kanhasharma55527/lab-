const express = require("express");
const app = express();

const PORT = 3000;


app.use(express.json());


let users = [];
let idCounter = 1;


app.use((req, res, next) => {
    const currentTime = new Date().toLocaleString();
    console.log(`Request received at: ${currentTime}`);
    console.log(`${req.method} ${req.url}`);
    next();
});


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server Running",
        time: new Date().toLocaleString()
    });
});


app.get("/users", (req, res) => {
    res.status(200).json({
        message: "Users fetched successfully",
        data: users,
        time: new Date().toLocaleString()
    });
});


app.post("/users", (req, res) => {
    const { name, email } = req.body;

    // Validation
    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required",
            time: new Date().toLocaleString()
        });
    }

    
    const exists = users.find(user => user.email === email);
    if (exists) {
        return res.status(400).json({
            message: "Email already exists",
            time: new Date().toLocaleString()
        });
    }

    const newUser = {
        id: idCounter++,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json({
        message: "User added successfully",
        data: newUser,
        time: new Date().toLocaleString()
    });
});

app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required",
            time: new Date().toLocaleString()
        });
    }

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found",
            time: new Date().toLocaleString()
        });
    }

    const emailExists = users.find(u => u.email === email && u.id !== id);
    if (emailExists) {
        return res.status(400).json({
            message: "Email already exists",
            time: new Date().toLocaleString()
        });
    }

    user.name = name;
    user.email = email;

    res.status(200).json({
        message: "User updated successfully",
        data: user,
        time: new Date().toLocaleString()
    });
});

app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found",
            time: new Date().toLocaleString()
        });
    }

    users.splice(index, 1);

    res.status(200).json({
        message: "User deleted successfully",
        time: new Date().toLocaleString()
    });
});


app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found",
            time: new Date().toLocaleString()
        });
    }

    res.status(200).json({
        message: "User fetched successfully",
        data: user,
        time: new Date().toLocaleString()
    });
});


app.post("/login", (req, res) => {
    const { email, password } = req.body;

    
    if (!email || !password) {
        return res.status(400).json({
            message: "All fields required",
            time: new Date().toLocaleString()
        });
    }

    
    if (email === "admin@gmail.com" && password === "1234") {
        return res.status(200).json({
            message: "Login Success",
            time: new Date().toLocaleString()
        });
    } else {
        return res.status(401).json({
            message: "Invalid Credentials",
            time: new Date().toLocaleString()
        });
    }
});

// 404 Handler - Unknown Routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
        time: new Date().toLocaleString()
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
        time: new Date().toLocaleString()
    });
});

app.listen(PORT, () => {
    console.log(`\n✅ Server running on http://localhost:${PORT}`);
    console.log(`Test the API using the endpoints below:\n`);
    console.log(`GET  http://localhost:${PORT}/`);
    console.log(`GET  http://localhost:${PORT}/users`);
    console.log(`POST http://localhost:${PORT}/users (body: {name, email})`);
    console.log(`GET  http://localhost:${PORT}/users/:id`);
    console.log(`PUT  http://localhost:${PORT}/users/:id (body: {name, email})`);
    console.log(`DELETE http://localhost:${PORT}/users/:id`);
    console.log(`POST http://localhost:${PORT}/login (body: {email, password})\n`);
});