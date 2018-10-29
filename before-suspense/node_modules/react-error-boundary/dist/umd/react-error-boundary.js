!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory(require("React")) : "function" == typeof define && define.amd ? define([ "React" ], factory) : "object" == typeof exports ? exports.ReactErrorBoundary = factory(require("React")) : root.ReactErrorBoundary = factory(root.React);
}(this, function(__WEBPACK_EXTERNAL_MODULE_29__) {
    /******/
    return function(modules) {
        /******/
        /******/
        // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/
            // Check if module is in cache
            /******/
            if (installedModules[moduleId]) /******/
            return installedModules[moduleId].exports;
            /******/
            // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                i: moduleId,
                /******/
                l: !1,
                /******/
                exports: {}
            };
            /******/
            /******/
            // Return the exports of the module
            /******/
            /******/
            /******/
            // Execute the module function
            /******/
            /******/
            /******/
            // Flag the module as loaded
            /******/
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.l = !0, module.exports;
        }
        // webpackBootstrap
        /******/
        // The module cache
        /******/
        var installedModules = {};
        /******/
        /******/
        // Load entry module and return exports
        /******/
        /******/
        /******/
        /******/
        // expose the modules object (__webpack_modules__)
        /******/
        /******/
        /******/
        // expose the module cache
        /******/
        /******/
        /******/
        // define getter function for harmony exports
        /******/
        /******/
        /******/
        // getDefaultExport function for compatibility with non-harmony modules
        /******/
        /******/
        /******/
        // Object.prototype.hasOwnProperty.call
        /******/
        /******/
        /******/
        // __webpack_public_path__
        /******/
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.d = function(exports, name, getter) {
            /******/
            __webpack_require__.o(exports, name) || /******/
            Object.defineProperty(exports, name, {
                /******/
                configurable: !1,
                /******/
                enumerable: !0,
                /******/
                get: getter
            });
        }, __webpack_require__.n = function(module) {
            /******/
            var getter = module && module.__esModule ? /******/
            function() {
                return module.default;
            } : /******/
            function() {
                return module;
            };
            /******/
            /******/
            return __webpack_require__.d(getter, "a", getter), getter;
        }, __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 43);
    }([ /* 0 */
    /***/
    function(module, exports) {
        // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
        var global = module.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = global);
    }, /* 1 */
    /***/
    function(module, exports) {
        var core = module.exports = {
            version: "2.5.1"
        };
        "number" == typeof __e && (__e = core);
    }, /* 2 */
    /***/
    function(module, exports) {
        var hasOwnProperty = {}.hasOwnProperty;
        module.exports = function(it, key) {
            return hasOwnProperty.call(it, key);
        };
    }, /* 3 */
    /***/
    function(module, exports, __webpack_require__) {
        var anObject = __webpack_require__(9), IE8_DOM_DEFINE = __webpack_require__(33), toPrimitive = __webpack_require__(17), dP = Object.defineProperty;
        exports.f = __webpack_require__(4) ? Object.defineProperty : function(O, P, Attributes) {
            if (anObject(O), P = toPrimitive(P, !0), anObject(Attributes), IE8_DOM_DEFINE) try {
                return dP(O, P, Attributes);
            } catch (e) {}
            if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
            return "value" in Attributes && (O[P] = Attributes.value), O;
        };
    }, /* 4 */
    /***/
    function(module, exports, __webpack_require__) {
        // Thank's IE8 for his funny defineProperty
        module.exports = !__webpack_require__(11)(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, /* 5 */
    /***/
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(0), core = __webpack_require__(1), ctx = __webpack_require__(32), hide = __webpack_require__(6), $export = function(type, name, source) {
            var key, own, out, IS_FORCED = type & $export.F, IS_GLOBAL = type & $export.G, IS_STATIC = type & $export.S, IS_PROTO = type & $export.P, IS_BIND = type & $export.B, IS_WRAP = type & $export.W, exports = IS_GLOBAL ? core : core[name] || (core[name] = {}), expProto = exports.prototype, target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {}).prototype;
            IS_GLOBAL && (source = name);
            for (key in source) // contains in native
            (own = !IS_FORCED && target && void 0 !== target[key]) && key in exports || (// export native or passed
            out = own ? target[key] : source[key], // prevent global pollution for namespaces
            exports[key] = IS_GLOBAL && "function" != typeof target[key] ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? function(C) {
                var F = function(a, b, c) {
                    if (this instanceof C) {
                        switch (arguments.length) {
                          case 0:
                            return new C();

                          case 1:
                            return new C(a);

                          case 2:
                            return new C(a, b);
                        }
                        return new C(a, b, c);
                    }
                    return C.apply(this, arguments);
                };
                return F.prototype = C.prototype, F;
            }(out) : IS_PROTO && "function" == typeof out ? ctx(Function.call, out) : out, // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
            IS_PROTO && ((exports.virtual || (exports.virtual = {}))[key] = out, // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
            type & $export.R && expProto && !expProto[key] && hide(expProto, key, out)));
        };
        // type bitmap
        $export.F = 1, // forced
        $export.G = 2, // global
        $export.S = 4, // static
        $export.P = 8, // proto
        $export.B = 16, // bind
        $export.W = 32, // wrap
        $export.U = 64, // safe
        $export.R = 128, // real proto method for `library`
        module.exports = $export;
    }, /* 6 */
    /***/
    function(module, exports, __webpack_require__) {
        var dP = __webpack_require__(3), createDesc = __webpack_require__(13);
        module.exports = __webpack_require__(4) ? function(object, key, value) {
            return dP.f(object, key, createDesc(1, value));
        } : function(object, key, value) {
            return object[key] = value, object;
        };
    }, /* 7 */
    /***/
    function(module, exports, __webpack_require__) {
        // to indexed object, toObject with fallback for non-array-like ES3 strings
        var IObject = __webpack_require__(62), defined = __webpack_require__(14);
        module.exports = function(it) {
            return IObject(defined(it));
        };
    }, /* 8 */
    /***/
    function(module, exports, __webpack_require__) {
        var store = __webpack_require__(16)("wks"), uid = __webpack_require__(12), Symbol = __webpack_require__(0).Symbol, USE_SYMBOL = "function" == typeof Symbol;
        (module.exports = function(name) {
            return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)("Symbol." + name));
        }).store = store;
    }, /* 9 */
    /***/
    function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(10);
        module.exports = function(it) {
            if (!isObject(it)) throw TypeError(it + " is not an object!");
            return it;
        };
    }, /* 10 */
    /***/
    function(module, exports) {
        module.exports = function(it) {
            return "object" == typeof it ? null !== it : "function" == typeof it;
        };
    }, /* 11 */
    /***/
    function(module, exports) {
        module.exports = function(exec) {
            try {
                return !!exec();
            } catch (e) {
                return !0;
            }
        };
    }, /* 12 */
    /***/
    function(module, exports) {
        var id = 0, px = Math.random();
        module.exports = function(key) {
            return "Symbol(".concat(void 0 === key ? "" : key, ")_", (++id + px).toString(36));
        };
    }, /* 13 */
    /***/
    function(module, exports) {
        module.exports = function(bitmap, value) {
            return {
                enumerable: !(1 & bitmap),
                configurable: !(2 & bitmap),
                writable: !(4 & bitmap),
                value: value
            };
        };
    }, /* 14 */
    /***/
    function(module, exports) {
        // 7.2.1 RequireObjectCoercible(argument)
        module.exports = function(it) {
            if (void 0 == it) throw TypeError("Can't call method on  " + it);
            return it;
        };
    }, /* 15 */
    /***/
    function(module, exports, __webpack_require__) {
        var shared = __webpack_require__(16)("keys"), uid = __webpack_require__(12);
        module.exports = function(key) {
            return shared[key] || (shared[key] = uid(key));
        };
    }, /* 16 */
    /***/
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(0), store = global["__core-js_shared__"] || (global["__core-js_shared__"] = {});
        module.exports = function(key) {
            return store[key] || (store[key] = {});
        };
    }, /* 17 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.1.1 ToPrimitive(input [, PreferredType])
        var isObject = __webpack_require__(10);
        // instead of the ES6 spec version, we didn't implement @@toPrimitive case
        // and the second argument - flag - preferred type is a string
        module.exports = function(it, S) {
            if (!isObject(it)) return it;
            var fn, val;
            if (S && "function" == typeof (fn = it.toString) && !isObject(val = fn.call(it))) return val;
            if ("function" == typeof (fn = it.valueOf) && !isObject(val = fn.call(it))) return val;
            if (!S && "function" == typeof (fn = it.toString) && !isObject(val = fn.call(it))) return val;
            throw TypeError("Can't convert object to primitive value");
        };
    }, /* 18 */
    /***/
    function(module, exports) {
        // 7.1.4 ToInteger
        var ceil = Math.ceil, floor = Math.floor;
        module.exports = function(it) {
            return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
        };
    }, /* 19 */
    /***/
    function(module, exports) {
        module.exports = !0;
    }, /* 20 */
    /***/
    function(module, exports) {
        module.exports = {};
    }, /* 21 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
        var anObject = __webpack_require__(9), dPs = __webpack_require__(61), enumBugKeys = __webpack_require__(23), IE_PROTO = __webpack_require__(15)("IE_PROTO"), Empty = function() {}, createDict = function() {
            // Thrash, waste and sodomy: IE GC bug
            var iframeDocument, iframe = __webpack_require__(34)("iframe"), i = enumBugKeys.length;
            for (iframe.style.display = "none", __webpack_require__(66).appendChild(iframe), 
            iframe.src = "javascript:", // eslint-disable-line no-script-url
            // createDict = iframe.contentWindow.Object;
            // html.removeChild(iframe);
            iframeDocument = iframe.contentWindow.document, iframeDocument.open(), iframeDocument.write("<script>document.F=Object<\/script>"), 
            iframeDocument.close(), createDict = iframeDocument.F; i--; ) delete createDict.prototype[enumBugKeys[i]];
            return createDict();
        };
        module.exports = Object.create || function(O, Properties) {
            var result;
            // add "__proto__" for Object.getPrototypeOf polyfill
            return null !== O ? (Empty.prototype = anObject(O), result = new Empty(), Empty.prototype = null, 
            result[IE_PROTO] = O) : result = createDict(), void 0 === Properties ? result : dPs(result, Properties);
        };
    }, /* 22 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.14 / 15.2.3.14 Object.keys(O)
        var $keys = __webpack_require__(38), enumBugKeys = __webpack_require__(23);
        module.exports = Object.keys || function(O) {
            return $keys(O, enumBugKeys);
        };
    }, /* 23 */
    /***/
    function(module, exports) {
        // IE 8- don't enum bug keys
        module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    }, /* 24 */
    /***/
    function(module, exports, __webpack_require__) {
        var def = __webpack_require__(3).f, has = __webpack_require__(2), TAG = __webpack_require__(8)("toStringTag");
        module.exports = function(it, tag, stat) {
            it && !has(it = stat ? it : it.prototype, TAG) && def(it, TAG, {
                configurable: !0,
                value: tag
            });
        };
    }, /* 25 */
    /***/
    function(module, exports, __webpack_require__) {
        exports.f = __webpack_require__(8);
    }, /* 26 */
    /***/
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(0), core = __webpack_require__(1), LIBRARY = __webpack_require__(19), wksExt = __webpack_require__(25), defineProperty = __webpack_require__(3).f;
        module.exports = function(name) {
            var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
            "_" == name.charAt(0) || name in $Symbol || defineProperty($Symbol, name, {
                value: wksExt.f(name)
            });
        };
    }, /* 27 */
    /***/
    function(module, exports) {
        exports.f = {}.propertyIsEnumerable;
    }, /* 28 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _react = __webpack_require__(29), _react2 = function(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }(_react), toTitle = function(error, componentStack) {
            return error.toString() + "\n\nThis is located at:" + componentStack;
        }, ErrorBoundaryFallbackComponent = function(_ref) {
            var componentStack = _ref.componentStack, error = _ref.error;
            return _react2.default.createElement("div", {
                style: style,
                title: toTitle(error, componentStack)
            }, _react2.default.createElement("svg", {
                style: svgStyle,
                viewBox: "0 0 24 24",
                preserveAspectRatio: "xMidYMid"
            }, _react2.default.createElement("path", {
                d: "M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,\n        12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,\n        12M15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,\n        9.5C14,8.7 14.7,8 15.5,8M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,\n        8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M12,14C13.75,14 15.29,14.72 16.19,\n        15.81L14.77,17.23C14.32,16.5 13.25,16 12,16C10.75,16 9.68,16.5 9.23,\n        17.23L7.81,15.81C8.71,14.72 10.25,14 12,14Z"
            })));
        }, style = {
            height: "100%",
            maxHeight: "100vh",
            width: "100%",
            maxWidth: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: "#C00",
            color: "#FFF",
            boxSizing: "border-box",
            cursor: "help"
        }, svgStyle = {
            fill: "currentColor",
            flex: "1 1 auto"
        };
        exports.default = ErrorBoundaryFallbackComponent;
    }, /* 29 */
    /***/
    function(module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE_29__;
    }, /* 30 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.1.13 ToObject(argument)
        var defined = __webpack_require__(14);
        module.exports = function(it) {
            return Object(defined(it));
        };
    }, /* 31 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
        var has = __webpack_require__(2), toObject = __webpack_require__(30), IE_PROTO = __webpack_require__(15)("IE_PROTO"), ObjectProto = Object.prototype;
        module.exports = Object.getPrototypeOf || function(O) {
            return O = toObject(O), has(O, IE_PROTO) ? O[IE_PROTO] : "function" == typeof O.constructor && O instanceof O.constructor ? O.constructor.prototype : O instanceof Object ? ObjectProto : null;
        };
    }, /* 32 */
    /***/
    function(module, exports, __webpack_require__) {
        // optional / simple context binding
        var aFunction = __webpack_require__(49);
        module.exports = function(fn, that, length) {
            if (aFunction(fn), void 0 === that) return fn;
            switch (length) {
              case 1:
                return function(a) {
                    return fn.call(that, a);
                };

              case 2:
                return function(a, b) {
                    return fn.call(that, a, b);
                };

              case 3:
                return function(a, b, c) {
                    return fn.call(that, a, b, c);
                };
            }
            return function() {
                return fn.apply(that, arguments);
            };
        };
    }, /* 33 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = !__webpack_require__(4) && !__webpack_require__(11)(function() {
            return 7 != Object.defineProperty(__webpack_require__(34)("div"), "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, /* 34 */
    /***/
    function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(10), document = __webpack_require__(0).document, is = isObject(document) && isObject(document.createElement);
        module.exports = function(it) {
            return is ? document.createElement(it) : {};
        };
    }, /* 35 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        exports.__esModule = !0;
        var _iterator = __webpack_require__(56), _iterator2 = _interopRequireDefault(_iterator), _symbol = __webpack_require__(71), _symbol2 = _interopRequireDefault(_symbol), _typeof = "function" == typeof _symbol2.default && "symbol" == typeof _iterator2.default ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof _symbol2.default && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj;
        };
        exports.default = "function" == typeof _symbol2.default && "symbol" === _typeof(_iterator2.default) ? function(obj) {
            return void 0 === obj ? "undefined" : _typeof(obj);
        } : function(obj) {
            return obj && "function" == typeof _symbol2.default && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : void 0 === obj ? "undefined" : _typeof(obj);
        };
    }, /* 36 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var LIBRARY = __webpack_require__(19), $export = __webpack_require__(5), redefine = __webpack_require__(37), hide = __webpack_require__(6), has = __webpack_require__(2), Iterators = __webpack_require__(20), $iterCreate = __webpack_require__(60), setToStringTag = __webpack_require__(24), getPrototypeOf = __webpack_require__(31), ITERATOR = __webpack_require__(8)("iterator"), BUGGY = !([].keys && "next" in [].keys()), returnThis = function() {
            return this;
        };
        module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
            $iterCreate(Constructor, NAME, next);
            var methods, key, IteratorPrototype, getMethod = function(kind) {
                if (!BUGGY && kind in proto) return proto[kind];
                switch (kind) {
                  case "keys":
                  case "values":
                    return function() {
                        return new Constructor(this, kind);
                    };
                }
                return function() {
                    return new Constructor(this, kind);
                };
            }, TAG = NAME + " Iterator", DEF_VALUES = "values" == DEFAULT, VALUES_BUG = !1, proto = Base.prototype, $native = proto[ITERATOR] || proto["@@iterator"] || DEFAULT && proto[DEFAULT], $default = $native || getMethod(DEFAULT), $entries = DEFAULT ? DEF_VALUES ? getMethod("entries") : $default : void 0, $anyNative = "Array" == NAME ? proto.entries || $native : $native;
            if (// Fix native
            $anyNative && (IteratorPrototype = getPrototypeOf($anyNative.call(new Base()))) !== Object.prototype && IteratorPrototype.next && (// Set @@toStringTag to native iterators
            setToStringTag(IteratorPrototype, TAG, !0), // fix for some old engines
            LIBRARY || has(IteratorPrototype, ITERATOR) || hide(IteratorPrototype, ITERATOR, returnThis)), 
            // fix Array#{values, @@iterator}.name in V8 / FF
            DEF_VALUES && $native && "values" !== $native.name && (VALUES_BUG = !0, $default = function() {
                return $native.call(this);
            }), // Define iterator
            LIBRARY && !FORCED || !BUGGY && !VALUES_BUG && proto[ITERATOR] || hide(proto, ITERATOR, $default), 
            // Plug for library
            Iterators[NAME] = $default, Iterators[TAG] = returnThis, DEFAULT) if (methods = {
                values: DEF_VALUES ? $default : getMethod("values"),
                keys: IS_SET ? $default : getMethod("keys"),
                entries: $entries
            }, FORCED) for (key in methods) key in proto || redefine(proto, key, methods[key]); else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
            return methods;
        };
    }, /* 37 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(6);
    }, /* 38 */
    /***/
    function(module, exports, __webpack_require__) {
        var has = __webpack_require__(2), toIObject = __webpack_require__(7), arrayIndexOf = __webpack_require__(63)(!1), IE_PROTO = __webpack_require__(15)("IE_PROTO");
        module.exports = function(object, names) {
            var key, O = toIObject(object), i = 0, result = [];
            for (key in O) key != IE_PROTO && has(O, key) && result.push(key);
            // Don't enum bug & hidden keys
            for (;names.length > i; ) has(O, key = names[i++]) && (~arrayIndexOf(result, key) || result.push(key));
            return result;
        };
    }, /* 39 */
    /***/
    function(module, exports) {
        var toString = {}.toString;
        module.exports = function(it) {
            return toString.call(it).slice(8, -1);
        };
    }, /* 40 */
    /***/
    function(module, exports) {
        exports.f = Object.getOwnPropertySymbols;
    }, /* 41 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
        var $keys = __webpack_require__(38), hiddenKeys = __webpack_require__(23).concat("length", "prototype");
        exports.f = Object.getOwnPropertyNames || function(O) {
            return $keys(O, hiddenKeys);
        };
    }, /* 42 */
    /***/
    function(module, exports, __webpack_require__) {
        var pIE = __webpack_require__(27), createDesc = __webpack_require__(13), toIObject = __webpack_require__(7), toPrimitive = __webpack_require__(17), has = __webpack_require__(2), IE8_DOM_DEFINE = __webpack_require__(33), gOPD = Object.getOwnPropertyDescriptor;
        exports.f = __webpack_require__(4) ? gOPD : function(O, P) {
            if (O = toIObject(O), P = toPrimitive(P, !0), IE8_DOM_DEFINE) try {
                return gOPD(O, P);
            } catch (e) {}
            if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
        };
    }, /* 43 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.ErrorBoundaryFallbackComponent = exports.withErrorBoundary = exports.ErrorBoundary = void 0;
        var _ErrorBoundaryFallbackComponent = __webpack_require__(28), _ErrorBoundaryFallbackComponent2 = _interopRequireDefault(_ErrorBoundaryFallbackComponent), _ErrorBoundary = __webpack_require__(44), _ErrorBoundary2 = _interopRequireDefault(_ErrorBoundary);
        exports.default = _ErrorBoundary2.default, exports.ErrorBoundary = _ErrorBoundary2.default, 
        exports.withErrorBoundary = _ErrorBoundary.withErrorBoundary, exports.ErrorBoundaryFallbackComponent = _ErrorBoundaryFallbackComponent2.default;
    }, /* 44 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.withErrorBoundary = void 0;
        var _getPrototypeOf = __webpack_require__(45), _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf), _classCallCheck2 = __webpack_require__(50), _classCallCheck3 = _interopRequireDefault(_classCallCheck2), _createClass2 = __webpack_require__(51), _createClass3 = _interopRequireDefault(_createClass2), _possibleConstructorReturn2 = __webpack_require__(55), _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2), _inherits2 = __webpack_require__(81), _inherits3 = _interopRequireDefault(_inherits2), _react = __webpack_require__(29), _react2 = _interopRequireDefault(_react), _ErrorBoundaryFallbackComponent = __webpack_require__(28), _ErrorBoundaryFallbackComponent2 = _interopRequireDefault(_ErrorBoundaryFallbackComponent), ErrorBoundary = function(_Component) {
            function ErrorBoundary() {
                var _ref, _temp, _this, _ret;
                (0, _classCallCheck3.default)(this, ErrorBoundary);
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                return _temp = _this = (0, _possibleConstructorReturn3.default)(this, (_ref = ErrorBoundary.__proto__ || (0, 
                _getPrototypeOf2.default)(ErrorBoundary)).call.apply(_ref, [ this ].concat(args))), 
                _this.state = {
                    error: null,
                    info: null
                }, _ret = _temp, (0, _possibleConstructorReturn3.default)(_this, _ret);
            }
            return (0, _inherits3.default)(ErrorBoundary, _Component), (0, _createClass3.default)(ErrorBoundary, [ {
                key: "componentDidCatch",
                value: function(error, info) {
                    var onError = this.props.onError;
                    if ("function" == typeof onError) try {
                        onError.call(this, error, info ? info.componentStack : "");
                    } catch (ignoredError) {}
                    this.setState({
                        error: error,
                        info: info
                    });
                }
            }, {
                key: "render",
                value: function() {
                    var _props = this.props, children = _props.children, FallbackComponent = _props.FallbackComponent, _state = this.state, error = _state.error, info = _state.info;
                    return null !== error ? _react2.default.createElement(FallbackComponent, {
                        componentStack: info ? info.componentStack : "",
                        error: error
                    }) : children;
                }
            } ]), ErrorBoundary;
        }(_react.Component);
        ErrorBoundary.defaultProps = {
            FallbackComponent: _ErrorBoundaryFallbackComponent2.default
        };
        exports.withErrorBoundary = function(Component, FallbackComponent, onError) {
            return function(props) {
                return _react2.default.createElement(ErrorBoundary, {
                    FallbackComponent: FallbackComponent,
                    onError: onError
                }, _react2.default.createElement(Component, props));
            };
        };
        exports.default = ErrorBoundary;
    }, /* 45 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(46),
            __esModule: !0
        };
    }, /* 46 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(47), module.exports = __webpack_require__(1).Object.getPrototypeOf;
    }, /* 47 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.9 Object.getPrototypeOf(O)
        var toObject = __webpack_require__(30), $getPrototypeOf = __webpack_require__(31);
        __webpack_require__(48)("getPrototypeOf", function() {
            return function(it) {
                return $getPrototypeOf(toObject(it));
            };
        });
    }, /* 48 */
    /***/
    function(module, exports, __webpack_require__) {
        // most Object methods by ES6 should accept primitives
        var $export = __webpack_require__(5), core = __webpack_require__(1), fails = __webpack_require__(11);
        module.exports = function(KEY, exec) {
            var fn = (core.Object || {})[KEY] || Object[KEY], exp = {};
            exp[KEY] = exec(fn), $export($export.S + $export.F * fails(function() {
                fn(1);
            }), "Object", exp);
        };
    }, /* 49 */
    /***/
    function(module, exports) {
        module.exports = function(it) {
            if ("function" != typeof it) throw TypeError(it + " is not a function!");
            return it;
        };
    }, /* 50 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0, exports.default = function(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        };
    }, /* 51 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0;
        var _defineProperty = __webpack_require__(52), _defineProperty2 = function(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }(_defineProperty);
        exports.default = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), (0, _defineProperty2.default)(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }();
    }, /* 52 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(53),
            __esModule: !0
        };
    }, /* 53 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(54);
        var $Object = __webpack_require__(1).Object;
        module.exports = function(it, key, desc) {
            return $Object.defineProperty(it, key, desc);
        };
    }, /* 54 */
    /***/
    function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(5);
        // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
        $export($export.S + $export.F * !__webpack_require__(4), "Object", {
            defineProperty: __webpack_require__(3).f
        });
    }, /* 55 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0;
        var _typeof2 = __webpack_require__(35), _typeof3 = function(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }(_typeof2);
        exports.default = function(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" !== (void 0 === call ? "undefined" : (0, _typeof3.default)(call)) && "function" != typeof call ? self : call;
        };
    }, /* 56 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(57),
            __esModule: !0
        };
    }, /* 57 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(58), __webpack_require__(67), module.exports = __webpack_require__(25).f("iterator");
    }, /* 58 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var $at = __webpack_require__(59)(!0);
        // 21.1.3.27 String.prototype[@@iterator]()
        __webpack_require__(36)(String, "String", function(iterated) {
            this._t = String(iterated), // target
            this._i = 0;
        }, function() {
            var point, O = this._t, index = this._i;
            return index >= O.length ? {
                value: void 0,
                done: !0
            } : (point = $at(O, index), this._i += point.length, {
                value: point,
                done: !1
            });
        });
    }, /* 59 */
    /***/
    function(module, exports, __webpack_require__) {
        var toInteger = __webpack_require__(18), defined = __webpack_require__(14);
        // true  -> String#at
        // false -> String#codePointAt
        module.exports = function(TO_STRING) {
            return function(that, pos) {
                var a, b, s = String(defined(that)), i = toInteger(pos), l = s.length;
                return i < 0 || i >= l ? TO_STRING ? "" : void 0 : (a = s.charCodeAt(i), a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : b - 56320 + (a - 55296 << 10) + 65536);
            };
        };
    }, /* 60 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var create = __webpack_require__(21), descriptor = __webpack_require__(13), setToStringTag = __webpack_require__(24), IteratorPrototype = {};
        // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
        __webpack_require__(6)(IteratorPrototype, __webpack_require__(8)("iterator"), function() {
            return this;
        }), module.exports = function(Constructor, NAME, next) {
            Constructor.prototype = create(IteratorPrototype, {
                next: descriptor(1, next)
            }), setToStringTag(Constructor, NAME + " Iterator");
        };
    }, /* 61 */
    /***/
    function(module, exports, __webpack_require__) {
        var dP = __webpack_require__(3), anObject = __webpack_require__(9), getKeys = __webpack_require__(22);
        module.exports = __webpack_require__(4) ? Object.defineProperties : function(O, Properties) {
            anObject(O);
            for (var P, keys = getKeys(Properties), length = keys.length, i = 0; length > i; ) dP.f(O, P = keys[i++], Properties[P]);
            return O;
        };
    }, /* 62 */
    /***/
    function(module, exports, __webpack_require__) {
        // fallback for non-array-like ES3 and non-enumerable old V8 strings
        var cof = __webpack_require__(39);
        // eslint-disable-next-line no-prototype-builtins
        module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
            return "String" == cof(it) ? it.split("") : Object(it);
        };
    }, /* 63 */
    /***/
    function(module, exports, __webpack_require__) {
        // false -> Array#indexOf
        // true  -> Array#includes
        var toIObject = __webpack_require__(7), toLength = __webpack_require__(64), toAbsoluteIndex = __webpack_require__(65);
        module.exports = function(IS_INCLUDES) {
            return function($this, el, fromIndex) {
                var value, O = toIObject($this), length = toLength(O.length), index = toAbsoluteIndex(fromIndex, length);
                // Array#includes uses SameValueZero equality algorithm
                // eslint-disable-next-line no-self-compare
                if (IS_INCLUDES && el != el) {
                    for (;length > index; ) // eslint-disable-next-line no-self-compare
                    if ((value = O[index++]) != value) return !0;
                } else for (;length > index; index++) if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
                return !IS_INCLUDES && -1;
            };
        };
    }, /* 64 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.1.15 ToLength
        var toInteger = __webpack_require__(18), min = Math.min;
        module.exports = function(it) {
            return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
        };
    }, /* 65 */
    /***/
    function(module, exports, __webpack_require__) {
        var toInteger = __webpack_require__(18), max = Math.max, min = Math.min;
        module.exports = function(index, length) {
            return index = toInteger(index), index < 0 ? max(index + length, 0) : min(index, length);
        };
    }, /* 66 */
    /***/
    function(module, exports, __webpack_require__) {
        var document = __webpack_require__(0).document;
        module.exports = document && document.documentElement;
    }, /* 67 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(68);
        for (var global = __webpack_require__(0), hide = __webpack_require__(6), Iterators = __webpack_require__(20), TO_STRING_TAG = __webpack_require__(8)("toStringTag"), DOMIterables = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), i = 0; i < DOMIterables.length; i++) {
            var NAME = DOMIterables[i], Collection = global[NAME], proto = Collection && Collection.prototype;
            proto && !proto[TO_STRING_TAG] && hide(proto, TO_STRING_TAG, NAME), Iterators[NAME] = Iterators.Array;
        }
    }, /* 68 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var addToUnscopables = __webpack_require__(69), step = __webpack_require__(70), Iterators = __webpack_require__(20), toIObject = __webpack_require__(7);
        // 22.1.3.4 Array.prototype.entries()
        // 22.1.3.13 Array.prototype.keys()
        // 22.1.3.29 Array.prototype.values()
        // 22.1.3.30 Array.prototype[@@iterator]()
        module.exports = __webpack_require__(36)(Array, "Array", function(iterated, kind) {
            this._t = toIObject(iterated), // target
            this._i = 0, // next index
            this._k = kind;
        }, function() {
            var O = this._t, kind = this._k, index = this._i++;
            return !O || index >= O.length ? (this._t = void 0, step(1)) : "keys" == kind ? step(0, index) : "values" == kind ? step(0, O[index]) : step(0, [ index, O[index] ]);
        }, "values"), // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
        Iterators.Arguments = Iterators.Array, addToUnscopables("keys"), addToUnscopables("values"), 
        addToUnscopables("entries");
    }, /* 69 */
    /***/
    function(module, exports) {
        module.exports = function() {};
    }, /* 70 */
    /***/
    function(module, exports) {
        module.exports = function(done, value) {
            return {
                value: value,
                done: !!done
            };
        };
    }, /* 71 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(72),
            __esModule: !0
        };
    }, /* 72 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(73), __webpack_require__(78), __webpack_require__(79), __webpack_require__(80), 
        module.exports = __webpack_require__(1).Symbol;
    }, /* 73 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        // ECMAScript 6 symbols shim
        var global = __webpack_require__(0), has = __webpack_require__(2), DESCRIPTORS = __webpack_require__(4), $export = __webpack_require__(5), redefine = __webpack_require__(37), META = __webpack_require__(74).KEY, $fails = __webpack_require__(11), shared = __webpack_require__(16), setToStringTag = __webpack_require__(24), uid = __webpack_require__(12), wks = __webpack_require__(8), wksExt = __webpack_require__(25), wksDefine = __webpack_require__(26), enumKeys = __webpack_require__(75), isArray = __webpack_require__(76), anObject = __webpack_require__(9), toIObject = __webpack_require__(7), toPrimitive = __webpack_require__(17), createDesc = __webpack_require__(13), _create = __webpack_require__(21), gOPNExt = __webpack_require__(77), $GOPD = __webpack_require__(42), $DP = __webpack_require__(3), $keys = __webpack_require__(22), gOPD = $GOPD.f, dP = $DP.f, gOPN = gOPNExt.f, $Symbol = global.Symbol, $JSON = global.JSON, _stringify = $JSON && $JSON.stringify, HIDDEN = wks("_hidden"), TO_PRIMITIVE = wks("toPrimitive"), isEnum = {}.propertyIsEnumerable, SymbolRegistry = shared("symbol-registry"), AllSymbols = shared("symbols"), OPSymbols = shared("op-symbols"), ObjectProto = Object.prototype, USE_NATIVE = "function" == typeof $Symbol, QObject = global.QObject, setter = !QObject || !QObject.prototype || !QObject.prototype.findChild, setSymbolDesc = DESCRIPTORS && $fails(function() {
            return 7 != _create(dP({}, "a", {
                get: function() {
                    return dP(this, "a", {
                        value: 7
                    }).a;
                }
            })).a;
        }) ? function(it, key, D) {
            var protoDesc = gOPD(ObjectProto, key);
            protoDesc && delete ObjectProto[key], dP(it, key, D), protoDesc && it !== ObjectProto && dP(ObjectProto, key, protoDesc);
        } : dP, wrap = function(tag) {
            var sym = AllSymbols[tag] = _create($Symbol.prototype);
            return sym._k = tag, sym;
        }, isSymbol = USE_NATIVE && "symbol" == typeof $Symbol.iterator ? function(it) {
            return "symbol" == typeof it;
        } : function(it) {
            return it instanceof $Symbol;
        }, $defineProperty = function(it, key, D) {
            return it === ObjectProto && $defineProperty(OPSymbols, key, D), anObject(it), key = toPrimitive(key, !0), 
            anObject(D), has(AllSymbols, key) ? (D.enumerable ? (has(it, HIDDEN) && it[HIDDEN][key] && (it[HIDDEN][key] = !1), 
            D = _create(D, {
                enumerable: createDesc(0, !1)
            })) : (has(it, HIDDEN) || dP(it, HIDDEN, createDesc(1, {})), it[HIDDEN][key] = !0), 
            setSymbolDesc(it, key, D)) : dP(it, key, D);
        }, $defineProperties = function(it, P) {
            anObject(it);
            for (var key, keys = enumKeys(P = toIObject(P)), i = 0, l = keys.length; l > i; ) $defineProperty(it, key = keys[i++], P[key]);
            return it;
        }, $create = function(it, P) {
            return void 0 === P ? _create(it) : $defineProperties(_create(it), P);
        }, $propertyIsEnumerable = function(key) {
            var E = isEnum.call(this, key = toPrimitive(key, !0));
            return !(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) && (!(E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]) || E);
        }, $getOwnPropertyDescriptor = function(it, key) {
            if (it = toIObject(it), key = toPrimitive(key, !0), it !== ObjectProto || !has(AllSymbols, key) || has(OPSymbols, key)) {
                var D = gOPD(it, key);
                return !D || !has(AllSymbols, key) || has(it, HIDDEN) && it[HIDDEN][key] || (D.enumerable = !0), 
                D;
            }
        }, $getOwnPropertyNames = function(it) {
            for (var key, names = gOPN(toIObject(it)), result = [], i = 0; names.length > i; ) has(AllSymbols, key = names[i++]) || key == HIDDEN || key == META || result.push(key);
            return result;
        }, $getOwnPropertySymbols = function(it) {
            for (var key, IS_OP = it === ObjectProto, names = gOPN(IS_OP ? OPSymbols : toIObject(it)), result = [], i = 0; names.length > i; ) !has(AllSymbols, key = names[i++]) || IS_OP && !has(ObjectProto, key) || result.push(AllSymbols[key]);
            return result;
        };
        // 19.4.1.1 Symbol([description])
        USE_NATIVE || ($Symbol = function() {
            if (this instanceof $Symbol) throw TypeError("Symbol is not a constructor!");
            var tag = uid(arguments.length > 0 ? arguments[0] : void 0), $set = function(value) {
                this === ObjectProto && $set.call(OPSymbols, value), has(this, HIDDEN) && has(this[HIDDEN], tag) && (this[HIDDEN][tag] = !1), 
                setSymbolDesc(this, tag, createDesc(1, value));
            };
            return DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
                configurable: !0,
                set: $set
            }), wrap(tag);
        }, redefine($Symbol.prototype, "toString", function() {
            return this._k;
        }), $GOPD.f = $getOwnPropertyDescriptor, $DP.f = $defineProperty, __webpack_require__(41).f = gOPNExt.f = $getOwnPropertyNames, 
        __webpack_require__(27).f = $propertyIsEnumerable, __webpack_require__(40).f = $getOwnPropertySymbols, 
        DESCRIPTORS && !__webpack_require__(19) && redefine(ObjectProto, "propertyIsEnumerable", $propertyIsEnumerable, !0), 
        wksExt.f = function(name) {
            return wrap(wks(name));
        }), $export($export.G + $export.W + $export.F * !USE_NATIVE, {
            Symbol: $Symbol
        });
        for (var es6Symbols = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), j = 0; es6Symbols.length > j; ) wks(es6Symbols[j++]);
        for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k; ) wksDefine(wellKnownSymbols[k++]);
        $export($export.S + $export.F * !USE_NATIVE, "Symbol", {
            // 19.4.2.1 Symbol.for(key)
            for: function(key) {
                return has(SymbolRegistry, key += "") ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
            },
            // 19.4.2.5 Symbol.keyFor(sym)
            keyFor: function(sym) {
                if (!isSymbol(sym)) throw TypeError(sym + " is not a symbol!");
                for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
            },
            useSetter: function() {
                setter = !0;
            },
            useSimple: function() {
                setter = !1;
            }
        }), $export($export.S + $export.F * !USE_NATIVE, "Object", {
            // 19.1.2.2 Object.create(O [, Properties])
            create: $create,
            // 19.1.2.4 Object.defineProperty(O, P, Attributes)
            defineProperty: $defineProperty,
            // 19.1.2.3 Object.defineProperties(O, Properties)
            defineProperties: $defineProperties,
            // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
            getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
            // 19.1.2.7 Object.getOwnPropertyNames(O)
            getOwnPropertyNames: $getOwnPropertyNames,
            // 19.1.2.8 Object.getOwnPropertySymbols(O)
            getOwnPropertySymbols: $getOwnPropertySymbols
        }), // 24.3.2 JSON.stringify(value [, replacer [, space]])
        $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function() {
            var S = $Symbol();
            // MS Edge converts symbol values to JSON as {}
            // WebKit converts symbol values to JSON as null
            // V8 throws on boxed symbols
            return "[null]" != _stringify([ S ]) || "{}" != _stringify({
                a: S
            }) || "{}" != _stringify(Object(S));
        })), "JSON", {
            stringify: function(it) {
                if (void 0 !== it && !isSymbol(it)) {
                    for (// IE8 returns string on undefined
                    var replacer, $replacer, args = [ it ], i = 1; arguments.length > i; ) args.push(arguments[i++]);
                    return replacer = args[1], "function" == typeof replacer && ($replacer = replacer), 
                    !$replacer && isArray(replacer) || (replacer = function(key, value) {
                        if ($replacer && (value = $replacer.call(this, key, value)), !isSymbol(value)) return value;
                    }), args[1] = replacer, _stringify.apply($JSON, args);
                }
            }
        }), // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
        $Symbol.prototype[TO_PRIMITIVE] || __webpack_require__(6)($Symbol.prototype, TO_PRIMITIVE, $Symbol.prototype.valueOf), 
        // 19.4.3.5 Symbol.prototype[@@toStringTag]
        setToStringTag($Symbol, "Symbol"), // 20.2.1.9 Math[@@toStringTag]
        setToStringTag(Math, "Math", !0), // 24.3.3 JSON[@@toStringTag]
        setToStringTag(global.JSON, "JSON", !0);
    }, /* 74 */
    /***/
    function(module, exports, __webpack_require__) {
        var META = __webpack_require__(12)("meta"), isObject = __webpack_require__(10), has = __webpack_require__(2), setDesc = __webpack_require__(3).f, id = 0, isExtensible = Object.isExtensible || function() {
            return !0;
        }, FREEZE = !__webpack_require__(11)(function() {
            return isExtensible(Object.preventExtensions({}));
        }), setMeta = function(it) {
            setDesc(it, META, {
                value: {
                    i: "O" + ++id,
                    // object ID
                    w: {}
                }
            });
        }, fastKey = function(it, create) {
            // return primitive with prefix
            if (!isObject(it)) return "symbol" == typeof it ? it : ("string" == typeof it ? "S" : "P") + it;
            if (!has(it, META)) {
                // can't set metadata to uncaught frozen object
                if (!isExtensible(it)) return "F";
                // not necessary to add metadata
                if (!create) return "E";
                // add missing metadata
                setMeta(it);
            }
            return it[META].i;
        }, getWeak = function(it, create) {
            if (!has(it, META)) {
                // can't set metadata to uncaught frozen object
                if (!isExtensible(it)) return !0;
                // not necessary to add metadata
                if (!create) return !1;
                // add missing metadata
                setMeta(it);
            }
            return it[META].w;
        }, onFreeze = function(it) {
            return FREEZE && meta.NEED && isExtensible(it) && !has(it, META) && setMeta(it), 
            it;
        }, meta = module.exports = {
            KEY: META,
            NEED: !1,
            fastKey: fastKey,
            getWeak: getWeak,
            onFreeze: onFreeze
        };
    }, /* 75 */
    /***/
    function(module, exports, __webpack_require__) {
        // all enumerable object keys, includes symbols
        var getKeys = __webpack_require__(22), gOPS = __webpack_require__(40), pIE = __webpack_require__(27);
        module.exports = function(it) {
            var result = getKeys(it), getSymbols = gOPS.f;
            if (getSymbols) for (var key, symbols = getSymbols(it), isEnum = pIE.f, i = 0; symbols.length > i; ) isEnum.call(it, key = symbols[i++]) && result.push(key);
            return result;
        };
    }, /* 76 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.2.2 IsArray(argument)
        var cof = __webpack_require__(39);
        module.exports = Array.isArray || function(arg) {
            return "Array" == cof(arg);
        };
    }, /* 77 */
    /***/
    function(module, exports, __webpack_require__) {
        // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
        var toIObject = __webpack_require__(7), gOPN = __webpack_require__(41).f, toString = {}.toString, windowNames = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], getWindowNames = function(it) {
            try {
                return gOPN(it);
            } catch (e) {
                return windowNames.slice();
            }
        };
        module.exports.f = function(it) {
            return windowNames && "[object Window]" == toString.call(it) ? getWindowNames(it) : gOPN(toIObject(it));
        };
    }, /* 78 */
    /***/
    function(module, exports) {}, /* 79 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(26)("asyncIterator");
    }, /* 80 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(26)("observable");
    }, /* 81 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        exports.__esModule = !0;
        var _setPrototypeOf = __webpack_require__(82), _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf), _create = __webpack_require__(86), _create2 = _interopRequireDefault(_create), _typeof2 = __webpack_require__(35), _typeof3 = _interopRequireDefault(_typeof2);
        exports.default = function(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === superClass ? "undefined" : (0, 
            _typeof3.default)(superClass)));
            subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (_setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass);
        };
    }, /* 82 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(83),
            __esModule: !0
        };
    }, /* 83 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(84), module.exports = __webpack_require__(1).Object.setPrototypeOf;
    }, /* 84 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.3.19 Object.setPrototypeOf(O, proto)
        var $export = __webpack_require__(5);
        $export($export.S, "Object", {
            setPrototypeOf: __webpack_require__(85).set
        });
    }, /* 85 */
    /***/
    function(module, exports, __webpack_require__) {
        // Works with __proto__ only. Old v8 can't work with null proto objects.
        /* eslint-disable no-proto */
        var isObject = __webpack_require__(10), anObject = __webpack_require__(9), check = function(O, proto) {
            if (anObject(O), !isObject(proto) && null !== proto) throw TypeError(proto + ": can't set as prototype!");
        };
        module.exports = {
            set: Object.setPrototypeOf || ("__proto__" in {} ? // eslint-disable-line
            function(test, buggy, set) {
                try {
                    set = __webpack_require__(32)(Function.call, __webpack_require__(42).f(Object.prototype, "__proto__").set, 2), 
                    set(test, []), buggy = !(test instanceof Array);
                } catch (e) {
                    buggy = !0;
                }
                return function(O, proto) {
                    return check(O, proto), buggy ? O.__proto__ = proto : set(O, proto), O;
                };
            }({}, !1) : void 0),
            check: check
        };
    }, /* 86 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(87),
            __esModule: !0
        };
    }, /* 87 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(88);
        var $Object = __webpack_require__(1).Object;
        module.exports = function(P, D) {
            return $Object.create(P, D);
        };
    }, /* 88 */
    /***/
    function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(5);
        // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
        $export($export.S, "Object", {
            create: __webpack_require__(21)
        });
    } ]);
});