"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MediaStreamManager = /*#__PURE__*/function () {
  function MediaStreamManager() {
    _classCallCheck(this, MediaStreamManager);
  }

  _createClass(MediaStreamManager, [{
    key: "createStreamContext",
    value: function createStreamContext(constraints) {
      var streamId = Math.random().toString(16).slice(2);
      MediaStreamManager.storage.set(streamId, {
        stream: null,
        state: "created"
      });
      MediaStreamManager.storage.forEach(function (context, contextId) {
        if (context.state == "cancelled") {
          MediaStreamManager.storage["delete"](contextId);
        }
      });

      var getContextStream = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var stream, context;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return navigator.mediaDevices.getUserMedia(constraints);

                case 3:
                  stream = _context.sent;

                  if (!MediaStreamManager.storage.has(streamId)) {
                    _context.next = 17;
                    break;
                  }

                  context = MediaStreamManager.storage.get(streamId);

                  if (!(context.state === "cancelled")) {
                    _context.next = 13;
                    break;
                  }

                  console.warn("MediaStreamManager: stream ".concat(streamId, " already cancelled"));

                  if (stream !== null) {
                    stream.getVideoTracks().forEach(function (track) {
                      return track.stop();
                    });
                  }

                  MediaStreamManager.storage["delete"](streamId);
                  return _context.abrupt("return", null);

                case 13:
                  MediaStreamManager.storage.set(streamId, {
                    state: "started",
                    stream: stream
                  });
                  return _context.abrupt("return", stream);

                case 15:
                  _context.next = 20;
                  break;

                case 17:
                  console.warn("MediaStreamManager: stream ".concat(streamId, " probably already cancelled"));

                  if (stream !== null) {
                    stream.getVideoTracks().forEach(function (track) {
                      return track.stop();
                    });
                  }

                  return _context.abrupt("return", null);

                case 20:
                  _context.next = 27;
                  break;

                case 22:
                  _context.prev = 22;
                  _context.t0 = _context["catch"](0);
                  console.error("Failed to start a new user media stream");
                  MediaStreamManager.storage["delete"](streamId);
                  return _context.abrupt("return", null);

                case 27:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 22]]);
        }));

        return function getContextStream() {
          return _ref.apply(this, arguments);
        };
      }();

      return {
        id: streamId,
        getStream: getContextStream
      };
    }
  }, {
    key: "stopStream",
    value: function stopStream(contextId) {
      if (MediaStreamManager.storage.has(contextId)) {
        var context = MediaStreamManager.storage.get(contextId);

        switch (context.state) {
          case "started":
            {
              var stream = context.stream;

              if (stream !== null) {
                stream.getVideoTracks().forEach(function (track) {
                  return track.stop();
                });
              }

              MediaStreamManager.storage["delete"](contextId);
              break;
            }

          case "created":
          case "cancelled":
          default:
            {
              MediaStreamManager.storage["delete"](contextId);
              break;
            }
        }
      }
    }
  }]);

  return MediaStreamManager;
}();

_defineProperty(MediaStreamManager, "storage", new Map());

var mediaStreamManager = new MediaStreamManager();
var _default = mediaStreamManager;
exports["default"] = _default;