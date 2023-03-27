"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _validate2 = _interopRequireDefault(require("@alifd/validate"));

var _utils = require("./utils");

var initMeta = {
  state: '',
  valueName: 'value',
  trigger: 'onChange',
  inputValues: []
};

var Field = /*#__PURE__*/function () {
  function Field(com) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2.default)(this, Field);

    if (!com) {
      (0, _utils.warning)('`this` is missing in `Field`, you should use like `new Field(this)`');
    }

    this.com = com;
    this.fieldsMeta = {};
    this.cachedBind = {};
    this.instance = {};
    this.instanceCount = {}; // holds constructor values. Used for setting field defaults on init if no other value or initValue is passed.
    // Also used caching values when using `parseName: true` before a field is initialized

    this.values = (0, _extends2.default)({}, options.values);
    this.processErrorMessage = options.processErrorMessage;
    this.afterValidateRerender = options.afterValidateRerender;
    this.options = (0, _extends2.default)({
      parseName: false,
      forceUpdate: false,
      scrollToFirstError: true,
      first: false,
      onChange: function onChange() {},
      autoUnmount: true,
      autoValidate: true
    }, options);
    ['init', 'getValue', 'getValues', 'setValue', 'setValues', 'getError', 'getErrors', 'setError', 'setErrors', 'validateCallback', 'validatePromise', 'getState', 'reset', 'resetToDefault', 'remove', 'spliceArray', 'addArrayValue', 'deleteArrayValue', 'getNames'].forEach(function (m) {
      _this[m] = _this[m].bind(_this);
    });
  }

  (0, _createClass2.default)(Field, [{
    key: "setOptions",
    value: function setOptions(options) {
      (0, _extends2.default)(this.options, options);
    }
    /**
     * Controlled Component
     * @param {String} name
     * @param {Object} fieldOption
     * @returns {Object} {value, onChange}
     */

  }, {
    key: "init",
    value: function init(name) {
      var _this2 = this;

      var fieldOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var rprops = arguments.length > 2 ? arguments[2] : undefined;
      var id = fieldOption.id,
          initValue = fieldOption.initValue,
          _fieldOption$valueNam = fieldOption.valueName,
          valueName = _fieldOption$valueNam === void 0 ? 'value' : _fieldOption$valueNam,
          _fieldOption$trigger = fieldOption.trigger,
          trigger = _fieldOption$trigger === void 0 ? 'onChange' : _fieldOption$trigger,
          _fieldOption$rules = fieldOption.rules,
          rules = _fieldOption$rules === void 0 ? [] : _fieldOption$rules,
          _fieldOption$props = fieldOption.props,
          props = _fieldOption$props === void 0 ? {} : _fieldOption$props,
          _fieldOption$getValue = fieldOption.getValueFromEvent,
          getValueFromEvent = _fieldOption$getValue === void 0 ? null : _fieldOption$getValue,
          _fieldOption$getValue2 = fieldOption.getValueFormatter,
          getValueFormatter = _fieldOption$getValue2 === void 0 ? getValueFromEvent : _fieldOption$getValue2,
          setValueFormatter = fieldOption.setValueFormatter,
          _fieldOption$autoVali = fieldOption.autoValidate,
          autoValidate = _fieldOption$autoVali === void 0 ? true : _fieldOption$autoVali;
      var parseName = this.options.parseName;

      if (getValueFromEvent) {
        (0, _utils.warning)('`getValueFromEvent` has been deprecated in `Field`, use `getValueFormatter` instead of it');
      }

      var originalProps = (0, _extends2.default)({}, props, rprops);
      var defaultValueName = "default".concat(valueName[0].toUpperCase()).concat(valueName.slice(1));
      var defaultValue;

      if (typeof initValue !== 'undefined') {
        defaultValue = initValue;
      } else if (typeof originalProps[defaultValueName] !== 'undefined') {
        // here use typeof, in case of defaultValue={0}
        defaultValue = originalProps[defaultValueName];
      } // get field from this.fieldsMeta or new one


      var field = this._getInitMeta(name);

      (0, _extends2.default)(field, {
        valueName: valueName,
        initValue: defaultValue,
        disabled: 'disabled' in originalProps ? originalProps.disabled : false,
        getValueFormatter: getValueFormatter,
        setValueFormatter: setValueFormatter,
        rules: Array.isArray(rules) ? rules : [rules],
        ref: originalProps.ref
      }); // Controlled Component, should always equal props.value

      if (valueName in originalProps) {
        field.value = originalProps[valueName]; // When rerendering set the values from props.value

        if (parseName) {
          this.values = (0, _utils.setIn)(this.values, name, field.value);
        } else {
          this.values[name] = field.value;
        }
      }
      /**
       * first init field (value not in field)
       * should get field.value from this.values or defaultValue
       */


      if (!('value' in field)) {
        if (parseName) {
          var cachedValue = (0, _utils.getIn)(this.values, name);

          if (typeof cachedValue !== 'undefined') {
            field.value = cachedValue;
          } else {
            // save struct to this.values even defaultValue is undefiend
            field.value = defaultValue;
            this.values = (0, _utils.setIn)(this.values, name, field.value);
          }
        } else {
          var _cachedValue = this.values[name];

          if (typeof _cachedValue !== 'undefined') {
            field.value = _cachedValue;
          } else if (typeof defaultValue !== 'undefined') {
            // should be same with parseName, but compatible with old versions
            field.value = defaultValue;
            this.values[name] = field.value;
          }
        }
      } // Component props


      var inputProps = (0, _defineProperty2.default)({
        'data-meta': 'Field',
        id: id || name,
        ref: this._getCacheBind(name, "".concat(name, "__ref"), this._saveRef)
      }, valueName, setValueFormatter ? setValueFormatter(field.value, field.inputValues) : field.value);
      var rulesMap = {};

      if (this.options.autoValidate && autoValidate !== false) {
        // trigger map in rules,
        rulesMap = (0, _utils.mapValidateRules)(field.rules, trigger); // step1 : validate hooks

        var _loop = function _loop(action) {
          // skip default trigger, which will trigger in step2
          if (action === trigger) {
            return "continue";
          }

          var actionRule = rulesMap[action];

          inputProps[action] = function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            _this2._callNativePropsEvent.apply(_this2, [action, originalProps].concat(args));

            _this2._validate(name, actionRule, action);
          };
        };

        for (var action in rulesMap) {
          var _ret = _loop(action);

          if (_ret === "continue") continue;
        }
      } // step2: onChange(trigger=onChange by default) hack


      inputProps[trigger] = function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        _this2._updateFieldValue.apply(_this2, [name].concat(args)); // clear validate error


        _this2._resetError(name);

        _this2._callNativePropsEvent.apply(_this2, [trigger, originalProps].concat(args)); // call global onChange


        _this2.options.onChange(name, field.value); // validate while onChange


        var rule = rulesMap[trigger];
        rule && _this2._validate(name, rule, trigger);

        _this2._reRender();
      };

      delete originalProps[defaultValueName];
      return (0, _extends2.default)({}, originalProps, inputProps);
    }
    /**
     * call native event from props.onXx
     * eg: props.onChange props.onBlur props.onFocus
     */

  }, {
    key: "_callNativePropsEvent",
    value: function _callNativePropsEvent(action, props) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
      }

      action in props && typeof props[action] === 'function' && props[action].apply(props, args);
    }
  }, {
    key: "_getInitMeta",
    value: function _getInitMeta(name) {
      if (!(name in this.fieldsMeta)) {
        this.fieldsMeta[name] = (0, _extends2.default)({}, initMeta);
      }

      return this.fieldsMeta[name];
    }
    /**
     * update field.value and validate
     */

  }, {
    key: "_updateFieldValue",
    value: function _updateFieldValue(name) {
      for (var _len4 = arguments.length, others = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        others[_key4 - 1] = arguments[_key4];
      }

      var e = others[0];

      var field = this._get(name);

      if (!field) {
        return;
      }

      field.value = field.getValueFormatter ? field.getValueFormatter.apply(this, others) : (0, _utils.getValueFromEvent)(e);
      field.inputValues = others;

      if (this.options.parseName) {
        this.values = (0, _utils.setIn)(this.values, name, field.value);
      } else {
        this.values[name] = field.value;
      }
    }
    /**
     * ref must always be the same function, or if not it will be triggerd every time.
     * @param {String} name name of component
     * @param {String} action key to find ref
     * @param {Function} fn saveRef
     */

  }, {
    key: "_getCacheBind",
    value: function _getCacheBind(name, action, fn) {
      var cache = this.cachedBind[name] = this.cachedBind[name] || {};

      if (!cache[action]) {
        cache[action] = fn.bind(this, name);
      }

      return cache[action];
    }
  }, {
    key: "_setCache",
    value: function _setCache(name, action, hander) {
      var cache = this.cachedBind[name] = this.cachedBind[name] || {};
      cache[action] = hander;
    }
  }, {
    key: "_getCache",
    value: function _getCache(name, action) {
      var cache = this.cachedBind[name] || {};
      return cache[action];
    }
    /**
     * NOTE: saveRef is async function. it will be called after render
     * @param {String} name name of component
     * @param {Function} component ref
     */

  }, {
    key: "_saveRef",
    value: function _saveRef(name, component) {
      var key = "".concat(name, "_field");
      var autoUnmount = this.options.autoUnmount;

      if (!component && autoUnmount) {
        // more than one component, do nothing
        this.instanceCount[name] && this.instanceCount[name]--;

        if (this.instanceCount[name] > 0) {
          return;
        } // component with same name (eg: type ? <A name="n"/>:<B name="n"/>)
        // while type changed, B will render before A unmount. so we should cached value for B
        // step: render -> B mount -> 1. _saveRef(A, null) -> 2. _saveRef(B, ref) -> render
        // 1. _saveRef(A, null)


        var cache = this.fieldsMeta[name];
        cache && this._setCache(name, key, cache); // after destroy, delete data

        delete this.instance[name];
        this.remove(name);
        return;
      } // 2. _saveRef(B, ref) (eg: same name but different compoent may be here)


      if (autoUnmount && !this.fieldsMeta[name] && this._getCache(name, key)) {
        this.fieldsMeta[name] = this._getCache(name, key);
        this.setValue(name, this.fieldsMeta[name] && this.fieldsMeta[name].value, false);
      } // only one time here


      var field = this._get(name);

      if (field) {
        var ref = field.ref;

        if (ref) {
          if (typeof ref === 'string') {
            throw new Error("can not set string ref for ".concat(name));
          } else if (typeof ref === 'function') {
            ref(component);
          } else if ((0, _typeof2.default)(ref) === 'object' && 'current' in ref) {
            // while ref = React.createRef() ref={ current: null}
            ref.current = component;
          }
        } // mount


        if (autoUnmount && component) {
          var cnt = this.instanceCount[name];

          if (!cnt) {
            cnt = 0;
          }

          this.instanceCount[name] = cnt + 1;
        }

        this.instance[name] = component;
      }
    }
    /**
     * validate one Component
     * @param {String} name name of Component
     * @param {Array} rule
     * @param {String} trigger onChange/onBlur/onItemClick/...
     */

  }, {
    key: "_validate",
    value: function _validate(name, rule, trigger) {
      var _this3 = this;

      var field = this._get(name);

      if (!field) {
        return;
      }

      var value = field.value;
      field.state = 'loading';

      var validate = this._getCache(name, trigger);

      if (validate && typeof validate.abort === 'function') {
        validate.abort();
      }

      validate = new _validate2.default((0, _defineProperty2.default)({}, name, rule), {
        messages: this.options.messages
      });

      this._setCache(name, trigger, validate);

      validate.validate((0, _defineProperty2.default)({}, name, value), function (errors) {
        var newErrors, newState;

        if (errors && errors.length) {
          newErrors = (0, _utils.getErrorStrs)(errors, _this3.processErrorMessage);
          newState = 'error';
        } else {
          newErrors = [];
          newState = 'success';
        }

        var reRender = false; // only status or errors changed, Rerender

        if (newState !== field.state || !field.errors || newErrors.length !== field.errors.length || newErrors.find(function (e, idx) {
          return e !== field.errors[idx];
        })) {
          reRender = true;
        }

        field.errors = newErrors;
        field.state = newState;
        reRender && _this3._reRender();
      });
    }
  }, {
    key: "getValue",
    value: function getValue(name) {
      if (this.options.parseName) {
        return (0, _utils.getIn)(this.values, name);
      }

      return this.values[name];
    }
    /**
     * 1. get values by names.
     * 2. If no names passed, return shallow copy of `field.values`
     * @param {Array} names
     */

  }, {
    key: "getValues",
    value: function getValues(names) {
      var _this4 = this;

      var allValues = {};

      if (names && names.length) {
        names.forEach(function (name) {
          allValues[name] = _this4.getValue(name);
        });
      } else {
        (0, _extends2.default)(allValues, this.values);
      }

      return allValues;
    }
  }, {
    key: "setValue",
    value: function setValue(name, value) {
      var reRender = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (name in this.fieldsMeta) {
        this.fieldsMeta[name].value = value;
      }

      if (this.options.parseName) {
        this.values = (0, _utils.setIn)(this.values, name, value);
      } else {
        this.values[name] = value;
      }

      reRender && this._reRender();
    }
  }, {
    key: "setValues",
    value: function setValues() {
      var _this5 = this;

      var fieldsValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var reRender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!this.options.parseName) {
        Object.keys(fieldsValue).forEach(function (name) {
          _this5.setValue(name, fieldsValue[name], false);
        });
      } else {
        // NOTE: this is a shallow merge
        // Ex. we have two values a.b.c=1 ; a.b.d=2, and use setValues({a:{b:{c:3}}}) , then because of shallow merge a.b.d will be lost, we will get only {a:{b:{c:3}}}
        this.values = (0, _extends2.default)({}, this.values, fieldsValue);
        var fields = this.getNames();
        fields.forEach(function (name) {
          var value = (0, _utils.getIn)(_this5.values, name);

          if (value !== undefined) {
            // copy over values that are in this.values
            _this5.fieldsMeta[name].value = value;
          } else {
            // because of shallow merge
            // if no value then copy values from fieldsMeta to keep initialized component data
            _this5.values = (0, _utils.setIn)(_this5.values, name, _this5.fieldsMeta[name].value);
          }
        });
      }

      reRender && this._reRender();
    }
  }, {
    key: "setError",
    value: function setError(name, errors) {
      var err = Array.isArray(errors) ? errors : errors ? [errors] : [];

      if (name in this.fieldsMeta) {
        this.fieldsMeta[name].errors = err;
      } else {
        this.fieldsMeta[name] = {
          errors: err
        };
      }

      if (this.fieldsMeta[name].errors && this.fieldsMeta[name].errors.length > 0) {
        this.fieldsMeta[name].state = 'error';
      } else {
        this.fieldsMeta[name].state = '';
      }

      this._reRender();
    }
  }, {
    key: "setErrors",
    value: function setErrors() {
      var _this6 = this;

      var fieldsErrors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Object.keys(fieldsErrors).forEach(function (name) {
        _this6.setError(name, fieldsErrors[name]);
      });
    }
  }, {
    key: "getError",
    value: function getError(name) {
      var field = this._get(name);

      if (field && field.errors && field.errors.length) {
        return field.errors;
      }

      return null;
    }
  }, {
    key: "getErrors",
    value: function getErrors(names) {
      var _this7 = this;

      var fields = names || this.getNames();
      var allErrors = {};
      fields.forEach(function (f) {
        allErrors[f] = _this7.getError(f);
      });
      return allErrors;
    }
  }, {
    key: "getState",
    value: function getState(name) {
      var field = this._get(name);

      if (field && field.state) {
        return field.state;
      }

      return '';
    }
    /**
     * Get errors using `getErrors` and format to match the structure of errors returned in field.validate
     * @param {Array} fieldNames
     * @return {Object || null} map of inputs and their errors
     */

  }, {
    key: "formatGetErrors",
    value: function formatGetErrors(fieldNames) {
      var errors = this.getErrors(fieldNames);
      var formattedErrors = null;

      for (var field in errors) {
        if (errors.hasOwnProperty(field) && errors[field]) {
          var errorsObj = errors[field];

          if (!formattedErrors) {
            formattedErrors = {};
          }

          formattedErrors[field] = {
            errors: errorsObj
          };
        }
      }

      return formattedErrors;
    }
    /**
     * validate by trigger
     * @param {Array} ns names
     * @param {Function} cb callback after validate
     */

  }, {
    key: "validateCallback",
    value: function validateCallback(ns, cb) {
      var _this8 = this;

      var _getParams = (0, _utils.getParams)(ns, cb),
          names = _getParams.names,
          callback = _getParams.callback;

      var fieldNames = names || this.getNames();
      var descriptor = {};
      var values = {};
      var hasRule = false;

      for (var i = 0; i < fieldNames.length; i++) {
        var name = fieldNames[i];

        var field = this._get(name);

        if (!field) {
          continue;
        }

        if (field.rules && field.rules.length) {
          descriptor[name] = field.rules;
          values[name] = this.getValue(name);
          hasRule = true; // clear error

          field.errors = [];
          field.state = '';
        }
      }

      if (!hasRule) {
        var errors = this.formatGetErrors(fieldNames);
        callback && callback(errors, this.getValues(names ? fieldNames : []));
        return;
      }

      var validate = new _validate2.default(descriptor, {
        first: this.options.first,
        messages: this.options.messages
      });
      validate.validate(values, function (errors) {
        var errorsGroup = null;

        if (errors && errors.length) {
          errorsGroup = {};
          errors.forEach(function (e) {
            var fieldName = e.field;

            if (!errorsGroup[fieldName]) {
              errorsGroup[fieldName] = {
                errors: []
              };
            }

            var fieldErrors = errorsGroup[fieldName].errors;
            fieldErrors.push(e.message);
          });
        }

        if (errorsGroup) {
          // update error in every Field
          Object.keys(errorsGroup).forEach(function (i) {
            var field = _this8._get(i);

            if (field) {
              field.errors = (0, _utils.getErrorStrs)(errorsGroup[i].errors, _this8.processErrorMessage);
              field.state = 'error';
            }
          });
        }

        var formattedGetErrors = _this8.formatGetErrors(fieldNames);

        if (formattedGetErrors) {
          errorsGroup = (0, _extends2.default)({}, formattedGetErrors, errorsGroup);
        } // update to success which has no error


        for (var _i = 0; _i < fieldNames.length; _i++) {
          var _name = fieldNames[_i];

          var _field = _this8._get(_name);

          if (_field && _field.rules && !(errorsGroup && _name in errorsGroup)) {
            _field.state = 'success';
          }
        } // eslint-disable-next-line callback-return


        callback && callback(errorsGroup, _this8.getValues(names ? fieldNames : []));

        _this8._reRender();

        if (typeof _this8.afterValidateRerender === 'function') {
          _this8.afterValidateRerender({
            errorsGroup: errorsGroup,
            options: _this8.options,
            instance: _this8.instance
          });
        }
      });
    }
    /**
     * validate by trigger - Promise version
     * NOTES:
     * - `afterValidateRerender` is not called in `validatePromise`. The rerender is called just before this function
     *      returns a promise, so use the returned promise to call any after rerender logic.
     *
     * @param {Array} ns names
     * @param {Function} cb (Optional) callback after validate, must return a promise or a value
     *                  - ({errors, values}) => Promise({errors, values}) | {errors, values}
     * @returns {Promise} - resolves with {errors, values}
     */

  }, {
    key: "validatePromise",
    value: function () {
      var _validatePromise = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(ns, cb) {
        var _getParams2, names, callback, fieldNames, descriptor, values, hasRule, i, name, field, _errors, validate, results, errors, errorsGroup, callbackResults;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _getParams2 = (0, _utils.getParams)(ns, cb), names = _getParams2.names, callback = _getParams2.callback;
                fieldNames = names || this.getNames();
                descriptor = {};
                values = {};
                hasRule = false;
                i = 0;

              case 6:
                if (!(i < fieldNames.length)) {
                  _context.next = 15;
                  break;
                }

                name = fieldNames[i];
                field = this._get(name);

                if (field) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("continue", 12);

              case 11:
                if (field.rules && field.rules.length) {
                  descriptor[name] = field.rules;
                  values[name] = this.getValue(name);
                  hasRule = true; // clear error

                  field.errors = [];
                  field.state = '';
                }

              case 12:
                i++;
                _context.next = 6;
                break;

              case 15:
                if (hasRule) {
                  _context.next = 22;
                  break;
                }

                _errors = this.formatGetErrors(fieldNames);

                if (!callback) {
                  _context.next = 21;
                  break;
                }

                return _context.abrupt("return", callback({
                  errors: _errors,
                  values: this.getValues(names ? fieldNames : [])
                }));

              case 21:
                return _context.abrupt("return", {
                  errors: _errors,
                  values: this.getValues(names ? fieldNames : [])
                });

              case 22:
                validate = new _validate2.default(descriptor, {
                  first: this.options.first,
                  messages: this.options.messages
                });
                _context.next = 25;
                return validate.validatePromise(values);

              case 25:
                results = _context.sent;
                errors = results && results.errors || [];
                errorsGroup = this._getErrorsGroup({
                  errors: errors,
                  fieldNames: fieldNames
                });
                callbackResults = {
                  errors: errorsGroup,
                  values: this.getValues(names ? fieldNames : [])
                };
                _context.prev = 29;

                if (!callback) {
                  _context.next = 34;
                  break;
                }

                _context.next = 33;
                return callback(callbackResults);

              case 33:
                callbackResults = _context.sent;

              case 34:
                _context.next = 39;
                break;

              case 36:
                _context.prev = 36;
                _context.t0 = _context["catch"](29);
                return _context.abrupt("return", _context.t0);

              case 39:
                this._reRender();

                return _context.abrupt("return", callbackResults);

              case 41:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[29, 36]]);
      }));

      function validatePromise(_x, _x2) {
        return _validatePromise.apply(this, arguments);
      }

      return validatePromise;
    }()
  }, {
    key: "_getErrorsGroup",
    value: function _getErrorsGroup(_ref) {
      var _this9 = this;

      var errors = _ref.errors,
          fieldNames = _ref.fieldNames;
      var errorsGroup = null;

      if (errors && errors.length) {
        errorsGroup = {};
        errors.forEach(function (e) {
          var fieldName = e.field;

          if (!errorsGroup[fieldName]) {
            errorsGroup[fieldName] = {
              errors: []
            };
          }

          var fieldErrors = errorsGroup[fieldName].errors;
          fieldErrors.push(e.message);
        });
      }

      if (errorsGroup) {
        // update error in every Field
        Object.keys(errorsGroup).forEach(function (i) {
          var field = _this9._get(i);

          if (field) {
            field.errors = (0, _utils.getErrorStrs)(errorsGroup[i].errors, _this9.processErrorMessage);
            field.state = 'error';
          }
        });
      }

      var formattedGetErrors = this.formatGetErrors(fieldNames);

      if (formattedGetErrors) {
        errorsGroup = (0, _extends2.default)({}, formattedGetErrors, errorsGroup);
      } // update to success which has no error


      for (var i = 0; i < fieldNames.length; i++) {
        var name = fieldNames[i];

        var field = this._get(name);

        if (field && field.rules && !(errorsGroup && name in errorsGroup)) {
          field.state = 'success';
        }
      }

      return errorsGroup;
    }
  }, {
    key: "_reset",
    value: function _reset(ns, backToDefault) {
      var _this10 = this;

      if (typeof ns === 'string') {
        ns = [ns];
      }

      var changed = false;
      var names = ns || Object.keys(this.fieldsMeta);

      if (!ns) {
        this.values = {};
      }

      names.forEach(function (name) {
        var field = _this10._get(name);

        if (field) {
          changed = true;
          field.value = backToDefault ? field.initValue : undefined;
          field.state = '';
          delete field.errors;
          delete field.rules;
          delete field.rulesMap;

          if (_this10.options.parseName) {
            _this10.values = (0, _utils.setIn)(_this10.values, name, field.value);
          } else {
            _this10.values[name] = field.value;
          }
        }
      });

      if (changed) {
        this._reRender();
      }
    }
  }, {
    key: "reset",
    value: function reset(ns) {
      this._reset(ns, false);
    }
  }, {
    key: "resetToDefault",
    value: function resetToDefault(ns) {
      this._reset(ns, true);
    }
  }, {
    key: "getNames",
    value: function getNames() {
      var fieldsMeta = this.fieldsMeta;
      return Object.keys(fieldsMeta).filter(function () {
        return true;
      });
    }
  }, {
    key: "remove",
    value: function remove(ns) {
      var _this11 = this;

      if (typeof ns === 'string') {
        ns = [ns];
      }

      if (!ns) {
        this.values = {};
      }

      var names = ns || Object.keys(this.fieldsMeta);
      names.forEach(function (name) {
        if (name in _this11.fieldsMeta) {
          delete _this11.fieldsMeta[name];
        }

        if (_this11.options.parseName) {
          _this11.values = (0, _utils.deleteIn)(_this11.values, name);
        } else {
          delete _this11.values[name];
        }
      });
    }
  }, {
    key: "addArrayValue",
    value: function addArrayValue(key, index) {
      for (var _len5 = arguments.length, argv = new Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
        argv[_key5 - 2] = arguments[_key5];
      }

      return this._spliceArrayValue.apply(this, [key, index, 0].concat(argv));
    }
  }, {
    key: "deleteArrayValue",
    value: function deleteArrayValue(key, index) {
      var howmany = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      return this._spliceArrayValue(key, index, howmany);
    }
    /**
     * splice array
     * @param {String} key
     * @param {Number} startIndex
     * @param {Number} howmany
     * @param {Array} argv
     * @param {*} value
     */

  }, {
    key: "_spliceArrayValue",
    value: function _spliceArrayValue(key, index, howmany) {
      var _this12 = this;

      for (var _len6 = arguments.length, argv = new Array(_len6 > 3 ? _len6 - 3 : 0), _key6 = 3; _key6 < _len6; _key6++) {
        argv[_key6 - 3] = arguments[_key6];
      }

      var argc = argv.length;
      var offset = howmany - argc; // how the reset fieldMeta move

      var startIndex = index + howmany; // 计算起点

      /**
       * eg: call _spliceArrayValue('key', 1) to delete 'key.1':
       *   case 1: names=['key.0', 'key.1']; delete 'key.1';
       *   case 2: names=['key.0', 'key.1', 'key.2']; key.1= key.2; delete key.2;
       *   case 3: names=['key.0.name', 'key.0.email', 'key.1.name', 'key.1.email'], should delete 'key.1.name', 'key.1.email'
       * eg: call _spliceArrayValue('key', 1, item) to add 'key.1':
       *   case 1: names=['key.0']; add 'key.1' = item;
       *   case 2: names=['key.0', 'key.1']; key.2= key.1; delete key.1; add key.1 = item;
       */

      var listMap = {}; // eg: {1:[{from: 'key.2.name', to: 'key.1.name'}, {from: 'key.2.email', to: 'key.1.email'}]}

      var keyReg = new RegExp("^(".concat(key, ".)(\\d+)"));
      var replaceArgv = [];
      var names = this.getNames(); // logic of offset fix begin

      names.forEach(function (n) {
        var ret = keyReg.exec(n);

        if (ret) {
          var idx = parseInt(ret[2]); // get index of 'key.0.name'

          if (idx >= startIndex) {
            var l = listMap[idx];
            var item = {
              from: n,
              to: n.replace(keyReg, function (match, p1) {
                return "".concat(p1).concat(idx - offset);
              })
            };

            if (!l) {
              listMap[idx] = [item];
            } else {
              l.push(item);
            }
          } // in case of offsetList.length = 0, eg: delete last element


          if (offset > 0 && idx >= index && idx < index + howmany) {
            replaceArgv.push(n);
          }
        }
      }); // sort with index eg: [{index:1, list: [{from: 'key.2.name', to: 'key.1.name'}]}, {index:2, list: [...]}]

      var offsetList = Object.keys(listMap).map(function (i) {
        return {
          index: Number(i),
          list: listMap[i]
        };
      }).sort(function (a, b) {
        return offset > 0 ? a.index - b.index : b.index - a.index;
      });
      offsetList.forEach(function (l) {
        var list = l.list;
        list.forEach(function (i) {
          _this12.fieldsMeta[i.to] = _this12.fieldsMeta[i.from];
        });
      }); // delete copy data

      if (offsetList.length > 0) {
        var removeList = offsetList.slice(offsetList.length - (offset < 0 ? -offset : offset), offsetList.length);
        removeList.forEach(function (item) {
          item.list.forEach(function (i) {
            delete _this12.fieldsMeta[i.from];
          });
        });
      } else {
        // will get from this.values while rerender
        replaceArgv.forEach(function (i) {
          delete _this12.fieldsMeta[i];
        });
      }

      var p = this.getValue(key);

      if (p) {
        p.splice.apply(p, [index, howmany].concat(argv));
      }

      this._reRender();
    }
    /**
     * splice in a Array [deprecated]
     * @param {String} keyMatch like name.{index}
     * @param {Number} startIndex index
     */

  }, {
    key: "spliceArray",
    value: function spliceArray(keyMatch, startIndex, howmany) {
      var _this13 = this;

      if (keyMatch.match(/{index}$/) === -1) {
        (0, _utils.warning)('key should match /{index}$/');
        return;
      } // regex to match field names in the same target array


      var reg = keyMatch.replace('{index}', '(\\d+)');
      var keyReg = new RegExp("^".concat(reg));
      var listMap = {};
      /**
       * keyMatch='key.{index}'
       * case 1: names=['key.0', 'key.1'], should delete 'key.1'
       * case 2: names=['key.0.name', 'key.0.email', 'key.1.name', 'key.1.email'], should delete 'key.1.name', 'key.1.email'
       */

      var names = this.getNames();
      names.forEach(function (n) {
        // is name in the target array?
        var ret = keyReg.exec(n);

        if (ret) {
          var index = parseInt(ret[1]);

          if (index > startIndex) {
            var l = listMap[index];
            var item = {
              from: n,
              to: "".concat(keyMatch.replace('{index}', index - 1)).concat(n.replace(ret[0], ''))
            };

            if (!l) {
              listMap[index] = [item];
            } else {
              l.push(item);
            }
          }
        }
      });
      var idxList = Object.keys(listMap).map(function (i) {
        return {
          index: Number(i),
          list: listMap[i]
        };
      }).sort(function (a, b) {
        return a.index < b.index;
      }); // should be continuous array

      if (idxList.length > 0 && idxList[0].index === startIndex + 1) {
        idxList.forEach(function (l) {
          var list = l.list;
          list.forEach(function (i) {
            var v = _this13.getValue(i.from); // get index value


            _this13.setValue(i.to, v, false); // set value to index - 1

          });
        });
        var lastIdxList = idxList[idxList.length - 1];
        lastIdxList.list.forEach(function (i) {
          _this13.remove(i.from);
        });
        var parentName = keyMatch.replace('.{index}', '');
        parentName = parentName.replace('[{index}]', '');
        var parent = this.getValue(parentName);

        if (parent) {
          // if parseName=true then parent is an Array object but does not know an element was removed
          // this manually decrements the array length
          parent.length--;
        }
      }
    }
  }, {
    key: "_resetError",
    value: function _resetError(name) {
      var field = this._get(name);

      if (field) {
        delete field.errors; //清空错误

        field.state = '';
      }
    } //trigger rerender

  }, {
    key: "_reRender",
    value: function _reRender() {
      if (this.com) {
        if (!this.options.forceUpdate && this.com.setState) {
          this.com.setState({});
        } else if (this.com.forceUpdate) {
          this.com.forceUpdate(); //forceUpdate 对性能有较大的影响，成指数上升
        }
      }
    }
  }, {
    key: "_get",
    value: function _get(name) {
      return name in this.fieldsMeta ? this.fieldsMeta[name] : null;
    }
  }, {
    key: "get",
    value: function get(name) {
      if (name) {
        return this._get(name);
      } else {
        return this.fieldsMeta;
      }
    }
  }], [{
    key: "create",
    value: function create(com) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new this(com, options);
    }
  }, {
    key: "getUseField",
    value: function getUseField(_ref2) {
      var _this14 = this;

      var useState = _ref2.useState,
          useMemo = _ref2.useMemo;
      return function () {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var _useState = useState(),
            _useState2 = (0, _slicedToArray2.default)(_useState, 2),
            setState = _useState2[1];

        var field = useMemo(function () {
          return _this14.create({
            setState: setState
          }, options);
        }, [setState]);
        return field;
      };
    }
  }]);
  return Field;
}();

var _default = Field;
exports.default = _default;