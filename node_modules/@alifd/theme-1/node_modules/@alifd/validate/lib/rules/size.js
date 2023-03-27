"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var util = _interopRequireWildcard(require("../util"));

/**
 *  Rule for validating minimum and maximum allowed values.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function size(rule, value, errors, options) {
  var key = null;
  var isNum = typeof value === 'number';
  var isStr = typeof value === 'string';

  if (isNum) {
    key = 'number';
  } else if (isStr) {
    key = 'string';
  }

  if (!key) {
    return false;
  } // TODO: 2.x change to typeof rule.min === 'number' || typeof rule.max === 'number'


  if (typeof rule.min !== 'undefined' || typeof rule.max !== 'undefined') {
    var val = value;
    var max = Number(rule.max);
    var min = Number(rule.min);

    if (isStr) {
      val = Number(val);
    }

    if (val < min) {
      errors.push(util.format(options.messages[key].min, rule.aliasName || rule.field, rule.min));
    } else if (val > max) {
      errors.push(util.format(options.messages[key].max, rule.aliasName || rule.field, rule.max));
    }
  }
}

var _default = size;
exports.default = _default;