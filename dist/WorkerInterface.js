"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Worker = _interopRequireDefault(require("worker-loader?filename=qr-decoding.worker.js!./Worker.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var asyncTimeout = function asyncTimeout(ms) {
  return new Promise(function (res, rej) {
    return setTimeout(rej, ms);
  });
};

var WorkerInterface = /*#__PURE__*/function () {
  function WorkerInterface() {
    _classCallCheck(this, WorkerInterface);

    _defineProperty(this, "messages", new Map());

    _defineProperty(this, "initializeWorker", function () {
      this.worker = new _Worker["default"]();
      this.setupHandlers();
    });

    _defineProperty(this, "setupHandlers", function () {
      this.worker.addEventListener("message", this.onReceive);
      this.worker.addEventListener("error", this.onError);
    });

    _defineProperty(this, "removeHandlers", function () {
      this.worker.removeEventListener("message", this.onReceive);
      this.worker.removeEventListener("error", this.onError);
    });

    this.onReceive = this.onReceive.bind(this);
    this.onError = this.onError.bind(this);
    this.initializeWorker();
  }

  _createClass(WorkerInterface, [{
    key: "onDestroy",
    value: function onDestroy() {
      this.removeHandlers();
      this.worker.terminate();
    }
  }, {
    key: "onError",
    value: function onError() {
      this.onDestroy();
      this.initializeWorker();
    }
  }, {
    key: "onReceive",
    value: function onReceive(event) {
      if (event.data) {
        var _event$data = event.data,
            id = _event$data.id,
            content = _event$data.content;

        if (this.messages.has(id)) {
          var _this$messages$get = this.messages.get(id),
              onResponse = _this$messages$get.onResponse;

          onResponse(content);
          this.messages["delete"](id);
        }
      }
    }
  }, {
    key: "send",
    value: function send(message) {
      var _this = this;

      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var id = Math.random().toString(16).slice(2);
      var messagePromise = new Promise(function (resolve) {
        _this.messages.set(id, {
          message: message,
          onResponse: function onResponse(message) {
            return resolve(message);
          }
        });
      });
      this.worker.postMessage({
        id: id,
        content: message
      });

      if (timeout > 0) {
        return Promise.race([asyncTimeout(timeout), messagePromise]);
      } else {
        return messagePromise;
      }
    }
  }, {
    key: "ack",
    value: function ack(timeout) {
      return this.send({
        type: "ack"
      }, timeout);
    }
  }, {
    key: "requestDecoding",
    value: function () {
      var _requestDecoding = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(imageData) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.send({
                  type: "decode",
                  data: imageData
                });

              case 2:
                response = _context.sent;

                if (!response.data.success) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", Promise.resolve(response.data.result));

              case 7:
                return _context.abrupt("return", Promise.reject(null));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function requestDecoding(_x) {
        return _requestDecoding.apply(this, arguments);
      }

      return requestDecoding;
    }()
  }]);

  return WorkerInterface;
}();

var _default = WorkerInterface;
exports["default"] = _default;