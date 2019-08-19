const db = require("../models");
const Doctor = require("../models/doctor");
const bcrypt = require("bcryptjs")
const config= require("config");
const jwt = require("jsonwebtoken");

module.exports = {
    createDoctor: function(req,res) { // this part for Creating new Doctor.
      var {name , email, password ,title} = req.body; // Taking all data from form.
      if(!name || !email || !password || !title) { // Required parts check.
        return res.status(400).json({msg : "Please Enter All Requried Fields"});
      }

      email = email.toLowerCase(); // Email to Lowercase.

      db.Doctor.findOne({ email }) // validation of the doctor. 
        .then(doctor => {
          if(doctor){ // if there is someone use same email, Code don't register.
            return res.status(400).json({msg :"Doctor Already Exists",
                                         error : true});}
        })
        const newDoctor= new Doctor({ // Else there aren't any Doctor with this email,
          name, 
          email,
          password,
          title
        })  //Creating newDoctor with Doctor contruction. This Construction came from models.
            //name, email, password, title are already dedicate from req.body.
            // newDoctor is gonna be directly this Doctor.
        //console.log(newDoctor); // Works!
        bcrypt.genSalt(10 ,(err , salt)=>{
          bcrypt.hash(newDoctor.password, salt, (err, hash)=>{
            if(err) throw err;
            newDoctor.password=hash;
            newDoctor.save()
              .then(doctor=> {

                jwt.sign(  // this is the way of encrtipt a data. Creating token!
                  { id: doctor.id,
                  name: doctor.name,
                  email: doctor.email,
                  title: doctor.title
                   // They are datas that we want to encrypt and bring back. 
                  },
                  config.get("jwtSecret"), // this is our secret. 
                                           // this project we use one jwtSecret. 
                                           // in the future every doctor has their special dogle.
                                           // Every doctor use their special secret to reach the cases.
                  { expiresIn : 1800}, 
                  (err, token)=> {
                    if(err) throw err;
                    //console.log("doctor's token : ");
                    //console.log(token);
                    res.json({
                      error : false,
                      token: token, // req.body.token will give us this doctor's token. 
                                    // this token contains id, name, email, title
                                    // this token dont contain has and case because its just sign in process.
                                    // after doctor creating and apointment case created.
                      doctor: {
                        id: doctor.id,
                        name: doctor.name,
                        email: doctor.email,
                        spec: doctor.spec, // req.body.doctor.name will give us name
                                         // req.body.doctor.email will give us email
                                         // req.body.doctor.spec will give us spec (Patient or Doctor)
                                         // req.body.doctor.id will give us id
                      }
                    })
                  }
                )
              })
          })
        })   
    }, 

    
    findDoctorById: function(req, res) {
      db.Doctor
        .findById(req.params.id)
        .select('-password')
        .then(doctor => {
          //console.log("doctor by id data : ")
          //console.log(doctor)
          res.json(doctor)
          })
        .catch(err => res.status(422).json(err));
    },


  };








  