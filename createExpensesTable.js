const express = require('express');
const https = require('https');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 443; // Assuming default HTTPS port

// Load SSL certificate and key
const options = {
    key: fs.readFileSync('/home/reuben/Documents/expense-tracker-2/path/to/privatekey.pem'),
    cert: fs.readFileSync('/home/reuben/Documents/expense-tracker-2/path/to/certificate.pem')
};


// Create SQLite database connection
const db = new sqlite3.Database('expenses.db');

// Create expenses table if not exists
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY,
        description TEXT,
        amount REAL,
        category TEXT,
        date TEXT DEFAULT (datetime('now','localtime'))
    )`);
});

// Route to add expense to database
app.post('/addExpense', express.json(), (req, res) => {
    const { description, amount, category } = req.body;

    if (!description || !amount || !category) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    db.run('INSERT INTO expenses (description, amount, category) VALUES (?, ?, ?)', [description, amount, category], function(err) {
        if (err) {
            console.error('Error adding expense to database:', err);
            return res.status(500).json({ error: 'Failed to add expense to database' });
        }

        console.log('Expense added to database with ID:', this.lastID);
        res.json({ message: 'Expense added successfully' });
    });
});

// Create HTTPS server
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});
