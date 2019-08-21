const express = require("express");
const mongoose = require("mongoose");
const config= require("config");
const nodemailer=require("nodemailer");


mongoose.Promise = global.Promise
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;


/*const db = config.get("mongoURI");*/
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/hospital" ,{ 
  useNewUrlParser: true,
  useCreateIndex: true});
/*mongoose.connect(db ,{ 
  useNewUrlParser: true,
  useCreateIndex: true});*/

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
