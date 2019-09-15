
// 参考 https://github.com/facebook/regenerator/blob/v0.8.22/runtime.js#L234-L245
/* 
1、generator函数会被babel转换成普通的函数。
2、函数内部的yield语句会被转换成一个被while循环包裹着的switch/case语句。
3、case语句除了有固定的case:0和case:end这两种情况外，其他情况就和yield语句对应起来了。
4、生成的函数会转交给内部的regeneratorRuntime.wrap和regeneratorRuntime.mark函数处理。
*/
//原函数如下
"use strict";
function* aaa() {
    yield 1
    yield 2
    return 3
}
// 编译后如下
var _marked =regeneratorRuntime.mark(aaa);

function aaa() {
    return regeneratorRuntime.wrap(function aaa$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return 1;

                case 2:
                    _context.next = 4;
                    return 2;

                case 4:
                    return _context.abrupt("return", 3);

                case 5:
                case "end":
                    return _context.stop();
            }
        }
    }, _marked);
}

// regenerator文件中的相关函数
regeneratorRuntime.mark = function (genFun) {
    genFun.__proto__ = GeneratorFunctionPrototype;
    genFun.prototype = Object.create(Gp);
    return genFun;
};
regeneratorRuntime.wrap=function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);

    generator._invoke = makeInvokeMethod(
        innerFn, self || null,
        new Context(tryLocsList || [])
    );

    return generator;
}
function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
        if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
            // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
            return doneResult();
        }

        while (true) {
            var delegate = context.delegate;
            if (delegate) {
                if (method === "return" ||
                    (method === "throw" && delegate.iterator[method] === undefined)) {
                    // A return or throw (when the delegate iterator has no throw
                    // method) always terminates the yield* loop.
                    context.delegate = null;

                    // If the delegate iterator has a return method, give it a
                    // chance to clean up.
                    var returnMethod = delegate.iterator["return"];
                    if (returnMethod) {
                        var record = tryCatch(returnMethod, delegate.iterator, arg);
                        if (record.type === "throw") {
                            // If the return method threw an exception, let that
                            // exception prevail over the original return or throw.
                            method = "throw";
                            arg = record.arg;
                            continue;
                        }
                    }

                    if (method === "return") {
                        // Continue with the outer return, now that the delegate
                        // iterator has been terminated.
                        continue;
                    }
                }

                var record = tryCatch(
                    delegate.iterator[method],
                    delegate.iterator,
                    arg
                );

                if (record.type === "throw") {
                    context.delegate = null;

                    // Like returning generator.throw(uncaught), but without the
                    // overhead of an extra function call.
                    method = "throw";
                    arg = record.arg;
                    continue;
                }

                // Delegate generator ran and handled its own exceptions so
                // regardless of what the method was, we continue as if it is
                // "next" with an undefined arg.
                method = "next";
                arg = undefined;

                var info = record.arg;
                if (info.done) {
                    context[delegate.resultName] = info.value;
                    context.next = delegate.nextLoc;
                } else {
                    state = GenStateSuspendedYield;
                    return info;
                }

                context.delegate = null;
            }

            if (method === "next") {
                if (state === GenStateSuspendedYield) {
                    context.sent = arg;
                } else {
                    delete context.sent;
                }

            } else if (method === "throw") {
                if (state === GenStateSuspendedStart) {
                    state = GenStateCompleted;
                    throw arg;
                }

                if (context.dispatchException(arg)) {
                    // If the dispatched exception was caught by a catch block,
                    // then let that catch block handle the exception normally.
                    method = "next";
                    arg = undefined;
                }

            } else if (method === "return") {
                context.abrupt("return", arg);
            }

            state = GenStateExecuting;

            var record = tryCatch(innerFn, self, context);
            if (record.type === "normal") {
                // If an exception is thrown from innerFn, we leave state ===
                // GenStateExecuting and loop back for another invocation.
                state = context.done
                    ? GenStateCompleted
                    : GenStateSuspendedYield;

                var info = {
                    value: record.arg,
                    done: context.done
                };

                if (record.arg === ContinueSentinel) {
                    if (context.delegate && method === "next") {
                        // Deliberately forget the last sent value so that we don't
                        // accidentally pass it on to the delegate.
                        arg = undefined;
                    }
                } else {
                    return info;
                }

            } else if (record.type === "throw") {
                state = GenStateCompleted;
                // Dispatch the exception by looping back around to the
                // context.dispatchException(arg) call above.
                method = "throw";
                arg = record.arg;
            }
        }
    };
}

// TCP UDP 区别：https://blog.csdn.net/zhang6223284/article/details/81414149

