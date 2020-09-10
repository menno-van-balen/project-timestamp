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

// Get input from client - Route parameters (:date_string)
app.get("/api/timestamp", (req, res) => {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  const params = req.params.date_string;
  const error = /[a-z, A-Z]/g.test(params);
  const errorResponse = () => res.json({ error: "Invalid Date" });

  if (error) {
    errorResponse();
    // normal date input
  } else if (params.includes("-")) {
    const utcDate = new Date(params);
    if (utcDate.toString() === "Invalid Date") {
      errorResponse();
    } else {
      res.json({
        unix: utcDate.getTime(),
        utc: utcDate.toUTCString(),
      });
    }
  } else {
    // unix date input
    const unixDate = new Date(+params);
    if (unixDate.getTime() === null) {
      errorResponse();
    } else {
      res.json({
        unix: unixDate.getTime(),
        utc: unixDate.toUTCString(),
      });
    }
  }
});

// listen for requests :)
const port = 5000;
var listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
// var listener = app.listen(process.env.PORT, function () {
//   console.log("Your app is listening on port " + listener.address().port);
// });
