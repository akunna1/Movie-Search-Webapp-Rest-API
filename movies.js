// Importing the express router and Movie model
const router = require("express").Router(); // Creating a new router object for handling routes
const Movie = require("../models/movie"); // Importing the Movie model to interact with the database
const movies = require("../config/movies.json"); // Importing a JSON file containing movie data (for possible use in seeding)

// Defining a route handler for GET requests to /movies
router.get("/movies", async (req, res) => {
    try {
        // Extracting pagination and filtering parameters from the query string
        const page = parseInt(req.query.page) - 1 || 0; // Page number, starting from 0
        const limit = parseInt(req.query.limit) || 5; // Number of results per page, default to 5
        const search = req.query.search || ""; // Search term for filtering movie names
        let sort = req.query.sort || "rating"; // Sorting field, default to "rating"
        let genre = req.query.genre || "All"; // Genre filter, default to "All"

        // Defining available genre options
        const genreOptions = [
            "Action",
            "Romance",
            "Fantasy",
            "Drama",
            "Crime",
            "Adventure",
            "Thriller",
            "Sci-fi",
            "Music",
            "Family",
        ];

        // Setting the genre filter based on the provided query or all available genres
        genre === "All"
            ? (genre = [...genreOptions]) // If "All" is selected, use all genres
            : (genre = req.query.genre.split(",")); // Otherwise, use the specified genres

        // Handle sorting parameters: handle multiple sorting fields if provided
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        // Defining the sort order for the query
        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1]; // Sorting by the specified field and order (asc/desc)
        } else {
            sortBy[sort[0]] = "asc"; // Default to ascending order if only one field is specified
        }

        // Query the database to find movies matching the criteria
        const movies = await Movie.find({ name: { $regex: search, $options: "i" } }) // Filter movies by name using regex for case-insensitive search
            .where("genre") // Filter by genre
            .in([...genre]) // Match any of the specified genres
            .sort(sortBy) // Apply sorting
            .skip(page * limit) // Skip results for pagination
            .limit(limit); // Limit the number of results per page

        // Calculate the total number of movies that match the search criteria
        const total = await Movie.countDocuments({
            genre: { $in: [...genre] }, // Count documents matching any of the specified genres
            name: { $regex: search, $options: "i" }, // Count documents with names matching the search term
        });

        // Prepare the response object
        const response = {
            error: false,
            total, // Total count of movies
            page: page + 1, // Current page number (1-based index)
            limit, // Number of results per page
            genres: genreOptions, // Available genre options
            movies, // List of movies for the current page
        };

        // Send the response with a status of 200 (OK)
        res.status(200).json(response);
    } catch (err) {
        // Log errors and send a 500 Internal Server Error response
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Uncomment this block to insert movies into the database
// const insertMovies = async () => {
//     try {
//         const docs = await Movie.insertMany(movies); // Insert multiple movie documents from the JSON file
//         return Promise.resolve(docs); // Resolve the promise with inserted documents
//     } catch (err) {
//         return Promise.reject(err); // Reject the promise if an error occurs
//     }
// };

// insertMovies()
//     .then((docs) => console.log(docs)) // Log the inserted documents if successful
//     .catch((err) => console.log(err)); // Log the error if insertion fails

// Export the router to be used in other parts of the application
module.exports = router;
