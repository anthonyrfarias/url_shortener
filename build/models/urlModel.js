"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var urlSchema = new _mongoose.Schema({
  url: {
    type: String,
    maxlength: 2048,
    required: true
  },
  title: {
    type: String,
    maxlength: 255
  },
  short_url: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true
  },
  seq: {
    type: Number,
    "default": 1
  },
  date: {
    type: Date,
    "default": Date.now
  }
});

var urlModel = _mongoose["default"].model("url", urlSchema);

var _default = urlModel;
exports["default"] = _default;