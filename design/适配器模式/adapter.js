
class Power {
    charge() {
        return '220V'
    }
}

class Adapter {
    constructor() {
        this.power = new Power()
    }
    charge() {
        let power = this.power.charge()
        return `${power}=>12V`
    }
}

class Client {
    constructor() {
        this.adapter = new Adapter()
    }
    use() {
        console.log(this.adapter.charge())
    }
}
new Client().use()


//场景1：适配参数
function ajax(options) {
    let _default = {
        method: 'GET',
        dataType: 'json'
    }
    for (let attr in options) {
        _default[attr] = options[attr] || _default[attr]
    }
}

function get(url) {
    let options = { method: 'GET', url }
    ajax(options)
}

//场景2：promisify
let fs = require('fs')
function promisify(readFile) {
    return function (filename, encoding) {
        return new Promise((resolve, reject) => {
            readFile(filename, encoding, (err) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }
}




