"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupScanner = exports["default"] = void 0;

var _Stream = _interopRequireDefault(require("./Stream"));

var _Connect = _interopRequireDefault(require("./Connect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var setupScanner = function setupScanner(options) {
  return (0, _Connect["default"])(_Stream["default"], _objectSpread({}, options));
};

exports.setupScanner = setupScanner;
var Scanner = (0, _Connect["default"])(_Stream["default"], {
  workerAckTimeout: 3 * 1000
});
var _default = Scanner;
exports["default"] = _default;