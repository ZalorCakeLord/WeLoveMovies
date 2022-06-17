const knex = require("../db/connection");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const mapProperties = require("../utils/map-properties");


const addCriticProperty = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

function checkIfMovieExists(query){
    //checks if a movie exists in the database, using knex
    let babylon = knex("movies").where({movie_id:query}).first()
    if(babylon){
        next()
    }
    next({
        status: 404,
        message: "Movie cannot be found.",
      });
    
}



function getMovies(query){ //get all movies boys
    console.log("Getting All Movies")
    if(query){
        return knex("movies as m")
            .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
            .distinct("mt.movie_id")
            .select("m.*")
            .where({ is_showing: true })
            .then((data) => {return data})
            .catch((err) => {return(err)})
    }
    return knex("movies").select("*").then((data) => {return data})
}



function getMovie(query){
    //gets a single movie from database based on id, using knex
    return knex("movies").where({movie_id:query}).first().then((data) => {return data})
}

function getReviewsForMovie(query){
    //gets all reviews for a movie from database, using knex
    return knex("reviews as r")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .select(
          "*"
        )
      .where("r.movie_id", query)
      .then(array => array.map(addCriticProperty));
}

function getTheatersForMovie(query){
    //gets all theaters for a movie from database, using knex
    return knex("movies_theaters as mt")
    .join("theaters", "mt.theater_id", "theaters.theater_id")
    .select(
        "*"
    )
    .where("mt.movie_id", query);
}



module.exports = {
    getMovies,
    getMovie,
    getReviewsForMovie,
    getTheatersForMovie,
    checkIfMovieExists
}