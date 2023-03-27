/*!
 * jsx2mp-runtime.ali.js v0.4.25
 * (c) 2019-2021 Rax Team
 * Released under the BSD-3-Clause License.
 */
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

var COMPONENT_WILL_MOUNT = 'componentWillMount';
var RENDER = 'render';
var COMPONENT_DID_MOUNT = 'componentDidMount';
var COMPONENT_WILL_UNMOUNT = 'componentWillUnmount';
var COMPONENT_WILL_RECEIVE_PROPS = 'componentWillReceiveProps';
var COMPONENT_WILL_UPDATE = 'componentWillUpdate';
var COMPONENT_DID_UPDATE = 'componentDidUpdate';
var ON_LAUNCH = 'onLaunch';
var ON_ERROR = 'onError';
var ON_SHOW = 'onShow';
var ON_HIDE = 'onHide';
var ON_SHARE_APP_MESSAGE = 'onShareAppMessage';
var EVENTS_LIST = ['onBack', 'onKeyboardHeight', 'onOptionMenuClick', 'onPopMenuClick', 'onPullDownRefresh', 'onPullIntercept', 'onTitleClick', 'onTabItemTap', 'beforeTabItemTap', 'onResize'];

var cycles = {};
function useAppEffect(cycle, callback) {
  switch (cycle) {
    case ON_LAUNCH:
    case ON_SHOW:
    case ON_HIDE:
    case ON_ERROR:
      cycles[cycle] = cycles[cycle] || [];
      cycles[cycle].push(callback);
      break;
    case ON_SHARE_APP_MESSAGE:
      cycles[cycle] = cycles[cycle] || [];
      if (cycles[cycle].length > 1) {
        console.warn('useAppShare can only receive one callback function.');
      } else {
        cycles[cycle].push(callback);
      }
      break;
    default:
      throw new Error('Unsupported app cycle ' + cycle);
  }
}
function useAppLaunch(callback) {
  return useAppEffect(ON_LAUNCH, callback);
}
function useAppShare(callback) {
  return useAppEffect(ON_SHARE_APP_MESSAGE, callback);
}
function useAppShow(callback) {
  return useAppEffect(ON_SHOW, callback);
}
function useAppHide(callback) {
  return useAppEffect(ON_HIDE, callback);
}
function useAppError(callback) {
  return useAppEffect(ON_ERROR, callback);
}

var Host = {
  current: null,
  isUpdating: false
};

var nextTick = typeof my === 'object' && my.nextTick ? my.nextTick : setTimeout;
if (typeof process !== 'undefined' && "production" !== 'production') {
  nextTick = function nextTick(callback) {
    setTimeout(callback, 0);
  };
}
var nextTick$1 = nextTick;

var queue = [];
function enqueueRender(component) {
  if (!component.__isQueued && (component.__isQueued = true) && queue.push(component) === 1) {
    nextTick$1(rerender);
  }
}
function rerender() {
  var list = queue;
  queue = [];
  var component;
  while (component = list.pop()) {
    if (component.__isQueued) {
      component._updateComponent();
      component.__isQueued = false;
    }
  }
}

var apiCore;
{
  apiCore = my;
}
function redirectTo(options) {
  {
    apiCore.redirectTo(options);
  }
}
function navigateTo(options) {
  {
    apiCore.navigateTo(options);
  }
}
function navigateBack(options) {
  {
    apiCore.navigateBack(options);
  }
}
var __routerMap = {};
function __updateRouterMap(appConfig) {
  appConfig.routes && appConfig.routes.map(function (route) {
    {
      __routerMap[route.path] = route.source;
    }
  });
}
function withRouter(Component) {
  Component.__injectHistory = true;
  return Component;
}
function push(path, query) {
  return navigateTo({
    url: generateUrl(path, query)
  });
}
function replace(path, query) {
  return redirectTo({
    url: generateUrl(path, query)
  });
}
function go() {
  throw new Error('Unsupported go in miniapp.');
}
function goBack(n) {
  if (n === void 0) {
    n = 1;
  }
  return navigateBack({
    delta: n
  });
}
function goForward() {
  throw new Error('Unsupported goForward in miniapp.');
}
function canGo() {
  return true;
}
function generateUrl(path, query) {
  var _path$split = path.split('?'),
      pathname = _path$split[0],
      search = _path$split[1];
  var miniappPath = __routerMap[pathname];
  if (!miniappPath) {
    throw new Error("Path " + path + " is not found");
  }
  if (query) {
    if (search) {
      search += "&" + stringifyQuery(query);
    } else {
      search = stringifyQuery(query);
    }
  }
  return search ? "/" + miniappPath + "?" + search : "/" + miniappPath;
}
function stringifyQuery(query) {
  return Object.keys(query).reduce(function (total, nextKey, index) {
    return "" + total + (index ? '&' : '') + nextKey + "=" + query[nextKey];
  }, '');
}

var history;
function createMiniAppHistory() {
  if (history) return history;
  return history = new MiniAppHistory();
}
function getMiniAppHistory() {
  return history;
}
function getSearchParams() {
  if (history && history.location) {
    return history.location._currentPageOptions;
  }
}
var MiniAppHistory = function () {
  function MiniAppHistory() {
    this.location = new Location();
    Object.assign(this, {
      push: push,
      replace: replace,
      goBack: goBack,
      go: go,
      canGo: canGo,
      goForward: goForward
    });
  }
  _createClass(MiniAppHistory, [{
    key: "length",
    get: function get() {
      {
        return getCurrentPages().length;
      }
    }
  }]);
  return MiniAppHistory;
}();
var Location = function () {
  function Location() {
    this._currentPageOptions = {};
    this.hash = '';
  }
  var _proto = Location.prototype;
  _proto.__updatePageOption = function __updatePageOption(pageOptions) {
    this._currentPageOptions = pageOptions;
  };
  _proto.__updatePageId = function __updatePageId(pageId) {
    this._pageId = pageId;
  };
  _createClass(Location, [{
    key: "href",
    get: function get() {
      return this.pathname + this.search;
    }
  }, {
    key: "search",
    get: function get() {
      var _this = this;
      var search = '';
      Object.keys(this._currentPageOptions).forEach(function (key, index) {
        var query = key + "=" + _this._currentPageOptions[key];
        search += index === 0 ? '?' : '&';
        search += query;
      });
      return search;
    }
  }, {
    key: "pathname",
    get: function get() {
      {
        var pages = getCurrentPages();
        if (pages.length === 0) return '';
        var currentPage = pages[pages.length - 1];
        return addLeadingSlash(currentPage.route);
      }
    }
  }]);
  return Location;
}();
function addLeadingSlash(str) {
  return str[0] === '/' ? str : '/' + str;
}

