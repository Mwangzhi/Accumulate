Object.create()
function create(parentPrototype,props){
    function Fn() {}
    Fn.prototype = parentPrototype;
    let fn = new Fn();
    for(let key in props){
      Object.defineProperty(fn, key, {
        ...props[key],
        enumerable:true
      });
    }
    return fn;
  }