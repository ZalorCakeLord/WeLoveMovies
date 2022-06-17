const utilities = require("./movies.utilities")

async function fetchMovie(req, res, next){
    let movie = await utilities.getMovie(req.params.movieId)
    console.log({movie})
    const data = {
        id:movie.movie_id,
        title:movie.title,
        runtime_in_minutes:movie.runtime_in_minutes,
        rating:movie.rating,
        description:movie.description,
        image_url:movie.image_url
    }
    res.locals.movie=data
    return next()
}

async function read(req, res) {
    res.json({ data: res.locals.movie });
  }

async function list(req, res, next){
    let {is_showing=false} = req.query
    let movies = await utilities.getMovies(Boolean(is_showing))
    res.json({ data: movies });

}

async function readReviewsByMovieId(req, res, next){
    let movie = await utilities.getReviewsForMovie(req.params.movie_id)
    
    res.json({movie})
}




module.exports = {
    list,
    fetchMovie,
    read
}