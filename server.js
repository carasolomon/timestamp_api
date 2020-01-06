// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// get time for empty date_string
app.get("/api/timestamp", (req, res) => {
  res.json({unix: Date.now(), utc: Date() });
});

// get time for date_string
app.get("/api/timestamp/:date_string?", (req, res) => {
  const dateString = req.params.date_string; // get date_string
  
  // test if unix date is valid with regex, respond with JSON date string
  if (/\d{5,}/.test(dateString)) {
    let dateNumber = parseInt(dateString);
    res.json({unix: dateString, utc: new Date(dateNumber).toUTCString()});
};
   // check if date is invalid - return error message or proper date
  let date = new Date(dateString);
  if (date.toString() === 'Invalid Date') {
    res.json({error: date.toString()});
  } else {
    res.json({unix: date.valueOf(), utc: new Date(date).toUTCString()});
  }
});

// listen for requests 
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});