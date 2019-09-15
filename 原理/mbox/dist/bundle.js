/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mobx */ \"./src/mobx/index.js\");\nvar _class, _descriptor, _descriptor2, _temp;\n\nfunction _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }\n\nfunction _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }\n\n\nvar Person = (_class = (_temp =\n/*#__PURE__*/\nfunction () {\n  function Person() {\n    _classCallCheck(this, Person);\n\n    _initializerDefineProperty(this, \"name\", _descriptor, this);\n\n    _initializerDefineProperty(this, \"age\", _descriptor2, this);\n  }\n\n  _createClass(Person, [{\n    key: \"allName\",\n    get: function get() {\n      return this.name + '-' + this.age;\n    }\n  }]);\n\n  return Person;\n}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, \"name\", [_mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]], {\n  configurable: true,\n  enumerable: true,\n  writable: true,\n  initializer: function initializer() {\n    return 'wangzhi';\n  }\n}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, \"age\", [_mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]], {\n  configurable: true,\n  enumerable: true,\n  writable: true,\n  initializer: function initializer() {\n    return '29';\n  }\n})), _class);\nvar p = new Person();\nObject(_mobx__WEBPACK_IMPORTED_MODULE_0__[\"autorun\"])(function () {\n  console.log(p.allName);\n});\np.name = 'wz'; //原型方法修饰\n// class Person{\n//     @say\n//     say() {\n//         console.log('哈哈')\n//     }\n// }\n// function say(target, key, descriptor) {\n//     let oldSay = descriptor.value;\n//     descriptor.value = function () {\n//         console.log('start say');\n//         oldSay();\n//         console.log('end say')\n//     }\n// }\n// let p = new Person();\n// p.say()\n// //属性修饰\n// class Circle{\n//     @readonly PI = 3.14;\n// }\n// //修饰属性的时候，target指代原型，key指代本身，descriptor指代属性描述符\n// function readonly(target,key,descriptor) {\n//     descriptor.writable = false;\n//     return descriptor\n// }\n// //类装饰\n// @add\n// class My {\n// }\n// //修饰类的时候，target指代的是类本身\n// function add(target) {\n//     target.flag = 'ok'\n// }\n// console.log(My.flag)\n// let o = observable([])\n// autorun(() => {\n//     console.log(o.length)\n// })\n// o.push(30)\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/mobx/autorun.js":
/*!*****************************!*\
  !*** ./src/mobx/autorun.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _reaction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reaction */ \"./src/mobx/reaction.js\");\n\n\nvar autorun = function autorun(handler) {\n  _reaction__WEBPACK_IMPORTED_MODULE_0__[\"default\"].start(handler);\n  handler();\n  _reaction__WEBPACK_IMPORTED_MODULE_0__[\"default\"].end();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (autorun);\n\n//# sourceURL=webpack:///./src/mobx/autorun.js?");

/***/ }),

/***/ "./src/mobx/index.js":
/*!***************************!*\
  !*** ./src/mobx/index.js ***!
  \***************************/
/*! exports provided: autorun, observable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _autorun__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./autorun */ \"./src/mobx/autorun.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"autorun\", function() { return _autorun__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observer */ \"./src/mobx/observer.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"observable\", function() { return _observer__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///./src/mobx/index.js?");

/***/ }),

/***/ "./src/mobx/observer.js":
/*!******************************!*\
  !*** ./src/mobx/observer.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _reaction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reaction */ \"./src/mobx/reaction.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\nfunction deepProxy(val, handler) {\n  if (_typeof(val) !== 'object') return val;\n\n  for (var key in val) {\n    val[key] = deepProxy(val[key], handler); //从里往外实现深度代理\n  }\n\n  return new Proxy(val, handler());\n}\n\nfunction createObservable(val) {\n  var handler = function handler() {\n    var reaction = new _reaction__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    return {\n      set: function set(target, key, value) {\n        if (key === 'length') return Reflect.set(target, key, value);\n        var r = Reflect.set(target, key, value);\n        reaction.run();\n        return r;\n      },\n      get: function get(target, key) {\n        reaction.collect();\n        return Reflect.get(target, key);\n      }\n    };\n  };\n\n  return deepProxy(val, handler);\n}\n\nvar observable = function observable(target, key, descriptor) {\n  if (typeof key === 'string') {\n    var v = descriptor.initializer();\n    var reaction = new _reaction__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    v = createObservable(v);\n    return {\n      enumerable: true,\n      configurable: true,\n      get: function get() {\n        reaction.collect();\n        return v;\n      },\n      set: function set(value) {\n        v = value;\n        reaction.run();\n      }\n    };\n  }\n\n  return createObservable(target);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (observable);\n\n//# sourceURL=webpack:///./src/mobx/observer.js?");

/***/ }),

/***/ "./src/mobx/reaction.js":
/*!******************************!*\
  !*** ./src/mobx/reaction.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar nowFn = null; //当前的autorun方法\n\nvar counter = 0;\n\nvar Reaction =\n/*#__PURE__*/\nfunction () {\n  function Reaction() {\n    _classCallCheck(this, Reaction);\n\n    this.id = ++counter;\n    this.store = {};\n  }\n\n  _createClass(Reaction, [{\n    key: \"collect\",\n    value: function collect() {\n      if (nowFn) {\n        this.store[this.id] = this.store[this.id] || [];\n        this.store[this.id].push(nowFn);\n      }\n    }\n  }, {\n    key: \"run\",\n    value: function run() {\n      this.store[this.id].forEach(function (w) {\n        w();\n      });\n    }\n  }], [{\n    key: \"start\",\n    value: function start(handler) {\n      nowFn = handler;\n    }\n  }, {\n    key: \"end\",\n    value: function end() {\n      nowFn = null;\n    }\n  }]);\n\n  return Reaction;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Reaction);\n\n//# sourceURL=webpack:///./src/mobx/reaction.js?");

/***/ })

/******/ });