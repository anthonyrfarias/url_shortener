"use strict";

var _express = _interopRequireDefault(require("express"));

require("@babel/polyfill");

var _routes = _interopRequireDefault(require("./routes"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _path = _interopRequireDefault(require("path"));

var _urlController = _interopRequireDefault(require("./controllers/urlController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cors = require('cors');

var user = encodeURIComponent('admin');
var password = 'da39a3ee5';
var dbUrl = "mongodb://${user}:${password}@localhost:27017/bluecoding-app";
_mongoose["default"].Promise = global.Promise;

_mongoose["default"].connect(dbUrl, {
  useCreateIndex: true,
  useNewUrlParser: true
}).then(function (mongoose) {
  return console.log("");
})["catch"](function (err) {
  return console.log(err);
});

var app = (0, _express["default"])();
app.use(cors());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"]["static"](_path["default"].join(__dirname, "public")));
app.use("/api", _routes["default"]);
app.use(ignoreFavicon);
app.get("/", function (req, res, next) {
  res.send("Welcome to our api.");
});
app.get("/:short_url", _urlController["default"].find_url);
app.listen(3000, function () {
  console.log("App running...");
});

function ignoreFavicon(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({
      nope: true
    });
  } else {
    next();
  }
}