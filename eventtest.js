var express = require("express");
var events = require("events");
var app = express();

//Initiate the event class
var eventEmitter = new events.EventEmitter();

//Declare the event
eventEmitter.on("Event1", () => {
  console.log("Inside event handling");
});

//Fire the event

app.get("/", function (req, res) {
  console.log("about to fire the event");
  eventEmitter.emit("Event1");
  res.send("handling events");
  
});

app.listen(3000, () => {
  console.log("listening to port 3000");
});
