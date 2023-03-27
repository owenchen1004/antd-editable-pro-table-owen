"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.BaseDialog = void 0;
var _space = _interopRequireDefault(require("antd/lib/space"));
var _button = _interopRequireDefault(require("antd/lib/button"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = _interopRequireWildcard(require("react"));
var _index = require("../index");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var BaseDialog = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(BaseDialog, _Component);
  function BaseDialog() {
    var _this$props$visible, _this$props;
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      visible: (_this$props$visible = (_this$props = _this.props) === null || _this$props === void 0 ? void 0 : _this$props.visible) !== null && _this$props$visible !== void 0 ? _this$props$visible : false
    };
    return _this;
  }
  var _proto = BaseDialog.prototype;
  _proto.show = function show() {
    var _this2 = this;
    return new Promise(function (resolve) {
      _this2.setState({
        visible: true
      }, function () {
        resolve(null);
      });
    });
  };
  _proto.hide = function hide() {
    var _this3 = this;
    return new Promise(function (resolve) {
      _this3.setState({
        visible: false
      }, function () {
        resolve(null);
      });
    });
  };
  _proto.hidden = function hidden() {
    return this.hide();
  };
  _proto.transformProps = function transformProps() {
    var _this4 = this,
      _this$props2,
      _this$props3;
    var onCancel = function onCancel(e) {
      var _this4$props, _this4$props$onCancel, _this4$props2, _this4$props2$onClose;
      (_this4$props = _this4.props) === null || _this4$props === void 0 ? void 0 : (_this4$props$onCancel = _this4$props.onCancel) === null || _this4$props$onCancel === void 0 ? void 0 : _this4$props$onCancel.call(_this4$props, e);
      (_this4$props2 = _this4.props) === null || _this4$props2 === void 0 ? void 0 : (_this4$props2$onClose = _this4$props2.onClose) === null || _this4$props2$onClose === void 0 ? void 0 : _this4$props2$onClose.call(_this4$props2, e);
      _this4.hide();
    };
    var innerProps = {
      visible: this.state.visible,
      footer: (_this$props2 = this.props) === null || _this$props2 === void 0 ? void 0 : _this$props2.footer,
      onCancel: onCancel,
      footerStyle: {
        textAlign: 'right'
      }
    };
    if (this.props.__designMode === 'design') {
      // 低代码编辑态中强制显示，将控制权交给引擎侧
      innerProps.visible = true;
    }
    var getActionHandler = function getActionHandler(action) {
      var _this4$props3;
      switch (action) {
        case 'submit':
          return (_this4$props3 = _this4.props) === null || _this4$props3 === void 0 ? void 0 : _this4$props3.onOk;
        case 'cancel':
          return onCancel;
        default:
          return function () {
            console.log('TODO：自定义');
          };
      }
    };
    if (((_this$props3 = this.props) === null || _this$props3 === void 0 ? void 0 : _this$props3.operations.length) === 0) {
      innerProps.footer = null;
    } else {
      var _this$props4, _this$props4$operatio;
      innerProps.footer = /*#__PURE__*/_react["default"].createElement(_space["default"], null, (_this$props4 = this.props) === null || _this$props4 === void 0 ? void 0 : (_this$props4$operatio = _this$props4.operations) === null || _this$props4$operatio === void 0 ? void 0 : _this$props4$operatio.map(function (item) {
        var _item$content;
        return /*#__PURE__*/_react["default"].createElement(_button["default"], {
          key: (0, _index.uuid)(),
          type: item === null || item === void 0 ? void 0 : item.type,
          onClick: getActionHandler(item === null || item === void 0 ? void 0 : item.action)
        }, (_item$content = item === null || item === void 0 ? void 0 : item.content) !== null && _item$content !== void 0 ? _item$content : '自定义');
      }));
    }
    return innerProps;
  };
  return BaseDialog;
}(_react.Component);
exports.BaseDialog = BaseDialog;