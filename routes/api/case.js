const router = require("express").Router();
const caseController = require("../../controllers/caseController");
const auth = require("../../middleware/auth")


router.route("/") // api/case/
    .post(caseController.createCaseToUser)

router.route("/seen/:id") // api/case/seen/:id
                          // this part change all seen value of messages to true.
    .post(auth, caseController.changeSeen)

router.route("/delete/:id") // api/case/delete/:id
    .get(auth, caseController.deleteCaseFromUser)
    
router.route("/user/:id")// api/case/user/:id
                    // this part help us to get case from user id. 
    .get(auth, caseController.findCaseByIdFromUser) // findCaseByIdFromUser is our controller function
                                                    // Code need to auth because cases is private.
                                                    // Only approved users and doctors can see the cases.

router.route("/:id")// api/case/:id
                    // this part help us to get case from case id. 
    .get(auth, caseController.findCaseByIdFromCase) // findCaseByIdFromCase is our controller function
                                                    // Code need to auth because cases is private.
                                                    // Only approved users and doctors can see the cases.

router.route("/doctor/message/:id") // api/case/delete/:id
    .post(auth, caseController.addDoctorMsg)

router.route("/patient/message/:id") // api/case/delete/:id
    .post(auth, caseController.addPatientMsg)

router.route("/doctor/comment/:id") // api/case/delete/:id
    .post(auth, caseController.addDoctorComment)

router.route("/doctor/activity/:id") // api/case/delete/:id
    .post(auth, caseController.changeCaseActivity)




module.exports = router;