var express = require("express");
var app = express();

app.get("/testing", function (req, res) {
  //Create an error and pass it to the next function
  console.log("returning an error");
  var err = new Error("there is an error");
  next(err);
});

/*
 * other route handlers and middleware here
 * ....
 */

//An error handling middleware
app.use(function (err, req, res, next) {
  res.status(500);
  console.log("the error is ");
  res.send(err);
});

app.listen(8081, function () {
  console.log("the server is listening at port 8081!");
});
