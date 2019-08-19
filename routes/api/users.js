const router = require("express").Router();
const userController = require("../../controllers/userController");


router.route("/") //api/users
    .post(userController.createUser) // POST /api/users



module.exports = router;