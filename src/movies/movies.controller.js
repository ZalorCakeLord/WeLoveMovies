const utilities = require("./movies.utilities")







async function fetchMovie(req, res, next){
    
    let movie = await utilities.getMovie(req.params.movieId)
    if(!movie){
        next({ status: 404, message: `Movie cannot be found.` });
    }else{
    let data = {
        "movie_id":movie.movie_id,
        "title":movie.title,
        "runtime_in_minutes":movie.runtime_in_minutes,
        "rating":movie.rating,
        "description":movie.description,
        "image_url":movie.image_url,
        "created_at":movie.created_at,
        "updated_at":movie.updated_at
    }
    res.json({data})
}
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
    let data = await utilities.getReviewsForMovie(req.params.movieId)
    if(data.length===0){
        next({ status: 404, message: `Movie cannot be found.` });
    }    
    res.json({data})
}

async function readTheatersByMovieId(req, res, next){
    let data = await utilities.getTheatersForMovie(req.params.movieId)
    if(data.length===0){
        next({ status: 404, message: `Movie cannot be found.` });
    }else{
    res.json({data})
    }
}




module.exports = {
    list,
    fetchMovie,
    read,
    readReviewsByMovieId,
    readTheatersByMovieId
}