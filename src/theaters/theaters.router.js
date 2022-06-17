//Language: javascript
const router = require("express").Router()
const controller = require("./theaters.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")





router.get("/", controller.list).all(methodNotAllowed);



module.exports = router;