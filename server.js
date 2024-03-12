const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog.js');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;
const app = express();

// Import custom middleware, "cLog"
app.use(clog);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api', api);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define specific routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Catch-all route for serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});