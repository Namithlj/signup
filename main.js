// main.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dfaPasswordValidator = require('./node');
const Password = require('./schema');

const app = express();
app.use(express.json());

// Serve static files (index.html, JS, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://namithnamith370:<Namith>@project-db.ic1yc.mongodb.net/?retryWrites=true&w=majority&appName=project-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,  // Remove poolSize, use maxPoolSize instead
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 5000
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error("MongoDB connection error:", err.message);
});

// Password validation endpoint
// Password validation endpoint
// Password validation endpoint
app.post('/validate', async (req, res) => {
    const { password } = req.body;

    // Check if password is provided
    if (!password) {
        return res.status(400).send("Password is required");
    }

    // Validate password with DFA password validator
    const result = dfaPasswordValidator(password);
    if (!result.isValid) {
        return res.status(400).send({ state: result.state, reason: result.reason });
    }

    try {
        // Save the password to the database
        const savedPassword = new Password({ password });
        await savedPassword.save();
        res.status(201).send({ message: "Password is valid and saved" });
    } catch (error) {
        // Catch any database errors
        console.error("Error saving password:", error.message);
        res.status(500).send("Server error, unable to save the password");
    }
});


// Serve index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
