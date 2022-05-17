"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _MediaStreamManager = _interopRequireDefault(require("./MediaStreamManager"));

var _excluded = ["constraints", "captureSize", "onCapture", "onPlay", "onPause", "onLoadedMetadata"],
    _excluded2 = ["constraints", "captureSize", "onCapture"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaults = {
  constraints: {
    audio: false,
    video: {
      facingMode: "environment"
    }
  },
  activeCaptureSize: {
    width: 1280,
    height: 720
  },
  size: {
    video: {
      width: 0,
      height: 0
    },
    capture: {
      dx: 0,
      dy: 0,
      width: 0,
      height: 0
    }
  }
};

var asyncRequestAnimationFrame = function asyncRequestAnimationFrame() {
  return new Promise(function (res) {
    return requestAnimationFrame(function (id) {
      return res(id);
    });
  });
};

var WebcamStream = /*#__PURE__*/_react["default"].forwardRef(function (_ref, ref) {
  var _ref$constraints = _ref.constraints,
      constraints = _ref$constraints === void 0 ? defaults.constraints : _ref$constraints,
      _ref$captureSize = _ref.captureSize,
      captureSize = _ref$captureSize === void 0 ? defaults.activeCaptureSize : _ref$captureSize,
      onCapture = _ref.onCapture,
      onPlay = _ref.onPlay,
      onPause = _ref.onPause,
      onLoadedMetadata = _ref.onLoadedMetadata,
      props = _objectWithoutProperties(_ref, _excluded);

  var $videoRef = _react["default"].useRef(null);

  _react["default"].useImperativeHandle(ref, function () {
    return $videoRef.current;
  });

  var _React$useState = _react["default"].useState(true),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visible = _React$useState2[0],
      setVisible = _React$useState2[1];

  var videoState = _react["default"].useRef("paused");

  var updateState = _react["default"].useCallback(function (nextState) {
    videoState.current = nextState;
  }, []);

  var mediaStreamContext = _react["default"].useMemo(function () {
    return _MediaStreamManager["default"].createStreamContext(constraints);
  }, [constraints, visible]);

  var startStream = _react["default"].useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var stream;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            updateState("loading");
            _context.next = 3;
            return mediaStreamContext.getStream();

          case 3:
            stream = _context.sent;

            if (!(stream !== null && $videoRef.current)) {
              _context.next = 14;
              break;
            }

            $videoRef.current.srcObject = stream;
            $videoRef.current.playsInline = true;
            $videoRef.current.muted = true;
            $videoRef.current.disablePictureInPicture = true;
            _context.next = 11;
            return $videoRef.current.play();

          case 11:
            updateState("playing");
            _context.next = 16;
            break;

          case 14:
            updateState("error");

            _MediaStreamManager["default"].stopStream(mediaStreamContext.id);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [mediaStreamContext]);

  var stopStream = _react["default"].useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            $videoRef.current.pause();

            _MediaStreamManager["default"].stopStream(mediaStreamContext.id);

            updateState("paused");

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })), [mediaStreamContext]);

  var _React$useState3 = _react["default"].useState(defaults.size),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      size = _React$useState4[0],
      setSize = _React$useState4[1];

  var graphics = _react["default"].useMemo(function () {
    var canvas = document.createElement("canvas");
    canvas.width = size.capture.width;
    canvas.height = size.capture.height;
    return canvas;
  }, [size]);

  var handleMetadataLoaded = _react["default"].useCallback(function (event) {
    var videoWidth = event.target.videoWidth;
    var videoHeight = event.target.videoHeight;
    var dx = videoWidth > captureSize.width ? (videoWidth - captureSize.width) / 2 : 0;
    var dy = videoHeight > captureSize.height ? (videoHeight - captureSize.height) / 2 : 0;
    var captureWidth = Math.min(captureSize.width, videoWidth);
    var captureHeight = Math.min(captureSize.height, videoHeight);
    setSize({
      video: {
        width: videoWidth,
        height: videoHeight
      },
      capture: {
        dx: dx,
        dy: dy,
        width: captureWidth,
        height: captureHeight
      }
    });
    typeof onLoadedMetadata == 'function' && onLoadedMetadata(event);
  }, [captureSize, onLoadedMetadata]);

  var capturing = _react["default"].useMemo(function () {
    return {
      status: "idle",
      start: function () {
        var _start = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var context, imageData;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  this.status = "running";

                case 1:
                  if (!(this.status === "running")) {
                    _context3.next = 13;
                    break;
                  }

                  _context3.next = 4;
                  return asyncRequestAnimationFrame();

                case 4:
                  if (!($videoRef.current && $videoRef.current.readyState > 1 && size.video.width > 0 && size.video.height > 0)) {
                    _context3.next = 11;
                    break;
                  }

                  context = graphics.getContext("2d");
                  context.drawImage($videoRef.current, size.capture.dx, size.capture.dy, size.capture.width, size.capture.height, 0, 0, size.capture.width, size.capture.height);
                  imageData = context.getImageData(0, 0, size.capture.width, size.capture.height);

                  if (!(typeof onCapture === "function")) {
                    _context3.next = 11;
                    break;
                  }

                  _context3.next = 11;
                  return onCapture(imageData);

                case 11:
                  _context3.next = 1;
                  break;

                case 13:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function start() {
          return _start.apply(this, arguments);
        }

        return start;
      }(),
      stop: function stop() {
        this.status = "cancelled";
      }
    };
  }, [size, graphics, onCapture]);

  _react["default"].useEffect(function () {
    if (capturing.status !== "running") {
      capturing.start();
    }

    return function () {
      return capturing.stop();
    };
  }, [capturing]);

  var handlePlay = function handlePlay(event) {
    capturing.start();
    typeof onPlay == "function" && onPlay(event);
  };

  var handlePause = function handlePause(event) {
    capturing.stop();
    typeof onPause == "function" && onPause(event);
  };

  var handleVisibilityChange = _react["default"].useCallback(function (event) {
    setVisible(!Boolean(event.target.hidden));
  }, []);

  _react["default"].useEffect(function () {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return function () {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  _react["default"].useLayoutEffect(function () {
    if (visible) {
      if (videoState.current === "paused") {
        startStream();
      }
    } else {
      if (videoState.current === "playing") {
        stopStream();
      }
    }

    return function () {
      stopStream();
    };
  }, [mediaStreamContext, visible, startStream, stopStream]);

  return /*#__PURE__*/_react["default"].createElement("video", {
    ref: $videoRef,
    onPlay: handlePlay,
    onPause: handlePause,
    onLoadedMetadata: handleMetadataLoaded,
    style: props === null || props === void 0 ? void 0 : props.videoStyle
  });
});

var envSupportsWebRTC = function envSupportsWebRTC() {
  return navigator && navigator.mediaDevices && navigator.mediaDevices.enumerateDevices && navigator.mediaDevices.getUserMedia;
};

var WebcamStreamWrapper = function WebcamStreamWrapper(props, ref) {
  var constraints = props.constraints,
      captureSize = props.captureSize,
      onCapture = props.onCapture,
      rest = _objectWithoutProperties(props, _excluded2);

  if (envSupportsWebRTC()) {
    return /*#__PURE__*/_react["default"].createElement(WebcamStream, _extends({
      ref: ref,
      constraints: constraints,
      captureSize: captureSize,
      onCapture: onCapture
    }, rest));
  } else {
    return /*#__PURE__*/_react["default"].createElement("video", {
      ref: ref,
      style: props === null || props === void 0 ? void 0 : props.videoStyle
    });
  }
};

var _default = /*#__PURE__*/_react["default"].forwardRef(WebcamStreamWrapper);

exports["default"] = _default;