





function getSingle(fn) {
    let div;
    return function () {
        return div || (div = fn.apply(this, arguments))
    }
}
function createLoginLayer() {
    let div = document.createElement('div');
    div.innerHTML = 'I am login layer.';
    document.body.append(div);
    return div;
}

let createSingleLoginLayer = getSingle(createLoginLayer);
let login1 = createSingleLoginLayer();
let login2 = createSingleLoginLayer();
console.log(login1 === login2);