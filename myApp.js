var express = require("express");
var bodyParser = require("body-parser");
var app = express();

// //root-level request logger middleware

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

//chain middleware to create time server

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

// //Serve a string
// app.get("/", (req,res) => {
//   res.send("Hello Express")
// })

//Serve an HTML File
app.get("/", (req, res) => {
  res.sendfile(__dirname + "/views/index.html");
});

// Serve static assets
app.use(express.static(__dirname + "/public"));

// //Serve JSON on a specific route

// app.get("/json", (req,res) => {
//   res.json({message: "Hello json"})
// })

//make an enviromental variable in .env file
process.env.MESSAGE_STYLE = "uppercase";

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  }
  res.json({ message: "Hello json" });
});

//get route parameter input from the client
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

//Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//get query parameter input from the Client

app.get("/name", (req, res) => {
  res.json({
    name: req.query.first + " " + req.query.last
  });
});

//Get Data from POST Requests
app.post("/name", (req, res) => {
  res.json({
    name: req.body.first + " " + req.body.last
  });
});

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
