const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();

// imports
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/error-handler');

// connect the mongodb database
connectDB();

// setting standard port for the server (either environment variable setting or 5000)
const port = process.env.PORT || 5000;

// initializing the express server to app variable
const app = express();

// adding in middleware to enable json status responses instead of standard html
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api/users', require('./routes/user-routes'));
app.use('/api/quests', require('./routes/quest-routes'));

// custom error handling
app.use(errorHandler);

// starting the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
