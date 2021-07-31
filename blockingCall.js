var express = require("express");
var fs = require("fs");
var app = express();
app.use(express.json());

var path = "routing.js";
//blocking call
// var content = fs.readFileSync(path);
// console.log('the content is ', content.toString());
// console.log('after reading file');

//non blocking call
fs.readFile(path, (err, data) => {
  console.log("this is from callback");
  console.log("the content is ", data.toString());
});
console.log("reading file in asynchronous fashion!");

app.listen(8081, function () {
  console.log("the server is listening at port 8080");
});
