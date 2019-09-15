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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/array2d.js":
/*!************************!*\
  !*** ./src/array2d.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Generate a two-dimension array\n */\nfunction array2d(rows, cols, fill) {\n  var arr = new Array(rows);\n  var i = arr.length;\n  while (i-- > 0) {\n    arr[i] = new Array(cols);\n    if (fill) {\n\n      for (var j = 0; j < arr[i].length; j++) {\n        arr[i][j] = fill(i, j);\n      }\n    }\n  }\n  return arr;\n}\n\nmodule.exports = array2d;\n\n//# sourceURL=webpack:///./src/array2d.js?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (componentType, props) {\n  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    args[_key - 2] = arguments[_key];\n  }\n\n  return new (Function.prototype.bind.apply(_virtualDom2.default, [null].concat([componentType, props], args)))();\n};\n\nvar _virtualDom = __webpack_require__(/*! ./virtual-dom */ \"./src/virtual-dom.js\");\n\nvar _virtualDom2 = _interopRequireDefault(_virtualDom);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//# sourceURL=webpack:///./src/dom.js?");

/***/ }),

/***/ "./src/edit_distance.js":
/*!******************************!*\
  !*** ./src/edit_distance.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar array2d = __webpack_require__(/*! ./array2d */ \"./src/array2d.js\");\n\nvar REPLACE = 0;\nvar DELETE = 1;\nvar INSERT = 2;\nvar UNCHANGED = 3;\n\nfunction pad(str, n) {\n  str = str + '';\n  for (var i = str.length; i < n; i++) {\n    str = str + ' ';\n  }\n  return str;\n}\n\n/**\n * 基于动态规划的EditDistance算法，用于比较数组，然后获得最优的更新序列\n */\n\nvar EditDistance = function () {\n  function EditDistance(s, t) {\n    var compareFunction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (a, b) {\n      return a === b;\n    };\n\n    _classCallCheck(this, EditDistance);\n\n    this.s = s;\n    this.t = t;\n    this.compareFunction = compareFunction;\n  }\n\n  _createClass(EditDistance, [{\n    key: 'print',\n    value: function print() {\n      var d = this.d;\n      var s = this.s;\n      var t = this.t;\n      var m = d.length;\n      var n = Math.max.apply(Math, _toConsumableArray(d.map(function (x) {\n        return x.length;\n      })));\n\n      console.log([' ', ' '].concat(_toConsumableArray(t)).map(function (c) {\n        return pad(c, 3);\n      }).join(' '));\n      for (var i = 0; i < m; i++) {\n        var line = '';\n        line += pad(i === 0 ? ' ' : s[i - 1], 3) + ' ';\n        for (var j = 0; j < n; j++) {\n          line += pad(d[i][j].v, 3) + ' ';\n        }\n        console.log(line);\n      }\n    }\n\n    /**\n     * 生成编辑序列\n     */\n\n  }, {\n    key: 'edit_seq',\n    value: function edit_seq() {\n\n      var path = [];\n      var p = [this.s.length, this.t.length];\n      while (p) {\n        var t = this.d[p[0]][p[1]];\n        var next = p;\n\n        if (t && p[0] !== 0) {\n\n          var operation = null;\n\n          if (t.op === REPLACE) {\n            operation = {\n              type: REPLACE,\n              at: p[0] - 1,\n              from: this.s[p[0] - 1],\n              to: this.t[p[1] - 1]\n            };\n          } else if (t.op === INSERT) {\n            // insert\n            operation = {\n              type: INSERT,\n              at: p[0],\n              item: this.t[p[1] - 1]\n            };\n          } else if (t.op === DELETE) {\n            // delete\n            operation = {\n              type: DELETE,\n              at: p[0] - 1,\n              item: this.s[p[0] - 1]\n            };\n          } else {\n            operation = {\n              type: UNCHANGED,\n              at: p[0] - 1,\n              from: this.s[p[0] - 1],\n              to: this.t[p[1] - 1]\n            };\n          }\n          operation && path.push(operation);\n        }\n        p = t.p;\n      }\n      return path.reverse();\n    }\n\n    /**\n     * Find edit distance of s & t, with a compare function\n     * s & t must be array like\n     */\n\n  }, {\n    key: 'find',\n    value: function find() {\n      var s = this.s;\n      var t = this.t;\n      var compareFunction = this.compareFunction;\n\n      var m = s.length;\n      var n = t.length;\n\n      // d[i,j] will hold the Levenshtein distance between\n      // (0,...i) & (0, ... j)\n      var d = array2d(m + 1, n + 1, function () {\n        return {};\n      });\n\n      // Initialize first col. and first row\n      for (var i = 0; i <= m; i++) {\n        d[i][0].v = i;\n      }\n      for (var j = 0; j <= n; j++) {\n        d[0][j].v = j;\n      }\n\n      for (var _j = 1; _j <= n; _j++) {\n        for (var _i = 1; _i <= m; _i++) {\n          if (compareFunction(s[_i - 1], t[_j - 1])) {\n            d[_i][_j].v = d[_i - 1][_j - 1].v;\n            d[_i][_j].p = [_i - 1, _j - 1];\n          } else {\n\n            var p = [[_i - 1, _j - 1], [_i - 1, _j], [_i, _j - 1]];\n\n            d[_i][_j].v = Number.MAX_SAFE_INTEGER;\n            for (var k = 0; k < p.length; k++) {\n              var x = p[k];\n              if (d[_i][_j].v > d[x[0]][x[1]].v) {\n                d[_i][_j].v = d[x[0]][x[1]].v;\n                d[_i][_j].p = x;\n\n                d[_i][_j].op = k;\n                // d[i][j].op = 'ins'....\n              }\n            }\n            // Math.min(1,2,3) + 1\n            d[_i][_j].v++;\n          }\n        }\n      }\n\n      this.d = d;\n      return d;\n    }\n  }]);\n\n  return EditDistance;\n}();\n\nmodule.exports = EditDistance;\n\n//# sourceURL=webpack:///./src/edit_distance.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 以下的代码模拟React的基本操作，setState进行组件更新\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Component类代表React.Component\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * render函数代表ReactDOM.render方法\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */\n\n\nvar _dom = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\nvar _dom2 = _interopRequireDefault(_dom);\n\nvar _virtualDom = __webpack_require__(/*! ./virtual-dom */ \"./src/virtual-dom.js\");\n\nvar _virtualDom2 = _interopRequireDefault(_virtualDom);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * 类似React的Component组件的父组件\n */\nvar Component = function () {\n  function Component() {\n    _classCallCheck(this, Component);\n  }\n\n  /**\n   * 更新DOM节点\n   */\n\n\n  _createClass(Component, [{\n    key: 'update',\n    value: function update(vdom) {\n      var oldVdom = this.vdom;\n      var updates = oldVdom.diff(vdom);\n      oldVdom.apply(updates);\n      this.vdom = vdom;\n    }\n  }, {\n    key: 'setState',\n    value: function setState(nextState, callback) {\n      // 保存当前状态，用于回滚\n      var currentState = this.state;\n\n      // 更新状态，进行渲染\n      if (!this.render) {\n        throw '组件没有定义render方法';\n      }\n\n      try {\n        this.state = nextState;\n        var vdom = this.render();\n        this.update(vdom);\n        callback && callback();\n      } catch (ex) {\n        // 发生异常回滚状态\n        this.state = currentState;\n      }\n    }\n  }]);\n\n  return Component;\n}();\n\n/**\n * 类似ReactDOM.render方法\n */\n\n\nfunction render(component, domNode) {\n\n  if (component instanceof _virtualDom2.default) {\n    component.appendToDOMNode(domNode);\n  } else {\n    var vdom = component.render();\n    vdom.appendToDOMNode(domNode);\n  }\n}\n\nvar Counter = function (_Component) {\n  _inherits(Counter, _Component);\n\n  function Counter() {\n    _classCallCheck(this, Counter);\n\n    var _this = _possibleConstructorReturn(this, (Counter.__proto__ || Object.getPrototypeOf(Counter)).call(this));\n\n    _this.handleClick = function (e) {\n      _this.setState({\n        count: _this.state.count + 1\n      });\n    };\n\n    _this.state = {\n      count: 0\n    };\n    return _this;\n  }\n\n  _createClass(Counter, [{\n    key: 'render',\n    value: function render() {\n      return (0, _dom2.default)(\n        'div',\n        null,\n        (0, _dom2.default)(\n          'h1',\n          null,\n          '\\u8FD9\\u662F\\u4E00\\u4E2A\\u8BA1\\u6570\\u5668 : ',\n          this.state.count\n        ),\n        (0, _dom2.default)(\n          'button',\n          { onClick: this.handleClick },\n          '+1'\n        )\n      );\n    }\n  }]);\n\n  return Counter;\n}(Component);\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/shadow_compare.js":
