const db = require("../models");
const User = require("../models/user");
const Doctor = require("../models/doctor");
const bcrypt = require("bcryptjs")
const config= require("config");
const jwt = require("jsonwebtoken");

module.exports = {
    createUser: function(req,res) { // this part for Creating new user. New user gonna be directly patinent
      var {name , email, password ,gender , phone, dob} = req.body; // Taking all data from form.
      if(!name || !email || !password || !gender || !phone || !dob) { // Required parts check.
        return res.status(400).json({msg : "Please Enter All Requried Fields"});
      }

      email = email.toLowerCase(); // Email to Lowercase.

      db.User.findOne({ email }) // validation of the user. 
        .then(user => {
          if(user){ // if there is someone use same email, Code don't register.
            //console.log(req.body.email);
            //console.log(req.body);
            //console.log(user);
            return res.status(400).json({msg :"User Already Exists",
                                         error : true});}
        })
        const newUser= new User({ // Else there aren't any user with this email,
          name,
          dob,
          email,
          password,
          gender,
          phone,
        })  //Creating newUser with User contruction. This Construction came from models.
            //name, email, password, gendre and phone is already dedicate from req.body.
            // newUser is gonna be directly this user.

        bcrypt.genSalt(10 ,(err , salt)=>{
          bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            newUser.password=hash;
            newUser.save()
              .then(user=> {

                jwt.sign(  // this is the way of encrtipt a data. Creating token!
                  { id: user.id,
                  name: user.name,
                  email: user.email,
                  gender: user.gender,
                  phone: user.phone,
                  dob: user.dob,
                   // They are datas that we want to encrypt and bring back. 
                  },
                  config.get("jwtSecret"), // this is our secret. 
                                           // this project we use one jwtSecret. 
                                           // in the future every doctor has their special dogle.
                                           // Every doctor use their special secret to reach the cases.
                  { expiresIn : 1800}, 
                  (err, token)=> {
                    if(err) throw sessionStorage.clear();
                    //console.log("user token : ");
                    //console.log(token);
                    res.json({
                      error : false,
                      token: token, // req.body.token will give us this user's token. 
                                    // this token contains id, name, email, gender, phone
                                    // this token dont contain has and case because its just sign in process.
                                    // after user creating and apointment case created.
                      user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        spec: user.spec, // req.body.user.name will give us name
                                         // req.body.user.email will give us email
                                         // req.body.user.spec will give us spec (Patient or Doctor)
                                         // req.body.user.id will give us id
                      }
                    })
                  }
                )
              })
          })
        })   
    }, 

    logInUser: function(req, res) { // this part for Log in user. 
                                    // this part will help 
      const {email, password} = req.body;

      var userForPass= {
          id:"",
          name:"",
          email:"",
          spec:"",
          password:""
      };
      var isThereUser=false
      
      if(!email || !password) {
        return res.status(400).json({msg : "Please Enter All Requried Fields"});
      }

      if(isThereUser==false){
        db.User.findOne({ email })
          .then(user => {
            if(!user)  isThereUser=false;
            else {
              userForPass= user
              //console.log("User is patient : ");
              //console.log(user)
              //console.log("userForPass is : ")
              //console.log(userForPass)
              isThereUser=true;
              bcrypt.compare(password, userForPass.password) 
              .then(isMatch => {
                if(!isMatch) return res.status(400).json({msg: "invalid credentials patient"})
                jwt.sign(  
                  { id:userForPass.id,
                  name:userForPass.name,
                  email:userForPass.email  
                  },
                  config.get("jwtSecret"),
                  { expiresIn : 1800},
                  (err, token)=> {
                    if(err) throw sessionStorage.clear();
                    res.json({
                      token: token,
                      user: {
                        id: userForPass.id,
                        name: userForPass.name,
                        email: userForPass.email,
                        spec: userForPass.spec,
                      }
                    })
                  }
                )
            })
            }
          })
        }

        if(isThereUser==false){
          db.Doctor.findOne({ email })
            .then(doctor => {
              if(!doctor)  isThereUser=false;
              else {
                userForPass= doctor;
                //console.log("User is doctor : ");
                //console.log(doctor)
                //console.log("userForPass is : ")
                //console.log(userForPass)
                isThereUser=true;
              }
            }).then(() => {
                //console.log("Doctor Password is : ")
                //console.log(userForPass.password)
                //console.log("Client password put in : ")
                //console.log(password)
                bcrypt.compare(password, userForPass.password) 
                .then(isMatch => {
                  console.log("is martch ? : " + isMatch)
                  if(!isMatch) return res.status(400).json({msg: "invalid credentials doctor"})
                  jwt.sign(  
                    { id:userForPass.id,
                    name:userForPass.name,
                    email:userForPass.email  
                    },
                    config.get("jwtSecret"),
                    { expiresIn : 1800},
                    (err, token)=> {
                      if(err) throw sessionStorage.clear();
                      res.json({
                        token: token,
                        user: {
                          id: userForPass.id,
                          name: userForPass.name,
                          email: userForPass.email,
                          spec: userForPass.spec,
                        }
                      })
                    }
                  )
              })
            })
          }

        
    },
    
    findUserById: function(req, res) {
      db.User
        .findById(req.params.id)
        .select('-password')
        .then(user => {
          if(!user) {
            db.Doctor
            .findById(req.params.id)
            .select('-password')
            .then(doctor => {
              res.json(doctor)
            })
          } else res.json(user)
          
          })
        .catch(err => res.status(422).json(err));
    },

    getUserFromCaseId: function(req, res) {
      var spec = req.body.spec;
      //console.log(req.body)
      var caseId = req.params.id;
      //console.log("inside of getUserFromCaseId")
      //console.log("spec is : " + spec)
      //console.log("caseId is : " + caseId)
      if(spec==="doctor"){
        console.log("inside of doctor if")
        db.User.find()
          .then(users => {
            users.map(user=>{
              newUser=user.case.filter(cas=>{
                //console.log("your cas is : " +cas)
                //console.log("your case id is : " + caseId)
                //console.log(cas===caseId)
                //console.log(cas==caseId)
                if(cas==caseId) {
                  console.log("User found")
                  //console.log(user)
                  
                  res.json(user)};
                
              })
            })
            
          }).catch(err => res.status(422).json(err));
        }
      if(spec==="patient"){
        db.Doctor.find()        
        .then(users => {
          users.map(user=>{
            newUser=user.case.filter(cas=>{
              //console.log("your cas is : " +cas)
              //console.log("your case id is : " + caseId)
              //console.log(cas===caseId)
              //console.log(cas==caseId)
              if(cas==caseId) {
                console.log("User found")
                console.log(user)
                
                res.json(user)};
              
            })
          })
          
        }).catch(err => res.status(422).json(err));
      }



    },


  };