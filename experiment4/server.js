const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data and serve static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public', 'contact.html')));

// POST Route for Contact Form validation
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).send(`
            <body style="background:#0a0a1a; color:#fff; font-family:sans-serif; text-align:center; padding:50px;">
                <h2 style="color:#ff4d4d;">Transmission Failed</h2>
                <p>All fields are required to breach the atmosphere.</p>
                <a href="/contact" style="color:#00e6e6;">Return to Contact</a>
            </body>
        `);
    }

    res.send(`
        <body style="background:#0a0a1a; color:#fff; font-family:sans-serif; text-align:center; padding:50px;">
            <h2 style="color:#00e6e6;">Transmission Successful!</h2>
            <p>Message from ${name} received in the void.</p>
            <a href="/" style="color:#00e6e6;">Return to Base</a>
        </body>
    `);
});

// 404 Catch-all Route
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Antigravity Server floating on http://localhost:${PORT}`);
});