var propsMap = {};
var nextPropsMap = {};
var componentIntances = {};
var updateChildPropsCallbacks = {};
function setComponentInstance(instance) {
  var instanceId = instance.instanceId;
  componentIntances[instanceId] = instance;
  if (updateChildPropsCallbacks[instanceId]) {
    updateChildPropsCallbacks[instanceId]();
    updateChildPropsCallbacks[instanceId] = null;
  }
}
function setComponentProps(instanceId) {
  if (nextPropsMap.hasOwnProperty(instanceId)) {
    propsMap[instanceId] = nextPropsMap[instanceId];
  }
}
function getComponentProps(instanceId) {
  if (propsMap.hasOwnProperty(instanceId)) return propsMap[instanceId];else return null;
}
function removeComponentProps(instanceId) {
  if (propsMap.hasOwnProperty(instanceId)) {
    delete propsMap[instanceId];
  }
}
function updateChildProps(trigger, instanceId, nextUpdateProps) {
  if (trigger) {
    var targetComponent = componentIntances[instanceId];
    if (targetComponent) {
      var nextProps = Object.assign({
        "__tagId": instanceId
      }, targetComponent.props, nextUpdateProps);
      if (targetComponent.__injectHistory) {
        var history = getMiniAppHistory();
        Object.assign(nextProps, {
          history: history,
          location: history.location
        });
      }
      if (targetComponent.__mounted) {
        targetComponent.nextProps = nextPropsMap[instanceId] = nextProps;
        trigger._pendingCallbacks.push(function () {
          enqueueRender(targetComponent);
        });
      } else {
        targetComponent.props = propsMap[instanceId] = nextProps;
      }
    } else {
      nextPropsMap[instanceId] = nextUpdateProps;
      updateChildPropsCallbacks[instanceId] = updateChildProps.bind(null, trigger, instanceId, nextUpdateProps);
    }
  }
}

function isNull(obj) {
  return obj === null;
}
function isUndef(value) {
  return value === undefined;
}
function isFunction(obj) {
  return typeof obj === 'function';
}
function isObject(obj) {
  return typeof obj === 'object';
}
function isPlainObject(obj) {
  return EMPTY_OBJECT.toString.call(obj) === '[object Object]';
}
function isArray(array) {
  return Array.isArray(array);
}
function isString(string) {
  return typeof string === 'string';
}
function isNumber(string) {
  return typeof string === 'number';
}
function isEmptyObj(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}
var EMPTY_OBJECT = {};

var effectCallbacks = [];
function scheduleEffect(callback) {
  if (effectCallbacks.length === 0) {
    nextTick$1(invokeEffects);
  }
  effectCallbacks.push(callback);
}
function invokeEffects() {
  var callbacks = effectCallbacks;
  if (callbacks.length !== 0) {
    effectCallbacks = [];
    callbacks.forEach(function (callback) {
      return callback();
    });
  }
}

var hasOwnProperty = EMPTY_OBJECT.hasOwnProperty;
function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }
  if (!isObject(objA) || isNull(objA) || !isObject(objB) || isNull(objB)) {
    return false;
  }
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}

function createRef (initialValue) {
  var created = false;
  var ref = {
    current: initialValue
  };
  ref.__proto__ = Function.prototype;
  var refFn = function refFn(instance, immobile) {
    if (!created || !immobile) {
      {
        ref.current = instance;
      }
    }
    created = true;
  };
  refFn.__proto__ = ref;
  return refFn;
}

