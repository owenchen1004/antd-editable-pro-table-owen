"use strict";

var _require = require('miniapp-builder-shared'),
    platformMap = _require.platformMap;

var _require2 = require('fs-extra'),
    existsSync = _require2.existsSync;

var _require3 = require('path'),
    resolve = _require3.resolve;

var setBaseConfig = require('./setBaseConfig');

module.exports = function (config, userConfig, _ref) {
  if (userConfig === void 0) {
    userConfig = {};
  }

  var context = _ref.context,
      target = _ref.target,
      entryPath = _ref.entryPath,
      outputPath = _ref.outputPath;
  var platformInfo = platformMap[target];
  var _userConfig = userConfig,
      _userConfig$turnOffSo = _userConfig.turnOffSourceMap,
      turnOffSourceMap = _userConfig$turnOffSo === void 0 ? false : _userConfig$turnOffSo,
      _userConfig$constantD = _userConfig.constantDir,
      constantDir = _userConfig$constantD === void 0 ? [] : _userConfig$constantD;
  var rootDir = context.rootDir,
      command = context.command;
  var disableCopyNpm;

  if (Object.prototype.hasOwnProperty.call(userConfig, 'disableCopyNpm')) {
    disableCopyNpm = userConfig.disableCopyNpm;
  } else {
    disableCopyNpm = command === 'build';
  }

  var loaderParams = {
    mode: command,
    entryPath: entryPath,
    outputPath: outputPath,
    disableCopyNpm: disableCopyNpm,
    turnOffSourceMap: turnOffSourceMap,
    platform: platformInfo
  };
  config.entryPoints.clear();
  config.entry('component').add("./" + entryPath + "?role=component"); // Set constantDir
  // `public` directory is the default static resource directory

  var isPublicFileExist = existsSync(resolve(rootDir, 'src/public')); // To make old `constantDir` param compatible

  loaderParams.constantDir = isPublicFileExist ? ['src/public'].concat(constantDir) : constantDir;
  setBaseConfig(config, userConfig, {
    context: context,
    entryPath: entryPath,
    outputPath: outputPath,
    loaderParams: loaderParams,
    target: target
  });
};