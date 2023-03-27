"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var webpack = require('webpack');

var ComponentLoader = require.resolve('jsx2mp-loader/src/component-loader');

var ScriptLoader = require.resolve('jsx2mp-loader/src/script-loader');

var FileLoader = require.resolve('jsx2mp-loader/src/file-loader');

var _require = require('miniapp-builder-shared'),
    platformMap = _require.platformMap,
    getPlatformExtensions = _require.pathHelper.getPlatformExtensions;

var CopyJsx2mpRuntimePlugin = require('./plugins/CopyJsx2mpRuntime');

var CopyPublicFilePlugin = require('./plugins/CopyPublicFile');

var RemoveDefaultPlugin = require('./plugins/RemoveDefaultResult');

module.exports = function (chainConfig, userConfig, _ref) {
  var context = _ref.context,
      entryPath = _ref.entryPath,
      outputPath = _ref.outputPath,
      loaderParams = _ref.loaderParams,
      target = _ref.target;
  var platformInfo = platformMap[target];
  var rootDir = context.rootDir,
      command = context.command;
  var _userConfig$platform = userConfig.platform,
      platform = _userConfig$platform === void 0 ? platformInfo.type : _userConfig$platform;
  var mode = command; // Write to Disk

  chainConfig.devServer.writeToDisk(true); // Remove useless alias

  ['babel-runtime-jsx-plus', '@babel/runtime', 'rax-app', 'rax-app$', 'rax'].forEach(function (packageName) {
    chainConfig.resolve.alias.delete(packageName);
  }); // Add React alias

  chainConfig.resolve.alias.set('react', 'rax');
  var aliasEntries = chainConfig.resolve.alias.entries();
  loaderParams.aliasEntries = aliasEntries; // Clear prev rules

  ['jsx', 'tsx'].forEach(function (name) {
    chainConfig.module.rule(name).uses.clear();
  }); // Compile ts file

  chainConfig.module.rule('tsx').test(/\.(tsx?)$/).use('ts').loader(require.resolve('ts-loader')).options({
    transpileOnly: true
  }); // Remove all app.json before it

  chainConfig.module.rule('appJSON').uses.clear();
  chainConfig.cache(true).mode('production').target('node');
  chainConfig.module.rule('withRoleJSX').test(/\.t|jsx?$/).enforce('post').exclude.add(/node_modules/).end().use('component').loader(ComponentLoader).options(_extends({}, loaderParams, {
    entryPath: entryPath
  })).end().use('platform').loader(require.resolve('rax-compile-config/src/platformLoader')).options({
    platform: target
  }).end().use('script').loader(ScriptLoader).options(loaderParams).end();
  chainConfig.module.rule('npm').test(/\.js$/).include.add(/node_modules/).end().use('script').loader(ScriptLoader).options(loaderParams).end();
  chainConfig.module.rule('staticFile').test(/\.(bmp|webp|svg|png|webp|jpe?g|gif)$/i).use('file').loader(FileLoader).options({
    entryPath: entryPath,
    outputPath: outputPath
  }); // Exclude app.json

  chainConfig.module.rule('json').test(/\.json$/).use('script-loader').loader(ScriptLoader).options(loaderParams).end().use('json-loader').loader(require.resolve('json-loader')); // Distinguish end construction

  chainConfig.resolve.extensions.clear().merge(getPlatformExtensions(platform, ['.js', '.jsx', '.ts', '.tsx', '.json']));
  chainConfig.resolve.mainFields.add('main').add('module');
  chainConfig.externals([function (ctx, request, callback) {
    if (/\.(css|sass|scss|styl|less)$/.test(request)) {
      return callback(null, "commonjs2 " + request);
    }

    callback();
  }].concat(chainConfig.get('externals') || []));
  chainConfig.plugin('define').use(webpack.DefinePlugin, [{
    'process.env': {
      NODE_ENV: mode === 'build' ? '"production"' : '"development"'
    }
  }]);
  chainConfig.plugin('watchIgnore').use(webpack.WatchIgnorePlugin, [[/node_modules/]]);

  if (loaderParams.constantDir.length > 0) {
    chainConfig.plugin('copyPublicFile').use(CopyPublicFilePlugin, [{
      mode: mode,
      outputPath: outputPath,
      rootDir: rootDir,
      constantDir: loaderParams.constantDir,
      target: target
    }]);
  }

  if (!loaderParams.disableCopyNpm) {
    chainConfig.plugin('runtime').use(CopyJsx2mpRuntimePlugin, [{
      platform: platform,
      mode: mode,
      outputPath: outputPath,
      rootDir: rootDir
    }]);
  } // Remove webpack default generate assets


  chainConfig.plugin('RemoveDefaultPlugin').use(RemoveDefaultPlugin);
};