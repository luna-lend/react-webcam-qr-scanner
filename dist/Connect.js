"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _useDecoder = require("./useDecoder");

var _excluded = ["onDecode", "onScannerLoad"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultOptions = {
  workerAckTimeout: 3 * 1000
};

var connect = function connect(StreamComponent) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions,
      workerAckTimeout = _ref.workerAckTimeout;

  var ConnectedScanner = function ConnectedScanner(_ref2, ref) {
    var onDecode = _ref2.onDecode,
        onScannerLoad = _ref2.onScannerLoad,
        props = _objectWithoutProperties(_ref2, _excluded);

    var decoder = (0, _useDecoder.useDecoder)({
      workerAckTimeout: workerAckTimeout,
      onLoad: onScannerLoad
    });

    var handleDecode = _react["default"].useCallback(function (result) {
      if (result !== null && typeof onDecode == "function") {
        onDecode(result);
      }
    }, [onDecode]);

    var mounted = _react["default"].useRef(false);

    _react["default"].useEffect(function () {
      mounted.current = true;
      return function () {
        mounted.current = false;
      };
    }, []);

    var handleCapture = _react["default"].useCallback( /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(imageData) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return decoder.decode(imageData);

              case 2:
                result = _context.sent;

                if (Boolean(mounted.current)) {
                  handleDecode(result);
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }(), [decoder, handleDecode]);

    return /*#__PURE__*/_react["default"].createElement(StreamComponent, _extends({
      ref: ref,
      onCapture: handleCapture
    }, props));
  };

  return /*#__PURE__*/_react["default"].forwardRef(ConnectedScanner);
};

var _default = connect;
exports["default"] = _default;