
function loader(source) {
    console.log('loader2')
    return source;
}
loader.pitch = function () {
    console.log('loader2--ptich')
}
module.exports = loader;