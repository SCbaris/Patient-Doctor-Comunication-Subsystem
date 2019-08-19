const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true ,unique: true},
  password: { type: String, required: true },
  title: { type: String, required: true },
  case: [{
      type: Schema.Types.ObjectId,
      ref: "Case"}],
  register_date: { type: Date, default : () => new Date()},
  spec:{ type: String, required: true,default:"doctor" },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;