import _Space from "antd/es/space";
import _Button from "antd/es/button";
import * as React from 'react';
import { uuid } from "../";
var useState = React.useState,
  useImperativeHandle = React.useImperativeHandle;

// 高级 modal (pro-drawer + pro-modal) 逻辑复用 hook
/**
 * ref 会被覆盖，导致无法选中组件
 * @deprecated
 */
export var useModal = function useModal(props, ref) {
  var _props$visible;
  var _useState = useState((_props$visible = props === null || props === void 0 ? void 0 : props.visible) !== null && _props$visible !== void 0 ? _props$visible : false),
    visible = _useState[0],
    setvisible = _useState[1];
  var _useState2 = useState(props === null || props === void 0 ? void 0 : props.footer),
    footer = _useState2[0],
    setFooter = _useState2[1];
  var onCancel = function onCancel(e) {
    var _props$onCancel, _props$onClose;
    props === null || props === void 0 ? void 0 : (_props$onCancel = props.onCancel) === null || _props$onCancel === void 0 ? void 0 : _props$onCancel.call(props, e);
    props === null || props === void 0 ? void 0 : (_props$onClose = props.onClose) === null || _props$onClose === void 0 ? void 0 : _props$onClose.call(props, e);
    setvisible(false);
  };
  useImperativeHandle(ref, function () {
    return {
      show: function show() {
        setvisible(true);
      },
      hide: function hide() {
        onCancel();
      },
      hidden: function hidden() {
        onCancel();
      }
    };
  });
  var innerProps = {
    visible: visible,
    footer: footer,
    onCancel: onCancel
  };
  if (props.__designMode === 'design') {
    // 低代码编辑态中强制显示，将控制权交给引擎侧
    innerProps.visible = true;
  }
  var getActionHandler = function getActionHandler(action) {
    switch (action) {
      case 'submit':
        return props === null || props === void 0 ? void 0 : props.onOk;
      case 'cancel':
        return onCancel;
      default:
        return function () {
          console.log('TODO：自定义');
        };
    }
  };
  if ((props === null || props === void 0 ? void 0 : props.operations.length) === 0) {
    innerProps.footer = null;
  } else {
    var _props$operations;
    innerProps.footer = /*#__PURE__*/React.createElement(_Space, {
      style: {
        textAlign: 'right'
      }
    }, props === null || props === void 0 ? void 0 : (_props$operations = props.operations) === null || _props$operations === void 0 ? void 0 : _props$operations.map(function (item) {
      var _item$content;
      return /*#__PURE__*/React.createElement(_Button, {
        key: uuid(),
        type: item === null || item === void 0 ? void 0 : item.type,
        onClick: getActionHandler(item === null || item === void 0 ? void 0 : item.action)
      }, (_item$content = item === null || item === void 0 ? void 0 : item.content) !== null && _item$content !== void 0 ? _item$content : '自定义');
    }));
  }
  return {
    innerProps: innerProps
  };
};