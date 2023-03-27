"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _require = require('path'),
    dirname = _require.dirname,
    resolve = _require.resolve;

var _require2 = require('miniapp-builder-shared'),
    platformMap = _require2.platformMap,
    filterNativePages = _require2.filterNativePages,
    getAppConfig = _require2.getAppConfig;

var _require3 = require('fs-extra'),
    existsSync = _require3.existsSync;

var MiniAppConfigPlugin = require('rax-miniapp-config-webpack-plugin');

var AppLoader = require.resolve('jsx2mp-loader/src/app-loader');

var PageLoader = require.resolve('jsx2mp-loader/src/page-loader');

var setBaseConfig = require('./setBaseConfig');

var setEntry = require('./setEntry');

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
      _userConfig$disableCo = _userConfig.disableCopyNpm,
      disableCopyNpm = _userConfig$disableCo === void 0 ? false : _userConfig$disableCo,
      _userConfig$turnOffSo = _userConfig.turnOffSourceMap,
      turnOffSourceMap = _userConfig$turnOffSo === void 0 ? false : _userConfig$turnOffSo,
      _userConfig$constantD = _userConfig.constantDir,
      constantDir = _userConfig$constantD === void 0 ? [] : _userConfig$constantD;
  var rootDir = context.rootDir,
      command = context.command;
  var mode = command;
  var appConfig = getAppConfig(rootDir, target);
  setEntry(config, appConfig.routes, {
    entryPath: entryPath,
    rootDir: rootDir,
    target: target
  }); // Set constantDir
  // `public` directory is the default static resource directory

  var isPublicFileExist = existsSync(resolve(rootDir, 'src/public')); // Need Copy files or dir

  var needCopyList = [];
  var loaderParams = {
    mode: mode,
    entryPath: entryPath,
    outputPath: outputPath,
    disableCopyNpm: disableCopyNpm,
    turnOffSourceMap: turnOffSourceMap,
    platform: platformInfo,
    // To make old `constantDir` param compatible
    constantDir: isPublicFileExist ? ['src/public'].concat(constantDir) : constantDir,
    rootDir: rootDir
  };
  appConfig.routes = filterNativePages(appConfig.routes, needCopyList, {
    rootDir: rootDir,
    target: target,
    outputPath: outputPath
  });

  var pageLoaderParams = _extends({}, loaderParams, {
    entryPath: entryPath
  });

  var appLoaderParams = _extends({}, loaderParams, {
    entryPath: dirname(entryPath)
  });

  config.cache(true).mode('production').target('node'); // Set base jsx2mp config

  setBaseConfig(config, userConfig, {
    entryPath: entryPath,
    context: context,
    loaderParams: loaderParams,
    target: target,
    outputPath: outputPath
  });
  needCopyList.forEach(function (dirPatterns) {
    return loaderParams.constantDir.push(dirPatterns.from);
  }); // Add app and page jsx2mp loader

  config.module.rule('withRoleJSX').use('app').loader(AppLoader).options(appLoaderParams).end().use('page').loader(PageLoader).options(pageLoaderParams).end();
  config.plugin('miniAppConfig').use(MiniAppConfigPlugin, [{
    type: 'complie',
    appConfig: appConfig,
    getAppConfig: getAppConfig,
    outputPath: outputPath,
    target: target,
    nativeConfig: userConfig.nativeConfig
  }]);
  var aliasEntries = config.resolve.alias.entries();
  config.module.rule('withRoleJSX').use('app').tap(function (appLoaderParams) {
    return _extends({}, appLoaderParams, {
      aliasEntries: aliasEntries
    });
  }).end().use('page').tap(function (pageLoaderParams) {
    return _extends({}, pageLoaderParams, {
      aliasEntries: aliasEntries
    });
  });
};