let socket = io('/');
class Emitter {
    constructor() {
        this.listeners = {};
    }
    on(type, listener) {
        this.listeners[type] = listener
    }
    emit(type) {
        this.listeners[type] && this.listeners[type]()
    }
}
let hotEmitter = new Emitter();
const onConnected = () => {
    console.log('客户端连接成功');
}
let hotCurrentHash;
let currentHash;
socket.on('hash', (hash) => {
    currentHash = hash;
})
socket.on('ok', () => {
    reloadApp(true)
})
hotEmitter.on('webpackHotUpdate', () => {
    if (!hotCurrentHash || currentHash == hotCurrentHash) {
        return hotCurrentHash = currentHash;
    }
    hotCheck()
});
function hotCheck() {
    hotDownloadManifest().then(update => {
        let chunkIds = Object.keys(update.c);
        chunkIds.forEach(chunkId => {
            hotDownloadUpdateChunk(chunkId)
        })
    })
}
function hotDownloadUpdateChunk(chunkId) {
    let script = document.createElement('script');
    script.charset = 'utf-8';
    script.src = '/' + chunkId + '.' + hotCurrentHash + '.hot-update.js';
    document.head.appendChild(script);
}

function hotDownloadManifest() {
    return new Promise(resolve => {
        let request = new XMLHttpRequest();
        let requestPath = '/' + hotCurrentHash + '.hot-update.json';
        request.open('GET', requestPath, true);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                let update = JSON.parse(request.responseText);
                resolve(update);
            }
        }
        request.send();
    })
}
function reloadApp(hot) {
    if (hot) {
        hotEmitter.emit('webpackHotUpdate')
    } else {
        window.location.reload();
    }
}
window.hotCreateModule = function () {
    let hot = {
        _acceptedDependencies: {},
        dispose() {
            //销毁老的元素
        },
        accept: function (deps, callback) {
            for (let i = 0; i < deps.length; i++) {
                hot._acceptedDependencies[deps[i]] = callback;
            }

        }
    }
    return hot;
}
window.webpackHotUpdate = function (chunkId, moreModules) {
    for (let moduleId in moreModules) {
        let oldModule = __webpack_require__.c[moduleId];
        let { parents, children } = oldModule;
        let module = __webpack_require__.c[moduleId] = {
            i: moduleId,
            l: false,
            exports: {},
            parents,
            children,
            hot: window.hotCreateModule(moduleId)
        }
        moreModules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        parents.forEach(parent => {
            let parentModule = __webpack_require__.c[parent];
            parentModule && parentModule.hot && parentModule.hot._acceptedDependencies[moduleId] && parentModule.hot._acceptedDependencies[moduleId]();

        });
        hotCurrentHash = currentHash;
    }
}
socket.on('connect', onConnected)

























