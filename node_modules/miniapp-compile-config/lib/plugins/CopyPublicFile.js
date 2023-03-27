"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require('path'),
    resolve = _require.resolve;

var _require2 = require('fs-extra'),
    copySync = _require2.copySync;

var chokidar = require('chokidar');

var _require3 = require('miniapp-builder-shared'),
    _require3$pathHelper = _require3.pathHelper,
    isNativePage = _require3$pathHelper.isNativePage,
    removeExt = _require3$pathHelper.removeExt;
/**
 * Copy directories from rootDir + `src/${dir}` to outputPath + `${dir}`
 * @param {string[]} constantDir
 * @param {string} rootDir
 * @param {string} outputPath
 */


function copyPublicFile(constantDir, rootDir, outputPath, target) {
  for (var _iterator = _createForOfIteratorHelperLoose(constantDir), _step; !(_step = _iterator()).done;) {
    var srcDir = _step.value;
    var srcPath = resolve(rootDir, srcDir);
    var distPath = resolve(outputPath, srcDir.split('/').slice(1).join('/'));
    copySync(srcPath, distPath, {
      filter: function filter(file) {
        if (/\.js$/.test(file)) {
          return isNativePage(removeExt(file), target);
        }

        return true;
      }
    });
  }
}
/**
 * Copy public directories to dist
 */


module.exports = /*#__PURE__*/function () {
  function CopyPublicFilePlugin(_ref) {
    var _ref$mode = _ref.mode,
        mode = _ref$mode === void 0 ? 'build' : _ref$mode,
        _ref$rootDir = _ref.rootDir,
        rootDir = _ref$rootDir === void 0 ? '' : _ref$rootDir,
        _ref$outputPath = _ref.outputPath,
        outputPath = _ref$outputPath === void 0 ? '' : _ref$outputPath,
        _ref$constantDir = _ref.constantDir,
        constantDir = _ref$constantDir === void 0 ? [] : _ref$constantDir,
        target = _ref.target;
    this.mode = mode;
    this.rootDir = rootDir;
    this.outputPath = outputPath;
    this.constantDir = constantDir;
    this.target = target;
  }

  var _proto = CopyPublicFilePlugin.prototype;

  _proto.apply = function apply(compiler) {
    var _this = this;

    compiler.hooks.emit.tapAsync('CopyPublicFilePlugin', function (compilation, callback) {
      if (_this.mode === 'build') {
        copyPublicFile(_this.constantDir, _this.rootDir, _this.outputPath, _this.target);
      } else {
        var constantDirectoryPaths = _this.constantDir.map(function (dirPath) {
          return resolve(_this.rootDir, dirPath);
        });

        var watcher = chokidar.watch(constantDirectoryPaths);
        watcher.on('all', function () {
          copyPublicFile(_this.constantDir, _this.rootDir, _this.outputPath, _this.target);
        });
      }

      callback();
    });
  };

  return CopyPublicFilePlugin;
}();