function getCurrentInstance() {
  return Host.current;
}
function getCurrentRenderingInstance() {
  var currentInstance = getCurrentInstance();
  if (currentInstance) {
    return currentInstance;
  } else {
    throw Error('Hooks can only be called inside a component.');
  }
}
function areInputsEqual(inputs, prevInputs) {
  if (isNull(prevInputs) || inputs.length !== prevInputs.length) {
    return false;
  }
  for (var i = 0; i < inputs.length; i++) {
    if (is(inputs[i], prevInputs[i])) {
      continue;
    }
    return false;
  }
  return true;
}
function setWrapperRef(instance, ref, create) {
  if (!isNull(ref)) {
    ref.current = create();
    return function () {
      ref.current = null;
    };
  }
}
function useState(initialState) {
  var currentInstance = getCurrentRenderingInstance();
  var hookID = currentInstance.getHookID();
  var hooks = currentInstance.getHooks();
  if (!hooks[hookID]) {
    if (isFunction(initialState)) {
      initialState = initialState();
    }
    var setState = function setState(newState) {
      {
        invokeEffects();
      }
      var hook = hooks[hookID];
      var eagerState = hook[2];
      if (isFunction(newState)) {
        newState = newState(eagerState);
      }
      if (!is(newState, eagerState)) {
        hook[2] = newState;
        currentInstance.__shouldUpdate = true;
        enqueueRender(currentInstance);
      }
    };
    hooks[hookID] = [initialState, setState, initialState];
  }
  var hook = hooks[hookID];
  if (!is(hook[0], hook[2])) {
    hook[0] = hook[2];
    currentInstance.__shouldUpdate = true;
  }
  return hook;
}
function useContext(context) {
  var currentInstance = getCurrentRenderingInstance();
  return currentInstance._readContext(context);
}
function useEffect(effect, inputs) {
  useEffectImpl(effect, inputs, true);
}
function useLayoutEffect(effect, inputs) {
  useEffectImpl(effect, inputs);
}
function useEffectImpl(effect, inputs, defered) {
  var currentInstance = getCurrentRenderingInstance();
  var hookID = currentInstance.getHookID();
  var hooks = currentInstance.getHooks();
  inputs = inputs === undefined ? null : inputs;
  if (!hooks[hookID]) {
    var create = function create(immediately) {
      if (!immediately && defered) return scheduleEffect(function () {
        return create(true);
      });
      var current = create.current;
      if (current) {
        destory.current = current();
        create.current = null;
      }
    };
    var destory = function destory(immediately) {
      if (!immediately && defered) return scheduleEffect(function () {
        return destory(true);
      });
      var current = destory.current;
      if (current) {
        current();
        destory.current = null;
      }
    };
    create.current = effect;
    hooks[hookID] = {
      create: create,
      destory: destory,
      prevInputs: inputs,
      inputs: inputs
    };
    currentInstance._registerLifeCycle(COMPONENT_DID_MOUNT, create);
    currentInstance._registerLifeCycle(COMPONENT_WILL_UNMOUNT, destory);
    currentInstance._registerLifeCycle(COMPONENT_DID_UPDATE, function () {
      var _hooks$hookID = hooks[hookID],
          prevInputs = _hooks$hookID.prevInputs,
          inputs = _hooks$hookID.inputs,
          create = _hooks$hookID.create;
      if (isNull(inputs) || !areInputsEqual(inputs, prevInputs)) {
        destory();
        create();
      }
    });
  } else {
    var hook = hooks[hookID];
    var _create = hook.create,
        prevInputs = hook.inputs,
        _destory = hook.destory;
    hook.inputs = inputs;
    hook.prevInputs = prevInputs;
    _create.current = effect;
  }
}
function useImperativeHandle(ref, create, inputs) {
  var nextInputs = !isNull(inputs) && !isUndef(inputs) ? inputs.concat([ref]) : null;
  var currentInstance = getCurrentRenderingInstance();
  var mounted = currentInstance.__mounted;
  var willUnmountFn;
  if (!currentInstance.mounted) {
    willUnmountFn = setWrapperRef(currentInstance, ref, create);
  }
  useLayoutEffect(function () {
    if (mounted) {
      willUnmountFn = setWrapperRef(currentInstance, ref, create);
    }
    return willUnmountFn;
  }, nextInputs);
}
function useRef(initialValue, name) {
  var currentInstance = getCurrentRenderingInstance();
  var hookID = currentInstance.getHookID();
  var hooks = currentInstance.getHooks();
  if (!hooks[hookID]) {
    hooks[hookID] = createRef(initialValue);
  }
  return hooks[hookID];
}
function useCallback(callback, inputs) {
  return useMemo(function () {
    return callback;
  }, inputs);
}
function useMemo(create, inputs) {
  var currentInstance = getCurrentRenderingInstance();
  var hookID = currentInstance.getHookID();
  var hooks = currentInstance.getHooks();
  inputs = inputs === undefined ? null : inputs;
  if (!hooks[hookID]) {
    hooks[hookID] = [create(), inputs];
  } else {
    var prevInputs = hooks[hookID][1];
    if (inputs === null || !areInputsEqual(inputs, prevInputs)) {
      hooks[hookID] = [create(), inputs];
    }
  }
  return hooks[hookID][0];
}
function useReducer(reducer, initialArg, init) {
  var currentInstance = getCurrentRenderingInstance();
  var hookID = currentInstance.getHookID();
  var hooks = currentInstance.getHooks();
  if (!hooks[hookID]) {
    var initialState = init !== undefined ? init(initialArg) : initialArg;
    var dispatch = function dispatch(action) {
      {
        invokeEffects();
      }
      var hook = hooks[hookID];
      var queue = hook[2];
      var currentState = queue.eagerState;
      var eagerReducer = queue.eagerReducer;
      var eagerState = eagerReducer(currentState, action);
      if (is(eagerState, currentState)) {
        return;
      }
      queue.actions.push(action);
      queue.eagerState = eagerState;
      currentInstance.__forceUpdate = true;
      enqueueRender(currentInstance);
    };
    return hooks[hookID] = [initialState, dispatch, {
      actions: [],
      eagerReducer: reducer,
      eagerState: initialState
    }];
  }
  var hook = hooks[hookID];
  var queue = hook[2];
  var next = hook[0];
  if (currentInstance._reRenders > 0) {
    for (var i = 0; i < queue.actions.length; i++) {
      next = reducer(next, queue.actions[i]);
    }
  } else {
    next = queue.eagerState;
  }
  if (!is(next, hook[0])) {
    hook[0] = next;
    currentInstance.__shouldUpdate = true;
  }
  queue.eagerReducer = reducer;
  queue.eagerState = next;
  queue.actions.length = 0;
  return hooks[hookID];
}

var pageInstanceMap = {};
function setPageInstance(pageInstance) {
  var pageId = pageInstance.instanceId;
  pageInstanceMap[pageId] = pageInstance;
}
function getPageInstanceById(pageId) {
  if (pageInstanceMap.hasOwnProperty(pageId)) {
    return pageInstanceMap[pageId];
  }
  return null;
}

var version = '0.4.0 (Warning: The current version in miniapp belongs to jsx2mp-runtime rather than Rax. Please pay attention to the difference.)';
var modernMode = true;
function setModernMode(val) {
  modernMode = val;
}
function getModernMode() {
  return modernMode;
}

var cycles$1 = {};
function addPageLifeCycle(cycle, callback) {
  var history = getMiniAppHistory();
  var pageId = history && history.location._pageId;
  if (!cycles$1[pageId]) {
    cycles$1[pageId] = {};
  }
  if (!cycles$1[pageId][cycle]) {
    cycles$1[pageId][cycle] = [];
  }
  cycles$1[pageId][cycle].push(callback);
  var pageInstance = getPageInstanceById(pageId);
  if (!pageInstance._internal[cycle]) {
    pageInstance._internal[cycle] = function (e) {
      return pageInstance._trigger(cycle, e);
    };
  }
}
function usePageEffect(cycle, callback) {
  if (isFunction(callback)) {
    switch (cycle) {
      case ON_SHOW:
      case ON_HIDE:
        useEffect(function () {
          if (( getModernMode()) && cycle === ON_SHOW) {
            callback();
          }
          addPageLifeCycle(cycle, callback);
        }, []);
        break;
      default:
        throw new Error('Unsupported page cycle ' + cycle);
    }
  }
}
function usePageShow(callback) {
  return usePageEffect(ON_SHOW, callback);
}
function usePageHide(callback) {
  return usePageEffect(ON_HIDE, callback);
}
function withPageLifeCycle(Klass) {
  return function (_Klass) {
    _inheritsLoose(_class, _Klass);
    function _class() {
      var _this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _Klass.call.apply(_Klass, [this].concat(args)) || this;
      [ON_SHOW, ON_HIDE].forEach(function (cycle) {
        if (isFunction(_this[cycle])) {
          addPageLifeCycle(cycle, _this[cycle]);
        }
      });
      return _this;
    }
    return _class;
  }(Klass);
}

