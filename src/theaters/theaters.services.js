const knex = require("../db/connection");

//Language: javascript


function getTheaters(query){
    //gets all theaters from database, using knex
    let theaters = knex("theaters").select("*")
    return theaters
}