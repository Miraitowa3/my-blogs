---
title: 动态执行js

categories:
  - 前端端基础/JavaScript
---

## 动态执行js
**动态执行js的四种方式**
1. eval(同步、当前作用域)
2. setTimeout(异步、全局作用域)
3. script(同步、全局作用域)
4. Function(同步、全局作用域)(推荐)


### eval

* 直接调用
如果你直接的使用 eval()，它工作在局部作用域下。



* 间接调用
如果你间接的使用 eval()，比如通过一个引用来调用它，而不是直接的调用[eval](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval)
。从 ECMAScript 5 起，它工作在全局作用域下，而不是局部作用域中。这就意味着，例如，下面的代码的作用声明创建一个全局函数，并且 eval 中的这些代码在执行期间不能在被调用的作用域中访问局部变量。

```js
function test() {
  var x = 2,
    y = 4;
  console.log(eval("x + y")); // 直接调用，使用本地作用域，结果是 6
  var geval = eval; // 等价于在全局作用域调用
  console.log(geval("x + y")); // 间接调用，使用全局作用域，throws ReferenceError 因为 `x` 未定义
  (0, eval)("x + y"); // 另一个间接调用的例子
}
```

### setTimeout

[setTimeout](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout);全局作用域、异步
允许你包含在定时器到期后编译和执行的字符串而非函数。使用该语法是不推荐的，原因和使用 eval() 一样，有安全风险。
* 语法

```js
setTimeout(code)
setTimeout(code, delay)
```

setTimeout 用来设置定时器，其第一个参数可以传入函数，也可以传入代码片段。传入函数时，函数的作用域是正常的函数作用域。传入代码片段时，没有自己的作用域，其执行时作用域是全局作用域。

```js
var a = -100;
(function () {
    var a = 0;

    // setTimeout 执行的代码段，没有自己的作用域，运行在全局作用域中
    var dynameicCode = "console.log(a)";
    setTimeout(dynameicCode, 10); // -100

    // setTimeout 执行的代码段，初始化语句会添加变量到 window 上
    var dynameicCode = "var b = 200;";
    setTimeout(dynameicCode, 10);
    setTimeout(function() {
        console.log('window.b', window.b); // window.b 200
    }, 20);

})();
```

### script
动态创建 script 节点，也是一种动态执行语句的方式。其创建的 script 和普通 script 没有区别，代码的作用域是全局作用域。需要注意 script 应该使用 document.createElement('script') 创建并插入到文档中。使用 innerHTML 插入 script 的方式，脚本不会执行。

```js
(function() {
    var a = 1;
    var s = document.createElement('script');

    s.textContent = "console.log(a)";
    #或者
    s.innerHtml = "console.log(a)";

    document.documentElement.append(s);
})();
```
### Function(推荐)

由 [Function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function) 构造函数创建的函数不会创建当前环境的闭包，它们总是被创建于全局环境，因此在运行时它们只能访问全局变量和自己的局部变量，不能访问它们被 Function 构造函数创建时所在的作用域的变量。这一点与使用 eval() 执行创建函数的代码不同

```js
// 使用 `var` 创建一个全局属性
var x = 10;

function createFunction1() {
  const x = 20;
  return new Function("return x;"); // 这个 `x` 指的是全局 `x`
}

function createFunction2() {
  const x = 20;
  function f() {
    return x; // 这个 `x` 指的是上面的局部 `x`
  }
  return f;
}

const f1 = createFunction1();
console.log(f1()); // 10
const f2 = createFunction2();
console.log(f2()); // 20

```
