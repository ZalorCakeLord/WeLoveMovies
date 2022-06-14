const utilities = require("./movies.utilities")





async function list(req, res, next){
    let data = await utilities.getMovies()
    console.log({data})
    res.json({data})
}




module.exports = {
    list
}