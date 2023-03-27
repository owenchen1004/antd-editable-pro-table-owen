"use strict";

var terser = require('terser');

var csso = require('csso');

var prettyData = require('pretty-data').pd;

function minifyJS(source) {
  return terser.minify(source).code;
}

function minifyCSS(source) {
  return csso.minify(source, {
    restructure: false
  }).css;
}

function minifyXML(source) {
  return prettyData.xmlmin(source);
}

function minifyJSON(source) {
  return prettyData.json(source);
}

function minify(source, type) {
  if (type === void 0) {
    type = '.js';
  }

  if (type === '.js') {
    return minifyJS(source);
  }

  if (type === '.css') {
    return minifyCSS(source);
  }

  if (type === '.json') {
    return minifyJSON(source);
  }

  if (/\..*ml/.test(type)) {
    return minifyXML(source);
  }

  return source;
}

module.exports = {
  minify: minify,
  minifyJS: minifyJS,
  minifyCSS: minifyCSS,
  minifyXML: minifyXML,
  minifyJSON: minifyJSON
};