var apiCore$1;
{
  apiCore$1 = my;
}
var apiCore$2 = apiCore$1;

function attachRef (instance, bindComRef) {
  if (bindComRef) {
    if (instance.__isReactiveComponent && !instance._render._forwardRef) {
      console.warn('Warning: Do not attach ref to function component because they don’t have instances.');
    }
    triggerSetRef(instance, bindComRef);
  }
}
function triggerSetRef(instance, bindComRef) {
  var current = instance.__isReactiveComponent ? null : instance;
  {
    bindComRef(current);
  }
}

var Events = function () {
  function Events() {
    this._callbacks = {};
  }
  var _proto = Events.prototype;
  _proto.on = function on(event, handler) {
    (this._callbacks[event] || (this._callbacks[event] = [])).push(handler);
    return this;
  };
  _proto.off = function off(event, handler) {
    if (!arguments) {
      this._callbacks = Object.create(null);
    }
    var eventCallbacks = this._callbacks[event];
    if (!eventCallbacks) {
      return this;
    }
    if (!handler) {
      this._callbacks[event] = null;
      return this;
    }
    var callback;
    var i = eventCallbacks.length;
    while (i--) {
      callback = eventCallbacks[i];
      if (callback === handler) {
        eventCallbacks.splice(i, 1);
        break;
      }
    }
    return this;
  };
  _proto.emit = function emit(event) {
    var _this = this;
    var callbacks = this._callbacks[event];
    if (callbacks) {
      var args = [].slice.call(arguments, 1);
      callbacks.forEach(function (callback) {
        return callback.apply(_this, args);
      });
    }
    return this;
  };
  return Events;
}();

