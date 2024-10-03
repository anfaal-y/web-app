const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Simple Express App!');
});

// About route
app.get('/about', (req, res) => {
    res.send('This is a simple Express application.');
});
app.get('/about', (req, res) => {
    res.send('PLAN SET. INSHAALLAH THEERCHAYAYUM NEE REKSHAPEDUM');
});

// API route to echo back the request body
app.post('/echo', (req, res) => {
    res.json(req.body);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

