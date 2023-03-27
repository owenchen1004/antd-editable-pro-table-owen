"use strict";

var _require = require('path'),
    join = _require.join;

var _require2 = require('fs-extra'),
    copySync = _require2.copySync,
    existsSync = _require2.existsSync,
    writeFileSync = _require2.writeFileSync,
    readJSONSync = _require2.readJSONSync,
    readFileSync = _require2.readFileSync;

var _require3 = require('terser'),
    minify = _require3.minify;
/**
 *  Runtime packages should be a dependency of build-plugin-rax-app. But if the project has installed it, then it will take the priority.
 * @param {string} packageName
 * @param {string} rootDir
 */


function getHighestPriorityPackageJSON(packageName, rootDir) {
  var targetFile = join(packageName, 'package.json');

  var resolvePaths = require.resolve.paths(targetFile);

  resolvePaths.unshift(join(rootDir, 'node_modules'));

  var packageJSONPath = require.resolve(targetFile, {
    paths: resolvePaths
  });

  return packageJSONPath;
}

var runtime = 'jsx2mp-runtime';
var runtimePackageJSONPath = null;
var runtimePackageJSON = null;
var runtimePackagePath = null;
/**
 * For convenient to copy vendors.
 */

module.exports = /*#__PURE__*/function () {
  function JSX2MPRuntimePlugin(_ref) {
    var _ref$platform = _ref.platform,
        platform = _ref$platform === void 0 ? 'ali' : _ref$platform,
        _ref$mode = _ref.mode,
        mode = _ref$mode === void 0 ? 'build' : _ref$mode,
        _ref$rootDir = _ref.rootDir,
        rootDir = _ref$rootDir === void 0 ? '' : _ref$rootDir,
        _ref$outputPath = _ref.outputPath,
        outputPath = _ref$outputPath === void 0 ? '' : _ref$outputPath;
    this.platform = platform;
    this.mode = mode;
    this.rootDir = rootDir;
    this.outputPath = outputPath;
  }

  var _proto = JSX2MPRuntimePlugin.prototype;

  _proto.apply = function apply(compiler) {
    var _this = this;

    compiler.hooks.emit.tapAsync('JSX2MPRuntimePlugin', function (compilation, callback) {
      if (!runtimePackageJSONPath) {
        runtimePackageJSONPath = getHighestPriorityPackageJSON(runtime, _this.rootDir);
        runtimePackageJSON = readJSONSync(runtimePackageJSONPath);
        runtimePackagePath = join(runtimePackageJSONPath, '..');
      }

      var runtimeTargetPath = "dist/jsx2mp-runtime." + _this.platform + ".esm.js";

      var sourceFile = require.resolve(join(runtimePackagePath, runtimeTargetPath));

      var targetFile = join(_this.outputPath, 'npm', runtime + '.js');

      if (_this.mode === 'build') {
        var sourceCode = minify(readFileSync(sourceFile, 'utf-8')).code;
        writeFileSync(targetFile, sourceCode);
      } else {
        if (!existsSync(targetFile)) {
          copySync(sourceFile, targetFile);
        }
      }

      callback();
    });
  };

  return JSX2MPRuntimePlugin;
}();