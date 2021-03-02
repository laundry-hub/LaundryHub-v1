//jshint esversion:6
//declarations
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");
const { v4: uuidv4 } = require("uuid");
const https = require("https");
const momo = require("mtn-momo");
const cors = require("cors");
const mongoose = require("mongoose");

//Create an instance of Postmates that you can
//use to interact with their endpoints:
var Postmates = require("postmates");
const { response } = require("express");
var postmates = new Postmates(
  process.env.CUSTOMER_ID,
  process.env.SANDBOX_API_KEY
);


//create app
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//GLOBAL VARIABLES for postmate
let QUOTEID = 0;
let DELIVERYID = 0;
//let deliveryId = [];
let PICKUP_ADDRESS = 0;
let DROPOFFADDRESS = 0;

//Temporary arrays to store data
let deliveries = [];
var deliveriesCreated = [];
var deliveriesFees = [];
var deliveriesdropoffdeadline = [];
var deliveriesIds = [];
var deliveriesStatuses = [];

//app root 
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signUp.html");
});

//create quote to determine trip charges and redirect to create delivery page.
app.post("/quote", (req, response) => {
  var pickupAddress = req.body.fName; //All this is possible because of body-parser which gets data from the body of html element "form"
  var dropoffAddress = req.body.lName;
  console.log(pickupAddress);
  console.log(dropoffAddress);
  pickupAddress = "20 McAllister St, San Francisco, CA";
  dropoffAddress = "101 Market St, San Francisco, CA";
  PICKUP_ADDRESS = pickupAddress;
  DROPOFFADDRESS = dropoffAddress;

  //Get a quote:
  var delivery = {
    pickup_address: pickupAddress,
    dropoff_address: dropoffAddress,
  };

  // let pickUpAddress = delivery.pickup_address;
  // let dropOffAddress = delivery.dropoff_address;

  postmates.quote(delivery, function (err, res) {
    QUOTEID = res.body.id;
    const FEE = res.body.fee;
    console.log(delivery.pickup_address);
    response.render("quoteCreateDelivery", {
      fee: FEE,
      pickUpAddress: delivery.pickup_address,
      dropOffAddress: delivery.dropoff_address,
    });
    console.log(res.body.fee); // 799
    if (err) {
      console.log(res);
    }
  });
});

mongoose.connect("mongodb+srv://lphilemon:mongodb@2021@cluster0.gsqos.mongodb.net/TransactionDB", { useNewUrlParser: true, useUnifiedTopology: true});


app.post("/createDelivery", (req, respo) => {
  //  Create a delivery:
  var delivery = {
    manifest: "Laundry",
    pickup_name: "The Warehouse", //req.body.pickUpName;
    pickup_address: "20 McAllister St, San Francisco, CA",
    pickup_phone_number: "8888157726", ////req.body.pickUpPhoneNumber
    pickup_business_name: "Optional Pickup Business Name, Inc.", //req.body.pickupBusinessName
    dropoff_name: "Alice", ////req.body.dropOffName
    dropoff_address: "101 Market St, San Francisco, CA",
    dropoff_phone_number: "14159782700", //req.body.dropoffPhoneNumber
    dropoff_business_name: "Optional Dropoff Business Name, Inc.", //req.body.dropOffBusinessName
    dropoff_notes: "Optional note to ring the bell",
    quote_id: QUOTEID,
  };

  //create delivery
  postmates.new(delivery, function (err, res) {
    if (err) {
      console.log(err);
    }
    DELIVERYID = res.body.id;
    console.log(res.body.statusCode);

    var created = res.body.created;
    var dropoffdeadline = res.body.dropoff_deadline;
    var fees = res.body.fee;
    var statuses = res.body.status;
    var ids = DELIVERYID;

    deliveriesCreated.push(created);
    deliveriesdropoffdeadline.push(dropoffdeadline);
    deliveriesFees.push(fees);
    deliveriesStatuses.push(statuses);
    deliveriesIds.push(ids);
    console.log(deliveriesIds);

    // const deliverySchema = new mongoose.Schema({
    //   deliveriesCreated: String,
    //   deliveriesdropoffdeadline: String,
    //   deliveriesFees: Number,
    //   deliveriesStatuses: String,
    //   deliveriesIds: String,
    // });
  
    // const Delivery = mongoose.model("Delivery", deliverySchema);
  
    // const delivery = new Delivery({
    //   deliveriesCreated: res.body.created,
    //   deliveriesdropoffdeadline: res.body.dropoff_deadline,
    //   deliveriesFees: res.body.fee,
    //   deliveriesStatuses: res.body.status,
    //   deliveriesIds: DELIVERYID,
    // });
    // delivery.save();

    if(res.body.fee > 0){
      respo.redirect("/dashboard");
    }
  });
});

