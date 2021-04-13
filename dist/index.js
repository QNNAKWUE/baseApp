"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config({
  path: "./config/config.env"
});

var app = (0, _express["default"])();
app.get('/', function (req, res) {
  return res.status(200).json({
    message: 'Welcome to my TaskList API'
  });
});
var port = process.env.PORT || 6010;
app.listen(port, function () {
  return console.log('Listening on port 6010');
});