/*!*******************************!*\
  !*** ./src/shadow_compare.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nexports.default = shadow_compare;\n/**\n* 浅比较两个对象\n* @param {*} p1\n* @param {*} p2\n*/\nfunction shadow_compare(a, b) {\n  if (a === null || (typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== 'object' || b === null || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) !== 'object') {\n    return a === b;\n  }\n\n  var propsA = Object.getOwnPropertyDescriptors(a);\n  var propsB = Object.getOwnPropertyDescriptors(b);\n  if (Object.keys(propsA).length !== Object.keys(propsB).length) {\n    return false;\n  }\n  return Object.keys(propsA).every(function (key) {\n    return a[key] === b[key];\n  });\n}\n\n//# sourceURL=webpack:///./src/shadow_compare.js?");

/***/ }),

/***/ "./src/virtual-dom.js":
/*!****************************!*\
  !*** ./src/virtual-dom.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _edit_distance = __webpack_require__(/*! ./edit_distance */ \"./src/edit_distance.js\");\n\nvar _edit_distance2 = _interopRequireDefault(_edit_distance);\n\nvar _shadow_compare = __webpack_require__(/*! ./shadow_compare */ \"./src/shadow_compare.js\");\n\nvar _shadow_compare2 = _interopRequireDefault(_shadow_compare);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar REPLACE_ALL = 1; // 替换全部\nvar REPLACE = 2; // 仅仅替换属性\nvar REPLACE_CHILDREN = 3; // 使用edit-distance的结果对children进行变更\n\n\n/**\n * virtual-dom\n */\n\nvar VDOM = function () {\n  function VDOM(componentType, props) {\n    var _ref,\n        _this = this;\n\n    _classCallCheck(this, VDOM);\n\n    this.componentType = componentType;\n    this.props = props || {};\n    // 有的节点会附有文本\n    this.innerText = null;\n\n    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n      args[_key - 2] = arguments[_key];\n    }\n\n    this.children = (_ref = []).concat.apply(_ref, args);\n\n    /* 为子节点绑定 parentNode */\n    if (this.children.length === 1 && typeof this.children[0] === 'string') {\n      this.innerText = this.children[0];\n      this.children = [];\n    } else {\n      this.children = this.children.map(function (vdom) {\n        if (typeof vdom === 'string') {\n          vdom = new VDOM('text', { text: vdom });\n        }\n        vdom.p = _this;\n        return vdom;\n      });\n    }\n  }\n\n  _createClass(VDOM, [{\n    key: 'diff',\n    value: function diff(v2) {\n      return this.__diff(this, v2);\n    }\n\n    /**\n     * 比较两个虚拟节点并生成操作序列\n     * 因为是深度优先搜索，所以得到的更新序列是从底\n     * 向上的\n     */\n\n  }, {\n    key: '__diff',\n    value: function __diff(v1, v2) {\n\n      // console.log('diff', v1.componentType, v2.componentType)\n      var updates = [];\n\n      // 比较两个dom节点， 然后初步确定一个更新策略\n      // 如果componentType不同，那么就不需要再比较下去，\n      // 当然componentType也可能是某个构造函数\n      if (v1 === v2) {\n        return updates;\n      }\n      if (v1 === null || v2 === null || v1.componentType !== v2.componentType) {\n        updates.push({\n          type: REPLACE_ALL,\n          from: v1,\n          to: v2\n        });\n        return updates;\n      }\n\n      // 浅比较属性，如果不一致那么进行属性的更新\n      if (!(0, _shadow_compare2.default)(v1.props, v2.props) || v1.innerText !== v2.innerText) {\n        updates.push({\n          type: REPLACE,\n          from: v1,\n          to: v2\n        });\n      }\n\n      // 先使用edit_distance算法比较所有子元素\n      var editDistance = new _edit_distance2.default(v1.children, v2.children, function (a, b) {\n        if (a === b) {\n          return true;\n        }\n        if (a === null || b === null) {\n          return false;\n        }\n        if (a.componentType !== b.componentType) {\n          return false;\n        }\n        return (0, _shadow_compare2.default)(a.props, b.props) && a.innerText === b.innerText;\n      });\n\n      editDistance.find();\n\n      // 计算完成的修改序列，根据这个修改序列可以继续向下递归\n      var seq = editDistance.edit_seq();\n\n      var op = null;\n\n      var delOrIns = seq.filter(function (x) {\n        return x.type === 1 || x.type === 2;\n      });\n      var replaceOrUnChange = seq.filter(function (x) {\n        return x.type === 0 || x.type === 3;\n      });\n\n      delOrIns.length > 0 && updates.push({\n        type: REPLACE_CHILDREN,\n        seq: delOrIns\n      });\n\n      // 对所有不需要del和ins的节点都需要\n      // 进行递归计算子元素的更新序列\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = replaceOrUnChange[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var _op = _step.value;\n\n          updates = updates.concat(this.__diff(_op.from, _op.to));\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator.return) {\n            _iterator.return();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n\n      return updates;\n    }\n\n    /**\n     * 应用更新\n     * @param {*} updates\n     */\n\n  }, {\n    key: 'apply',\n    value: function apply(updates) {\n      var _this2 = this;\n\n      updates.forEach(function (update) {\n        switch (update.type) {\n          case REPLACE:\n            {\n              var from = update.from,\n                  to = update.to;\n\n              from.updateProps(to);\n              break;\n            }\n          case REPLACE_CHILDREN:\n            {\n              var seq = update.seq;\n\n\n              seq.forEach(function (op) {\n\n                switch (op.type) {\n                  case 1:\n                    //delet\n                    _this2.delete(op.at);\n                    break;\n                  case 2:\n                    {\n                      // insert\n                      _this2.insert(op.at, op.item);\n                      break;\n                    }\n                }\n              });\n              break;\n            }\n          case REPLACE_ALL:\n            {\n              var _from = update.from,\n                  _to = update.to;\n\n              _this2.transplant(_from, _to);\n              break;\n            }\n\n        }\n      });\n    }\n\n    /**\n     * 将虚拟DOM节点渲染成DOM节点\n     * 如果componentType是字符串，说明是类似div,h1,p等原有的html标签\n     * 如果是其他类型，那么说明是某个VirtualDOM类型，这个类型应该\n     * 拥有renderToDOM方法，那么递归利用。\n     */\n\n  }, {\n    key: 'renderToDomNode',\n    value: function renderToDomNode() {\n      var node = null;\n      if (typeof this.componentType === 'string') {\n\n        node = document.createElement(this.componentType);\n        /* 处理 style & class */\n        if (this.props.style) {\n          for (var key in this.props.style) {\n            node.style[key] = this.props.style[key];\n          }\n        }\n\n        this.props.class && (node.className = this.props.class);\n\n        if (this.innerText) {\n          node.innerHTML = this.innerText;\n        } else {\n          this.children.map(function (vdom) {\n            node.appendChild(vdom.renderToDomNode());\n          });\n        }\n      } else {\n        node = new this.componentType(this.props).renderToDomNode();\n      }\n      this.domNode = node;\n      return node;\n    }\n\n    /**\n     * 将节点to移植到from的位置\n     * @param {*} from\n     * @param {*} to\n     */\n\n  }, {\n    key: 'transplant',\n    value: function transplant(from, to) {\n\n      var p = from.p;\n\n      if (p) {\n        var idx = p.children.indexOf(p.children.find(function (x) {\n          return x === from;\n        }));\n        p.children[idx] = to;\n      }\n\n      if (to) {\n        to.p = p;\n      }\n\n      if (from.domNode) {\n        if (to === null) {\n          if (from.parent) {\n            from.parent.removeChild(from);\n          }\n        } else {\n          from.domNode.parentNode.replaceChild(to.renderToDomNode(), from.domNode);\n        }\n      }\n    }\n\n    /**\n     * 插入一个节点\n     */\n\n  }, {\n    key: 'insert',\n    value: function insert(at, v) {\n      // 插入虚拟dom\n      this.children.splice(at, 0, v);\n\n      // 在dom中插入真实元素\n      if (this.domNode) {\n        var node = this.domNode.children[at];\n        if (node) {\n          this.domNode.insertBefore(v.renderToDomNode(), node);\n        } else {\n          this.domNode.appendChild(v.renderToDomNode());\n        }\n      }\n    }\n\n    /**\n     * 删除一个节点\n     * @param {*} at\n     */\n\n  }, {\n    key: 'delete',\n    value: function _delete(at) {\n      this.children.splice(at, 1);\n\n      if (this.domNode) {\n        var node = this.domNode.children[at];\n        node.parentNode.removeChild(node);\n      }\n    }\n\n    /**\n     * 更新属性\n     */\n\n  }, {\n    key: 'updateProps',\n    value: function updateProps(to) {\n\n      var props = to.props;\n      if (typeof this.componentType === 'string') {\n        if (this.domNode) {\n          // 更新style\n          var nextStyle = props.style || {};\n          var prevStyle = this.props.style || {};\n\n          // 比较prevStyle和nextStyle的异同，进行更新\n          var k1 = Object.keys(prevStyle);\n          var k2 = Object.keys(nextStyle);\n\n          for (var key in prevStyle) {\n            if (nextStyle[key] === undefined) {\n              this.domNode.style[key] = '';\n            }\n          }\n\n          for (var _key2 in nextStyle) {\n            this.domNode.style[_key2] = nextStyle[_key2];\n          }\n\n          // 更新classList\n          this.domNode.className = props.class;\n\n          // 更新文本\n          if (this.innerText !== to.innerText) {\n            this.domNode.innerHTML = to.innerText;\n          }\n        }\n      }\n\n      this.props = props;\n    }\n\n    /**\n     * 将节点追加到一个dom节点上，并记录这个追加的节点\n     * @param {*} domNode\n     */\n\n  }, {\n    key: 'appendToDOMNode',\n    value: function appendToDOMNode(domNode) {\n      var dom = this.renderToDomNode();\n      domNode.appendChild(dom);\n    }\n  }]);\n\n  return VDOM;\n}();\n\nexports.default = VDOM;\n\n//# sourceURL=webpack:///./src/virtual-dom.js?");

/***/ })

/******/ });