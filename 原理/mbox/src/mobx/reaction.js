
let nowFn = null; //当前的autorun方法

let counter = 0;

class Reaction {
    constructor() {
        this.id = ++counter;
        this.store = {};
    }
    static start(handler) {
        nowFn = handler
    }
    static end() {
        nowFn = null;
    }
    collect() {
        if (nowFn) {
            this.store[this.id] = this.store[this.id] || [];
            this.store[this.id].push(nowFn);
        }
    }
    run() {
        this.store[this.id].forEach(w => {
            w();
        })
    }
}
export default Reaction

