var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var app = express();
var fs = require("fs");
var cors = require("cors");
app.use(cors());
app.use(express.json());
var sql = require("mssql");
const { response } = require("express");

const secret = process.env.JWT_SECRET;

var config = {
  user: "bani",
  password: "bani123",
  server: "localhost",
  database: "AdventureWorks2017",
};
var request = new sql.Request();

// app.post("/api/account/login", function (req, res) {
//   console.log("external call hits the api");
//   uname = req.body.uname;
//   response = {
//     uname: req.body.uname,
//     success: false,
//   };
//   if (uname == "bani") response.success = true;

//   console.log(response);
//   res.end(JSON.stringify(response));
// });

//User APIs
/*
app.get('/api/user/getUser', function(req, res){
    response = {
        uname:req.query.uname,
        isvalid:false
     };
    if(req.query.uname=='bani'){
        response.isvalid=true;
    }
     console.log(response);
     res.end(JSON.stringify(response));
})
*/

app.post("/authenticate/login", function (req, res) {
  const { email, password } = req.body;

  const token = jwt.sign(
    {
      email,
      password,
    },
    "fdfdavadfrerafsdfsdfe",
    { algorithm: "HS256", expiresIn: "1h" } //additional parameter
  );

  //this is to set a browser cookie
  const dummyToken = "fdfdf23fdfdferewgfhgjh23";
  res.cookie("token", token, {
    httpOnly: true,
  });

  res.send(token);
});

app.get("/testing", function (req, res) {
  console.log("node practice2!");

  //create a salt of 10
  var password = "bani123";
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  var myPromise = bcrypt.compare(password, hash, (error, res) => {
    if (error) {
      console.log("error is ", error);
    } else console.log("the vlue is ", res);
  });

  hash = bcrypt.compareSync(password, salt);

  console.log("the salt is ", salt);
  console.log("the hash value is ", hash);
  console.log("date is ", new Date().getTime());
  //console.log("are they equal ?", isSame);

  var name = { fname: "bani", lname: "das" };
  res.send(JSON.stringify(name));
});

app.get("/test", function (req, res) {
  var name = { fname: "bani", lname: "das" };
  res.send(JSON.stringify(name));
});

app.post("/api/account/login", function (req, res) {
  var uname = req.body.uname;
  var pwd = req.body.password;
  sql.connect(config, function (err) {
    var request = new sql.Request();
    // query to the database and get the records
    var resp = { success: false };
    request.query(
      "select * from [Practice].[User] where UserName='" +
        uname +
        "' and pasword='" +
        pwd +
        "'",
      function (err, recordset) {
        if (err) console.log(err);
        // send records as a response
        else if (recordset.recordsets.length > 0) {
          resp.success = true;
          console.log("user found");
        } else {
          //alert("No user found!");
          // res.send(recordset);
          console.log("no user found");
        }
        res.end(JSON.stringify(resp));
      }
    );
  });
});

app.post("/api/user", function (req, res) {
  var uname = req.body.username;
  var password = req.body.password;
  var fName = req.body.firstname;
  var lName = req.body.lastname;
  var phone = req.body.phone;
  var city = req.body.city;
  var resp = { success: false };
  sql.connect(config, function (err) {
    var request = new sql.Request();
    // query to the database and get the records
    var insertQuery =
      "insert into [Practice].[User] (username, [pasword], firstname, lastname, phone, city) values" +
      "('" +
      uname +
      "','" +
      password +
      "', '" +
      fName +
      "', '" +
      lName +
      "', '" +
      phone +
      "', '" +
      city +
      "')";
    request.query(insertQuery, function (err, recordset) {
      if (err) {
        resp.success = false;
        console.log(err);
      } else {
        console.log("saved successfully!");
        resp.success = true;
      }
      // send records as a response
      //res.send(recordset);
      res.end(JSON.stringify(resp));
    });
  });
});

app.get("/api/user/list", function (req, res) {
  // connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query("select * from [Practice].[User]", function (err, recordset) {
      if (err) console.log(err);

      // send records as a response
      //res.send(JSON.stringify(recordset));
      res.send(recordset);
    });
  });
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
