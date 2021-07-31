var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({
    extended: true
  }));
//var bodyParser = require("body-parser");
// var multer = require("multer");
// var upload = multer();
// var session = require("express-session");
// var cookieParser = require("cookie-parser");
// var http = require("http");

app.set("view engine", "pug");
app.set("views", "./views");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ entended: true }));


app.get("/", function (req, res) {
  res.render("formtest1");
});

app.post("/submit", function (req, res) {
  var uname = req.body.uname;
  var password = req.body.password;
  res.render("formtest2", { uname: uname, password: password });
});

app.listen(3000, function (req, res) {
  console.log("Server is listening to port 3000!");
});
