"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _urlRoute = _interopRequireDefault(require("./urlRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var route = (0, _express["default"])();
route.use("/url", _urlRoute["default"]);
var _default = route;
exports["default"] = _default;