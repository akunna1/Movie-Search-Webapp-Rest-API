#### Project Structure:
- models/movie.js: Defines a Mongoose schema and model for the "movie" collection, outlining the structure of movie documents in the MongoDB database
- routes/movies.js: Manages routes for handling movie-related API requests, including querying, filtering, sorting, and paginating movie data from the MongoDB database
- config/movies.json
- .env:
- dbConnect.js: Handles the logic for establishing and managing the connection to the MongoDB database using Mongoose
- server.js: Initializes the Express application, sets up middleware, connects to the MongoDB database, and listens for incoming requests on a specified port, routing them to the appropriate handler
