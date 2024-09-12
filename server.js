const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

// Connect to database
require('./config/database');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error('Database connection error:', error));
db.once('open', () => console.log('Connected to database'));

// Use CORS middleware
app.use(cors({
  origin: 'https://youtuber-plum.vercel.app', // Adjust this to your frontend URL or a list of allowed URLs
}));

app.use(logger('dev'));
app.use(express.json());

// Serve static files from the React app
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Define API routes
const usersRouter = require('./routes/api/users');
const favoritesRouter = require('./routes/api/favorites');

app.use('/api/users', usersRouter);
app.use('/api/favorites', favoritesRouter);

// 'Catch all' route for React app
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configure to use port from environment variable or default to 3001
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Express app running on port ${port}`);
});
