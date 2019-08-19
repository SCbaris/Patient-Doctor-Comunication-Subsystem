const router = require("express").Router();
const doctorController = require("../../controllers/doctorController");
const caseController = require("../../controllers/caseController");
const auth = require("../../middleware/auth")


router.route("/") //api/doctor
    .post(doctorController.createDoctor) // POST /api/doctor

router.route("/unapprovedcases") //api/doctor/unapprovedcases
    .get(auth, caseController.getAllUnapprovedCases)

router.route("/approve/:id") //api/doctor/approve/:id
    .post(auth, caseController.approveCase)


module.exports = router;