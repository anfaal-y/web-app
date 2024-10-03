const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static('public'));

// Main route serving HTML directly
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
            <title>Simple Node.js Website</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                header {
                    background: #35424a;
                    color: white;
                    padding: 10px 0;
                    text-align: center;
                }
                main {
                    padding: 20px;
                    text-align: center;
                }
                footer {
                    background: #35424a;
                    color: white;
                    text-align: center;
                    padding: 10px 0;
                    position: fixed;
                    width: 100%;
                    bottom: 0;
                }
                button {
                    padding: 10px 15px;
                    background-color: #5cb85c;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #4cae4c;
                }
            </style>
        </head>
        <body>
            <header>
                <h1>Welcome to My Simple Node.js Website</h1>
            </header>
            <main>
                <p>THIS IS JUST FOR DEVOPS PRACTICE</p>
                <button onclick="alert('WISHING YOU GOOD FORTUNE')">Click Here!</button>
            </main>
            <footer>
                <p>&copy; 2024 My Simple Website</p>
            </footer>
        </body>
        </html>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

