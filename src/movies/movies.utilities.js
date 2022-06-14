const knex = require("../db/connection")


function getMovies(){ //get all movies boys
    return knex("movies").select("*")
}


module.exports = {
    getMovies
}