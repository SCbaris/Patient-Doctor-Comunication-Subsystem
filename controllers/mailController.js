//const config= require("config");
const nodemailer=require("nodemailer");
require('dotenv').config()


module.exports = {

    sendMail: function(req, res) {
        var message = req.body.message;
        var email = req.body.email;
        var spec = req.body.spec;
        var messageToMailToPatient = "Your doctor send a new message to you.\n Log in UCFHospital page to reply it.\n Your doctor message is : \n ";
        var messageToMailToDoctor = "Your patient send a new message to you.\n Log in UCFHospital page to reply it.\n Your patient message is : \n ";
        var messageToSend;
        messageToMailToPatient=messageToMailToPatient+message + " \n Don't reply this mail. \n Thank you. Have healty days.";
        messageToMailToDoctor=messageToMailToDoctor+message + " \n Don't reply this mail. \n Thank you. Have healty days.";
        if(spec=="doctor") messageToSend=messageToMailToPatient
        else if(spec=="patient") messageToSend=messageToMailToDoctor

        let transporter=nodemailer.createTransport({
        service: "gmail",
        auth : {
            user: process.env.emailUser,
            pass: process.env.emailPass,
        }
        });

        let mailOption = {
            from : "ucfhospital@gmail.com",
            to : email,
            subject: "New Message From Hospital",
            text: messageToSend
        };

        transporter.sendMail(mailOption, function(err, data){
            if (err) console.log(err)
            else res.json({msg:"Email sended"})
        })

    },



};