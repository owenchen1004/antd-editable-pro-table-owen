"use strict";

var _require = require('path'),
    dirname = _require.dirname;

var _require2 = require('miniapp-builder-shared'),
    _require2$pathHelper = _require2.pathHelper,
    absoluteModuleResolve = _require2$pathHelper.absoluteModuleResolve,
    getDepPath = _require2$pathHelper.getDepPath;

function getEntry(entryAppFilePath, routes, rootDir) {
  var sourcePath = dirname(entryAppFilePath);
  var entry = {};
  entry.app = absoluteModuleResolve(rootDir, "./" + entryAppFilePath) + '?role=app'; // Mark it as app file

  if (Array.isArray(routes)) {
    routes.forEach(function (_ref) {
      var pageSource = _ref.source;
      entry["page@" + pageSource] = getDepPath(rootDir, pageSource, sourcePath) + "?role=page"; // Mark it as page file
    });
  }

  return entry;
}

module.exports = function (config, routes, options) {
  config.entryPoints.clear();
  var entryPath = options.entryPath,
      rootDir = options.rootDir;
  var entries = getEntry(entryPath, routes, rootDir);

  for (var _i = 0, _Object$entries = Object.entries(entries); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _Object$entries[_i],
        entryName = _Object$entries$_i[0],
        source = _Object$entries$_i[1];
    var entryConfig = config.entry(entryName);
    entryConfig.add(source);
  }
};