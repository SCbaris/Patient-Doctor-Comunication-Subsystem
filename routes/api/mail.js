const router = require("express").Router();
const mailController = require("../../controllers/mailController");


router.route("/") //api/mail
    .post(mailController.sendMail) 




module.exports = router;
