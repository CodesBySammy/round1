const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Predefined correct sentence for the quiz
const correctSentence = "sky water triangle diamond";

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static('public'));

// Endpoint to check the final sentence
app.post('/check-sentence', (req, res) => {
    const userSentence = req.body.sentence.trim().toLowerCase();
    
    if (userSentence === correctSentence) {
        res.json({ correct: true, place: 'SMV' });
    } else {
        res.json({ correct: false });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
