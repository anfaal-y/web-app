const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Simple Express App!');
});

app.get('/', (req, res) => {
    res.send('INSHALLAH');
});

// About route
app.get('/about', (req, res) => {
    res.send('This is a simple Express application.');
});

// API route to echo back the request body
app.post('/echo', (req, res) => {
    res.json(req.body);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

