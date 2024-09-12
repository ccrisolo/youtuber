const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors')
require("dotenv").config();

//connect to database
require("./config/database");

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

const favoritesRouter = require('./routes/api/favorites')

app.listen(3000, () => console.log('server started'))

app.use(cors({ // Use cors middleware
  origin: '*', // Adjust this to your frontend URL or a list of allowed URLs
}));


app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));


// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/favorites', favoritesRouter);

//'catch all' route below
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  // Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});