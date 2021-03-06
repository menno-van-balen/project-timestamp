// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// no input from client on api/timestamp
app.get("/api/timestamp", (req, res) => {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Get input from client - Route parameters (:date_string)
app.get("/api/timestamp/:date_string", (req, res) => {
  // route prarameters, unix uses numbers as input, utc a string
  const params = req.params.date_string;
  const unixDate = new Date(+params);
  const utcDate = new Date(params);

  // if unix date has a valid value
  if (unixDate.getTime()) {
    res.json({
      unix: unixDate.getTime(),
      utc: unixDate.toUTCString(),
    });
    // if utc date has a valid value
  } else if (utcDate.toUTCString() !== "Invalid Date") {
    res.json({
      unix: utcDate.getTime(),
      utc: utcDate.toUTCString(),
    });
    // else error
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests
// in dev:
// const port = 5000;
// var listener = app.listen(port, function () {
//   console.log("Your app is listening on port " + listener.address().port);
// });
// deployed:
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
