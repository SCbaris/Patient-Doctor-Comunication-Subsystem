const router = require("express").Router();
const userController = require("../../controllers/userController");
const auth = require("../../middleware/auth")

router.route("/") //api/users
    .post(userController.createUser) // POST /api/users

router.route("/:id") //api/users/:id    
    .post(auth, userController.getUserFromCaseId) //this part help us to getting user information from associated case.



module.exports = router;