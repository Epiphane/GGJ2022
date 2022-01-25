// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"6G5nI":[function(require,module,exports) {
require('./helpers/bundle-manifest').register(JSON.parse("{\"6izcJ\":\"index.c158ff64.js\",\"3ALIf\":\"dialog_box.f6f683fb.png\",\"5A9qD\":\"hex_128x148.65aa51b6.png\",\"fS1Dt\":\"hex_128x148_forest.16e6097f.png\",\"gO4LK\":\"town_center.4fab3e86.png\",\"2sHap\":\"index.6f4e67d2.css\"}"));

},{"./helpers/bundle-manifest":"gS3k4"}],"gS3k4":[function(require,module,exports) {
"use strict";
var mapping = {
};
function register(pairs) {
    var keys = Object.keys(pairs);
    for(var i = 0; i < keys.length; i++)mapping[keys[i]] = pairs[keys[i]];
}
function resolve(id) {
    var resolved = mapping[id];
    if (resolved == null) throw new Error('Could not resolve bundle with id ' + id);
    return resolved;
}
module.exports.register = register;
module.exports.resolve = resolve;

},{}],"c4soQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "App", ()=>App
);
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _reactDom = require("react-dom");
var _reactDomDefault = parcelHelpers.interopDefault(_reactDom);
var _juicy = require("../lib/juicy");
var _hooks = require("./react-nonsense/hooks");
var _constants = require("./helpers/constants");
var _loading = require("./states/loading");
var _debug = require("./helpers/debug");
var _tooltipOverlay = require("./react-nonsense/react-components/tooltip-overlay");
var _tooltipOverlayDefault = parcelHelpers.interopDefault(_tooltipOverlay);
function App() {
    const size = _hooks.useWindowSize();
    const canvasRef = _react.useRef(null);
    const [loaded, setLoaded] = _react.useState(false);
    _react.useEffect(()=>{
        if (canvasRef.current === null) return;
        _juicy.Game.init({
            canvas: canvasRef.current,
            clearColor: "#000000",
            keys: _constants.KeyMapping,
            width: 2560,
            height: 1440
        });
        document.addEventListener('mousewheel', _juicy.Game.trigger.bind(_juicy.Game, 'mousewheel'));
        _juicy.Game.setState(new _loading.LoadingScreen()).run();
        if (_debug.__DEV__()) window.Game = _juicy.Game;
        setLoaded(true);
    }, [
        canvasRef,
        setLoaded
    ]);
    _react.useEffect(()=>{
        const canvas = canvasRef.current;
        if (canvas === null || !loaded) return;
        const maxScaleW = canvas.parentElement.clientWidth / _juicy.Game.size.x;
        const maxScaleH = canvas.parentElement.clientHeight / _juicy.Game.size.y;
        const scale = Math.min(maxScaleH, maxScaleW);
        canvas.style.width = `${_juicy.Game.size.x * scale}px`;
        canvas.style.height = `${_juicy.Game.size.y * scale}px`;
        _juicy.Game.resize();
    }, [
        size,
        loaded
    ]);
    return _jsxRuntime.jsxs("div", Object.assign({
        style: {
            position: "relative"
        }
    }, {
        children: [
            _jsxRuntime.jsx("canvas", {
                id: "game-canvas",
                ref: canvasRef
            }, void 0),
            _jsxRuntime.jsx(_tooltipOverlayDefault.default, {
            }, void 0)
        ]
    }), void 0);
}
_reactDomDefault.default.render(_jsxRuntime.jsx(App, {
}, void 0), document.getElementById("root"));

},{"react/jsx-runtime":"6AEwr","react":"21dqq","react-dom":"j6uA9","../lib/juicy":"5IxFy","./react-nonsense/hooks":"9Gsnu","./helpers/constants":"fZou4","./states/loading":"6WIln","./helpers/debug":"lNbV3","./react-nonsense/react-components/tooltip-overlay":"lJ4RK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6AEwr":[function(require,module,exports) {
'use strict';
module.exports = require('./cjs/react-jsx-runtime.production.min.js');

},{"./cjs/react-jsx-runtime.production.min.js":"5LMCS"}],"5LMCS":[function(require,module,exports) {
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
require("object-assign");
var f = require("react"), g = 60103;
exports.Fragment = 60107;
if ("function" === typeof Symbol && Symbol.for) {
    var h = Symbol.for;
    g = h("react.element");
    exports.Fragment = h("react.fragment");
}
var m = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n = Object.prototype.hasOwnProperty, p = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function q(c, a, k) {
    var b, d = {
    }, e = null, l = null;
    void 0 !== k && (e = "" + k);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (l = a.ref);
    for(b in a)n.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps) for(b in a = c.defaultProps, a)void 0 === d[b] && (d[b] = a[b]);
    return {
        $$typeof: g,
        type: c,
        key: e,
        ref: l,
        props: d,
        _owner: m.current
    };
}
exports.jsx = q;
exports.jsxs = q;

},{"object-assign":"7OXxh","react":"21dqq"}],"7OXxh":[function(require,module,exports) {
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/ 'use strict';
/* eslint-disable no-unused-vars */ var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
    if (val === null || val === undefined) throw new TypeError('Object.assign cannot be called with null or undefined');
    return Object(val);
}
function shouldUseNative() {
    try {
        if (!Object.assign) return false;
        // Detect buggy property enumeration order in older V8 versions.
        // https://bugs.chromium.org/p/v8/issues/detail?id=4118
        var test1 = "abc"; // eslint-disable-line no-new-wrappers
        test1[5] = 'de';
        if (Object.getOwnPropertyNames(test1)[0] === '5') return false;
        // https://bugs.chromium.org/p/v8/issues/detail?id=3056
        var test2 = {
        };
        for(var i = 0; i < 10; i++)test2['_' + String.fromCharCode(i)] = i;
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
        });
        if (order2.join('') !== '0123456789') return false;
        // https://bugs.chromium.org/p/v8/issues/detail?id=3056
        var test3 = {
        };
        'abcdefghijklmnopqrst'.split('').forEach(function(letter) {
            test3[letter] = letter;
        });
        if (Object.keys(Object.assign({
        }, test3)).join('') !== 'abcdefghijklmnopqrst') return false;
        return true;
    } catch (err) {
        // We don't expect any of the above to throw, but better to be safe.
        return false;
    }
}
module.exports = shouldUseNative() ? Object.assign : function(target, source) {
    var from;
    var to = toObject(target);
    var symbols;
    for(var s = 1; s < arguments.length; s++){
        from = Object(arguments[s]);
        for(var key in from)if (hasOwnProperty.call(from, key)) to[key] = from[key];
        if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for(var i = 0; i < symbols.length; i++)if (propIsEnumerable.call(from, symbols[i])) to[symbols[i]] = from[symbols[i]];
        }
    }
    return to;
};

},{}],"21dqq":[function(require,module,exports) {
'use strict';
module.exports = require('./cjs/react.production.min.js');

},{"./cjs/react.production.min.js":"88SCs"}],"88SCs":[function(require,module,exports) {
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
var l = require("object-assign"), n = 60103, p = 60106;
exports.Fragment = 60107;
exports.StrictMode = 60108;
exports.Profiler = 60114;
var q = 60109, r = 60110, t = 60112;
exports.Suspense = 60113;
var u = 60115, v = 60116;
if ("function" === typeof Symbol && Symbol.for) {
    var w = Symbol.for;
    n = w("react.element");
    p = w("react.portal");
    exports.Fragment = w("react.fragment");
    exports.StrictMode = w("react.strict_mode");
    exports.Profiler = w("react.profiler");
    q = w("react.provider");
    r = w("react.context");
    t = w("react.forward_ref");
    exports.Suspense = w("react.suspense");
    u = w("react.memo");
    v = w("react.lazy");
}
var x = "function" === typeof Symbol && Symbol.iterator;
function y(a) {
    if (null === a || "object" !== typeof a) return null;
    a = x && a[x] || a["@@iterator"];
    return "function" === typeof a ? a : null;
}
function z(a) {
    for(var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)b += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var A = {
    isMounted: function() {
        return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
}, B = {
};
function C(a, b, c) {
    this.props = a;
    this.context = b;
    this.refs = B;
    this.updater = c || A;
}
C.prototype.isReactComponent = {
};
C.prototype.setState = function(a, b) {
    if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error(z(85));
    this.updater.enqueueSetState(this, a, b, "setState");
};
C.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function D() {
}
D.prototype = C.prototype;
function E(a, b, c) {
    this.props = a;
    this.context = b;
    this.refs = B;
    this.updater = c || A;
}
var F = E.prototype = new D;
F.constructor = E;
l(F, C.prototype);
F.isPureReactComponent = !0;
var G = {
    current: null
}, H = Object.prototype.hasOwnProperty, I = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function J(a, b, c) {
    var e, d = {
    }, k = null, h = null;
    if (null != b) for(e in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b)H.call(b, e) && !I.hasOwnProperty(e) && (d[e] = b[e]);
    var g = arguments.length - 2;
    if (1 === g) d.children = c;
    else if (1 < g) {
        for(var f = Array(g), m = 0; m < g; m++)f[m] = arguments[m + 2];
        d.children = f;
    }
    if (a && a.defaultProps) for(e in g = a.defaultProps, g)void 0 === d[e] && (d[e] = g[e]);
    return {
        $$typeof: n,
        type: a,
        key: k,
        ref: h,
        props: d,
        _owner: G.current
    };
}
function K(a, b) {
    return {
        $$typeof: n,
        type: a.type,
        key: b,
        ref: a.ref,
        props: a.props,
        _owner: a._owner
    };
}
function L(a) {
    return "object" === typeof a && null !== a && a.$$typeof === n;
}
function escape(a) {
    var b = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + a.replace(/[=:]/g, function(a) {
        return b[a];
    });
}
var M = /\/+/g;
function N(a, b) {
    return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function O(a1, b, c, e, d) {
    var k = typeof a1;
    if ("undefined" === k || "boolean" === k) a1 = null;
    var h = !1;
    if (null === a1) h = !0;
    else switch(k){
        case "string":
        case "number":
            h = !0;
            break;
        case "object":
            switch(a1.$$typeof){
                case n:
                case p:
                    h = !0;
            }
    }
    if (h) return h = a1, d = d(h), a1 = "" === e ? "." + N(h, 0) : e, Array.isArray(d) ? (c = "", null != a1 && (c = a1.replace(M, "$&/") + "/"), O(d, b, c, "", function(a) {
        return a;
    })) : null != d && (L(d) && (d = K(d, c + (!d.key || h && h.key === d.key ? "" : ("" + d.key).replace(M, "$&/") + "/") + a1)), b.push(d)), 1;
    h = 0;
    e = "" === e ? "." : e + ":";
    if (Array.isArray(a1)) for(var g = 0; g < a1.length; g++){
        k = a1[g];
        var f = e + N(k, g);
        h += O(k, b, c, f, d);
    }
    else if (f = y(a1), "function" === typeof f) for(a1 = f.call(a1), g = 0; !(k = a1.next()).done;)k = k.value, f = e + N(k, g++), h += O(k, b, c, f, d);
    else if ("object" === k) throw b = "" + a1, Error(z(31, "[object Object]" === b ? "object with keys {" + Object.keys(a1).join(", ") + "}" : b));
    return h;
}
function P(a2, b, c) {
    if (null == a2) return a2;
    var e = [], d = 0;
    O(a2, e, "", "", function(a) {
        return b.call(c, a, d++);
    });
    return e;
}
function Q(a) {
    if (-1 === a._status) {
        var b1 = a._result;
        b1 = b1();
        a._status = 0;
        a._result = b1;
        b1.then(function(b) {
            0 === a._status && (b = b.default, a._status = 1, a._result = b);
        }, function(b) {
            0 === a._status && (a._status = 2, a._result = b);
        });
    }
    if (1 === a._status) return a._result;
    throw a._result;
}
var R = {
    current: null
};
function S() {
    var a = R.current;
    if (null === a) throw Error(z(321));
    return a;
}
var T = {
    ReactCurrentDispatcher: R,
    ReactCurrentBatchConfig: {
        transition: 0
    },
    ReactCurrentOwner: G,
    IsSomeRendererActing: {
        current: !1
    },
    assign: l
};
exports.Children = {
    map: P,
    forEach: function(a, b, c) {
        P(a, function() {
            b.apply(this, arguments);
        }, c);
    },
    count: function(a) {
        var b = 0;
        P(a, function() {
            b++;
        });
        return b;
    },
    toArray: function(a3) {
        return P(a3, function(a) {
            return a;
        }) || [];
    },
    only: function(a) {
        if (!L(a)) throw Error(z(143));
        return a;
    }
};
exports.Component = C;
exports.PureComponent = E;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;
exports.cloneElement = function(a, b, c) {
    if (null === a || void 0 === a) throw Error(z(267, a));
    var e = l({
    }, a.props), d = a.key, k = a.ref, h = a._owner;
    if (null != b) {
        void 0 !== b.ref && (k = b.ref, h = G.current);
        void 0 !== b.key && (d = "" + b.key);
        if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
        for(f in b)H.call(b, f) && !I.hasOwnProperty(f) && (e[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
    }
    var f = arguments.length - 2;
    if (1 === f) e.children = c;
    else if (1 < f) {
        g = Array(f);
        for(var m = 0; m < f; m++)g[m] = arguments[m + 2];
        e.children = g;
    }
    return {
        $$typeof: n,
        type: a.type,
        key: d,
        ref: k,
        props: e,
        _owner: h
    };
};
exports.createContext = function(a, b) {
    void 0 === b && (b = null);
    a = {
        $$typeof: r,
        _calculateChangedBits: b,
        _currentValue: a,
        _currentValue2: a,
        _threadCount: 0,
        Provider: null,
        Consumer: null
    };
    a.Provider = {
        $$typeof: q,
        _context: a
    };
    return a.Consumer = a;
};
exports.createElement = J;
exports.createFactory = function(a) {
    var b = J.bind(null, a);
    b.type = a;
    return b;
};
exports.createRef = function() {
    return {
        current: null
    };
};
exports.forwardRef = function(a) {
    return {
        $$typeof: t,
        render: a
    };
};
exports.isValidElement = L;
exports.lazy = function(a) {
    return {
        $$typeof: v,
        _payload: {
            _status: -1,
            _result: a
        },
        _init: Q
    };
};
exports.memo = function(a, b) {
    return {
        $$typeof: u,
        type: a,
        compare: void 0 === b ? null : b
    };
};
exports.useCallback = function(a, b) {
    return S().useCallback(a, b);
};
exports.useContext = function(a, b) {
    return S().useContext(a, b);
};
exports.useDebugValue = function() {
};
exports.useEffect = function(a, b) {
    return S().useEffect(a, b);
};
exports.useImperativeHandle = function(a, b, c) {
    return S().useImperativeHandle(a, b, c);
};
exports.useLayoutEffect = function(a, b) {
    return S().useLayoutEffect(a, b);
};
exports.useMemo = function(a, b) {
    return S().useMemo(a, b);
};
exports.useReducer = function(a, b, c) {
    return S().useReducer(a, b, c);
};
exports.useRef = function(a) {
    return S().useRef(a);
};
exports.useState = function(a) {
    return S().useState(a);
};
exports.version = "17.0.2";

},{"object-assign":"7OXxh"}],"j6uA9":[function(require,module,exports) {
'use strict';
function checkDCE() {
    /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */ if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') return;
    try {
        // Verify that the code above has been dead code eliminated (DCE'd).
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
        // DevTools shouldn't crash React, no matter what.
        // We should still report in case we break this code.
        console.error(err);
    }
}
// DCE check should happen before ReactDOM bundle executes so that
// DevTools can report bad minification during injection.
checkDCE();
module.exports = require('./cjs/react-dom.production.min.js');

},{"./cjs/react-dom.production.min.js":"b8wZs"}],"b8wZs":[function(require,module,exports) {
/** @license React v17.0.2
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ /*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/ 'use strict';
var aa = require("react"), m = require("object-assign"), r = require("scheduler");
function y(a) {
    for(var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)b += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
if (!aa) throw Error(y(227));
var ba = new Set, ca = {
};
function da(a, b) {
    ea(a, b);
    ea(a + "Capture", b);
}
function ea(a, b) {
    ca[a] = b;
    for(a = 0; a < b.length; a++)ba.add(b[a]);
}
var fa = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ha = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ia = Object.prototype.hasOwnProperty, ja = {
}, ka = {
};
function la(a) {
    if (ia.call(ka, a)) return !0;
    if (ia.call(ja, a)) return !1;
    if (ha.test(a)) return ka[a] = !0;
    ja[a] = !0;
    return !1;
}
function ma(a, b, c, d) {
    if (null !== c && 0 === c.type) return !1;
    switch(typeof b){
        case "function":
        case "symbol":
            return !0;
        case "boolean":
            if (d) return !1;
            if (null !== c) return !c.acceptsBooleans;
            a = a.toLowerCase().slice(0, 5);
            return "data-" !== a && "aria-" !== a;
        default:
            return !1;
    }
}
function na(a, b, c, d) {
    if (null === b || "undefined" === typeof b || ma(a, b, c, d)) return !0;
    if (d) return !1;
    if (null !== c) switch(c.type){
        case 3:
            return !b;
        case 4:
            return !1 === b;
        case 5:
            return isNaN(b);
        case 6:
            return isNaN(b) || 1 > b;
    }
    return !1;
}
function B(a, b, c, d, e, f, g) {
    this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
    this.attributeName = d;
    this.attributeNamespace = e;
    this.mustUseProperty = c;
    this.propertyName = a;
    this.type = b;
    this.sanitizeURL = f;
    this.removeEmptyString = g;
}
var D = {
};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
    D[a] = new B(a, 0, !1, a, null, !1, !1);
});
[
    [
        "acceptCharset",
        "accept-charset"
    ],
    [
        "className",
        "class"
    ],
    [
        "htmlFor",
        "for"
    ],
    [
        "httpEquiv",
        "http-equiv"
    ]
].forEach(function(a) {
    var b = a[0];
    D[b] = new B(b, 1, !1, a[1], null, !1, !1);
});
[
    "contentEditable",
    "draggable",
    "spellCheck",
    "value"
].forEach(function(a) {
    D[a] = new B(a, 2, !1, a.toLowerCase(), null, !1, !1);
});
[
    "autoReverse",
    "externalResourcesRequired",
    "focusable",
    "preserveAlpha"
].forEach(function(a) {
    D[a] = new B(a, 2, !1, a, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
    D[a] = new B(a, 3, !1, a.toLowerCase(), null, !1, !1);
});
[
    "checked",
    "multiple",
    "muted",
    "selected"
].forEach(function(a) {
    D[a] = new B(a, 3, !0, a, null, !1, !1);
});
[
    "capture",
    "download"
].forEach(function(a) {
    D[a] = new B(a, 4, !1, a, null, !1, !1);
});
[
    "cols",
    "rows",
    "size",
    "span"
].forEach(function(a) {
    D[a] = new B(a, 6, !1, a, null, !1, !1);
});
[
    "rowSpan",
    "start"
].forEach(function(a) {
    D[a] = new B(a, 5, !1, a.toLowerCase(), null, !1, !1);
});
var oa = /[\-:]([a-z])/g;
function pa(a) {
    return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
    var b = a.replace(oa, pa);
    D[b] = new B(b, 1, !1, a, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
    var b = a.replace(oa, pa);
    D[b] = new B(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
});
[
    "xml:base",
    "xml:lang",
    "xml:space"
].forEach(function(a) {
    var b = a.replace(oa, pa);
    D[b] = new B(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
[
    "tabIndex",
    "crossOrigin"
].forEach(function(a) {
    D[a] = new B(a, 1, !1, a.toLowerCase(), null, !1, !1);
});
D.xlinkHref = new B("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
[
    "src",
    "href",
    "action",
    "formAction"
].forEach(function(a) {
    D[a] = new B(a, 1, !1, a.toLowerCase(), null, !0, !0);
});
function qa(a, b, c, d) {
    var e = D.hasOwnProperty(b) ? D[b] : null;
    var f = null !== e ? 0 === e.type : d ? !1 : !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1] ? !1 : !0;
    f || (na(b, c, e, d) && (c = null), d || null === e ? la(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? !1 : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && !0 === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c))));
}
var ra = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, sa = 60103, ta = 60106, ua = 60107, wa = 60108, xa = 60114, ya = 60109, za = 60110, Aa = 60112, Ba = 60113, Ca = 60120, Da = 60115, Ea = 60116, Fa = 60121, Ga = 60128, Ha = 60129, Ia = 60130, Ja = 60131;
if ("function" === typeof Symbol && Symbol.for) {
    var E = Symbol.for;
    sa = E("react.element");
    ta = E("react.portal");
    ua = E("react.fragment");
    wa = E("react.strict_mode");
    xa = E("react.profiler");
    ya = E("react.provider");
    za = E("react.context");
    Aa = E("react.forward_ref");
    Ba = E("react.suspense");
    Ca = E("react.suspense_list");
    Da = E("react.memo");
    Ea = E("react.lazy");
    Fa = E("react.block");
    E("react.scope");
    Ga = E("react.opaque.id");
    Ha = E("react.debug_trace_mode");
    Ia = E("react.offscreen");
    Ja = E("react.legacy_hidden");
}
var Ka = "function" === typeof Symbol && Symbol.iterator;
function La(a) {
    if (null === a || "object" !== typeof a) return null;
    a = Ka && a[Ka] || a["@@iterator"];
    return "function" === typeof a ? a : null;
}
var Ma;
function Na(a) {
    if (void 0 === Ma) try {
        throw Error();
    } catch (c) {
        var b = c.stack.trim().match(/\n( *(at )?)/);
        Ma = b && b[1] || "";
    }
    return "\n" + Ma + a;
}
var Oa = !1;
function Pa(a, b) {
    if (!a || Oa) return "";
    Oa = !0;
    var c = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (b) {
            if (b = function() {
                throw Error();
            }, Object.defineProperty(b.prototype, "props", {
                set: function() {
                    throw Error();
                }
            }), "object" === typeof Reflect && Reflect.construct) {
                try {
                    Reflect.construct(b, []);
                } catch (k) {
                    var d = k;
                }
                Reflect.construct(a, [], b);
            } else {
                try {
                    b.call();
                } catch (k) {
                    d = k;
                }
                a.call(b.prototype);
            }
        } else {
            try {
                throw Error();
            } catch (k) {
                d = k;
            }
            a();
        }
    } catch (k) {
        if (k && d && "string" === typeof k.stack) {
            for(var e = k.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h];)h--;
            for(; 1 <= g && 0 <= h; g--, h--)if (e[g] !== f[h]) {
                if (1 !== g || 1 !== h) {
                    do if (g--, h--, 0 > h || e[g] !== f[h]) return "\n" + e[g].replace(" at new ", " at ");
                    while (1 <= g && 0 <= h)
                }
                break;
            }
        }
    } finally{
        Oa = !1, Error.prepareStackTrace = c;
    }
    return (a = a ? a.displayName || a.name : "") ? Na(a) : "";
}
function Qa(a) {
    switch(a.tag){
        case 5:
            return Na(a.type);
        case 16:
            return Na("Lazy");
        case 13:
            return Na("Suspense");
        case 19:
            return Na("SuspenseList");
        case 0:
        case 2:
        case 15:
            return a = Pa(a.type, !1), a;
        case 11:
            return a = Pa(a.type.render, !1), a;
        case 22:
            return a = Pa(a.type._render, !1), a;
        case 1:
            return a = Pa(a.type, !0), a;
        default:
            return "";
    }
}
function Ra(a) {
    if (null == a) return null;
    if ("function" === typeof a) return a.displayName || a.name || null;
    if ("string" === typeof a) return a;
    switch(a){
        case ua:
            return "Fragment";
        case ta:
            return "Portal";
        case xa:
            return "Profiler";
        case wa:
            return "StrictMode";
        case Ba:
            return "Suspense";
        case Ca:
            return "SuspenseList";
    }
    if ("object" === typeof a) switch(a.$$typeof){
        case za:
            return (a.displayName || "Context") + ".Consumer";
        case ya:
            return (a._context.displayName || "Context") + ".Provider";
        case Aa:
            var b = a.render;
            b = b.displayName || b.name || "";
            return a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef");
        case Da:
            return Ra(a.type);
        case Fa:
            return Ra(a._render);
        case Ea:
            b = a._payload;
            a = a._init;
            try {
                return Ra(a(b));
            } catch (c) {
            }
    }
    return null;
}
function Sa(a) {
    switch(typeof a){
        case "boolean":
        case "number":
        case "object":
        case "string":
        case "undefined":
            return a;
        default:
            return "";
    }
}
function Ta(a) {
    var b = a.type;
    return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a1) {
    var b = Ta(a1) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a1.constructor.prototype, b), d = "" + a1[b];
    if (!a1.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
        var e = c.get, f = c.set;
        Object.defineProperty(a1, b, {
            configurable: !0,
            get: function() {
                return e.call(this);
            },
            set: function(a) {
                d = "" + a;
                f.call(this, a);
            }
        });
        Object.defineProperty(a1, b, {
            enumerable: c.enumerable
        });
        return {
            getValue: function() {
                return d;
            },
            setValue: function(a) {
                d = "" + a;
            },
            stopTracking: function() {
                a1._valueTracker = null;
                delete a1[b];
            }
        };
    }
}
function Va(a) {
    a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
    if (!a) return !1;
    var b = a._valueTracker;
    if (!b) return !0;
    var c = b.getValue();
    var d = "";
    a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
    a = d;
    return a !== c ? (b.setValue(a), !0) : !1;
}
function Xa(a) {
    a = a || ("undefined" !== typeof document ? document : void 0);
    if ("undefined" === typeof a) return null;
    try {
        return a.activeElement || a.body;
    } catch (b) {
        return a.body;
    }
}
function Ya(a, b) {
    var c = b.checked;
    return m({
    }, b, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: null != c ? c : a._wrapperState.initialChecked
    });
}
function Za(a, b) {
    var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
    c = Sa(null != b.value ? b.value : c);
    a._wrapperState = {
        initialChecked: d,
        initialValue: c,
        controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value
    };
}
function $a(a, b) {
    b = b.checked;
    null != b && qa(a, "checked", b, !1);
}
function ab(a, b) {
    $a(a, b);
    var c = Sa(b.value), d = b.type;
    if (null != c) {
        if ("number" === d) {
            if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
        } else a.value !== "" + c && (a.value = "" + c);
    } else if ("submit" === d || "reset" === d) {
        a.removeAttribute("value");
        return;
    }
    b.hasOwnProperty("value") ? bb(a, b.type, c) : b.hasOwnProperty("defaultValue") && bb(a, b.type, Sa(b.defaultValue));
    null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function cb(a, b, c) {
    if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
        var d = b.type;
        if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
        b = "" + a._wrapperState.initialValue;
        c || b === a.value || (a.value = b);
        a.defaultValue = b;
    }
    c = a.name;
    "" !== c && (a.name = "");
    a.defaultChecked = !!a._wrapperState.initialChecked;
    "" !== c && (a.name = c);
}
function bb(a, b, c) {
    if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
function db(a2) {
    var b = "";
    aa.Children.forEach(a2, function(a) {
        null != a && (b += a);
    });
    return b;
}
function eb(a, b) {
    a = m({
        children: void 0
    }, b);
    if (b = db(b.children)) a.children = b;
    return a;
}
function fb(a, b, c, d) {
    a = a.options;
    if (b) {
        b = {
        };
        for(var e = 0; e < c.length; e++)b["$" + c[e]] = !0;
        for(c = 0; c < a.length; c++)e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);
    } else {
        c = "" + Sa(c);
        b = null;
        for(e = 0; e < a.length; e++){
            if (a[e].value === c) {
                a[e].selected = !0;
                d && (a[e].defaultSelected = !0);
                return;
            }
            null !== b || a[e].disabled || (b = a[e]);
        }
        null !== b && (b.selected = !0);
    }
}
function gb(a, b) {
    if (null != b.dangerouslySetInnerHTML) throw Error(y(91));
    return m({
    }, b, {
        value: void 0,
        defaultValue: void 0,
        children: "" + a._wrapperState.initialValue
    });
}
function hb(a, b) {
    var c = b.value;
    if (null == c) {
        c = b.children;
        b = b.defaultValue;
        if (null != c) {
            if (null != b) throw Error(y(92));
            if (Array.isArray(c)) {
                if (!(1 >= c.length)) throw Error(y(93));
                c = c[0];
            }
            b = c;
        }
        null == b && (b = "");
        c = b;
    }
    a._wrapperState = {
        initialValue: Sa(c)
    };
}
function ib(a, b) {
    var c = Sa(b.value), d = Sa(b.defaultValue);
    null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
    null != d && (a.defaultValue = "" + d);
}
function jb(a) {
    var b = a.textContent;
    b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
var kb = {
    html: "http://www.w3.org/1999/xhtml",
    mathml: "http://www.w3.org/1998/Math/MathML",
    svg: "http://www.w3.org/2000/svg"
};
function lb(a) {
    switch(a){
        case "svg":
            return "http://www.w3.org/2000/svg";
        case "math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml";
    }
}
function mb(a, b) {
    return null == a || "http://www.w3.org/1999/xhtml" === a ? lb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var nb, ob = function(a) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
        MSApp.execUnsafeLocalFunction(function() {
            return a(b, c, d, e);
        });
    } : a;
}(function(a, b) {
    if (a.namespaceURI !== kb.svg || "innerHTML" in a) a.innerHTML = b;
    else {
        nb = nb || document.createElement("div");
        nb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
        for(b = nb.firstChild; a.firstChild;)a.removeChild(a.firstChild);
        for(; b.firstChild;)a.appendChild(b.firstChild);
    }
});
function pb(a, b) {
    if (b) {
        var c = a.firstChild;
        if (c && c === a.lastChild && 3 === c.nodeType) {
            c.nodeValue = b;
            return;
        }
    }
    a.textContent = b;
}
var qb = {
    animationIterationCount: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
}, rb = [
    "Webkit",
    "ms",
    "Moz",
    "O"
];
Object.keys(qb).forEach(function(a) {
    rb.forEach(function(b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1);
        qb[b] = qb[a];
    });
});
function sb(a, b, c) {
    return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || qb.hasOwnProperty(a) && qb[a] ? ("" + b).trim() : b + "px";
}
function tb(a, b) {
    a = a.style;
    for(var c in b)if (b.hasOwnProperty(c)) {
        var d = 0 === c.indexOf("--"), e = sb(c, b[c], d);
        "float" === c && (c = "cssFloat");
        d ? a.setProperty(c, e) : a[c] = e;
    }
}
var ub = m({
    menuitem: !0
}, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
});
function vb(a, b) {
    if (b) {
        if (ub[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(y(137, a));
        if (null != b.dangerouslySetInnerHTML) {
            if (null != b.children) throw Error(y(60));
            if (!("object" === typeof b.dangerouslySetInnerHTML && "__html" in b.dangerouslySetInnerHTML)) throw Error(y(61));
        }
        if (null != b.style && "object" !== typeof b.style) throw Error(y(62));
    }
}
function wb(a, b) {
    if (-1 === a.indexOf("-")) return "string" === typeof b.is;
    switch(a){
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0;
    }
}
function xb(a) {
    a = a.target || a.srcElement || window;
    a.correspondingUseElement && (a = a.correspondingUseElement);
    return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
    if (a = Cb(a)) {
        if ("function" !== typeof yb) throw Error(y(280));
        var b = a.stateNode;
        b && (b = Db(b), yb(a.stateNode, a.type, b));
    }
}
function Eb(a) {
    zb ? Ab ? Ab.push(a) : Ab = [
        a
    ] : zb = a;
}
function Fb() {
    if (zb) {
        var a = zb, b = Ab;
        Ab = zb = null;
        Bb(a);
        if (b) for(a = 0; a < b.length; a++)Bb(b[a]);
    }
}
function Gb(a, b) {
    return a(b);
}
function Hb(a, b, c, d, e) {
    return a(b, c, d, e);
}
function Ib() {
}
var Jb = Gb, Kb = !1, Lb = !1;
function Mb() {
    if (null !== zb || null !== Ab) Ib(), Fb();
}
function Nb(a, b, c) {
    if (Lb) return a(b, c);
    Lb = !0;
    try {
        return Jb(a, b, c);
    } finally{
        Lb = !1, Mb();
    }
}
function Ob(a, b) {
    var c = a.stateNode;
    if (null === c) return null;
    var d = Db(c);
    if (null === d) return null;
    c = d[b];
    a: switch(b){
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
            a = !d;
            break a;
        default:
            a = !1;
    }
    if (a) return null;
    if (c && "function" !== typeof c) throw Error(y(231, b, typeof c));
    return c;
}
var Pb = !1;
if (fa) try {
    var Qb = {
    };
    Object.defineProperty(Qb, "passive", {
        get: function() {
            Pb = !0;
        }
    });
    window.addEventListener("test", Qb, Qb);
    window.removeEventListener("test", Qb, Qb);
} catch (a) {
    Pb = !1;
}
function Rb(a, b, c, d, e, f, g, h, k) {
    var l = Array.prototype.slice.call(arguments, 3);
    try {
        b.apply(c, l);
    } catch (n) {
        this.onError(n);
    }
}
var Sb = !1, Tb = null, Ub = !1, Vb = null, Wb = {
    onError: function(a3) {
        Sb = !0;
        Tb = a3;
    }
};
function Xb(a, b, c, d, e, f, g, h, k) {
    Sb = !1;
    Tb = null;
    Rb.apply(Wb, arguments);
}
function Yb(a, b, c, d, e, f, g, h, k) {
    Xb.apply(this, arguments);
    if (Sb) {
        if (Sb) {
            var l = Tb;
            Sb = !1;
            Tb = null;
        } else throw Error(y(198));
        Ub || (Ub = !0, Vb = l);
    }
}
function Zb(a4) {
    var b = a4, c = a4;
    if (a4.alternate) for(; b.return;)b = b.return;
    else {
        a4 = b;
        do b = a4, 0 !== (b.flags & 1026) && (c = b.return), a4 = b.return;
        while (a4)
    }
    return 3 === b.tag ? c : null;
}
function $b(a5) {
    if (13 === a5.tag) {
        var b = a5.memoizedState;
        null === b && (a5 = a5.alternate, null !== a5 && (b = a5.memoizedState));
        if (null !== b) return b.dehydrated;
    }
    return null;
}
function ac(a6) {
    if (Zb(a6) !== a6) throw Error(y(188));
}
function bc(a7) {
    var b = a7.alternate;
    if (!b) {
        b = Zb(a7);
        if (null === b) throw Error(y(188));
        return b !== a7 ? null : a7;
    }
    for(var c = a7, d = b;;){
        var e = c.return;
        if (null === e) break;
        var f = e.alternate;
        if (null === f) {
            d = e.return;
            if (null !== d) {
                c = d;
                continue;
            }
            break;
        }
        if (e.child === f.child) {
            for(f = e.child; f;){
                if (f === c) return ac(e), a7;
                if (f === d) return ac(e), b;
                f = f.sibling;
            }
            throw Error(y(188));
        }
        if (c.return !== d.return) c = e, d = f;
        else {
            for(var g = !1, h = e.child; h;){
                if (h === c) {
                    g = !0;
                    c = e;
                    d = f;
                    break;
                }
                if (h === d) {
                    g = !0;
                    d = e;
                    c = f;
                    break;
                }
                h = h.sibling;
            }
            if (!g) {
                for(h = f.child; h;){
                    if (h === c) {
                        g = !0;
                        c = f;
                        d = e;
                        break;
                    }
                    if (h === d) {
                        g = !0;
                        d = f;
                        c = e;
                        break;
                    }
                    h = h.sibling;
                }
                if (!g) throw Error(y(189));
            }
        }
        if (c.alternate !== d) throw Error(y(190));
    }
    if (3 !== c.tag) throw Error(y(188));
    return c.stateNode.current === c ? a7 : b;
}
function cc(a8) {
    a8 = bc(a8);
    if (!a8) return null;
    for(var b = a8;;){
        if (5 === b.tag || 6 === b.tag) return b;
        if (b.child) b.child.return = b, b = b.child;
        else {
            if (b === a8) break;
            for(; !b.sibling;){
                if (!b.return || b.return === a8) return null;
                b = b.return;
            }
            b.sibling.return = b.return;
            b = b.sibling;
        }
    }
    return null;
}
function dc(a9, b) {
    for(var c = a9.alternate; null !== b;){
        if (b === a9 || b === c) return !0;
        b = b.return;
    }
    return !1;
}
var ec, fc, gc, hc, ic = !1, jc = [], kc = null, lc = null, mc = null, nc = new Map, oc = new Map, pc = [], qc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function rc(a10, b, c, d, e) {
    return {
        blockedOn: a10,
        domEventName: b,
        eventSystemFlags: c | 16,
        nativeEvent: e,
        targetContainers: [
            d
        ]
    };
}
function sc(a11, b) {
    switch(a11){
        case "focusin":
        case "focusout":
            kc = null;
            break;
        case "dragenter":
        case "dragleave":
            lc = null;
            break;
        case "mouseover":
        case "mouseout":
            mc = null;
            break;
        case "pointerover":
        case "pointerout":
            nc.delete(b.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            oc.delete(b.pointerId);
    }
}
function tc(a12, b, c, d, e, f) {
    if (null === a12 || a12.nativeEvent !== f) return a12 = rc(b, c, d, e, f), null !== b && (b = Cb(b), null !== b && fc(b)), a12;
    a12.eventSystemFlags |= d;
    b = a12.targetContainers;
    null !== e && -1 === b.indexOf(e) && b.push(e);
    return a12;
}
function uc(a13, b, c, d, e) {
    switch(b){
        case "focusin":
            return kc = tc(kc, a13, b, c, d, e), !0;
        case "dragenter":
            return lc = tc(lc, a13, b, c, d, e), !0;
        case "mouseover":
            return mc = tc(mc, a13, b, c, d, e), !0;
        case "pointerover":
            var f = e.pointerId;
            nc.set(f, tc(nc.get(f) || null, a13, b, c, d, e));
            return !0;
        case "gotpointercapture":
            return f = e.pointerId, oc.set(f, tc(oc.get(f) || null, a13, b, c, d, e)), !0;
    }
    return !1;
}
function vc(a14) {
    var b = wc(a14.target);
    if (null !== b) {
        var c = Zb(b);
        if (null !== c) {
            if (b = c.tag, 13 === b) {
                if (b = $b(c), null !== b) {
                    a14.blockedOn = b;
                    hc(a14.lanePriority, function() {
                        r.unstable_runWithPriority(a14.priority, function() {
                            gc(c);
                        });
                    });
                    return;
                }
            } else if (3 === b && c.stateNode.hydrate) {
                a14.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
                return;
            }
        }
    }
    a14.blockedOn = null;
}
function xc(a15) {
    if (null !== a15.blockedOn) return !1;
    for(var b = a15.targetContainers; 0 < b.length;){
        var c = yc(a15.domEventName, a15.eventSystemFlags, b[0], a15.nativeEvent);
        if (null !== c) return b = Cb(c), null !== b && fc(b), a15.blockedOn = c, !1;
        b.shift();
    }
    return !0;
}
function zc(a16, b, c) {
    xc(a16) && c.delete(b);
}
function Ac() {
    for(ic = !1; 0 < jc.length;){
        var a17 = jc[0];
        if (null !== a17.blockedOn) {
            a17 = Cb(a17.blockedOn);
            null !== a17 && ec(a17);
            break;
        }
        for(var b = a17.targetContainers; 0 < b.length;){
            var c = yc(a17.domEventName, a17.eventSystemFlags, b[0], a17.nativeEvent);
            if (null !== c) {
                a17.blockedOn = c;
                break;
            }
            b.shift();
        }
        null === a17.blockedOn && jc.shift();
    }
    null !== kc && xc(kc) && (kc = null);
    null !== lc && xc(lc) && (lc = null);
    null !== mc && xc(mc) && (mc = null);
    nc.forEach(zc);
    oc.forEach(zc);
}
function Bc(a18, b) {
    a18.blockedOn === b && (a18.blockedOn = null, ic || (ic = !0, r.unstable_scheduleCallback(r.unstable_NormalPriority, Ac)));
}
function Cc(a19) {
    function b1(b) {
        return Bc(b, a19);
    }
    if (0 < jc.length) {
        Bc(jc[0], a19);
        for(var c = 1; c < jc.length; c++){
            var d = jc[c];
            d.blockedOn === a19 && (d.blockedOn = null);
        }
    }
    null !== kc && Bc(kc, a19);
    null !== lc && Bc(lc, a19);
    null !== mc && Bc(mc, a19);
    nc.forEach(b1);
    oc.forEach(b1);
    for(c = 0; c < pc.length; c++)d = pc[c], d.blockedOn === a19 && (d.blockedOn = null);
    for(; 0 < pc.length && (c = pc[0], null === c.blockedOn);)vc(c), null === c.blockedOn && pc.shift();
}
function Dc(a, b) {
    var c = {
    };
    c[a.toLowerCase()] = b.toLowerCase();
    c["Webkit" + a] = "webkit" + b;
    c["Moz" + a] = "moz" + b;
    return c;
}
var Ec = {
    animationend: Dc("Animation", "AnimationEnd"),
    animationiteration: Dc("Animation", "AnimationIteration"),
    animationstart: Dc("Animation", "AnimationStart"),
    transitionend: Dc("Transition", "TransitionEnd")
}, Fc = {
}, Gc = {
};
fa && (Gc = document.createElement("div").style, "AnimationEvent" in window || (delete Ec.animationend.animation, delete Ec.animationiteration.animation, delete Ec.animationstart.animation), "TransitionEvent" in window || delete Ec.transitionend.transition);
function Hc(a20) {
    if (Fc[a20]) return Fc[a20];
    if (!Ec[a20]) return a20;
    var b = Ec[a20], c;
    for(c in b)if (b.hasOwnProperty(c) && c in Gc) return Fc[a20] = b[c];
    return a20;
}
var Ic = Hc("animationend"), Jc = Hc("animationiteration"), Kc = Hc("animationstart"), Lc = Hc("transitionend"), Mc = new Map, Nc = new Map, Oc = [
    "abort",
    "abort",
    Ic,
    "animationEnd",
    Jc,
    "animationIteration",
    Kc,
    "animationStart",
    "canplay",
    "canPlay",
    "canplaythrough",
    "canPlayThrough",
    "durationchange",
    "durationChange",
    "emptied",
    "emptied",
    "encrypted",
    "encrypted",
    "ended",
    "ended",
    "error",
    "error",
    "gotpointercapture",
    "gotPointerCapture",
    "load",
    "load",
    "loadeddata",
    "loadedData",
    "loadedmetadata",
    "loadedMetadata",
    "loadstart",
    "loadStart",
    "lostpointercapture",
    "lostPointerCapture",
    "playing",
    "playing",
    "progress",
    "progress",
    "seeking",
    "seeking",
    "stalled",
    "stalled",
    "suspend",
    "suspend",
    "timeupdate",
    "timeUpdate",
    Lc,
    "transitionEnd",
    "waiting",
    "waiting"
];
function Pc(a21, b) {
    for(var c = 0; c < a21.length; c += 2){
        var d = a21[c], e = a21[c + 1];
        e = "on" + (e[0].toUpperCase() + e.slice(1));
        Nc.set(d, b);
        Mc.set(d, e);
        da(e, [
            d
        ]);
    }
}
var Qc = r.unstable_now;
Qc();
var F = 8;
function Rc(a22) {
    if (0 !== (1 & a22)) return F = 15, 1;
    if (0 !== (2 & a22)) return F = 14, 2;
    if (0 !== (4 & a22)) return F = 13, 4;
    var b = 24 & a22;
    if (0 !== b) return F = 12, b;
    if (0 !== (a22 & 32)) return F = 11, 32;
    b = 192 & a22;
    if (0 !== b) return F = 10, b;
    if (0 !== (a22 & 256)) return F = 9, 256;
    b = 3584 & a22;
    if (0 !== b) return F = 8, b;
    if (0 !== (a22 & 4096)) return F = 7, 4096;
    b = 4186112 & a22;
    if (0 !== b) return F = 6, b;
    b = 62914560 & a22;
    if (0 !== b) return F = 5, b;
    if (a22 & 67108864) return F = 4, 67108864;
    if (0 !== (a22 & 134217728)) return F = 3, 134217728;
    b = 805306368 & a22;
    if (0 !== b) return F = 2, b;
    if (0 !== (1073741824 & a22)) return F = 1, 1073741824;
    F = 8;
    return a22;
}
function Sc(a23) {
    switch(a23){
        case 99:
            return 15;
        case 98:
            return 10;
        case 97:
        case 96:
            return 8;
        case 95:
            return 2;
        default:
            return 0;
    }
}
function Tc(a24) {
    switch(a24){
        case 15:
        case 14:
            return 99;
        case 13:
        case 12:
        case 11:
        case 10:
            return 98;
        case 9:
        case 8:
        case 7:
        case 6:
        case 4:
        case 5:
            return 97;
        case 3:
        case 2:
        case 1:
            return 95;
        case 0:
            return 90;
        default:
            throw Error(y(358, a24));
    }
}
function Uc(a25, b) {
    var c = a25.pendingLanes;
    if (0 === c) return F = 0;
    var d = 0, e = 0, f = a25.expiredLanes, g = a25.suspendedLanes, h = a25.pingedLanes;
    if (0 !== f) d = f, e = F = 15;
    else if (f = c & 134217727, 0 !== f) {
        var k = f & ~g;
        0 !== k ? (d = Rc(k), e = F) : (h &= f, 0 !== h && (d = Rc(h), e = F));
    } else f = c & ~g, 0 !== f ? (d = Rc(f), e = F) : 0 !== h && (d = Rc(h), e = F);
    if (0 === d) return 0;
    d = 31 - Vc(d);
    d = c & ((0 > d ? 0 : 1 << d) << 1) - 1;
    if (0 !== b && b !== d && 0 === (b & g)) {
        Rc(b);
        if (e <= F) return b;
        F = e;
    }
    b = a25.entangledLanes;
    if (0 !== b) for(a25 = a25.entanglements, b &= d; 0 < b;)c = 31 - Vc(b), e = 1 << c, d |= a25[c], b &= ~e;
    return d;
}
function Wc(a26) {
    a26 = a26.pendingLanes & -1073741825;
    return 0 !== a26 ? a26 : a26 & 1073741824 ? 1073741824 : 0;
}
function Xc(a27, b) {
    switch(a27){
        case 15:
            return 1;
        case 14:
            return 2;
        case 12:
            return a27 = Yc(24 & ~b), 0 === a27 ? Xc(10, b) : a27;
        case 10:
            return a27 = Yc(192 & ~b), 0 === a27 ? Xc(8, b) : a27;
        case 8:
            return a27 = Yc(3584 & ~b), 0 === a27 && (a27 = Yc(4186112 & ~b), 0 === a27 && (a27 = 512)), a27;
        case 2:
            return b = Yc(805306368 & ~b), 0 === b && (b = 268435456), b;
    }
    throw Error(y(358, a27));
}
function Yc(a28) {
    return a28 & -a28;
}
function Zc(a29) {
    for(var b = [], c = 0; 31 > c; c++)b.push(a29);
    return b;
}
function $c(a30, b, c) {
    a30.pendingLanes |= b;
    var d = b - 1;
    a30.suspendedLanes &= d;
    a30.pingedLanes &= d;
    a30 = a30.eventTimes;
    b = 31 - Vc(b);
    a30[b] = c;
}
var Vc = Math.clz32 ? Math.clz32 : ad, bd = Math.log, cd = Math.LN2;
function ad(a31) {
    return 0 === a31 ? 32 : 31 - (bd(a31) / cd | 0) | 0;
}
var dd = r.unstable_UserBlockingPriority, ed = r.unstable_runWithPriority, fd = !0;
function gd(a32, b, c, d) {
    Kb || Ib();
    var e = hd, f = Kb;
    Kb = !0;
    try {
        Hb(e, a32, b, c, d);
    } finally{
        (Kb = f) || Mb();
    }
}
function id(a33, b, c, d) {
    ed(dd, hd.bind(null, a33, b, c, d));
}
function hd(a34, b, c, d) {
    if (fd) {
        var e;
        if ((e = 0 === (b & 4)) && 0 < jc.length && -1 < qc.indexOf(a34)) a34 = rc(null, a34, b, c, d), jc.push(a34);
        else {
            var f = yc(a34, b, c, d);
            if (null === f) e && sc(a34, d);
            else {
                if (e) {
                    if (-1 < qc.indexOf(a34)) {
                        a34 = rc(f, a34, b, c, d);
                        jc.push(a34);
                        return;
                    }
                    if (uc(f, a34, b, c, d)) return;
                    sc(a34, d);
                }
                jd(a34, b, d, null, c);
            }
        }
    }
}
function yc(a35, b, c, d) {
    var e = xb(d);
    e = wc(e);
    if (null !== e) {
        var f = Zb(e);
        if (null === f) e = null;
        else {
            var g = f.tag;
            if (13 === g) {
                e = $b(f);
                if (null !== e) return e;
                e = null;
            } else if (3 === g) {
                if (f.stateNode.hydrate) return 3 === f.tag ? f.stateNode.containerInfo : null;
                e = null;
            } else f !== e && (e = null);
        }
    }
    jd(a35, b, d, e, c);
    return null;
}
var kd = null, ld = null, md = null;
function nd() {
    if (md) return md;
    var a36, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
    for(a36 = 0; a36 < c && b[a36] === e[a36]; a36++);
    var g = c - a36;
    for(d = 1; d <= g && b[c - d] === e[f - d]; d++);
    return md = e.slice(a36, 1 < d ? 1 - d : void 0);
}
function od(a37) {
    var b = a37.keyCode;
    "charCode" in a37 ? (a37 = a37.charCode, 0 === a37 && 13 === b && (a37 = 13)) : a37 = b;
    10 === a37 && (a37 = 13);
    return 32 <= a37 || 13 === a37 ? a37 : 0;
}
function pd() {
    return !0;
}
function qd() {
    return !1;
}
function rd(a38) {
    function b2(b, d, e, f, g) {
        this._reactName = b;
        this._targetInst = e;
        this.type = d;
        this.nativeEvent = f;
        this.target = g;
        this.currentTarget = null;
        for(var c in a38)a38.hasOwnProperty(c) && (b = a38[c], this[c] = b ? b(f) : f[c]);
        this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : !1 === f.returnValue) ? pd : qd;
        this.isPropagationStopped = qd;
        return this;
    }
    m(b2.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var a39 = this.nativeEvent;
            a39 && (a39.preventDefault ? a39.preventDefault() : "unknown" !== typeof a39.returnValue && (a39.returnValue = !1), this.isDefaultPrevented = pd);
        },
        stopPropagation: function() {
            var a40 = this.nativeEvent;
            a40 && (a40.stopPropagation ? a40.stopPropagation() : "unknown" !== typeof a40.cancelBubble && (a40.cancelBubble = !0), this.isPropagationStopped = pd);
        },
        persist: function() {
        },
        isPersistent: pd
    });
    return b2;
}
var sd = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(a41) {
        return a41.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
}, td = rd(sd), ud = m({
}, sd, {
    view: 0,
    detail: 0
}), vd = rd(ud), wd, xd, yd, Ad = m({
}, ud, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: zd,
    button: 0,
    buttons: 0,
    relatedTarget: function(a42) {
        return void 0 === a42.relatedTarget ? a42.fromElement === a42.srcElement ? a42.toElement : a42.fromElement : a42.relatedTarget;
    },
    movementX: function(a43) {
        if ("movementX" in a43) return a43.movementX;
        a43 !== yd && (yd && "mousemove" === a43.type ? (wd = a43.screenX - yd.screenX, xd = a43.screenY - yd.screenY) : xd = wd = 0, yd = a43);
        return wd;
    },
    movementY: function(a44) {
        return "movementY" in a44 ? a44.movementY : xd;
    }
}), Bd = rd(Ad), Cd = m({
}, Ad, {
    dataTransfer: 0
}), Dd = rd(Cd), Ed = m({
}, ud, {
    relatedTarget: 0
}), Fd = rd(Ed), Gd = m({
}, sd, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
}), Hd = rd(Gd), Id = m({
}, sd, {
    clipboardData: function(a45) {
        return "clipboardData" in a45 ? a45.clipboardData : window.clipboardData;
    }
}), Jd = rd(Id), Kd = m({
}, sd, {
    data: 0
}), Ld = rd(Kd), Md = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
}, Nd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
}, Od = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
};
function Pd(a46) {
    var b = this.nativeEvent;
    return b.getModifierState ? b.getModifierState(a46) : (a46 = Od[a46]) ? !!b[a46] : !1;
}
function zd() {
    return Pd;
}
var Qd = m({
}, ud, {
    key: function(a47) {
        if (a47.key) {
            var b = Md[a47.key] || a47.key;
            if ("Unidentified" !== b) return b;
        }
        return "keypress" === a47.type ? (a47 = od(a47), 13 === a47 ? "Enter" : String.fromCharCode(a47)) : "keydown" === a47.type || "keyup" === a47.type ? Nd[a47.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: zd,
    charCode: function(a48) {
        return "keypress" === a48.type ? od(a48) : 0;
    },
    keyCode: function(a49) {
        return "keydown" === a49.type || "keyup" === a49.type ? a49.keyCode : 0;
    },
    which: function(a50) {
        return "keypress" === a50.type ? od(a50) : "keydown" === a50.type || "keyup" === a50.type ? a50.keyCode : 0;
    }
}), Rd = rd(Qd), Sd = m({
}, Ad, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
}), Td = rd(Sd), Ud = m({
}, ud, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: zd
}), Vd = rd(Ud), Wd = m({
}, sd, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
}), Xd = rd(Wd), Yd = m({
}, Ad, {
    deltaX: function(a51) {
        return "deltaX" in a51 ? a51.deltaX : "wheelDeltaX" in a51 ? -a51.wheelDeltaX : 0;
    },
    deltaY: function(a52) {
        return "deltaY" in a52 ? a52.deltaY : "wheelDeltaY" in a52 ? -a52.wheelDeltaY : "wheelDelta" in a52 ? -a52.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
}), Zd = rd(Yd), $d = [
    9,
    13,
    27,
    32
], ae = fa && "CompositionEvent" in window, be = null;
fa && "documentMode" in document && (be = document.documentMode);
var ce = fa && "TextEvent" in window && !be, de = fa && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = !1;
function ge(a53, b) {
    switch(a53){
        case "keyup":
            return -1 !== $d.indexOf(b.keyCode);
        case "keydown":
            return 229 !== b.keyCode;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1;
    }
}
function he(a54) {
    a54 = a54.detail;
    return "object" === typeof a54 && "data" in a54 ? a54.data : null;
}
var ie = !1;
function je(a55, b) {
    switch(a55){
        case "compositionend":
            return he(b);
        case "keypress":
            if (32 !== b.which) return null;
            fe = !0;
            return ee;
        case "textInput":
            return a55 = b.data, a55 === ee && fe ? null : a55;
        default:
            return null;
    }
}
function ke(a56, b) {
    if (ie) return "compositionend" === a56 || !ae && ge(a56, b) ? (a56 = nd(), md = ld = kd = null, ie = !1, a56) : null;
    switch(a56){
        case "paste":
            return null;
        case "keypress":
            if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
                if (b.char && 1 < b.char.length) return b.char;
                if (b.which) return String.fromCharCode(b.which);
            }
            return null;
        case "compositionend":
            return de && "ko" !== b.locale ? null : b.data;
        default:
            return null;
    }
}
var le = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};
function me(a57) {
    var b = a57 && a57.nodeName && a57.nodeName.toLowerCase();
    return "input" === b ? !!le[a57.type] : "textarea" === b ? !0 : !1;
}
function ne(a58, b, c, d) {
    Eb(d);
    b = oe(b, "onChange");
    0 < b.length && (c = new td("onChange", "change", null, c, d), a58.push({
        event: c,
        listeners: b
    }));
}
var pe = null, qe = null;
function re(a59) {
    se(a59, 0);
}
function te(a60) {
    var b = ue(a60);
    if (Wa(b)) return a60;
}
function ve(a61, b) {
    if ("change" === a61) return b;
}
var we = !1;
if (fa) {
    var xe;
    if (fa) {
        var ye = "oninput" in document;
        if (!ye) {
            var ze = document.createElement("div");
            ze.setAttribute("oninput", "return;");
            ye = "function" === typeof ze.oninput;
        }
        xe = ye;
    } else xe = !1;
    we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
    pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a62) {
    if ("value" === a62.propertyName && te(qe)) {
        var b = [];
        ne(b, qe, a62, xb(a62));
        a62 = re;
        if (Kb) a62(b);
        else {
            Kb = !0;
            try {
                Gb(a62, b);
            } finally{
                Kb = !1, Mb();
            }
        }
    }
}
function Ce(a63, b, c) {
    "focusin" === a63 ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a63 && Ae();
}
function De(a64) {
    if ("selectionchange" === a64 || "keyup" === a64 || "keydown" === a64) return te(qe);
}
function Ee(a65, b) {
    if ("click" === a65) return te(b);
}
function Fe(a66, b) {
    if ("input" === a66 || "change" === a66) return te(b);
}
function Ge(a67, b) {
    return a67 === b && (0 !== a67 || 1 / a67 === 1 / b) || a67 !== a67 && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge, Ie = Object.prototype.hasOwnProperty;
function Je(a68, b) {
    if (He(a68, b)) return !0;
    if ("object" !== typeof a68 || null === a68 || "object" !== typeof b || null === b) return !1;
    var c = Object.keys(a68), d = Object.keys(b);
    if (c.length !== d.length) return !1;
    for(d = 0; d < c.length; d++)if (!Ie.call(b, c[d]) || !He(a68[c[d]], b[c[d]])) return !1;
    return !0;
}
function Ke(a69) {
    for(; a69 && a69.firstChild;)a69 = a69.firstChild;
    return a69;
}
function Le(a70, b) {
    var c = Ke(a70);
    a70 = 0;
    for(var d; c;){
        if (3 === c.nodeType) {
            d = a70 + c.textContent.length;
            if (a70 <= b && d >= b) return {
                node: c,
                offset: b - a70
            };
            a70 = d;
        }
        a: {
            for(; c;){
                if (c.nextSibling) {
                    c = c.nextSibling;
                    break a;
                }
                c = c.parentNode;
            }
            c = void 0;
        }
        c = Ke(c);
    }
}
function Me(a71, b) {
    return a71 && b ? a71 === b ? !0 : a71 && 3 === a71.nodeType ? !1 : b && 3 === b.nodeType ? Me(a71, b.parentNode) : "contains" in a71 ? a71.contains(b) : a71.compareDocumentPosition ? !!(a71.compareDocumentPosition(b) & 16) : !1 : !1;
}
function Ne() {
    for(var a72 = window, b = Xa(); b instanceof a72.HTMLIFrameElement;){
        try {
            var c = "string" === typeof b.contentWindow.location.href;
        } catch (d) {
            c = !1;
        }
        if (c) a72 = b.contentWindow;
        else break;
        b = Xa(a72.document);
    }
    return b;
}
function Oe(a73) {
    var b = a73 && a73.nodeName && a73.nodeName.toLowerCase();
    return b && ("input" === b && ("text" === a73.type || "search" === a73.type || "tel" === a73.type || "url" === a73.type || "password" === a73.type) || "textarea" === b || "true" === a73.contentEditable);
}
var Pe = fa && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = !1;
function Ue(a74, b, c) {
    var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
    Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Oe(d) ? d = {
        start: d.selectionStart,
        end: d.selectionEnd
    } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = {
        anchorNode: d.anchorNode,
        anchorOffset: d.anchorOffset,
        focusNode: d.focusNode,
        focusOffset: d.focusOffset
    }), Se && Je(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a74.push({
        event: b,
        listeners: d
    }), b.target = Qe)));
}
Pc("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "), 0);
Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1);
Pc(Oc, 2);
for(var Ve = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), We = 0; We < Ve.length; We++)Nc.set(Ve[We], 0);
ea("onMouseEnter", [
    "mouseout",
    "mouseover"
]);
ea("onMouseLeave", [
    "mouseout",
    "mouseover"
]);
ea("onPointerEnter", [
    "pointerout",
    "pointerover"
]);
ea("onPointerLeave", [
    "pointerout",
    "pointerover"
]);
da("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
da("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
da("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
]);
da("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
da("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
da("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Xe = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Ye = new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
function Ze(a75, b, c) {
    var d = a75.type || "unknown-event";
    a75.currentTarget = c;
    Yb(d, b, void 0, a75);
    a75.currentTarget = null;
}
function se(a76, b) {
    b = 0 !== (b & 4);
    for(var c = 0; c < a76.length; c++){
        var d = a76[c], e = d.event;
        d = d.listeners;
        a: {
            var f = void 0;
            if (b) for(var g = d.length - 1; 0 <= g; g--){
                var h = d[g], k = h.instance, l = h.currentTarget;
                h = h.listener;
                if (k !== f && e.isPropagationStopped()) break a;
                Ze(e, h, l);
                f = k;
            }
            else for(g = 0; g < d.length; g++){
                h = d[g];
                k = h.instance;
                l = h.currentTarget;
                h = h.listener;
                if (k !== f && e.isPropagationStopped()) break a;
                Ze(e, h, l);
                f = k;
            }
        }
    }
    if (Ub) throw a76 = Vb, Ub = !1, Vb = null, a76;
}
function G(a77, b) {
    var c = $e(b), d = a77 + "__bubble";
    c.has(d) || (af(b, a77, 2, !1), c.add(d));
}
var bf = "_reactListening" + Math.random().toString(36).slice(2);
function cf(a78) {
    a78[bf] || (a78[bf] = !0, ba.forEach(function(b) {
        Ye.has(b) || df(b, !1, a78, null);
        df(b, !0, a78, null);
    }));
}
function df(a79, b, c, d) {
    var e = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 0, f = c;
    "selectionchange" === a79 && 9 !== c.nodeType && (f = c.ownerDocument);
    if (null !== d && !b && Ye.has(a79)) {
        if ("scroll" !== a79) return;
        e |= 2;
        f = d;
    }
    var g = $e(f), h = a79 + "__" + (b ? "capture" : "bubble");
    g.has(h) || (b && (e |= 4), af(f, a79, e, b), g.add(h));
}
function af(a80, b, c, d) {
    var e = Nc.get(b);
    switch(void 0 === e ? 2 : e){
        case 0:
            e = gd;
            break;
        case 1:
            e = id;
            break;
        default:
            e = hd;
    }
    c = e.bind(null, b, c, a80);
    e = void 0;
    !Pb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = !0);
    d ? void 0 !== e ? a80.addEventListener(b, c, {
        capture: !0,
        passive: e
    }) : a80.addEventListener(b, c, !0) : void 0 !== e ? a80.addEventListener(b, c, {
        passive: e
    }) : a80.addEventListener(b, c, !1);
}
function jd(a81, b, c, d1, e1) {
    var f = d1;
    if (0 === (b & 1) && 0 === (b & 2) && null !== d1) a: for(;;){
        if (null === d1) return;
        var g = d1.tag;
        if (3 === g || 4 === g) {
            var h = d1.stateNode.containerInfo;
            if (h === e1 || 8 === h.nodeType && h.parentNode === e1) break;
            if (4 === g) for(g = d1.return; null !== g;){
                var k = g.tag;
                if (3 === k || 4 === k) {
                    if (k = g.stateNode.containerInfo, k === e1 || 8 === k.nodeType && k.parentNode === e1) return;
                }
                g = g.return;
            }
            for(; null !== h;){
                g = wc(h);
                if (null === g) return;
                k = g.tag;
                if (5 === k || 6 === k) {
                    d1 = f = g;
                    continue a;
                }
                h = h.parentNode;
            }
        }
        d1 = d1.return;
    }
    Nb(function() {
        var d = f, e = xb(c), g = [];
        a: {
            var h = Mc.get(a81);
            if (void 0 !== h) {
                var k = td, x = a81;
                switch(a81){
                    case "keypress":
                        if (0 === od(c)) break a;
                    case "keydown":
                    case "keyup":
                        k = Rd;
                        break;
                    case "focusin":
                        x = "focus";
                        k = Fd;
                        break;
                    case "focusout":
                        x = "blur";
                        k = Fd;
                        break;
                    case "beforeblur":
                    case "afterblur":
                        k = Fd;
                        break;
                    case "click":
                        if (2 === c.button) break a;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        k = Bd;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        k = Dd;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        k = Vd;
                        break;
                    case Ic:
                    case Jc:
                    case Kc:
                        k = Hd;
                        break;
                    case Lc:
                        k = Xd;
                        break;
                    case "scroll":
                        k = vd;
                        break;
                    case "wheel":
                        k = Zd;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        k = Jd;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        k = Td;
                }
                var w = 0 !== (b & 4), z = !w && "scroll" === a81, u = w ? null !== h ? h + "Capture" : null : h;
                w = [];
                for(var t = d, q; null !== t;){
                    q = t;
                    var v = q.stateNode;
                    5 === q.tag && null !== v && (q = v, null !== u && (v = Ob(t, u), null != v && w.push(ef(t, v, q))));
                    if (z) break;
                    t = t.return;
                }
                0 < w.length && (h = new k(h, x, null, c, e), g.push({
                    event: h,
                    listeners: w
                }));
            }
        }
        if (0 === (b & 7)) {
            a: {
                h = "mouseover" === a81 || "pointerover" === a81;
                k = "mouseout" === a81 || "pointerout" === a81;
                if (h && 0 === (b & 16) && (x = c.relatedTarget || c.fromElement) && (wc(x) || x[ff])) break a;
                if (k || h) {
                    h = e.window === e ? e : (h = e.ownerDocument) ? h.defaultView || h.parentWindow : window;
                    if (k) {
                        if (x = c.relatedTarget || c.toElement, k = d, x = x ? wc(x) : null, null !== x && (z = Zb(x), x !== z || 5 !== x.tag && 6 !== x.tag)) x = null;
                    } else k = null, x = d;
                    if (k !== x) {
                        w = Bd;
                        v = "onMouseLeave";
                        u = "onMouseEnter";
                        t = "mouse";
                        if ("pointerout" === a81 || "pointerover" === a81) w = Td, v = "onPointerLeave", u = "onPointerEnter", t = "pointer";
                        z = null == k ? h : ue(k);
                        q = null == x ? h : ue(x);
                        h = new w(v, t + "leave", k, c, e);
                        h.target = z;
                        h.relatedTarget = q;
                        v = null;
                        wc(e) === d && (w = new w(u, t + "enter", x, c, e), w.target = q, w.relatedTarget = z, v = w);
                        z = v;
                        if (k && x) b: {
                            w = k;
                            u = x;
                            t = 0;
                            for(q = w; q; q = gf(q))t++;
                            q = 0;
                            for(v = u; v; v = gf(v))q++;
                            for(; 0 < t - q;)w = gf(w), t--;
                            for(; 0 < q - t;)u = gf(u), q--;
                            for(; t--;){
                                if (w === u || null !== u && w === u.alternate) break b;
                                w = gf(w);
                                u = gf(u);
                            }
                            w = null;
                        }
                        else w = null;
                        null !== k && hf(g, h, k, w, !1);
                        null !== x && null !== z && hf(g, z, x, w, !0);
                    }
                }
            }
            a: {
                h = d ? ue(d) : window;
                k = h.nodeName && h.nodeName.toLowerCase();
                if ("select" === k || "input" === k && "file" === h.type) var J = ve;
                else if (me(h)) {
                    if (we) J = Fe;
                    else {
                        J = De;
                        var K = Ce;
                    }
                } else (k = h.nodeName) && "input" === k.toLowerCase() && ("checkbox" === h.type || "radio" === h.type) && (J = Ee);
                if (J && (J = J(a81, d))) {
                    ne(g, J, c, e);
                    break a;
                }
                K && K(a81, h, d);
                "focusout" === a81 && (K = h._wrapperState) && K.controlled && "number" === h.type && bb(h, "number", h.value);
            }
            K = d ? ue(d) : window;
            switch(a81){
                case "focusin":
                    if (me(K) || "true" === K.contentEditable) Qe = K, Re = d, Se = null;
                    break;
                case "focusout":
                    Se = Re = Qe = null;
                    break;
                case "mousedown":
                    Te = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    Te = !1;
                    Ue(g, c, e);
                    break;
                case "selectionchange":
                    if (Pe) break;
                case "keydown":
                case "keyup":
                    Ue(g, c, e);
            }
            var Q;
            if (ae) b: {
                switch(a81){
                    case "compositionstart":
                        var L = "onCompositionStart";
                        break b;
                    case "compositionend":
                        L = "onCompositionEnd";
                        break b;
                    case "compositionupdate":
                        L = "onCompositionUpdate";
                        break b;
                }
                L = void 0;
            }
            else ie ? ge(a81, c) && (L = "onCompositionEnd") : "keydown" === a81 && 229 === c.keyCode && (L = "onCompositionStart");
            L && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== L ? "onCompositionEnd" === L && ie && (Q = nd()) : (kd = e, ld = "value" in kd ? kd.value : kd.textContent, ie = !0)), K = oe(d, L), 0 < K.length && (L = new Ld(L, a81, null, c, e), g.push({
                event: L,
                listeners: K
            }), Q ? L.data = Q : (Q = he(c), null !== Q && (L.data = Q))));
            if (Q = ce ? je(a81, c) : ke(a81, c)) d = oe(d, "onBeforeInput"), 0 < d.length && (e = new Ld("onBeforeInput", "beforeinput", null, c, e), g.push({
                event: e,
                listeners: d
            }), e.data = Q);
        }
        se(g, b);
    });
}
function ef(a82, b, c) {
    return {
        instance: a82,
        listener: b,
        currentTarget: c
    };
}
function oe(a83, b) {
    for(var c = b + "Capture", d = []; null !== a83;){
        var e = a83, f = e.stateNode;
        5 === e.tag && null !== f && (e = f, f = Ob(a83, c), null != f && d.unshift(ef(a83, f, e)), f = Ob(a83, b), null != f && d.push(ef(a83, f, e)));
        a83 = a83.return;
    }
    return d;
}
function gf(a84) {
    if (null === a84) return null;
    do a84 = a84.return;
    while (a84 && 5 !== a84.tag)
    return a84 ? a84 : null;
}
function hf(a85, b, c, d, e) {
    for(var f = b._reactName, g = []; null !== c && c !== d;){
        var h = c, k = h.alternate, l = h.stateNode;
        if (null !== k && k === d) break;
        5 === h.tag && null !== l && (h = l, e ? (k = Ob(c, f), null != k && g.unshift(ef(c, k, h))) : e || (k = Ob(c, f), null != k && g.push(ef(c, k, h))));
        c = c.return;
    }
    0 !== g.length && a85.push({
        event: b,
        listeners: g
    });
}
function jf() {
}
var kf = null, lf = null;
function mf(a86, b) {
    switch(a86){
        case "button":
        case "input":
        case "select":
        case "textarea":
            return !!b.autoFocus;
    }
    return !1;
}
function nf(a87, b) {
    return "textarea" === a87 || "option" === a87 || "noscript" === a87 || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var of = "function" === typeof setTimeout ? setTimeout : void 0, pf = "function" === typeof clearTimeout ? clearTimeout : void 0;
function qf(a88) {
    1 === a88.nodeType ? a88.textContent = "" : 9 === a88.nodeType && (a88 = a88.body, null != a88 && (a88.textContent = ""));
}
function rf(a89) {
    for(; null != a89; a89 = a89.nextSibling){
        var b = a89.nodeType;
        if (1 === b || 3 === b) break;
    }
    return a89;
}
function sf(a90) {
    a90 = a90.previousSibling;
    for(var b = 0; a90;){
        if (8 === a90.nodeType) {
            var c = a90.data;
            if ("$" === c || "$!" === c || "$?" === c) {
                if (0 === b) return a90;
                b--;
            } else "/$" === c && b++;
        }
        a90 = a90.previousSibling;
    }
    return null;
}
var tf = 0;
function uf(a91) {
    return {
        $$typeof: Ga,
        toString: a91,
        valueOf: a91
    };
}
var vf = Math.random().toString(36).slice(2), wf = "__reactFiber$" + vf, xf = "__reactProps$" + vf, ff = "__reactContainer$" + vf, yf = "__reactEvents$" + vf;
function wc(a92) {
    var b = a92[wf];
    if (b) return b;
    for(var c = a92.parentNode; c;){
        if (b = c[ff] || c[wf]) {
            c = b.alternate;
            if (null !== b.child || null !== c && null !== c.child) for(a92 = sf(a92); null !== a92;){
                if (c = a92[wf]) return c;
                a92 = sf(a92);
            }
            return b;
        }
        a92 = c;
        c = a92.parentNode;
    }
    return null;
}
function Cb(a93) {
    a93 = a93[wf] || a93[ff];
    return !a93 || 5 !== a93.tag && 6 !== a93.tag && 13 !== a93.tag && 3 !== a93.tag ? null : a93;
}
function ue(a94) {
    if (5 === a94.tag || 6 === a94.tag) return a94.stateNode;
    throw Error(y(33));
}
function Db(a95) {
    return a95[xf] || null;
}
function $e(a96) {
    var b = a96[yf];
    void 0 === b && (b = a96[yf] = new Set);
    return b;
}
var zf = [], Af = -1;
function Bf(a97) {
    return {
        current: a97
    };
}
function H(a98) {
    0 > Af || (a98.current = zf[Af], zf[Af] = null, Af--);
}
function I(a99, b) {
    Af++;
    zf[Af] = a99.current;
    a99.current = b;
}
var Cf = {
}, M = Bf(Cf), N = Bf(!1), Df = Cf;
function Ef(a100, b) {
    var c = a100.type.contextTypes;
    if (!c) return Cf;
    var d = a100.stateNode;
    if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
    var e = {
    }, f;
    for(f in c)e[f] = b[f];
    d && (a100 = a100.stateNode, a100.__reactInternalMemoizedUnmaskedChildContext = b, a100.__reactInternalMemoizedMaskedChildContext = e);
    return e;
}
function Ff(a101) {
    a101 = a101.childContextTypes;
    return null !== a101 && void 0 !== a101;
}
function Gf() {
    H(N);
    H(M);
}
function Hf(a, b, c) {
    if (M.current !== Cf) throw Error(y(168));
    I(M, b);
    I(N, c);
}
function If(a102, b, c) {
    var d = a102.stateNode;
    a102 = b.childContextTypes;
    if ("function" !== typeof d.getChildContext) return c;
    d = d.getChildContext();
    for(var e in d)if (!(e in a102)) throw Error(y(108, Ra(b) || "Unknown", e));
    return m({
    }, c, d);
}
function Jf(a103) {
    a103 = (a103 = a103.stateNode) && a103.__reactInternalMemoizedMergedChildContext || Cf;
    Df = M.current;
    I(M, a103);
    I(N, N.current);
    return !0;
}
function Kf(a104, b, c) {
    var d = a104.stateNode;
    if (!d) throw Error(y(169));
    c ? (a104 = If(a104, b, Df), d.__reactInternalMemoizedMergedChildContext = a104, H(N), H(M), I(M, a104)) : H(N);
    I(N, c);
}
var Lf = null, Mf = null, Nf = r.unstable_runWithPriority, Of = r.unstable_scheduleCallback, Pf = r.unstable_cancelCallback, Qf = r.unstable_shouldYield, Rf = r.unstable_requestPaint, Sf = r.unstable_now, Tf = r.unstable_getCurrentPriorityLevel, Uf = r.unstable_ImmediatePriority, Vf = r.unstable_UserBlockingPriority, Wf = r.unstable_NormalPriority, Xf = r.unstable_LowPriority, Yf = r.unstable_IdlePriority, Zf = {
}, $f = void 0 !== Rf ? Rf : function() {
}, ag = null, bg = null, cg = !1, dg = Sf(), O = 10000 > dg ? Sf : function() {
    return Sf() - dg;
};
function eg() {
    switch(Tf()){
        case Uf:
            return 99;
        case Vf:
            return 98;
        case Wf:
            return 97;
        case Xf:
            return 96;
        case Yf:
            return 95;
        default:
            throw Error(y(332));
    }
}
function fg(a105) {
    switch(a105){
        case 99:
            return Uf;
        case 98:
            return Vf;
        case 97:
            return Wf;
        case 96:
            return Xf;
        case 95:
            return Yf;
        default:
            throw Error(y(332));
    }
}
function gg(a106, b) {
    a106 = fg(a106);
    return Nf(a106, b);
}
function hg(a107, b, c) {
    a107 = fg(a107);
    return Of(a107, b, c);
}
function ig() {
    if (null !== bg) {
        var a108 = bg;
        bg = null;
        Pf(a108);
    }
    jg();
}
function jg() {
    if (!cg && null !== ag) {
        cg = !0;
        var a109 = 0;
        try {
            var b = ag;
            gg(99, function() {
                for(; a109 < b.length; a109++){
                    var c = b[a109];
                    do c = c(!0);
                    while (null !== c)
                }
            });
            ag = null;
        } catch (c) {
            throw null !== ag && (ag = ag.slice(a109 + 1)), Of(Uf, ig), c;
        } finally{
            cg = !1;
        }
    }
}
var kg = ra.ReactCurrentBatchConfig;
function lg(a110, b) {
    if (a110 && a110.defaultProps) {
        b = m({
        }, b);
        a110 = a110.defaultProps;
        for(var c in a110)void 0 === b[c] && (b[c] = a110[c]);
        return b;
    }
    return b;
}
var mg = Bf(null), ng = null, og = null, pg = null;
function qg() {
    pg = og = ng = null;
}
function rg(a111) {
    var b = mg.current;
    H(mg);
    a111.type._context._currentValue = b;
}
function sg(a112, b) {
    for(; null !== a112;){
        var c = a112.alternate;
        if ((a112.childLanes & b) === b) {
            if (null === c || (c.childLanes & b) === b) break;
            else c.childLanes |= b;
        } else a112.childLanes |= b, null !== c && (c.childLanes |= b);
        a112 = a112.return;
    }
}
function tg(a113, b) {
    ng = a113;
    pg = og = null;
    a113 = a113.dependencies;
    null !== a113 && null !== a113.firstContext && (0 !== (a113.lanes & b) && (ug = !0), a113.firstContext = null);
}
function vg(a114, b) {
    if (pg !== a114 && !1 !== b && 0 !== b) {
        if ("number" !== typeof b || 1073741823 === b) pg = a114, b = 1073741823;
        b = {
            context: a114,
            observedBits: b,
            next: null
        };
        if (null === og) {
            if (null === ng) throw Error(y(308));
            og = b;
            ng.dependencies = {
                lanes: 0,
                firstContext: b,
                responders: null
            };
        } else og = og.next = b;
    }
    return a114._currentValue;
}
var wg = !1;
function xg(a115) {
    a115.updateQueue = {
        baseState: a115.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null
        },
        effects: null
    };
}
function yg(a116, b) {
    a116 = a116.updateQueue;
    b.updateQueue === a116 && (b.updateQueue = {
        baseState: a116.baseState,
        firstBaseUpdate: a116.firstBaseUpdate,
        lastBaseUpdate: a116.lastBaseUpdate,
        shared: a116.shared,
        effects: a116.effects
    });
}
function zg(a117, b) {
    return {
        eventTime: a117,
        lane: b,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    };
}
function Ag(a118, b) {
    a118 = a118.updateQueue;
    if (null !== a118) {
        a118 = a118.shared;
        var c = a118.pending;
        null === c ? b.next = b : (b.next = c.next, c.next = b);
        a118.pending = b;
    }
}
function Bg(a119, b) {
    var c = a119.updateQueue, d = a119.alternate;
    if (null !== d && (d = d.updateQueue, c === d)) {
        var e = null, f = null;
        c = c.firstBaseUpdate;
        if (null !== c) {
            do {
                var g = {
                    eventTime: c.eventTime,
                    lane: c.lane,
                    tag: c.tag,
                    payload: c.payload,
                    callback: c.callback,
                    next: null
                };
                null === f ? e = f = g : f = f.next = g;
                c = c.next;
            }while (null !== c)
            null === f ? e = f = b : f = f.next = b;
        } else e = f = b;
        c = {
            baseState: d.baseState,
            firstBaseUpdate: e,
            lastBaseUpdate: f,
            shared: d.shared,
            effects: d.effects
        };
        a119.updateQueue = c;
        return;
    }
    a119 = c.lastBaseUpdate;
    null === a119 ? c.firstBaseUpdate = b : a119.next = b;
    c.lastBaseUpdate = b;
}
function Cg(a120, b, c, d) {
    var e = a120.updateQueue;
    wg = !1;
    var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
    if (null !== h) {
        e.shared.pending = null;
        var k = h, l = k.next;
        k.next = null;
        null === g ? f = l : g.next = l;
        g = k;
        var n = a120.alternate;
        if (null !== n) {
            n = n.updateQueue;
            var A = n.lastBaseUpdate;
            A !== g && (null === A ? n.firstBaseUpdate = l : A.next = l, n.lastBaseUpdate = k);
        }
    }
    if (null !== f) {
        A = e.baseState;
        g = 0;
        n = l = k = null;
        do {
            h = f.lane;
            var p = f.eventTime;
            if ((d & h) === h) {
                null !== n && (n = n.next = {
                    eventTime: p,
                    lane: 0,
                    tag: f.tag,
                    payload: f.payload,
                    callback: f.callback,
                    next: null
                });
                a: {
                    var C = a120, x = f;
                    h = b;
                    p = c;
                    switch(x.tag){
                        case 1:
                            C = x.payload;
                            if ("function" === typeof C) {
                                A = C.call(p, A, h);
                                break a;
                            }
                            A = C;
                            break a;
                        case 3:
                            C.flags = C.flags & -4097 | 64;
                        case 0:
                            C = x.payload;
                            h = "function" === typeof C ? C.call(p, A, h) : C;
                            if (null === h || void 0 === h) break a;
                            A = m({
                            }, A, h);
                            break a;
                        case 2:
                            wg = !0;
                    }
                }
                null !== f.callback && (a120.flags |= 32, h = e.effects, null === h ? e.effects = [
                    f
                ] : h.push(f));
            } else p = {
                eventTime: p,
                lane: h,
                tag: f.tag,
                payload: f.payload,
                callback: f.callback,
                next: null
            }, null === n ? (l = n = p, k = A) : n = n.next = p, g |= h;
            f = f.next;
            if (null === f) {
                if (h = e.shared.pending, null === h) break;
                else f = h.next, h.next = null, e.lastBaseUpdate = h, e.shared.pending = null;
            }
        }while (1)
        null === n && (k = A);
        e.baseState = k;
        e.firstBaseUpdate = l;
        e.lastBaseUpdate = n;
        Dg |= g;
        a120.lanes = g;
        a120.memoizedState = A;
    }
}
function Eg(a121, b, c) {
    a121 = b.effects;
    b.effects = null;
    if (null !== a121) for(b = 0; b < a121.length; b++){
        var d = a121[b], e = d.callback;
        if (null !== e) {
            d.callback = null;
            d = c;
            if ("function" !== typeof e) throw Error(y(191, e));
            e.call(d);
        }
    }
}
var Fg = (new aa.Component).refs;
function Gg(a122, b, c, d) {
    b = a122.memoizedState;
    c = c(d, b);
    c = null === c || void 0 === c ? b : m({
    }, b, c);
    a122.memoizedState = c;
    0 === a122.lanes && (a122.updateQueue.baseState = c);
}
var Kg = {
    isMounted: function(a123) {
        return (a123 = a123._reactInternals) ? Zb(a123) === a123 : !1;
    },
    enqueueSetState: function(a124, b, c) {
        a124 = a124._reactInternals;
        var d = Hg(), e = Ig(a124), f = zg(d, e);
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        Ag(a124, f);
        Jg(a124, e, d);
    },
    enqueueReplaceState: function(a125, b, c) {
        a125 = a125._reactInternals;
        var d = Hg(), e = Ig(a125), f = zg(d, e);
        f.tag = 1;
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        Ag(a125, f);
        Jg(a125, e, d);
    },
    enqueueForceUpdate: function(a126, b) {
        a126 = a126._reactInternals;
        var c = Hg(), d = Ig(a126), e = zg(c, d);
        e.tag = 2;
        void 0 !== b && null !== b && (e.callback = b);
        Ag(a126, e);
        Jg(a126, d, c);
    }
};
function Lg(a127, b, c, d, e, f, g) {
    a127 = a127.stateNode;
    return "function" === typeof a127.shouldComponentUpdate ? a127.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Je(c, d) || !Je(e, f) : !0;
}
function Mg(a128, b, c) {
    var d = !1, e = Cf;
    var f = b.contextType;
    "object" === typeof f && null !== f ? f = vg(f) : (e = Ff(b) ? Df : M.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Ef(a128, e) : Cf);
    b = new b(c, f);
    a128.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
    b.updater = Kg;
    a128.stateNode = b;
    b._reactInternals = a128;
    d && (a128 = a128.stateNode, a128.__reactInternalMemoizedUnmaskedChildContext = e, a128.__reactInternalMemoizedMaskedChildContext = f);
    return b;
}
function Ng(a129, b, c, d) {
    a129 = b.state;
    "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
    "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
    b.state !== a129 && Kg.enqueueReplaceState(b, b.state, null);
}
function Og(a130, b, c, d) {
    var e = a130.stateNode;
    e.props = c;
    e.state = a130.memoizedState;
    e.refs = Fg;
    xg(a130);
    var f = b.contextType;
    "object" === typeof f && null !== f ? e.context = vg(f) : (f = Ff(b) ? Df : M.current, e.context = Ef(a130, f));
    Cg(a130, c, e, d);
    e.state = a130.memoizedState;
    f = b.getDerivedStateFromProps;
    "function" === typeof f && (Gg(a130, b, f, c), e.state = a130.memoizedState);
    "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Kg.enqueueReplaceState(e, e.state, null), Cg(a130, c, e, d), e.state = a130.memoizedState);
    "function" === typeof e.componentDidMount && (a130.flags |= 4);
}
var Pg = Array.isArray;
function Qg(a131, b3, c) {
    a131 = c.ref;
    if (null !== a131 && "function" !== typeof a131 && "object" !== typeof a131) {
        if (c._owner) {
            c = c._owner;
            if (c) {
                if (1 !== c.tag) throw Error(y(309));
                var d = c.stateNode;
            }
            if (!d) throw Error(y(147, a131));
            var e = "" + a131;
            if (null !== b3 && null !== b3.ref && "function" === typeof b3.ref && b3.ref._stringRef === e) return b3.ref;
            b3 = function(a132) {
                var b = d.refs;
                b === Fg && (b = d.refs = {
                });
                null === a132 ? delete b[e] : b[e] = a132;
            };
            b3._stringRef = e;
            return b3;
        }
        if ("string" !== typeof a131) throw Error(y(284));
        if (!c._owner) throw Error(y(290, a131));
    }
    return a131;
}
function Rg(a133, b) {
    if ("textarea" !== a133.type) throw Error(y(31, "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b));
}
function Sg(a134) {
    function b4(b, c) {
        if (a134) {
            var d = b.lastEffect;
            null !== d ? (d.nextEffect = c, b.lastEffect = c) : b.firstEffect = b.lastEffect = c;
            c.nextEffect = null;
            c.flags = 8;
        }
    }
    function c1(c, d) {
        if (!a134) return null;
        for(; null !== d;)b4(c, d), d = d.sibling;
        return null;
    }
    function d2(a135, b) {
        for(a135 = new Map; null !== b;)null !== b.key ? a135.set(b.key, b) : a135.set(b.index, b), b = b.sibling;
        return a135;
    }
    function e2(a136, b) {
        a136 = Tg(a136, b);
        a136.index = 0;
        a136.sibling = null;
        return a136;
    }
    function f1(b, c, d) {
        b.index = d;
        if (!a134) return c;
        d = b.alternate;
        if (null !== d) return d = d.index, d < c ? (b.flags = 2, c) : d;
        b.flags = 2;
        return c;
    }
    function g1(b) {
        a134 && null === b.alternate && (b.flags = 2);
        return b;
    }
    function h1(a137, b, c, d) {
        if (null === b || 6 !== b.tag) return b = Ug(c, a137.mode, d), b.return = a137, b;
        b = e2(b, c);
        b.return = a137;
        return b;
    }
    function k1(a138, b, c, d) {
        if (null !== b && b.elementType === c.type) return d = e2(b, c.props), d.ref = Qg(a138, b, c), d.return = a138, d;
        d = Vg(c.type, c.key, c.props, null, a138.mode, d);
        d.ref = Qg(a138, b, c);
        d.return = a138;
        return d;
    }
    function l1(a139, b, c, d) {
        if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = Wg(c, a139.mode, d), b.return = a139, b;
        b = e2(b, c.children || []);
        b.return = a139;
        return b;
    }
    function n1(a140, b, c, d, f) {
        if (null === b || 7 !== b.tag) return b = Xg(c, a140.mode, d, f), b.return = a140, b;
        b = e2(b, c);
        b.return = a140;
        return b;
    }
    function A(a141, b, c) {
        if ("string" === typeof b || "number" === typeof b) return b = Ug("" + b, a141.mode, c), b.return = a141, b;
        if ("object" === typeof b && null !== b) {
            switch(b.$$typeof){
                case sa:
                    return c = Vg(b.type, b.key, b.props, null, a141.mode, c), c.ref = Qg(a141, null, b), c.return = a141, c;
                case ta:
                    return b = Wg(b, a141.mode, c), b.return = a141, b;
            }
            if (Pg(b) || La(b)) return b = Xg(b, a141.mode, c, null), b.return = a141, b;
            Rg(a141, b);
        }
        return null;
    }
    function p(a142, b, c, d) {
        var e = null !== b ? b.key : null;
        if ("string" === typeof c || "number" === typeof c) return null !== e ? null : h1(a142, b, "" + c, d);
        if ("object" === typeof c && null !== c) {
            switch(c.$$typeof){
                case sa:
                    return c.key === e ? c.type === ua ? n1(a142, b, c.props.children, d, e) : k1(a142, b, c, d) : null;
                case ta:
                    return c.key === e ? l1(a142, b, c, d) : null;
            }
            if (Pg(c) || La(c)) return null !== e ? null : n1(a142, b, c, d, null);
            Rg(a142, c);
        }
        return null;
    }
    function C(a143, b, c, d, e) {
        if ("string" === typeof d || "number" === typeof d) return a143 = a143.get(c) || null, h1(b, a143, "" + d, e);
        if ("object" === typeof d && null !== d) {
            switch(d.$$typeof){
                case sa:
                    return a143 = a143.get(null === d.key ? c : d.key) || null, d.type === ua ? n1(b, a143, d.props.children, e, d.key) : k1(b, a143, d, e);
                case ta:
                    return a143 = a143.get(null === d.key ? c : d.key) || null, l1(b, a143, d, e);
            }
            if (Pg(d) || La(d)) return a143 = a143.get(c) || null, n1(b, a143, d, e, null);
            Rg(b, d);
        }
        return null;
    }
    function x(e, g, h, k) {
        for(var l = null, t = null, u = g, z = g = 0, q = null; null !== u && z < h.length; z++){
            u.index > z ? (q = u, u = null) : q = u.sibling;
            var n = p(e, u, h[z], k);
            if (null === n) {
                null === u && (u = q);
                break;
            }
            a134 && u && null === n.alternate && b4(e, u);
            g = f1(n, g, z);
            null === t ? l = n : t.sibling = n;
            t = n;
            u = q;
        }
        if (z === h.length) return c1(e, u), l;
        if (null === u) {
            for(; z < h.length; z++)u = A(e, h[z], k), null !== u && (g = f1(u, g, z), null === t ? l = u : t.sibling = u, t = u);
            return l;
        }
        for(u = d2(e, u); z < h.length; z++)q = C(u, e, z, h[z], k), null !== q && (a134 && null !== q.alternate && u.delete(null === q.key ? z : q.key), g = f1(q, g, z), null === t ? l = q : t.sibling = q, t = q);
        a134 && u.forEach(function(a144) {
            return b4(e, a144);
        });
        return l;
    }
    function w1(e, g, h, k) {
        var l = La(h);
        if ("function" !== typeof l) throw Error(y(150));
        h = l.call(h);
        if (null == h) throw Error(y(151));
        for(var t = l = null, u = g, z = g = 0, q = null, n = h.next(); null !== u && !n.done; z++, n = h.next()){
            u.index > z ? (q = u, u = null) : q = u.sibling;
            var w = p(e, u, n.value, k);
            if (null === w) {
                null === u && (u = q);
                break;
            }
            a134 && u && null === w.alternate && b4(e, u);
            g = f1(w, g, z);
            null === t ? l = w : t.sibling = w;
            t = w;
            u = q;
        }
        if (n.done) return c1(e, u), l;
        if (null === u) {
            for(; !n.done; z++, n = h.next())n = A(e, n.value, k), null !== n && (g = f1(n, g, z), null === t ? l = n : t.sibling = n, t = n);
            return l;
        }
        for(u = d2(e, u); !n.done; z++, n = h.next())n = C(u, e, z, n.value, k), null !== n && (a134 && null !== n.alternate && u.delete(null === n.key ? z : n.key), g = f1(n, g, z), null === t ? l = n : t.sibling = n, t = n);
        a134 && u.forEach(function(a145) {
            return b4(e, a145);
        });
        return l;
    }
    return function(a146, d, f, h) {
        var k = "object" === typeof f && null !== f && f.type === ua && null === f.key;
        k && (f = f.props.children);
        var l = "object" === typeof f && null !== f;
        if (l) switch(f.$$typeof){
            case sa:
                a: {
                    l = f.key;
                    for(k = d; null !== k;){
                        if (k.key === l) {
                            switch(k.tag){
                                case 7:
                                    if (f.type === ua) {
                                        c1(a146, k.sibling);
                                        d = e2(k, f.props.children);
                                        d.return = a146;
                                        a146 = d;
                                        break a;
                                    }
                                    break;
                                default:
                                    if (k.elementType === f.type) {
                                        c1(a146, k.sibling);
                                        d = e2(k, f.props);
                                        d.ref = Qg(a146, k, f);
                                        d.return = a146;
                                        a146 = d;
                                        break a;
                                    }
                            }
                            c1(a146, k);
                            break;
                        } else b4(a146, k);
                        k = k.sibling;
                    }
                    f.type === ua ? (d = Xg(f.props.children, a146.mode, h, f.key), d.return = a146, a146 = d) : (h = Vg(f.type, f.key, f.props, null, a146.mode, h), h.ref = Qg(a146, d, f), h.return = a146, a146 = h);
                }
                return g1(a146);
            case ta:
                a: {
                    for(k = f.key; null !== d;){
                        if (d.key === k) {
                            if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                                c1(a146, d.sibling);
                                d = e2(d, f.children || []);
                                d.return = a146;
                                a146 = d;
                                break a;
                            } else {
                                c1(a146, d);
                                break;
                            }
                        } else b4(a146, d);
                        d = d.sibling;
                    }
                    d = Wg(f, a146.mode, h);
                    d.return = a146;
                    a146 = d;
                }
                return g1(a146);
        }
        if ("string" === typeof f || "number" === typeof f) return f = "" + f, null !== d && 6 === d.tag ? (c1(a146, d.sibling), d = e2(d, f), d.return = a146, a146 = d) : (c1(a146, d), d = Ug(f, a146.mode, h), d.return = a146, a146 = d), g1(a146);
        if (Pg(f)) return x(a146, d, f, h);
        if (La(f)) return w1(a146, d, f, h);
        l && Rg(a146, f);
        if ("undefined" === typeof f && !k) switch(a146.tag){
            case 1:
            case 22:
            case 0:
            case 11:
            case 15:
                throw Error(y(152, Ra(a146.type) || "Component"));
        }
        return c1(a146, d);
    };
}
var Yg = Sg(!0), Zg = Sg(!1), $g = {
}, ah = Bf($g), bh = Bf($g), ch = Bf($g);
function dh(a147) {
    if (a147 === $g) throw Error(y(174));
    return a147;
}
function eh(a148, b) {
    I(ch, b);
    I(bh, a148);
    I(ah, $g);
    a148 = b.nodeType;
    switch(a148){
        case 9:
        case 11:
            b = (b = b.documentElement) ? b.namespaceURI : mb(null, "");
            break;
        default:
            a148 = 8 === a148 ? b.parentNode : b, b = a148.namespaceURI || null, a148 = a148.tagName, b = mb(b, a148);
    }
    H(ah);
    I(ah, b);
}
function fh() {
    H(ah);
    H(bh);
    H(ch);
}
function gh(a149) {
    dh(ch.current);
    var b = dh(ah.current);
    var c = mb(b, a149.type);
    b !== c && (I(bh, a149), I(ah, c));
}
function hh(a150) {
    bh.current === a150 && (H(ah), H(bh));
}
var P = Bf(0);
function ih(a151) {
    for(var b = a151; null !== b;){
        if (13 === b.tag) {
            var c = b.memoizedState;
            if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
        } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
            if (0 !== (b.flags & 64)) return b;
        } else if (null !== b.child) {
            b.child.return = b;
            b = b.child;
            continue;
        }
        if (b === a151) break;
        for(; null === b.sibling;){
            if (null === b.return || b.return === a151) return null;
            b = b.return;
        }
        b.sibling.return = b.return;
        b = b.sibling;
    }
    return null;
}
var jh = null, kh = null, lh = !1;
function mh(a152, b) {
    var c = nh(5, null, null, 0);
    c.elementType = "DELETED";
    c.type = "DELETED";
    c.stateNode = b;
    c.return = a152;
    c.flags = 8;
    null !== a152.lastEffect ? (a152.lastEffect.nextEffect = c, a152.lastEffect = c) : a152.firstEffect = a152.lastEffect = c;
}
function oh(a153, b) {
    switch(a153.tag){
        case 5:
            var c = a153.type;
            b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
            return null !== b ? (a153.stateNode = b, !0) : !1;
        case 6:
            return b = "" === a153.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a153.stateNode = b, !0) : !1;
        case 13:
            return !1;
        default:
            return !1;
    }
}
function ph(a154) {
    if (lh) {
        var b = kh;
        if (b) {
            var c = b;
            if (!oh(a154, b)) {
                b = rf(c.nextSibling);
                if (!b || !oh(a154, b)) {
                    a154.flags = a154.flags & -1025 | 2;
                    lh = !1;
                    jh = a154;
                    return;
                }
                mh(jh, c);
            }
            jh = a154;
            kh = rf(b.firstChild);
        } else a154.flags = a154.flags & -1025 | 2, lh = !1, jh = a154;
    }
}
function qh(a155) {
    for(a155 = a155.return; null !== a155 && 5 !== a155.tag && 3 !== a155.tag && 13 !== a155.tag;)a155 = a155.return;
    jh = a155;
}
function rh(a156) {
    if (a156 !== jh) return !1;
    if (!lh) return qh(a156), lh = !0, !1;
    var b = a156.type;
    if (5 !== a156.tag || "head" !== b && "body" !== b && !nf(b, a156.memoizedProps)) for(b = kh; b;)mh(a156, b), b = rf(b.nextSibling);
    qh(a156);
    if (13 === a156.tag) {
        a156 = a156.memoizedState;
        a156 = null !== a156 ? a156.dehydrated : null;
        if (!a156) throw Error(y(317));
        a: {
            a156 = a156.nextSibling;
            for(b = 0; a156;){
                if (8 === a156.nodeType) {
                    var c = a156.data;
                    if ("/$" === c) {
                        if (0 === b) {
                            kh = rf(a156.nextSibling);
                            break a;
                        }
                        b--;
                    } else "$" !== c && "$!" !== c && "$?" !== c || b++;
                }
                a156 = a156.nextSibling;
            }
            kh = null;
        }
    } else kh = jh ? rf(a156.stateNode.nextSibling) : null;
    return !0;
}
function sh() {
    kh = jh = null;
    lh = !1;
}
var th = [];
function uh() {
    for(var a157 = 0; a157 < th.length; a157++)th[a157]._workInProgressVersionPrimary = null;
    th.length = 0;
}
var vh = ra.ReactCurrentDispatcher, wh = ra.ReactCurrentBatchConfig, xh = 0, R = null, S = null, T = null, yh = !1, zh = !1;
function Ah() {
    throw Error(y(321));
}
function Bh(a158, b) {
    if (null === b) return !1;
    for(var c = 0; c < b.length && c < a158.length; c++)if (!He(a158[c], b[c])) return !1;
    return !0;
}
function Ch(a159, b, c, d, e, f) {
    xh = f;
    R = b;
    b.memoizedState = null;
    b.updateQueue = null;
    b.lanes = 0;
    vh.current = null === a159 || null === a159.memoizedState ? Dh : Eh;
    a159 = c(d, e);
    if (zh) {
        f = 0;
        do {
            zh = !1;
            if (!(25 > f)) throw Error(y(301));
            f += 1;
            T = S = null;
            b.updateQueue = null;
            vh.current = Fh;
            a159 = c(d, e);
        }while (zh)
    }
    vh.current = Gh;
    b = null !== S && null !== S.next;
    xh = 0;
    T = S = R = null;
    yh = !1;
    if (b) throw Error(y(300));
    return a159;
}
function Hh() {
    var a160 = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    null === T ? R.memoizedState = T = a160 : T = T.next = a160;
    return T;
}
function Ih() {
    if (null === S) {
        var a161 = R.alternate;
        a161 = null !== a161 ? a161.memoizedState : null;
    } else a161 = S.next;
    var b = null === T ? R.memoizedState : T.next;
    if (null !== b) T = b, S = a161;
    else {
        if (null === a161) throw Error(y(310));
        S = a161;
        a161 = {
            memoizedState: S.memoizedState,
            baseState: S.baseState,
            baseQueue: S.baseQueue,
            queue: S.queue,
            next: null
        };
        null === T ? R.memoizedState = T = a161 : T = T.next = a161;
    }
    return T;
}
function Jh(a162, b) {
    return "function" === typeof b ? b(a162) : b;
}
function Kh(a163) {
    var b = Ih(), c = b.queue;
    if (null === c) throw Error(y(311));
    c.lastRenderedReducer = a163;
    var d = S, e = d.baseQueue, f = c.pending;
    if (null !== f) {
        if (null !== e) {
            var g = e.next;
            e.next = f.next;
            f.next = g;
        }
        d.baseQueue = e = f;
        c.pending = null;
    }
    if (null !== e) {
        e = e.next;
        d = d.baseState;
        var h = g = f = null, k = e;
        do {
            var l = k.lane;
            if ((xh & l) === l) null !== h && (h = h.next = {
                lane: 0,
                action: k.action,
                eagerReducer: k.eagerReducer,
                eagerState: k.eagerState,
                next: null
            }), d = k.eagerReducer === a163 ? k.eagerState : a163(d, k.action);
            else {
                var n = {
                    lane: l,
                    action: k.action,
                    eagerReducer: k.eagerReducer,
                    eagerState: k.eagerState,
                    next: null
                };
                null === h ? (g = h = n, f = d) : h = h.next = n;
                R.lanes |= l;
                Dg |= l;
            }
            k = k.next;
        }while (null !== k && k !== e)
        null === h ? f = d : h.next = g;
        He(d, b.memoizedState) || (ug = !0);
        b.memoizedState = d;
        b.baseState = f;
        b.baseQueue = h;
        c.lastRenderedState = d;
    }
    return [
        b.memoizedState,
        c.dispatch
    ];
}
function Lh(a164) {
    var b = Ih(), c = b.queue;
    if (null === c) throw Error(y(311));
    c.lastRenderedReducer = a164;
    var d = c.dispatch, e = c.pending, f = b.memoizedState;
    if (null !== e) {
        c.pending = null;
        var g = e = e.next;
        do f = a164(f, g.action), g = g.next;
        while (g !== e)
        He(f, b.memoizedState) || (ug = !0);
        b.memoizedState = f;
        null === b.baseQueue && (b.baseState = f);
        c.lastRenderedState = f;
    }
    return [
        f,
        d
    ];
}
function Mh(a165, b, c) {
    var d = b._getVersion;
    d = d(b._source);
    var e = b._workInProgressVersionPrimary;
    if (null !== e) a165 = e === d;
    else if (a165 = a165.mutableReadLanes, a165 = (xh & a165) === a165) b._workInProgressVersionPrimary = d, th.push(b);
    if (a165) return c(b._source);
    th.push(b);
    throw Error(y(350));
}
function Nh(a166, b, c2, d3) {
    var e = U;
    if (null === e) throw Error(y(349));
    var f = b._getVersion, g = f(b._source), h2 = vh.current, k2 = h2.useState(function() {
        return Mh(e, b, c2);
    }), l = k2[1], n = k2[0];
    k2 = T;
    var A = a166.memoizedState, p = A.refs, C = p.getSnapshot, x = A.source;
    A = A.subscribe;
    var w = R;
    a166.memoizedState = {
        refs: p,
        source: b,
        subscribe: d3
    };
    h2.useEffect(function() {
        p.getSnapshot = c2;
        p.setSnapshot = l;
        var a167 = f(b._source);
        if (!He(g, a167)) {
            a167 = c2(b._source);
            He(n, a167) || (l(a167), a167 = Ig(w), e.mutableReadLanes |= a167 & e.pendingLanes);
            a167 = e.mutableReadLanes;
            e.entangledLanes |= a167;
            for(var d = e.entanglements, h = a167; 0 < h;){
                var k = 31 - Vc(h), v = 1 << k;
                d[k] |= a167;
                h &= ~v;
            }
        }
    }, [
        c2,
        b,
        d3
    ]);
    h2.useEffect(function() {
        return d3(b._source, function() {
            var a168 = p.getSnapshot, c = p.setSnapshot;
            try {
                c(a168(b._source));
                var d = Ig(w);
                e.mutableReadLanes |= d & e.pendingLanes;
            } catch (q) {
                c(function() {
                    throw q;
                });
            }
        });
    }, [
        b,
        d3
    ]);
    He(C, c2) && He(x, b) && He(A, d3) || (a166 = {
        pending: null,
        dispatch: null,
        lastRenderedReducer: Jh,
        lastRenderedState: n
    }, a166.dispatch = l = Oh.bind(null, R, a166), k2.queue = a166, k2.baseQueue = null, n = Mh(e, b, c2), k2.memoizedState = k2.baseState = n);
    return n;
}
function Ph(a169, b, c) {
    var d = Ih();
    return Nh(d, a169, b, c);
}
function Qh(a170) {
    var b = Hh();
    "function" === typeof a170 && (a170 = a170());
    b.memoizedState = b.baseState = a170;
    a170 = b.queue = {
        pending: null,
        dispatch: null,
        lastRenderedReducer: Jh,
        lastRenderedState: a170
    };
    a170 = a170.dispatch = Oh.bind(null, R, a170);
    return [
        b.memoizedState,
        a170
    ];
}
function Rh(a171, b, c, d) {
    a171 = {
        tag: a171,
        create: b,
        destroy: c,
        deps: d,
        next: null
    };
    b = R.updateQueue;
    null === b ? (b = {
        lastEffect: null
    }, R.updateQueue = b, b.lastEffect = a171.next = a171) : (c = b.lastEffect, null === c ? b.lastEffect = a171.next = a171 : (d = c.next, c.next = a171, a171.next = d, b.lastEffect = a171));
    return a171;
}
function Sh(a172) {
    var b = Hh();
    a172 = {
        current: a172
    };
    return b.memoizedState = a172;
}
function Th() {
    return Ih().memoizedState;
}
function Uh(a173, b, c, d) {
    var e = Hh();
    R.flags |= a173;
    e.memoizedState = Rh(1 | b, c, void 0, void 0 === d ? null : d);
}
function Vh(a174, b, c, d) {
    var e = Ih();
    d = void 0 === d ? null : d;
    var f = void 0;
    if (null !== S) {
        var g = S.memoizedState;
        f = g.destroy;
        if (null !== d && Bh(d, g.deps)) {
            Rh(b, c, f, d);
            return;
        }
    }
    R.flags |= a174;
    e.memoizedState = Rh(1 | b, c, f, d);
}
function Wh(a175, b) {
    return Uh(516, 4, a175, b);
}
function Xh(a176, b) {
    return Vh(516, 4, a176, b);
}
function Yh(a177, b) {
    return Vh(4, 2, a177, b);
}
function Zh(a178, b) {
    if ("function" === typeof b) return a178 = a178(), b(a178), function() {
        b(null);
    };
    if (null !== b && void 0 !== b) return a178 = a178(), b.current = a178, function() {
        b.current = null;
    };
}
function $h(a179, b, c) {
    c = null !== c && void 0 !== c ? c.concat([
        a179
    ]) : null;
    return Vh(4, 2, Zh.bind(null, b, a179), c);
}
function ai() {
}
function bi(a180, b) {
    var c = Ih();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Bh(b, d[1])) return d[0];
    c.memoizedState = [
        a180,
        b
    ];
    return a180;
}
function ci(a181, b) {
    var c = Ih();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Bh(b, d[1])) return d[0];
    a181 = a181();
    c.memoizedState = [
        a181,
        b
    ];
    return a181;
}
function di(a182, b) {
    var c3 = eg();
    gg(98 > c3 ? 98 : c3, function() {
        a182(!0);
    });
    gg(97 < c3 ? 97 : c3, function() {
        var c = wh.transition;
        wh.transition = 1;
        try {
            a182(!1), b();
        } finally{
            wh.transition = c;
        }
    });
}
function Oh(a183, b, c) {
    var d = Hg(), e = Ig(a183), f = {
        lane: e,
        action: c,
        eagerReducer: null,
        eagerState: null,
        next: null
    }, g = b.pending;
    null === g ? f.next = f : (f.next = g.next, g.next = f);
    b.pending = f;
    g = a183.alternate;
    if (a183 === R || null !== g && g === R) zh = yh = !0;
    else {
        if (0 === a183.lanes && (null === g || 0 === g.lanes) && (g = b.lastRenderedReducer, null !== g)) try {
            var h = b.lastRenderedState, k = g(h, c);
            f.eagerReducer = g;
            f.eagerState = k;
            if (He(k, h)) return;
        } catch (l) {
        } finally{
        }
        Jg(a183, e, d);
    }
}
var Gh = {
    readContext: vg,
    useCallback: Ah,
    useContext: Ah,
    useEffect: Ah,
    useImperativeHandle: Ah,
    useLayoutEffect: Ah,
    useMemo: Ah,
    useReducer: Ah,
    useRef: Ah,
    useState: Ah,
    useDebugValue: Ah,
    useDeferredValue: Ah,
    useTransition: Ah,
    useMutableSource: Ah,
    useOpaqueIdentifier: Ah,
    unstable_isNewReconciler: !1
}, Dh = {
    readContext: vg,
    useCallback: function(a184, b) {
        Hh().memoizedState = [
            a184,
            void 0 === b ? null : b
        ];
        return a184;
    },
    useContext: vg,
    useEffect: Wh,
    useImperativeHandle: function(a185, b, c) {
        c = null !== c && void 0 !== c ? c.concat([
            a185
        ]) : null;
        return Uh(4, 2, Zh.bind(null, b, a185), c);
    },
    useLayoutEffect: function(a186, b) {
        return Uh(4, 2, a186, b);
    },
    useMemo: function(a187, b) {
        var c = Hh();
        b = void 0 === b ? null : b;
        a187 = a187();
        c.memoizedState = [
            a187,
            b
        ];
        return a187;
    },
    useReducer: function(a188, b, c) {
        var d = Hh();
        b = void 0 !== c ? c(b) : b;
        d.memoizedState = d.baseState = b;
        a188 = d.queue = {
            pending: null,
            dispatch: null,
            lastRenderedReducer: a188,
            lastRenderedState: b
        };
        a188 = a188.dispatch = Oh.bind(null, R, a188);
        return [
            d.memoizedState,
            a188
        ];
    },
    useRef: Sh,
    useState: Qh,
    useDebugValue: ai,
    useDeferredValue: function(a189) {
        var b5 = Qh(a189), c = b5[0], d = b5[1];
        Wh(function() {
            var b = wh.transition;
            wh.transition = 1;
            try {
                d(a189);
            } finally{
                wh.transition = b;
            }
        }, [
            a189
        ]);
        return c;
    },
    useTransition: function() {
        var a190 = Qh(!1), b = a190[0];
        a190 = di.bind(null, a190[1]);
        Sh(a190);
        return [
            a190,
            b
        ];
    },
    useMutableSource: function(a191, b, c) {
        var d = Hh();
        d.memoizedState = {
            refs: {
                getSnapshot: b,
                setSnapshot: null
            },
            source: a191,
            subscribe: c
        };
        return Nh(d, a191, b, c);
    },
    useOpaqueIdentifier: function() {
        if (lh) {
            var a192 = !1, b = uf(function() {
                a192 || (a192 = !0, c("r:" + (tf++).toString(36)));
                throw Error(y(355));
            }), c = Qh(b)[1];
            0 === (R.mode & 2) && (R.flags |= 516, Rh(5, function() {
                c("r:" + (tf++).toString(36));
            }, void 0, null));
            return b;
        }
        b = "r:" + (tf++).toString(36);
        Qh(b);
        return b;
    },
    unstable_isNewReconciler: !1
}, Eh = {
    readContext: vg,
    useCallback: bi,
    useContext: vg,
    useEffect: Xh,
    useImperativeHandle: $h,
    useLayoutEffect: Yh,
    useMemo: ci,
    useReducer: Kh,
    useRef: Th,
    useState: function() {
        return Kh(Jh);
    },
    useDebugValue: ai,
    useDeferredValue: function(a193) {
        var b6 = Kh(Jh), c = b6[0], d = b6[1];
        Xh(function() {
            var b = wh.transition;
            wh.transition = 1;
            try {
                d(a193);
            } finally{
                wh.transition = b;
            }
        }, [
            a193
        ]);
        return c;
    },
    useTransition: function() {
        var a194 = Kh(Jh)[0];
        return [
            Th().current,
            a194
        ];
    },
    useMutableSource: Ph,
    useOpaqueIdentifier: function() {
        return Kh(Jh)[0];
    },
    unstable_isNewReconciler: !1
}, Fh = {
    readContext: vg,
    useCallback: bi,
    useContext: vg,
    useEffect: Xh,
    useImperativeHandle: $h,
    useLayoutEffect: Yh,
    useMemo: ci,
    useReducer: Lh,
    useRef: Th,
    useState: function() {
        return Lh(Jh);
    },
    useDebugValue: ai,
    useDeferredValue: function(a195) {
        var b7 = Lh(Jh), c = b7[0], d = b7[1];
        Xh(function() {
            var b = wh.transition;
            wh.transition = 1;
            try {
                d(a195);
            } finally{
                wh.transition = b;
            }
        }, [
            a195
        ]);
        return c;
    },
    useTransition: function() {
        var a196 = Lh(Jh)[0];
        return [
            Th().current,
            a196
        ];
    },
    useMutableSource: Ph,
    useOpaqueIdentifier: function() {
        return Lh(Jh)[0];
    },
    unstable_isNewReconciler: !1
}, ei = ra.ReactCurrentOwner, ug = !1;
function fi(a197, b, c, d) {
    b.child = null === a197 ? Zg(b, null, c, d) : Yg(b, a197.child, c, d);
}
function gi(a198, b, c, d, e) {
    c = c.render;
    var f = b.ref;
    tg(b, e);
    d = Ch(a198, b, c, d, f, e);
    if (null !== a198 && !ug) return b.updateQueue = a198.updateQueue, b.flags &= -517, a198.lanes &= ~e, hi(a198, b, e);
    b.flags |= 1;
    fi(a198, b, d, e);
    return b.child;
}
function ii(a199, b, c, d, e, f) {
    if (null === a199) {
        var g = c.type;
        if ("function" === typeof g && !ji(g) && void 0 === g.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = g, ki(a199, b, g, d, e, f);
        a199 = Vg(c.type, null, d, b, b.mode, f);
        a199.ref = b.ref;
        a199.return = b;
        return b.child = a199;
    }
    g = a199.child;
    if (0 === (e & f) && (e = g.memoizedProps, c = c.compare, c = null !== c ? c : Je, c(e, d) && a199.ref === b.ref)) return hi(a199, b, f);
    b.flags |= 1;
    a199 = Tg(g, d);
    a199.ref = b.ref;
    a199.return = b;
    return b.child = a199;
}
function ki(a200, b, c, d, e, f) {
    if (null !== a200 && Je(a200.memoizedProps, d) && a200.ref === b.ref) {
        if (ug = !1, 0 !== (f & e)) 0 !== (a200.flags & 16384) && (ug = !0);
        else return b.lanes = a200.lanes, hi(a200, b, f);
    }
    return li(a200, b, c, d, f);
}
function mi(a201, b, c) {
    var d = b.pendingProps, e = d.children, f = null !== a201 ? a201.memoizedState : null;
    if ("hidden" === d.mode || "unstable-defer-without-hiding" === d.mode) {
        if (0 === (b.mode & 4)) b.memoizedState = {
            baseLanes: 0
        }, ni(b, c);
        else if (0 !== (c & 1073741824)) b.memoizedState = {
            baseLanes: 0
        }, ni(b, null !== f ? f.baseLanes : c);
        else return a201 = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = {
            baseLanes: a201
        }, ni(b, a201), null;
    } else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, ni(b, d);
    fi(a201, b, e, c);
    return b.child;
}
function oi(a202, b) {
    var c = b.ref;
    if (null === a202 && null !== c || null !== a202 && a202.ref !== c) b.flags |= 128;
}
function li(a203, b, c, d, e) {
    var f = Ff(c) ? Df : M.current;
    f = Ef(b, f);
    tg(b, e);
    c = Ch(a203, b, c, d, f, e);
    if (null !== a203 && !ug) return b.updateQueue = a203.updateQueue, b.flags &= -517, a203.lanes &= ~e, hi(a203, b, e);
    b.flags |= 1;
    fi(a203, b, c, e);
    return b.child;
}
function pi(a204, b, c, d, e) {
    if (Ff(c)) {
        var f = !0;
        Jf(b);
    } else f = !1;
    tg(b, e);
    if (null === b.stateNode) null !== a204 && (a204.alternate = null, b.alternate = null, b.flags |= 2), Mg(b, c, d), Og(b, c, d, e), d = !0;
    else if (null === a204) {
        var g = b.stateNode, h = b.memoizedProps;
        g.props = h;
        var k = g.context, l = c.contextType;
        "object" === typeof l && null !== l ? l = vg(l) : (l = Ff(c) ? Df : M.current, l = Ef(b, l));
        var n = c.getDerivedStateFromProps, A = "function" === typeof n || "function" === typeof g.getSnapshotBeforeUpdate;
        A || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Ng(b, g, d, l);
        wg = !1;
        var p = b.memoizedState;
        g.state = p;
        Cg(b, d, g, e);
        k = b.memoizedState;
        h !== d || p !== k || N.current || wg ? ("function" === typeof n && (Gg(b, c, n, d), k = b.memoizedState), (h = wg || Lg(b, c, h, d, p, k, l)) ? (A || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4)) : ("function" === typeof g.componentDidMount && (b.flags |= 4), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4), d = !1);
    } else {
        g = b.stateNode;
        yg(a204, b);
        h = b.memoizedProps;
        l = b.type === b.elementType ? h : lg(b.type, h);
        g.props = l;
        A = b.pendingProps;
        p = g.context;
        k = c.contextType;
        "object" === typeof k && null !== k ? k = vg(k) : (k = Ff(c) ? Df : M.current, k = Ef(b, k));
        var C = c.getDerivedStateFromProps;
        (n = "function" === typeof C || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== A || p !== k) && Ng(b, g, d, k);
        wg = !1;
        p = b.memoizedState;
        g.state = p;
        Cg(b, d, g, e);
        var x = b.memoizedState;
        h !== A || p !== x || N.current || wg ? ("function" === typeof C && (Gg(b, c, C, d), x = b.memoizedState), (l = wg || Lg(b, c, l, d, p, x, k)) ? (n || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, x, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, x, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 256)) : ("function" !== typeof g.componentDidUpdate || h === a204.memoizedProps && p === a204.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a204.memoizedProps && p === a204.memoizedState || (b.flags |= 256), b.memoizedProps = d, b.memoizedState = x), g.props = d, g.state = x, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a204.memoizedProps && p === a204.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a204.memoizedProps && p === a204.memoizedState || (b.flags |= 256), d = !1);
    }
    return qi(a204, b, c, d, f, e);
}
function qi(a205, b, c, d, e, f) {
    oi(a205, b);
    var g = 0 !== (b.flags & 64);
    if (!d && !g) return e && Kf(b, c, !1), hi(a205, b, f);
    d = b.stateNode;
    ei.current = b;
    var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
    b.flags |= 1;
    null !== a205 && g ? (b.child = Yg(b, a205.child, null, f), b.child = Yg(b, null, h, f)) : fi(a205, b, h, f);
    b.memoizedState = d.state;
    e && Kf(b, c, !0);
    return b.child;
}
function ri(a206) {
    var b = a206.stateNode;
    b.pendingContext ? Hf(a206, b.pendingContext, b.pendingContext !== b.context) : b.context && Hf(a206, b.context, !1);
    eh(a206, b.containerInfo);
}
var si = {
    dehydrated: null,
    retryLane: 0
};
function ti(a207, b, c) {
    var d = b.pendingProps, e = P.current, f = !1, g;
    (g = 0 !== (b.flags & 64)) || (g = null !== a207 && null === a207.memoizedState ? !1 : 0 !== (e & 2));
    g ? (f = !0, b.flags &= -65) : null !== a207 && null === a207.memoizedState || void 0 === d.fallback || !0 === d.unstable_avoidThisFallback || (e |= 1);
    I(P, e & 1);
    if (null === a207) {
        void 0 !== d.fallback && ph(b);
        a207 = d.children;
        e = d.fallback;
        if (f) return a207 = ui(b, a207, e, c), b.child.memoizedState = {
            baseLanes: c
        }, b.memoizedState = si, a207;
        if ("number" === typeof d.unstable_expectedLoadTime) return a207 = ui(b, a207, e, c), b.child.memoizedState = {
            baseLanes: c
        }, b.memoizedState = si, b.lanes = 33554432, a207;
        c = vi({
            mode: "visible",
            children: a207
        }, b.mode, c, null);
        c.return = b;
        return b.child = c;
    }
    if (null !== a207.memoizedState) {
        if (f) return d = wi(a207, b, d.children, d.fallback, c), f = b.child, e = a207.child.memoizedState, f.memoizedState = null === e ? {
            baseLanes: c
        } : {
            baseLanes: e.baseLanes | c
        }, f.childLanes = a207.childLanes & ~c, b.memoizedState = si, d;
        c = xi(a207, b, d.children, c);
        b.memoizedState = null;
        return c;
    }
    if (f) return d = wi(a207, b, d.children, d.fallback, c), f = b.child, e = a207.child.memoizedState, f.memoizedState = null === e ? {
        baseLanes: c
    } : {
        baseLanes: e.baseLanes | c
    }, f.childLanes = a207.childLanes & ~c, b.memoizedState = si, d;
    c = xi(a207, b, d.children, c);
    b.memoizedState = null;
    return c;
}
function ui(a208, b, c, d) {
    var e = a208.mode, f = a208.child;
    b = {
        mode: "hidden",
        children: b
    };
    0 === (e & 2) && null !== f ? (f.childLanes = 0, f.pendingProps = b) : f = vi(b, e, 0, null);
    c = Xg(c, e, d, null);
    f.return = a208;
    c.return = a208;
    f.sibling = c;
    a208.child = f;
    return c;
}
function xi(a209, b, c, d) {
    var e = a209.child;
    a209 = e.sibling;
    c = Tg(e, {
        mode: "visible",
        children: c
    });
    0 === (b.mode & 2) && (c.lanes = d);
    c.return = b;
    c.sibling = null;
    null !== a209 && (a209.nextEffect = null, a209.flags = 8, b.firstEffect = b.lastEffect = a209);
    return b.child = c;
}
function wi(a210, b, c, d, e) {
    var f = b.mode, g = a210.child;
    a210 = g.sibling;
    var h = {
        mode: "hidden",
        children: c
    };
    0 === (f & 2) && b.child !== g ? (c = b.child, c.childLanes = 0, c.pendingProps = h, g = c.lastEffect, null !== g ? (b.firstEffect = c.firstEffect, b.lastEffect = g, g.nextEffect = null) : b.firstEffect = b.lastEffect = null) : c = Tg(g, h);
    null !== a210 ? d = Tg(a210, d) : (d = Xg(d, f, e, null), d.flags |= 2);
    d.return = b;
    c.return = b;
    c.sibling = d;
    b.child = c;
    return d;
}
function yi(a211, b) {
    a211.lanes |= b;
    var c = a211.alternate;
    null !== c && (c.lanes |= b);
    sg(a211.return, b);
}
function zi(a212, b, c, d, e, f) {
    var g = a212.memoizedState;
    null === g ? a212.memoizedState = {
        isBackwards: b,
        rendering: null,
        renderingStartTime: 0,
        last: d,
        tail: c,
        tailMode: e,
        lastEffect: f
    } : (g.isBackwards = b, g.rendering = null, g.renderingStartTime = 0, g.last = d, g.tail = c, g.tailMode = e, g.lastEffect = f);
}
function Ai(a213, b, c) {
    var d = b.pendingProps, e = d.revealOrder, f = d.tail;
    fi(a213, b, d.children, c);
    d = P.current;
    if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 64;
    else {
        if (null !== a213 && 0 !== (a213.flags & 64)) a: for(a213 = b.child; null !== a213;){
            if (13 === a213.tag) null !== a213.memoizedState && yi(a213, c);
            else if (19 === a213.tag) yi(a213, c);
            else if (null !== a213.child) {
                a213.child.return = a213;
                a213 = a213.child;
                continue;
            }
            if (a213 === b) break a;
            for(; null === a213.sibling;){
                if (null === a213.return || a213.return === b) break a;
                a213 = a213.return;
            }
            a213.sibling.return = a213.return;
            a213 = a213.sibling;
        }
        d &= 1;
    }
    I(P, d);
    if (0 === (b.mode & 2)) b.memoizedState = null;
    else switch(e){
        case "forwards":
            c = b.child;
            for(e = null; null !== c;)a213 = c.alternate, null !== a213 && null === ih(a213) && (e = c), c = c.sibling;
            c = e;
            null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
            zi(b, !1, e, c, f, b.lastEffect);
            break;
        case "backwards":
            c = null;
            e = b.child;
            for(b.child = null; null !== e;){
                a213 = e.alternate;
                if (null !== a213 && null === ih(a213)) {
                    b.child = e;
                    break;
                }
                a213 = e.sibling;
                e.sibling = c;
                c = e;
                e = a213;
            }
            zi(b, !0, c, null, f, b.lastEffect);
            break;
        case "together":
            zi(b, !1, null, null, void 0, b.lastEffect);
            break;
        default:
            b.memoizedState = null;
    }
    return b.child;
}
function hi(a214, b, c) {
    null !== a214 && (b.dependencies = a214.dependencies);
    Dg |= b.lanes;
    if (0 !== (c & b.childLanes)) {
        if (null !== a214 && b.child !== a214.child) throw Error(y(153));
        if (null !== b.child) {
            a214 = b.child;
            c = Tg(a214, a214.pendingProps);
            b.child = c;
            for(c.return = b; null !== a214.sibling;)a214 = a214.sibling, c = c.sibling = Tg(a214, a214.pendingProps), c.return = b;
            c.sibling = null;
        }
        return b.child;
    }
    return null;
}
var Bi, Ci, Di, Ei;
Bi = function(a215, b) {
    for(var c = b.child; null !== c;){
        if (5 === c.tag || 6 === c.tag) a215.appendChild(c.stateNode);
        else if (4 !== c.tag && null !== c.child) {
            c.child.return = c;
            c = c.child;
            continue;
        }
        if (c === b) break;
        for(; null === c.sibling;){
            if (null === c.return || c.return === b) return;
            c = c.return;
        }
        c.sibling.return = c.return;
        c = c.sibling;
    }
};
Ci = function() {
};
Di = function(a216, b, c, d) {
    var e = a216.memoizedProps;
    if (e !== d) {
        a216 = b.stateNode;
        dh(ah.current);
        var f = null;
        switch(c){
            case "input":
                e = Ya(a216, e);
                d = Ya(a216, d);
                f = [];
                break;
            case "option":
                e = eb(a216, e);
                d = eb(a216, d);
                f = [];
                break;
            case "select":
                e = m({
                }, e, {
                    value: void 0
                });
                d = m({
                }, d, {
                    value: void 0
                });
                f = [];
                break;
            case "textarea":
                e = gb(a216, e);
                d = gb(a216, d);
                f = [];
                break;
            default:
                "function" !== typeof e.onClick && "function" === typeof d.onClick && (a216.onclick = jf);
        }
        vb(c, d);
        var g;
        c = null;
        for(l in e)if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) {
            if ("style" === l) {
                var h = e[l];
                for(g in h)h.hasOwnProperty(g) && (c || (c = {
                }), c[g] = "");
            } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ca.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
        }
        for(l in d){
            var k = d[l];
            h = null != e ? e[l] : void 0;
            if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) {
                if ("style" === l) {
                    if (h) {
                        for(g in h)!h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {
                        }), c[g] = "");
                        for(g in k)k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {
                        }), c[g] = k[g]);
                    } else c || (f || (f = []), f.push(l, c)), c = k;
                } else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ca.hasOwnProperty(l) ? (null != k && "onScroll" === l && G("scroll", a216), f || h === k || (f = [])) : "object" === typeof k && null !== k && k.$$typeof === Ga ? k.toString() : (f = f || []).push(l, k));
            }
        }
        c && (f = f || []).push("style", c);
        var l = f;
        if (b.updateQueue = l) b.flags |= 4;
    }
};
Ei = function(a, b, c, d) {
    c !== d && (b.flags |= 4);
};
function Fi(a217, b) {
    if (!lh) switch(a217.tailMode){
        case "hidden":
            b = a217.tail;
            for(var c = null; null !== b;)null !== b.alternate && (c = b), b = b.sibling;
            null === c ? a217.tail = null : c.sibling = null;
            break;
        case "collapsed":
            c = a217.tail;
            for(var d = null; null !== c;)null !== c.alternate && (d = c), c = c.sibling;
            null === d ? b || null === a217.tail ? a217.tail = null : a217.tail.sibling = null : d.sibling = null;
    }
}
function Gi(a218, b, c) {
    var d = b.pendingProps;
    switch(b.tag){
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return null;
        case 1:
            return Ff(b.type) && Gf(), null;
        case 3:
            fh();
            H(N);
            H(M);
            uh();
            d = b.stateNode;
            d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
            if (null === a218 || null === a218.child) rh(b) ? b.flags |= 4 : d.hydrate || (b.flags |= 256);
            Ci(b);
            return null;
        case 5:
            hh(b);
            var e = dh(ch.current);
            c = b.type;
            if (null !== a218 && null != b.stateNode) Di(a218, b, c, d, e), a218.ref !== b.ref && (b.flags |= 128);
            else {
                if (!d) {
                    if (null === b.stateNode) throw Error(y(166));
                    return null;
                }
                a218 = dh(ah.current);
                if (rh(b)) {
                    d = b.stateNode;
                    c = b.type;
                    var f = b.memoizedProps;
                    d[wf] = b;
                    d[xf] = f;
                    switch(c){
                        case "dialog":
                            G("cancel", d);
                            G("close", d);
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            G("load", d);
                            break;
                        case "video":
                        case "audio":
                            for(a218 = 0; a218 < Xe.length; a218++)G(Xe[a218], d);
                            break;
                        case "source":
                            G("error", d);
                            break;
                        case "img":
                        case "image":
                        case "link":
                            G("error", d);
                            G("load", d);
                            break;
                        case "details":
                            G("toggle", d);
                            break;
                        case "input":
                            Za(d, f);
                            G("invalid", d);
                            break;
                        case "select":
                            d._wrapperState = {
                                wasMultiple: !!f.multiple
                            };
                            G("invalid", d);
                            break;
                        case "textarea":
                            hb(d, f), G("invalid", d);
                    }
                    vb(c, f);
                    a218 = null;
                    for(var g in f)f.hasOwnProperty(g) && (e = f[g], "children" === g ? "string" === typeof e ? d.textContent !== e && (a218 = [
                        "children",
                        e
                    ]) : "number" === typeof e && d.textContent !== "" + e && (a218 = [
                        "children",
                        "" + e
                    ]) : ca.hasOwnProperty(g) && null != e && "onScroll" === g && G("scroll", d));
                    switch(c){
                        case "input":
                            Va(d);
                            cb(d, f, !0);
                            break;
                        case "textarea":
                            Va(d);
                            jb(d);
                            break;
                        case "select":
                        case "option":
                            break;
                        default:
                            "function" === typeof f.onClick && (d.onclick = jf);
                    }
                    d = a218;
                    b.updateQueue = d;
                    null !== d && (b.flags |= 4);
                } else {
                    g = 9 === e.nodeType ? e : e.ownerDocument;
                    a218 === kb.html && (a218 = lb(c));
                    a218 === kb.html ? "script" === c ? (a218 = g.createElement("div"), a218.innerHTML = "<script>\x3c/script>", a218 = a218.removeChild(a218.firstChild)) : "string" === typeof d.is ? a218 = g.createElement(c, {
                        is: d.is
                    }) : (a218 = g.createElement(c), "select" === c && (g = a218, d.multiple ? g.multiple = !0 : d.size && (g.size = d.size))) : a218 = g.createElementNS(a218, c);
                    a218[wf] = b;
                    a218[xf] = d;
                    Bi(a218, b, !1, !1);
                    b.stateNode = a218;
                    g = wb(c, d);
                    switch(c){
                        case "dialog":
                            G("cancel", a218);
                            G("close", a218);
                            e = d;
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            G("load", a218);
                            e = d;
                            break;
                        case "video":
                        case "audio":
                            for(e = 0; e < Xe.length; e++)G(Xe[e], a218);
                            e = d;
                            break;
                        case "source":
                            G("error", a218);
                            e = d;
                            break;
                        case "img":
                        case "image":
                        case "link":
                            G("error", a218);
                            G("load", a218);
                            e = d;
                            break;
                        case "details":
                            G("toggle", a218);
                            e = d;
                            break;
                        case "input":
                            Za(a218, d);
                            e = Ya(a218, d);
                            G("invalid", a218);
                            break;
                        case "option":
                            e = eb(a218, d);
                            break;
                        case "select":
                            a218._wrapperState = {
                                wasMultiple: !!d.multiple
                            };
                            e = m({
                            }, d, {
                                value: void 0
                            });
                            G("invalid", a218);
                            break;
                        case "textarea":
                            hb(a218, d);
                            e = gb(a218, d);
                            G("invalid", a218);
                            break;
                        default:
                            e = d;
                    }
                    vb(c, e);
                    var h = e;
                    for(f in h)if (h.hasOwnProperty(f)) {
                        var k = h[f];
                        "style" === f ? tb(a218, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && ob(a218, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && pb(a218, k) : "number" === typeof k && pb(a218, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ca.hasOwnProperty(f) ? null != k && "onScroll" === f && G("scroll", a218) : null != k && qa(a218, f, k, g));
                    }
                    switch(c){
                        case "input":
                            Va(a218);
                            cb(a218, d, !1);
                            break;
                        case "textarea":
                            Va(a218);
                            jb(a218);
                            break;
                        case "option":
                            null != d.value && a218.setAttribute("value", "" + Sa(d.value));
                            break;
                        case "select":
                            a218.multiple = !!d.multiple;
                            f = d.value;
                            null != f ? fb(a218, !!d.multiple, f, !1) : null != d.defaultValue && fb(a218, !!d.multiple, d.defaultValue, !0);
                            break;
                        default:
                            "function" === typeof e.onClick && (a218.onclick = jf);
                    }
                    mf(c, d) && (b.flags |= 4);
                }
                null !== b.ref && (b.flags |= 128);
            }
            return null;
        case 6:
            if (a218 && null != b.stateNode) Ei(a218, b, a218.memoizedProps, d);
            else {
                if ("string" !== typeof d && null === b.stateNode) throw Error(y(166));
                c = dh(ch.current);
                dh(ah.current);
                rh(b) ? (d = b.stateNode, c = b.memoizedProps, d[wf] = b, d.nodeValue !== c && (b.flags |= 4)) : (d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[wf] = b, b.stateNode = d);
            }
            return null;
        case 13:
            H(P);
            d = b.memoizedState;
            if (0 !== (b.flags & 64)) return b.lanes = c, b;
            d = null !== d;
            c = !1;
            null === a218 ? void 0 !== b.memoizedProps.fallback && rh(b) : c = null !== a218.memoizedState;
            if (d && !c && 0 !== (b.mode & 2)) {
                if (null === a218 && !0 !== b.memoizedProps.unstable_avoidThisFallback || 0 !== (P.current & 1)) 0 === V && (V = 3);
                else {
                    if (0 === V || 3 === V) V = 4;
                    null === U || 0 === (Dg & 134217727) && 0 === (Hi & 134217727) || Ii(U, W);
                }
            }
            if (d || c) b.flags |= 4;
            return null;
        case 4:
            return fh(), Ci(b), null === a218 && cf(b.stateNode.containerInfo), null;
        case 10:
            return rg(b), null;
        case 17:
            return Ff(b.type) && Gf(), null;
        case 19:
            H(P);
            d = b.memoizedState;
            if (null === d) return null;
            f = 0 !== (b.flags & 64);
            g = d.rendering;
            if (null === g) {
                if (f) Fi(d, !1);
                else {
                    if (0 !== V || null !== a218 && 0 !== (a218.flags & 64)) for(a218 = b.child; null !== a218;){
                        g = ih(a218);
                        if (null !== g) {
                            b.flags |= 64;
                            Fi(d, !1);
                            f = g.updateQueue;
                            null !== f && (b.updateQueue = f, b.flags |= 4);
                            null === d.lastEffect && (b.firstEffect = null);
                            b.lastEffect = d.lastEffect;
                            d = c;
                            for(c = b.child; null !== c;)f = c, a218 = d, f.flags &= 2, f.nextEffect = null, f.firstEffect = null, f.lastEffect = null, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a218, f.child = null, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a218 = g.dependencies, f.dependencies = null === a218 ? null : {
                                lanes: a218.lanes,
                                firstContext: a218.firstContext
                            }), c = c.sibling;
                            I(P, P.current & 1 | 2);
                            return b.child;
                        }
                        a218 = a218.sibling;
                    }
                    null !== d.tail && O() > Ji && (b.flags |= 64, f = !0, Fi(d, !1), b.lanes = 33554432);
                }
            } else {
                if (!f) {
                    if (a218 = ih(g), null !== a218) {
                        if (b.flags |= 64, f = !0, c = a218.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Fi(d, !0), null === d.tail && "hidden" === d.tailMode && !g.alternate && !lh) return b = b.lastEffect = d.lastEffect, null !== b && (b.nextEffect = null), null;
                    } else 2 * O() - d.renderingStartTime > Ji && 1073741824 !== c && (b.flags |= 64, f = !0, Fi(d, !1), b.lanes = 33554432);
                }
                d.isBackwards ? (g.sibling = b.child, b.child = g) : (c = d.last, null !== c ? c.sibling = g : b.child = g, d.last = g);
            }
            return null !== d.tail ? (c = d.tail, d.rendering = c, d.tail = c.sibling, d.lastEffect = b.lastEffect, d.renderingStartTime = O(), c.sibling = null, b = P.current, I(P, f ? b & 1 | 2 : b & 1), c) : null;
        case 23:
        case 24:
            return Ki(), null !== a218 && null !== a218.memoizedState !== (null !== b.memoizedState) && "unstable-defer-without-hiding" !== d.mode && (b.flags |= 4), null;
    }
    throw Error(y(156, b.tag));
}
function Li(a219) {
    switch(a219.tag){
        case 1:
            Ff(a219.type) && Gf();
            var b = a219.flags;
            return b & 4096 ? (a219.flags = b & -4097 | 64, a219) : null;
        case 3:
            fh();
            H(N);
            H(M);
            uh();
            b = a219.flags;
            if (0 !== (b & 64)) throw Error(y(285));
            a219.flags = b & -4097 | 64;
            return a219;
        case 5:
            return hh(a219), null;
        case 13:
            return H(P), b = a219.flags, b & 4096 ? (a219.flags = b & -4097 | 64, a219) : null;
        case 19:
            return H(P), null;
        case 4:
            return fh(), null;
        case 10:
            return rg(a219), null;
        case 23:
        case 24:
            return Ki(), null;
        default:
            return null;
    }
}
function Mi(a220, b) {
    try {
        var c = "", d = b;
        do c += Qa(d), d = d.return;
        while (d)
        var e = c;
    } catch (f) {
        e = "\nError generating stack: " + f.message + "\n" + f.stack;
    }
    return {
        value: a220,
        source: b,
        stack: e
    };
}
function Ni(a, b) {
    try {
        console.error(b.value);
    } catch (c) {
        setTimeout(function() {
            throw c;
        });
    }
}
var Oi = "function" === typeof WeakMap ? WeakMap : Map;
function Pi(a221, b, c) {
    c = zg(-1, c);
    c.tag = 3;
    c.payload = {
        element: null
    };
    var d = b.value;
    c.callback = function() {
        Qi || (Qi = !0, Ri = d);
        Ni(a221, b);
    };
    return c;
}
function Si(a222, b, c4) {
    c4 = zg(-1, c4);
    c4.tag = 3;
    var d = a222.type.getDerivedStateFromError;
    if ("function" === typeof d) {
        var e = b.value;
        c4.payload = function() {
            Ni(a222, b);
            return d(e);
        };
    }
    var f = a222.stateNode;
    null !== f && "function" === typeof f.componentDidCatch && (c4.callback = function() {
        "function" !== typeof d && (null === Ti ? Ti = new Set([
            this
        ]) : Ti.add(this), Ni(a222, b));
        var c = b.stack;
        this.componentDidCatch(b.value, {
            componentStack: null !== c ? c : ""
        });
    });
    return c4;
}
var Ui = "function" === typeof WeakSet ? WeakSet : Set;
function Vi(a223) {
    var b = a223.ref;
    if (null !== b) {
        if ("function" === typeof b) try {
            b(null);
        } catch (c) {
            Wi(a223, c);
        }
        else b.current = null;
    }
}
function Xi(a224, b) {
    switch(b.tag){
        case 0:
        case 11:
        case 15:
        case 22:
            return;
        case 1:
            if (b.flags & 256 && null !== a224) {
                var c = a224.memoizedProps, d = a224.memoizedState;
                a224 = b.stateNode;
                b = a224.getSnapshotBeforeUpdate(b.elementType === b.type ? c : lg(b.type, c), d);
                a224.__reactInternalSnapshotBeforeUpdate = b;
            }
            return;
        case 3:
            b.flags & 256 && qf(b.stateNode.containerInfo);
            return;
        case 5:
        case 6:
        case 4:
        case 17:
            return;
    }
    throw Error(y(163));
}
function Yi(a225, b, c) {
    switch(c.tag){
        case 0:
        case 11:
        case 15:
        case 22:
            b = c.updateQueue;
            b = null !== b ? b.lastEffect : null;
            if (null !== b) {
                a225 = b = b.next;
                do {
                    if (3 === (a225.tag & 3)) {
                        var d = a225.create;
                        a225.destroy = d();
                    }
                    a225 = a225.next;
                }while (a225 !== b)
            }
            b = c.updateQueue;
            b = null !== b ? b.lastEffect : null;
            if (null !== b) {
                a225 = b = b.next;
                do {
                    var e = a225;
                    d = e.next;
                    e = e.tag;
                    0 !== (e & 4) && 0 !== (e & 1) && (Zi(c, a225), $i(c, a225));
                    a225 = d;
                }while (a225 !== b)
            }
            return;
        case 1:
            a225 = c.stateNode;
            c.flags & 4 && (null === b ? a225.componentDidMount() : (d = c.elementType === c.type ? b.memoizedProps : lg(c.type, b.memoizedProps), a225.componentDidUpdate(d, b.memoizedState, a225.__reactInternalSnapshotBeforeUpdate)));
            b = c.updateQueue;
            null !== b && Eg(c, b, a225);
            return;
        case 3:
            b = c.updateQueue;
            if (null !== b) {
                a225 = null;
                if (null !== c.child) switch(c.child.tag){
                    case 5:
                        a225 = c.child.stateNode;
                        break;
                    case 1:
                        a225 = c.child.stateNode;
                }
                Eg(c, b, a225);
            }
            return;
        case 5:
            a225 = c.stateNode;
            null === b && c.flags & 4 && mf(c.type, c.memoizedProps) && a225.focus();
            return;
        case 6:
            return;
        case 4:
            return;
        case 12:
            return;
        case 13:
            null === c.memoizedState && (c = c.alternate, null !== c && (c = c.memoizedState, null !== c && (c = c.dehydrated, null !== c && Cc(c))));
            return;
        case 19:
        case 17:
        case 20:
        case 21:
        case 23:
        case 24:
            return;
    }
    throw Error(y(163));
}
function aj(a226, b) {
    for(var c = a226;;){
        if (5 === c.tag) {
            var d = c.stateNode;
            if (b) d = d.style, "function" === typeof d.setProperty ? d.setProperty("display", "none", "important") : d.display = "none";
            else {
                d = c.stateNode;
                var e = c.memoizedProps.style;
                e = void 0 !== e && null !== e && e.hasOwnProperty("display") ? e.display : null;
                d.style.display = sb("display", e);
            }
        } else if (6 === c.tag) c.stateNode.nodeValue = b ? "" : c.memoizedProps;
        else if ((23 !== c.tag && 24 !== c.tag || null === c.memoizedState || c === a226) && null !== c.child) {
            c.child.return = c;
            c = c.child;
            continue;
        }
        if (c === a226) break;
        for(; null === c.sibling;){
            if (null === c.return || c.return === a226) return;
            c = c.return;
        }
        c.sibling.return = c.return;
        c = c.sibling;
    }
}
function bj(a227, b) {
    if (Mf && "function" === typeof Mf.onCommitFiberUnmount) try {
        Mf.onCommitFiberUnmount(Lf, b);
    } catch (f) {
    }
    switch(b.tag){
        case 0:
        case 11:
        case 14:
        case 15:
        case 22:
            a227 = b.updateQueue;
            if (null !== a227 && (a227 = a227.lastEffect, null !== a227)) {
                var c = a227 = a227.next;
                do {
                    var d = c, e = d.destroy;
                    d = d.tag;
                    if (void 0 !== e) {
                        if (0 !== (d & 4)) Zi(b, c);
                        else {
                            d = b;
                            try {
                                e();
                            } catch (f) {
                                Wi(d, f);
                            }
                        }
                    }
                    c = c.next;
                }while (c !== a227)
            }
            break;
        case 1:
            Vi(b);
            a227 = b.stateNode;
            if ("function" === typeof a227.componentWillUnmount) try {
                a227.props = b.memoizedProps, a227.state = b.memoizedState, a227.componentWillUnmount();
            } catch (f2) {
                Wi(b, f2);
            }
            break;
        case 5:
            Vi(b);
            break;
        case 4:
            cj(a227, b);
    }
}
function dj(a228) {
    a228.alternate = null;
    a228.child = null;
    a228.dependencies = null;
    a228.firstEffect = null;
    a228.lastEffect = null;
    a228.memoizedProps = null;
    a228.memoizedState = null;
    a228.pendingProps = null;
    a228.return = null;
    a228.updateQueue = null;
}
function ej(a229) {
    return 5 === a229.tag || 3 === a229.tag || 4 === a229.tag;
}
function fj(a230) {
    a: {
        for(var b = a230.return; null !== b;){
            if (ej(b)) break a;
            b = b.return;
        }
        throw Error(y(160));
    }
    var c = b;
    b = c.stateNode;
    switch(c.tag){
        case 5:
            var d = !1;
            break;
        case 3:
            b = b.containerInfo;
            d = !0;
            break;
        case 4:
            b = b.containerInfo;
            d = !0;
            break;
        default:
            throw Error(y(161));
    }
    c.flags & 16 && (pb(b, ""), c.flags &= -17);
    a: b: for(c = a230;;){
        for(; null === c.sibling;){
            if (null === c.return || ej(c.return)) {
                c = null;
                break a;
            }
            c = c.return;
        }
        c.sibling.return = c.return;
        for(c = c.sibling; 5 !== c.tag && 6 !== c.tag && 18 !== c.tag;){
            if (c.flags & 2) continue b;
            if (null === c.child || 4 === c.tag) continue b;
            else c.child.return = c, c = c.child;
        }
        if (!(c.flags & 2)) {
            c = c.stateNode;
            break a;
        }
    }
    d ? gj(a230, c, b) : hj(a230, c, b);
}
function gj(a231, b, c) {
    var d = a231.tag, e = 5 === d || 6 === d;
    if (e) a231 = e ? a231.stateNode : a231.stateNode.instance, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a231, b) : c.insertBefore(a231, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a231, c)) : (b = c, b.appendChild(a231)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = jf));
    else if (4 !== d && (a231 = a231.child, null !== a231)) for(gj(a231, b, c), a231 = a231.sibling; null !== a231;)gj(a231, b, c), a231 = a231.sibling;
}
function hj(a232, b, c) {
    var d = a232.tag, e = 5 === d || 6 === d;
    if (e) a232 = e ? a232.stateNode : a232.stateNode.instance, b ? c.insertBefore(a232, b) : c.appendChild(a232);
    else if (4 !== d && (a232 = a232.child, null !== a232)) for(hj(a232, b, c), a232 = a232.sibling; null !== a232;)hj(a232, b, c), a232 = a232.sibling;
}
function cj(a233, b) {
    for(var c = b, d = !1, e, f;;){
        if (!d) {
            d = c.return;
            a: for(;;){
                if (null === d) throw Error(y(160));
                e = d.stateNode;
                switch(d.tag){
                    case 5:
                        f = !1;
                        break a;
                    case 3:
                        e = e.containerInfo;
                        f = !0;
                        break a;
                    case 4:
                        e = e.containerInfo;
                        f = !0;
                        break a;
                }
                d = d.return;
            }
            d = !0;
        }
        if (5 === c.tag || 6 === c.tag) {
            a: for(var g = a233, h = c, k = h;;)if (bj(g, k), null !== k.child && 4 !== k.tag) k.child.return = k, k = k.child;
            else {
                if (k === h) break a;
                for(; null === k.sibling;){
                    if (null === k.return || k.return === h) break a;
                    k = k.return;
                }
                k.sibling.return = k.return;
                k = k.sibling;
            }
            f ? (g = e, h = c.stateNode, 8 === g.nodeType ? g.parentNode.removeChild(h) : g.removeChild(h)) : e.removeChild(c.stateNode);
        } else if (4 === c.tag) {
            if (null !== c.child) {
                e = c.stateNode.containerInfo;
                f = !0;
                c.child.return = c;
                c = c.child;
                continue;
            }
        } else if (bj(a233, c), null !== c.child) {
            c.child.return = c;
            c = c.child;
            continue;
        }
        if (c === b) break;
        for(; null === c.sibling;){
            if (null === c.return || c.return === b) return;
            c = c.return;
            4 === c.tag && (d = !1);
        }
        c.sibling.return = c.return;
        c = c.sibling;
    }
}
function ij(a234, b) {
    switch(b.tag){
        case 0:
        case 11:
        case 14:
        case 15:
        case 22:
            var c = b.updateQueue;
            c = null !== c ? c.lastEffect : null;
            if (null !== c) {
                var d = c = c.next;
                do 3 === (d.tag & 3) && (a234 = d.destroy, d.destroy = void 0, void 0 !== a234 && a234()), d = d.next;
                while (d !== c)
            }
            return;
        case 1:
            return;
        case 5:
            c = b.stateNode;
            if (null != c) {
                d = b.memoizedProps;
                var e = null !== a234 ? a234.memoizedProps : d;
                a234 = b.type;
                var f = b.updateQueue;
                b.updateQueue = null;
                if (null !== f) {
                    c[xf] = d;
                    "input" === a234 && "radio" === d.type && null != d.name && $a(c, d);
                    wb(a234, e);
                    b = wb(a234, d);
                    for(e = 0; e < f.length; e += 2){
                        var g = f[e], h = f[e + 1];
                        "style" === g ? tb(c, h) : "dangerouslySetInnerHTML" === g ? ob(c, h) : "children" === g ? pb(c, h) : qa(c, g, h, b);
                    }
                    switch(a234){
                        case "input":
                            ab(c, d);
                            break;
                        case "textarea":
                            ib(c, d);
                            break;
                        case "select":
                            a234 = c._wrapperState.wasMultiple, c._wrapperState.wasMultiple = !!d.multiple, f = d.value, null != f ? fb(c, !!d.multiple, f, !1) : a234 !== !!d.multiple && (null != d.defaultValue ? fb(c, !!d.multiple, d.defaultValue, !0) : fb(c, !!d.multiple, d.multiple ? [] : "", !1));
                    }
                }
            }
            return;
        case 6:
            if (null === b.stateNode) throw Error(y(162));
            b.stateNode.nodeValue = b.memoizedProps;
            return;
        case 3:
            c = b.stateNode;
            c.hydrate && (c.hydrate = !1, Cc(c.containerInfo));
            return;
        case 12:
            return;
        case 13:
            null !== b.memoizedState && (jj = O(), aj(b.child, !0));
            kj(b);
            return;
        case 19:
            kj(b);
            return;
        case 17:
            return;
        case 23:
        case 24:
            aj(b, null !== b.memoizedState);
            return;
    }
    throw Error(y(163));
}
function kj(a235) {
    var b8 = a235.updateQueue;
    if (null !== b8) {
        a235.updateQueue = null;
        var c = a235.stateNode;
        null === c && (c = a235.stateNode = new Ui);
        b8.forEach(function(b) {
            var d = lj.bind(null, a235, b);
            c.has(b) || (c.add(b), b.then(d, d));
        });
    }
}
function mj(a236, b) {
    return null !== a236 && (a236 = a236.memoizedState, null === a236 || null !== a236.dehydrated) ? (b = b.memoizedState, null !== b && null === b.dehydrated) : !1;
}
var nj = Math.ceil, oj = ra.ReactCurrentDispatcher, pj = ra.ReactCurrentOwner, X = 0, U = null, Y = null, W = 0, qj = 0, rj = Bf(0), V = 0, sj = null, tj = 0, Dg = 0, Hi = 0, uj = 0, vj = null, jj = 0, Ji = Infinity;
function wj() {
    Ji = O() + 500;
}
var Z = null, Qi = !1, Ri = null, Ti = null, xj = !1, yj = null, zj = 90, Aj = [], Bj = [], Cj = null, Dj = 0, Ej = null, Fj = -1, Gj = 0, Hj = 0, Ij = null, Jj = !1;
function Hg() {
    return 0 !== (X & 48) ? O() : -1 !== Fj ? Fj : Fj = O();
}
function Ig(a237) {
    a237 = a237.mode;
    if (0 === (a237 & 2)) return 1;
    if (0 === (a237 & 4)) return 99 === eg() ? 1 : 2;
    0 === Gj && (Gj = tj);
    if (0 !== kg.transition) {
        0 !== Hj && (Hj = null !== vj ? vj.pendingLanes : 0);
        a237 = Gj;
        var b = 4186112 & ~Hj;
        b &= -b;
        0 === b && (a237 = 4186112 & ~a237, b = a237 & -a237, 0 === b && (b = 8192));
        return b;
    }
    a237 = eg();
    0 !== (X & 4) && 98 === a237 ? a237 = Xc(12, Gj) : (a237 = Sc(a237), a237 = Xc(a237, Gj));
    return a237;
}
function Jg(a238, b, c) {
    if (50 < Dj) throw Dj = 0, Ej = null, Error(y(185));
    a238 = Kj(a238, b);
    if (null === a238) return null;
    $c(a238, b, c);
    a238 === U && (Hi |= b, 4 === V && Ii(a238, W));
    var d = eg();
    1 === b ? 0 !== (X & 8) && 0 === (X & 48) ? Lj(a238) : (Mj(a238, c), 0 === X && (wj(), ig())) : (0 === (X & 4) || 98 !== d && 99 !== d || (null === Cj ? Cj = new Set([
        a238
    ]) : Cj.add(a238)), Mj(a238, c));
    vj = a238;
}
function Kj(a239, b) {
    a239.lanes |= b;
    var c = a239.alternate;
    null !== c && (c.lanes |= b);
    c = a239;
    for(a239 = a239.return; null !== a239;)a239.childLanes |= b, c = a239.alternate, null !== c && (c.childLanes |= b), c = a239, a239 = a239.return;
    return 3 === c.tag ? c.stateNode : null;
}
function Mj(a240, b) {
    for(var c = a240.callbackNode, d = a240.suspendedLanes, e = a240.pingedLanes, f = a240.expirationTimes, g = a240.pendingLanes; 0 < g;){
        var h = 31 - Vc(g), k = 1 << h, l = f[h];
        if (-1 === l) {
            if (0 === (k & d) || 0 !== (k & e)) {
                l = b;
                Rc(k);
                var n = F;
                f[h] = 10 <= n ? l + 250 : 6 <= n ? l + 5000 : -1;
            }
        } else l <= b && (a240.expiredLanes |= k);
        g &= ~k;
    }
    d = Uc(a240, a240 === U ? W : 0);
    b = F;
    if (0 === d) null !== c && (c !== Zf && Pf(c), a240.callbackNode = null, a240.callbackPriority = 0);
    else {
        if (null !== c) {
            if (a240.callbackPriority === b) return;
            c !== Zf && Pf(c);
        }
        15 === b ? (c = Lj.bind(null, a240), null === ag ? (ag = [
            c
        ], bg = Of(Uf, jg)) : ag.push(c), c = Zf) : 14 === b ? c = hg(99, Lj.bind(null, a240)) : (c = Tc(b), c = hg(c, Nj.bind(null, a240)));
        a240.callbackPriority = b;
        a240.callbackNode = c;
    }
}
function Nj(a241) {
    Fj = -1;
    Hj = Gj = 0;
    if (0 !== (X & 48)) throw Error(y(327));
    var b = a241.callbackNode;
    if (Oj() && a241.callbackNode !== b) return null;
    var c = Uc(a241, a241 === U ? W : 0);
    if (0 === c) return null;
    var d = c;
    var e = X;
    X |= 16;
    var f = Pj();
    if (U !== a241 || W !== d) wj(), Qj(a241, d);
    for(;;)try {
        Rj();
        break;
    } catch (h) {
        Sj(a241, h);
    }
    qg();
    oj.current = f;
    X = e;
    null !== Y ? d = 0 : (U = null, W = 0, d = V);
    if (0 !== (tj & Hi)) Qj(a241, 0);
    else if (0 !== d) {
        2 === d && (X |= 64, a241.hydrate && (a241.hydrate = !1, qf(a241.containerInfo)), c = Wc(a241), 0 !== c && (d = Tj(a241, c)));
        if (1 === d) throw b = sj, Qj(a241, 0), Ii(a241, c), Mj(a241, O()), b;
        a241.finishedWork = a241.current.alternate;
        a241.finishedLanes = c;
        switch(d){
            case 0:
            case 1:
                throw Error(y(345));
            case 2:
                Uj(a241);
                break;
            case 3:
                Ii(a241, c);
                if ((c & 62914560) === c && (d = jj + 500 - O(), 10 < d)) {
                    if (0 !== Uc(a241, 0)) break;
                    e = a241.suspendedLanes;
                    if ((e & c) !== c) {
                        Hg();
                        a241.pingedLanes |= a241.suspendedLanes & e;
                        break;
                    }
                    a241.timeoutHandle = of(Uj.bind(null, a241), d);
                    break;
                }
                Uj(a241);
                break;
            case 4:
                Ii(a241, c);
                if ((c & 4186112) === c) break;
                d = a241.eventTimes;
                for(e = -1; 0 < c;){
                    var g = 31 - Vc(c);
                    f = 1 << g;
                    g = d[g];
                    g > e && (e = g);
                    c &= ~f;
                }
                c = e;
                c = O() - c;
                c = (120 > c ? 120 : 480 > c ? 480 : 1080 > c ? 1080 : 1920 > c ? 1920 : 3000 > c ? 3000 : 4320 > c ? 4320 : 1960 * nj(c / 1960)) - c;
                if (10 < c) {
                    a241.timeoutHandle = of(Uj.bind(null, a241), c);
                    break;
                }
                Uj(a241);
                break;
            case 5:
                Uj(a241);
                break;
            default:
                throw Error(y(329));
        }
    }
    Mj(a241, O());
    return a241.callbackNode === b ? Nj.bind(null, a241) : null;
}
function Ii(a242, b) {
    b &= ~uj;
    b &= ~Hi;
    a242.suspendedLanes |= b;
    a242.pingedLanes &= ~b;
    for(a242 = a242.expirationTimes; 0 < b;){
        var c = 31 - Vc(b), d = 1 << c;
        a242[c] = -1;
        b &= ~d;
    }
}
function Lj(a243) {
    if (0 !== (X & 48)) throw Error(y(327));
    Oj();
    if (a243 === U && 0 !== (a243.expiredLanes & W)) {
        var b = W;
        var c = Tj(a243, b);
        0 !== (tj & Hi) && (b = Uc(a243, b), c = Tj(a243, b));
    } else b = Uc(a243, 0), c = Tj(a243, b);
    0 !== a243.tag && 2 === c && (X |= 64, a243.hydrate && (a243.hydrate = !1, qf(a243.containerInfo)), b = Wc(a243), 0 !== b && (c = Tj(a243, b)));
    if (1 === c) throw c = sj, Qj(a243, 0), Ii(a243, b), Mj(a243, O()), c;
    a243.finishedWork = a243.current.alternate;
    a243.finishedLanes = b;
    Uj(a243);
    Mj(a243, O());
    return null;
}
function Vj() {
    if (null !== Cj) {
        var a244 = Cj;
        Cj = null;
        a244.forEach(function(a245) {
            a245.expiredLanes |= 24 & a245.pendingLanes;
            Mj(a245, O());
        });
    }
    ig();
}
function Wj(a246, b) {
    var c = X;
    X |= 1;
    try {
        return a246(b);
    } finally{
        X = c, 0 === X && (wj(), ig());
    }
}
function Xj(a247, b) {
    var c = X;
    X &= -2;
    X |= 8;
    try {
        return a247(b);
    } finally{
        X = c, 0 === X && (wj(), ig());
    }
}
function ni(a, b) {
    I(rj, qj);
    qj |= b;
    tj |= b;
}
function Ki() {
    qj = rj.current;
    H(rj);
}
function Qj(a248, b) {
    a248.finishedWork = null;
    a248.finishedLanes = 0;
    var c = a248.timeoutHandle;
    -1 !== c && (a248.timeoutHandle = -1, pf(c));
    if (null !== Y) for(c = Y.return; null !== c;){
        var d = c;
        switch(d.tag){
            case 1:
                d = d.type.childContextTypes;
                null !== d && void 0 !== d && Gf();
                break;
            case 3:
                fh();
                H(N);
                H(M);
                uh();
                break;
            case 5:
                hh(d);
                break;
            case 4:
                fh();
                break;
            case 13:
                H(P);
                break;
            case 19:
                H(P);
                break;
            case 10:
                rg(d);
                break;
            case 23:
            case 24:
                Ki();
        }
        c = c.return;
    }
    U = a248;
    Y = Tg(a248.current, null);
    W = qj = tj = b;
    V = 0;
    sj = null;
    uj = Hi = Dg = 0;
}
function Sj(a249, b) {
    do {
        var c = Y;
        try {
            qg();
            vh.current = Gh;
            if (yh) {
                for(var d = R.memoizedState; null !== d;){
                    var e = d.queue;
                    null !== e && (e.pending = null);
                    d = d.next;
                }
                yh = !1;
            }
            xh = 0;
            T = S = R = null;
            zh = !1;
            pj.current = null;
            if (null === c || null === c.return) {
                V = 1;
                sj = b;
                Y = null;
                break;
            }
            a: {
                var f = a249, g = c.return, h = c, k = b;
                b = W;
                h.flags |= 2048;
                h.firstEffect = h.lastEffect = null;
                if (null !== k && "object" === typeof k && "function" === typeof k.then) {
                    var l = k;
                    if (0 === (h.mode & 2)) {
                        var n = h.alternate;
                        n ? (h.updateQueue = n.updateQueue, h.memoizedState = n.memoizedState, h.lanes = n.lanes) : (h.updateQueue = null, h.memoizedState = null);
                    }
                    var A = 0 !== (P.current & 1), p = g;
                    do {
                        var C;
                        if (C = 13 === p.tag) {
                            var x = p.memoizedState;
                            if (null !== x) C = null !== x.dehydrated ? !0 : !1;
                            else {
                                var w = p.memoizedProps;
                                C = void 0 === w.fallback ? !1 : !0 !== w.unstable_avoidThisFallback ? !0 : A ? !1 : !0;
                            }
                        }
                        if (C) {
                            var z = p.updateQueue;
                            if (null === z) {
                                var u = new Set;
                                u.add(l);
                                p.updateQueue = u;
                            } else z.add(l);
                            if (0 === (p.mode & 2)) {
                                p.flags |= 64;
                                h.flags |= 16384;
                                h.flags &= -2981;
                                if (1 === h.tag) {
                                    if (null === h.alternate) h.tag = 17;
                                    else {
                                        var t = zg(-1, 1);
                                        t.tag = 2;
                                        Ag(h, t);
                                    }
                                }
                                h.lanes |= 1;
                                break a;
                            }
                            k = void 0;
                            h = b;
                            var q = f.pingCache;
                            null === q ? (q = f.pingCache = new Oi, k = new Set, q.set(l, k)) : (k = q.get(l), void 0 === k && (k = new Set, q.set(l, k)));
                            if (!k.has(h)) {
                                k.add(h);
                                var v = Yj.bind(null, f, l, h);
                                l.then(v, v);
                            }
                            p.flags |= 4096;
                            p.lanes = b;
                            break a;
                        }
                        p = p.return;
                    }while (null !== p)
                    k = Error((Ra(h.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");
                }
                5 !== V && (V = 2);
                k = Mi(k, h);
                p = g;
                do {
                    switch(p.tag){
                        case 3:
                            f = k;
                            p.flags |= 4096;
                            b &= -b;
                            p.lanes |= b;
                            var J = Pi(p, f, b);
                            Bg(p, J);
                            break a;
                        case 1:
                            f = k;
                            var K = p.type, Q = p.stateNode;
                            if (0 === (p.flags & 64) && ("function" === typeof K.getDerivedStateFromError || null !== Q && "function" === typeof Q.componentDidCatch && (null === Ti || !Ti.has(Q)))) {
                                p.flags |= 4096;
                                b &= -b;
                                p.lanes |= b;
                                var L = Si(p, f, b);
                                Bg(p, L);
                                break a;
                            }
                    }
                    p = p.return;
                }while (null !== p)
            }
            Zj(c);
        } catch (va) {
            b = va;
            Y === c && null !== c && (Y = c = c.return);
            continue;
        }
        break;
    }while (1)
}
function Pj() {
    var a250 = oj.current;
    oj.current = Gh;
    return null === a250 ? Gh : a250;
}
function Tj(a251, b) {
    var c = X;
    X |= 16;
    var d = Pj();
    U === a251 && W === b || Qj(a251, b);
    for(;;)try {
        ak();
        break;
    } catch (e) {
        Sj(a251, e);
    }
    qg();
    X = c;
    oj.current = d;
    if (null !== Y) throw Error(y(261));
    U = null;
    W = 0;
    return V;
}
function ak() {
    for(; null !== Y;)bk(Y);
}
function Rj() {
    for(; null !== Y && !Qf();)bk(Y);
}
function bk(a252) {
    var b = ck(a252.alternate, a252, qj);
    a252.memoizedProps = a252.pendingProps;
    null === b ? Zj(a252) : Y = b;
    pj.current = null;
}
function Zj(a253) {
    var b = a253;
    do {
        var c = b.alternate;
        a253 = b.return;
        if (0 === (b.flags & 2048)) {
            c = Gi(c, b, qj);
            if (null !== c) {
                Y = c;
                return;
            }
            c = b;
            if (24 !== c.tag && 23 !== c.tag || null === c.memoizedState || 0 !== (qj & 1073741824) || 0 === (c.mode & 4)) {
                for(var d = 0, e = c.child; null !== e;)d |= e.lanes | e.childLanes, e = e.sibling;
                c.childLanes = d;
            }
            null !== a253 && 0 === (a253.flags & 2048) && (null === a253.firstEffect && (a253.firstEffect = b.firstEffect), null !== b.lastEffect && (null !== a253.lastEffect && (a253.lastEffect.nextEffect = b.firstEffect), a253.lastEffect = b.lastEffect), 1 < b.flags && (null !== a253.lastEffect ? a253.lastEffect.nextEffect = b : a253.firstEffect = b, a253.lastEffect = b));
        } else {
            c = Li(b);
            if (null !== c) {
                c.flags &= 2047;
                Y = c;
                return;
            }
            null !== a253 && (a253.firstEffect = a253.lastEffect = null, a253.flags |= 2048);
        }
        b = b.sibling;
        if (null !== b) {
            Y = b;
            return;
        }
        Y = b = a253;
    }while (null !== b)
    0 === V && (V = 5);
}
function Uj(a254) {
    var b = eg();
    gg(99, dk.bind(null, a254, b));
    return null;
}
function dk(a255, b) {
    do Oj();
    while (null !== yj)
    if (0 !== (X & 48)) throw Error(y(327));
    var c = a255.finishedWork;
    if (null === c) return null;
    a255.finishedWork = null;
    a255.finishedLanes = 0;
    if (c === a255.current) throw Error(y(177));
    a255.callbackNode = null;
    var d = c.lanes | c.childLanes, e = d, f = a255.pendingLanes & ~e;
    a255.pendingLanes = e;
    a255.suspendedLanes = 0;
    a255.pingedLanes = 0;
    a255.expiredLanes &= e;
    a255.mutableReadLanes &= e;
    a255.entangledLanes &= e;
    e = a255.entanglements;
    for(var g = a255.eventTimes, h = a255.expirationTimes; 0 < f;){
        var k = 31 - Vc(f), l = 1 << k;
        e[k] = 0;
        g[k] = -1;
        h[k] = -1;
        f &= ~l;
    }
    null !== Cj && 0 === (d & 24) && Cj.has(a255) && Cj.delete(a255);
    a255 === U && (Y = U = null, W = 0);
    1 < c.flags ? null !== c.lastEffect ? (c.lastEffect.nextEffect = c, d = c.firstEffect) : d = c : d = c.firstEffect;
    if (null !== d) {
        e = X;
        X |= 32;
        pj.current = null;
        kf = fd;
        g = Ne();
        if (Oe(g)) {
            if ("selectionStart" in g) h = {
                start: g.selectionStart,
                end: g.selectionEnd
            };
            else a: if (h = (h = g.ownerDocument) && h.defaultView || window, (l = h.getSelection && h.getSelection()) && 0 !== l.rangeCount) {
                h = l.anchorNode;
                f = l.anchorOffset;
                k = l.focusNode;
                l = l.focusOffset;
                try {
                    h.nodeType, k.nodeType;
                } catch (va) {
                    h = null;
                    break a;
                }
                var n = 0, A = -1, p = -1, C = 0, x = 0, w = g, z = null;
                b: for(;;){
                    for(var u;;){
                        w !== h || 0 !== f && 3 !== w.nodeType || (A = n + f);
                        w !== k || 0 !== l && 3 !== w.nodeType || (p = n + l);
                        3 === w.nodeType && (n += w.nodeValue.length);
                        if (null === (u = w.firstChild)) break;
                        z = w;
                        w = u;
                    }
                    for(;;){
                        if (w === g) break b;
                        z === h && ++C === f && (A = n);
                        z === k && ++x === l && (p = n);
                        if (null !== (u = w.nextSibling)) break;
                        w = z;
                        z = w.parentNode;
                    }
                    w = u;
                }
                h = -1 === A || -1 === p ? null : {
                    start: A,
                    end: p
                };
            } else h = null;
            h = h || {
                start: 0,
                end: 0
            };
        } else h = null;
        lf = {
            focusedElem: g,
            selectionRange: h
        };
        fd = !1;
        Ij = null;
        Jj = !1;
        Z = d;
        do try {
            ek();
        } catch (va) {
            if (null === Z) throw Error(y(330));
            Wi(Z, va);
            Z = Z.nextEffect;
        }
        while (null !== Z)
        Ij = null;
        Z = d;
        do try {
            for(g = a255; null !== Z;){
                var t = Z.flags;
                t & 16 && pb(Z.stateNode, "");
                if (t & 128) {
                    var q = Z.alternate;
                    if (null !== q) {
                        var v = q.ref;
                        null !== v && ("function" === typeof v ? v(null) : v.current = null);
                    }
                }
                switch(t & 1038){
                    case 2:
                        fj(Z);
                        Z.flags &= -3;
                        break;
                    case 6:
                        fj(Z);
                        Z.flags &= -3;
                        ij(Z.alternate, Z);
                        break;
                    case 1024:
                        Z.flags &= -1025;
                        break;
                    case 1028:
                        Z.flags &= -1025;
                        ij(Z.alternate, Z);
                        break;
                    case 4:
                        ij(Z.alternate, Z);
                        break;
                    case 8:
                        h = Z;
                        cj(g, h);
                        var J = h.alternate;
                        dj(h);
                        null !== J && dj(J);
                }
                Z = Z.nextEffect;
            }
        } catch (va1) {
            if (null === Z) throw Error(y(330));
            Wi(Z, va1);
            Z = Z.nextEffect;
        }
        while (null !== Z)
        v = lf;
        q = Ne();
        t = v.focusedElem;
        g = v.selectionRange;
        if (q !== t && t && t.ownerDocument && Me(t.ownerDocument.documentElement, t)) {
            null !== g && Oe(t) && (q = g.start, v = g.end, void 0 === v && (v = q), "selectionStart" in t ? (t.selectionStart = q, t.selectionEnd = Math.min(v, t.value.length)) : (v = (q = t.ownerDocument || document) && q.defaultView || window, v.getSelection && (v = v.getSelection(), h = t.textContent.length, J = Math.min(g.start, h), g = void 0 === g.end ? J : Math.min(g.end, h), !v.extend && J > g && (h = g, g = J, J = h), h = Le(t, J), f = Le(t, g), h && f && (1 !== v.rangeCount || v.anchorNode !== h.node || v.anchorOffset !== h.offset || v.focusNode !== f.node || v.focusOffset !== f.offset) && (q = q.createRange(), q.setStart(h.node, h.offset), v.removeAllRanges(), J > g ? (v.addRange(q), v.extend(f.node, f.offset)) : (q.setEnd(f.node, f.offset), v.addRange(q))))));
            q = [];
            for(v = t; v = v.parentNode;)1 === v.nodeType && q.push({
                element: v,
                left: v.scrollLeft,
                top: v.scrollTop
            });
            "function" === typeof t.focus && t.focus();
            for(t = 0; t < q.length; t++)v = q[t], v.element.scrollLeft = v.left, v.element.scrollTop = v.top;
        }
        fd = !!kf;
        lf = kf = null;
        a255.current = c;
        Z = d;
        do try {
            for(t = a255; null !== Z;){
                var K = Z.flags;
                K & 36 && Yi(t, Z.alternate, Z);
                if (K & 128) {
                    q = void 0;
                    var Q = Z.ref;
                    if (null !== Q) {
                        var L = Z.stateNode;
                        switch(Z.tag){
                            case 5:
                                q = L;
                                break;
                            default:
                                q = L;
                        }
                        "function" === typeof Q ? Q(q) : Q.current = q;
                    }
                }
                Z = Z.nextEffect;
            }
        } catch (va2) {
            if (null === Z) throw Error(y(330));
            Wi(Z, va2);
            Z = Z.nextEffect;
        }
        while (null !== Z)
        Z = null;
        $f();
        X = e;
    } else a255.current = c;
    if (xj) xj = !1, yj = a255, zj = b;
    else for(Z = d; null !== Z;)b = Z.nextEffect, Z.nextEffect = null, Z.flags & 8 && (K = Z, K.sibling = null, K.stateNode = null), Z = b;
    d = a255.pendingLanes;
    0 === d && (Ti = null);
    1 === d ? a255 === Ej ? Dj++ : (Dj = 0, Ej = a255) : Dj = 0;
    c = c.stateNode;
    if (Mf && "function" === typeof Mf.onCommitFiberRoot) try {
        Mf.onCommitFiberRoot(Lf, c, void 0, 64 === (c.current.flags & 64));
    } catch (va) {
    }
    Mj(a255, O());
    if (Qi) throw Qi = !1, a255 = Ri, Ri = null, a255;
    if (0 !== (X & 8)) return null;
    ig();
    return null;
}
function ek() {
    for(; null !== Z;){
        var a256 = Z.alternate;
        Jj || null === Ij || (0 !== (Z.flags & 8) ? dc(Z, Ij) && (Jj = !0) : 13 === Z.tag && mj(a256, Z) && dc(Z, Ij) && (Jj = !0));
        var b = Z.flags;
        0 !== (b & 256) && Xi(a256, Z);
        0 === (b & 512) || xj || (xj = !0, hg(97, function() {
            Oj();
            return null;
        }));
        Z = Z.nextEffect;
    }
}
function Oj() {
    if (90 !== zj) {
        var a257 = 97 < zj ? 97 : zj;
        zj = 90;
        return gg(a257, fk);
    }
    return !1;
}
function $i(a258, b) {
    Aj.push(b, a258);
    xj || (xj = !0, hg(97, function() {
        Oj();
        return null;
    }));
}
function Zi(a259, b) {
    Bj.push(b, a259);
    xj || (xj = !0, hg(97, function() {
        Oj();
        return null;
    }));
}
function fk() {
    if (null === yj) return !1;
    var a260 = yj;
    yj = null;
    if (0 !== (X & 48)) throw Error(y(331));
    var b = X;
    X |= 32;
    var c = Bj;
    Bj = [];
    for(var d = 0; d < c.length; d += 2){
        var e = c[d], f = c[d + 1], g = e.destroy;
        e.destroy = void 0;
        if ("function" === typeof g) try {
            g();
        } catch (k) {
            if (null === f) throw Error(y(330));
            Wi(f, k);
        }
    }
    c = Aj;
    Aj = [];
    for(d = 0; d < c.length; d += 2){
        e = c[d];
        f = c[d + 1];
        try {
            var h = e.create;
            e.destroy = h();
        } catch (k) {
            if (null === f) throw Error(y(330));
            Wi(f, k);
        }
    }
    for(h = a260.current.firstEffect; null !== h;)a260 = h.nextEffect, h.nextEffect = null, h.flags & 8 && (h.sibling = null, h.stateNode = null), h = a260;
    X = b;
    ig();
    return !0;
}
function gk(a261, b, c) {
    b = Mi(c, b);
    b = Pi(a261, b, 1);
    Ag(a261, b);
    b = Hg();
    a261 = Kj(a261, 1);
    null !== a261 && ($c(a261, 1, b), Mj(a261, b));
}
function Wi(a262, b) {
    if (3 === a262.tag) gk(a262, a262, b);
    else for(var c = a262.return; null !== c;){
        if (3 === c.tag) {
            gk(c, a262, b);
            break;
        } else if (1 === c.tag) {
            var d = c.stateNode;
            if ("function" === typeof c.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ti || !Ti.has(d))) {
                a262 = Mi(b, a262);
                var e = Si(c, a262, 1);
                Ag(c, e);
                e = Hg();
                c = Kj(c, 1);
                if (null !== c) $c(c, 1, e), Mj(c, e);
                else if ("function" === typeof d.componentDidCatch && (null === Ti || !Ti.has(d))) try {
                    d.componentDidCatch(b, a262);
                } catch (f) {
                }
                break;
            }
        }
        c = c.return;
    }
}
function Yj(a263, b, c) {
    var d = a263.pingCache;
    null !== d && d.delete(b);
    b = Hg();
    a263.pingedLanes |= a263.suspendedLanes & c;
    U === a263 && (W & c) === c && (4 === V || 3 === V && (W & 62914560) === W && 500 > O() - jj ? Qj(a263, 0) : uj |= c);
    Mj(a263, b);
}
function lj(a264, b) {
    var c = a264.stateNode;
    null !== c && c.delete(b);
    b = 0;
    0 === b && (b = a264.mode, 0 === (b & 2) ? b = 1 : 0 === (b & 4) ? b = 99 === eg() ? 1 : 2 : (0 === Gj && (Gj = tj), b = Yc(62914560 & ~Gj), 0 === b && (b = 4194304)));
    c = Hg();
    a264 = Kj(a264, b);
    null !== a264 && ($c(a264, b, c), Mj(a264, c));
}
var ck;
ck = function(a265, b, c) {
    var d = b.lanes;
    if (null !== a265) {
        if (a265.memoizedProps !== b.pendingProps || N.current) ug = !0;
        else if (0 !== (c & d)) ug = 0 !== (a265.flags & 16384) ? !0 : !1;
        else {
            ug = !1;
            switch(b.tag){
                case 3:
                    ri(b);
                    sh();
                    break;
                case 5:
                    gh(b);
                    break;
                case 1:
                    Ff(b.type) && Jf(b);
                    break;
                case 4:
                    eh(b, b.stateNode.containerInfo);
                    break;
                case 10:
                    d = b.memoizedProps.value;
                    var e = b.type._context;
                    I(mg, e._currentValue);
                    e._currentValue = d;
                    break;
                case 13:
                    if (null !== b.memoizedState) {
                        if (0 !== (c & b.child.childLanes)) return ti(a265, b, c);
                        I(P, P.current & 1);
                        b = hi(a265, b, c);
                        return null !== b ? b.sibling : null;
                    }
                    I(P, P.current & 1);
                    break;
                case 19:
                    d = 0 !== (c & b.childLanes);
                    if (0 !== (a265.flags & 64)) {
                        if (d) return Ai(a265, b, c);
                        b.flags |= 64;
                    }
                    e = b.memoizedState;
                    null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
                    I(P, P.current);
                    if (d) break;
                    else return null;
                case 23:
                case 24:
                    return b.lanes = 0, mi(a265, b, c);
            }
            return hi(a265, b, c);
        }
    } else ug = !1;
    b.lanes = 0;
    switch(b.tag){
        case 2:
            d = b.type;
            null !== a265 && (a265.alternate = null, b.alternate = null, b.flags |= 2);
            a265 = b.pendingProps;
            e = Ef(b, M.current);
            tg(b, c);
            e = Ch(null, b, d, a265, e, c);
            b.flags |= 1;
            if ("object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof) {
                b.tag = 1;
                b.memoizedState = null;
                b.updateQueue = null;
                if (Ff(d)) {
                    var f = !0;
                    Jf(b);
                } else f = !1;
                b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null;
                xg(b);
                var g = d.getDerivedStateFromProps;
                "function" === typeof g && Gg(b, d, g, a265);
                e.updater = Kg;
                b.stateNode = e;
                e._reactInternals = b;
                Og(b, d, a265, c);
                b = qi(null, b, d, !0, f, c);
            } else b.tag = 0, fi(null, b, e, c), b = b.child;
            return b;
        case 16:
            e = b.elementType;
            a: {
                null !== a265 && (a265.alternate = null, b.alternate = null, b.flags |= 2);
                a265 = b.pendingProps;
                f = e._init;
                e = f(e._payload);
                b.type = e;
                f = b.tag = hk(e);
                a265 = lg(e, a265);
                switch(f){
                    case 0:
                        b = li(null, b, e, a265, c);
                        break a;
                    case 1:
                        b = pi(null, b, e, a265, c);
                        break a;
                    case 11:
                        b = gi(null, b, e, a265, c);
                        break a;
                    case 14:
                        b = ii(null, b, e, lg(e.type, a265), d, c);
                        break a;
                }
                throw Error(y(306, e, ""));
            }
            return b;
        case 0:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), li(a265, b, d, e, c);
        case 1:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), pi(a265, b, d, e, c);
        case 3:
            ri(b);
            d = b.updateQueue;
            if (null === a265 || null === d) throw Error(y(282));
            d = b.pendingProps;
            e = b.memoizedState;
            e = null !== e ? e.element : null;
            yg(a265, b);
            Cg(b, d, null, c);
            d = b.memoizedState.element;
            if (d === e) sh(), b = hi(a265, b, c);
            else {
                e = b.stateNode;
                if (f = e.hydrate) kh = rf(b.stateNode.containerInfo.firstChild), jh = b, f = lh = !0;
                if (f) {
                    a265 = e.mutableSourceEagerHydrationData;
                    if (null != a265) for(e = 0; e < a265.length; e += 2)f = a265[e], f._workInProgressVersionPrimary = a265[e + 1], th.push(f);
                    c = Zg(b, null, d, c);
                    for(b.child = c; c;)c.flags = c.flags & -3 | 1024, c = c.sibling;
                } else fi(a265, b, d, c), sh();
                b = b.child;
            }
            return b;
        case 5:
            return gh(b), null === a265 && ph(b), d = b.type, e = b.pendingProps, f = null !== a265 ? a265.memoizedProps : null, g = e.children, nf(d, e) ? g = null : null !== f && nf(d, f) && (b.flags |= 16), oi(a265, b), fi(a265, b, g, c), b.child;
        case 6:
            return null === a265 && ph(b), null;
        case 13:
            return ti(a265, b, c);
        case 4:
            return eh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a265 ? b.child = Yg(b, null, d, c) : fi(a265, b, d, c), b.child;
        case 11:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), gi(a265, b, d, e, c);
        case 7:
            return fi(a265, b, b.pendingProps, c), b.child;
        case 8:
            return fi(a265, b, b.pendingProps.children, c), b.child;
        case 12:
            return fi(a265, b, b.pendingProps.children, c), b.child;
        case 10:
            a: {
                d = b.type._context;
                e = b.pendingProps;
                g = b.memoizedProps;
                f = e.value;
                var h = b.type._context;
                I(mg, h._currentValue);
                h._currentValue = f;
                if (null !== g) {
                    if (h = g.value, f = He(h, f) ? 0 : ("function" === typeof d._calculateChangedBits ? d._calculateChangedBits(h, f) : 1073741823) | 0, 0 === f) {
                        if (g.children === e.children && !N.current) {
                            b = hi(a265, b, c);
                            break a;
                        }
                    } else for(h = b.child, null !== h && (h.return = b); null !== h;){
                        var k = h.dependencies;
                        if (null !== k) {
                            g = h.child;
                            for(var l = k.firstContext; null !== l;){
                                if (l.context === d && 0 !== (l.observedBits & f)) {
                                    1 === h.tag && (l = zg(-1, c & -c), l.tag = 2, Ag(h, l));
                                    h.lanes |= c;
                                    l = h.alternate;
                                    null !== l && (l.lanes |= c);
                                    sg(h.return, c);
                                    k.lanes |= c;
                                    break;
                                }
                                l = l.next;
                            }
                        } else g = 10 === h.tag ? h.type === b.type ? null : h.child : h.child;
                        if (null !== g) g.return = h;
                        else for(g = h; null !== g;){
                            if (g === b) {
                                g = null;
                                break;
                            }
                            h = g.sibling;
                            if (null !== h) {
                                h.return = g.return;
                                g = h;
                                break;
                            }
                            g = g.return;
                        }
                        h = g;
                    }
                }
                fi(a265, b, e.children, c);
                b = b.child;
            }
            return b;
        case 9:
            return e = b.type, f = b.pendingProps, d = f.children, tg(b, c), e = vg(e, f.unstable_observedBits), d = d(e), b.flags |= 1, fi(a265, b, d, c), b.child;
        case 14:
            return e = b.type, f = lg(e, b.pendingProps), f = lg(e.type, f), ii(a265, b, e, f, d, c);
        case 15:
            return ki(a265, b, b.type, b.pendingProps, d, c);
        case 17:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), null !== a265 && (a265.alternate = null, b.alternate = null, b.flags |= 2), b.tag = 1, Ff(d) ? (a265 = !0, Jf(b)) : a265 = !1, tg(b, c), Mg(b, d, e), Og(b, d, e, c), qi(null, b, d, !0, a265, c);
        case 19:
            return Ai(a265, b, c);
        case 23:
            return mi(a265, b, c);
        case 24:
            return mi(a265, b, c);
    }
    throw Error(y(156, b.tag));
};
function ik(a266, b, c, d) {
    this.tag = a266;
    this.key = c;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.ref = null;
    this.pendingProps = b;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = d;
    this.flags = 0;
    this.lastEffect = this.firstEffect = this.nextEffect = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
}
function nh(a267, b, c, d) {
    return new ik(a267, b, c, d);
}
function ji(a268) {
    a268 = a268.prototype;
    return !(!a268 || !a268.isReactComponent);
}
function hk(a269) {
    if ("function" === typeof a269) return ji(a269) ? 1 : 0;
    if (void 0 !== a269 && null !== a269) {
        a269 = a269.$$typeof;
        if (a269 === Aa) return 11;
        if (a269 === Da) return 14;
    }
    return 2;
}
function Tg(a270, b) {
    var c = a270.alternate;
    null === c ? (c = nh(a270.tag, b, a270.key, a270.mode), c.elementType = a270.elementType, c.type = a270.type, c.stateNode = a270.stateNode, c.alternate = a270, a270.alternate = c) : (c.pendingProps = b, c.type = a270.type, c.flags = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);
    c.childLanes = a270.childLanes;
    c.lanes = a270.lanes;
    c.child = a270.child;
    c.memoizedProps = a270.memoizedProps;
    c.memoizedState = a270.memoizedState;
    c.updateQueue = a270.updateQueue;
    b = a270.dependencies;
    c.dependencies = null === b ? null : {
        lanes: b.lanes,
        firstContext: b.firstContext
    };
    c.sibling = a270.sibling;
    c.index = a270.index;
    c.ref = a270.ref;
    return c;
}
function Vg(a271, b, c, d, e, f) {
    var g = 2;
    d = a271;
    if ("function" === typeof a271) ji(a271) && (g = 1);
    else if ("string" === typeof a271) g = 5;
    else a: switch(a271){
        case ua:
            return Xg(c.children, e, f, b);
        case Ha:
            g = 8;
            e |= 16;
            break;
        case wa:
            g = 8;
            e |= 1;
            break;
        case xa:
            return a271 = nh(12, c, b, e | 8), a271.elementType = xa, a271.type = xa, a271.lanes = f, a271;
        case Ba:
            return a271 = nh(13, c, b, e), a271.type = Ba, a271.elementType = Ba, a271.lanes = f, a271;
        case Ca:
            return a271 = nh(19, c, b, e), a271.elementType = Ca, a271.lanes = f, a271;
        case Ia:
            return vi(c, e, f, b);
        case Ja:
            return a271 = nh(24, c, b, e), a271.elementType = Ja, a271.lanes = f, a271;
        default:
            if ("object" === typeof a271 && null !== a271) switch(a271.$$typeof){
                case ya:
                    g = 10;
                    break a;
                case za:
                    g = 9;
                    break a;
                case Aa:
                    g = 11;
                    break a;
                case Da:
                    g = 14;
                    break a;
                case Ea:
                    g = 16;
                    d = null;
                    break a;
                case Fa:
                    g = 22;
                    break a;
            }
            throw Error(y(130, null == a271 ? a271 : typeof a271, ""));
    }
    b = nh(g, c, b, e);
    b.elementType = a271;
    b.type = d;
    b.lanes = f;
    return b;
}
function Xg(a272, b, c, d) {
    a272 = nh(7, a272, d, b);
    a272.lanes = c;
    return a272;
}
function vi(a273, b, c, d) {
    a273 = nh(23, a273, d, b);
    a273.elementType = Ia;
    a273.lanes = c;
    return a273;
}
function Ug(a274, b, c) {
    a274 = nh(6, a274, null, b);
    a274.lanes = c;
    return a274;
}
function Wg(a275, b, c) {
    b = nh(4, null !== a275.children ? a275.children : [], a275.key, b);
    b.lanes = c;
    b.stateNode = {
        containerInfo: a275.containerInfo,
        pendingChildren: null,
        implementation: a275.implementation
    };
    return b;
}
function jk(a276, b, c) {
    this.tag = b;
    this.containerInfo = a276;
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.pendingContext = this.context = null;
    this.hydrate = c;
    this.callbackNode = null;
    this.callbackPriority = 0;
    this.eventTimes = Zc(0);
    this.expirationTimes = Zc(-1);
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = Zc(0);
    this.mutableSourceEagerHydrationData = null;
}
function kk(a277, b, c) {
    var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return {
        $$typeof: ta,
        key: null == d ? null : "" + d,
        children: a277,
        containerInfo: b,
        implementation: c
    };
}
function lk(a278, b, c, d) {
    var e = b.current, f = Hg(), g = Ig(e);
    a: if (c) {
        c = c._reactInternals;
        b: {
            if (Zb(c) !== c || 1 !== c.tag) throw Error(y(170));
            var h = c;
            do {
                switch(h.tag){
                    case 3:
                        h = h.stateNode.context;
                        break b;
                    case 1:
                        if (Ff(h.type)) {
                            h = h.stateNode.__reactInternalMemoizedMergedChildContext;
                            break b;
                        }
                }
                h = h.return;
            }while (null !== h)
            throw Error(y(171));
        }
        if (1 === c.tag) {
            var k = c.type;
            if (Ff(k)) {
                c = If(c, k, h);
                break a;
            }
        }
        c = h;
    } else c = Cf;
    null === b.context ? b.context = c : b.pendingContext = c;
    b = zg(f, g);
    b.payload = {
        element: a278
    };
    d = void 0 === d ? null : d;
    null !== d && (b.callback = d);
    Ag(e, b);
    Jg(e, g, f);
    return g;
}
function mk(a279) {
    a279 = a279.current;
    if (!a279.child) return null;
    switch(a279.child.tag){
        case 5:
            return a279.child.stateNode;
        default:
            return a279.child.stateNode;
    }
}
function nk(a280, b) {
    a280 = a280.memoizedState;
    if (null !== a280 && null !== a280.dehydrated) {
        var c = a280.retryLane;
        a280.retryLane = 0 !== c && c < b ? c : b;
    }
}
function ok(a281, b) {
    nk(a281, b);
    (a281 = a281.alternate) && nk(a281, b);
}
function pk() {
    return null;
}
function qk(a282, b, c) {
    var d = null != c && null != c.hydrationOptions && c.hydrationOptions.mutableSources || null;
    c = new jk(a282, b, null != c && !0 === c.hydrate);
    b = nh(3, null, null, 2 === b ? 7 : 1 === b ? 3 : 0);
    c.current = b;
    b.stateNode = c;
    xg(b);
    a282[ff] = c.current;
    cf(8 === a282.nodeType ? a282.parentNode : a282);
    if (d) for(a282 = 0; a282 < d.length; a282++){
        b = d[a282];
        var e = b._getVersion;
        e = e(b._source);
        null == c.mutableSourceEagerHydrationData ? c.mutableSourceEagerHydrationData = [
            b,
            e
        ] : c.mutableSourceEagerHydrationData.push(b, e);
    }
    this._internalRoot = c;
}
qk.prototype.render = function(a283) {
    lk(a283, this._internalRoot, null, null);
};
qk.prototype.unmount = function() {
    var a284 = this._internalRoot, b = a284.containerInfo;
    lk(null, a284, null, function() {
        b[ff] = null;
    });
};
function rk(a285) {
    return !(!a285 || 1 !== a285.nodeType && 9 !== a285.nodeType && 11 !== a285.nodeType && (8 !== a285.nodeType || " react-mount-point-unstable " !== a285.nodeValue));
}
function sk(a286, b) {
    b || (b = a286 ? 9 === a286.nodeType ? a286.documentElement : a286.firstChild : null, b = !(!b || 1 !== b.nodeType || !b.hasAttribute("data-reactroot")));
    if (!b) for(var c; c = a286.lastChild;)a286.removeChild(c);
    return new qk(a286, 0, b ? {
        hydrate: !0
    } : void 0);
}
function tk(a287, b, c, d, e) {
    var f = c._reactRootContainer;
    if (f) {
        var g = f._internalRoot;
        if ("function" === typeof e) {
            var h = e;
            e = function() {
                var a288 = mk(g);
                h.call(a288);
            };
        }
        lk(b, g, a287, e);
    } else {
        f = c._reactRootContainer = sk(c, d);
        g = f._internalRoot;
        if ("function" === typeof e) {
            var k = e;
            e = function() {
                var a289 = mk(g);
                k.call(a289);
            };
        }
        Xj(function() {
            lk(b, g, a287, e);
        });
    }
    return mk(g);
}
ec = function(a290) {
    if (13 === a290.tag) {
        var b = Hg();
        Jg(a290, 4, b);
        ok(a290, 4);
    }
};
fc = function(a291) {
    if (13 === a291.tag) {
        var b = Hg();
        Jg(a291, 67108864, b);
        ok(a291, 67108864);
    }
};
gc = function(a292) {
    if (13 === a292.tag) {
        var b = Hg(), c = Ig(a292);
        Jg(a292, c, b);
        ok(a292, c);
    }
};
hc = function(a, b) {
    return b();
};
yb = function(a293, b, c) {
    switch(b){
        case "input":
            ab(a293, c);
            b = c.name;
            if ("radio" === c.type && null != b) {
                for(c = a293; c.parentNode;)c = c.parentNode;
                c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
                for(b = 0; b < c.length; b++){
                    var d = c[b];
                    if (d !== a293 && d.form === a293.form) {
                        var e = Db(d);
                        if (!e) throw Error(y(90));
                        Wa(d);
                        ab(d, e);
                    }
                }
            }
            break;
        case "textarea":
            ib(a293, c);
            break;
        case "select":
            b = c.value, null != b && fb(a293, !!c.multiple, b, !1);
    }
};
Gb = Wj;
Hb = function(a294, b, c, d, e) {
    var f = X;
    X |= 4;
    try {
        return gg(98, a294.bind(null, b, c, d, e));
    } finally{
        X = f, 0 === X && (wj(), ig());
    }
};
Ib = function() {
    0 === (X & 49) && (Vj(), Oj());
};
Jb = function(a295, b) {
    var c = X;
    X |= 2;
    try {
        return a295(b);
    } finally{
        X = c, 0 === X && (wj(), ig());
    }
};
function uk(a296, b) {
    var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!rk(b)) throw Error(y(200));
    return kk(a296, b, null, c);
}
var vk = {
    Events: [
        Cb,
        ue,
        Db,
        Eb,
        Fb,
        Oj,
        {
            current: !1
        }
    ]
}, wk = {
    findFiberByHostInstance: wc,
    bundleType: 0,
    version: "17.0.2",
    rendererPackageName: "react-dom"
};
var xk = {
    bundleType: wk.bundleType,
    version: wk.version,
    rendererPackageName: wk.rendererPackageName,
    rendererConfig: wk.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: ra.ReactCurrentDispatcher,
    findHostInstanceByFiber: function(a297) {
        a297 = cc(a297);
        return null === a297 ? null : a297.stateNode;
    },
    findFiberByHostInstance: wk.findFiberByHostInstance || pk,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null
};
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var yk = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!yk.isDisabled && yk.supportsFiber) try {
        Lf = yk.inject(xk), Mf = yk;
    } catch (a) {
    }
}
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vk;
exports.createPortal = uk;
exports.findDOMNode = function(a298) {
    if (null == a298) return null;
    if (1 === a298.nodeType) return a298;
    var b = a298._reactInternals;
    if (void 0 === b) {
        if ("function" === typeof a298.render) throw Error(y(188));
        throw Error(y(268, Object.keys(a298)));
    }
    a298 = cc(b);
    a298 = null === a298 ? null : a298.stateNode;
    return a298;
};
exports.flushSync = function(a299, b) {
    var c = X;
    if (0 !== (c & 48)) return a299(b);
    X |= 1;
    try {
        if (a299) return gg(99, a299.bind(null, b));
    } finally{
        X = c, ig();
    }
};
exports.hydrate = function(a300, b, c) {
    if (!rk(b)) throw Error(y(200));
    return tk(null, a300, b, !0, c);
};
exports.render = function(a301, b, c) {
    if (!rk(b)) throw Error(y(200));
    return tk(null, a301, b, !1, c);
};
exports.unmountComponentAtNode = function(a302) {
    if (!rk(a302)) throw Error(y(40));
    return a302._reactRootContainer ? (Xj(function() {
        tk(null, null, a302, !1, function() {
            a302._reactRootContainer = null;
            a302[ff] = null;
        });
    }), !0) : !1;
};
exports.unstable_batchedUpdates = Wj;
exports.unstable_createPortal = function(a303, b) {
    return uk(a303, b, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null);
};
exports.unstable_renderSubtreeIntoContainer = function(a304, b, c, d) {
    if (!rk(c)) throw Error(y(200));
    if (null == a304 || void 0 === a304._reactInternals) throw Error(y(38));
    return tk(a304, b, c, !1, d);
};
exports.version = "17.0.2";

},{"react":"21dqq","object-assign":"7OXxh","scheduler":"juvHo"}],"juvHo":[function(require,module,exports) {
'use strict';
module.exports = require('./cjs/scheduler.production.min.js');

},{"./cjs/scheduler.production.min.js":"jONZa"}],"jONZa":[function(require,module,exports) {
/** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
var f, g, h, k;
if ("object" === typeof performance && "function" === typeof performance.now) {
    var l = performance;
    exports.unstable_now = function() {
        return l.now();
    };
} else {
    var p = Date, q = p.now();
    exports.unstable_now = function() {
        return p.now() - q;
    };
}
if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
    var t = null, u = null, w = function() {
        if (null !== t) try {
            var a = exports.unstable_now();
            t(!0, a);
            t = null;
        } catch (b) {
            throw setTimeout(w, 0), b;
        }
    };
    f = function(a) {
        null !== t ? setTimeout(f, 0, a) : (t = a, setTimeout(w, 0));
    };
    g = function(a, b) {
        u = setTimeout(a, b);
    };
    h = function() {
        clearTimeout(u);
    };
    exports.unstable_shouldYield = function() {
        return !1;
    };
    k = exports.unstable_forceFrameRate = function() {
    };
} else {
    var x = window.setTimeout, y = window.clearTimeout;
    if ("undefined" !== typeof console) {
        var z = window.cancelAnimationFrame;
        "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
        "function" !== typeof z && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
    }
    var A = !1, B = null, C = -1, D = 5, E = 0;
    exports.unstable_shouldYield = function() {
        return exports.unstable_now() >= E;
    };
    k = function() {
    };
    exports.unstable_forceFrameRate = function(a) {
        0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D = 0 < a ? Math.floor(1000 / a) : 5;
    };
    var F = new MessageChannel, G = F.port2;
    F.port1.onmessage = function() {
        if (null !== B) {
            var a = exports.unstable_now();
            E = a + D;
            try {
                B(!0, a) ? G.postMessage(null) : (A = !1, B = null);
            } catch (b) {
                throw G.postMessage(null), b;
            }
        } else A = !1;
    };
    f = function(a) {
        B = a;
        A || (A = !0, G.postMessage(null));
    };
    g = function(a, b) {
        C = x(function() {
            a(exports.unstable_now());
        }, b);
    };
    h = function() {
        y(C);
        C = -1;
    };
}
function H(a, b) {
    var c = a.length;
    a.push(b);
    a: for(;;){
        var d = c - 1 >>> 1, e = a[d];
        if (void 0 !== e && 0 < I(e, b)) a[d] = b, a[c] = e, c = d;
        else break a;
    }
}
function J(a) {
    a = a[0];
    return void 0 === a ? null : a;
}
function K(a) {
    var b = a[0];
    if (void 0 !== b) {
        var c = a.pop();
        if (c !== b) {
            a[0] = c;
            a: for(var d = 0, e = a.length; d < e;){
                var m = 2 * (d + 1) - 1, n = a[m], v = m + 1, r = a[v];
                if (void 0 !== n && 0 > I(n, c)) void 0 !== r && 0 > I(r, n) ? (a[d] = r, a[v] = c, d = v) : (a[d] = n, a[m] = c, d = m);
                else if (void 0 !== r && 0 > I(r, c)) a[d] = r, a[v] = c, d = v;
                else break a;
            }
        }
        return b;
    }
    return null;
}
function I(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return 0 !== c ? c : a.id - b.id;
}
var L = [], M = [], N = 1, O = null, P = 3, Q = !1, R = !1, S = !1;
function T(a) {
    for(var b = J(M); null !== b;){
        if (null === b.callback) K(M);
        else if (b.startTime <= a) K(M), b.sortIndex = b.expirationTime, H(L, b);
        else break;
        b = J(M);
    }
}
function U(a) {
    S = !1;
    T(a);
    if (!R) {
        if (null !== J(L)) R = !0, f(V);
        else {
            var b = J(M);
            null !== b && g(U, b.startTime - a);
        }
    }
}
function V(a, b) {
    R = !1;
    S && (S = !1, h());
    Q = !0;
    var c = P;
    try {
        T(b);
        for(O = J(L); null !== O && (!(O.expirationTime > b) || a && !exports.unstable_shouldYield());){
            var d = O.callback;
            if ("function" === typeof d) {
                O.callback = null;
                P = O.priorityLevel;
                var e = d(O.expirationTime <= b);
                b = exports.unstable_now();
                "function" === typeof e ? O.callback = e : O === J(L) && K(L);
                T(b);
            } else K(L);
            O = J(L);
        }
        if (null !== O) var m = !0;
        else {
            var n = J(M);
            null !== n && g(U, n.startTime - b);
            m = !1;
        }
        return m;
    } finally{
        O = null, P = c, Q = !1;
    }
}
var W = k;
exports.unstable_IdlePriority = 5;
exports.unstable_ImmediatePriority = 1;
exports.unstable_LowPriority = 4;
exports.unstable_NormalPriority = 3;
exports.unstable_Profiling = null;
exports.unstable_UserBlockingPriority = 2;
exports.unstable_cancelCallback = function(a) {
    a.callback = null;
};
exports.unstable_continueExecution = function() {
    R || Q || (R = !0, f(V));
};
exports.unstable_getCurrentPriorityLevel = function() {
    return P;
};
exports.unstable_getFirstCallbackNode = function() {
    return J(L);
};
exports.unstable_next = function(a) {
    switch(P){
        case 1:
        case 2:
        case 3:
            var b = 3;
            break;
        default:
            b = P;
    }
    var c = P;
    P = b;
    try {
        return a();
    } finally{
        P = c;
    }
};
exports.unstable_pauseExecution = function() {
};
exports.unstable_requestPaint = W;
exports.unstable_runWithPriority = function(a, b) {
    switch(a){
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            break;
        default:
            a = 3;
    }
    var c = P;
    P = a;
    try {
        return b();
    } finally{
        P = c;
    }
};
exports.unstable_scheduleCallback = function(a, b, c) {
    var d = exports.unstable_now();
    "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
    switch(a){
        case 1:
            var e = -1;
            break;
        case 2:
            e = 250;
            break;
        case 5:
            e = 1073741823;
            break;
        case 4:
            e = 10000;
            break;
        default:
            e = 5000;
    }
    e = c + e;
    a = {
        id: N++,
        callback: b,
        priorityLevel: a,
        startTime: c,
        expirationTime: e,
        sortIndex: -1
    };
    c > d ? (a.sortIndex = c, H(M, a), null === J(L) && a === J(M) && (S ? h() : S = !0, g(U, c - d))) : (a.sortIndex = e, H(L, a), R || Q || (R = !0, f(V)));
    return a;
};
exports.unstable_wrapCallback = function(a) {
    var b = P;
    return function() {
        var c = P;
        P = b;
        try {
            return a.apply(this, arguments);
        } finally{
            P = c;
        }
    };
};

},{}],"5IxFy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SetCanvasSize", ()=>SetCanvasSize
);
parcelHelpers.export(exports, "Game", ()=>game
);
/* -------------------- Game State ----------------------- */ /*
 * new State_() - Construct new state
 *  [Constructor]
 *    init   ()          - Run every time the state is swapped to.
 *  [Useful]
 *    click  (evt)       - When the user clicks the state
 *    update (dt, input) - Run before rendering. Use for logic.
 *                         IMPORTANT: return true if you don't want to re-render
 *    render (context)   - Run after  update.    Use for graphics
 */ parcelHelpers.export(exports, "State", ()=>State
);
parcelHelpers.export(exports, "Entity", ()=>Entity
);
/* -------------------- Game Component -------------------- */ /*
 * new Component(entity) - Construct new component on an entity
 *  [Static Properties]
 *    name             - Name of the component
 *  [Useful]
 *    update (dt)      - Update component (if applicable)
 *    render (context) - Render component (if applicable)
 *
 * Component.create(name, prototype, static[, force])
 *    - Extend and register by name. Force to override another component
 */ parcelHelpers.export(exports, "Component", ()=>Component
);
/* -------------------- Typical Components --------------- */ parcelHelpers.export(exports, "ImageComponent", ()=>ImageComponent
);
parcelHelpers.export(exports, "BoxComponent", ()=>BoxComponent
);
parcelHelpers.export(exports, "TextComponent", ()=>TextComponent
);
parcelHelpers.export(exports, "BehaviorComponent", ()=>BehaviorComponent
);
/* -------------------- Helper functions ----------------- */ /*
 * Juicy.rand([min, ] max) - Return a random int between [min, max)
 */ parcelHelpers.export(exports, "rand", ()=>rand
);
parcelHelpers.export(exports, "Sound", ()=>sounds
);
var _juicySound = require("./juicy.sound");
/* Passthrough exports */ var _juicyPoint = require("./juicy.point");
parcelHelpers.exportAll(_juicyPoint, exports);
/* -------------------- Animation frames ----------------- */ window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
const PIXEL_RATIO = window.devicePixelRatio;
function SetCanvasSize(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
// canvas.getContext('2d')?.scale(PIXEL_RATIO, PIXEL_RATIO);
}
class Game {
    constructor(){
        this.scale = new _juicyPoint.Point(1);
        this.mouse = new _juicyPoint.Point();
        this.running = false;
        this.lastTime = 0;
        // For going slow
        this.timeScale = 1;
        this.time = 0;
        this.context = null;
        this.clearColor = 'white';
        this.size = new _juicyPoint.Point();
        this.keyState = {
        };
        this.listener = {
        };
        this.fps = 0;
        this.fpsAlpha = 0.95;
        this.singletons = {
        };
        this.afterRenderCallbacks = [];
        this.updateFn = ()=>this.update()
        ;
    }
    init(settings) {
        const { canvas , clearColor , keys , width , height , scale ,  } = settings;
        if (clearColor) this.clearColor = clearColor;
        this.size = new _juicyPoint.Point(width, height);
        this.scale = new _juicyPoint.Point(scale || 1);
        this._state = new State();
        let canv;
        if (canvas instanceof HTMLCanvasElement) canv = canvas;
        else if (canvas) {
            const element = document.getElementById(canvas);
            if (element instanceof HTMLCanvasElement) canv = element;
            else throw Error(`Canvas element with id ${canvas} not found.`);
        } else {
            canv = document.createElement('canvas');
            canv.getContext('2d').imageSmoothingEnabled = false;
        }
        this.setCanvas(canv);
        // document hooks
        document.onkeydown = (evt)=>{
            this.keyState[evt.key] = true;
            this.trigger(`keyDown_${evt.key}`, evt);
        };
        document.onkeyup = (evt)=>{
            this.keyState[evt.key] = false;
            this.trigger('keypress', evt);
            this.trigger(`key_${evt.key}`, evt);
        };
        return this; // Enable chaining
    }
    singleton(constructor) {
        if (!this.singletons[constructor.name]) this.singletons[constructor.name] = new constructor();
        return this.singletons[constructor.name];
    }
    clear() {
        for(const action in this.listener)document.removeEventListener(action, this.listener[action]);
        this.listener = {
        };
    }
    setDebug(debug) {
        this.debug = debug !== null && debug !== void 0 ? debug : undefined;
        return this; // Enable chaining
    }
    setCanvas(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        canvas.style.width = `${this.scale.x * this.size.x}px`;
        canvas.style.height = `${this.scale.y * this.size.y}px`;
        SetCanvasSize(this.canvas, this.size.x, this.size.y);
        let startDrag = [];
        let dragging = [];
        document.onmousedown = (evt)=>{
            this.triggerAtPos('mousedown', evt);
            if (!startDrag[evt.button]) startDrag[evt.button] = evt;
        };
        document.onmouseup = (evt)=>{
            this.triggerAtPos(`mouseup`, evt);
            if (!startDrag[evt.button]) return;
            if (!dragging[evt.button]) this.triggerAtPos('click', evt);
            else this.triggerAtPos('dragend', evt);
            startDrag[evt.button] = undefined;
            dragging[evt.button] = false;
        };
        document.onmousemove = (evt)=>{
            this.triggerAtPos('mousemove', evt);
            this.mouse = this.getCanvasCoords(evt);
            startDrag.forEach((start, button)=>{
                if (dragging[button]) this.triggerAtPos('drag', evt);
                else if (start) {
                    var startPos = this.getCanvasCoords(start);
                    var endPos = this.getCanvasCoords(evt);
                    if (startPos.sub(endPos).length() >= 5) {
                        this.triggerAtPos('dragstart', start);
                        dragging[button] = true;
                    }
                }
            });
        };
        document.oncontextmenu = (evt)=>{
            evt.preventDefault();
        };
        this.resize();
        return this; // Enable chaining
    }
    getCanvasCoords(evt) {
        if (!this.canvas) throw Error('Game was not properly initialized - canvas is unavailable');
        const canvasRect = this.canvas.getBoundingClientRect();
        let mx = Math.min(1, Math.max(0, (evt.clientX - canvasRect.left) / canvasRect.width));
        let my = Math.min(1, Math.max(0, (evt.clientY - canvasRect.top) / canvasRect.height));
        return new _juicyPoint.Point(mx, my).mult(this.size);
    }
    resize() {
        if (!this.canvas) throw Error('Game was not properly initialized - canvas is unavailable');
        // Make sure we re-render
        if (this.state) this.state.hasRendered = false;
        return this; // Enable chaining
    }
    getTime() {
        return this.time;
    }
    keyDown(key) {
        var _a;
        if (typeof key === 'string') return (_a = this.keyState[key]) !== null && _a !== void 0 ? _a : false;
        else return key.some((k)=>this.keyDown(k)
        );
    }
    trigger(evt, ...data) {
        const state = this.state;
        if (state && state[evt]) state[evt](...data);
    }
    triggerAtPos(name, evt) {
        this.trigger(`${name}_${evt.button}`, this.getCanvasCoords(evt), evt);
        if (evt.button === 0) this.trigger(name, this.getCanvasCoords(evt), evt);
    }
    on(action, keys, callback) {
        if (action === 'key') {
            if (typeof keys !== 'object') keys = [
                keys
            ];
            for(let i = 0; i < keys.length; i++){
                const key = keys[i];
                this.state['key_' + key] = callback;
            }
        } else {
            callback = keys;
            if (this.listener[action]) document.removeEventListener(action, this.listener[action]);
            this.listener[action] = callback;
            document.addEventListener(action, this.listener[action]);
        }
        return this; // Enable chaining
    }
    get state() {
        return this._state;
    }
    setState(state) {
        this.clear();
        this._state = state;
        this.state.game = this;
        this.state.init();
        this.state.hasRendered = false;
        return this; // Enable chaining
    }
    update() {
        if (!this.running) return;
        requestAnimationFrame(this.updateFn);
        const nextTime = new Date().getTime();
        if (this.debug && nextTime !== this.lastTime) {
            var fps = 1000 / (nextTime - this.lastTime);
            this.fps = this.fpsAlpha * this.fps + (1 - this.fpsAlpha) * fps;
            this.debug.innerHTML = 'FPS: ' + Math.floor(this.fps);
        }
        const dt = this.timeStep ? this.timeStep : this.timeScale * (nextTime - this.lastTime) / 1000;
        this.timeStep = undefined;
        if (dt > 0.2) {
            this.lastTime = nextTime;
            return;
        }
        try {
            this.time += dt;
            const updated = !this.state.update(dt) || this.state.updated;
            this.state.updated = false;
            this.lastTime = nextTime;
            if (updated || !this.state.hasRendered) {
                this.render();
                this.state.hasRendered = true;
            }
        } catch (e) {
            console.error(e);
            this.pause();
        }
    }
    render() {
        var _a;
        const { context , canvas  } = this;
        if (!context || !canvas) {
            this.running = false;
            throw Error('Game was not properly initialized - canvas is unavailable');
        }
        context.save();
        if (!this.state.stopClear) {
            context.fillStyle = (_a = this.state.clearColor) !== null && _a !== void 0 ? _a : this.clearColor;
            context.fillRect(0, 0, this.size.x, this.size.y);
        }
        this.state.render(context);
        context.restore();
        this.afterRenderCallbacks.forEach((callback)=>callback(canvas)
        );
        return this; // Enable chaining
    }
    afterRender(callback) {
        this.afterRenderCallbacks.push(callback);
    }
    run() {
        this.running = true;
        this.lastTime = new Date().getTime();
        this.update();
        return this; // Enable chaining
    }
    pause() {
        this.running = false;
    }
    isRunning() {
        return this.running;
    }
}
// Game singleton
let game;
if (window.__juicy__game) game = window.__juicy__game;
else game = window.__juicy__game = new Game();
class State {
    constructor(){
        /** @internal */ this.hasRendered = false;
        this.updated = false;
        this.stopClear = false;
        this.game = game;
        this.entities = [];
    }
    init() {
    }
    update(dt) {
        this.entities.sort((a, b)=>a.priority - b.priority
        );
        this.entities.forEach((e)=>{
            if (!e.parent) e.update(dt);
        });
        return false;
    }
    render(context) {
        this.entities.sort((a, b)=>a.priority - b.priority
        );
        this.entities.forEach((e)=>{
            if (!e.parent) e.render(context);
        });
    }
    add(e) {
        this.entities.push(e);
    }
    get(name) {
        return this.entities.find((e)=>e.name === name
        );
    }
    remove(nameOrEntity) {
        if (typeof nameOrEntity === 'string') this.entities = this.entities.filter((e)=>e.name !== nameOrEntity
        );
        else this.entities = this.entities.filter((e)=>e !== nameOrEntity
        );
    }
    mousedown(pos) {
        this.entities.forEach((e)=>{
            if (e.contains(pos)) {
                e.active = true;
                e.mousedown(pos);
            }
        });
    }
    mouseup(pos) {
        this.entities.forEach((e)=>{
            if (e.contains(pos)) e.mouseup(pos);
            e.active = false;
        });
    }
}
class Entity {
    constructor(state, components, name){
        this.props = {
        };
        this.visible = true;
        this.position = new _juicyPoint.Point();
        this.scale = new _juicyPoint.Point(1);
        this.priority = 0;
        this.width = 0;
        this.height = 0;
        this.active = false;
        this.components = [];
        this.updated = [];
        this.children = [];
        this.name = name;
        this.state = state;
        components = (components !== null && components !== void 0 ? components : []).concat(this.initialComponents());
        components.forEach((c)=>this.addComponent(c)
        );
        state.add(this);
        this.init();
    }
    init() {
    }
    initialComponents() {
        return [];
    }
    globalPosition() {
        const position = this.position.copy();
        if (this.parent) return position.mult(this.parent.globalScale()).add(this.parent.globalPosition());
        return position;
    }
    globalScale() {
        const scale = this.scale.copy();
        if (this.parent) return scale.mult(this.parent.globalScale());
        return scale;
    }
    contains(point) {
        point = point.copy().sub(this.globalPosition());
        return point.x >= -this.width / 2 && point.y >= -this.height / 2 && point.x <= this.width / 2 && point.y <= this.height / 2;
    }
    distance(other) {
        if (other instanceof Entity) other = other.globalPosition();
        return this.globalPosition().sub(other).length();
    }
    collidesWith(other) {
        // TODO account for parent entities
        const otherBottomRight = other.position.add(new _juicyPoint.Point(other.width, other.height));
        const bottomRight = this.position.add(new _juicyPoint.Point(this.width, this.height));
        return otherBottomRight.x >= this.position.x && otherBottomRight.y >= this.position.y && other.position.x <= bottomRight.x && other.position.y <= bottomRight.y;
    }
    addComponent(c) {
        if (typeof c === 'function') {
            c = new c();
            c.init(this);
        }
        if (c.entity) throw `Component already has an entity`;
        c.entity = this;
        this.components.push(c);
        this.updated.push(false);
        return c;
    }
    add(constructor) {
        return this.addComponent(constructor);
    }
    remove(constructor) {
        this.components = this.components.filter((c)=>c.__proto__.constructor.name !== constructor.name
        );
    }
    get(constructor) {
        for(let i = 0; i < this.components.length; i++){
            if (this.components[i].__proto__.constructor.name === constructor.name) return this.components[i];
        }
    }
    addChild(child) {
        child.parent = this;
        this.children.push(child);
        return child;
    }
    mousedown(pos) {
        this.components.forEach((c)=>c.mousedown(pos)
        );
    }
    mouseup(pos) {
        this.components.forEach((c)=>c.mouseup(pos)
        );
    }
    update(dt, constructor) {
        var _a, _b;
        if (constructor) {
            for(let i = 0; i < this.components.length; i++)if (this.components[i].__proto__.name === constructor.name) {
                if (!this.updated[i]) {
                    if ((_a = this.components[i]) === null || _a === void 0 ? void 0 : _a.active) this.components[i].update(dt, this.state.game);
                    this.updated[i] = true;
                }
                break;
            }
        } else {
            this.updated.fill(false);
            for(let i = 0; i < this.components.length; i++)if (!this.updated[i]) {
                if ((_b = this.components[i]) === null || _b === void 0 ? void 0 : _b.active) this.components[i].update(dt, this.state.game);
                this.updated[i] = true;
            }
            this.children.forEach((child)=>child.update(dt)
            );
        }
    }
    render(context) {
        context.save();
        context.translate(Math.floor(this.position.x - this.width / 2), Math.floor(this.position.y - this.height / 2));
        context.scale(this.scale.x, this.scale.y);
        let renderArgs;
        if (arguments.length === 1) renderArgs = [
            context,
            0,
            0,
            this.width,
            this.height
        ];
        else if (arguments.length === 3) {
            renderArgs = Array.prototype.slice.call(arguments);
            renderArgs.push(this.width, this.height);
        } else if (arguments.length === 5) renderArgs = Array.prototype.slice.call(arguments);
        else throw Error(`${arguments.length} arguments passed to Entity.render, when only 1 or 5 are supported`);
        this.components.forEach((c)=>{
            if (c.active) c.render.apply(c, renderArgs);
        });
        this.children.forEach((child)=>child.render(context)
        );
        context.restore();
    }
}
class Component {
    constructor(){
        this.active = true;
    }
    isActive() {
        return this.active;
    }
    setActive(active) {
        this.active = active;
        return this;
    }
    init(e) {
    }
    mousedown(pos) {
    }
    mouseup(pos) {
    }
    update(dt, game) {
    }
    render(context, x, y, w, h) {
    }
}
class ImageComponent extends Component {
    constructor(){
        super(...arguments);
        this.opacity = 1;
        this.image = new Image();
    }
    init(entity) {
        this.opacity = 1;
        this.image.onload = ()=>{
            if (!entity.width && !entity.height) {
                entity.width = this.image.width;
                entity.height = this.image.height;
            }
            if (this.tint) this.setTint(this.tint);
            if (this.onload) this.onload(this);
            entity.state.updated = true;
        };
        this.image.onerror = ()=>{
            this.image = new Image();
        };
    }
    setTint(tint) {
        // TODO glean alpha of tint
        this.tint = tint;
        if (this.image.complete) {
            // Apply tint
            this.canvas = this.canvas || document.createElement('canvas');
            SetCanvasSize(this.canvas, this.image.width, this.image.height);
            const context = this.canvas.getContext('2d');
            if (!context) throw Error('Failed getting image context');
            context.fillStyle = this.tint;
            context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            // destination atop makes a result with an alpha channel identical to fg,
            // but with all pixels retaining their original color *as far as I can tell*
            context.globalCompositeOperation = "destination-atop";
            context.globalAlpha = 0.75;
            context.drawImage(this.image, 0, 0);
            context.globalAlpha = 1;
        }
        return this; // Enable chaining
    }
    setImage(url) {
        this.image.src = url;
        return this; // Enable chaining
    }
    render(context, x, y, w, h) {
        const originalAlpha = context.globalAlpha;
        context.globalAlpha = this.opacity;
        context.drawImage(this.image, x, y, w, h);
        if (this.tint && this.canvas) context.drawImage(this.canvas, x, y, w, h);
        // Restore original global alpha
        context.globalAlpha = originalAlpha;
    }
}
class BoxComponent extends Component {
    constructor(){
        super(...arguments);
        this.fillStyle = 'white';
        this.lineWidth = 0;
        this.strokeStyle = 'white';
    }
    set(config) {
        Object.assign(this, config);
        return this;
    }
    render(context, x, y, w, h) {
        context.fillStyle = this.fillStyle;
        context.fillRect(x, y, w, h);
        if (this.lineWidth !== 0) {
            context.lineWidth = this.lineWidth;
            context.strokeStyle = this.strokeStyle;
            context.strokeRect(x, y, w, h);
        }
    }
}
class TextComponent extends Component {
    constructor(){
        super();
        this.font = 'Arial';
        this.size = 32;
        this.text = '';
        this.fillStyle = 'white';
        this.padding = new _juicyPoint.Point();
        this.opacity = 1;
        this.ready = false;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
    }
    set(config) {
        const entity = this.entity;
        if (!entity) throw Error('Setting text info before an entity is assign');
        // Set attributes
        Object.assign(this, config);
        if (config.font || config.size || config.text || config.fillStyle || config.padding) {
            const font = this.getFont();
            const fonts = document.fonts;
            if (fonts && !fonts.check(font)) return fonts.load(font).then(()=>{
                this.renderOffscreen();
                this.ready = true;
            });
            else {
                this.renderOffscreen();
                this.ready = true;
                return Promise.resolve();
            }
        } else return Promise.resolve();
    }
    getFont() {
        return `${this.size}px ${this.font}`;
    }
    measure() {
        this.context.font = this.getFont();
        const size = this.context.measureText(this.text);
        return new _juicyPoint.Point(Math.ceil(size.width), Math.ceil(this.size + 2));
    }
    renderOffscreen() {
        // Measure the text size
        const entity = this.entity;
        const context = this.context;
        const canvas = this.canvas;
        const size = this.measure();
        const { fillStyle , text , padding  } = this;
        // Resize canvas
        entity.width = size.x + padding.x * 2;
        entity.height = size.y + padding.y * 2;
        SetCanvasSize(canvas, entity.width, entity.height);
        // Draw text
        context.textBaseline = 'top';
        context.font = this.getFont();
        context.fillStyle = fillStyle;
        context.fillText(text, padding.x, padding.y);
    }
    render(context, x, y, w, h) {
        if (!this.text) return;
        // Save original alpha
        const originalAlpha = context.globalAlpha;
        context.globalAlpha = this.opacity;
        arguments[0] = this.canvas;
        context.drawImage(this.canvas, x, y, w, h);
        context.globalAlpha = originalAlpha;
    }
}
class BehaviorComponent extends Component {
    setCallback(callback) {
        this.callback = callback;
        return this; // enable chaining
    }
    update(dt, game1) {
        if (this.callback) this.callback(dt, game1);
    }
}
function rand(min, max) {
    if (max) return Math.floor(Math.random() * (max - min)) + min;
    else return Math.floor(Math.random() * min);
}
const sounds = game.singleton(_juicySound.SoundManager);

},{"./juicy.sound":"h5C6h","./juicy.point":"iUs0I","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"h5C6h":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SoundManager", ()=>SoundManager
);
class MultiSampleSound {
    constructor(props){
        var _a, _b, _c;
        this.elements = [];
        this.index = 0;
        this.volumeModifier = 1;
        this.isSFX = props.isSFX;
        this.loop = (_a = props.loop) !== null && _a !== void 0 ? _a : false;
        this.samples = (_b = props.samples) !== null && _b !== void 0 ? _b : 1;
        this.defaultVolume = (_c = props.volume) !== null && _c !== void 0 ? _c : 1;
        for(var i = 0; i < this.samples; i++){
            var sound = document.createElement('audio');
            sound.volume = this.defaultVolume;
            sound.loop = !!this.loop;
            var source = document.createElement("source");
            source.src = props.src;
            sound.appendChild(source);
            sound.load();
            this.elements.push(sound);
        }
    }
    play() {
        var _a;
        (_a = this.elements[this.index]) === null || _a === void 0 || _a.play();
        this.index = (this.index + 1) % this.elements.length;
    }
    pause() {
        this.elements.forEach((el)=>el.pause()
        );
    }
    stop() {
        this.elements.forEach((el)=>{
            el.pause();
            el.currentTime = 0;
        });
    }
    setVolumeModifier(volumeModifier) {
        this.volumeModifier = volumeModifier;
        this.elements.forEach((el)=>el.volume = this.volumeModifier * this.defaultVolume
        );
    }
}
class SoundManager {
    constructor(){
        var _a, _b;
        this.SFX = {
        };
        this.BGM = {
        };
        this.SFXVolume = parseInt((_a = localStorage.getItem('SFXVolume')) !== null && _a !== void 0 ? _a : '1');
        this.SFXMuted = localStorage.getItem('SFXMuted') === '1';
        this.BGMVolume = parseInt((_b = localStorage.getItem('BGMVolume')) !== null && _b !== void 0 ? _b : '1');
        this.BGMMuted = localStorage.getItem('BGMMuted') === '1';
    }
    MuteMusic() {
        var _a;
        this.BGMMuted = true;
        for(const key in this.BGM)(_a = this.BGM[key]) === null || _a === void 0 || _a.setVolumeModifier(0);
        localStorage.setItem('BGMMuted', '1');
    }
    UnmuteMusic() {
        var _a;
        this.BGMMuted = false;
        for(const key in this.BGM)(_a = this.BGM[key]) === null || _a === void 0 || _a.setVolumeModifier(this.BGMVolume);
        localStorage.setItem('BGMMuted', '0');
    }
    SetMusicVolume(volume) {
        var _a;
        this.BGMVolume = volume;
        for(const key in this.BGM)(_a = this.BGM[key]) === null || _a === void 0 || _a.setVolumeModifier(this.BGMMuted ? 0 : this.BGMVolume);
        localStorage.setItem('BGMVolume', `${this.BGMVolume}`);
    }
    MuteSfx() {
        var _a;
        this.SFXMuted = true;
        for(const key in this.SFX)(_a = this.SFX[key]) === null || _a === void 0 || _a.setVolumeModifier(0);
        localStorage.setItem('SFXMuted', '1');
    }
    UnmuteSfx() {
        var _a;
        this.SFXMuted = false;
        for(const key in this.SFX)(_a = this.SFX[key]) === null || _a === void 0 || _a.setVolumeModifier(this.SFXVolume);
        localStorage.setItem('SFXMuted', '0');
    }
    SetSfxVolume(volume) {
        var _a;
        this.SFXVolume = volume;
        for(const key in this.SFX)(_a = this.SFX[key]) === null || _a === void 0 || _a.setVolumeModifier(this.SFXMuted ? 0 : this.SFXVolume);
        localStorage.setItem('SFXVolume', `${this.SFXVolume}`);
    }
    Play(name) {
        var _a;
        let sound = (_a = this.SFX[name]) !== null && _a !== void 0 ? _a : this.BGM[name];
        sound === null || sound === void 0 || sound.play();
    }
    Pause(name) {
        var _a;
        let sound = (_a = this.SFX[name]) !== null && _a !== void 0 ? _a : this.BGM[name];
        sound === null || sound === void 0 || sound.pause();
    }
    Load(name, properties) {
        var _a, _b;
        if (properties.isSFX) {
            this.SFX[name] = new MultiSampleSound(properties);
            (_a = this.SFX[name]) === null || _a === void 0 || _a.setVolumeModifier(this.SFXMuted ? 0 : this.SFXVolume);
        } else {
            this.BGM[name] = new MultiSampleSound(properties);
            (_b = this.BGM[name]) === null || _b === void 0 || _b.setVolumeModifier(this.BGMMuted ? 0 : this.BGMVolume);
        }
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"iUs0I":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Point", ()=>Point
);
class Point {
    constructor(x = 0, y){
        this.x = x;
        this.y = typeof y === 'number' ? y : x;
    }
    isEqual(other) {
        return this.x === other.x && this.y === other.y;
    }
    copy() {
        return new Point(this.x, this.y);
    }
    add(x, y) {
        if (typeof x === 'number') {
            this.x += x;
            this.y += typeof y === 'number' ? y : x;
        } else {
            this.x += x.x;
            this.y += x.y;
        }
        return this;
    }
    mult(x, y) {
        if (typeof x === 'number') {
            this.x *= x;
            this.y *= typeof y === 'number' ? y : x;
        } else {
            this.x *= x.x;
            this.y *= x.y;
        }
        return this;
    }
    multScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        const length = this.length();
        this.x /= length;
        this.y /= length;
        return this;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9Gsnu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useWindowSize", ()=>useWindowSize
);
parcelHelpers.export(exports, "useAnimationFrame", ()=>useAnimationFrame
);
var _react = require("react");
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = _react.useState({
        width: undefined,
        height: undefined
    });
    _react.useEffect(()=>{
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return ()=>window.removeEventListener("resize", handleResize)
        ;
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}
const useAnimationFrame = (callback)=>{
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = _react.useRef();
    const previousTimeRef = _react.useRef();
    const animate = (time)=>{
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current;
            callback(deltaTime);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };
    _react.useEffect(()=>{
        requestRef.current = requestAnimationFrame(animate);
        return ()=>{
            if (requestRef.current !== undefined) cancelAnimationFrame(requestRef.current);
        };
    }, []); // Make sure the effect runs only once
};

},{"react":"21dqq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fZou4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DefaultFont", ()=>DefaultFont
);
parcelHelpers.export(exports, "Keys", ()=>Keys
);
parcelHelpers.export(exports, "Keyboard", ()=>Keyboard
);
parcelHelpers.export(exports, "KeyMapping", ()=>KeyMapping
);
const DefaultFont = 'VT323';
var Keys;
(function(Keys1) {
    Keys1["LEFT"] = "LEFT";
    Keys1["UP"] = "UP";
    Keys1["RIGHT"] = "RIGHT";
    Keys1["DOWN"] = "DOWN";
})(Keys || (Keys = {
}));
var Keyboard;
(function(Keyboard1) {
    Keyboard1[Keyboard1["LEFT"] = 37] = "LEFT";
    Keyboard1[Keyboard1["UP"] = 38] = "UP";
    Keyboard1[Keyboard1["RIGHT"] = 39] = "RIGHT";
    Keyboard1[Keyboard1["DOWN"] = 40] = "DOWN";
    Keyboard1[Keyboard1["A"] = 90] = "A";
    Keyboard1[Keyboard1["B"] = 88] = "B";
    Keyboard1[Keyboard1["START"] = 13] = "START";
    Keyboard1[Keyboard1["SELECT"] = 8] = "SELECT";
})(Keyboard || (Keyboard = {
}));
const KeyMapping = {
    [Keys.LEFT]: Keyboard.LEFT,
    [Keys.UP]: Keyboard.UP,
    [Keys.RIGHT]: Keyboard.RIGHT,
    [Keys.DOWN]: Keyboard.DOWN
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6WIln":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LoadingScreen", ()=>LoadingScreen
);
var _juicy = require("../../lib/juicy");
var _cityBuilder = require("./city-builder");
class LoadingScreen extends _juicy.State {
    constructor(){
        super();
        const textEntity = new _juicy.Entity(this);
        const text = textEntity.add(_juicy.TextComponent);
        text.set({
            text: 'Loading...',
            size: 36,
            fillStyle: 'red'
        }).then(()=>{
            textEntity.position.x = (_juicy.Game.size.x - textEntity.width) / 2;
            textEntity.position.y = 20;
        });
    }
    update(dt) {
        super.update(dt);
        this.game.setState(new _cityBuilder.CityBuilderState());
    }
    render(context) {
        super.render(context);
    }
}

},{"../../lib/juicy":"5IxFy","./city-builder":"8RjxF","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8RjxF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CityBuilderState", ()=>CityBuilderState
);
var _juicy = require("../../lib/juicy");
var _camera = require("../components/camera");
var _collector = require("../components/collector");
var _inventory = require("../components/inventory");
var _hex = require("../components/hex");
var _resource = require("../components/resource");
var _selectable = require("../components/selectable");
var _sprite = require("../components/sprite");
var _unit = require("../components/unit");
var _dialogBox = require("../entities/dialog-box");
var _resourceDisplay = require("../entities/resource-display");
const normal_hex = require("../../img/hex_128x148.png");
const forest_hex = require("../../img/hex_128x148_forest.png");
const town_center_img = require("../../img/town_center.png");
class CityBuilderState extends _juicy.State {
    constructor(){
        super();
        this.hexes = [];
        this.units = [];
        this.resources = [];
        this.worldMouse = new _juicy.Point();
        this.zoom = 1.5;
        this.inventory = new _inventory.Inventory();
        this.dialogBox = new _dialogBox.DialogBox(this);
        this.resourceDisplay = new _resourceDisplay.ResourceDisplay(this, this.inventory);
        this.clearColor = "#449944";
        // Using 'odd-r' Offset Coordinate system.
        // E.g. First (0th) row of hexes are aligned edge to edge horizontally
        // Then, odd (1,3,5,etc.) rows are offset by 1/2 the width. All rows offset by 3/4 height.
        // More on this system here: https://www.redblobgames.com/grids/hexagons/
        for(let x = -15; x < 15; x++)for(let y = -15; y < 15; y++){
            const hexEntity = new _juicy.Entity(this);
            const sprite = hexEntity.add(_sprite.SpriteComponent);
            sprite.setSize(128, 148);
            sprite.setImage(normal_hex);
            sprite.setActive(true);
            hexEntity.width = _hex.HexComponent.width;
            hexEntity.height = _hex.HexComponent.height;
            var xOffset = x * hexEntity.width;
            const yOffset = y * hexEntity.height * 0.75;
            if (y % 2 != 0) xOffset = x * hexEntity.width - hexEntity.width / 2;
            hexEntity.position = new _juicy.Point(xOffset, yOffset);
            this.hexes.push(hexEntity);
        }
        for(let i = 0; i < 10; i++){
            const unit = new _juicy.Entity(this);
            unit.add(_juicy.BoxComponent).set({
                fillStyle: "#666"
            });
            unit.width = 50;
            unit.height = 50;
            unit.position = this.game.size.copy().mult(Math.random() - 0.5, Math.random() - 0.5).mult(1 / 3);
            unit.add(_unit.UnitComponent);
            this.units.push(unit.add(_selectable.Selectable));
        }
        for(let i1 = 0; i1 < 10; i1++){
            const unit = new _juicy.Entity(this);
            const sprite = unit.add(_sprite.SpriteComponent);
            sprite.setImage(forest_hex);
            sprite.setSize(128, 148);
            sprite.runAnimation({
                name: "deselect",
                sheet: [
                    0
                ],
                frameTime: 0,
                repeat: true
            });
            unit.position = this.game.size.copy().mult(Math.random() * 0.9, Math.random() * 0.9);
            unit.position.x = 128 * Math.floor(Math.random() * 20 - 10);
            const y = Math.floor(Math.random() * 12 - 6);
            unit.position.y = 111 * y;
            if (y % 2 != 0) unit.position.x += 64;
            this.resources.push(unit.add(_selectable.Selectable));
            unit.add(_resource.ResourceNode);
        }
        const townCenter = new _juicy.Entity(this);
        const sprite = townCenter.add(_sprite.SpriteComponent);
        sprite.setImage(town_center_img);
        sprite.setSize(128, 148);
        sprite.runAnimation({
            name: "base",
            sheet: [
                0
            ],
            frameTime: 0,
            repeat: true
        });
        townCenter.add(_collector.Collector).inventory = this.inventory;
        townCenter.add(_selectable.Selectable);
        this.camera = new _juicy.Entity(this);
        this.camera.add(_camera.Camera).target = townCenter;
        // Reverse-compute Hex coordinate from worldPosition
        this.hexes.forEach((h)=>{
            const hexFromWorld = _hex.Hex.pointToHex(this.toWorldPos(h.position));
            var hex = h.add(_hex.HexComponent);
            hex.hex = hexFromWorld;
        });
        this.dialogBox.width = 800;
        this.dialogBox.height = this.game.size.y;
        this.dialogBox.position.x = this.game.size.x - this.dialogBox.width / 2;
        this.dialogBox.position.y = this.game.size.y / 2;
        this.remove(this.dialogBox);
        this.resourceDisplay.width = this.game.size.x - this.dialogBox.width;
        this.resourceDisplay.height = 128;
        this.resourceDisplay.position.x = this.resourceDisplay.width / 2;
        this.resourceDisplay.position.y = this.resourceDisplay.height / 2;
        this.remove(this.resourceDisplay);
    }
    toWorldPos(pos) {
        const result = pos.copy();
        result.x += this.dialogBox.width / 2;
        if (result.x >= this.dialogBox.position.x + this.dialogBox.width / 2) result.x = this.dialogBox.position.x + this.dialogBox.width / 2;
        result.add(this.game.size.copy().mult(-0.5));
        result.mult(1 / this.zoom);
        result.add(this.camera.position);
        return result;
    }
    fromWorldPos(pos) {
        const result = pos.copy();
        result.sub(this.camera.position);
        result.mult(this.zoom);
        result.sub(this.game.size.copy().mult(-0.5));
        result.x -= this.dialogBox.width / 2;
        return result;
    }
    mousewheel({ deltaY  }) {
        this.zoom -= deltaY / 500;
        this.zoom = Math.min(Math.max(this.zoom, 1), 2.5);
    }
    click_0(_, { shiftKey  }) {
        // Use find to early out if something returns true;
        let somethingSelected = false;
        this.entities.forEach((entity)=>{
            const selectable = entity.get(_selectable.Selectable);
            if (!selectable) return;
            if (selectable.hovering) {
                if (shiftKey && selectable.selected) selectable.deselect();
                else if (!somethingSelected) {
                    selectable.select();
                    somethingSelected = true;
                }
            } else if (!shiftKey) selectable.deselect();
        });
    }
    mouseup_2(pos) {
        const hexToCheck = this.hexes.filter((h)=>{
            var _a;
            _a = h.get(_hex.HexComponent), _a.hex, _hex.Hex.pointToHex(this.toWorldPos(pos));
        });
        const selected1 = this.units.filter((s)=>s.selected
        );
        const resource2 = this.resources.find((s)=>s.hovering
        );
        const resource = resource2 === null || resource2 === void 0 ? void 0 : resource2.entity.get(_resource.ResourceNode);
        let dest = resource ? resource.entity.position.copy() : this.toWorldPos(pos);
        selected1.forEach((selected)=>{
            const unit = selected.entity.get(_unit.UnitComponent);
            if (!unit) return;
            if (resource) unit.setGoal({
                type: "Harvest",
                resource
            });
            else unit.setGoal({
                type: "Move",
                dest
            });
        });
    }
    dragstart_0(pos, { shiftKey  }) {
        this.dragStartPoint = this.toWorldPos(pos);
        if (!shiftKey) this.entities.forEach((e)=>{
            var _a;
            return (_a = e.get(_selectable.Selectable)) === null || _a === void 0 ? void 0 : _a.deselect();
        });
    }
    dragend_0(pos) {
        if (this.dragStartPoint) {
            const { x: x1 , y: y1  } = this.dragStartPoint;
            const { x: x2 , y: y2  } = this.toWorldPos(pos);
            const minX = Math.min(x1, x2);
            const maxX = Math.max(x1, x2);
            const minY = Math.min(y1, y2);
            const maxY = Math.max(y1, y2);
            this.units.forEach((selectable)=>{
                const unit = selectable.entity;
                const hovering = unit.position.x - unit.width / 2 >= minX && unit.position.y - unit.height / 2 >= minY && unit.position.x + unit.width / 2 <= maxX && unit.position.y + unit.height / 2 <= maxY;
                if (hovering) selectable.select();
            });
        }
        this.dragStartPoint = undefined;
    }
    update(dt) {
        super.update(dt);
        const shiftKey = this.game.keyDown("Shift");
        const worldMouse = this.toWorldPos(this.game.mouse);
        this.entities.forEach((entity)=>{
            const selectable = entity.get(_selectable.Selectable);
            if (selectable) selectable.hovering = entity.contains(worldMouse);
        });
        if (this.dragStartPoint) {
            const { x: x1 , y: y1  } = this.dragStartPoint;
            const { x: x2 , y: y2  } = worldMouse;
            const minX = Math.min(x1, x2);
            const maxX = Math.max(x1, x2);
            const minY = Math.min(y1, y2);
            const maxY = Math.max(y1, y2);
            this.units.forEach((selectable)=>{
                const unit = selectable.entity;
                selectable.hovering = unit.position.x - unit.width / 2 >= minX && unit.position.y - unit.height / 2 >= minY && unit.position.x + unit.width / 2 <= maxX && unit.position.y + unit.height / 2 <= maxY;
            });
        }
        const selected = this.entities.filter((entity)=>{
            const selectable = entity.get(_selectable.Selectable);
            return selectable && selectable.selected;
        });
        this.dialogBox.setSelected(selected);
        this.dialogBox.update(dt);
        this.resourceDisplay.update(dt);
    }
    keypress(key) {
        console.log(key);
    }
    render(context) {
        context.save();
        // Move over a little bit so that the non-sidebar is centered
        context.translate(-this.dialogBox.width / 2, 0);
        context.translate(this.game.size.x / 2, this.game.size.y / 2);
        context.scale(this.zoom, this.zoom);
        context.translate(-this.camera.position.x, -this.camera.position.y);
        super.render(context);
        // Cool lil unit selector
        if (this.dragStartPoint) {
            const { x: x1 , y: y1  } = this.dragStartPoint;
            const { x: x2 , y: y2  } = this.toWorldPos(this.game.mouse);
            context.fillStyle = "rgba(177, 177, 177, 0.25)";
            context.fillRect(x1, y1, x2 - x1, y2 - y1);
            context.strokeStyle = "rgba(61, 61, 61, 1)";
            context.lineWidth = 5;
            context.strokeRect(x1, y1, x2 - x1, y2 - y1);
        }
        context.restore();
        this.dialogBox.render(context);
        this.resourceDisplay.render(context);
    }
}

},{"../../lib/juicy":"5IxFy","../components/camera":"jCOlo","../components/collector":"jWGsH","../components/inventory":"84SeW","../components/hex":"4Wv44","../components/resource":"jy870","../components/selectable":"exPxd","../components/sprite":"d8jFP","../components/unit":"8vBnb","../entities/dialog-box":"wRxmz","../entities/resource-display":"l96xe","../../img/hex_128x148.png":"fdjdh","../../img/hex_128x148_forest.png":"3Rb3d","../../img/town_center.png":"cjKHC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jCOlo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Camera", ()=>Camera
);
var _juicy = require("../../lib/juicy");
class Camera extends _juicy.Component {
    constructor(){
        super();
        this.easing = 500;
        this.maxEasing = 200;
        this.setDefaultEasing();
    }
    follow(target) {
        this.target = target;
        return this; // enable chaining
    }
    setDefaultEasing() {
        this.easing = 100;
        this.maxEasing = 300;
        return this; // enable chaining
    }
    // Set the easing weight. 1 is instant snap, 0 never moves.
    setEasing(weight) {
        this.easing = weight;
        return this; // enable chaining
    }
    getTargetPosition() {
        if (!this.target) return this.entity.position.copy();
        const pos = new _juicy.Point(this.target.position.x, this.target.position.y);
        return pos;
    }
    snapCamera() {
        this.entity.position = this.getTargetPosition();
    }
    update(dt) {
        if (!this.target) return;
        const { x , y  } = this.getTargetPosition();
        const dx = x - this.entity.position.x;
        const dy = y - this.entity.position.y;
        let moveX = dx * 0.05;
        let moveY = dy * 0.05;
        this.entity.position.add(moveX, moveY);
    }
}

},{"../../lib/juicy":"5IxFy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jWGsH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Collector", ()=>Collector
);
var _juicy = require("../../lib/juicy");
var _inventory = require("./inventory");
var _resource = require("./resource");
class Collector extends _juicy.Component {
    constructor(){
        super(...arguments);
        this.accepted = [
            _resource.ResourceType.Wood
        ];
        // TODO make sure this gets replaced by the creator
        this.inventory = new _inventory.Inventory();
    }
}

},{"../../lib/juicy":"5IxFy","./inventory":"84SeW","./resource":"jy870","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"84SeW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Inventory", ()=>Inventory
);
var _juicy = require("../../lib/juicy");
class Inventory extends _juicy.Component {
    constructor(){
        super(...arguments);
        this.stacks = {
        };
    }
    toString() {
        let result = [];
        this.forEach((type, amt)=>result.push(`${type}: ${amt}`)
        );
        if (result.length === 0) return [
            'Nothing'
        ];
        return result;
    }
    add(stack, amount) {
        var _a, _b;
        if (typeof stack === 'string') {
            const type = stack;
            this.stacks[type] = ((_a = this.stacks[type]) !== null && _a !== void 0 ? _a : 0) + amount;
        } else {
            const type = stack.type;
            amount = stack.amount;
            this.stacks[type] = ((_b = this.stacks[type]) !== null && _b !== void 0 ? _b : 0) + amount;
        }
    }
    get(type) {
        var _a;
        return (_a = this.stacks[type]) !== null && _a !== void 0 ? _a : 0;
    }
    clear() {
        this.stacks = {
        };
    }
    forEach(callback) {
        for(const type in this.stacks)callback(type, this.stacks[type]);
    }
    countAll() {
        let result = 0;
        this.forEach((_, amt)=>result += amt
        );
        return result;
    }
    isFull() {
        return this.maxSize && this.countAll() >= this.maxSize;
    }
}

},{"../../lib/juicy":"5IxFy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jy870":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ResourceType", ()=>ResourceType
);
parcelHelpers.export(exports, "ResourceNode", ()=>ResourceNode
);
var _juicy = require("../../lib/juicy");
var ResourceType;
(function(ResourceType1) {
    ResourceType1["Wood"] = "Wood";
})(ResourceType || (ResourceType = {
}));
class ResourceNode extends _juicy.Component {
    constructor(){
        super(...arguments);
        this.name = 'Forest';
        this.available = {
            type: ResourceType.Wood,
            amount: 1000
        };
    }
}

},{"../../lib/juicy":"5IxFy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4Wv44":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Represents a  using Doubled coordinate system in the width dimention
// More about Doubled coordinates here: https://www.redblobgames.com/grids/hexagons/#coordinates-doubled
parcelHelpers.export(exports, "Hex", ()=>Hex
);
/// Represents a Hexagonal shape within a Doubled coordinate system
/// More information here: https://www.redblobgames.com/grids/hexagons/#coordinates-doubled
parcelHelpers.export(exports, "HexComponent", ()=>HexComponent
);
var _juicy = require("../../lib/juicy");
class Hex {
    constructor(row, col){
        this.row = row;
        this.col = col;
    }
    // Allows for conversion to Axial coordinate system and back.
    // Makes algorithms and tranfomations much easier!
    axialRepresentation() {
        const q = (this.col - this.row) / 2;
        const r = this.row;
        return {
            q: q,
            r: r
        };
    }
    allNeighbors() {
        return [
            new Hex(this.row + 2, this.col + 0),
            new Hex(this.row + 1, this.col + 1),
            new Hex(this.row + -1, this.col + 1),
            new Hex(this.row + -2, this.col + 0),
            new Hex(this.row + -1, this.col + -1),
            new Hex(this.row + 1, this.col + -1)
        ];
    }
    distanceTo(other) {
        const dCol = Math.abs(this.col - other.col);
        const dRow = Math.abs(this.row - other.row);
        return dRow + Math.max(0, (dCol - dRow) / 2);
    }
    toPoint() {
        const size = HexComponent.height / 2; // "Size" is essentially the radius of the Hex to its points
        const x = size * Math.sqrt(3) / 2 * this.col;
        const y = size * 1.5 * this.row;
        return new _juicy.Point(x, y);
    }
    static pointToHex(p) {
        // Finds the fractional Axial coordinate
        const size = HexComponent.height / 2;
        const q = (Math.sqrt(3) / 3 * p.x - 1 / 3 * p.y) / size;
        const r = 2 / 3 * p.y / size;
        return Hex.fromAxial(Hex.fractionalRound({
            q,
            r
        }));
    }
    static fromAxial(axial) {
        const col = 2 * axial.q + axial.r;
        const row = axial.r;
        return new Hex(row, col);
    }
    // Interpreted from https://observablehq.com/@jrus/hexround
    // Use lines that are aligned 60 degrees from each other to round fractional points into the right hex
    static fractionalRound(axial) {
        const qGrid = Math.round(axial.q);
        const rGrid = Math.round(axial.r);
        const qRemainder = axial.q - qGrid;
        const rRemainder = axial.r - rGrid;
        if (Math.abs(qRemainder) >= Math.abs(rRemainder)) return {
            q: qGrid + Math.round(qRemainder + 0.5 * rRemainder),
            r: rGrid
        };
        else return {
            q: qGrid,
            r: rGrid + Math.round(rRemainder + 0.5 * qRemainder)
        };
    }
}
class HexComponent extends _juicy.Component {
    constructor(){
        super(...arguments);
        this.hex = new Hex(0, 0);
    }
    update(dt, game) {
    // TODO: update??????
    }
    render(context, x, y, w, h) {
    // TODO: Render?????? 
    }
}
HexComponent.width = 128;
HexComponent.height = 148;

},{"../../lib/juicy":"5IxFy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"exPxd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Selectable", ()=>Selectable
);
var _juicy = require("../../lib/juicy");
class Selectable extends _juicy.Component {
    constructor(){
        super(...arguments);
        this.strokeStyle = '#fff';
        this.hovering = false;
        this.selected = false;
    }
    // update(dt: number, game: typeof Game) {
    //     this.hovering = this.entity.contains(game.mouse);
    // }
    select() {
        this.selected = true;
    }
    deselect() {
        this.selected = false;
    }
    render(context, x, y, w, h) {
        if (this.hovering || this.selected) {
            context.lineWidth = 3;
            context.strokeStyle = this.strokeStyle;
            context.strokeRect(x, y, w, h);
        }
    }
}

},{"../../lib/juicy":"5IxFy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d8jFP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SpriteComponent", ()=>SpriteComponent
);
var _juicy = require("../../lib/juicy");
class SpriteComponent extends _juicy.Component {
    constructor(){
        super(...arguments);
        this.image = document.createElement('canvas');
        this.sheetWidth = 1;
        this.sheetHeight = 1;
        this.spriteWidth = 0;
        this.spriteHeight = 0;
        this.frameTime = -1; // Don't animate yet
        this.timeLeft = 0;
        this.repeat = false;
        this.flip = false;
        this.opacity = 1;
        this.fadeDir = 0;
        this.flickerTime = 0;
        this.current = '';
        this.sheet = [
            0
        ];
        this.sprite = 0;
        this.loaded = true;
        this.onImageLoad = (img)=>{
            var _a;
            this.image.width = img.width;
            this.image.height = img.height;
            (_a = this.image.getContext('2d')) === null || _a === void 0 || _a.drawImage(img, 0, 0);
            this.sheetWidth = this.image.width / this.spriteWidth;
            this.sheetHeight = this.image.height / this.spriteHeight;
            this.loaded = true;
            if (this.entity) this.entity.state.updated = true;
            if (this.onload) this.onload(this);
        };
    }
    setImage(url) {
        const image = new Image();
        image.src = url;
        image.onload = this.onImageLoad.bind(this, image);
        this.loaded = false;
        return this; // Enable chaining
    }
    setSize(spriteWidth, spriteHeight) {
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.entity.width = spriteWidth;
        this.entity.height = spriteHeight;
        this.frameTime = -1; // Don't animate yet
        this.repeat = false;
        this.sprite = 0;
        this.sheet = [
            0
        ];
        return this; // Enable chaining
    }
    setFlip(flip) {
        this.flip = flip;
        return this; // Enable 2chainz
    }
    setFlickering(time) {
        this.flickerTime = time;
        return this; // Enable true chainz
    }
    runAnimation({ name , sheet , frameTime , repeat  }) {
        this.frameTime = frameTime;
        if (this.current !== name) {
            this.current = name;
            this.timeLeft = frameTime;
            this.sprite = 0;
        }
        this.sheet = sheet;
        this.repeat = !!repeat;
        return this; // Enable chaining
    }
    fade(dir, from) {
        this.fadeDir = dir;
        if (from) this.opacity = from;
    }
    animating() {
        return this.frameTime >= 0 && (this.repeat || this.sprite < this.sheet.length);
    }
    goNextFrame() {
        this.sprite++;
        this.timeLeft = this.frameTime;
        if (this.sprite >= this.sheet.length) {
            if (this.repeat) this.sprite = 0;
            else {
                this.sprite = this.sheet.length;
                this.frameTime = -1;
                if (this.oncompleteanimation) this.oncompleteanimation();
            }
        }
    }
    computeSprite() {
        const index = this.sheet[this.sprite < this.sheet.length ? this.sprite : this.sheet.length - 1];
        var sx = index % this.sheetWidth * this.spriteWidth;
        var sy = Math.floor(index / this.sheetWidth) * this.spriteHeight;
        return {
            sx,
            sy
        };
    }
    update(dt) {
        if (this.animating()) {
            this.timeLeft -= dt;
            if (this.timeLeft <= 0) this.goNextFrame();
        }
        if (this.flickerTime > 0) this.flickerTime -= dt;
        if (this.fadeDir !== 0) this.opacity += this.fadeDir * dt;
    }
    render(context, x, y, w, h) {
        if (this.flickerTime > 0) {
            const n = Math.floor(this.flickerTime / 0.1);
            if (n % 2 === 0) return;
        }
        if (!this.loaded) return;
        context.imageSmoothingEnabled = false;
        context.save();
        const { sx , sy  } = this.computeSprite();
        if (this.flip) {
            context.translate(this.spriteWidth, 0);
            context.scale(-1, 1);
        }
        context.drawImage(this.image, sx, sy, this.spriteWidth, this.spriteHeight, x, y, w, h);
        context.restore();
    }
}

},{"../../lib/juicy":"5IxFy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8vBnb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "UnitComponent", ()=>UnitComponent
);
var _juicy = require("../../lib/juicy");
var _collector = require("./collector");
var _inventory = require("./inventory");
let unitNum = 1;
class UnitComponent extends _juicy.Component {
    constructor(){
        super(...arguments);
        this.speed = 110 + Math.random() * 20;
        // for spacing
        this.hexAngle = Math.random() * Math.PI * 2;
        this.hexOffset = 30;
        // AI
        this.tasks = [];
        this.harvestTime = 0;
        this.name = `Tom Bombadil ${unitNum++}`;
    }
    init(e) {
        var _a;
        this.inventory = (_a = e.get(_inventory.Inventory)) !== null && _a !== void 0 ? _a : e.add(_inventory.Inventory);
        this.inventory.maxSize = 10;
    }
    setGoal(goal) {
        this.goal = goal;
        this.cancelTasks();
        this.makePlan();
    }
    makePlan() {
        if (!this.goal) return;
        if (this.goal.type === 'Move') this.queueTask(this.goal);
        else if (this.goal.type === 'Harvest') {
            if (!this.goal.resource.entity.contains(this.entity.position)) this.queueTask({
                type: 'Move',
                dest: this.goal.resource.entity.position
            });
            this.queueTask(this.goal);
        }
    }
    queueTask(command) {
        // TODO make a path that follows hexes
        if (command.type === 'Move') {
            const dest = command.dest.copy().add(Math.cos(this.hexAngle) * this.hexOffset, Math.sin(this.hexAngle) * this.hexOffset);
            this.tasks.push(Object.assign(Object.assign({
            }, command), {
                dest
            }));
        } else this.tasks.push(Object.assign({
        }, command));
    }
    cancelTasks() {
        this.tasks = [];
    }
    update(dt) {
        if (this.tasks.length === 0) {
            if (this.goal) this.makePlan();
            return;
        }
        const currentTask = this.tasks[0];
        if (currentTask.type !== 'Harvest') this.harvestTime = 0;
        if (currentTask.type === 'Move') {
            const nextPoint = currentTask.dest;
            const direction = nextPoint.copy().sub(this.entity.position);
            const amountToMove = Math.min(dt * this.speed, direction.length());
            if (amountToMove < 0.5) {
                this.entity.position = nextPoint.copy();
                this.tasks.shift();
            } else this.entity.position.add(direction.normalize().mult(amountToMove));
        } else if (currentTask.type === 'Harvest') {
            if (!currentTask.resource.entity.contains(this.entity.position)) this.tasks.shift();
            if (currentTask.resource.available.amount <= 0) this.tasks.shift();
            this.harvestTime += dt;
            if (this.harvestTime >= 1) {
                this.harvestTime = 0;
                currentTask.resource.available.amount--;
                this.inventory.add(currentTask.resource.available.type, 1);
                if (this.inventory.isFull()) {
                    // Find a collector
                    const collectors = this.entity.state.entities.map((e)=>e.get(_collector.Collector)
                    ).filter((c)=>c != undefined
                    );
                    this.queueTask({
                        type: 'Move',
                        dest: collectors[0].entity.position
                    });
                    this.queueTask({
                        type: 'Unload',
                        collector: collectors[0]
                    });
                    this.tasks.shift();
                }
            }
        } else if (currentTask.type === 'Unload') {
            const { collector  } = currentTask;
            if (collector.entity.contains(this.entity.position)) {
                this.inventory.forEach((type, amt)=>collector.inventory.add(type, amt)
                );
                this.inventory.clear();
                this.tasks.shift();
            }
        }
    }
}

},{"../../lib/juicy":"5IxFy","./collector":"jWGsH","./inventory":"84SeW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"wRxmz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DialogBox", ()=>DialogBox
);
var _juicy = require("../../lib/juicy");
var _nineSlice = require("../components/nine-slice");
var _resource = require("../components/resource");
var _unit = require("../components/unit");
var _wrapText = require("../components/wrap-text");
const dialogBoxImg = require("../../img/dialog_box.png");
class DialogBox extends _juicy.Entity {
    constructor(state){
        super(state);
        this.add(_nineSlice.NineSlice).set({
            src: dialogBoxImg,
            left: 64,
            right: 64,
            top: 64,
            bottom: 64
        });
        {
            const title = new _juicy.Entity(state);
            title.position.x = this.width / 2;
            title.position.y = 70;
            this.title = title.add(_juicy.TextComponent);
            this.title.set({
                text: 'Title',
                size: 72,
                fillStyle: 'white',
                padding: new _juicy.Point(50)
            });
            this.addChild(title);
        }
        {
            const details = new _juicy.Entity(state);
            details.position.x = this.width / 2;
            details.position.y = 300;
            this.details = details.add(_wrapText.WrapTextComponent);
            this.details.set({
                text: '',
                size: 72,
                fillStyle: 'white',
                padding: new _juicy.Point(30)
            });
            this.addChild(details);
        }
    }
    update(dt) {
        this.title.entity.position.x = this.width / 2;
        this.details.entity.position.x = this.details.entity.width / 2;
        super.update(dt);
    }
    setSelected(entities) {
        if (entities.length === 1) {
            const entity = entities[0];
            const unit = entity.get(_unit.UnitComponent);
            if (unit) {
                this.title.set({
                    text: `${unit.name}`
                });
                this.details.set({
                    text: [
                        'Carrying:',
                        ...unit.inventory.toString(), 
                    ].join('\n')
                });
                return;
            }
            const resourceNode = entity.get(_resource.ResourceNode);
            if (resourceNode) {
                this.title.set({
                    text: `${resourceNode.name}`
                });
                const { amount , type  } = resourceNode.available;
                this.details.set({
                    text: [
                        'Available:',
                        `${type}: ${amount}`, 
                    ].join('\n')
                });
                return;
            }
            this.title.set({
                text: `1 unit selected`
            });
            this.details.set({
                text: ''
            });
            return;
        }
        // Fallback
        this.title.set({
            text: `${entities.length} units selected`
        });
        this.details.set({
            text: ''
        });
    }
}

},{"../../lib/juicy":"5IxFy","../components/nine-slice":"4Niut","../components/resource":"jy870","../components/unit":"8vBnb","../components/wrap-text":"hYvXH","../../img/dialog_box.png":"9UuxI","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4Niut":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "NineSlice", ()=>NineSlice
);
var _juicy = require("../../lib/juicy");
class NineSlice extends _juicy.Component {
    constructor(){
        super(...arguments);
        this.image = new Image();
        this.loadedIn = false;
        this.sx = [
            0,
            0,
            0
        ];
        this.sy = [
            0,
            0,
            0
        ];
        this.sw = [
            0,
            0,
            0
        ];
        this.sh = [
            0,
            0,
            0
        ];
    }
    set({ src , left , right , top , bottom  }) {
        this.image.src = src;
        this.image.onload = ()=>{
            const width = this.image.width;
            const height = this.image.height;
            this.sx = [
                0,
                left,
                width - right
            ];
            this.sw = [
                left,
                width - (left + right),
                right
            ];
            this.sy = [
                0,
                top,
                height - bottom
            ];
            this.sh = [
                top,
                height - (top + bottom),
                bottom
            ];
            this.loadedIn = true;
        };
    }
    render(context, x, y, w, h) {
        // Stretch instead of tiling because lazy
        if (!this.loadedIn) return;
        const dx = [
            x,
            x + this.sw[0],
            x + w - this.sw[2]
        ];
        const dw = [
            this.sw[0],
            w - (this.sw[0] + this.sw[2]),
            this.sw[2]
        ];
        const dy = [
            y,
            y + this.sh[0],
            y + h - this.sh[2]
        ];
        const dh = [
            this.sh[0],
            h - (this.sh[0] + this.sh[2]),
            this.sh[2]
        ];
        context.drawImage(this.image, this.sx[0], this.sy[0], this.sw[0], this.sh[0], dx[0], dy[0], dw[0], dh[0]);
        context.drawImage(this.image, this.sx[1], this.sy[0], this.sw[1], this.sh[0], dx[1], dy[0], dw[1], dh[0]);
        context.drawImage(this.image, this.sx[2], this.sy[0], this.sw[2], this.sh[0], dx[2], dy[0], dw[2], dh[0]);
        context.drawImage(this.image, this.sx[0], this.sy[1], this.sw[0], this.sh[1], dx[0], dy[1], dw[0], dh[1]);
        context.drawImage(this.image, this.sx[1], this.sy[1], this.sw[1], this.sh[1], dx[1], dy[1], dw[1], dh[1]);
        context.drawImage(this.image, this.sx[2], this.sy[1], this.sw[2], this.sh[1], dx[2], dy[1], dw[2], dh[1]);
        context.drawImage(this.image, this.sx[0], this.sy[2], this.sw[0], this.sh[2], dx[0], dy[2], dw[0], dh[2]);
        context.drawImage(this.image, this.sx[1], this.sy[2], this.sw[1], this.sh[2], dx[1], dy[2], dw[1], dh[2]);
        context.drawImage(this.image, this.sx[2], this.sy[2], this.sw[2], this.sh[2], dx[2], dy[2], dw[2], dh[2]);
    }
}

},{"../../lib/juicy":"5IxFy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hYvXH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "WrapTextComponent", ()=>WrapTextComponent
);
var _juicy = require("../../lib/juicy");
class WrapTextComponent extends _juicy.TextComponent {
    measure() {
        const lines = this.text.split('\n');
        this.context.font = this.getFont();
        return lines.reduce((current, line)=>{
            const measure = this.context.measureText(line);
            current.x = Math.ceil(Math.max(current.x, measure.width));
            current.y += Math.ceil(this.size + 2);
            return current;
        }, new _juicy.Point());
    }
    renderOffscreen() {
        // Measure the text size
        const entity = this.entity;
        const context = this.context;
        const canvas = this.canvas;
        const size = this.measure();
        const { fillStyle , text , padding  } = this;
        // Resize canvas
        entity.width = size.x + padding.x * 2;
        entity.height = size.y + padding.y * 2;
        _juicy.SetCanvasSize(canvas, entity.width, entity.height);
        // Draw text
        context.textBaseline = 'top';
        context.font = this.getFont();
        context.fillStyle = fillStyle;
        this.text.split('\n').forEach((line, y)=>context.fillText(line, padding.x, padding.y + y * (this.size + 2))
        );
    }
}

},{"../../lib/juicy":"5IxFy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9UuxI":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('6izcJ') + require('./helpers/bundle-manifest').resolve("3ALIf");

},{"./helpers/bundle-url":"lgJ39","./helpers/bundle-manifest":"gS3k4"}],"lgJ39":[function(require,module,exports) {
"use strict";
var bundleURL = {
};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return '/';
}
function getBaseURL(url) {
    return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);
    if (!matches) throw new Error('Origin not found');
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"l96xe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ResourceDisplay", ()=>ResourceDisplay
);
var _juicy = require("../../lib/juicy");
var _nineSlice = require("../components/nine-slice");
var _resource = require("../components/resource");
const dialogBoxBg = require("../../img/dialog_box.png");
class ResourceDisplay extends _juicy.Entity {
    constructor(state, inventory){
        super(state);
        this.inventory = inventory;
        this.add(_nineSlice.NineSlice).set({
            src: dialogBoxBg,
            left: 32,
            right: 32,
            top: 32,
            bottom: 32
        });
        {
            const wood = new _juicy.Entity(state);
            wood.position.y = 70;
            this.wood = wood.add(_juicy.TextComponent);
            this.wood.set({
                text: 'wood',
                size: 48,
                fillStyle: 'white',
                padding: new _juicy.Point(50)
            });
            this.addChild(wood);
        }
    }
    update(dt) {
        super.update(dt);
        this.wood.set({
            text: `${this.inventory.get(_resource.ResourceType.Wood)}`
        });
        this.wood.entity.position.x = 50;
    }
}

},{"../../lib/juicy":"5IxFy","../components/nine-slice":"4Niut","../components/resource":"jy870","../../img/dialog_box.png":"9UuxI","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fdjdh":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('6izcJ') + require('./helpers/bundle-manifest').resolve("5A9qD");

},{"./helpers/bundle-url":"lgJ39","./helpers/bundle-manifest":"gS3k4"}],"3Rb3d":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('6izcJ') + require('./helpers/bundle-manifest').resolve("fS1Dt");

},{"./helpers/bundle-url":"lgJ39","./helpers/bundle-manifest":"gS3k4"}],"cjKHC":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('6izcJ') + require('./helpers/bundle-manifest').resolve("gO4LK");

},{"./helpers/bundle-url":"lgJ39","./helpers/bundle-manifest":"gS3k4"}],"lNbV3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "__DEV__", ()=>__DEV__
);
var _juicy = require("../../lib/juicy");
// import { SaveManager } from "./save-manager";
// const debugElement = document.createElement('div');
// debugElement.id = 'debug';
// debugElement.classList.add('desktop-only');
// document.body.prepend(debugElement);
// TODO-EF: Bring most of this back outside
class DebugButton {
    constructor({ content , onclick , parent  }){
        this.el = document.createElement('button');
        this.content = content;
        this.el.textContent = this.content();
        this.el.onclick = ()=>{
            onclick === null || onclick === void 0 || onclick();
            this.el.textContent = this.content();
        };
    // (parent ?? debugElement).appendChild(this.el);
    }
}
const __DEV__ = ()=>{
    return true;
}; // () => localStorage.getItem('__DEV__') === 'on';
new DebugButton({
    content: ()=>__DEV__() ? 'Turn off DevMode (reloads page)' : 'Turn on DevMode (reloads page)'
    ,
    onclick: ()=>{
        localStorage.setItem('__DEV__', !__DEV__() ? 'on' : 'off');
        location.reload();
    }
});
new DebugButton({
    content: ()=>_juicy.Sound.BGMMuted ? 'Unmute Music' : 'Mute Music'
    ,
    onclick: ()=>{
        if (_juicy.Sound.BGMMuted) _juicy.Sound.UnmuteMusic();
        else _juicy.Sound.MuteMusic();
    }
});
new DebugButton({
    content: ()=>_juicy.Sound.SFXMuted ? 'Unmute SFX' : 'Mute SFX'
    ,
    onclick: ()=>{
        if (_juicy.Sound.SFXMuted) _juicy.Sound.UnmuteSfx();
        else _juicy.Sound.MuteSfx();
    }
});
new DebugButton({
    content: ()=>'Clear save file'
    ,
    onclick: ()=>{
        // SaveManager.clear();
        location.reload();
    }
});

},{"../../lib/juicy":"5IxFy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lJ4RK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _hooks = require("../hooks");
var _cityBuilder = require("../../states/city-builder");
var _tooltipsCss = require("./tooltips.css");
var _unit = require("../../components/unit");
const TooltipOverlay = ()=>{
    const [tooltips, setTooltips] = _react.useState([]);
    _hooks.useAnimationFrame(()=>{
        // @ts-ignore
        const currState = window.Game.state;
        if (!(currState instanceof _cityBuilder.CityBuilderState)) return;
        const tooltipTime = currState.units.filter((u)=>false
        ).map((unit)=>{
            var _a, _b;
            // horrible jank code because I couldn't figure out how to properly go from world space -> screen space
            let point = unit.entity.globalPosition();
            point = point.multScalar(currState.zoom * 0.3);
            point = point.add(220, 150);
            const name = (_a = unit.entity.get(_unit.UnitComponent)) === null || _a === void 0 ? void 0 : _a.name;
            const num = parseInt((_b = name === null || name === void 0 ? void 0 : name.slice(-2)) !== null && _b !== void 0 ? _b : "");
            return {
                text: num % 2 === 0 ? "Something need doing?" : "I don't miss my wife.",
                posX: point.x,
                posY: point.y
            };
        });
        setTooltips(tooltipTime);
    });
    return _jsxRuntime.jsx("div", Object.assign({
        style: {
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0
        }
    }, {
        children: tooltips.map((tt, index)=>{
            return _jsxRuntime.jsx("div", Object.assign({
                className: "tooltip-container",
                style: {
                    top: `${tt.posY}px`,
                    left: `${tt.posX}px`
                }
            }, {
                children: _jsxRuntime.jsx("div", Object.assign({
                    className: "tooltip-content"
                }, {
                    children: tt.text
                }), void 0)
            }), index);
        })
    }), void 0);
};
exports.default = TooltipOverlay;

},{"react/jsx-runtime":"6AEwr","react":"21dqq","../hooks":"9Gsnu","../../states/city-builder":"8RjxF","./tooltips.css":"bjU83","../../components/unit":"8vBnb","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bjU83":[function() {},{}]},["6G5nI","c4soQ"], "c4soQ", "parcelRequirefb46")

//# sourceMappingURL=index.c158ff64.js.map
