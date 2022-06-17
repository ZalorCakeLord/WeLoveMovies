if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors')
const knex = require("knex")
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

//middleware
app.use(cors())
app.use(express.json())


//routing
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);




//error handling
app.use((req, res, next) => {
    next({
        status: 404,
        message: "That page doesn't exist."
    });
});





app.use((error, req, res, next) => {
    const { status = 500, message ="Something went wrong on our end!" } = error;
    res.status(status).json({ error : message });
})



module.exports = app;
