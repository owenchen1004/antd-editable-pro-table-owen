var isType = function isType(type) {
  return function (obj) {
    return obj != null && (Array.isArray(type) ? type : [type]).some(function (t) {
      return getType(obj) === "[object " + t + "]";
    });
  };
};
export var getType = function getType(obj) {
  return Object.prototype.toString.call(obj);
};
export var isPlainObj = isType('Object');