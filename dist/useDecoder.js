"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDecoder = void 0;

var _react = _interopRequireDefault(require("react"));

var _WorkerInterface = _interopRequireDefault(require("./WorkerInterface"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DecoderState = {
  Pending: "pending",
  Worker: "worker",
  Fallback: "fallback",
  MainThread: "main-thread",
  Failed: "failed"
};
var DecoderDefault = {
  decode: function decode() {
    return Promise.resolve(null);
  }
};

var useDecoder = function useDecoder(_ref) {
  var askTimeout = _ref.askTimeout,
      onLoad = _ref.onLoad;

  var jsQR = _react["default"].useRef(null);

  var _React$useState = _react["default"].useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      exceptions = _React$useState2[0],
      setExceptions = _React$useState2[1];

  var _React$useState3 = _react["default"].useState(DecoderState.Pending),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      state = _React$useState4[0],
      setState = _React$useState4[1];

  var worker = _react["default"].useMemo(function () {
    if (typeof Worker !== "undefined") {
      return new _WorkerInterface["default"]();
    } else {
      console.warn("Failed to start a Web Worker");
      return null;
    }
  }, [exceptions]);

  var decoder = _react["default"].useMemo(function () {
    switch (state) {
      case DecoderState.Worker:
        return {
          decode: function () {
            var _decode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(imageData) {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;
                      _context.next = 3;
                      return worker.requestDecoding(imageData);

                    case 3:
                      return _context.abrupt("return", _context.sent);

                    case 6:
                      _context.prev = 6;
                      _context.t0 = _context["catch"](0);
                      setExceptions(function (e) {
                        return e + 1;
                      });
                      return _context.abrupt("return", null);

                    case 10:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, null, [[0, 6]]);
            }));

            function decode(_x) {
              return _decode.apply(this, arguments);
            }

            return decode;
          }()
        };

      case DecoderState.MainThread:
        return {
          decode: function decode(imageData) {
            try {
              var data = imageData.data,
                  width = imageData.width,
                  height = imageData.height;
              var result = jsQR.current(data, width, height);
              return Promise.resolve(result);
            } catch (err) {
              console.warn(err);
              setExceptions(function (e) {
                return e + 1;
              });
              return Promise.resolve(null);
            }
          }
        };

      default:
        return DecoderDefault;
    }
  }, [state, worker, jsQR.current]);

  var onInit = _react["default"].useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var loadableJsQR;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return worker.ack(askTimeout);

          case 3:
            setState(DecoderState.Worker);
            typeof onLoad == "function" && onLoad(DecoderState.Worker);
            _context2.next = 24;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.warn("Qr decoding worker does not respond. Trying to setup decoding in the main thread...");
            setState(DecoderState.Fallback);
            _context2.prev = 11;
            _context2.next = 14;
            return Promise.resolve().then(function () {
              return _interopRequireWildcard(require("jsqr"));
            });

          case 14:
            loadableJsQR = _context2.sent;
            jsQR.current = loadableJsQR["default"];
            setState(DecoderState.MainThread);
            typeof onLoad == "function" && onLoad(DecoderState.MainThread);
            _context2.next = 24;
            break;

          case 20:
            _context2.prev = 20;
            _context2.t1 = _context2["catch"](11);
            console.error("Failed to load script.", _context2.t1);
            setState(DecoderState.Failed);

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7], [11, 20]]);
  })), [worker]);

  _react["default"].useEffect(function () {
    onInit();
    return function () {
      if (worker !== null) {
        worker.onDestroy();
        setState(DecoderState.Pending);
      }
    };
  }, [worker]);

  return decoder;
};

exports.useDecoder = useDecoder;