const db = require("../models");
const Case = require("../models/case");
const bcrypt = require("bcryptjs")
const config= require("config");
const jwt = require("jsonwebtoken");


module.exports = {

    createCaseToUser: function(req,res) {
        var {id , doa , reasonOfAppoitment} = req.body;

        if(!id || !doa || !reasonOfAppoitment) {
            return res.status(400).json({msg : "Please Enter All Requried Fields",
                                        error :true});
        }

        const newCase= new Case({ 
            doa,
            reasonOfAppoitment,
        })

        db.Case
            .create(newCase)
            .then(dbCase => {
                //console.log("Created Case : ")
                //console.log(dbCase)
                return db.User.findOneAndUpdate({ _id: id }, { $push: { case: dbCase._id } })
                        .then(dbCase => {return res.json({error:false})})
                        .catch(function (err) {
                            console.log(err);
                            return res.status(400).json({msg :"Case Can not created",
                                                        error : true});
                        })
            })
    },
    
    findCaseByIdFromUser: function(req,res) {
        var casesForPass=[]
        db.User
            .find({ _id: req.params.id })
            .populate("case")
            .then(dbCase => {
                if(!dbCase[0].case){
                    console.log("There is no Case to show to this patient")
                }else {
                    casesForPass=dbCase
                    //console.log("Case by user id : ")
                    //console.log(dbCase[0].case)
                    res.json(casesForPass)
                }
                })
            .catch(() => {  // If the id belongs to doctor, it give err. 
                            // and this error mean this id can be doctors. 
                            // it gonna check doctor id.
                db.Doctor
                    .find({ _id: req.params.id })
                    .populate("case")
                    .then(dbCase => {
                        if(!dbCase[0].case){
                            console.log("There is no Case to show to this Doctor")
                        }else {
                            casesForPass=dbCase
                            //console.log("Case by Doctor id : ")
                            //console.log(dbCase[0].case)
                            res.json(casesForPass)
                        }
                        })
                        .catch(err => res.status(422).json(err)); 
                });
    },

    findCaseByIdFromCase : function(req,res) {
        db.Case
            .find({ _id: req.params.id })
            .then(dbCase => {
                res.json(dbCase)
            })
            .catch(err => res.status(422).json(err)); 
    },

    deleteCaseFromUser: function(req,res) {
        db.Case
            .findById({ _id: req.params.id })
            .then(function (dbCase) {
                console.log(" Case Deleted")
                //console.log(dbCase)
                dbCase.remove();
            })
            .catch(err => res.status(422).json(err));
    },

    getAllUnapprovedCases: function(req,res){
        db.Case
            .find({unApproved:false})
            .sort({ date: -1 })
            .then(dbCase => res.json(dbCase))
            .catch(err => res.status(422).json(err));
    },

    approveCase : function(req,res) {
        db.Case
            .findOneAndUpdate({ _id: req.params.id }, {unApproved:true})
            .then(dbCase => {
                //console.log("Approved Case : ")
                //console.log(dbCase)
                //console.log("Doctor ID : ")
                //console.log(req.body.doctorId)
                return db.Doctor.findOneAndUpdate({ _id: req.body.doctorId }, { $push: { case: dbCase._id } })
                        .then(function (dbDoctor) {
                            //console.log("Doctor with approved case : ")
                            //console.log(dbDoctor)
                            console.log('successfully push approved case to doctor')
                        }).catch(function (err) {
                            console.log(err);
                        });
            }).catch(function (err) {
                console.log(err);
            });
    },

    addDoctorMsg: function(req,res) {
        var doctorMes = req.body.doctorMessage;
        var caseId = req.params.id;

        //console.log("Doctor send a message : ")
        //console.log(doctorMes)

        //console.log("Doctor send a message to this id : ")
        //console.log(caseId)

        db.Case
        .findOneAndUpdate({ _id: caseId }, { $push: { doctorMsg: {doctorMessage:doctorMes} } })
            .then(dbCase => { 
                console.log("Doctor message Added")
                //console.log(dbCase)
                res.json(dbCase.doctorMsg)
            }).catch(function (err) {
                console.log(err);
            });

    },

    addPatientMsg: function(req,res) {
        var patientMes = req.body.patientMessage;
        var caseId = req.params.id;
        //var d = new Date();
        //console.log("Patient send a message : ")
        //console.log(patientMes)

        //console.log("Patient send a message to this id : ")
        //console.log(caseId)

        
        db.Case
            .findOneAndUpdate({ _id: caseId }, { $push: { patientMsg: {patientMessage:patientMes} } })
            .then(dbCase => { 
                console.log("Patient message Added")
                //console.log(dbCase)
                res.json(dbCase.patientMsg)
            }).catch(function (err) {
                console.log(err);
            });

    },

    addDoctorComment:function(req,res) {
        var {doctorHideComment , doctorComment , medicine, title} = req.body;
        var caseId = req.params.id;

        //console.log("Doctor add comments : ")
        //console.log(title)
        //console.log(doctorHideComment)
        //console.log(doctorComment)
        //console.log(medicine)

        //console.log("Doctor send comments to this id : ")
        //console.log(caseId)

        var newCase= new Case({ 
            title,
            doctorHideComment, 
            doctorComment,
            medicine
        })

        if(title) {
            newCase = {
                title : title
            }
        }

        if(medicine) {
            newCase = {
                medicine : medicine
            }
        }

        if(doctorComment) {
            newCase = {
                doctorComment : doctorComment
            }
        }

        if(doctorHideComment) {
            newCase = {
                doctorHideComment : doctorHideComment
            }
        }

        //console.log("New Case with comments : ")
        //console.log(newCase)

        db.Case
            .findOneAndUpdate({ _id: caseId }, newCase)
            .then(dbCase => { 
                console.log("Doctor Comments Added")
                //console.log(dbCase)
                res.json(dbCase)
            }).catch(function (err) {
                console.log(err);
            });

    },

    changeCaseActivity:function(req,res) {
        var {caseActivity} = req.body;
        var caseId = req.params.id;
        //console.log("!!in case controller!!")
        //console.log("Doctor change a case activity : ")
        //console.log(caseActivity)

        //console.log("Doctor change a case activity from this id : ")
        //console.log(caseId)

        db.Case
            .findOneAndUpdate({ _id: caseId }, {activity:caseActivity})
            .then(dbCase => { 
                console.log("Activity Changed")
                //console.log(dbCase)
                res.json(dbCase)
            }).catch(function (err) {
                console.log(err);
            });
    },

    changeSeen : function (req,res) {
        var {userId, spec} = req.body;
        var caseId = req.params.id;
        
        db.Case.findOne({ _id: caseId })
            .then(dbCase =>{
                if(!dbCase) return res.status(400). json({msg: "There is no case to search",
                                                        error : true})
                //console.log(dbCase)
                /*var newCase = new Case ({

                })*/

                var messages=[];
                if(spec==="patient"){
                    //console.log("Doctor Messages : ")
                    //console.log(messages)
                    //console.log("Doctor Message 0 index seen : ")
                    //console.log(messages[0].seen)
                    dbCase.doctorMsg.map(mes => {
                        if(mes.seen===false) mes.seen=true;
                    })
                    //console.log(messages)
                    dbCase
                        .save()
                        .then(cas=> res.json({msg:"Success"}))
                        .catch(function (err) {
                            console.log(err);
                        });


                }else if(spec==="doctor"){
                    console.log("Patient Messages :")
                    console.log(messages)
                    dbCase.patientMsg.map(mes => {
                        if(mes.seen===false) mes.seen=true;
                    })
                    dbCase
                        .save()
                        .then(cas=> res.json({msg:"Success"}))
                        .catch(function (err) {
                            console.log(err);
                        });
                }


            })
    }


};