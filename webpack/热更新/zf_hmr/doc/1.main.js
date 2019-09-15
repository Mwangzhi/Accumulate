 (function(modules) { // 启动webpack
 	// The module cache 模块的缓存对象，key是模块ID，值是模块的导出对象export
 	var installedModules = {};

 	// The require function webpack自已实现的require方法
 	function __webpack_require__(moduleId) {

 		// Check if module is in cache 判断一下此模块ID是否在缓存中有
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;//直接返回
 		}
 		// Create a new module (and put it into the cache)
     //创建一个新的模块对象 并且放到了缓存中
 		var module = installedModules[moduleId] = {
 			i: moduleId,//模块的ID
 			l: false,//loaded 是否已经初始化或者加载
 			exports: {}//导出对象
 		};

 		// Execute the module function 执行模块的方法
     //this=module.exports 模块对象 模块的导出对象 webpack自己实现的require方法
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		// Flag the module as loaded 把模块设置为已经加载
 		module.l = true;

 		// Return the exports of the module 返回模块的导出对象
 		return module.exports;
 	}

 	// expose the module cache 把模块的缓存对象放到了require方法的c属性上
 	__webpack_require__.c = installedModules;


 	// Load entry module and return exports 加载入口模块并且返回exports对象
 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
 })
 ({

 "./src/index.js":
 (function(module, exports, __webpack_require__) {

eval(`
var root = document.getElementById('root');
function render(){
  let title = __webpack_require__(\"./src/title.js\").default;
  title = title.__esModule?title.default:title;
  root.innerHTML = title;
  }
  render();`);

 }),

 "./src/title.js":
 (function(module, __webpack_exports__, __webpack_require__) {
eval(`
__webpack_require__.r(__webpack_exports__);//__webpack_exports.__esModule=true;
 __webpack_exports__[\"default\"] = (\"hello3\");`);
 })

 });