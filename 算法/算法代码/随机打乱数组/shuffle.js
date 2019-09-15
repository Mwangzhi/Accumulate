function shuffle(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        const j = i + ~~(Math.random() * (arr.length - i));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
}
let A = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
shuffle(A)
console.log(A)