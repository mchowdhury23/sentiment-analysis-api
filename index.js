const express = require('express');
const Sentiment = require('sentiment');
const rateLimit = require('express-rate-limit');  // Import rate-limiting package

const app = express();
const sentiment = new Sentiment();
const cors = require('cors');

app.use(cors()); // This will enable CORS for all routes and all origins
const corsOptions = {
  origin: 'https://mchowdhury23.github.io/sentiment-analysis-api/', // Replace this with your GitHub Pages URL
};
app.use(cors(corsOptions));

// Rate Limiting: Allows 100 requests per 15-minute window per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 minutes
  message: 'Too many requests from this IP, please try again after 15 minutes.'
});

// Apply rate limiter to all requests
app.use(limiter);

// Define root route
app.get('/', (req, res) => {
  res.send('Welcome to the Sentiment Analysis API! Use /sentiment?text=your_text to analyze sentiment.');
});

// Sentiment analysis route
app.get('/sentiment', (req, res) => {
  const inputText = req.query.text;
  if (!inputText) {
    return res.status(400).json({ error: 'Text query parameter is required.' });
  }
  const result = sentiment.analyze(inputText);
  res.json({ sentiment: result });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sentiment analysis API listening at http://localhost:${port}`);
});
