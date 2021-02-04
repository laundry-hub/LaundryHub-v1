//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
//const ejs = require("ejs");
const { v4: uuidv4 } = require('uuid');
const https = require("https");
const momo = require("mtn-momo");
const env = require('dotenv').config();
const cors = require("cors");
//const request = require("request");
//const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


//TODO

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    const phoneNo = req.body.phoneNumber; //All this is possible because of body-parser which gets data from the body of html element "form"
    var amountX = req.body.amount;

res.render("list", {amountPaid: amountX , contact: phoneNo});

 //   request.write(jsonData);
//     request.end();

    });

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});