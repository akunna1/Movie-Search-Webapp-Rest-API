// The mongoose library is an ODM (Object Data Modeling) tool for MongoDB
const mongoose = require('mongoose');

// Function to handle the database connection logic
const dbConnect = () => {
    // Configuration parameters for connecting to MongoDB
    // useNewUrlParser: true ensures that Mongoose uses the new MongoDB connection string parser
    // useUnifiedTopology: true: ensures Mongoose uses the new connection management engine to avoid deprecation warnings and ensure a more stable connection
    const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true };

    // Establishing a connection to the MongoDB database using the URI from environment variables
    mongoose.connect(process.env.DB, connectionParams);

    // Event listener for a successful connection to MongoDB
    mongoose.connection.on('connected', () => {
        console.log('Connected to the database successfully');
    });

    // Event listener for any error that occurs during the connection
    mongoose.connection.on('error', (err) => {
        console.error('Error while connecting to the database:', err);
    });

    // Event listener for when the connection to MongoDB is disconnected
    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB connection disconnected');
    });
};

// Exporting the dbConnect function so it can be used in other modules
module.exports = dbConnect;
