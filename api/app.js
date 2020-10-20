const express = require("express");
const app = express();
let cors = require("cors");
const bodyParser = require('body-parser');
const session = require('express-session');

let getLines = require("./routes/getLines");
let logout = require("./routes/logout");
let endRegister = require("./routes/RegisterController");
let CheckLogin = require("./routes/CheckLoginController");
let CheckLoginData = require("./routes/CheckLoginDataController");
let isLogged = require("./routes/isLogged");
let getStations = require("./routes/getStations");
let getTrains = require("./routes/getTrainsWithTime");
let insertTicket = require("./routes/insertTicket");
let changeData = require("./routes/changeData");
let getTickets = require("./routes/getTickets");


app.use(session({
  secret: "An4id8w.asb4#sn%nbs>an3@sn6!s",
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  cookie: { secure: false },
  saveUninitialized: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin:true,
  methods:['GET','POST'],
  credentials: true // enable set cookie
}));


app.use("/api",CheckLogin);

app.use("/checkLoginData", CheckLoginData);

app.use("/endRegister", endRegister);

app.use("/isLogged", isLogged);

app.use("/logout", logout);

app.use("/getLines", getLines);

app.use("/getStations", getStations);

app.use("/getTrains", getTrains);

app.use("/insertTicket", insertTicket);

app.use("/changeData", changeData);

app.use("/getTickets", getTickets);

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

let port = process.env.PORT || 8000;
app.listen(port);

module.exports = app;