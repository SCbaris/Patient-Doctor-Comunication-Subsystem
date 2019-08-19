const router = require("express").Router();
const usersRoutes = require("./users");
const authRoutes = require("./auth")
const caseRoutes = require("./case")
const doctorRoutes = require("./doctor")

router.use("/users", usersRoutes);// /api/users
                                  // This part for creating new user. 
                                  // New user has token and bycrypted password.
                                  // Even admins cannot see password.
                                  // New user gonna be directly patient. 
                                  // Doctors can be only from seeds. Admins will give this permition.
                                  // I use it only for Sign in process.

router.use("/auth", authRoutes);// /api/auth
                                // This part for log in a user.
                                // After login the page only can get name, mail and gender. 
                                // if u want more data for exp cases or messages,
                                // U have to pass the auth pass. And auth has a token. 
                                // This token must be the verified.
                                // After Auth u can reach every data.
                                // I use it for Log in process.
                                // I use it for Auth process.

router.use("/case", caseRoutes); // /api/case
                                 // This part for Create new case
                                 // See routes on user
                                 // Delete case.
                                 // Delete and See need auth path.

router.use("/doctor" , doctorRoutes);




module.exports = router;
