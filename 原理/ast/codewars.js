//demo1
Promise.resolve(1).then(res => {
    console.log(1)
    return Promise.resolve(1).then(res2 => {
        console.log(2)
    })
}).then(() => {
    console.log(3)
})
// 1 2 3


//demo2
Promise.resolve(1).then(res => {
    console.log(1);
    Promise.resolve(1).then(res2 => {
        console.log(2)
    })
}).then(() => {
    console.log(3)
})
//1 2 3

//demo3
Promise.resolve(1).then(res => {
    console.log(1);
    new Promise(function (resolve, err) {
        setTimeout(() => {
            resolve();
            console.log(4)
        }, 0);
    }).then(() => { console.log(2) })
}).then(() => {
    console.log(3)
})
//1 3 4 2

Promise.resolve(1).then(res => {
    console.log(1);
    return new Promise(function (resolve, err) {
        setTimeout(() => {
            resolve();
            console.log(4)
        }, 0)
    }).then(() => { console.log(2) })
}).then(() => {
    console.log(3)
})

// 1 4 2 3

