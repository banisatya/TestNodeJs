var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");

//var upload = multer();
var app = express();
mongoose.connect("mongodb://localhost:27017/acme");

app.use(cors());
app.use(express.json());

app.set("view engine", "pug");
app.set("views", "./views");

// app.get("/person", function (req, res) {
//   res.render("person");
// });

//Find a person with name in the request
// e.g. /person/bani
app.get("/person/:name", function (req, res) {
  Person.find({ name: req.params.name }, function (err, response) {
    if (err) {
      console.log("Not found");
    } else {
      console.log("Found");
      res.json(response);
    }
  });
});

app.post("/person", function (req, res) {
  var personInfo = req.body; //Get the parsed information

  if (!personInfo.name || !personInfo.age || !personInfo.nationality) {
    res.render("show_message", {
      message: "Sorry, you provided wrong info",
      type: "error",
    });
  } else {
    var newPerson = new Person({
      name: personInfo.name,
      age: personInfo.age,
      nationality: personInfo.nationality,
    });
    newPerson.save(function (err, Person) {
      if (err) {
        console.log("there is some error during save");
        res.render("show_message", {
          message: "Database error",
          type: "error",
        });
      } else {
        res.render("show_message", {
          message: "New person added",
          type: "Success",
          person: personInfo,
        });
        console.log("Person saved successfully!");
      }
    });
  }
});

var personSchema = mongoose.Schema({
  name: String,
  age: Number,
  nationality: String,
});
var Person = mongoose.model("Person", personSchema);

app.listen(3000, function (req, res) {
  console.log("listening to 3000");
});