var event = new Events();
var Component = function () {
  function Component(props) {
    var _this = this;
    _defineProperty(this, "setState", function (partialState, callback) {
      if (partialState != null) {
        _this._pendingStates.push(partialState);
      }
      if (isFunction(callback)) {
        _this._pendingCallbacks.push(callback);
      }
      enqueueRender(_this);
    });
    _defineProperty(this, "forceUpdate", function (callback) {
      if (isFunction(callback)) {
        _this._pendingCallbacks.push(callback);
      }
      _this._updateComponent();
    });
    _defineProperty(this, "_cycles", {});
    this.state = {};
    this.props = props;
    this.refs = {};
    this.__dependencies = {};
    this.__mounted = false;
    this.__shouldUpdate = false;
    this._methods = {};
    this._hooks = {};
    this.hooks = [];
    this._hookID = 0;
    this._keyCache = new Set();
    this.__nativeEventMap = {};
    this._pendingStates = [];
    this._pendingCallbacks = [];
    nextTick$1(function () {
      attachRef(_this, _this.props.bindComRef || _this.props.ref);
    });
  }
  var _proto = Component.prototype;
  _proto.getHooks = function getHooks() {
    return this._hooks;
  };
  _proto.getHookID = function getHookID() {
    return ++this._hookID;
  };
  _proto._registerLifeCycle = function _registerLifeCycle(cycle, fn) {
    var currentCycles = this._cycles[cycle] = this._cycles[cycle] || [];
    currentCycles.push(fn);
  };
  _proto._clearKeyCache = function _clearKeyCache() {
    this._keyCache = new Set();
  }
  ;
  _proto._getUniqKey = function _getUniqKey(namespace, key, index) {
    if (typeof key === 'number' || typeof key === 'string') {
      var tagId = namespace + "-" + key;
      if (!this._keyCache.has(tagId)) {
        this._keyCache.add(tagId);
        return tagId;
      }
    }
    return namespace + "-idx_" + index;
  }
  ;
  _proto._updateData = function _updateData(data) {
    if (!this._internal) return;
    data.$ready = true;
    data["__tagId"] = this.props["__tagId"];
    this.__updating = true;
    this._setData(data);
  };
  _proto._updateMethods = function _updateMethods(methods) {
    Object.assign(this._methods, methods);
  };
  _proto._updateChildProps = function _updateChildProps(tagId, props) {
    var chlidInstanceId = this.props["__tagId"] + "-" + tagId;
    updateChildProps(this, chlidInstanceId, props);
  };
  _proto._registerRefs = function _registerRefs(refs) {
    var _this2 = this;
    refs.forEach(function (_ref) {
      var name = _ref.name,
          method = _ref.method,
          type = _ref.type,
          id = _ref.id;
      {
        if (type === 'component') {
          _this2._internal[name] = method;
          if (_this2._internal.selectComponent) {
            var instance = _this2._internal.selectComponent("#" + id);
            _this2.refs[name] = {
              current: instance
            };
            if (isFunction(method)) {
              method(instance, false);
            }
          } else {
            _this2.refs[name] = method;
          }
        } else {
          var _instance = apiCore$2.createSelectorQuery().select("#" + id);
          _this2.refs[name] = {
            current: _instance
          };
          if (isFunction(method)) {
            method(_instance, false);
          }
        }
      }
    });
  };
  _proto._collectState = function _collectState() {
    var state = Object.assign({}, this.state);
    var parialState;
    while (parialState = this._pendingStates.shift()) {
      if (isNull(parialState)) continue;
      if (isFunction(parialState)) {
        Object.assign(state, parialState.call(this, state, this.props));
      } else {
        Object.assign(state, parialState);
      }
    }
    return state;
  };
  _proto._readContext = function _readContext(context) {
    var _this3 = this;
    var Provider = context.Provider;
    var contextProp = Provider.contextProp;
    var contextItem = this.__dependencies[contextProp];
    if (!contextItem) {
      var readEmitter = Provider.readEmitter;
      var contextEmitter = readEmitter();
      contextItem = {
        emitter: contextEmitter,
        renderedContext: contextEmitter.value
      };
      var contextUpdater = function contextUpdater(newContext) {
        if (!is(newContext, contextItem.renderedContext)) {
          _this3.__shouldUpdate = true;
          _this3._updateComponent();
        }
      };
      contextItem.emitter.on(contextUpdater);
      this._registerLifeCycle(COMPONENT_WILL_UNMOUNT, function () {
        contextItem.emitter.off(contextUpdater);
      });
      this.__dependencies[contextProp] = contextItem;
    }
    return contextItem.renderedContext = contextItem.emitter.value;
  };
  _proto._injectContextType = function _injectContextType() {
    var contextType = this.constructor.contextType;
    if (contextType) {
      this.context = this._readContext(contextType);
    }
  };
  _proto._mountComponent = function _mountComponent() {
    if (this.__getDerivedStateFromProps) {
      var getDerivedStateFromProps = this.__getDerivedStateFromProps;
      var partialState = getDerivedStateFromProps(this.props, this.state);
      if (partialState) this.state = Object.assign({}, partialState);
    }
    this._trigger(COMPONENT_WILL_MOUNT);
    this._trigger(RENDER);
    if (!this.__mounted) {
      this.__mounted = true;
    }
    this.prevProps = this.props;
    this.prevState = this.state;
  };
  _proto._updateComponent = function _updateComponent() {
    if (!this.__mounted) return;
    var nextProps = this.nextProps || this.props;
    var prevProps = this.props || this.prevProps;
    if (!shallowEqual(prevProps, nextProps)) {
      this._trigger(COMPONENT_WILL_RECEIVE_PROPS, nextProps);
    }
    var nextState = this._collectState();
    var prevState = this.prevState || this.state;
    var stateFromProps;
    if (this.__getDerivedStateFromProps) {
      var getDerivedStateFromProps = this.__getDerivedStateFromProps;
      var partialState = getDerivedStateFromProps(nextProps, prevState);
      if (partialState) stateFromProps = Object.assign({}, partialState);
    }
    if (stateFromProps !== undefined) nextState = stateFromProps;
    this.__shouldUpdate = this.__forceUpdate || (this.shouldComponentUpdate ? this.shouldComponentUpdate(nextProps, nextState) : true);
    if (this.__shouldUpdate) {
      this._trigger(COMPONENT_WILL_UPDATE, nextProps, nextState);
      this.prevProps = this.props;
      this.prevState = this.state;
      setComponentProps(this.instanceId);
      this.props = nextProps;
      this.state = nextState;
      this.__prevForwardRef = this._forwardRef;
      this._forwardRef = nextProps.bindComRef;
      this.__forceUpdate = false;
      this._trigger(RENDER);
      this._trigger(COMPONENT_DID_UPDATE, prevProps, prevState);
      this.__shouldUpdate = false;
    }
  };
  _proto._unmountComponent = function _unmountComponent() {
    this._trigger(COMPONENT_WILL_UNMOUNT);
    this.hooks.forEach(function (hook) {
      if (isFunction(hook.destory)) hook.destory();
    });
    this.__nativeEventMap = {};
    this._internal.instance = null;
    this._internal = null;
    this.__mounted = false;
    removeComponentProps(this.instanceId);
  };
  _proto._emitRenderPropsUpdate = function _emitRenderPropsUpdate(name, args) {
    event.emit(name, args);
  };
  _proto._onRenderPropsUpdate = function _onRenderPropsUpdate(name, handler) {
    var _this4 = this;
    var updateCallback = function updateCallback(newState) {
      if (!is(_this4["_" + name], newState)) {
        handler.call(_this4, newState);
        _this4.__shouldUpdate = true;
        if (!_this4.__mounted) {
          _this4._mountComponent();
        } else {
          _this4._updateComponent();
        }
      }
    };
    this._registerLifeCycle(COMPONENT_WILL_UNMOUNT, function () {
      event.off(updateCallback);
    });
    event.on(name, updateCallback);
  }
  ;
  _proto._trigger = function _trigger(cycle) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var pageId = this.instanceId;
    switch (cycle) {
      case COMPONENT_WILL_MOUNT:
      case COMPONENT_DID_MOUNT:
      case COMPONENT_WILL_RECEIVE_PROPS:
      case COMPONENT_WILL_UPDATE:
      case COMPONENT_DID_UPDATE:
      case COMPONENT_WILL_UNMOUNT:
      case ON_SHOW:
      case ON_HIDE:
        if (isFunction(this[cycle])) this[cycle].apply(this, args);
        if (this._cycles.hasOwnProperty(cycle)) {
          this._cycles[cycle].forEach(function (fn) {
            return fn.apply(void 0, args);
          });
        }
        if (cycles$1[pageId] && cycles$1[pageId][cycle]) {
          cycles$1[pageId][cycle].forEach(function (fn) {
            return fn.apply(void 0, args);
          });
        }
        break;
      case RENDER:
        if (!isFunction(this.render)) throw new Error('It seems component have no render method.');
        Host.current = this;
        this._hookID = 0;
        var nextProps = args[0] || this.props;
        var nextState = args[1] || this.state;
        this._injectContextType();
        this.render(this.props = nextProps, this.state = nextState);
        break;
    }
  }
  ;
  _proto._setData = function _setData(data) {
    var _this5 = this;
    var setDataTask = [];
    var $ready = false;
    if (this._internal.$spliceData) {
      var currentData = this._internal.data;
      var arrayData = {};
      var normalData = {};
      for (var key in data) {
        if (isArray(data[key]) && isArray(currentData[key]) && isAppendArray(currentData[key], data[key])) {
          arrayData[key] = [currentData[key].length, 0].concat(data[key].slice(currentData[key].length));
        } else if (isDifferentData(currentData[key], data[key])) {
          if (isPlainObject(data[key])) {
            normalData[key] = Object.assign({}, currentData[key], data[key]);
          } else {
            normalData[key] = data[key] === undefined ? null : data[key];
          }
        }
      }
      if (!isEmptyObj(normalData)) {
        $ready = normalData.$ready;
        setDataTask.push(function (callback) {
          _this5._internal.setData(normalData, callback);
        });
      }
      if (!isEmptyObj(arrayData)) {
        setDataTask.push(function (callback) {
          _this5._internal.$spliceData(arrayData, callback);
        });
      }
    } else {
      var _normalData = {};
      for (var _key3 in data) {
        if (isDifferentData(this._internal.data[_key3], data[_key3])) {
          _normalData[_key3] = data[_key3];
        }
      }
      if (!isEmptyObj(_normalData)) {
        setDataTask.push(function (callback) {
          $ready = _normalData.$ready;
          _this5._internal.setData(_normalData, function () {
            Object.assign(_this5._internal.data, _normalData);
            callback();
          });
        });
      }
    }
    if (setDataTask.length > 0) {
      var $batchedUpdates = this._internal.$batchedUpdates || function (callback) {
        return callback();
      };
      $batchedUpdates(function () {
        var setDataPromiseTask = setDataTask.map(function (invokeTask) {
          return new Promise(function (resolve) {
            invokeTask(resolve);
          });
        });
        Promise.all(setDataPromiseTask).then(function () {
          if ($ready) {
            _this5._trigger(COMPONENT_DID_MOUNT);
          }
          triggerCallbacks(_this5._pendingCallbacks);
        });
      });
    } else {
      triggerCallbacks(this._pendingCallbacks);
    }
  };
  return Component;
}();
function triggerCallbacks(callbacks) {
  var callback;
  while (callback = callbacks.pop()) {
    callback();
  }
}
function isAppendArray(prev, next) {
  if (next.length === 0) return false;
  if (prev.length === 0) return true;
  return next.length > prev.length && next.slice(0, prev.length).every(function (val, index) {
    return shallowEqual(prev[index], val);
  });
}
function isDifferentData(prevData, nextData) {
  var prevType = typeof prevData;
  var nextType = typeof nextData;
  if (prevType !== nextType) return true;
  if (prevType === 'object' && !isNull(prevData) && !isNull(nextData)) {
    if (isArray(prevData) && isArray(nextData) && prevData.length === nextData.length) {
      return nextData.some(function (val, index) {
        return !shallowEqual(prevData[index], val);
      });
    }
    return !shallowEqual(prevData, nextData);
  } else {
    return prevData !== nextData;
  }
}

