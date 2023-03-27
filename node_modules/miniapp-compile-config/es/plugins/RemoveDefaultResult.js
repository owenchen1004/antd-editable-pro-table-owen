"use strict";

var _require = require('webpack'),
    compilation = _require.compilation;

module.exports = /*#__PURE__*/function () {
  function RemoveDefaultResultPlugin() {}

  var _proto = RemoveDefaultResultPlugin.prototype;

  _proto.apply = function apply(compiler) {
    compiler.hooks.afterCompile.tapAsync('RemoveDefaultResultPlugin', function (compilation, callback) {
      compilation.assets = {};
      callback();
    });
  };

  return RemoveDefaultResultPlugin;
}();