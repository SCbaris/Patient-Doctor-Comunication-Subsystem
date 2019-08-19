const router = require("express").Router();
const userController = require("../../controllers/userController");
const auth = require("../../middleware/auth")

router.route("/") 
    .post(userController.logInUser) // /api/auth post to login
router.route("/:id")   
    .get(auth, userController.findUserById) // /api/auth/:id get to one user data by id




module.exports = router;