function getNativePageLifecycle (_ref) {
  var mount = _ref.mount,
      unmount = _ref.unmount,
      show = _ref.show,
      hide = _ref.hide;
  {
    return {
      onLoad: function onLoad() {
        mount.apply(this, arguments);
      },
      onReady: function onReady() {},
      onUnload: function onUnload() {
        unmount.apply(this, arguments);
      },
      onShow: function onShow() {
        show.apply(this, arguments);
      },
      onHide: function onHide() {
        hide.apply(this, arguments);
      }
    };
  }
}

function getNativeComponentLifecycle (_ref) {
  var mount = _ref.mount,
      unmount = _ref.unmount,
      _didUpdate = _ref.didUpdate;
  {
    return {
      didMount: function didMount() {
        mount.apply(this, arguments);
      },
      didUpdate: function didUpdate(prevProps) {
        _didUpdate.call(this, prevProps, this.props);
      },
      didUnmount: function didUnmount() {
        unmount.apply(this, arguments);
      }
    };
  }
}

function getComponentBaseConfig (baseConfig) {
  {
    return {
      props: {},
      events: {}
    };
  }
}

function getNativeEventBindTarget (Klass, shouldReturnConfig) {
  {
    return shouldReturnConfig ? Klass.__config : Klass.__config.events;
  }
}

function getEventProps () {
  {
    return {
      TYPE: 'type',
      TARGET: 'target',
      TIMESTAMP: 'timeStamp'
    };
  }
}

var _customId = 0;
function getId (type, internal) {
  switch (type) {
    case 'tag':
      if (internal["props"]["__tagId"]) {
        return internal["props"]["__tagId"];
      }
      return "t_" + _customId++;
    default:
      return "d_" + _customId++;
  }
}

function registerEventsInConfig(Klass, events) {
  if (events === void 0) {
    events = [];
  }
  events.forEach(function (eventName) {
    var shouldReturnConfig = EVENTS_LIST.indexOf(eventName) < 0;
    var eventBindTarget = getNativeEventBindTarget(Klass, shouldReturnConfig);
    var defaultLifeCycleEvent = eventBindTarget[eventName];
    eventBindTarget[eventName] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      defaultLifeCycleEvent && defaultLifeCycleEvent.apply(this, args);
      var ret;
      var pageInstance = getPageInstance();
      if (pageInstance.__nativeEventMap[eventName]) {
        pageInstance.__nativeEventMap[eventName].forEach(function (callback) {
          return ret = callback.apply(void 0, args);
        });
      }
      return ret;
    };
  });
}
function registerNativeEventListeners(component, events) {
  component.__nativeEvents = events;
  return component;
}
function addNativeEventListener(eventName, callback) {
  var pageInstance = getPageInstance();
  if (!pageInstance.__nativeEventMap[eventName]) {
    pageInstance.__nativeEventMap[eventName] = [];
  }
  pageInstance.__nativeEventMap[eventName].push(callback);
}
function removeNativeEventListener(eventName, callback) {
  var pageInstance = getPageInstance();
  if (pageInstance.__nativeEventMap[eventName]) {
    pageInstance.__nativeEventMap[eventName] = pageInstance.__nativeEventMap[eventName].filter(function (fn) {
      return fn !== callback;
    });
  }
}
function getPageInstance() {
  var history = getMiniAppHistory();
  var pageId = history.location._pageId;
  return getPageInstanceById(pageId);
}

var _getEventProps = getEventProps(),
    TYPE = _getEventProps.TYPE,
    TARGET = _getEventProps.TARGET,
    TIMESTAMP = _getEventProps.TIMESTAMP;
