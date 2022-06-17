//Language: javascript

const knex = require("../db/connection");

// Path: Projects\Project-_WeLoveMovies-_Qualified-Robert_Chavana-Solution\src\theaters\theaters.router.js


async function list(req,res){
    let theaters = await services.getTheaters(); 

    res.json({data:theaters});
}




module.exports = {
  list
}