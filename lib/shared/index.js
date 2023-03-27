"use strict";

exports.__esModule = true;
var _exportNames = {
  uuid: true,
  defineGetterProperties: true
};
exports.defineGetterProperties = void 0;
exports.uuid = uuid;
var _type = require("./type");
Object.keys(_type).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _type[key]) return;
  exports[key] = _type[key];
});
function uuid() {
  return Math.random().toString(36).substring(2);
}

/**
 * 由 ref 代理 targetRef 上的方法
 */
var defineGetterProperties = function defineGetterProperties(ref, targetRef) {
  if (!targetRef) return;
  if (!Array.isArray(targetRef)) {
    targetRef = [targetRef];
  }
  targetRef.filter(Boolean).forEach(function (r) {
    var _r$current;
    Object.defineProperties(ref, Object.keys((_r$current = r === null || r === void 0 ? void 0 : r.current) !== null && _r$current !== void 0 ? _r$current : {}).reduce(function (out, key) {
      var property = r.current[key];
      var getter = function getter() {
        return property;
      };
      if (typeof property === 'function') {
        getter = function getter() {
          return property.bind(r.current);
        };
      }
      out[key] = {
        get: getter
      };
      return out;
    }, {}));
  });
  return ref;
};
exports.defineGetterProperties = defineGetterProperties;