var GET_DERIVED_STATE_FROM_PROPS = 'getDerivedStateFromProps';
var staticConfig;
var _pageProps = {};
var eventsMap = {};
function getPageCycles(Klass) {
  var config = getNativePageLifecycle({
    mount: function mount(options) {
      var history = createMiniAppHistory();
      var _generateBaseOptions = generateBaseOptions(this, Klass.defaultProps, {
        history: history,
        location: history.location
      }, _pageProps),
          instanceId = _generateBaseOptions.instanceId,
          props = _generateBaseOptions.props;
      this.instance = new Klass(props);
      this.instance.instanceId = instanceId;
      this.instance.__pageOptions = options;
      setPageInstance(this.instance);
      this.instance._internal = this;
      history.location.__updatePageOption(options);
      history.location.__updatePageId(this.instance.instanceId);
      if (this.instance.__ready) return;
      this.instance.__ready = true;
      this.data = this.instance.state;
      this.instance._mountComponent();
    },
    unmount: function unmount() {
      this.instance && this.instance._unmountComponent();
    },
    show: function show() {
      if (this.instance && this.instance.__mounted) {
        var history = getMiniAppHistory();
        history.location.__updatePageOption(this.instance.__pageOptions);
        history.location.__updatePageId(this.instance.instanceId);
        this.instance._trigger(ON_SHOW);
      }
    },
    hide: function hide() {
      if (this.instance.__mounted) this.instance._trigger(ON_HIDE);
    }
  });
  return config;
}
function getComponentCycles(Klass) {
  return getNativeComponentLifecycle({
    mount: function mount() {
      var _generateBaseOptions2 = generateBaseOptions(this, Klass.defaultProps),
          instanceId = _generateBaseOptions2.instanceId,
          props = _generateBaseOptions2.props;
      if (Klass.__injectHistory) {
        var history = getMiniAppHistory();
        Object.assign(props, {
          history: history,
          location: history.location
        });
      }
      this.instance = new Klass(props);
      this.instance._internal = this;
      this.instance.__injectHistory = Klass.__injectHistory;
      this.instance.instanceId = instanceId;
      this.instance.type = Klass;
      setComponentInstance(this.instance);
      if (GET_DERIVED_STATE_FROM_PROPS in Klass) {
        this.instance['__' + GET_DERIVED_STATE_FROM_PROPS] = Klass[GET_DERIVED_STATE_FROM_PROPS];
      }
      this.data = this.instance.state;
      this.instance._mountComponent();
    },
    didUpdate: function didUpdate(prevProps, nextProps) {
      if (this.instance && /^t_\d+$/.test(this.instance.instanceId) && this.data.$ready && !shallowEqual(prevProps, nextProps)) {
        this.instance.nextProps = Object.assign({}, this.instance.props, this["props"]);
        enqueueRender(this.instance);
      }
    },
    unmount: function unmount() {
      this.instance && this.instance._unmountComponent();
    }
  });
}
function createProxyMethods(events) {
  var methods = {};
  if (Array.isArray(events)) {
    events.forEach(function (eventName) {
      methods[eventName] = function () {
        var _this = this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var event = args.find(function (arg) {
          return isPlainObject(arg) && arg[TYPE] && arg[TIMESTAMP] && isPlainObject(arg[TARGET]);
        });
        var contextInfo = {
          context: this.instance
        };
        var proxyedArgs = [];
        if (event) {
          {
            event.stopPropagation = function () {
              eventsMap[toleranceEventTimeStamp(event.timeStamp)] = {
                detail: event.detail,
                type: event.type
              };
            };
            var prevEvent = eventsMap[toleranceEventTimeStamp(event.timeStamp)];
            if (prevEvent && prevEvent.type === event.type) {
              var isSame = true;
              for (var key in prevEvent.detail) {
                if (prevEvent.detail[key] !== event.detail[key]) {
                  isSame = false;
                  break;
                }
              }
              if (isSame) {
                return;
              }
            }
          }
          var dataset = event && event.currentTarget ? event.currentTarget.dataset : {};
          var formatedEventName = formatEventName(eventName);
          var datasetKeys = Object.keys(dataset).sort().filter(function (datasetKey) {
            return datasetKey.indexOf(formatedEventName) === 0;
          });
          datasetKeys.forEach(function (key, idx) {
            if (formatedEventName + "ArgContext" === key || formatedEventName + "-arg-context" === key) {
              contextInfo.context = dataset[key] === 'this' ? _this.instance : dataset[key];
              contextInfo.changed = true;
            } else if (isDatasetArg(key)) {
              var index = Number(DATASET_ARG_REG.exec(key)[1]);
              proxyedArgs[index] = dataset[key];
              if (!contextInfo.changed && idx !== index) {
                proxyedArgs[idx] = event;
              }
            }
          });
          if (contextInfo.changed || !proxyedArgs.includes(event)) {
            proxyedArgs.push(event);
          }
        } else {
          proxyedArgs = args;
        }
        if (this.instance._methods[eventName]) {
          return this.instance._methods[eventName].apply(contextInfo.context, proxyedArgs);
        } else {
          console.warn("instance._methods['" + eventName + "'] not exists.");
        }
      };
    });
  }
  return methods;
}
function createReactiveClass(pureRender) {
  var Klass = function (_Component) {
    _inheritsLoose(Klass, _Component);
    function Klass(props) {
      var _this2;
      _this2 = _Component.call(this, props) || this;
      _this2._render = pureRender;
      _this2.__isReactiveComponent = true;
      _this2.__compares = pureRender.__compares;
      if (!_this2.shouldComponentUpdate && _this2.__compares) {
        var compares = _this2.__compares;
        _this2.shouldComponentUpdate = function (nextProps) {
          var arePropsEqual = true;
          for (var i = compares.length - 1; i > -1; i--) {
            if (arePropsEqual = compares[i](_this2.props, nextProps)) {
              break;
            }
          }
          return _this2.__shouldUpdate || !arePropsEqual || _this2.__prevForwardRef !== _this2._forwardRef;
        };
      }
      return _this2;
    }
    var _proto = Klass.prototype;
    _proto.render = function render(props) {
      if (!this.__mounted && this._render._forwardRef) {
        this.__prevForwardRef = this._forwardRef = this.props.bindComRef;
      }
      return this._render.call(this, props, this._forwardRef ? this._forwardRef : this.context);
    };
    return Klass;
  }(Component);
  Klass.__injectHistory = pureRender.__injectHistory;
  return Klass;
}
function createConfig(component, options) {
  var Klass = isClassComponent(component) ? component : createReactiveClass(component);
  var events = options.events,
      _options$baseConfig = options.baseConfig,
      isPage = options.isPage;
  var cycles = isPage ? getPageCycles(Klass) : getComponentCycles(Klass);
  var config = _extends({
    data: {}
  }, cycles, getComponentBaseConfig());
  var proxiedMethods = createProxyMethods(events);
  if (isPage) {
    Object.assign(config, proxiedMethods);
    Klass.__proto__.__config = config;
    registerEventsInConfig(Klass, component.__nativeEvents);
  } else {
    {
      config.methods = proxiedMethods;
    }
  }
  return config;
}
function runApp() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  if (staticConfig) {
    throw new Error('runApp can only be called once.');
  }
  var appProps = {};
  if (args.length === 1) {
    staticConfig = args[0];
    setModernMode(false);
  } else if (Array.isArray(args[0].routes)) {
    staticConfig = args[0];
    _pageProps = args[1];
    setModernMode(false);
  } else {
    staticConfig = args[1];
    if (args[0].app) {
      appProps = args[0].app;
      [ON_LAUNCH, ON_ERROR, ON_HIDE, ON_SHOW, ON_SHARE_APP_MESSAGE].forEach(function (cycle) {
        if (typeof args[0].app[cycle] === 'function') {
          useAppEffect(cycle, args[0].app[cycle]);
        }
      });
    }
  }
  __updateRouterMap(staticConfig);
  var appOptions = _extends({}, appProps, {
    onLaunch: function onLaunch(launchOptions) {
      executeCallback(this, ON_LAUNCH, launchOptions);
    },
    onShow: function onShow(showOptions) {
      executeCallback(this, ON_SHOW, showOptions);
    },
    onHide: function onHide() {
      executeCallback(this, ON_HIDE);
    },
    onError: function onError(error) {
      executeCallback(this, ON_ERROR, error);
    }
  });
  if (cycles[ON_SHARE_APP_MESSAGE]) {
    appOptions.onShareAppMessage = function (shareOptions) {
      var callbackQueue = cycles[ON_SHARE_APP_MESSAGE];
      if (Array.isArray(callbackQueue) && callbackQueue[0]) {
        return callbackQueue[0].call(this, shareOptions);
      }
    };
  }
  {
    App(appOptions);
  }
}
function createPage(definition, options) {
  if (options === void 0) {
    options = {};
  }
  options.isPage = true;
  return createConfig(definition, options);
}
function createComponent(definition, options) {
  if (options === void 0) {
    options = {};
  }
  return createConfig(definition, options);
}
function isClassComponent(Klass) {
  return Klass.prototype instanceof Component;
}
var DATASET_ARG_REG = /\w+-?[aA]rg?-?(\d+)/;
function isDatasetArg(str) {
  return DATASET_ARG_REG.test(str);
}
function formatEventName(name) {
  return name.replace('_', '');
}
function toleranceEventTimeStamp(timeStamp) {
  return Math.floor(timeStamp / 10) - 5;
}
function generateBaseOptions(internal, defaultProps) {
  var instanceId = getId('tag', internal);
  for (var _len3 = arguments.length, restProps = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    restProps[_key3 - 2] = arguments[_key3];
  }
  var props = Object.assign.apply(Object, [{}, defaultProps, internal["props"], {
    "__tagId": instanceId,
    $slots: _extends({}, internal["props"].$slots, internal["props"].$scopedSlots)
  }, getComponentProps(instanceId)].concat(restProps));
  return {
    instanceId: instanceId,
    props: props
  };
}
function executeCallback(instance, cycle, param) {
  if (param === void 0) {
    param = {};
  }
  var callbackQueue = cycles[cycle];
  if (Array.isArray(callbackQueue) && callbackQueue.length > 0) {
    callbackQueue.forEach(function (fn) {
      return fn.call(instance, param);
    });
  }
}

var KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
function kebabCase(str) {
  return str.replace(KEBAB_REGEX, function (match) {
    return '-' + match.toLowerCase();
  });
}

function createStyle(style) {
  if (isNull(style)) return '';
  var ret = '';
  if (isArray(style)) {
    style.forEach(function (s) {
      ret += createStyle(s);
    });
  } else if (isObject(style)) {
    Object.keys(style).forEach(function (key, index, styleKeys) {
      var isLast = styleKeys.length - 1 === index;
      ret += kebabCase(key) + ": " + transformUnit(style[key]) + ";" + (isLast ? '' : ' ');
    });
  } else if (isString(style)) {
    ret += style;
  }
  return ret;
}
function transformUnit(val) {
  return val;
}

var count = 0;
var ValueEmitter = function (_Event) {
  _inheritsLoose(ValueEmitter, _Event);
  function ValueEmitter(defaultValue) {
    var _this;
    _this = _Event.call(this) || this;
    _this.id = "valueEmitter_" + count++;
    _this.value = defaultValue;
    return _this;
  }
  var _proto = ValueEmitter.prototype;
  _proto.on = function on(handler) {
    _Event.prototype.on.call(this, this.id, handler);
  };
  _proto.off = function off(handler) {
    _Event.prototype.off.call(this, this.id, handler);
  };
  _proto.emit = function emit() {
    _Event.prototype.emit.call(this, this.id, this.value);
  };
  return ValueEmitter;
}(Events);

var uniqueId = 0;
function createContext(defaultValue) {
  var contextProp = '__ctx' + uniqueId++;
  var globalEmitter;
  var defaultEmitter = new ValueEmitter(defaultValue);
  function Provider(passedVal) {
    if (passedVal === void 0) {
      passedVal = defaultValue;
    }
    var emitter = globalEmitter;
    if (!emitter) {
      globalEmitter = new ValueEmitter(passedVal);
    } else {
      emitter.value = passedVal;
      emitter.emit();
    }
  }
  function readEmitter() {
    return globalEmitter || defaultEmitter;
  }
  Provider.readEmitter = readEmitter;
  Provider.contextProp = contextProp;
  return {
    Provider: Provider
  };
}

/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
var hasOwn = {}.hasOwnProperty;
function classNames() {
  var classes = [];
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;
    if (isString(arg) || isNumber(arg)) {
      classes.push(arg);
    } else if (isArray(arg) && arg.length) {
      var inner = classNames.apply(null, arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (isObject(arg)) {
      for (var key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }
  return classes.join(' ');
}

function memo (Component, compare) {
  compare = compare || shallowEqual;
  if (Component.__compares) {
    Component.__compares.push(compare);
  } else {
    Component.__compares = [compare];
  }
  return Component;
}

function forwardRef (render) {
  render._forwardRef = true;
  return render;
}

var shared = {};

export { Component, addNativeEventListener, classNames as classnames, createComponent, createContext, createPage, createRef, createStyle, forwardRef, getCurrentInstance, getSearchParams, memo, registerNativeEventListeners, removeNativeEventListener, runApp, shared, useAppError, useAppHide, useAppLaunch, useAppShare, useAppShow, useCallback, useContext, useEffect, useImperativeHandle, useLayoutEffect, useMemo, usePageHide, usePageShow, useReducer, useRef, useState, version, withPageLifeCycle, withRouter };
