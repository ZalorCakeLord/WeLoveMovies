if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors')
const knex = require("knex")
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

//middleware
app.use(express.json())
app.use(cors())

//routing
app.use("/movies", moviesRouter)




module.exports = app;
