"use strict";

exports.__esModule = true;
exports.isPlainObj = exports.getType = void 0;
var isType = function isType(type) {
  return function (obj) {
    return obj != null && (Array.isArray(type) ? type : [type]).some(function (t) {
      return getType(obj) === "[object " + t + "]";
    });
  };
};
var getType = function getType(obj) {
  return Object.prototype.toString.call(obj);
};
exports.getType = getType;
var isPlainObj = isType('Object');
exports.isPlainObj = isPlainObj;