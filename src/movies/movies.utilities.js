const knex = require("../db/connection")


function getMovies(query){ //get all movies boys
    console.log("Getting Movies")
    if(query){
        return knex("movies as m")
            .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
            .distinct("mt.movie_id")
            .select("m.*")
            .where({ is_showing: true });
    }
    let movies = knex("movies").select("*")
    console.log(movies)
    return movies
}



function getMovie(query){
    //gets a single movie from database based on id, using knex
    let data = knex("movies").where({movie_id:query}).first()
    return data
}

function getReviewsForMovie(query){
    //gets all reviews for a movie from database, using knex
    let reviews = knex("reviews as r").join("")
    return reviews
}



module.exports = {
    getMovies,
    getMovie
}