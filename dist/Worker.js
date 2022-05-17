"use strict";

var _jsqr = _interopRequireDefault(require("jsqr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function decode(data, width, height) {
  try {
    var result = (0, _jsqr["default"])(data, width, height);
    return {
      success: true,
      result: result
    };
  } catch (err) {
    console.warn(err);
    return {
      success: false,
      result: null
    };
  }
}

;

self.onmessage = function (event) {
  if (event.data) {
    var _event$data = event.data,
        id = _event$data.id,
        content = _event$data.content;

    switch (content.type) {
      case "ack":
        {
          self.postMessage({
            id: id,
            content: content
          });
          break;
        }

      case "decode":
        {
          var _content$data = content.data,
              data = _content$data.data,
              width = _content$data.width,
              height = _content$data.height;
          var result = decode(data, width, height);
          self.postMessage({
            id: id,
            content: {
              type: "decode",
              data: result
            }
          });
          break;
        }

      default:
        break;
    }
  }
};