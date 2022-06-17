const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const services = require('./reviews.services');


async function reviewExists(req,res,next) {
    const review = await services.getReviewById(req.params.reviewId);
    if(!review||review.length===0||review===undefined) {
        return res.status(404).json({status: 404,error:"Review cannot be found."});
        
    }
    else{
        res.locals.review = review;
        next();
        
    }
}


async function updoot(req, res, next) {
    console.log("body",req.body)
    if(req.body.data===undefined){
       return res.status(404).json({status: 400,error:"No body found."});
       
    }
    const updated = {
        ...res.locals.review.score,
        ...req.body.data
    }
    const review = await services.updateReview(updated,res.locals.review.review_id);
    console.log("review",review)
    res.json({ data: review });


}
    

async function delet(req, res, next) {
    await services.deleteReview(req.params.reviewId);
    res.sendStatus(204);
}







module.exports = {
    update: [asyncErrorBoundary(reviewExists), updoot],
    remove: [asyncErrorBoundary(reviewExists), delet]

}