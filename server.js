// To load environment variables from a .env file into process.env
require('dotenv').config();
// To handle routes and middleware (i.e they process requests before they reach route handlers), and parse/analyze JSON bodies
const express = require('express');
// Importing dbConnect.js
const dbConnect = require('./dbConnect');
// Importing movies.js from routes folder
const movieRoutes = require('./routes/movies');
// A middleware for Express used to specify which domains can access the API
const cors = require('cors');
// To create an Express application
const app = express();


// Calling dbConnect.js
dbConnect();

//  To parse incoming JSON requests and make the data available on req.body
app.use(express.json());

// To enables server to handle cross-origin requests, i.e requests coming from different domains or origins
app.use(cors());

//  To set up movieRoutes (i.e a router) to handle all requests that start with /api.
app.use('/api', movieRoutes);

//  If process.env.PORT is not defined, the server will listen on port 8080
const port = process.env.PORT||8080;

// () is the the second argument
app.listen(port, () => console.log(`Listening on port ${port}...`));
