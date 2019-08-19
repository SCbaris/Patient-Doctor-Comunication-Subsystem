const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true ,unique: true},
    email: { type: String, required: true ,unique: true},
    password: { type: String, required: true },
    gender: { type: String, required: true },
    case: [{
        type: Schema.Types.ObjectId,
        ref: "Case"}],
    register_date: { type: Date, default : () => new Date()},
    spec:{ type: String, required: true,default:"patient" },
});


const User = mongoose.model("User", userSchema);



module.exports = User;