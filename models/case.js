const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const caseSchema = new Schema({
    doa:{ type: String, required: true }, // Date of Appointment (From Sign in)
    title:{ type: String}, // This title will shown Case boxes and Case pages.
    doctorHideComment: { type: String}, // This comment is hidden. Only doctor will see this. 
    doctorComment:{ type: String}, // This comment for everyone. Associated Doctor and patient will see this.
    doctorMsg:[{ // this is and Object of array. This array contain doctor messages.
        doctorMessage : {type: String}, // doctor messages is string
        seen: { type: Boolean, required: true, default :false}, // this properity is seen. If patient see this it will turn true
        created: { type: Date, default : () => new Date()}, // this is date. I use it for sorting.
        whoSend:{type: String, required: true, default :"doctor"},
    }],
    patientMsg:[{ // its similar for patient
        patientMessage : {type: String},
        seen: { type: Boolean, required: true, default :false},
        created: { type: Date, default : () => new Date()},
        whoSend:{type: String, required: true, default :"patient"},
    }],
    unApproved: { type: Boolean, required: true, default :false}, // untill doctor approve appointment it keep false. 
    reasonOfAppoitment: { type: String, required: true }, // Patient appointment request.
    medicine:{ type: String,}, // Doctor write these medicines.
    activity:{ type: String,default :"active"}, // Doctor can change this status. If status is active mean this case still ongoing.
    register_date: { type: Date, default : () => new Date()}
});

const Case = mongoose.model("Case", caseSchema);

module.exports = Case;