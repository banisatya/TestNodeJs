//this is for routing example
var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.send("GET is called inside things route");
});

router.get("/test", function (req, res) {
  res.send("GET is called from /things/test");
});

//export this router to use in other files
module.exports = router;

