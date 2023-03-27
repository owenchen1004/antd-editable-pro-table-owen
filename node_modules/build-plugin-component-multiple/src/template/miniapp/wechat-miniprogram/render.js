/*!
 * miniapp-render v2.6.1
 * (c) 2019-2021 Rax Team
 * Released under the BSD-3-Clause License.
 */
!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define(t)
    : ((e = e || self)['miniapp-render'] = t());
})(this, function () {
  'use strict';
  function e(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
  }
  function t(e, t) {
    return e((t = { exports: {} }), t.exports), t.exports;
  }
  var n = e(
      t(function (e) {
        (e.exports = function (e, t) {
          if (null == e) return {};
          var n,
            r,
            i = {},
            o = Object.keys(e);
          for (r = 0; r < o.length; r++) (n = o[r]), t.indexOf(n) >= 0 || (i[n] = e[n]);
          return i;
        }),
          (e.exports.default = e.exports),
          (e.exports.__esModule = !0);
      }),
    ),
    r = e(
      t(function (e) {
        function t() {
          return (
            (e.exports = t =
              Object.assign ||
              function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = arguments[t];
                  for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
                }
                return e;
              }),
            (e.exports.default = e.exports),
            (e.exports.__esModule = !0),
            t.apply(this, arguments)
          );
        }
        (e.exports = t), (e.exports.default = e.exports), (e.exports.__esModule = !0);
      }),
    ),
    i = t(function (e) {
      function t(n, r) {
        return (
          (e.exports = t =
            Object.setPrototypeOf ||
            function (e, t) {
              return (e.__proto__ = t), e;
            }),
          (e.exports.default = e.exports),
          (e.exports.__esModule = !0),
          t(n, r)
        );
      }
      (e.exports = t), (e.exports.default = e.exports), (e.exports.__esModule = !0);
    });
  e(i);
  var o = t(function (e) {
    (e.exports = function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ('function' == typeof Proxy) return !0;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
      } catch (e) {
        return !1;
      }
    }),
      (e.exports.default = e.exports),
      (e.exports.__esModule = !0);
  });
  e(o);
  var a = t(function (e) {
      function t(n, r, a) {
        return (
          o()
            ? ((e.exports = t = Reflect.construct), (e.exports.default = e.exports), (e.exports.__esModule = !0))
            : ((e.exports = t =
                function (e, t, n) {
                  var r = [null];
                  r.push.apply(r, t);
                  var o = new (Function.bind.apply(e, r))();
                  return n && i(o, n.prototype), o;
                }),
              (e.exports.default = e.exports),
              (e.exports.__esModule = !0)),
          t.apply(null, arguments)
        );
      }
      (e.exports = t), (e.exports.default = e.exports), (e.exports.__esModule = !0);
    }),
    s = e(a),
    u = e(
      t(function (e) {
        function t(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              'value' in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        (e.exports = function (e, n, r) {
          return n && t(e.prototype, n), r && t(e, r), e;
        }),
          (e.exports.default = e.exports),
          (e.exports.__esModule = !0);
      }),
    ),
    c = e(
      t(function (e) {
        (e.exports = function (e, t) {
          (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), i(e, t);
        }),
          (e.exports.default = e.exports),
          (e.exports.__esModule = !0);
      }),
    );
  function l(e) {
    return e.replace(/-([a-zA-Z])/g, function (e, t) {
      return t.toUpperCase();
    });
  }
  var h = 0;
  function d() {
    return h++;
  }
  function _(e) {
    return void 0 === e;
  }
  var f = (function () {
    function e(t) {
      var n = this;
      (this.__name = t.name.toLowerCase()),
        (this.__target = t.target),
        (this.__timeStamp = t.timeStamp || Date.now()),
        (this.__currentTarget = t.currentTarget || t.target),
        (this.__eventPhase = t.eventPhase || e.NONE),
        (this.__detail = t.detail || null),
        (this.__immediateStop = !1),
        (this.__canBubble = !0),
        (this.__bubbles = t.bubbles || !1),
        (this.__touches = null),
        (this.__targetTouches = null),
        (this.__changedTouches = null),
        (this.__cancelable = !1);
      var i = t.__extra;
      i &&
        Object.keys(i).forEach(function (e) {
          n[e] = i[e];
        }),
        t.touches &&
          t.touches.length &&
          ((this.__touches = t.touches.map(function (e) {
            return r({}, e, { target: t.target });
          })),
          this._checkTargetTouches()),
        t.changedTouches &&
          t.changedTouches.length &&
          (this.__changedTouches = t.changedTouches.map(function (e) {
            return r({}, e, { target: t.target });
          }));
    }
    var t = e.prototype;
    return (
      (t._setCurrentTarget = function (e) {
        (this.__currentTarget = e), this._checkTargetTouches();
      }),
      (t._setEventPhase = function (e) {
        this.__eventPhase = e;
      }),
      (t._checkTargetTouches = function () {
        var e = this;
        this.__touches &&
          this.__touches.length &&
          (this.__targetTouches = this.__touches.filter(function (t) {
            return (function (e, t) {
              if (e === t) return !0;
              for (; e; ) {
                if (e === t) return !0;
                e = e.parentNode;
              }
              return !1;
            })(t.target, e.__currentTarget);
          }));
      }),
      (t.preventDefault = function () {
        this.__cancelable = !0;
      }),
      (t.stopPropagation = function () {
        this.eventPhase !== e.NONE && (this.__canBubble = !1);
      }),
      (t.stopImmediatePropagation = function () {
        this.eventPhase !== e.NONE && ((this.__immediateStop = !0), (this.__canBubble = !1));
      }),
      (t.initEvent = function (e, t) {
        void 0 === e && (e = ''),
          'string' == typeof e && ((this.__name = e.toLowerCase()), (this.__bubbles = _(t) ? this.__bubbles : !!t));
      }),
      u(e, [
        {
          key: '_immediateStop',
          get: function () {
            return this.__immediateStop;
          },
        },
        {
          key: '_canBubble',
          get: function () {
            return this.__canBubble;
          },
        },
        {
          key: 'bubbles',
          get: function () {
            return this.__bubbles;
          },
        },
        {
          key: 'cancelable',
          get: function () {
            return this.__cancelable;
          },
        },
        {
          key: 'target',
          get: function () {
            return this.__target;
          },
        },
        {
          key: 'currentTarget',
          get: function () {
            return this.__currentTarget;
          },
        },
        {
          key: 'eventPhase',
          get: function () {
            return this.__eventPhase;
          },
        },
        {
          key: 'type',
          get: function () {
            return this.__name;
          },
        },
        {
          key: 'timeStamp',
          get: function () {
            return this.__timeStamp;
          },
        },
        {
          key: 'touches',
          get: function () {
            return this.__touches;
          },
        },
        {
          key: 'targetTouches',
          get: function () {
            return this.__targetTouches;
          },
        },
        {
          key: 'changedTouches',
          get: function () {
            return this.__changedTouches;
          },
        },
        {
          key: 'detail',
          get: function () {
            return this.__detail;
          },
          set: function (e) {
            this.__detail = e;
          },
        },
      ]),
      e
    );
  })();
  (f.NONE = 0), (f.CAPTURING_PHASE = 1), (f.AT_TARGET = 2), (f.BUBBLING_PHASE = 3);
  var p = (function (e) {
    function t(t, n) {
      return void 0 === t && (t = ''), void 0 === n && (n = {}), e.call(this, r({ name: t }, n)) || this;
    }
    return c(t, e), t;
  })(f);
  function m(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  function g(e, t) {
    if (e.length !== t.length) return !1;
    for (var n, r = e.length; n < r; n++) {
      var i = e[n],
        o = t[n];
      if (i.identifier !== o.identifier) return !1;
      if (i.pageX !== o.pageX || i.pageY !== o.pageY || i.clientX !== o.clientX || i.clientY !== o.clientY) return !1;
    }
    return !0;
  }
  function v(e, t) {
    return e.pageX === t.pageX && e.pageY === t.pageY && e.clientX === t.clientX && e.clientY === t.clientY;
  }
  function y(e, t, n) {
    var r = 'detail' === e ? v : g;
    return !(!t[e] || !n[e] || r(t[e], n[e])) || !!((!t[e] && n[e]) || (t[e] && !n[e]));
  }
  var b = (function () {
      function e() {
        (this.ontouchstart = null),
          (this.ontouchmove = null),
          (this.ontouchend = null),
          (this.ontouchcancel = null),
          (this.oninput = null),
          (this.onfocus = null),
          (this.onblur = null),
          (this.onchange = null),
          (this.__miniappEvent = null),
          (this.__eventHandlerMap = new Map()),
          (this.__hasEventBinded = !1),
          (this.__hasAppearEventBinded = !1),
          (this.__hasTouchEventBinded = !1);
      }
      var t = e.prototype;
      return (
        (t._destroy = function () {
          (this.__miniappEvent = null),
            (this.__eventHandlerMap = null),
            (this.__hasEventBinded = null),
            (this.__hasTouchEventBinded = null),
            (this.__hasAppearEventBinded = !1);
        }),
        (e._process = function (e, t, n, i, o) {
          var a;
          (t instanceof p || t instanceof f) && (t = (a = t).type), (t = t.toLowerCase());
          for (var s = [e], u = e.parentNode; u && u.ownerDocument; ) s.push(u), (u = u.parentNode);
          a ||
            (a = new f({
              name: t,
              target: e,
              detail: n.detail || r({}, n),
              timeStamp: n.timeStamp,
              touches: n.touches,
              changedTouches: n.changedTouches,
              bubbles: !0,
              __extra: i,
            }));
          for (var c = s.length - 1; c >= 0; c--) {
            var l = s[c];
            if (!a._canBubble) break;
            l !== e &&
              (a._setCurrentTarget(l),
              a._setEventPhase(f.CAPTURING_PHASE),
              l._trigger(t, { event: a, isCapture: !0 }),
              o && o(l, a, !0));
          }
          if (
            (a._canBubble &&
              (a._setCurrentTarget(e),
              a._setEventPhase(f.AT_TARGET),
              e._trigger(t, { event: a, isCapture: !0, isTarget: !0 }),
              o && o(e, a, !0),
              e._trigger(t, { event: a, isCapture: !1, isTarget: !0 }),
              o && o(e, a, !1)),
            a.bubbles)
          )
            for (
              var h,
                d = (function (e, t) {
                  var n = ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
                  if (n) return (n = n.call(e)).next.bind(n);
                  if (
                    Array.isArray(e) ||
                    (n = (function (e, t) {
                      if (e) {
                        if ('string' == typeof e) return m(e, t);
                        var n = Object.prototype.toString.call(e).slice(8, -1);
                        return (
                          'Object' === n && e.constructor && (n = e.constructor.name),
                          'Map' === n || 'Set' === n
                            ? Array.from(e)
                            : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                            ? m(e, t)
                            : void 0
                        );
                      }
                    })(e)) ||
                    (t && e && 'number' == typeof e.length)
                  ) {
                    n && (e = n);
                    var r = 0;
                    return function () {
                      return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
                    };
                  }
                  throw new TypeError(
                    'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                  );
                })(s);
              !(h = d()).done;

            ) {
              var _ = h.value;
              if (!a._canBubble) break;
              _ !== e &&
                (a._setCurrentTarget(_),
                a._setEventPhase(f.BUBBLING_PHASE),
                _._trigger(t, { event: a, isCapture: !1 }),
                o && o(_, a, !1));
            }
          return a._setCurrentTarget(null), a._setEventPhase(f.NONE), a;
        }),
        (t.__getHandles = function (e, t, n) {
          if (n) {
            var r = this.__eventHandlerMap.get(e);
            return (
              r || this.__eventHandlerMap.set(e, (r = {})),
              (r.capture = r.capture || []),
              (r.bubble = r.bubble || []),
              t ? r.capture : r.bubble
            );
          }
          var i = this.__eventHandlerMap.get(e);
          return i ? (t ? i.capture : i.bubble) : null;
        }),
        (t._trigger = function (e, t) {
          var n = this,
            r = void 0 === t ? {} : t,
            i = r.event,
            o = r.args,
            a = void 0 === o ? [] : o,
            s = r.isCapture,
            u = r.isTarget;
          e = e.toLowerCase();
          var c = this.__getHandles(e, s) || [];
          if ('onshareappmessage' === e) return c[0] && c[0].call(this || null, i);
          var l = 'on' + e;
          if (!((s && u) || 'function' != typeof this[l])) {
            if (i && i._immediateStop) return;
            try {
              var h;
              (h = this[l]).call.apply(h, [this || null, i].concat(a));
            } catch (e) {
              console.error(e);
            }
          }
          c &&
            c.length &&
            c.forEach(function (e) {
              if (!i || !i._immediateStop)
                try {
                  var t = i ? [i].concat(a) : [].concat(a);
                  e.call.apply(e, [n || null].concat(t));
                } catch (e) {
                  console.error(e);
                }
            });
        }),
        (t.__checkEvent = function (e) {
          var t,
            n = e;
          return (
            (t = (function (e, t) {
              return !e || e.timeStamp !== t.timeStamp || y('touches', e, t) || y('changedTouches', e, t);
            })(this.__miniappEvent, n)) && (this.__miniappEvent = n),
            t
          );
        }),
        (t.addEventListener = function (e, t, n) {
          if ('string' == typeof e && 'function' == typeof t) {
            var r = !1;
            'boolean' == typeof n ? (r = n) : 'object' == typeof n && (r = n.capture),
              (e = e.toLowerCase()),
              this.__getHandles(e, r, !0).push(t),
              this.__hasEventBinded || (this.__hasEventBinded = !0),
              !this.__hasAppearEventBinded && e.indexOf('appear') > -1 && (this.__hasAppearEventBinded = !0),
              !this.__hasTouchEventBinded && e.indexOf('touch') > -1 && (this.__hasTouchEventBinded = !0);
          }
        }),
        (t.removeEventListener = function (e, t, n) {
          if ((void 0 === n && (n = !1), 'string' == typeof e && 'function' == typeof t)) {
            e = e.toLowerCase();
            var r = this.__getHandles(e, n);
            r && r.length && r.splice(r.indexOf(t), 1);
          }
        }),
        (t.dispatchEvent = function (t) {
          return t instanceof p && e._process(this, t), !0;
        }),
        e
      );
    })(),
    N = {},
    w = new Map(),
    E = new Map(),
    x = {},
    T = new Map(),
    k = [],
    C = [],
    S = new Map(),
    I = function (e, t) {
      N[e] = t.document;
    },
    O = function (e) {
      delete N[e];
    },
    A = function (e) {
      return N[e];
    },
    P = function (e, t) {
      void 0 === e && (e = ''), T.set(e, t);
    },
    R = function (e) {
      return void 0 === e && (e = ''), T.get(e);
    },
    M = function (e) {
      return void 0 === e && (e = ''), T.has(e);
    },
    D = function (e, t) {
      void 0 === t && (t = null), E.set(e, t);
    },
    B = function (e) {
      return E.get(e);
    },
    L = function () {
      return E;
    },
    U = function (e) {
      x = e;
    },
    W = function () {
      return x;
    },
    V = function (e) {
      var t = w.get(e) || 0;
      return w.set(e, t + 1), t + 1;
    },
    F = function (e) {
      k.push(e),
        S.size > 0 &&
          S.forEach(function (t, n) {
            e[n] || (e[n] = t);
          });
    },
    j = function (e, t) {
      k.length > 0 &&
        k.forEach(function (n) {
          n[e] = t;
        }),
        C.length > 0 &&
          C.forEach(function (n) {
            n[e] = t;
          }),
        S.set(e, t);
    },
    H = function (e) {
      C.push(e);
    },
    z = new Set([
      'movable-view',
      'cover-image',
      'cover-view',
      'movable-area',
      'scroll-view',
      'swiper',
      'swiper-item',
      'view',
      'icon',
      'progress',
      'rich-text',
      'text',
      'button',
      'checkbox',
      'checkbox-group',
      'editor',
      'form',
      'input',
      'label',
      'picker',
      'picker-view',
      'picker-view-column',
      'radio',
      'radio-group',
      'slider',
      'switch',
      'textarea',
      'functional-page-navigator',
      'navigator',
      'audio',
      'camera',
      'image',
      'live-player',
      'live-pusher',
      'video',
      'map',
      'canvas',
      'ad',
      'official-account',
      'open-data',
      'web-view',
      'open-avatar',
      'lottie',
      'contact-button',
    ]),
    G = new Set(['view', 'text', 'image']),
    q = new Set(['view', 'h-element']),
    X = new Set(['view', 'h-element']),
    Y = (function (e) {
      function t(t) {
        var n;
        return (
          ((n = e.call(this) || this).__nodeId = 'n_' + d()),
          (n.__type = t.type),
          (n.parentNode = null),
          (n.__rendered = !1),
          (n.__ownerDocument = t.document),
          n
        );
      }
      c(t, e);
      var n = t.prototype;
      return (
        (n._destroy = function () {
          e.prototype._destroy.call(this),
            (this.__nodeId = null),
            (this.__type = null),
            (this.parentNode = null),
            (this.__rendered = !1);
        }),
        (n._isRendered = function () {
          return (
            !!this.__rendered || (this.parentNode && (this.__rendered = this.parentNode._isRendered()), this.__rendered)
          );
        }),
        (n.hasChildNodes = function () {
          return !1;
        }),
        (n.remove = function () {
          return this.parentNode && this.parentNode.removeChild ? this.parentNode.removeChild(this) : this;
        }),
        u(t, [
          {
            key: '__pageId',
            get: function () {
              return this.__ownerDocument.__pageId;
            },
          },
          {
            key: 'ownerDocument',
            get: function () {
              return this.__ownerDocument;
            },
          },
          {
            key: '_path',
            get: function () {
              if (null !== this.parentNode) {
                var e = '[' + this.parentNode.childNodes.indexOf(this) + ']';
                return this.parentNode._path + '.children.' + e;
              }
              return '';
            },
          },
          {
            key: '_root',
            get: function () {
              return B('e-body-' + this.__pageId);
            },
          },
          {
            key: 'nodeValue',
            get: function () {
              return null;
            },
          },
          {
            key: 'previousSibling',
            get: function () {
              var e = (this.parentNode && this.parentNode.childNodes) || [],
                t = e.indexOf(this);
              return t > 0 ? e[t - 1] : null;
            },
          },
          {
            key: 'previousElementSibling',
            get: function () {
              var e = (this.parentNode && this.parentNode.childNodes) || [],
                n = e.indexOf(this);
              if (n > 0) for (var r = n - 1; r >= 0; r--) if (e[r].nodeType === t.ELEMENT_NODE) return e[r];
              return null;
            },
          },
          {
            key: 'nextSibling',
            get: function () {
              var e = (this.parentNode && this.parentNode.childNodes) || [],
                t = e.indexOf(this);
              return e[t + 1] || null;
            },
          },
          {
            key: 'nextElementSibling',
            get: function () {
              var e = (this.parentNode && this.parentNode.childNodes) || [],
                n = e.indexOf(this);
              if (n < e.length - 1)
                for (var r = n + 1, i = e.length; r < i; r++) if (e[r].nodeType === t.ELEMENT_NODE) return e[r];
              return null;
            },
          },
        ]),
        t
      );
    })(b);
  (Y.ELEMENT_NODE = 1),
    (Y.TEXT_NODE = 3),
    (Y.CDATA_SECTION_NODE = 4),
    (Y.PROCESSING_INSTRUCTION_NODE = 7),
    (Y.COMMENT_NODE = 8),
    (Y.DOCUMENT_NODE = 9),
    (Y.DOCUMENT_TYPE_NODE = 10),
    (Y.DOCUMENT_FRAGMENT_NODE = 11);
  var $ = e(
      t(function (e) {
        (e.exports = function (e) {
          if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e;
        }),
          (e.exports.default = e.exports),
          (e.exports.__esModule = !0);
      }),
    ),
    Z = t(function (e) {
      function t(n) {
        return (
          (e.exports = t =
            Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
                }),
          (e.exports.default = e.exports),
          (e.exports.__esModule = !0),
          t(n)
        );
      }
      (e.exports = t), (e.exports.default = e.exports), (e.exports.__esModule = !0);
    });
  e(Z);
  var K = t(function (e) {
    (e.exports = function (e) {
      return -1 !== Function.toString.call(e).indexOf('[native code]');
    }),
      (e.exports.default = e.exports),
      (e.exports.__esModule = !0);
  });
  function J(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  e(K);
  var Q = (function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }
      c(t, e),
        (t._create = function (e, n) {
          var r = new Set();
          return (
            (r.__proto__ = t.prototype),
            (r.__element = n),
            e
              .trim()
              .split(/\s+/)
              .forEach(function (e) {
                return '' !== e && r.add(e, !1);
              }),
            r
          );
        });
      var n = t.prototype;
      return (
        (n.add = function (t, n) {
          return (
            void 0 === n && (n = !0),
            'string' == typeof t && '' !== t && (e.prototype.add.call(this, t), n && this._update()),
            this
          );
        }),
        (n.remove = function (t) {
          e.prototype.delete.call(this, t), this._update();
        }),
        (n.replace = function (t, n) {
          e.prototype.delete.call(this, t), e.prototype.add.call(this, n), this._update();
        }),
        (n.contains = function (e) {
          return this.has(e);
        }),
        (n.item = function (e) {
          for (
            var t,
              n = 0,
              r = (function (e, t) {
                var n = ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
                if (n) return (n = n.call(e)).next.bind(n);
                if (
                  Array.isArray(e) ||
                  (n = (function (e, t) {
                    if (e) {
                      if ('string' == typeof e) return J(e, t);
                      var n = Object.prototype.toString.call(e).slice(8, -1);
                      return (
                        'Object' === n && e.constructor && (n = e.constructor.name),
                        'Map' === n || 'Set' === n
                          ? Array.from(e)
                          : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                          ? J(e, t)
                          : void 0
                      );
                    }
                  })(e)) ||
                  (t && e && 'number' == typeof e.length)
                ) {
                  n && (e = n);
                  var r = 0;
                  return function () {
                    return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
                  };
                }
                throw new TypeError(
                  'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                );
              })(this);
            !(t = r()).done;

          ) {
            var i = t.value;
            if (n === e) return i;
            n++;
          }
        }),
        (n.toggle = function (e, t) {
          return _(t)
            ? this.has(e)
              ? (this.remove(e), !1)
              : (this.add(e), !0)
            : (!0 === t ? this.add(e) : this.remove(e), t);
        }),
        (n.toString = function () {
          return this.value;
        }),
        (n._update = function () {
          this.__element.className = this.value;
        }),
        u(t, [
          {
            key: 'value',
            get: function () {
              var e = [];
              return (
                this.forEach(function (t) {
                  return e.push(t);
                }),
                e.join(' ')
              );
            },
          },
        ]),
        t
      );
    })(
      e(
        t(function (e) {
          function t(n) {
            var r = 'function' == typeof Map ? new Map() : void 0;
            return (
              (e.exports = t =
                function (e) {
                  if (null === e || !K(e)) return e;
                  if ('function' != typeof e) throw new TypeError('Super expression must either be null or a function');
                  if (void 0 !== r) {
                    if (r.has(e)) return r.get(e);
                    r.set(e, t);
                  }
                  function t() {
                    return a(e, arguments, Z(this).constructor);
                  }
                  return (
                    (t.prototype = Object.create(e.prototype, {
                      constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
                    })),
                    i(t, e)
                  );
                }),
              (e.exports.default = e.exports),
              (e.exports.__esModule = !0),
              t(n)
            );
          }
          (e.exports = t), (e.exports.default = e.exports), (e.exports.__esModule = !0);
        }),
      )(Set),
    ),
    ee = {
      position: 'position',
      top: 'top',
      bottom: 'bottom',
      right: 'right',
      left: 'left',
      float: 'float',
      clear: 'clear',
      display: 'display',
      width: 'width',
      height: 'height',
      maxHeight: 'max-height',
      maxWidth: 'max-width',
      minHeight: 'min-height',
      minWidth: 'min-width',
      flex: 'flex',
      flexBasis: 'flex-basis',
      flexGrow: 'flex-grow',
      flexShrink: 'flex-shrink',
      flexDirection: 'flex-direction',
      flexWrap: 'flex-wrap',
      justifyContent: 'justify-content',
      justifySelf: 'justify-self',
      alignItems: 'align-items',
      alignSelf: 'align-self',
      padding: 'padding',
      paddingBottom: 'padding-bottom',
      paddingLeft: 'padding-left',
      paddingRight: 'padding-right',
      paddingTop: 'padding-top',
      margin: 'margin',
      marginBottom: 'margin-bottom',
      marginLeft: 'margin-left',
      marginRight: 'margin-right',
      marginTop: 'margin-top',
      background: 'background',
      backgroundClip: 'background-clip',
      backgroundColor: 'background-color',
      backgroundImage: 'background-image',
      backgroundOrigin: 'background-origin',
      backgroundPosition: 'background-position',
      backgroundRepeat: 'background-repeat',
      backgroundSize: 'background-size',
      border: 'border',
      borderRadius: 'border-radius',
      borderBottomColor: 'border-bottom-color',
      borderBottomLeftRadius: 'border-bottom-left-radius',
      borderBottomRightRadius: 'border-bottom-right-radius',
      borderBottomStyle: 'border-bottom-style',
      borderBottomWidth: 'border-bottom-width',
      borderCollapse: 'border-collapse',
      borderImageOutset: 'border-image-outset',
      borderImageRepeat: 'border-image-repeat',
      borderImageSlice: 'border-image-slice',
      borderImageSource: 'border-image-source',
      borderImageWidth: 'border-image-width',
      borderLeftColor: 'border-left-color',
      borderLeftStyle: 'border-left-style',
      borderLeftWidth: 'border-left-width',
      borderRightColor: 'border-right-color',
      borderRightStyle: 'border-right-style',
      borderRightWidth: 'border-right-width',
      borderTopColor: 'border-top-color',
      borderTopLeftRadius: 'border-top-left-radius',
      borderTopRightRadius: 'border-top-right-radius',
      borderTopStyle: 'border-top-style',
      borderTopWidth: 'border-top-width',
      outline: 'outline',
      borderWidth: 'border-width',
      borderStyle: 'border-style',
      borderColor: 'border-color',
      animation: 'animation',
      animationDelay: 'animation-delay',
      animationDirection: 'animation-direction',
      animationDuration: 'animation-duration',
      animationFillMode: 'animation-fill-mode',
      animationIterationCount: 'animation-iteration-count',
      animationName: 'animation-name',
      animationPlayState: 'animation-play-state',
      animationTimingFunction: 'animation-timing-function',
      transition: 'transition',
      transitionDelay: 'transition-delay',
      transitionDuration: 'transition-duration',
      transitionProperty: 'transition-property',
      transitionTimingFunction: 'transition-timing-function',
      transform: 'transform',
      transformOrigin: 'transform-origin',
      perspective: 'perspective',
      perspectiveOrigin: 'perspective-origin',
      backfaceVisibility: 'backface-visibility',
      font: 'font',
      fontFamily: 'font-family',
      fontSize: 'font-size',
      fontStyle: 'font-style',
      fontWeight: 'font-weight',
      color: 'color',
      textAlign: 'text-align',
      textDecoration: 'text-decoration',
      textIndent: 'text-indent',
      textRendering: 'text-rendering',
      textShadow: 'text-shadow',
      textOverflow: 'text-overflow',
      textTransform: 'text-transform',
      wordBreak: 'word-break',
      wordSpacing: 'word-spacing',
      wordWrap: 'word-wrap',
      lineHeight: 'line-height',
      letterSpacing: 'letter-spacing',
      whiteSpace: 'white-space',
      userSelect: 'user-select',
      visibility: 'visibility',
      opacity: 'opacity',
      zIndex: 'z-index',
      zoom: 'zoom',
      overflow: 'overflow',
      overflowX: 'overflow-x',
      overflowY: 'overflow-y',
      boxShadow: 'box-shadow',
      boxSizing: 'box-sizing',
      content: 'content',
      cursor: 'cursor',
      direction: 'direction',
      listStyle: 'list-style',
      objectFit: 'object-fit',
      pointerEvents: 'pointer-events',
      resize: 'resize',
      verticalAlign: 'vertical-align',
      willChange: 'will-change',
      clip: 'clip',
      clipPath: 'clip-path',
      fill: 'fill',
      touchAction: 'touch-action',
      gridArea: 'grid-area',
      gridAutoColumns: 'grid-auto-columns',
      gridAutoFlow: 'grid-auto-flow',
      gridAutoRows: 'grid-auto-rows',
      gridColumn: 'grid-column',
      gridColumnEnd: 'grid-column-end',
      gridColumnGap: 'grid-column-gap',
      gridColumnStart: 'grid-column-start',
      gridGap: 'grid-gap',
      gridRow: 'grid-row',
      gridRowEnd: 'grid-row-end',
      gridRowGap: 'grid-row-gap',
      gridRowStart: 'grid-row-start',
      gridTemplate: 'grid-template',
      gridTemplateAreas: 'grid-template-areas',
      gridTemplateColumns: 'grid-template-columns',
      gridTemplateRows: 'grid-template-rows',
      WebkitLineClamp: '-webkit-line-clamp',
    },
    te = (function () {
      function e(e) {
        (this.__settedStyle = new Set()), (this.__value = new Map()), (this.__element = e);
      }
      var t = e.prototype;
      return (
        (t.setStyle = function (e, t) {
          var n = this[t];
          if ((_(e) || this.__settedStyle.add(t), this.__value.set(t, e), n !== e && this.__element._isRendered())) {
            var r = { path: this.__element._path + '.style', value: this.cssText };
            this.__element._triggerUpdate(r);
          }
        }),
        (t.setCssVariables = function (e) {
          var t = this;
          this.hasOwnProperty(e) ||
            Object.defineProperty(this, e, {
              enumerable: !0,
              configurable: !0,
              get: function () {
                return t.__value.get(e) || '';
              },
              set: function (n) {
                t.setStyle(n, e);
              },
            });
        }),
        (t.setProperty = function (e, t) {
          '-' === e[0] ? this.setCssVariables(e) : (e = re.get(e)),
            void 0 !== typeof t && (t ? (this[e] = t) : this.removeProperty(e));
        }),
        (t.removeProperty = function (e) {
          if (((e = re.get(e)), !this.__settedStyle.has(e))) return '';
          var t = this[e];
          return (this[e] = ''), this.__settedStyle.delete(e), t;
        }),
        (t.getPropertyValue = function (e) {
          return 'string' != typeof e ? '' : this[(e = re.get(e))] || '';
        }),
        u(e, [
          {
            key: 'cssText',
            get: function () {
              var e = this,
                t = '';
              return (
                this.__settedStyle.forEach(function (n) {
                  var r = e[n];
                  _(r) || (t += re.get(n) + ': ' + r + ';');
                }),
                t
              );
            },
            set: function (e) {
              var t = this;
              if (
                (void 0 === e && (e = ''),
                this.__settedStyle.forEach(function (e) {
                  t.removeProperty(e);
                }),
                '' !== e)
              )
                for (var n = e.split(';'), r = 0; r < n.length; r++) {
                  var i = n[r].trim();
                  if ('' !== i) {
                    var o = i.split(':'),
                      a = o[0],
                      s = o[1];
                    void 0 !== typeof s && this.setProperty(a.trim(), s.trim());
                  }
                }
            },
          },
        ]),
        e
      );
    })(),
    ne = {},
    re = new Map();
  Object.keys(ee).forEach(function (e) {
    re.set(e, ee[e]),
      re.set(ee[e], e),
      (ne[e] = {
        get: function () {
          var t = this.__value.get(e);
          return _(t) ? '' : t;
        },
        set: function (t) {
          this.setStyle(t, e);
        },
      });
  }),
    Object.defineProperties(te.prototype, ne);
  var ie = (function () {
    function e(e) {
      (this.__element = e), (this.__value = {});
    }
    var t = e.prototype;
    return (
      (t.set = function (e, t, n) {
        void 0 === n && (n = !0);
        var r = this.__element;
        if (((this.__value[e] = t), 'style' === e)) r.style.cssText = t;
        else {
          if (0 === e.indexOf('data-')) {
            var i = l(e.substr(5));
            r.dataset[i] = t;
          }
          if ((r.__hasExtraAttribute || 'id' === e || 'class' === e || (r.__hasExtraAttribute = !0), r._isRendered())) {
            var o = { path: r._path + '.' + e, value: t };
            r._triggerUpdate(o, n);
          }
        }
      }),
      (t.get = function (e) {
        var t = this.__element;
        if ('style' === e) return t.style.cssText || null;
        if (0 === e.indexOf('data-')) {
          var n = l(e.substr(5));
          return t.dataset[n];
        }
        return this.__value[e] || null;
      }),
      (t.has = function (e) {
        return Object.prototype.hasOwnProperty.call(this.__value, e);
      }),
      (t.remove = function (e) {
        var t = this.__element;
        if ((delete this.__value[e], delete this[e], 'style' === e)) t.style.cssText = '';
        else if ('id' === e) t.id = '';
        else {
          if (0 === e.indexOf('data-')) {
            var n = l(e.substr(5));
            delete t.dataset[n];
          }
          var r = { path: t._path + '.' + e, value: '' };
          t._triggerUpdate(r);
        }
      }),
      u(e, [
        {
          key: 'style',
          get: function () {
            return this.__element.style.cssText || void 0;
          },
        },
        {
          key: 'class',
          get: function () {
            return this.__value.class || void 0;
          },
        },
        {
          key: 'id',
          get: function () {
            return this.__value.id || void 0;
          },
        },
        {
          key: 'src',
          get: function () {
            return this.__value.src || void 0;
          },
        },
      ]),
      e
    );
  })();
  function oe(e) {
    return e._renderInfo;
  }
  function ae(e, t) {
    if (e) {
      var n,
        r = [];
      r.push(e);
      for (
        var i = function () {
          var e = r.shift(),
            i = t(e);
          n
            ? ((e.__parent.children = e.__parent.children || []), e.__parent.children.push(i))
            : ((n = i).children = []),
            e.childNodes &&
              e.childNodes.length &&
              (e.childNodes.forEach(function (e) {
                return (e.__parent = i);
              }),
              (r = r.concat(e.childNodes))),
            i.children || (i.children = []);
        };
        r.length;

      )
        i();
      return n;
    }
  }
  function se(e) {
    return ae(e, oe);
  }
  function ue(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  var ce = (function (e) {
      function t(t) {
        var n;
        (t.type = 'element'), (n = e.call(this, t) || this);
        var r = t.tagName,
          i = void 0 === r ? '' : r,
          o = t.attrs,
          a = void 0 === o ? {} : o,
          s = t.nodeType,
          u = void 0 === s ? Y.ELEMENT_NODE : s;
        return (
          (n.__tagName = i),
          (n.__isBuiltinComponent = z.has(n.__tagName)),
          (n.__tmplName = n.__isBuiltinComponent ? n.__tagName : 'h-element'),
          (n.childNodes = []),
          (n.__nodeType = u),
          (n.style = new te($(n))),
          (n.__hasExtraAttribute = !1),
          (n.__attrs = new ie($(n))),
          D(n.__nodeId, $(n)),
          (n.dataset = {}),
          (n.__internal = null),
          n._initAttributes(a),
          n.id && !n.ownerDocument.__idMap.has(n.id) && n.ownerDocument.__idMap.set(n.id, $(n)),
          n
        );
      }
      c(t, e);
      var n = t.prototype;
      return (
        (n._destroy = function () {
          this.childNodes.forEach(function (e) {
            return e._destroy();
          }),
            D(this.__nodeId, null),
            this.ownerDocument.__idMap.set(this.id, null),
            e.prototype._destroy.call(this),
            (this.__tagName = ''),
            (this.childNodes.length = 0),
            (this.__nodeType = Y.ELEMENT_NODE);
        }),
        (n._initAttributes = function (e) {
          var t = this;
          void 0 === e && (e = {}),
            Object.keys(e).forEach(function (n) {
              t._setAttributeWithOutUpdate(n, e[n]);
            });
        }),
        (n._triggerUpdate = function (e, t) {
          void 0 === t && (t = !0), t ? this._enqueueRender(e) : this._root.__renderStacks.push(e);
        }),
        (n._adjustDocument = function (e) {
          var t = this;
          this.__ownerDocument.__pageId !== e.__ownerDocument.__pageId &&
            this._root.__renderCallbacks.push(function () {
              ae(e, function (e) {
                return (
                  e.id && (e.__ownerDocument.__idMap.delete(e.id), t.__ownerDocument.__idMap.set(e.id, e)),
                  (e.__ownerDocument = t.__ownerDocument),
                  {}
                );
              });
            });
        }),
        (n._processNodeType = function () {
          var e = '',
            t = this.__hasEventBinded,
            n = (this.__hasAppearEventBinded, this.__hasTouchEventBinded),
            r = this.__attrs.get('catchTouchMove'),
            i = this.__attrs.get('anchorScroll'),
            o = this.__hasExtraAttribute,
            a = q.has(this.__tmplName);
          return (
            t
              ? a && (n || (e = 'no-' + (n ? '' : 'touch-')))
              : (G.has(this.__tmplName) && (e = 'static-'), a && !o && (e = 'pure-')),
            r && X.has(this.__tmplName) && (e = 'catch-'),
            i && 'scroll-view' === this.__tmplName && (e = 'anchor-'),
            '' + e + this.__tmplName
          );
        }),
        (n._dealWithAttrsForCloneNode = function () {
          return {};
        }),
        (n._setAttributeWithOutUpdate = function (e, t) {
          this.__attrs.set(e, t, !1);
        }),
        (n.cloneNode = function (e) {
          var t = this,
            n = {};
          Object.keys(this.dataset).forEach(function (e) {
            var r;
            n[
              'data-' +
                ((r = e),
                r.replace(/[A-Z]/g, function (e) {
                  return '-' + e.toLowerCase();
                }))
            ] = t.dataset[e];
          });
          var i = this.ownerDocument._createElement({
            tagName: this.__tagName,
            attrs: r(
              { id: this.id, class: this.className, style: this.style.cssText, src: this.src },
              n,
              this._dealWithAttrsForCloneNode(),
            ),
            document: this.ownerDocument,
            nodeType: this.__nodeType,
          });
          if (e)
            for (
              var o,
                a = (function (e, t) {
                  var n = ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
                  if (n) return (n = n.call(e)).next.bind(n);
                  if (
                    Array.isArray(e) ||
                    (n = (function (e, t) {
                      if (e) {
                        if ('string' == typeof e) return ue(e, t);
                        var n = Object.prototype.toString.call(e).slice(8, -1);
                        return (
                          'Object' === n && e.constructor && (n = e.constructor.name),
                          'Map' === n || 'Set' === n
                            ? Array.from(e)
                            : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                            ? ue(e, t)
                            : void 0
                        );
                      }
                    })(e)) ||
                    (t && e && 'number' == typeof e.length)
                  ) {
                    n && (e = n);
                    var r = 0;
                    return function () {
                      return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
                    };
                  }
                  throw new TypeError(
                    'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                  );
                })(this.childNodes);
              !(o = a()).done;

            ) {
              var s = o.value;
              i.appendChild(s.cloneNode(e));
            }
          return i;
        }),
        (n.appendChild = function (e) {
          if (e !== this) {
            if (
              (e.parentNode && e.parentNode.removeChild(e),
              this.childNodes.push(e),
              (e.parentNode = this),
              this._isRendered())
            ) {
              e.__rendered = !0;
              var t = {
                type: 'children',
                path: this._path + '.children',
                start: this.childNodes.length - 1,
                deleteCount: 0,
                item: se(e),
              };
              this._triggerUpdate(t), this._adjustDocument(e);
            }
            return this;
          }
        }),
        (n.removeChild = function (e) {
          if (e instanceof Y) {
            var t = this.childNodes.indexOf(e);
            if (
              t >= 0 &&
              (this.childNodes.splice(t, 1), (e.parentNode = null), (e.__rendered = !1), this._isRendered())
            ) {
              e.__rendered = !1;
              var n = { type: 'children', path: this._path + '.children', start: t, deleteCount: 1 };
              this._triggerUpdate(n);
            }
            return e;
          }
        }),
        (n.insertBefore = function (e, t) {
          if (e instanceof Y && (!t || t instanceof Y) && e !== this) {
            e.parentNode && e.parentNode.removeChild(e), (e.parentNode = this);
            var n = t ? this.childNodes.indexOf(t) : -1;
            if ((-1 === n ? this.childNodes.push(e) : this.childNodes.splice(n, 0, e), this._isRendered())) {
              e.__rendered = !0;
              var r = {
                type: 'children',
                path: this._path + '.children',
                deleteCount: 0,
                item: se(e),
                start: -1 === n ? this.childNodes.length - 1 : n,
              };
              this._triggerUpdate(r), this._adjustDocument(e);
            }
            return e;
          }
        }),
        (n.replaceChild = function (e, t) {
          if (e instanceof Y && t instanceof Y) {
            var n = this.childNodes.indexOf(t);
            if ((-1 !== n && this.childNodes.splice(n, 1), e !== this)) {
              if (
                (e.parentNode && e.parentNode.removeChild(e),
                -1 === n ? this.childNodes.push(e) : this.childNodes.splice(n, 0, e),
                (e.parentNode = this),
                this._isRendered())
              ) {
                e.__rendered = !0;
                var r = {
                  type: 'children',
                  path: this._path + '.children',
                  start: -1 === n ? this.childNodes.length - 1 : n,
                  deleteCount: -1 === n ? 0 : 1,
                  item: se(e),
                };
                this._triggerUpdate(r), this._adjustDocument(e);
              }
              return t;
            }
          }
        }),
        (n.hasChildNodes = function () {
          return this.childNodes.length > 0;
        }),
        (n.getElementsByTagName = function (e) {
          var t = this;
          if ('string' != typeof e) return [];
          var n = [];
          return (
            ae(this, function (r) {
              return r !== t && r && r.__tagName === e && n.push(r), {};
            }),
            n
          );
        }),
        (n.getElementsByClassName = function (e) {
          var t = this;
          if ('string' != typeof e) return [];
          var n = [];
          return (
            ae(this, function (r) {
              var i = e.trim().split(/\s+/);
              return (
                r !== t &&
                  r &&
                  i.every(function (e) {
                    return r.classList && r.classList.contains(e);
                  }) &&
                  n.push(r),
                {}
              );
            }),
            n
          );
        }),
        (n.querySelector = function (e) {
          if ('.' === e[0]) {
            var t = this.getElementsByClassName(e.slice(1));
            return t.length > 0 ? t[0] : null;
          }
          if ('#' === e[0]) return this.ownerDocument.getElementById(e.slice(1));
          if (/^[a-zA-Z]/.test(e)) {
            var n = this.getElementsByTagName(e);
            return n.length > 0 ? n[0] : null;
          }
          return null;
        }),
        (n.querySelectorAll = function (e) {
          if ('string' != typeof e) return [];
          if ('.' === e[0]) return this.getElementsByClassName(e.slice(1));
          if ('#' === e[0]) {
            var t = this.ownerDocument.getElementById(e.slice(1));
            return t ? [t] : [];
          }
          return /^[a-zA-Z]/.test(e) ? this.getElementsByTagName(e) : null;
        }),
        (n.setAttribute = function (e, t, n) {
          void 0 === n && (n = !0),
            'id' === e &&
              t !== this.id &&
              (this.ownerDocument.__idMap.delete(this.id), this.ownerDocument.__idMap.set(t, this)),
            this.__attrs.set(e, t, n);
        }),
        (n.getAttribute = function (e) {
          return this.__attrs.get(e);
        }),
        (n.hasAttribute = function (e) {
          return 'style' === e || 'id' === e ? !!this.getAttribute(e) : this.__attrs.has(e);
        }),
        (n.removeAttribute = function (e) {
          return this.__attrs.remove(e);
        }),
        (n.contains = function (e) {
          for (var t = [], n = this; n; ) {
            if (n === e) return !0;
            var r = n.childNodes;
            r &&
              r.length &&
              r.forEach(function (e) {
                return t.push(e);
              }),
              (n = t.pop());
          }
          return !1;
        }),
        (n._enqueueRender = function (e) {
          this._root._enqueueRender(e);
        }),
        (n.getBoundingClientRect = function () {
          return (
            console.warn(
              'getBoundingClientRect is not supported, please use npm package universal-element to get DOM info in miniapp',
            ),
            {}
          );
        }),
        u(t, [
          {
            key: '_renderInfo',
            get: function () {
              var e = this._processNodeType();
              return r({ nodeType: e, nodeId: this.__nodeId, pageId: this.__pageId }, this.__attrs.__value, {
                style: this.style.cssText,
                class: this.__isBuiltinComponent ? this.className : 'h5-' + this.__tagName + ' ' + this.className,
              });
            },
          },
          {
            key: '_internal',
            get: function () {
              return this.__isCustomComponentRoot
                ? this.__internal
                : null !== this.parentNode
                ? this.parentNode._internal
                : this.__ownerDocument._internal;
            },
            set: function (e) {
              this.__internal = e;
            },
          },
          {
            key: 'id',
            get: function () {
              return this.__attrs.get('id') || '';
            },
            set: function (e) {
              this.setAttribute('id', e);
            },
          },
          {
            key: 'tagName',
            get: function () {
              return this.__tagName.toUpperCase();
            },
          },
          {
            key: 'className',
            get: function () {
              return this.getAttribute('class') || '';
            },
            set: function (e) {
              this.setAttribute('class', e);
            },
          },
          {
            key: 'classList',
            get: function () {
              return Q._create(this.className, this);
            },
          },
          {
            key: 'nodeName',
            get: function () {
              return this.tagName;
            },
          },
          {
            key: 'nodeType',
            get: function () {
              return this.__nodeType;
            },
          },
          {
            key: 'children',
            get: function () {
              return this.childNodes.filter(function (e) {
                return e.nodeType === Y.ELEMENT_NODE;
              });
            },
          },
          {
            key: 'firstChild',
            get: function () {
              return this.childNodes[0];
            },
          },
          {
            key: 'lastChild',
            get: function () {
              return this.childNodes[this.childNodes.length - 1];
            },
          },
          {
            key: 'innerText',
            get: function () {
              return this.textContent;
            },
            set: function (e) {
              this.textContent = e;
            },
          },
          {
            key: 'textContent',
            get: function () {
              return this.childNodes
                .map(function (e) {
                  return e.textContent;
                })
                .join('');
            },
            set: function (e) {
              if ((e = '' + e)) {
                this.childNodes.length = 0;
                var t = this.ownerDocument.createTextNode(e);
                this.appendChild(t);
              } else {
                var n = {
                  type: 'children',
                  path: this._path + '.children',
                  start: 0,
                  deleteCount: this.childNodes.length,
                };
                (this.childNodes.length = 0), this._triggerUpdate(n);
              }
            },
          },
          {
            key: 'attributes',
            get: function () {
              return this.__attrs;
            },
          },
          {
            key: 'src',
            get: function () {
              return this.__attrs ? this.__attrs.get('src') || void 0 : '';
            },
            set: function (e) {
              (e = '' + e), this.__attrs.set('src', e);
            },
          },
        ]),
        t
      );
    })(Y),
    le = 0,
    he = (function (e) {
      function t() {
        var t;
        t = e.call(this) || this;
        var n = +new Date();
        return (
          (t._customEventConstructor = (function (e) {
            function t(t, r) {
              return (
                void 0 === t && (t = ''),
                void 0 === r && (r = {}),
                (r.timeStamp = +new Date() - n),
                e.call(this, t, r) || this
              );
            }
            return c(t, e), t;
          })(p)),
          (t.__sharedHandlers = []),
          (t.HTMLIFrameElement = function () {}),
          t
        );
      }
      c(t, e);
      var n = t.prototype;
      return (
        (n._trigger = function (t, n) {
          var r = this;
          if ((void 0 === n && (n = {}), 'error' === t && 'string' == typeof n.event)) {
            for (var i = n.event, o = i.split('\n'), a = '', s = 0, u = o.length; s < u; s++) {
              var c = o[s];
              if (0 === c.trim().indexOf('at')) break;
              a += c + '\n';
            }
            var l = new Error(a);
            if (
              ((l.stack = i),
              (n.event = new this._customEventConstructor('error', {
                target: this,
                __extra: { message: a, filename: '', lineno: 0, colno: 0, error: l },
              })),
              (n.args = [a, l]),
              'function' == typeof this.onerror && !this.onerror.__isOfficial)
            ) {
              var h = this.onerror;
              (this.onerror = function (e, t, n) {
                h.call(r, t, '', 0, 0, n);
              }),
                (this.onerror.__isOfficial = !0);
            }
          }
          return e.prototype._trigger.call(this, t, n);
        }),
        (n.getComputedStyle = function () {
          console.warn('window.getComputedStyle is not supported.');
        }),
        (n.requestAnimationFrame = function (e) {
          if ('function' == typeof e) {
            var t = new Date(),
              n = Math.max(le + 16, t);
            return setTimeout(function () {
              e(n), (le = n);
            }, n - t);
          }
        }),
        (n.cancelAnimationFrame = function (e) {
          return clearTimeout(e);
        }),
        u(t, [
          {
            key: 'document',
            get: function () {
              return A(this.__pageId);
            },
          },
          {
            key: 'CustomEvent',
            get: function () {
              return this._customEventConstructor;
            },
          },
          {
            key: 'self',
            get: function () {
              return this;
            },
          },
          {
            key: 'setTimeout',
            get: function () {
              return setTimeout.bind(null);
            },
          },
          {
            key: 'clearTimeout',
            get: function () {
              return clearTimeout.bind(null);
            },
          },
          {
            key: 'setInterval',
            get: function () {
              return setInterval.bind(null);
            },
          },
          {
            key: 'clearInterval',
            get: function () {
              return clearInterval.bind(null);
            },
          },
          {
            key: 'HTMLElement',
            get: function () {
              return function () {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                return s(ce, t);
              };
            },
          },
          {
            key: 'Element',
            get: function () {
              return ce;
            },
          },
          {
            key: 'Node',
            get: function () {
              return Y;
            },
          },
          {
            key: 'RegExp',
            get: function () {
              return RegExp;
            },
          },
          {
            key: 'Math',
            get: function () {
              return Math;
            },
          },
          {
            key: 'Number',
            get: function () {
              return Number;
            },
          },
          {
            key: 'Boolean',
            get: function () {
              return Boolean;
            },
          },
          {
            key: 'String',
            get: function () {
              return String;
            },
          },
          {
            key: 'Date',
            get: function () {
              return Date;
            },
          },
          {
            key: 'Symbol',
            get: function () {
              return Symbol;
            },
          },
        ]),
        t
      );
    })(b);
  function de() {
    var e = W(),
      t = e.mainPackageName,
      n = (e.subPackages || {}).shareMemory;
    return ('' !== t && n && R(t)) || new he();
  }
  var _e = (function (e) {
      function t(t) {
        var n;
        return (t.type = 'text'), ((n = e.call(this, t) || this).__content = t.content || ''), n;
      }
      c(t, e);
      var n = t.prototype;
      return (
        (n._destroy = function () {
          e.prototype._destroy.call(this), (this.__content = '');
        }),
        (n._triggerUpdate = function (e) {
          this._root._enqueueRender(e);
        }),
        (n.cloneNode = function () {
          return this.ownerDocument.createTextNode(this.__content);
        }),
        u(t, [
          {
            key: '_renderInfo',
            get: function () {
              return { nodeType: 'h-' + this.__type, content: this.__content };
            },
          },
          {
            key: 'nodeName',
            get: function () {
              return '#text';
            },
          },
          {
            key: 'nodeType',
            get: function () {
              return Y.TEXT_NODE;
            },
          },
          {
            key: 'nodeValue',
            get: function () {
              return this.textContent;
            },
            set: function (e) {
              this.textContent = e;
            },
          },
          {
            key: 'textContent',
            get: function () {
              return this.__content;
            },
            set: function (e) {
              if (((e += ''), (this.__content = e), this._isRendered())) {
                var t = { path: this._path + '.content', value: e };
                this._triggerUpdate(t);
              }
            },
          },
          {
            key: 'data',
            get: function () {
              return this.textContent;
            },
            set: function (e) {
              this.textContent = e;
            },
          },
        ]),
        t
      );
    })(Y),
    fe = (function (e) {
      function t(t) {
        var n;
        return (t.type = 'comment'), ((n = e.call(this, t) || this).data = t.data), n;
      }
      return (
        c(t, e),
        (t.prototype.cloneNode = function () {
          return this.ownerDocument.createComment({ data: this.data });
        }),
        u(t, [
          {
            key: '_renderInfo',
            get: function () {
              return { nodeType: 'h-' + this.__type };
            },
          },
          {
            key: 'nodeName',
            get: function () {
              return '#comment';
            },
          },
          {
            key: 'nodeType',
            get: function () {
              return Y.COMMENT_NODE;
            },
          },
        ]),
        t
      );
    })(Y),
    pe = (function (e) {
      function t(t) {
        var n,
          r = t.width,
          i = t.height;
        return (
          'number' == typeof r && r >= 0 && (t.attrs.width = r),
          'number' == typeof i && i >= 0 && (t.attrs.height = i),
          ((n = e.call(this, t) || this).__naturalWidth = 0),
          (n.__naturalHeight = 0),
          n._initRect(),
          n
        );
      }
      c(t, e);
      var n = t.prototype;
      return (
        (n._destroy = function () {
          e.prototype._destroy.call(this), (this.__naturalWidth = null), (this.__naturalHeight = null);
        }),
        (n._initRect = function () {
          var e = parseInt(this.__attrs.get('width'), 10),
            t = parseInt(this.__attrs.get('height'), 10);
          'number' == typeof e && e >= 0 && (this.style.width = e + 'px'),
            'number' == typeof t && t >= 0 && (this.style.height = t + 'px');
        }),
        (n._resetRect = function (e) {
          void 0 === e && (e = {}),
            (this.__naturalWidth = e.width || 0),
            (this.__naturalHeight = e.height || 0),
            this._initRect();
        }),
        u(t, [
          {
            key: '_renderInfo',
            get: function () {
              return r({ nodeId: this.__nodeId, pageId: this.__pageId, nodeType: 'image' }, this.__attrs.__value, {
                style: this.style.cssText,
                class: 'h5-img ' + this.className,
              });
            },
          },
          {
            key: 'src',
            get: function () {
              return this.__attrs.get('src') || '';
            },
            set: function (e) {
              var t = this;
              e &&
                'string' == typeof e &&
                (this.__attrs.set('src', e),
                setTimeout(function () {
                  0 !== t.src.indexOf('data:image') &&
                    wx.getImageInfo({
                      src: t.src,
                      success: function (e) {
                        t._resetRect(e),
                          t._trigger('load', {
                            event: new f({ name: 'load', target: t, eventPhase: f.AT_TARGET }),
                            currentTarget: t,
                          });
                      },
                      fail: function () {
                        t._resetRect({ width: 0, height: 0 }),
                          t._trigger('error', {
                            event: new f({ name: 'error', target: t, eventPhase: f.AT_TARGET }),
                            currentTarget: t,
                          });
                      },
                    });
                }, 0));
            },
          },
          {
            key: 'width',
            get: function () {
              return +this.__attrs.get('width') || 0;
            },
            set: function (e) {
              'number' != typeof e || !isFinite(e) || e < 0 || (this.__attrs.set('width', e), this._initRect());
            },
          },
          {
            key: 'height',
            get: function () {
              return +this.__attrs.get('height') || 0;
            },
            set: function (e) {
              'number' != typeof e || !isFinite(e) || e < 0 || (this.__attrs.set('height', e), this._initRect());
            },
          },
          {
            key: 'naturalWidth',
            get: function () {
              return this.__naturalWidth;
            },
          },
          {
            key: 'naturalHeight',
            get: function () {
              return this.__naturalHeight;
            },
          },
        ]),
        t
      );
    })(ce),
    me = (function (e) {
      function t(t) {
        var n;
        return ((n = e.call(this, t) || this).__changed = !1), n;
      }
      c(t, e);
      var n = t.prototype;
      return (
        (n._dealWithAttrsForCloneNode = function () {
          return {
            type: this.type,
            value: this.value,
            disabled: this.disabled,
            maxlength: this.maxlength,
            placeholder: this.placeholder,
            mpplaceholderclass: this.mpplaceholderclass,
          };
        }),
        (n.setAttribute = function (t, n, r) {
          void 0 === r && (r = !0),
            ('focus' !== t && 'autofocus' !== t && 'autoFocus' !== t) || (t = 'focus-state'),
            'value' === t && (this.__changed = !0),
            e.prototype.setAttribute.call(this, t, n, r);
        }),
        (n._setAttributeWithOutUpdate = function (t, n) {
          ('focus' !== t && 'autofocus' !== t && 'autoFocus' !== t) || (t = 'focus-state'),
            'value' === t && (this.__changed = !0),
            e.prototype._setAttributeWithOutUpdate.call(this, t, n);
        }),
        (n.getAttribute = function (e) {
          return ('focus' !== e && 'autofocus' !== e && 'autoFocus' !== e) || (e = 'focus-state'), this.__attrs.get(e);
        }),
        (n.blur = function () {
          this.setAttribute('focus', !1);
        }),
        (n.focus = function () {
          this.setAttribute('focus', !0);
        }),
        u(t, [
          {
            key: '_renderInfo',
            get: function () {
              return r({ nodeId: this.__nodeId, pageId: this.__pageId, nodeType: 'input' }, this.__attrs.__value, {
                style: this.style.cssText,
                class: 'h5-input ' + this.className,
              });
            },
          },
          {
            key: 'name',
            get: function () {
              return this.__attrs.get('name');
            },
            set: function (e) {
              (e = '' + e), this.__attrs.set('name', e);
            },
          },
          {
            key: 'type',
            get: function () {
              return this.__attrs.get('type') || 'text';
            },
            set: function (e) {
              (e = '' + e), this.__attrs.set('type', e);
            },
          },
          {
            key: 'value',
            get: function () {
              var e = this.__attrs.get('value');
              return e || this.__changed || (e = this.__attrs.get('defaultValue')), e || '';
            },
            set: function (e) {
              (this.__changed = !0), (e = '' + e), this.__attrs.set('value', e);
            },
          },
          {
            key: 'readOnly',
            get: function () {
              return !!this.__attrs.get('readOnly');
            },
            set: function (e) {
              this.__attrs.set('readOnly', !!e);
            },
          },
          {
            key: 'disabled',
            get: function () {
              return !!this.__attrs.get('disabled');
            },
            set: function (e) {
              (e = !!e), this.__attrs.set('disabled', e);
            },
          },
          {
            key: 'maxlength',
            get: function () {
              return this.__attrs.get('maxlength');
            },
            set: function (e) {
              this.__attrs.set('maxlength', e);
            },
          },
          {
            key: 'placeholder',
            get: function () {
              return this.__attrs.get('placeholder') || '';
            },
            set: function (e) {
              (e = '' + e), this.__attrs.set('placeholder', e);
            },
          },
          {
            key: 'checked',
            get: function () {
              return this.__attrs.get('checked') || '';
            },
            set: function (e) {
              this.__attrs.set('checked', e);
            },
          },
        ]),
        t
      );
    })(ce),
    ge = (function (e) {
      function t(t) {
        var n;
        return ((n = e.call(this, t) || this).__changed = !1), n;
      }
      c(t, e);
      var n = t.prototype;
      return (
        (n._dealWithAttrsForCloneNode = function () {
          return {
            type: this.type,
            value: this.value,
            disabled: this.disabled,
            maxlength: this.maxlength,
            placeholder: this.placeholder,
            mpplaceholderclass: this.mpplaceholderclass,
          };
        }),
        (n.setAttribute = function (t, n, r) {
          void 0 === r && (r = !0),
            ('focus' !== t && 'autofocus' !== t && 'autoFocus' !== t) || (t = 'focus-state'),
            'value' === t && (this.__changed = !0),
            e.prototype.setAttribute.call(this, t, n, r);
        }),
        (n._setAttributeWithOutUpdate = function (t, n) {
          ('focus' !== t && 'autofocus' !== t && 'autoFocus' !== t) || (t = 'focus-state'),
            'value' === t && (this.__changed = !0),
            e.prototype._setAttributeWithOutUpdate.call(this, t, n);
        }),
        (n.getAttribute = function (e) {
          return ('focus' !== e && 'autofocus' !== e && 'autoFocus' !== e) || (e = 'focus-state'), this.__attrs.get(e);
        }),
        (n.blur = function () {
          this.setAttribute('focus', !1);
        }),
        (n.focus = function () {
          this.setAttribute('focus', !0);
        }),
        u(t, [
          {
            key: '_renderInfo',
            get: function () {
              return r({ nodeId: this.__nodeId, pageId: this.__pageId, nodeType: 'textarea' }, this.__attrs.__value, {
                style: this.style.cssText,
                class: 'h5-textarea ' + this.className,
              });
            },
          },
          {
            key: 'name',
            get: function () {
              return this.__attrs.get('name');
            },
            set: function (e) {
              (e = '' + e), this.__attrs.set('name', e);
            },
          },
          {
            key: 'type',
            get: function () {
              return this.__attrs.get('type') || 'textarea';
            },
            set: function (e) {
              (e = '' + e), this.__attrs.set('type', e);
            },
          },
          {
            key: 'value',
            get: function () {
              var e = this.__attrs.get('value');
              return e || this.__changed || (e = this.__attrs.get('defaultValue')), e || '';
            },
            set: function (e) {
              (this.__changed = !0), (e = '' + e), this.__attrs.set('value', e);
            },
          },
          {
            key: 'readOnly',
            get: function () {
              return !!this.__attrs.get('readOnly');
            },
            set: function (e) {
              this.__attrs.set('readOnly', !!e);
            },
          },
          {
            key: 'disabled',
            get: function () {
              return !!this.__attrs.get('disabled');
            },
            set: function (e) {
              (e = !!e), this.__attrs.set('disabled', e);
            },
          },
          {
            key: 'maxlength',
            get: function () {
              return this.__attrs.get('maxlength');
            },
            set: function (e) {
              this.__attrs.set('maxlength', e);
            },
          },
          {
            key: 'placeholder',
            get: function () {
              return this.__attrs.get('placeholder') || '';
            },
            set: function (e) {
              (e = '' + e), this.__attrs.set('placeholder', e);
            },
          },
          {
            key: 'selectionStart',
            get: function () {
              var e = +this.__attrs.get('selection-start');
              return _(e) ? -1 : e;
            },
            set: function (e) {
              this.__attrs.set('selection-start', e);
            },
          },
          {
            key: 'selectionEnd',
            get: function () {
              var e = +this.__attrs.get('selection-end');
              return _(e) ? -1 : e;
            },
            set: function (e) {
              this.__attrs.set('selection-end', e);
            },
          },
        ]),
        t
      );
    })(ce),
    ve = (function (e) {
      function t(t) {
        var n,
          r = t.width,
          i = t.height;
        return (
          'number' == typeof r && r >= 0 && (t.attrs.width = r),
          'number' == typeof i && i >= 0 && (t.attrs.height = i),
          (n = e.call(this, t) || this)._initRect(),
          n
        );
      }
      return (
        c(t, e),
        (t.prototype._initRect = function () {
          var e = parseInt(this.__attrs.get('width'), 10),
            t = parseInt(this.__attrs.get('height'), 10);
          'number' == typeof e && e >= 0 && (this.$_style.width = e + 'px'),
            'number' == typeof t && t >= 0 && (this.$_style.height = t + 'px');
        }),
        u(t, [
          {
            key: '_renderInfo',
            get: function () {
              return r({ nodeId: this.__nodeId, pageId: this.__pageId, nodeType: 'video' }, this.__attrs.__value, {
                style: this.style.cssText,
                class: 'h5-video ' + this.className,
              });
            },
          },
          {
            key: 'src',
            get: function () {
              return this.__attrs.get('src') || '';
            },
            set: function (e) {
              e && 'string' == typeof e && this.__attrs.set('src', e);
            },
          },
          {
            key: 'width',
            get: function () {
              return +this.__attrs.get('width') || 0;
            },
            set: function (e) {
              'number' != typeof e || !isFinite(e) || e < 0 || (this.__attrs.set('width', e), this._initRect());
            },
          },
          {
            key: 'height',
            get: function () {
              return +this.__attrs.get('height') || 0;
            },
            set: function (e) {
              'number' != typeof e || !isFinite(e) || e < 0 || (this.__attrs.set('height', e), this._initRect());
            },
          },
          {
            key: 'autoplay',
            get: function () {
              return !!this.__attrs.get('autoplay');
            },
            set: function (e) {
              (e = !!e), this.__attrs.set('autoplay', e);
            },
          },
          {
            key: 'loop',
            get: function () {
              return !!this.__attrs.get('loop');
            },
            set: function (e) {
              (e = !!e), this.__attrs.set('loop', e);
            },
          },
          {
            key: 'muted',
            get: function () {
              return !!this.__attrs.get('muted');
            },
            set: function (e) {
              (e = !!e), this.__attrs.set('muted', e);
            },
          },
          {
            key: 'controls',
            get: function () {
              var e = this.__attrs.get('controls');
              return !!_(e) || !!e;
            },
            set: function (e) {
              this.__attrs.set('controls', e);
            },
          },
          {
            key: 'poster',
            get: function () {
              return this.__attrs.get('poster');
            },
            set: function (e) {
              e && 'string' == typeof e && this.__attrs.set('poster', e);
            },
          },
          {
            key: 'currentTime',
            get: function () {
              return +this.__attrs.get('currentTime') || 0;
            },
          },
          {
            key: 'buffered',
            get: function () {
              return this.__attrs.get('buffered');
            },
          },
        ]),
        t
      );
    })(ce),
    ye = (function (e) {
      function t(t) {
        var n;
        return ((n = e.call(this, t) || this).__nativeType = t.nativeType), n;
      }
      return (
        c(t, e),
        (t.prototype._destroy = function () {
          e.prototype._destroy.call(this), (this.__nativeType = null);
        }),
        u(t, [
          {
            key: '_renderInfo',
            get: function () {
              var e = this,
                t = r(
                  {
                    nodeId: this.__nodeId,
                    pageId: this.__pageId,
                    nodeType: this.__tagName,
                    style: this.style.cssText,
                    className: this.className,
                  },
                  this.__attrs.__value,
                ),
                n = W(),
                i = null;
              return (
                'customComponent' === this.__nativeType
                  ? (i = n.usingComponents[this.__tagName])
                  : 'miniappPlugin' === this.__nativeType && (i = n.usingPlugins[this.__tagName]),
                i &&
                  i.events.forEach(function (n) {
                    var r = e.__tagName + '_' + n + '_' + d();
                    (t[n] = r),
                      j(r, function () {
                        for (var t = arguments.length, r = new Array(t), i = 0; i < t; i++) r[i] = arguments[i];
                        e._trigger(n, { args: r });
                      });
                  }),
                t
              );
            },
          },
        ]),
        t
      );
    })(ce),
    be = (function (e) {
      function t(t) {
        var n;
        return (
          ((n = e.call(this, t) || this).__nodeId = t.nodeId),
          (n.__allowRender = !0),
          (n.__renderStacks = []),
          (n.__renderCallbacks = []),
          n
        );
      }
      c(t, e);
      var n = t.prototype;
      return (
        (n._destroy = function () {
          e.prototype._destroy.call(this), (this.__allowRender = null), (this.__renderStacks = null);
        }),
        (n._enqueueRender = function (e) {
          var t = this;
          clearTimeout(this.__timer),
            (this.__timer = setTimeout(function () {
              t._executeRender();
            }, 0)),
            this.__renderStacks.push(e);
        }),
        (n._executeRender = function () {
          var e = this;
          if (this.__allowRender) {
            var t = A(this.__pageId)._internal,
              n = W().mainPackageName,
              r = R(n);
            if (t.$batchedUpdates) {
              var i;
              t.$batchedUpdates(function () {
                e.__renderStacks.forEach(function (n, o) {
                  if (
                    (o === e.__renderStacks.length - 1 &&
                      ((i = function () {
                        var t;
                        for (r._trigger('setDataFinished'); (t = e.__renderCallbacks.pop()); ) t();
                      }),
                      t.firstRenderCallback()),
                    'children' === n.type)
                  ) {
                    var a,
                      s = [n.start, n.deleteCount];
                    t.$spliceData((((a = {})[n.path] = n.item ? s.concat(n.item) : s), a), i);
                  } else {
                    var u;
                    t.setData((((u = {})[n.path] = n.value), u), i);
                  }
                });
              });
            } else {
              var o = {},
                a = [];
              this.__renderStacks.forEach(function (e) {
                var n = e.path;
                if ('children' === e.type) {
                  var r = (function (e, t, n) {
                    n.find(function (n) {
                      var r = n.path,
                        i = n.value;
                      if (r === t) return (t = ''), (e = i), !0;
                      var o = t.split(r + '.');
                      return o.length > 1 && ((t = o[1]), (e = i), !0);
                    });
                    var r = e,
                      i = !0;
                    if ('[object Object]' !== Object.prototype.toString.call(r) && !Array.isArray(r))
                      return { parentRendered: i, value: r };
                    var o = t.split('.');
                    if (o.length > 0)
                      for (var a = 0; a < o.length; a++) {
                        var s = o[a].match(/\[(.+?)\]/),
                          u = s && s[1] ? s[1] : o[a];
                        if (!r[u] && a !== o.length - 1) {
                          i = !1;
                          break;
                        }
                        r = r[u];
                      }
                    return { parentRendered: i, value: r };
                  })(t.data, n, a);
                  a.push({ path: e.path, value: r.value }),
                    o[n] || (o[n] = r.value ? [].concat(r.value) : []),
                    e.item ? o[n].splice(e.start, e.deleteCount, e.item) : o[n].splice(e.start, e.deleteCount);
                } else o[n] = e.value;
              }),
                t.firstRenderCallback(o),
                t.setData(o, function () {
                  var t;
                  for (r._trigger('setDataFinished'); (t = e.__renderCallbacks.pop()); ) t();
                });
            }
            this.__renderStacks = [];
          }
        }),
        u(t, [
          {
            key: '_path',
            get: function () {
              return 'root';
            },
          },
          {
            key: '_root',
            get: function () {
              return this;
            },
          },
        ]),
        t
      );
    })(ce),
    Ne = new Map([
      ['img', pe],
      ['input', me],
      ['textarea', ge],
      ['video', ve],
    ]),
    we = (function (e) {
      function t(t) {
        var n;
        n = e.call(this) || this;
        var r = W(),
          i = r.usingComponents,
          o = void 0 === i ? {} : i,
          a = r.usingPlugins,
          s = void 0 === a ? {} : a;
        (n.usingComponents = o), (n.usingPlugins = s), (n.__idMap = new Map()), (n.__pageId = t);
        var u = 'e-body-' + t;
        return (
          (n.__root = new be({ nodeId: u, type: 'element', tagName: 'body', attrs: {}, children: [], document: $(n) })),
          D(u, n.__root),
          (n.__root.parentNode = $(n)),
          n
        );
      }
      c(t, e);
      var n = t.prototype;
      return (
        (n._trigger = function (e, t) {
          return this.documentElement._trigger(e, t);
        }),
        (n._isRendered = function () {
          return !0;
        }),
        (n._createElement = function (e) {
          var t = Ne.get(e.tagName);
          return t
            ? new t(e)
            : ((e.attrs = e.attrs || {}),
              e.attrs.__native
                ? this.usingComponents[e.tagName]
                  ? ((e.nativeType = 'customComponent'), new ye(e))
                  : this.usingPlugins[e.tagName]
                  ? ((e.nativeType = 'miniappPlugin'), new ye(e))
                  : void 0
                : new ce(e));
        }),
        (n.getElementById = function (e) {
          if ('string' == typeof e) {
            var t = this.__idMap.get(e);
            return t && t._isRendered() ? t : null;
          }
        }),
        (n.getElementsByTagName = function (e) {
          var t = this;
          if ('string' != typeof e) return [];
          var n = [];
          return (
            L().forEach(function (r) {
              r && r.__tagName === e && r._isRendered() && r.__pageId === t.__pageId && n.push(r);
            }),
            n
          );
        }),
        (n.getElementsByClassName = function (e) {
          var t = this;
          if ('string' != typeof e) return [];
          var n = [];
          return (
            L().forEach(function (r) {
              var i = e.trim().split(/\s+/);
              r &&
                r._isRendered() &&
                r.__pageId === t.__pageId &&
                i.every(function (e) {
                  return r.classList && r.classList.contains(e);
                }) &&
                n.push(r);
            }),
            n
          );
        }),
        (n.querySelector = function (e) {
          if ('string' == typeof e) {
            if ('.' === e[0]) {
              var t = this.getElementsByClassName(e.slice(1));
              return t.length > 0 ? t[0] : null;
            }
            if ('#' === e[0]) return this.getElementById(e.slice(1));
            if (/^[a-zA-Z]/.test(e)) {
              var n = this.getElementsByTagName(e);
              return n.length > 0 ? n[0] : null;
            }
            return null;
          }
        }),
        (n.querySelectorAll = function (e) {
          if ('string' != typeof e) return [];
          if ('.' === e[0]) return this.getElementsByClassName(e.slice(1));
          if ('#' === e[0]) {
            var t = this.getElementById(e.slice(1));
            return t ? [t] : [];
          }
          return /^[a-zA-Z]/.test(e) ? this.getElementsByTagName(e) : null;
        }),
        (n.createElement = function (e) {
          return this._createElement({ document: this, tagName: e });
        }),
        (n.createElementNS = function (e, t) {
          return this.createElement(t);
        }),
        (n.createTextNode = function (e) {
          return new _e({ content: (e = '' + e), document: this });
        }),
        (n.createComment = function (e) {
          return new fe({ document: this, data: e });
        }),
        (n.createDocumentFragment = function () {
          return new ce({ tagName: 'documentfragment', nodeType: Y.DOCUMENT_FRAGMENT_NODE, document: this });
        }),
        (n.createEvent = function () {
          var e = W().mainPackageName;
          return new (R(e).CustomEvent)();
        }),
        (n.addEventListener = function (e, t, n) {
          this.documentElement.addEventListener(e, t, n);
        }),
        (n.removeEventListener = function (e, t, n) {
          this.documentElement.removeEventListener(e, t, n);
        }),
        (n.dispatchEvent = function (e) {
          this.documentElement.dispatchEvent(e);
        }),
        u(t, [
          {
            key: 'nodeType',
            get: function () {
              return Y.DOCUMENT_NODE;
            },
          },
          {
            key: 'documentElement',
            get: function () {
              return this.body;
            },
          },
          {
            key: 'body',
            get: function () {
              return this.__root;
            },
          },
          {
            key: 'nodeName',
            get: function () {
              return '#document';
            },
          },
          {
            key: 'defaultView',
            get: function () {
              var e = W().mainPackageName;
              return R(e) || null;
            },
          },
        ]),
        t
      );
    })(b);
  function Ee(e) {
    var t = new we(e);
    return I(e, { document: t }), t;
  }
  var xe = ['onLaunch', 'onShow', 'onHide', 'onError', 'onPageNotFound'];
  function Te(e) {
    if (e) {
      var t = e.currentTarget;
      return B(t && t.dataset.privateNodeId);
    }
  }
  var ke = [
      { name: 'onTap', eventName: 'click', extra: { button: 0 } },
      { name: 'onLongTap', eventName: 'longtap' },
      { name: 'onTouchStart', eventName: 'touchstart' },
      { name: 'onTouchMove', eventName: 'touchmove' },
      { name: 'onTouchEnd', eventName: 'touchend' },
      { name: 'onTouchCancel', eventName: 'touchcancel' },
    ],
    Ce = {
      name: 'scroll-view',
      singleEvents: [
        { name: 'onScrollViewScrollToUpper', eventName: 'scrolltoupper' },
        { name: 'onScrollViewScrollToLower', eventName: 'scrolltolower' },
      ],
      functionalSingleEvents: [
        {
          name: 'onScrollViewScroll',
          eventName: 'scroll',
          middleware: function (e, t) {
            t._setAttributeWithOutUpdate('scroll-into-view', ''),
              t._setAttributeWithOutUpdate('scroll-top', e.detail.scrollTop),
              t._setAttributeWithOutUpdate('scroll-left', e.detail.scrollLeft);
          },
        },
      ],
    };
  Ce.singleEvents = Ce.singleEvents.concat([
    { name: 'onScrollViewRefresherPulling', eventName: 'refresherpulling' },
    { name: 'onScrollViewRefresherRefresh', eventName: 'refresherrefresh' },
    { name: 'onScrollViewRefresherRestore', eventName: 'refresherrestore' },
    { name: 'onScrollViewRefresherAbort', eventName: 'refresherabort' },
  ]);
  var Se = {
    name: 'swiper',
    singleEvents: [{ name: 'onSwiperTransition', eventName: 'transition' }],
    functionalSingleEvents: [
      {
        name: 'onSwiperChange',
        eventName: 'change',
        middleware: function (e, t) {
          t._setAttributeWithOutUpdate('current', e.detail.current);
        },
      },
    ],
  };
  Se.singleEvents.push({ name: 'onSwiperAnimationFinish', eventName: 'animationfinish' });
  var Ie = {
      name: 'input',
      simpleEvents: [{ name: 'onInputConfirm', eventName: 'confirm' }],
      singleEvents: [{ name: 'onInputKeyBoardHeightChange', eventName: 'keyboardheightchange' }],
      complexEvents: [
        {
          name: 'onInputInput',
          eventName: 'input',
          middleware: function (e, t, n) {
            var r = '' + e.detail.value;
            t._setAttributeWithOutUpdate('value', r), this.callEvent('input', e, null, n);
          },
        },
        {
          name: 'onInputFocus',
          eventName: 'focus',
          middleware: function (e, t, n) {
            (t.__inputOldValue = t.value || ''),
              t._setAttributeWithOutUpdate('focus-state', !0),
              this.callSimpleEvent('focus', e, t);
          },
        },
        {
          name: 'onInputBlur',
          eventName: 'blur',
          middleware: function (e, t, n) {
            t._setAttributeWithOutUpdate('focus-state', !1),
              _(t.__inputOldValue) ||
                t.value === t.__inputOldValue ||
                ((t.__inputOldValue = void 0), this.callEvent('change', e, null, n)),
              this.callSimpleEvent('blur', e, t);
          },
        },
      ],
    },
    Oe = {
      name: 'picker',
      singleEvents: [{ name: 'onPickerCancel', eventName: 'cancel' }],
      functionalSingleEvents: [
        {
          name: 'onPickerChange',
          eventName: 'change',
          middleware: function (e, t) {
            t._setAttributeWithOutUpdate('value', e.detail.value);
          },
        },
      ],
    };
  Oe.singleEvents.push({ name: 'onPickerColumnChange', eventName: 'columnchange' });
  var Ae = {
    name: 'textarea',
    singleEvents: [{ name: 'onTextareaKeyboardHeightChange', eventName: 'keyboardheightchange' }],
    simpleEvents: [{ name: 'onTextareaConfirm', eventName: 'confirm' }],
    complexEvents: [
      {
        name: 'onTextareaFocus',
        eventName: 'input',
        middleware: function (e, t, n) {
          (t.__textareaOldValue = t.value || ''),
            t._setAttributeWithOutUpdate('focus-state', !0),
            this.callSimpleEvent('focus', e, t);
        },
      },
      {
        name: 'onTextareaBlur',
        eventName: 'blur',
        middleware: function (e, t, n) {
          t._setAttributeWithOutUpdate('focus-state', !1),
            _(t.__textareaOldValue) ||
              t.value === t.__textareaOldValue ||
              ((t.__textareaOldValue = void 0), this.callEvent('change', e, null, n)),
            this.callSimpleEvent('blur', e, t);
        },
      },
      {
        name: 'onTextareaInput',
        eventName: 'input',
        middleware: function (e, t, n) {
          var r = '' + e.detail.value;
          t._setAttributeWithOutUpdate('value', r), this.callEvent('input', e, null, n);
        },
      },
    ],
  };
  Ae.simpleEvents = Ae.simpleEvents.concat([{ name: 'onTextareaLineChange', eventName: 'linechange' }]);
  var Pe = {
    name: 'camera',
    singleEvents: [
      { name: 'onCameraStop', eventName: 'stop' },
      { name: 'onCameraError', eventName: 'error' },
      { name: 'onCameraScanCode', eventName: 'scancode' },
    ],
  };
  Pe.singleEvents = Pe.singleEvents.concat([{ name: 'onCameraInitDone', eventName: 'initdone' }]);
  var Re = {
    name: 'live-player',
    singleEvents: [
      { name: 'onLivePlayerStateChange', eventName: 'statechange' },
      { name: 'onLivePlayerFullScreenChange', eventName: 'fullscreenchange' },
    ],
  };
  Re.singleEvents = Re.singleEvents.concat([
    { name: 'onLivePlayerNetStatus', eventName: 'netstatus' },
    { name: 'onLivePlayerAudioVolumeNofify', eventName: 'audiovolumenotify' },
    { name: 'onLivePlayerEnterPictureInPicture', eventName: 'enterpictureinpicture' },
    { name: 'onLivePlayerLeavePictureInPicture', eventName: 'leavepictureinpicture' },
  ]);
  var Me = {
    name: 'live-pusher',
    singleEvents: [
      { name: 'onLivePusherStateChange', eventName: 'statechange' },
      { name: 'onLivePusherError', eventName: 'error' },
      { name: 'onLivePusherNetStatus', eventName: 'netstatus' },
    ],
  };
  Me.singleEvents = Me.singleEvents.concat([
    { name: 'onLivePusherBgmStart', eventName: 'bgmstart' },
    { name: 'onLivePusherBgmProgress', eventName: 'bgmprogress' },
    { name: 'onLivePusherBgmComplete', eventName: 'bgmcomplete' },
    { name: 'onLivePusherAudioVolumeNofify', eventName: 'audiovolumenotify' },
  ]);
  var De = { simpleEvents: [], singleEvents: [], functionalSingleEvents: [], complexEvents: [] };
  function Be(e, t, n, r) {
    var i = B(r);
    i && b._process(i, e, t, n);
  }
  function Le(e, t, n) {
    n &&
      b._process(
        n,
        new f({
          name: e,
          target: n,
          eventPhase: f.AT_TARGET,
          detail: t && t.detail,
          __extra: t && t.extra,
          bubbles: !1,
        }),
      );
  }
  function Ue(e, t) {
    var n = this.getDomNodeFromEvt(t);
    n &&
      n._trigger(e, {
        event: new f({
          timeStamp: t && t.timeStamp,
          touches: t && t.touches,
          changedTouches: t && t.changedTouches,
          name: e,
          target: n,
          eventPhase: f.AT_TARGET,
          detail: t && t.detail,
          __extra: t && t.extra,
        }),
        currentTarget: n,
      });
  }
  function We() {
    var e = {};
    return (
      (e.getDomNodeFromEvt = Te),
      (e.callEvent = Be),
      (e.callSimpleEvent = Le),
      (e.callSingleEvent = Ue),
      ke.forEach(function (t) {
        var n = t.name,
          r = t.extra,
          i = void 0 === r ? null : r,
          o = t.eventName;
        e[n] = function (e) {
          var t = this.getDomNodeFromEvt(e).ownerDocument;
          t && t.__checkEvent(e) && this.callEvent(o, e, i, e.target.dataset.privateNodeId);
        };
      }),
      De.simpleEvents.forEach(function (t) {
        var n = t.name,
          r = t.eventName;
        e[n] = function (e) {
          var t = e.currentTarget.dataset.privateNodeId,
            n = B(t);
          n && this.callSimpleEvent(r, e, n);
        };
      }),
      De.singleEvents.forEach(function (t) {
        var n = t.name,
          r = t.eventName;
        e[n] = function (e) {
          !(function (e) {
            e.currentTarget ||
              ((e.currentTarget = { dataset: {} }),
              (e.currentTarget.dataset.privateNodeId = e.target.dataset.privateNodeId));
          })(e),
            this.callSingleEvent(r, e);
        };
      }),
      De.functionalSingleEvents.forEach(function (t) {
        var n = t.name,
          r = t.eventName,
          i = t.middleware;
        e[n] = function (e) {
          var t = this.getDomNodeFromEvt(e);
          t && (i.call(this, e, t), this.callSingleEvent(r, e));
        };
      }),
      De.complexEvents.forEach(function (t) {
        var n = t.name,
          r = (t.eventName, t.middleware);
        e[n] = function (e) {
          var t = this.getDomNodeFromEvt(e);
          t && r.call(this, e, t, e.currentTarget.dataset.privateNodeId);
        };
      }),
      e
    );
  }
  return (
    [
      {
        name: 'cover-image',
        singleEvents: [
          { name: 'onCoverImageLoad', eventName: 'load' },
          { name: 'onCoverImageError', eventName: 'error' },
        ],
      },
      { name: 'cover-view' },
      { name: 'movable-area' },
      Ce,
      Se,
      { name: 'view' },
      { name: 'icon' },
      { name: 'progress', singleEvents: [{ name: 'onProgressActiveEnd', eventName: 'activeend' }] },
      { name: 'text' },
      { name: 'rich-text' },
      {
        name: 'button',
        singleEvents: [
          { name: 'onButtonGetUserInfo', eventName: 'getuserinfo' },
          { name: 'onButtonContact', eventName: 'contact' },
          { name: 'onButtonGetPhoneNumber', eventName: 'getphonenumber' },
          { name: 'onButtonError', eventName: 'error' },
          { name: 'onButtonOpenSetting', eventName: 'opensetting' },
          { name: 'onButtonLaunchApp', eventName: 'launchapp' },
          { name: 'onButtonGetAuthorize', eventName: 'getauthorize' },
        ],
      },
      {
        name: 'editor',
        singleEvents: [
          { name: 'onEditorReady', eventName: 'ready' },
          { name: 'onEditorFocus', eventName: 'focus' },
          { name: 'onEditorBlur', eventName: 'blur' },
          { name: 'onEditorInput', eventName: 'input' },
          { name: 'onEditorStatusChange', eventName: 'statuschange' },
        ],
      },
      {
        name: 'form',
        singleEvents: [
          { name: 'onFormSubmit', eventName: 'submit' },
          { name: 'onFormReset', eventName: 'reset' },
        ],
      },
      { name: 'label' },
      Ie,
      { name: 'radio-group', singleEvents: [{ name: 'onRadioChange', eventName: 'change' }] },
      { name: 'radio', singleEvents: [{ name: 'onRadioChange', eventName: 'change' }] },
      { name: 'checkbox-group', singleEvents: [{ name: 'onCheckboxChange', eventName: 'change' }] },
      { name: 'checkbox', singleEvents: [{ name: 'onCheckboxItemChange', eventName: 'change' }] },
      Oe,
      {
        name: 'picker-view',
        singleEvents: [
          { name: 'onPickerViewPickstart', eventName: 'pickstart' },
          { name: 'onPickerViewPickend', eventName: 'pickend' },
        ],
        functionalSingleEvents: [
          {
            name: 'onPickerViewChange',
            eventName: 'change',
            middleware: function (e, t) {
              t._setAttributeWithOutUpdate('value', e.detail.value);
            },
          },
        ],
      },
      {
        name: 'slider',
        singleEvents: [{ name: 'onSliderChanging', eventName: 'changing' }],
        functionalSingleEvents: [
          {
            name: 'onSliderChange',
            eventName: 'change',
            middleware: function (e, t) {
              t._setAttributeWithOutUpdate('value', e.detail.value),
                (t.__oldValues = t.__oldValues || {}),
                (t.__oldValues.value = e.detail.value);
            },
          },
        ],
      },
      {
        name: 'switch',
        functionalSingleEvents: [
          {
            name: 'onSwitchChange',
            eventName: 'change',
            middleware: function (e, t) {
              t._setAttributeWithOutUpdate('checked', e.detail.value);
            },
          },
        ],
      },
      Ae,
      {
        name: 'navigator',
        singleEvents: [
          { name: 'onNavigatorSuccess', eventName: 'success' },
          { name: 'onNavigatorFail', eventName: 'fail' },
          { name: 'onNavigatorComplete', eventName: 'complete' },
        ],
      },
      Pe,
      {
        name: 'image',
        singleEvents: [
          { name: 'onImageLoad', eventName: 'load' },
          { name: 'onImageError', eventName: 'error' },
        ],
      },
      {
        name: 'video',
        singleEvents: [
          { name: 'onVideoPlay', eventName: 'play' },
          { name: 'onVideoPause', eventName: 'pause' },
          { name: 'onVideoEnded', eventName: 'ended' },
          { name: 'onVideoFullScreenChange', eventName: 'fullscreenchange' },
          { name: 'onVideoWaiting', eventName: 'waiting' },
          { name: 'onVideoError', eventName: 'error' },
        ],
        functionalSingleEvents: [
          {
            name: 'onVideoTimeUpdate',
            eventName: 'timeupdate',
            middleware: function (e, t) {
              t._setAttributeWithOutUpdate('currentTime', e.detail.currentTime);
            },
          },
          {
            name: 'onVideoProgress',
            eventName: 'progress',
            middleware: function (e, t) {
              t._setAttributeWithOutUpdate('buffered', e.detail.buffered);
            },
          },
        ],
      },
      {
        name: 'map',
        singleEvents: [
          { name: 'onMapTap', eventName: 'tap' },
          { name: 'onMapUpdated', eventName: 'updated' },
          { name: 'onMapPoiTap', eventName: 'poitap' },
        ],
        functionalSingleEvents: [
          {
            name: 'onMapRegionChange',
            eventName: 'regionchange',
            middleware: function (e, t) {
              e.detail.causedBy || (e.detail.causedBy = e.causedBy);
            },
          },
          { name: 'onMapMarkerTap', eventName: 'markertap', middleware: function (e, t) {} },
          { name: 'onMapControlTap', eventName: 'controltap', middleware: function (e, t) {} },
          { name: 'onMapCalloutTap', eventName: 'callouttap', middleware: function (e, t) {} },
          { name: 'onMapPanelTap', eventName: 'paneltap', middleware: function (e, t) {} },
        ],
      },
      {
        name: 'canvas',
        singleEvents: [
          { name: 'onCanvasTouchStart', eventName: 'touchstart' },
          { name: 'onCanvasTouchMove', eventName: 'touchmove' },
          { name: 'onCanvasTouchEnd', eventName: 'touchend' },
          { name: 'onCanvasTouchCancel', eventName: 'touchcancel' },
          { name: 'onCanvasLongTap', eventName: 'longtap' },
          { name: 'onCanvasError', eventName: 'error' },
        ],
      },
      {
        name: 'web-view',
        singleEvents: [
          { name: 'onWebViewMessage', eventName: 'message' },
          { name: 'onWebViewLoad', eventName: 'load' },
          { name: 'onWebViewError', eventName: 'error' },
        ],
      },
      Re,
      Me,
      {
        name: 'movable-view',
        singleEvents: [
          { name: 'onMovableViewHtouchmove', eventName: 'htouchmove' },
          { name: 'onMovableViewVtouchmove', eventName: 'vtouchmove' },
        ],
        functionalSingleEvents: [
          {
            name: 'onMovableViewChange',
            eventName: 'change',
            middleware: function (e, t) {
              t._setAttributeWithOutUpdate('x', e.detail.x), t._setAttributeWithOutUpdate('y', e.detail.y);
            },
          },
          {
            name: 'onMovableViewScale',
            eventName: 'scale',
            middleware: function (e, t) {
              t._setAttributeWithOutUpdate('x', e.detail.x),
                t._setAttributeWithOutUpdate('y', e.detail.y),
                t._setAttributeWithOutUpdate('scale-value', e.detail.scale);
            },
          },
        ],
      },
      { name: 'swiper-item' },
      { name: 'picker-view-column' },
      {
        name: 'official-account',
        singleEvents: [
          { name: 'onOfficialAccountLoad', eventName: 'load' },
          { name: 'onOfficialAccountError', eventName: 'error' },
        ],
      },
      { name: 'contact-button' },
    ].forEach(function (e) {
      var t = e.simpleEvents,
        n = e.singleEvents,
        r = e.functionalSingleEvents,
        i = e.complexEvents;
      t && (De.simpleEvents = De.simpleEvents.concat(t)),
        n && (De.singleEvents = De.singleEvents.concat(n)),
        r && (De.functionalSingleEvents = De.functionalSingleEvents.concat(r)),
        i && (De.complexEvents = De.complexEvents.concat(i));
    }),
    {
      createAppConfig: function (e, t, i, o) {
        void 0 === i && (i = ''), void 0 === o && (o = {}), U(r({}, t, { mainPackageName: i }));
        var a = o,
          s = a.onLaunch,
          u = a.onShow,
          c = a.onHide,
          l = a.onError,
          h = a.onPageNotFound,
          d = n(a, xe);
        return r(
          {
            launched: !1,
            onLaunch: function (t) {
              var n = this;
              s && s.call(this, t);
              var r = de();
              P(i, r),
                (this.init = function (i) {
                  e(r, i), r._trigger('launch', { event: { options: t, context: n } });
                }),
                (this.window = r);
            },
            onShow: function (e) {
              u && u.call(this, e),
                (this.__showOptions = e),
                this.window &&
                  this.launched &&
                  this.window._trigger('appshow', { event: { options: e, context: this } });
            },
            onHide: function () {
              c && c.call(this), this.window && this.window._trigger('apphide', { event: { context: this } });
            },
            onError: function (e) {
              if ((l && l.call(this, e), this.window)) {
                var t = getCurrentPages() || [],
                  n = t[t.length - 1];
                n && n.window && n.window._trigger('error', { event: e }),
                  this.window._trigger('apperror', { event: { context: this, error: e } });
              }
            },
            onPageNotFound: function (e) {
              h && h.call(this, e),
                this.window && this.window._trigger('pagenotfound', { event: { options: e, context: this } });
            },
            __documentModifyCallbacks: [],
            _dispatchDocumentModify: function (e) {
              this.__documentModifyCallbacks.forEach(function (t) {
                t(e);
              });
            },
          },
          d,
        );
      },
      createPageConfig: function (e, t, n, i) {
        void 0 === t && (t = []), void 0 === i && (i = '');
        var o = r(
          {
            firstRender: !0,
            data: { root: { nodeId: 'e-body', nodeType: 'h-element', children: [] } },
            firstRenderCallback: function (e) {
              if (this.firstRender) {
                this.firstRender = !1;
                var t = { pageId: this.pageId, 'root.pageId': this.pageId, 'root.nodeId': 'e-body-' + this.pageId };
                e ? Object.assign(e, t) : this.setData(t);
              }
            },
          },
          (function (e, t, n) {
            return (
              void 0 === n && (n = ''),
              {
                onLoad: function (r) {
                  var i = this,
                    o = getApp();
                  (this.pageId = e + '-' + V(e)),
                    this.pageId === o.__pageId ? (this.document = A(this.pageId)) : (this.document = Ee(this.pageId)),
                    M(n)
                      ? (this.window = R(n))
                      : ((this.window = de()), P(n, this.window), t(this.window, this.document)),
                    o.launched || (o.init(this.document), (o.launched = !0), o.onShow.call(o, o.__showOptions)),
                    (this.document._internal = this),
                    H(this),
                    (this.query = r),
                    // TODO: 待解决此行报错问题，此行引起运行时 demo 报错
                    // this.window.history.location.__updatePageOption(r),
                    (this.window.__pageId = this.pageId),
                    (this.renderInfo = this.window.__pagesRenderInfo.find(function (e) {
                      var t = e.path;
                      return i.pageId.substring(0, i.pageId.lastIndexOf('-')) === t;
                    })),
                    this.renderInfo,
                    this.renderInfo.setDocument(this.document),
                    this.renderInfo.render(),
                    this.document._trigger('DOMContentLoaded');
                },
                onShow: function () {
                  this.window &&
                    ((this.window.__pageId = this.pageId),
                    this.firstRender ||
                      (this.renderInfo && this.renderInfo.setDocument(this.document),
                      this.window.history.location.__updatePageOption(this.query)),
                    this.document._trigger('miniapp_pageshow'),
                    this.document._trigger('onShow'));
                },
                onHide: function () {
                  this.window && (this.document._trigger('miniapp_pagehide'), this.document._trigger('onHide'));
                },
                onUnload: function () {
                  this.renderInfo.setDocument(this.document),
                    this.document._trigger('miniapp_pagehide'),
                    this.document._trigger('beforeunload'),
                    this.document._trigger('pageunload'),
                    this.document.__unmount && this.document.__unmount(),
                    this.document.body._destroy(),
                    O(this.pageId),
                    (this.pageId = null),
                    (this.window = null),
                    (this.document = null),
                    (this.query = null);
                },
              }
            );
          })(e, n, i),
          We(),
        );
        return (
          (function (e, t) {
            e.forEach(function (e) {
              ['onLoad', 'onShow', 'onHide', 'onUnload'].includes(e) ||
                (t[e] = (function (e) {
                  return 'onShareAppMessage' === e
                    ? function (e) {
                        if (this.document) {
                          var t = {};
                          return (
                            this.document._trigger('onShareAppMessage', { event: { options: e, shareInfo: t } }) ||
                            t.content
                          );
                        }
                      }
                    : function (t) {
                        this.document && this.document._trigger(e, { event: t });
                      };
                })(e));
            });
          })(t, o),
          o
        );
      },
      createElementConfig: function () {
        return r(
          {
            properties: { r: { type: Object, value: {} } },
            options: { styleIsolation: 'shared', virtualHost: !0 },
            methods: We(),
          },
          ((t = (e = {
            mount: function () {
              F(this);
              var e = B(this.properties.r.nodeId);
              (e._internal = this), (e.__isCustomComponentRoot = !0);
            },
          }).mount),
          (n = e.unmount),
          {
            attached: function () {
              for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
              t && t.apply(this, n);
            },
            detached: function () {
              for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
              n && n.apply(this, t);
            },
          }),
        );
        var e, t, n;
      },
      createDocument: Ee,
      createWindow: de,
    }
  );
});
