"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _proComponents = require("@ant-design/pro-components");
var _react = _interopRequireWildcard(require("react"));
var _index = require("../../shared/index");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable no-bitwise */
/* eslint-disable react/prop-types */
/* eslint-disable object-shorthand */
/* eslint-disable react-hooks/rules-of-hooks */
// export const actionRef = useRef<ActionType>();
var EditProTable = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(EditProTable, _Component);
  function EditProTable() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.actionRef = /*#__PURE__*/(0, _react.createRef)();
    return _this;
  }
  var _proto = EditProTable.prototype;
  _proto.componentDidMount = function componentDidMount() {
    // 把操作方法挂载到 class instance 上，可通过 this.$ 调用
    (0, _index.defineGetterProperties)(this, [this.actionRef]);
  };
  _proto.render = function render() {
    var _this2 = this,
      _toolbar$title,
      _toolbar$subTitle,
      _recordCreatorProps$p;
    var _this$props = this.props,
      rowKey = _this$props.rowKey,
      maxLength = _this$props.maxLength,
      controlled = _this$props.controlled,
      toolbar = _this$props.toolbar,
      recordCreatorProps = _this$props.recordCreatorProps,
      toolBarRender = _this$props.toolBarRender,
      toolBarRenderOpen = _this$props.toolBarRenderOpen,
      dataSource = _this$props.dataSource;
    var toolBarRenderFunc = function toolBarRenderFunc() {
      if (toolBarRenderOpen) {
        if (toolBarRender === false) {
          return null;
        } else {
          return toolBarRender;
        }
      } else {
        return false;
      }
    };
    var columData = function columData() {
      if (_this2.props.getColumnsByFunc === undefined) {
        return _this2.props.columns;
      } else {
        var funcColumns = _this2.props.getColumnsByFunc();
        var arrayColums = _this2.props.columns;
        var columnData = funcColumns === null || funcColumns === void 0 ? void 0 : funcColumns.concat(arrayColums);
        return columnData;
      }
    };
    return /*#__PURE__*/_react["default"].createElement(_proComponents.EditableProTable, (0, _extends2["default"])({}, this.props, {
      pagination: false,
      search: false,
      value: dataSource === undefined ? this.props.value : dataSource(),
      columns: columData(),
      toolBarRender: toolBarRenderFunc(),
      toolbar: {
        title: (_toolbar$title = toolbar === null || toolbar === void 0 ? void 0 : toolbar.title) !== null && _toolbar$title !== void 0 ? _toolbar$title : '',
        subTitle: (_toolbar$subTitle = toolbar === null || toolbar === void 0 ? void 0 : toolbar.subTitle) !== null && _toolbar$subTitle !== void 0 ? _toolbar$subTitle : ''
      }
      // EditableProTable Props
      ,
      onChange: this.props.onChange,
      recordCreatorProps: {
        position: (_recordCreatorProps$p = recordCreatorProps === null || recordCreatorProps === void 0 ? void 0 : recordCreatorProps.position) !== null && _recordCreatorProps$p !== void 0 ? _recordCreatorProps$p : 'bottom',
        record: function record() {
          var _ref;
          return _ref = {}, _ref[rowKey] = (Math.random() * 1e6 >> 0).toString(36), _ref;
        }
      },
      maxLength: maxLength,
      controlled: controlled,
      actionRef: this.actionRef
    }));
  };
  return EditProTable;
}(_react.Component);
var _default = EditProTable;
exports["default"] = _default;