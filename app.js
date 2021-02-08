//jshint esversion:6

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");
const { v4: uuidv4 } = require('uuid');
const https = require("https");
const momo = require("mtn-momo");

const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://lphilemon:mongodb@2021@cluster0.gsqos.mongodb.net/TransactionDB", { useNewUrlParser: true, useUnifiedTopology: true});


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

const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//TODO

app.get("/", (req, res) => {
  console.log({ callbackRequestBody: req.body });
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req,res) => {
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

