let r  = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};
 let obj = {name:'zhufeng'};
 //Object.defineProperty(obj, Symbol.toStringTag, { value: 'Module' });
 Object.defineProperty(obj, '__esModule', { value: true });
 console.log(obj.toString()); 
 //如果一个模块里有export import,那么那就是es6 module,   __esModule这样一个属性
 // require()加载的话，就需要
 console.log(obj.__esModule) ;
 obj.__esModule=true;