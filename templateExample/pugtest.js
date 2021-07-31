var express = require("express");
var app = express();

//Loading static images
app.use(express.static("images"));

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/first_template", function (req, res) {
  res.render("first_view");
});

app.get("/imagetest", function (req, res) {
  res.render("image_test");
});

app.listen(3000, function (req, res) {
  console.log("listening to port 3000");
});