app.get("/dashboard", (req, response) => {
  //res.sendFile(__dirname + "/signUp.html");
  response.render("dashboard", {
    DeliveriesCreated: deliveriesCreated,
    Deliveriesdropoffdeadline: deliveriesdropoffdeadline,
    DeliveriesFees: deliveriesFees,
    DeliveriesStatuses: deliveriesStatuses,
    DeliveriesIds: deliveriesIds,
  });

  //Get delivery details:
  postmates.get(DELIVERYID, function (err, res) {
    if (err) {
      console.log(err);
    }
    //response.render("dashboard", {status: res.body.status});
    console.log(res.body.status); // "pickup"

    //store some responses in multi-dimensional array
  });
});

const { Collections } = momo.create({
  callbackHost: process.env.CALLBACK_HOST,
  environment: "sandbox"
});

const collections = Collections({
  userSecret: process.env.COLLECTIONS_USER_SECRET,
  userId: process.env.COLLECTIONS_USER_ID,
  //userId: uuidv4(),
  primaryKey: process.env.COLLECTIONS_PRIMARY_KEY
});

//TODO

app.get("/pay", (req, res) => {
  res.sendFile(__dirname + "/pay.html");
});

app.post("/pay", (req,res) => {
  let phoneNo = req.body.phoneNumber; //All this is possible because of body-parser which gets data from the body of html element "form"
  const amountX = req.body.amount;

  console.log(phoneNo,amountX);
  //

  // Request to pay
  collections
    .requestToPay({
    amount: amountX,
    currency: "EUR",
    externalId: "123056",
    payer: {
        partyIdType: "MSISDN",
        partyId: phoneNo
    },
    payerMessage: "testing",
    payeeNote: "hello"
})
.then(transactionId => {

  console.log({ transactionId });

  // Get transaction status
  return collections.getTransaction(transactionId);
})
.then(transaction => {

  if(transaction.status === "SUCCESSFUL"){
    res.render("list", {amountPaid: amountX , contact: phoneNo});
  }
  //then res.redirect to root on click

  const transactionSchema = new mongoose.Schema({
    financialTransactionId: Number,
    externalId: Number,
    amount: Number,
    currency: String,
    partyIdType: String,
    partyId: Number
  });

  const Transaction = mongoose.model("Transaction", transactionSchema);

  const transactions = new Transaction({
    financialTransactionId: transaction.financialTransactionId,
    externalId: transaction.externalId,
    amount: transaction.amount,
    currency: transaction.currency,
    partyIdType: transaction.payer.partyIdType,
    partyId: transaction.payer.partyId
  });
  transactions.save();
  console.log(transaction );

  // Get account balance
  return collections.getBalance();
})
.then(accountBalance => console.log({ accountBalance }))
.catch(error => {
  console.log(error);
});

});

app.get("/balance", (_req, res, next) =>
  collections
    .getBalance()
    .then(account => res.json(account))
    .catch(next)
);

app.use(express.static("public"));

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on a port or 3000");
});
