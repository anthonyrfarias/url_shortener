"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _urlController = _interopRequireDefault(require("../controllers/urlController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var route = (0, _express["default"])();
route.get("/list", _urlController["default"].list);
route.post("/shorten", _urlController["default"].shorten_url);
var _default = route;
exports["default"] = _default;