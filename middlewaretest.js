var express = require("express");
const { DateTime } = require("mssql");
var app = express();

app.get("/:id", function (req, res) {
  res.send("The id you specified is " + req.params.id);
});

app.get("/:name/:id", function (req, res) {
  res.send("id: " + req.params.id + " and name: " + req.params.name);
});

//regex parameter exammple
//this will accept only 5 digit id
app.get("/:id[0-9]{5}", function (req, res) {
  res.send("the input id is " + req.params.id);
});

//middleware example1
app.use(function (req, res, next) {
  console.log("A new request received at " + Date.now());
  console.log("Start");
  next();
});

//middleware example 2
app.use("/things", function (req, res, next) {
  console.log("A request for things received at " + DateTime.now());
  next();
});

//middleware example 3
//what is the sequence of execution
app.use("/", function (req, res, next) {
  console.log("Middle");
  next();
});

app.use("/", function (req, res) {
  console.log("End");
  res.send("this is end");
});

app.listen(3000);
