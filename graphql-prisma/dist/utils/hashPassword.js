"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (password) {
  if (password.length < 8) {
    throw new Error("Password must be 8 characters or longer");
  }

  return _bcryptjs2.default.hash(password, 10);
};