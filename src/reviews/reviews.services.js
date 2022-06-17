const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");


const addCriticProperty = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

async function getReviewById(reviewId) {
    const review = await knex("reviews")
        .select("*")
        .where("review_id", reviewId)
        .first();
    return review;
    }

    async function updateReview(updatedReview,id) {
        return knex("reviews")
        .select("*")
        .where({ review_id: id })
        .update(updatedReview)
        .then(()=>{
        return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("*")
        .where("review_id", id)
        .first()
        .then(addCriticProperty)
        .then((data) => {
            return {...data, critic_id:data.critic.critic_id}
        });

      })
    }

    async function deleteReview(reviewId) {
        const review = await knex("reviews")
            .where("review_id", reviewId)
            .del();
        return review;
    }

    module.exports = {
        getReviewById,
        updateReview,
        deleteReview,
        addCriticProperty
    }