let _createClass = function () {
    function defineProperties(target, props) {
        for (let i = 0; i < props.length; i++) {
            let descriptor = props[i];
            descriptor.enumerable = true;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperties(target, descriptor.key, descriptor)
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    }
}()
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
let Parent = function () {
    function Parent(name) {
        _classCallCheck(this, Parent);
        this.name = name;
    }
    _createClass(Parent, [{ key: 'say', value: function say() { console.log('say') } }], []);
    return Parent;
}()


function main(promiseGenerator, interval = 5000, iteration = 50) {
    return new Promise((resolve, reject) => {
        const tasks = [];
        for (let i = 0; i < iteration; i++) {
            tasks.push(promiseGenerator.next().value);
            tasks.push(delay(interval))
        }
        return chain(tasks.slice(0, tasks.length - 1))
    })
}

const delay = time => new Promise((resolve) => setTimeout(resolve, time))
function chain(tasks) {
    return tasks.reduce((chain, task) =>
        chain.then((results = []) =>
            task.then(result => [...results, result])
        )
    )
}














/* 

codewares

webpack--jsonp
react--yuanma

*/


function solution(num) {
    let arr = [];
    for (let i = 1; i < num; i++) {
        if (i % 3 === 0 || i % 5 === 0) {
            arr.push(i);
        }
    }
    return arr.reduce((sum, currentValue) => sum + currentValue, 0)
}
console.log(solution(16))



function bsearch(A, x) {
    let min = 0,
        max = A.length - 1,
        guess;
    while (min <= max) {
        guess = Math.floor((max + min) / 2);
        if (A[guess] === x) return guess;
        if (max - min === 1) return max;
        if (A[guess] > x) {
            max = guess - 1;
        } else {
            min = guess + 1;
        }
    }
}
let A=[3,5,7,13,22,25]
console.log(bsearch(A,4))


/* 
Ronny the robot is watching someone perform the Cups and Balls magic trick. The magician has one ball and three cups,
he shows Ronny which cup he hides the ball under (b), he then mixes all the cups around by performing multiple two-cup switches (arr).
Ronny can record the switches but can't work out where the ball is. Write a programme to help him do this.

Rules:

There will only ever be three cups.
Only two cups will be swapped at a time.
The cups and their switches will be refered to by their index in a row of three, 
beginning at one. So [[1,2]] means the cup at position one, is swapped with the cup at position two.
Arr will be an array of integers 1 - 3 organised in pairs.
There won't be any empty sub-arrays.
If arr is just an empty array b should be returned.
Examples:

(b) = 2, (arr) = [[1,2]]

The ball is under cup number : 1

(b) = 1, (arr) = [[2,3],[1,2],[1,2]]

The ball is under cup number : 1

(b) = 2, (arr) = [[1,3],[1,2],[2,1],[2,3]]

The ball is under cup number : 3

*/



/* 
The goal of this exercise is to convert a string to a new string 
where each character in the new string is '(' if that character appears only once in the original string, or ')' 
if that character appears more than once in the original string. Ignore capitalization when determining if a character is a duplicate.

Examples:

"din" => "((("

"recede" => "()()()"

"Success" => ")())())" 
"(( @" => "))(("


Notes:

Assertion messages may be unclear about what they display in some languages.
 If you read "...It Should encode XXX", the "XXX" is actually the expected result,
  not the input! (these languages are locked so that's not possible to correct it).

*/



/* 
Count the number of Duplicates
Write a function that will return the count of distinct case-insensitive alphabetic characters and numeric digits that occur more than 
once in the input string. The input string can be assumed to contain only alphabets (both uppercase and lowercase) and numeric digits.

Example
"abcde" -> 0 # no characters repeats more than once
"aabbcde" -> 2 # 'a' and 'b'
"aabBcde" -> 2 # 'a' occurs twice and 'b' twice (bandB)
"indivisibility" -> 1 # 'i' occurs six times
"Indivisibilities" -> 2 # 'i' occurs seven times and 's' occurs twice
"aA11" -> 2 # 'a' and '1'
"ABBA" -> 2 # 'A' and 'B' each occur twice
*/


/* 
Write a function, persistence, that takes in a positive parameter num and returns its multiplicative persistence, 
which is the number of times you must multiply the digits in num until you reach a single digit.

For example:

 persistence(39) === 3 // because 3*9 = 27, 2*7 = 14, 1*4=4
                       // and 4 has only one digit

 persistence(999) === 4 // because 9*9*9 = 729, 7*2*9 = 126,
                        // 1*2*6 = 12, and finally 1*2 = 2

 persistence(4) === 0 // because 4 is already a one-digit number
*/

/* 
Check to see if a string has the same amount of 'x's and 'o's. The method must return a boolean and be case insensitive.
 The string can contain any char.

Examples input/output:

XO("ooxx") => true
XO("xooxx") => false
XO("ooxXm") => true
XO("zpzpzpp") => true // when no 'x' and 'o' is present should return true
XO("zzoo") => false
*/


/* 
Implement a method that accepts 3 integer values a, b, c. 
The method should return true if a triangle can be built with the sides of given length and false in any other case.

(In this case, all triangles must have surface greater than 0 to be accepted).

*/



/* 
A digital root is the recursive sum of all the digits in a number. Given n, take the sum of the digits of n. 
If that value has two digits, continue reducing in this way until a single-digit number is produced. 
This is only applicable to the natural numbers.

Here's how it works (Ruby example given):

digital_root(16)
=> 1 + 6
=> 7

digital_root(942)
=> 9 + 4 + 2
=> 15 ...
=> 1 + 5
=> 6

digital_root(132189)
=> 1 + 3 + 2 + 1 + 8 + 9
=> 24 ...
=> 2 + 4
=> 6

digital_root(493193)
=> 4 + 9 + 3 + 1 + 9 + 3
=> 29 ...
=> 2 + 9
=> 11 ...
=> 1 + 1
=> 2
*/




