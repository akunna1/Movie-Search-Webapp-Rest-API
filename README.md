# 🎬 Movie-Search-Webapp-REST-API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** for a movie search web application. Users can search for movies by **title**, **genre**, or **rating**, and sort/filter the results accordingly.

---

## Features

* Search movies by **title**, **genre**, or **rating**
* Sort movies by **rating**, **genre**, etc.
* Pagination support for large result sets
* MongoDB integration using **Mongoose**
* `.env` file support for secure configuration

---

## 🗂️ Project Structure

### `models/movie.js`

Defines the Mongoose schema and model for the **movie collection**, outlining the structure of each movie document in MongoDB.

### `routes/movies.js`

Handles movie-related API requests such as:

* Searching
* Filtering
* Sorting
* Pagination

### `config/movies.json`

Stores additional configuration details and/or mock data used for movie filtering logic.

### `.env`

Holds environment variables like database connection strings and server port.

### `dbConnect.js`

Manages the logic for connecting to the MongoDB database using Mongoose.

### `server.js`

Bootstraps the Express app:

* Loads environment variables
* Connects to MongoDB
* Registers middleware
* Mounts movie routes
* Starts the server on the specified port

---

## 🛠️ Installation & Setup

```bash
git clone https://github.com/your-username/Movie-Search-Webapp-Rest-API.git
cd Movie-Search-Webapp-Rest-API
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/moviedb
```

Then run the server:

```bash
node server.js
```

---

## Example Endpoints

* `GET /movies?title=Inception`
* `GET /movies?genre=Drama&sort=rating`
* `GET /movies?page=2&limit=10`

---

## Technologies

* Node.js
* Express
* MongoDB
* Mongoose
* dotenv
