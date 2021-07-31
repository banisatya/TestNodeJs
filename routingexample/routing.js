var express = require('express');
var app = express();
var things = require('./things.js');

//using the route file
app.use('/things', things);
app.listen(3000, function () {
    console.log('the server starts at port 3000');
});