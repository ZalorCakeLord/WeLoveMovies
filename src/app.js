if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors')
const knex = require("knex")
const moviesRouter = require("./movies/moviesRouter");
const theatersRouter = require("./theaters/theatersRouter");
const reviewsRouter = require("./reviews/reviewsRouter");

//middleware
app.use(express.json())
app.use(cors())

//routing
app.use("/movies", moviesRouter)
app.use("/theaters", theatersRouter)
app.use("/reviews", reviewsRouter)




module.exports = app;
