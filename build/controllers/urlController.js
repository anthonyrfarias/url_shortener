"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _models = _interopRequireDefault(require("../models"));

var _isURL = _interopRequireDefault(require("validator/lib/isURL"));

var _request = _interopRequireDefault(require("request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  shorten_url: function () {
    var _shorten_url = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var url, resultSearchUrl, insertObject, resultCreateUrl;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              url = req.body.url;

              if (url == undefined) {
                res.status(200).json({
                  code: 0,
                  message: "Please, provide a valid url",
                  tag: "NO_URL"
                });
              }

              if (!(0, _isURL["default"])(url)) {
                res.status(200).json({
                  code: 0,
                  message: "Sorry, this is not a valid url",
                  tag: "INVALID_URL"
                });
              }

              _context.next = 6;
              return _models["default"].urlModel.find({
                url: url
              });

            case 6:
              resultSearchUrl = _context.sent;

              if (!(resultSearchUrl.length == 0)) {
                _context.next = 16;
                break;
              }

              insertObject = {
                url: url,
                short_url: Math.random().toString(36).substr(2, 7)
              };
              _context.next = 11;
              return _models["default"].urlModel.create(insertObject);

            case 11:
              resultCreateUrl = _context.sent;
              updateTitle(resultCreateUrl._id, url);
              res.status(200).json({
                code: 1,
                message: "Saved short url generated",
                tag: "SUCCESS",
                short_url: resultCreateUrl.short_url
              });
              _context.next = 17;
              break;

            case 16:
              res.status(200).json({
                code: 1,
                message: "Short url generated",
                tag: "SUCCESS",
                short_url: resultSearchUrl.short_url
              });

            case 17:
              _context.next = 23;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](0);
              res.status(500).send({
                code: "0",
                message: _context.t0
              });
              next(_context.t0);

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 19]]);
    }));

    function shorten_url(_x, _x2, _x3) {
      return _shorten_url.apply(this, arguments);
    }

    return shorten_url;
  }(),
  find_url: function () {
    var _find_url = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res, next) {
      var short_url, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log(req.headers);
              short_url = req.params.short_url;
              _context2.next = 4;
              return _models["default"].urlModel.findOneAndUpdate({
                short_url: short_url
              }, {
                $inc: {
                  seq: 1
                }
              });

            case 4:
              result = _context2.sent;

              if (!result) {
                res.status(404).json({
                  code: 0,
                  message: "You have provided an invalid short url",
                  tag: "INVALID_SHORT_URL"
                });
              } else {
                res.status(200).json({
                  code: 1,
                  message: "You'll be redirected to: " + result.url,
                  redirectTo: result.url,
                  tag: "REDIRECT_TO"
                });
              }

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function find_url(_x4, _x5, _x6) {
      return _find_url.apply(this, arguments);
    }

    return find_url;
  }(),
  list: function () {
    var _list = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res, next) {
      var resultSearchUrl;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _models["default"].urlModel.find({}, ["title", "url", "short_url", "seq"], {
                skip: 0,
                // Starting Row
                limit: 100,
                // Ending Row
                sort: {
                  seq: -1 //Sort by sequence Added DESC

                }
              });

            case 2:
              resultSearchUrl = _context3.sent;
              res.status(200).send({
                code: "1",
                urls: resultSearchUrl
              });

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function list(_x7, _x8, _x9) {
      return _list.apply(this, arguments);
    }

    return list;
  }()
};
exports["default"] = _default;

function updateTitle(id, url) {
  (0, _request["default"])(url, function (error, response, body) {
    var title = body.split('<title>')[1].split('</title>')[0];

    _models["default"].urlModel.findByIdAndUpdate({
      _id: id
    }, {
      title: title
    }, function (err, res) {});
  });
}