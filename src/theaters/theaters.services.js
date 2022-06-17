const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

//Language: javascript


function getTheaters(query){
    //gets all theaters from database, using knex
    //attaches movies now_playing to theater
    return knex("theaters")
        .join("movies_theaters as mt", "theaters.theater_id", "mt.theater_id")
        .select(
            "*"
        )
        .where({ is_showing: true })
        .then((data) => {return data})
    
}




module.exports = {
    getTheaters
}