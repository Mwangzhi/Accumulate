
function loader(source) {
    console.log('loader1')
    return source;
}
loader.pitch = function () {
    console.log('loader1--ptich')
}
module.exports = loader;