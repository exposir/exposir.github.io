> # Eternity is the most romantic

- 文章
  - [Vue.js 设计与实现](#vuejs-设计与实现)
  - [重学 Javascript](#重学-javascript)
  - [生酮饮食（keto）](#生酮饮食keto)
  - [徒步游记之香巴拉](#徒步游记之香巴拉)
  - [《Javascript 悟道》读书笔记](#javascript悟道读书笔记)
  - [React 框架选择指北](#react-框架选择指北)
  - [《他改变了中国：江泽民传》书摘](#他改变了中国江泽民传书摘)
- 编程
  - [防抖(debounce)、截流(throttle)](#防抖debounce截流throttle)
- 其他
  - [互联网常用名词](#互联网常用名词)

# 文章

# Vue.js 设计与实现

> 根据《Vue.js 设计与实现》 阅读整理而来

- 框架设计概览
- 响应系统
- 渲染器
- 组件化
- 编译器
- 服务端渲染

## 框架设计概览

### 命令式和声明式

从范式上来看，视图层框架通常分为**命令式**和**声明式。**

命令式 -> 关注过程 -> Jquery

声明式 -> 关注结果 -> Vue

Vue 内部实现是命令式，而暴露给用户是声明式。

### 性能与可维护性的权衡

声明式代码的性能不优于命令式代码的性能。

在采用声明式提升可维护性的同时，性能就会有一定的损失，而框架设计者要做的就是：**在保持可维护性的同时让性能损失最小化。**

### 虚拟 DOM 的性能到底如何

声明式代码的更新性能消耗 = 找出差异的性能消耗 + 直接修改的性能消耗

而所谓的**虚拟 DOM**，就是为了最小化找出差异这一步的性能消耗而出现的。

- innerHTML（模版） 心智负担中等 性能差
- 虚拟 DOM 心智负担小 可维护强 性能中等
- 原生 JavaScript 心智负担大 可维护性差 性能高

### 运行时和编译时

当设计一个框架的时候，有三种选择：

- 纯运行时
- 运行时 + 编译时
- 纯编译时

纯运行时框架

```js
function Render(obj, root) {
  const el = document.createElement(obj.tag);
  if (typeof obj.children === "string") {
    const text = document.createTextNode(obj.children);
    el.appendChild(text);
  } else if (obj.children) {
    // 数组，递归调用 Render，使用 el 作为 root 参数
    obj.children.forEach((child) => Render(child, el));
  }

  root.appendChild(el);
}

const obj = {
  tag: "div",
  children: [{ tag: "span", children: "hello world" }],
};

Render(obj, document.body);
```

手写树型结构的数据对象太麻烦了，而且不直观，能不能支持用类似于 HTML 标签的方式描述树型结构的数据对象呢？

为了满足用户的需求，你开始思考，能不能引入编译的手段，把 HTML 标签编译成树型结构的数据对象，这样不就可以继续使用 Render 函数了吗？

为此，你编写了一个叫作 Compiler 的程序，它的作用就是把 HTML 字符串编译成树型结构的数据对象，于是交付给用户去用了

```js
const html = `<div>hello world</div>`;
//调用 Compiler 编译得到树型结构的数据对象
const obj = Compile(html);
// 再调用 Render 进行渲染
Render(obj, document.body);
```

上面这段代码能够很好地工作，这时我们的框架就变成了一个运行时 + 编译时的框架。

它既支持运行时 -> 用户可以直接提供数据对象从而无须编译；

又支持编译时 -> 用户可以提供 HTML 字符串，我们将其编译为数据对象后再交给运行时处理。
准确地说，上面的代码其实是运行时编译，意思是代码运行的时候才开始编译，而这会产生一定的性能开销，因此我们也可以在构建的时候就执行 Compiler 程序将用户提供的内容编译好，等到运行时就无须编译了，这对性能是非常友好的。

既然编译器可以把 HTML 字符串编译成数据对象，那么能不能直接编译成命令式代码呢？

这样我们只需要一个 Compiler 函数就可以了，连 Render 都不需要了。其实这就变成了一个纯编译时的框架，因为我们不支持任何运行时内容，用户的代码通过编译器编译后才能运行。

- Svelte -> 纯编译时的框架
- Vue3 -> 运行时 + 编译时

## 框架设计的核心要素

# 重学 Javascript

> Javascript 高级程序设计 + Modern JavaScript Tutorial + MDN

[现代 JavaScript 教程](https://zh.javascript.info/)

[MDN Web Docs](https://developer.mozilla.org/zh-CN/)

## 第一章 什么是 JavaScript

### javascript 的实现

- 核心 (ECMAScript)
- 文档对象模型 (DOM)
- 浏览器对象模型 (BOM)

### 组织分工

TC39 → ECMAScript

W3C → DOM

浏览器厂商 → BOM

### 规范和手册

规范：ECMA-262

[ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/)

手册：MDN（Mozilla）JavaScript

[JavaScript reference - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

### 小结

JavaScript 是一门用来与网页交互的脚本语言，包含以下三个组成部分。

- ECMAScript:由 ECMA-262 定义并提供核心功能。
- 文档对象模型(DOM):提供与网页内容交互的方法和接口。
- 浏览器对象模型(BOM):提供与浏览器交互的方法和接口。

JavaScript 的这三个部分得到了五大 Web 浏览器(IE、Firefox、Chrome、Safari 和 Opera)不同程度的支持。所有浏览器基本上对 ES5(ECMAScript 5)提供了完善的支持，而对 ES6(ECMAScript 6) 和 ES7(ECMAScript 7) 的支持度也在不断提升。这些浏览器对 DOM 的支持各不相同，但对 Level 3 的支 持日益趋于规范。HTML5 中收录的 BOM 会因浏览器而异，不过开发者仍然可以假定存在很大一部分公共特性。

## 第二章 HTML 中的 JavaScript

### `<script>`标签

使用了 src 属性的 `<script>` 元素不应该再在 `<script>` 和 `</script>` 标签中再包含其他 JavaScript 代码。如果两者都提供的话，则浏览器只会下载并执行脚本文件，从而忽略行内代码。

### nomodule

这个布尔属性被设置来标明这个脚本在支持  [ES2015 modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/)的浏览器中不执行。  实际上，这可用于在不支持模块化 JavaScript 的旧浏览器中提供回退脚本。

### `<noscript>`启用条件

- 浏览器不支持脚本
- 浏览器对脚本的支持被关闭

### 小结

JavaScript 是通过 **`<script>`** 元素插入到 HTML 页面中的。这个元素可用于把 JavaScript 代码嵌入到 HTML 页面中，跟其他标记混合在一起，也可用于引入保存在外部文件中的 JavaScript。本章的重点可以总结如下。

- 要包含外部 JavaScript 文件，必须将 src 属性设置为要包含文件的 URL。文件可以跟网页在同一台服务器上，也可以位于完全不同的域。
- 所有`<script>` 元素会依照它们在网页中出现的次序被解释。在不使用 defer 和 async 属性的情况下，包含在`<script>` 元素中的代码必须严格按次序解释。
- 对不推迟执行的脚本，浏览器必须解释完位于`<script>` 元素中的代码，然后才能继续渲染页面 的剩余部分。为此，**通常应该把`<script>` 元素放到页面末尾，介于主内容之后及`<script>` 标签之前**。
- 可以使用 defer 属性把脚本推迟到文档渲染完毕后再执行。推迟的脚本原则上按照它们被列出的次序执行。
- 可以使用 async 属性表示脚本不需要等待其他脚本，同时也不阻塞文档渲染，即异步加载。异 步脚本不能保证按照它们在页面中出现的次序执行。
- 通过使用 `**<noscript>**` 元素，可以指定在浏览器不支持脚本时显示的内容。如果浏览器支持并启用脚本，则`<noscript>`元素中的任何内容都不会被渲染。

## 第三章 语言基础

### 标识符

- 所谓标识符，就是变量、函数、属性或参数的名称
- 按照惯例，ECMAScript 标识符使用驼峰大小写形式，因为这种形式跟 ECMAScript 内置函数和对象的命名方式一致，所以算是最佳实践
- 关键字、保留字、true、false、null 不能作为标识符

### 语句

- if 之类的控制语句只在执行多条语句时要求必须有代码块。不过最佳实践是始终在控制语句中使用代码块，即使执行的只有一条语句。在控制语句中使用代码块可以让内容更清晰，在需要修改代码时也可以减少出错的可能性。

```jsx
// 有效，但容易导致错误，应该避免
if (test) console.log(test);

//推荐
if (test) {
  console.log(test);
}
```

### 变量

- var → 函数作用域
- let → 块作用域

### 暂时性死区

```jsx
console.log(age); // ReferenceError: age没有定义
let age = 26;
```

### 小结

JavaScript 的核心语言特性在 **ECMA-262** 中以伪语言 **ECMAScript** 的形式来定义。ECMAScript 包含所有基本语法、操作符、数据类型和对象，能完成基本的计算任务，但没有提供获得输入和产生输出的 机制。理解 ECMAScript 及其复杂的细节是完全理解浏览器中 JavaScript 的关键。下面总结一下 ECMAScript 中的基本元素。

- ECMAScript 中的基本数据类型包括 Undefined、Null、Boolean、Number、String 和 Symbol。
- 与其他语言不同，ECMAScript 不区分整数和浮点值，只有 Number 一种数值数据类型。
- Object 是一种复杂数据类型，它是这门语言中所有对象的基类。
- 严格模式为这门语言中某些容易出错的部分施加了限制。
- ECMAScript 提供了 C 语言和类 C 语言中常见的很多基本操作符，包括数学操作符、布尔操作符、 关系操作符、相等操作符和赋值操作符等。
- 这门语言中的流控制语句大多是从其他语言中借鉴而来的，比如 if 语句、for 语句和 switch 语句等。

ECMAScript 中的函数与其他语言中的函数不一样。

- 不需要指定函数的返回值，因为任何函数可以在任何时候返回任何值。
- **不指定返回值的函数实际上会返回特殊值 undefined。**

## 第四章 变量、作用域与内存

### 小结

JavaScript 变量可以保存两种类型的值:原始值和引用值。原始值可能是以下 6 种原始数据类型之 一：Undefined、Null、Boolean、Number、String 和 Symbol。原始值和引用值有以下特点。

- 原始值大小固定，因此保存在**栈内存**上。
- 从一个变量到另一个变量复制原始值会创建该值的第二个副本。
- 引用值是对象，存储在**堆内存**上。
- 包含引用值的变量实际上只包含指向相应对象的一个指针，而不是对象本身。
- 从一个变量到另一个变量复制引用值只会复制指针，因此结果是两个变量都指向同一个对象。
- **typeof 操作符可以确定值的原始类型，而 instanceof 操作符用于确保值的引用类型。**

> 堆内存是向高地址扩展的数据结构，是不连续的内存区域。 栈内存在函数中定义的一些基本类型的变量和对象的引用变量都在函数的栈内存中分配。

任何变量(不管包含的是原始值还是引用值)都存在于某个执行上下文中(也称为作用域)。这个上下文(作用域)决定了变量的生命周期，以及它们可以访问代码的哪些部分。执行上下文可以总结如下。

- 执行上下文分**全局上下文、函数上下文和块级上下文**。
- 代码执行流每进入一个新上下文，都会创建一个作用域链，用于搜索变量和函数。
- @函数或块的局部上下文不仅可以访问自己作用域内的变量，而且也可以访问任何包含上下文乃至全局上下文中的变量。
- 全局上下文只能访问全局上下文中的变量和函数，不能直接访问局部上下文中的任何数据。
- 变量的执行上下文用于确定什么时候释放内存。

JavaScript 是使用垃圾回收的编程语言，开发者不需要操心内存分配和回收。JavaScript 的垃圾回收程序可以总结如下。

- **离开作用域**的值会被自动标记为可回收，然后在垃圾回收期间被删除。
- 主流的垃圾回收算法是**标记清理**，即先给当前不使用的值加上标记，再回来回收它们的内存。
- **引用计数**是另一种垃圾回收策略，需要记录值被引用了多少次。JavaScript 引擎**不再**使用这种算法，但某些旧版本的 IE 仍然会受这种算法的影响，原因是 JavaScript 会访问非原生 JavaScript 对象(如 DOM 元素)。
- 引用计数在代码中存在循环引用时会出现问题。
- 解除变量的引用不仅可以消除循环引用，而且对垃圾回收也有帮助。为促进内存回收，全局对象、全局对象的属性和循环引用都应该在不需要时解除引用。

## 第五章 基本引用类型

### 小结

JavaScript 中的对象称为引用值，几种内置的引用类型可用于创建特定类型的对象。

- 引用值与传统面向对象编程语言中的类相似，但实现不同。
- **Date** 类型提供关于日期和时间的信息，包括当前日期、时间及相关计算。
- **RegExp** 类型是 ECMAScript 支持正则表达式的接口，提供了大多数基础的和部分高级的正则表达式功能。

JavaScript 比较独特的一点是，**函数实际上是 Function 类型的实例，也就是说函数也是对象**。因为函数也是对象，所以函数也有方法，可以用于增强其能力。

由于原始值包装类型的存在，JavaScript 中的原始值可以被当成对象来使用。有 3 种原始值包装类型:**Boolean**、**Number** 和 **String**。它们都具备如下特点。

- 每种包装类型都映射到同名的原始类型。
- 以读模式访问原始值时，后台会实例化一个原始值包装类型的对象，借助这个对象可以操作相应的数据。
- 涉及原始值的语句执行完毕后，包装对象就会被销毁。

当代码开始执行时，全局上下文中会存在两个内置对象: **Global** 和 **Math** 。其中，Global 对象在大多数 ECMAScript 实现中无法直接访问。**不过，浏览器将其实现为 window 对象。**所有全局变量和函 数都是 Global 对象的属性。Math 对象包含辅助完成复杂计算的属性和方法。

## 第六章 集合引用类型

### 小结

JavaScript 中的对象是引用值，可以通过几种内置引用类型创建特定类型的对象。

- 引用类型与传统面向对象编程语言中的类相似，但实现不同。
- **Object 类型是一个基础类型，所有引用类型都从它继承了基本的行为。**
- Array 类型表示一组有序的值，并提供了操作和转换值的能力。
- 定型数组包含一套不同的引用类型，用于管理数值在内存中的类型。
- Date 类型提供了关于日期和时间的信息，包括当前日期和时间以及计算。
- RegExp 类型是 ECMAScript 支持的正则表达式的接口，提供了大多数基本正则表达式以及一些 高级正则表达式的能力。

**JavaScript 比较独特的一点是，函数其实是 Function 类型的实例，这意味着函数也是对象。由于函数是对象，因此也就具有能够增强自身行为的方法。**

因为原始值包装类型的存在，所以 JavaScript 中的原始值可以拥有类似对象的行为。有 3 种原始值包装类型:Boolean、Number 和 String。它们都具有如下特点。

- 每种包装类型都映射到同名的原始类型。
- 在以读模式访问原始值时，后台会实例化一个原始值包装对象，通过这个对象可以操作数据。
- 涉及原始值的语句只要一执行完毕，包装对象就会立即销毁。 JavaScript 还有两个在一开始执行代码时就存在的内置对象:Global 和 Math。其中，Global 对象在大多数 ECMAScript 实现中无法直接访问。不过浏览器将 Global 实现为 window 对象。所有全局 变量和函数都是 Global 对象的属性。Math 对象包含辅助完成复杂数学计算的属性和方法。 ECMAScript 6 新增了一批引用类型:Map、WeakMap、Set 和 WeakSet。这些类型为组织应用程序 数据和简化内存管理提供了新能力。

## 第七章 迭代器与生成器

**可迭代（Iterable）**  对象是数组的泛化。这个概念是说任何对象都可以被定制为可在  `for..of`
  循环中使用的对象。

数组是可迭代的。但不仅仅是数组。很多其他**内建对象**也都是可迭代的。例如字符串也是可迭代的。

### **Symbol.iterator**

```jsx
let range = {
  from: 1,
  to: 5,
};
```

为了让  `range`  对象可迭代（也就让  `for..of`  可以运行）我们需要为对象添加一个名为  `Symbol.iterator`  的方法（一个专门用于使对象可迭代的内建 symbol）。

1. 当  `for..of`  循环启动时，它会调用这个方法（如果没找到，就会报错）。这个方法必须返回一个  **迭代器（iterator）** —— 一个有  `next`  方法的对象。
2. 从此开始，`for..of` **仅适用于这个被返回的对象**。
3. 当  `for..of`  循环希望取得下一个数值，它就调用这个对象的  `next()`  方法。
4. `next()`  方法返回的结果的格式必须是  `{done: Boolean, value: any}`，当  `done=true`  时，表示循环结束，否则  `value`  是下一个值。

### 完整实现

```jsx
let range = {
  from: 1,
  to: 5,
};

// 1. for..of 调用首先会调用这个：
range[Symbol.iterator] = function () {
  // ……它返回迭代器对象（iterator object）：
  // 2. 接下来，for..of 仅与下面的迭代器对象一起工作，要求它提供下一个值
  return {
    current: this.from,
    last: this.to,

    // 3. next() 在 for..of 的每一轮循环迭代中被调用
    next() {
      // 4. 它将会返回 {done:.., value :...} 格式的对象
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },
  };
};

// 现在它可以运行了！
for (let num of range) {
  alert(num); // 1, 然后是 2, 3, 4, 5
}
```

请注意可迭代对象的核心功能：关注点分离。

- `range`  自身没有  `next()`  方法。
- 相反，是通过调用  `range[Symbol.iterator]()`  创建了另一个对象，即所谓的“迭代器”对象，并且它的  `next`  会为迭代生成值。

因此，迭代器对象和与其进行迭代的对象是分开的。

从技术上说，我们可以将它们合并，并使用  `range`  自身作为迭代器来简化代码。

```jsx
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  },
};

for (let num of range) {
  alert(num); // 1, 然后是 2, 3, 4, 5
}
```

### **字符串是可迭代的**

数组和字符串是使用最广泛的内建可迭代对象。

```jsx
for (let char of "test") {
  // 触发 4 次，每个字符一次
  alert(char); // t, then e, then s, then t
}
```

### **显式调用迭代器**

我们将会采用与  `for..of`  完全相同的方式遍历字符串，但使用的是直接调用。这段代码创建了一个字符串迭代器，并“手动”从中获取值。这样比  `for..of`  给了我们更多的控制权。

```jsx
let str = "Hello";

// 和 for..of 做相同的事
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // 一个接一个地输出字符
}
```

### 可迭代（iterable）和类数组（array-like）

- **Iterable**  如上所述，是实现了  `Symbol.iterator`  方法的对象。
- **Array-like**  是有索引和  `length`  属性的对象，所以它们看起来很像数组。

例如，字符串即是可迭代的（`for..of`  对它们有效），又是类数组的（它们有数值索引和  `length`  属性）。

下面这个对象则是类数组的，但是不可迭代：

```jsx
let arrayLike = {
  // 有索引和 length 属性 => 类数组对象
  0: "Hello",
  1: "World",
  length: 2,
};

// Error (no Symbol.iterator)
for (let item of arrayLike) {
}
```

### Array.from

`Array.from` 可以接受一个**可迭代**或**类数组**的值，并从中获取一个“真正的”数组。

```jsx
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2,
};

let arr = Array.from(arrayLike); // (*)
alert(arr.pop()); // World（pop 方法有效）
```

### 小结

迭代是一种所有编程语言中都可以看到的模式。ECMAScript 6 正式支持**迭代模式**并引入了两个新的 语言特性：**迭代器和生成器。**

可以应用  `for..of`  的对象被称为  **可迭代的**。

- 技术上来说，可迭代对象必须实现  `Symbol.iterator`  方法。
  - `obj[Symbol.iterator]()`  的结果被称为  **迭代器（iterator）**。由它处理进一步的迭代过程。
  - 一个迭代器必须有  `next()`  方法，它返回一个  `{done: Boolean, value: any}`  对象，这里  `done:true`  表明迭代结束，否则  `value`  就是下一个值。
- `Symbol.iterator`  方法会被  `for..of`  自动调用，但我们也可以直接调用它。
- 内建的可迭代对象例如字符串和数组，都实现了  `Symbol.iterator`。
- 字符串迭代器能够识别代理对（surrogate pair）。（译注：代理对也就是 UTF-16 扩展字符。）

有索引属性和  `length`  属性的对象被称为  **类数组对象**。这种对象可能还具有其他属性和方法，但是没有数组的内建方法。

如果我们仔细研究一下规范 —— 就会发现大多数内建方法都假设它们需要处理的是可迭代对象或者类数组对象，而不是“真正的”数组，因为这样抽象度更高。

`Array.from(obj[, mapFn, thisArg])`  将可迭代对象或类数组对象  `obj`  转化为真正的数组  `Array`，然后我们就可以对它应用数组的方法。可选参数  `mapFn`  和  `thisArg`  允许我们将函数应用到每个元素。

**生成器**是一种特殊的函数，调用之后会返回一个生成器对象。生成器对象实现了 Iterable 接口， 因此可用在任何消费可迭代对象的地方。生成器的独特之处在于支持 yield 关键字，这个关键字能够 暂停执行生成器函数。使用 yield 关键字还可以通过 next()方法接收输入和产生输出。在加上星号之 后，yield 关键字可以将跟在它后面的可迭代对象序列化为一连串值。

## 第八章 对象、类与面向对象编程

### 对象

### 面相对象编程

当我们在代码中用对象表示实体时，就是所谓的  [面向对象编程](https://en.wikipedia.org/wiki/Object-oriented_programming)，简称为 “OOP”。

### “in” 操作符和“for…in” 循环

相比于其他语言，JavaScript 的对象有一个需要注意的特性：能够被访问任何属性。即使属性不存在也不会报错！读取不存在的属性只会得到  `undefined`。

这里还有一个特别的，检查属性是否存在的操作符  `in`。

```jsx
let user = { name: "John", age: 30 };

alert("age" in user); // true，user.age 存在
alert("blabla" in user); // false，user.blabla 不存在。
```

为何会有  `in`  运算符呢？与  `undefined`  进行比较来判断还不够吗？大部分情况下与  `undefined`  进行比较来判断就可以了。但有一个例外情况那就是属性存在，但存储的值是  `undefined`  的时候。

这种情况很少发生，因为通常情况下不应该给对象赋值  `undefined`。我们通常会用  `null`
  来表示未知的或者空的值。因此，`in`  运算符是代码中的特殊来宾。

**“for…in” 循环**

为了遍历一个对象的所有键（key），可以使用一个特殊形式的循环：`for..in`。这跟我们在前面学到的  `for(;;)`  循环是完全不一样的东西。

```jsx
let user = {
  name: "John",
  age: 30,
  isAdmin: true,
};

for (let key in user) {
  // keys
  alert(key); // name, age, isAdmin
  // 属性键的值
  alert(user[key]); // John, 30, true
}
```

<aside>
💡 如果我们遍历一个对象，其顺序是：**整数属性会被进行排序，其他属性则按照创建的顺序显示。**

</aside>

### 对象方法，\***\*"this"\*\***

```jsx
let user = {
  name: "John",
  age: 30,
  sayHi() {
    // "this" 指的是“当前的对象”
    alert(this.name);
  },
};
user.sayHi(); // John
```

在 JavaScript 中，`this`  关键字与其他大多数编程语言中的不同。JavaScript 中的  `this`  可以用于任何函数，即使它不是对象的方法。

```jsx
//下面这样的代码没有语法错误：
function sayHi() {
  alert(this.name);
}
```

`this`  的值是在代码运行时计算出来的，它取决于代码上下文。

```jsx
let user = { name: "John" };
function sayHi() {
  alert(this.name);
}
user.f = sayHi;
user.f(); // John（this == user）
```

**在没有对象的情况下调用：`this == undefined`**

```jsx
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

在这种情况下，严格模式下的  `this`  值为  `undefined`。如果我们尝试访问  `this.name`，将会报错。

在非严格模式的情况下，`this`  将会是  **全局对象**（浏览器中的  `window`）。这是一个历史行为，`"use strict"`  已经将其修复了。

通常这种调用是程序出错了。如果在一个函数内部有  `this`，那么通常意味着它是在对象上下文环境中被调用的。

**箭头函数没有自己的 “this”**

箭头函数有些特别：它们没有自己的  `this`。如果我们在这样的函数中引用  `this`，`this`
  值取决于外部“正常的”函数。

```jsx
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  },
};

user.sayHi(); // Ilya
```

### \***\*构造器和操作符 “new”\*\***

常规的  `{...}`  语法允许创建一个对象。但是我们经常需要创建很多类似的对象，例如多个用户或菜单项等。这可以使用构造函数和  `"new"`  操作符来实现。

### 构造函数

构造函数在技术上是常规函数。不过有两个约定：

1. 它们的命名以大写字母开头。
2. 它们只能由  `"new"`  操作符来执行。

```jsx
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

let user = new User("Jack");

alert(user.name); // Jack
alert(user.isAdmin); // false
```

`new User(...)`  做的是类似的事情：

```jsx
function User(name) {
  // this = {};（隐式创建）

  // 添加属性到 this
  this.name = name;
  this.isAdmin = false;

  // return this;（隐式返回）
}
```

### 构造器模式测试：new.target

在一个函数内部，我们可以使用  `new.target`  属性来检查它是否被使用  `new`  进行调用了。

对于常规调用，它为 undefined，对于使用  `new`  的调用，则等于该函数：

```jsx
function User() {
  alert(new.target);
}

// 不带 "new"：
User(); // undefined

// 带 "new"：
new User(); // function User { ... }
```

### 构造器的 return

带有对象的  `return`返回该对象，在所有其他情况下返回  `this`。

```jsx
function BigUser() {
  this.name = "John";
  return { name: "Godzilla" }; // <-- 返回这个对象
}
alert(new BigUser().name); // Godzilla，得到了那个对象

function SmallUser() {
  this.name = "John";
  return; // <-- 返回 this
}
alert(new SmallUser().name); // John
```

<aside>
💡 如果没有参数，我们可以省略 `new` ，后的括号。这里省略括号不被认为是一种“好风格”，但是规范允许使用该语法。

</aside>

### 对象的方法

**Object.keys(obj)**

返回一个包含该对象所有的键的数组。

**Object.values(obj)**

返回一个包含该对象所有的值的数组。

**Object.entries(obj)**

返回一个包含该对象所有 `[key, value]` 键值对的二维数组。

```jsx
const object1 = {
  a: "somestring",
  b: 42,
};

console.log(Object.entries(object1));
//[["a","somestring"],["b",42]]

for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}
// expected output:
// "a: somestring"
// "b: 42"
```

**Object.assign()**

方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象（浅拷贝）。它将返回目标对象。

```jsx
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```

**Object.create()**

方法创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`。

**Object.defineProperty()**

方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

<aside>
💡 应当直接在 `[Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)` 构造器对象上调用此方法，而不是在任意一个 `Object`
类型的实例上调用。

</aside>

```jsx
const object1 = {};

Object.defineProperty(object1, "property1", {
  value: 42,
  writable: false,
});

object1.property1 = 77;
// throws an error in strict mode

console.log(object1.property1);
// expected output: 42
```

<aside>
💡 Vue2通过使用此方法实现双向绑定，Vue3改为了Proxy

</aside>

```jsx
var o = {}; // 创建一个新对象
// 在对象中添加一个设置了存取描述符属性的示例
var bValue = 38;
Object.defineProperty(o, "b", {
  // 使用了方法名称缩写（ES2015 特性）
  // 下面两个缩写等价于：
  // get : function() { return bValue; },
  // set : function(newValue) { bValue = newValue; },
  get() {
    return bValue;
  },
  set(newValue) {
    bValue = newValue;
  },
  enumerable: true,
  configurable: true,
});
```

**Object.defineProperties()**

方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。

**Object.freeze()**

方法可以**冻结**一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。`freeze()`  返回和传入的参数相同的对象。

**Object.fromEntries()**

方法把键值对列表转换为一个对象。

**Object.getOwnPropertyDescriptor()**

方法返回指定对象上一个自有属性对应的属性描述符。

**Object.getOwnPropertyDescriptors()**

方法用来获取一个对象的所有自身属性的描述符。

**Object.getOwnPropertyNames()**

方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 `Symbol` 值作为名称的属性）组成的数组。

**Object.getOwnPropertySymbols()**

方法返回一个给定对象自身的所有 `Symbol`  属性的数组。

**Object.getPrototypeOf()**

方法返回指定对象的原型（内部`[[Prototype]]`属性的值）。

**Object.hasOwn()**

The **`Object.hasOwn()`**static method returns `true` if the specified object has the indicated property as its *own* property. If the property is inherited, or does not exist, the method returns `false`.

<aside>
💡 `Object.hasOwn()`
 is intended as a replacement for `[Object.hasOwnProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)`.

</aside>

```jsx
const object1 = {
  prop: "exists",
};

console.log(Object.hasOwn(object1, "prop"));
// expected output: true
```

**Object.prototype.hasOwnProperty()**

方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。

**Object.is()**

方法判断两个值是否为[同一个值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)。

**Object.isExtensible()**

方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。

**Object.isFrozen()**

方法判断一个对象是否被[冻结](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)。

**Object.prototype.isPrototypeOf()**

方法用于测试一个对象是否存在于另一个对象的原型链上。

**Object.isSealed()**

方法判断一个对象是否被密封。

**Object.preventExtensions()**

方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。

**Object.prototype.propertyIsEnumerable()**

方法返回一个布尔值，表示指定的属性是否可枚举。

**Object.seal()**

方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。

**Object.setPrototypeOf()**

方法设置一个指定的对象的原型 ( 即, 内部`[[Prototype]]`属性）到另一个对象或  `[null](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)`。

<aside>
💡 考虑性能，你应该使用 `[Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)`来创建带有你想要的`[[Prototype]]`的新对象。

</aside>

**toLocaleString()**

方法返回一个该对象的字符串表示。此方法被用于派生对象为了特定语言环境的目的（locale-specific purposes）而重载使用。

**toString()**

方法返回一个表示该对象的字符串。

**valueOf()**

方法返回指定对象的原始值。

### 小结

对象在代码执行过程中的任何时候都可以被创建和增强，具有极大的动态性，并不是严格定义的实 体。下面的模式适用于创建对象。

- 工厂模式就是一个简单的函数，这个函数可以创建对象，为它添加属性和方法，然后返回这个 对象。这个模式在构造函数模式出现后就很少用了。
- 使用构造函数模式可以自定义引用类型，可以使用 new 关键字像创建内置类型实例一样创建自 定义类型的实例。不过，构造函数模式也有不足，主要是其成员无法重用，包括函数。考虑到 函数本身是松散的、弱类型的，没有理由让函数不能在多个对象实例间共享。
- 原型模式解决了成员共享的问题，只要是添加到构造函数 prototype 上的属性和方法就可以共 6 享。而组合构造函数和原型模式通过构造函数定义实例属性，通过原型定义共享的属性和方法。

JavaScript 的继承主要通过原型链来实现。原型链涉及把构造函数的原型赋值为另一个类型的实例。 这样一来，子类就可以访问父类的所有属性和方法，就像基于类的继承那样。原型链的问题是所有继承 的属性和方法都会在对象实例间共享，无法做到实例私有。盗用构造函数模式通过在子类构造函数中调 用父类构造函数，可以避免这个问题。这样可以让每个实例继承的属性都是私有的，但要求类型只能通 过构造函数模式来定义(因为子类不能访问父类原型上的方法)。目前最流行的继承模式是组合继承， 即通过原型链继承共享的属性和方法，通过盗用构造函数继承实例属性。

除上述模式之外，还有以下几种继承模式。

- 原型式继承可以无须明确定义构造函数而实现继承，本质上是对给定对象执行浅复制。这种操 作的结果之后还可以再进一步增强。
- 与原型式继承紧密相关的是寄生式继承，即先基于一个对象创建一个新对象，然后再增强这个 新对象，最后返回新对象。这个模式也被用在组合继承中，用于避免重复调用父类构造函数导 致的浪费。
- 寄生组合继承被认为是实现基于类型继承的最有效方式。

ECMAScript 6 新增的类很大程度上是基于既有原型机制的语法糖。类的语法让开发者可以优雅地定义向后兼容的类，既可以继承内置类型，也可以继承自定义类型。类有效地跨越了对象实例、对象原型 和对象类之间的鸿沟。

## 第九章 代理与反射

### 小结

代理是 ECMAScript 6 新增的令人兴奋和动态十足的新特性。尽管不支持向后兼容，但它开辟出了 一片前所未有的 JavaScript 元编程及抽象的新天地。

从宏观上看，代理是真实 JavaScript 对象的透明抽象层。代理可以定义包含捕获器的处理程序对象， 而这些捕获器可以拦截绝大部分 JavaScript 的基本操作和方法。在这个捕获器处理程序中，可以修改任 何基本操作的行为，当然前提是遵从捕获器不变式。

与代理如影随形的反射 API，则封装了一整套与捕获器拦截的操作相对应的方法。可以把反射 API 看作一套基本操作，这些操作是绝大部分 JavaScript 对象 API 的基础。

代理的应用场景是不可限量的。开发者使用它可以创建出各种编码模式，比如(但远远不限于)跟 踪属性访问、隐藏属性、阻止修改或删除属性、函数参数验证、构造函数参数验证、数据绑定，以及可 观察对象。

## 第十章 函数

### 小结

函数是 JavaScript 编程中最有用也最通用的工具。ECMAScript 6 新增了更加强大的语法特性，从而 让开发者可以更有效地使用函数。

- 函数表达式与函数声明是不一样的。函数声明要求写出函数名称，而函数表达式并不需要。没 有名称的函数表达式也被称为匿名函数。
- ES6 新增了类似于函数表达式的箭头函数语法，但两者也有一些重要区别。
- JavaScript 中函数定义与调用时的参数极其灵活。arguments 对象，以及 ES6 新增的扩展操作符，可以实现函数定义和调用的完全动态化。
- 函数内部也暴露了很多对象和引用，涵盖了函数被谁调用、使用什么调用，以及调用时传入了什么参数等信息。
- JavaScript 引擎可以优化符合尾调用条件的函数，以节省栈空间。
- 闭包的作用域链中包含自己的一个变量对象，然后是包含函数的变量对象，直到全局上下文的变量对象。
- 通常，函数作用域及其中的所有变量在函数执行完毕后都会被销毁。
- 闭包在被函数返回之后，其作用域会一直保存在内存中，直到闭包被销毁。
- 函数可以在创建之后立即调用，执行其中代码之后却不留下对函数的引用。
- 立即调用的函数表达式如果不在包含作用域中将返回值赋给一个变量，则其包含的所有变量都会被销毁。
- 虽然 JavaScript 没有私有对象属性的概念，但可以使用闭包实现公共方法，访问位于包含作用域中定义的变量。
- 可以访问私有变量的公共方法叫作特权方法。
- 特权方法可以使用构造函数或原型模式通过自定义类型中实现，也可以使用模块模式或模块增强模式在单例对象上实现。

## 第十一章 期约与异步函数

### 小结

长期以来，掌握单线程 JavaScript 运行时的异步行为一直都是个艰巨的任务。随着 ES6 新增了期约 和 ES8 新增了异步函数，ECMAScript 的异步编程特性有了长足的进步。通过期约和 async/await，不仅 可以实现之前难以实现或不可能实现的任务，而且也能写出更清晰、简洁，并且容易理解、调试的代码。

期约的主要功能是为异步代码提供了清晰的抽象。可以用期约表示异步执行的代码块，也可以用期 约表示异步计算的值。在需要串行异步代码时，期约的价值最为突出。作为可塑性极强的一种结构，期 约可以被序列化、连锁使用、复合、扩展和重组。

异步函数是将期约应用于 JavaScript 函数的结果。异步函数可以暂停执行，而不阻塞主线程。无论 是编写基于期约的代码，还是组织串行或平行执行的异步代码，使用异步函数都非常得心应手。异步函 数可以说是现代 JavaScript 工具箱中最重要的工具之一。

## 第十二章 BOM

BOM 的核心是 window 对象，表示浏览器的实例。window 对象在浏览器中有两重身份，一个是 ECMAScript 中的 Global 对象，另一个就是浏览器窗口的 JavaScript 接口

JavaScript 在浏览器中是单线程执行的，但允许使用定时器指定在某个时间之后或每隔一段时间就 执行相应的代码。

> 所有超时执行的代码(函数)都会在全局作用域中的一个匿名函数中运行，因此函 数中的 this 值在非严格模式下始终指向 window，而在严格模式下是 undefined。如果 给 setTimeout()提供了一个箭头函数，那么 this 会保留为定义它时所在的词汇作用域。

**location** 是最有用的 BOM 对象之一，提供了当前窗口中加载文档的信息，以及通常的导航功能。 这个对象独特的地方在于，它既是 window 的属性，也是 document 的属性。也就是说， `window.location` 和 `document.location` 指向同一个对象。

### 小结

浏览器对象模型(BOM，Browser Object Model)是以 window 对象为基础的，这个对象代表了浏览器窗口和页面可见的区域。window 对象也被复用为 ECMAScript 的 Global 对象，因此所有全局变量和函数都是它的属性，而且所有原生类型的构造函数和普通函数也都从一开始就存在于这个对象之上。本章讨论了 BOM 的以下内容。

- 要引用其他 window 对象，可以使用几个不同的窗口指针。
- 通过 location 对象可以以编程方式操纵浏览器的导航系统。通过设置这个对象上的属性，可以改变浏览器 URL 中的某一部分或全部。
- 使用 replace()方法可以替换浏览器历史记录中当前显示的页面，并导航到新 URL。 navigator 对象提供关于浏览器的信息。提供的信息类型取决于浏览器，不过有些属性如 userAgent 是所有浏览器都支持的。

BOM 中的另外两个对象也提供了一些功能。screen 对象中保存着客户端显示器的信息。这些信息 通常用于评估浏览网站的设备信息。history 对象提供了操纵浏览器历史记录的能力，开发者可以确 定历史记录中包含多少个条目，并以编程方式实现在历史记录中导航，而且也可以修改历史记录。

## 第十三章 客户端检测

### 小结

客户端检测是 JavaScript 中争议最多的话题之一。因为不同浏览器之间存在差异，所以经常需要根 据浏览器的能力来编写不同的代码。客户端检测有不少方式，但下面两种用得最多。

- **能力检测**，在使用之前先测试浏览器的特定能力。例如，脚本可以在调用某个函数之前先检查 它是否存在。这种客户端检测方式可以让开发者不必考虑特定的浏览器或版本，而只需关注某 些能力是否存在。能力检测不能精确地反映特定的浏览器或版本。
- **用户代理检测**，通过用户代理字符串确定浏览器。用户代理字符串包含关于浏览器的很多信息， 通常包括浏览器、平台、操作系统和浏览器版本。用户代理字符串有一个相当长的发展史，很 多浏览器都试图欺骗网站相信自己是别的浏览器。用户代理检测也比较麻烦，特别是涉及 Opera 会在代理字符串中隐藏自己信息的时候。即使如此，用户代理字符串也可以用来确定浏览器使 用的渲染引擎以及平台，包括移动设备和游戏机。

在选择客户端检测方法时，首选是使用能力检测。特殊能力检测要放在次要位置，作为决定代码逻 辑的参考。用户代理检测是最后一个选择，因为它过于依赖用户代理字符串。

浏览器也提供了一些软件和硬件相关的信息。这些信息通过 screen 和 navigator 对象暴露出来。 利用这些 API，可以获取关于操作系统、浏览器、硬件、设备位置、电池状态等方面的准确信息。

## 第十四章 DOM

文档对象模型(DOM，Document Object Model)是 HTML 和 XML 文档的编程接口。

每个节点都有 nodeType 属性，表示该节点的类型：

- Node.ELEMENT_NODE(1)
- Node.ATTRIBUTE_NODE(2)
- Node.TEXT_NODE(3)
- Node.CDATA_SECTION_NODE(4)
- Node.ENTITY_REFERENCE_NODE(5)
- Node.ENTITY_NODE(6)
- Node.PROCESSING_INSTRUCTION_NODE(7)
- Node.COMMENT_NODE(8)
- Node.DOCUMENT_NODE(9) 文档节点
- Node.DOCUMENT_TYPE_NODE(10)
- Node.DOCUMENT_FRAGMENT_NODE(11)
- Node.NOTATION_NODE(12)

`nodeName` 与 `nodeValue` 保存着有关节点的信息

```jsx
if (someNode.nodeType == 1) {
  value = someNode.nodeName; // 会显示元素的标签名
}
```

### 节点属性和方法

- previousSibling
- nextSibling
- firstChild
- lastChild
- hasChildNodes()
- appendChild()
- insertBefore()
- replaceChild()
- removeChild()
- cloneNode()

### MutationObserver 接口

不久前添加到 DOM 规范中的 MutationObserver 接口，可以在 DOM 被修改时异步执行回调。使 用 MutationObserver 可以观察整个文档、DOM 树的一部分，或某个元素。此外还可以观察元素属性、子节点、文本，或者前三者任意组合的变化。

### 小结

文档对象模型(DOM，Document Object Model)是语言中立的 HTML 和 XML 文档的 API。DOM Level 1 将 HTML 和 XML 文档定义为一个节点的多层级结构，并暴露出 JavaScript 接口以操作文档的底 层结构和外观。

DOM 由一系列节点类型构成，主要包括以下几种。

- Node 是基准节点类型，是文档一个部分的抽象表示，所有其他类型都继承 Node。
- Document 类型表示整个文档，对应树形结构的根节点。在 JavaScript 中，document 对象是 Document 的实例，拥有查询和获取节点的很多方法。
- Element 节点表示文档中所有 HTML 或 XML 元素，可以用来操作它们的内容和属性。
- 其他节点类型分别表示文本内容、注释、文档类型、CDATA 区块和文档片段。

DOM 编程在多数情况下没什么问题，在涉及 `<script>` 和 `<style>` 元素时会有一点兼容性问题。因为这些元素分别包含脚本和样式信息，所以浏览器会将它们与其他元素区别对待。

要理解 DOM，最关键的一点是知道影响其性能的问题所在。DOM 操作在 JavaScript 代码中是代价 比较高的，NodeList 对象尤其需要注意。NodeList 对象是“实时更新”的，这意味着每次访问它都会执行一次新的查询。考虑到这些问题，实践中要尽量减少 DOM 操作的数量。

**MutationObserver** 是为代替性能不好的 **MutationEvent** 而问世的。使用它可以有效精准地监控 DOM 变化，而且 API 也相对简单。

## 第十五章 DOM 扩展

### Selectors API

- `querySelector()` 方法接收 CSS 选择符参数，返回匹配该模式的第一个后代元素，如果没有匹配 项则返回 null。
- `querySelectorAll()` 方法跟 querySelector()一样，也接收一个用于查询的参数，但它会返回 所有匹配的节点，而不止一个。这个方法返回的是一个 NodeList 的静态实例。
- `matches()` 方法(在规范草案中称为 matchesSelector())接收一个 CSS 选择符参数，如果元素 匹配则该选择符返回 true，否则返回 false。

### Element Traversal

Element Traversal API 为 DOM 元素添加了 5 个属性:

- `childElementCount`，返回子元素数量(不包含文本节点和注释)
- `firstElementChild`，指向第一个 Element 类型的子元素(Element 版 firstChild)
- `lastElementChild`，指向最后一个 Element 类型的子元素(Element 版 lastChild)
- `previousElementSibling`， 指 向 前 一 个 Element 类 型 的 同 胞 元 素 (Element 版 previousSibling)
- `nextElementSibling`，指向后一个 Element 类型的同胞元素(Element 版 nextSibling)

### CSS 类扩展

- `getElementsByClassName()`
- classList 属性

### HTMLDocument 扩展

`readyState` 属性，document.readyState 属性有两个可能的值:

- loading，表示文档正在加载。
- complete，表示文档加载完成。

### 插入标记

- `innerHTML` 在读取 innerHTML 属性时，会返回元素所有后代的 HTML 字符串，包括元素、注释和文本节点。 而在写入 innerHTML 时，则会根据提供的字符串值以新的 DOM 子树替代元素中原来包含的所有节点。
- `outerHTML` 读取 outerHTML 属性时，会返回调用它的元素(及所有后代元素)的 HTML 字符串。在写入 outerHTML 属性时，调用它的元素会被传入的 HTML 字符串经解释之后生成的 DOM 子树取代。
- `insertAdjacentHTML()` 与 `insertAdjacentText()`
- **scrollIntoView()** 方法存在于所有 HTML 元素上，可以滚动浏览器窗口或容器元素以便包含元素进入视口。

### 小结

虽然 DOM 规定了与 XML 和 HTML 文档交互的核心 API，但其他几个规范也定义了对 DOM 的扩展。很多扩展都基于之前的已成为事实标准的专有特性标准化而来。本章主要介绍了以下 3 个规范。

- **Selectors API** 为基于 CSS 选择符获取 DOM 元素定义了几个方法:`querySelector()`、 `querySelectorAll()`和 `matches()`。
- **Element Traversal** 在 DOM 元素上定义了额外的属性，以方便对 DOM 元素进行遍历。这个需求 是因浏览器处理元素间空格的差异而产生的。
- **HTML5** 为标准 DOM 提供了大量扩展。其中包括对 innerHTML 属性等事实标准进行了标准化， 还有焦点管理、字符集、滚动等特性。

DOM 扩展的数量总体还不大，但随着 Web 技术的发展一定会越来越多。浏览器仍然没有停止对专 有扩展的探索，如果出现成功的扩展，那么就可能成为事实标准，或者最终被整合到未来的标准中。

## 第十六章 DOM2 和 DOM3

### 小结

DOM2 规范定义了一些模块，用来丰富 DOM1 的功能。DOM2 Core 在一些类型上增加了与 XML 命名空间有关的新方法。这些变化只有在使用 XML 或 XHTML 文档时才会用到，在 HTML 文档中则没 有用处。DOM2 增加的与 XML 命名空间无关的方法涉及以编程方式创建 Document 和 DocumentType 类型的新实例。

DOM2 Style 模块定义了如何操作元素的样式信息。

- 每个元素都有一个关联的 style 对象，可用于确定和修改元素特定的样式。
- 要确定元素的计算样式，包括应用到元素身上的所有 CSS 规则，可以使用 `getComputedStyle()` 方法。
- 通过 `document.styleSheets` 集合可以访问文档上所有的样式表。

DOM2 Traversal and Range 模块定义了与 DOM 结构交互的不同方式。

- NodeIterator 和 TreeWalker 可以对 DOM 树执行深度优先的遍历。
- NodeIterator 接口很简单，每次只能向前和向后移动一步。TreeWalker 除了支持同样的行为，还支持在 DOM 结构的所有方向移动，包括父节点、同胞节点和子节点。
- 范围是选择 DOM 结构中特定部分并且进行操作的一种方式。
- 通过范围的选区可以在保持文档结构完好的同时从文档中移除内容，也可复制文档中相应的部分。

## 第十七章 事件

### 小结

事件是 JavaScript 与网页结合的主要方式。最常见的事件是在 DOM3 Events 规范或 HTML5 中定义 的。虽然基本的事件都有规范定义，但很多浏览器在规范之外实现了自己专有的事件，以方便开发者更 好地满足用户交互需求，其中一些专有事件直接与特殊的设备相关。

围绕着使用事件，需要考虑内存与性能问题。例如:

- 最好限制一个页面中事件处理程序的数量，因为它们会占用过多内存，导致页面响应缓慢;
- 利用事件冒泡，事件委托可以解决限制事件处理程序数量的问题;
- 最好在页面卸载之前删除所有事件处理程序。

使用 JavaScript 也可以在浏览器中模拟事件。DOM2 Events 和 DOM3 Events 规范提供了模拟方法，可以模拟所有原生 DOM 事件。键盘事件一定程度上也是可以模拟的，有时候需要组合其他技术。IE8 及更早版本也支持事件模拟，只是接口与 DOM 方式不同。

事件是 JavaScript 中最重要的主题之一，理解事件的原理及其对性能的影响非常重要。

## 第十八章 动画与 Canvas 图形

### 使用 requsetAnimationFrame() 节流

```jsx
let enabled = true;

function expensiveOperation() {
  console.log("do", Date.now());
}

window.addEventListener("scroll", () => {
  if (enabled) {
    enabled = false;
    window.requestanimationframe(expensiveOperation);
    window.setTimeout(() => {
      enabled = true;
    }, 1000);
  }
});
```

### 小结

`requestAnimationFrame` 是简单但实用的工具，可以让 JavaScript 跟进浏览器渲染周期，从而更 加有效地实现网页视觉动效。

HTML5 的 `<canvas>` 元素为 JavaScript 提供了动态创建图形的 API。这些图形需要使用特定上下文 绘制，主要有两种。第一种是支持基本绘图操作的 2D 上下文:

- 填充和描绘颜色及图案
- 绘制矩形
- 绘制路径
- 绘制文本
- 创建渐变和图案

第二种是 3D 上下文，也就是 WebGL。WebGL 是浏览器对 OpenGL ES 2.0 的实现。OpenGL ES 2.0 是游戏图形开发常用的一个标准。WebGL 支持比 2D 上下文更强大的绘图能力，包括:

- 用 OpenGL 着色器语言(GLSL)编写顶点和片段着色器;
- 支持定型数组，限定数组中包含数值的类型;
- 创建和操作纹理。 目前所有主流浏览器的较新版本都已经支持`<canvas>`标签。

## 第十九章 表单脚本

### 小结

尽管 HTML 和 Web 应用自诞生以来已经发生了天翻地覆的变化，但 Web 表单几乎从来没有变过。 JavaScript 可以增加现有的表单字段以提供新功能或增强易用性。为此，表单字段也暴露了属性、方法 和事件供 JavaScript 使用。以下是本章介绍的一些概念。

- 可以使用标准或非标准的方法全部或部分选择文本框中的文本。
- 所有浏览器都采用了 Firefox 操作文本选区的方式，使其成为真正的标准。
- 可以通过监听键盘事件并检测要插入的字符来控制文本框接受或不接受某些字符。

所有浏览器都支持剪贴板相关的事件，包括 copy、cut 和 paste。剪贴板事件在不同浏览器中的实现有很大差异。

在文本框只限某些字符时，可以利用剪贴板事件屏幕粘贴事件。

选择框也是经常使用 JavaScript 来控制的一种表单控件。借助 DOM，操作选择框比以前方便了很多。

使用标准的 DOM 技术，可以为选择框添加或移除选项，也可以将选项从一个选择框移动到另一个选择 框，或者重排选项。

富文本编辑通常以使用包含空白 HTML 文档的内嵌窗格来处理。通过将文档的 designMode 属性设 置为“on”，可以让整个页面变成编辑区，就像文字处理软件一样。另外，给元素添加 contenteditable 属性也可以将元素转换为可编辑区。默认情况下，可以切换文本的粗体、斜体样式，也可以使用剪贴板功 能。JavaScript 通过 execCommand()方法可以执行一些富文本编辑功能，通过 queryCommandEnabled()、 queryCommandState()和 queryCommandValue()方法则可以获取有关文本选区的信息。由于富文本编 辑区不涉及表单字段，因此要将富文本内容提交到服务器，必须把 HTML 从 iframe 或 contenteditable 元素中复制到一个表单字段。

## 第二十章 Javascript API

### 小结

除了定义新标签，HTML5 还定义了一些 JavaScript API。这些 API 可以为开发者提供更便捷的 Web 接口，暴露堪比桌面应用的能力。本章主要介绍了以下 API。

- Atomics API 用于保护代码在多线程内存访问模式下不发生资源争用。
- postMessage() API 支持从不同源跨文档发送消息，同时保证安全和遵循同源策略。
- Encoding API 用于实现字符串与缓冲区之间的无缝转换(越来越常见的操作)。
- File API 提供了发送、接收和读取大型二进制对象的可靠工具。
- 媒体元素`<audio>`和`<video>`拥有自己的 API，用于操作音频和视频。并不是每个浏览器都会支持所有媒体格式，使用 canPlayType()方法可以检测浏览器支持情况。
- 拖放 API 支持方便地将元素标识为可拖动，并在操作系统完成放置时给出回应。可以利用它创建自定义可拖动元素和放置目标。
- Notifications API 提供了一种浏览器中立的方式，以此向用户展示消通知弹层。
- Streams API 支持以全新的方式读取、写入和处理数据。
- Timing API 提供了一组度量数据进出浏览器时间的可靠工具。
- Web Components API 为元素重用和封装技术向前迈进提供了有力支撑。
- Web Cryptography API 让生成随机数、加密和签名消息成为一类特性。

## 第二十一章 错误处理与调试

### 小结

对于今天复杂的 Web 应用程序而言，JavaScript 中的错误处理十分重要。未能预测什么时候会发生 错误以及如何从错误中恢复，会导致糟糕的用户体验，甚至造成用户流失。大多数浏览器默认不向用户 报告 JavaScript 错误，因此在开发和调试时需要自己实现错误报告。不过在生产环境中，不应该以这种 方式报告错误。

下列方法可用于阻止浏览器对 JavaScript 错误作出反应。

- 使用 try/catch 语句，可以通过更合适的方式对错误做出处理，避免浏览器处理。
- 定义 window.onerror 事件处理程序，所有没有通过 try/catch 处理的错误都会被该事件处理程序接收到(仅限 IE、Firefox 和 Chrome)。

开发 Web 应用程序时，应该认真考虑可能发生的错误，以及如何处理这些错误。

- 首先，应该分清哪些算重大错误，哪些不算重大错误。
- 然后，要通过分析代码预测很可能发生哪些错误。由于以下因素，JavaScript 中经常出现错误:
  - 类型转换;
  - 数据类型检测不足;
  - 向服务器发送错误数据或从服务器接收到错误数据。

IE、Firefox、Chrome、Opera 和 Safari 都有 JavaScript 调试器，有的内置在浏览器中，有的是作为扩 展，需另行下载。所有调试器都能够设置断点、控制代码执行和在运行时检查变量值。

## 第二十二章 处理 XML

### 小结

浏览器对使用 JavaScript 处理 XML 实现及相关技术相当支持。然而，由于早期缺少规范，常用的功能出现了不同实现。DOM Level 2 提供了创建空 XML 文档的 API，但不能解析和序列化。浏览器为解析和序列化 XML 实现了两个新类型。

- DOMParser 类型是简单的对象，可以将 XML 字符串解析为 DOM 文档。
- XMLSerializer 类型执行相反操作，将 DOM 文档序列化为 XML 字符串。 基于所有主流浏览器的实现，DOM Level 3 新增了针对 XPath API 的规范。该 API 可以让 JavaScript 针对 DOM 文档执行任何 XPath 查询并得到不同数据类型的结果。

最后一个与 XML 相关的技术是 XSLT，目前并没有规范定义其 API。Firefox 最早增加了 XSLTProcessor 类型用于通过 JavaScript 处理转换。

## 第二十三章 JSON

### 小结

JSON 是一种轻量级数据格式，可以方便地表示复杂数据结构。这个格式使用 JavaScript 语法的一个 子集表示对象、数组、字符串、数值、布尔值和 null。虽然 XML 也能胜任同样的角色，但 JSON 更简 洁，JavaScript 支持也更好。更重要的是，所有浏览器都已经原生支持全局 JSON 对象。

ECMAScript 5 定义了原生 JSON 对象，用于将 JavaScript 对象序列化为 JSON 字符串，以及将 JSON 数组解析为 JavaScript 对象。JSON.stringify()和 JSON.parse()方法分别用于实现这两种操作。这 两个方法都有一些选项可以用来改变默认的行为，以实现过滤或修改流程。

## 第二十四章 网络请求与远程资源

XMLHttpRequest 对象的 API 被普遍认为比较难用，而 Fetch API 自从诞生以后就迅速成为了 XHR 更现代的替代 标准。Fetch API 支持期约(promise)和服务线程(service worker)，已经成为极其强大的 Web 开发工具。

### XMLHttpRequest

IE5 是第一个引入 XHR 对象的浏览器。这个对象是通过 ActiveX 对象实现并包含在 MSXML 库中 的。为此，XHR 对象的 3 个版本在浏览器中分别被暴露为 MSXML2.XMLHttp、MSXML2.XMLHttp.3.0 和 MXSML2.XMLHttp.6.0。

所有现代浏览器都通过 XMLHttpRequest 构造函数原生支持 XHR 对象:

let xhr = new XMLHttpRequest();

### HTTP 头部

- Accept:浏览器可以处理的内容类型。
- Accept-Charset:浏览器可以显示的字符集。
- Accept-Encoding:浏览器可以处理的压缩编码类型。
- Accept-Language:浏览器可以使用的语言。
- Authorization:HTTP 认证信息。
- Connection:浏览器与服务器的连接类型。
- Cookie:页面中设置的 Cookie。
- Host:发送请求的页面所在的域。
- Referer:发送请求的页面的 URI。**注意，这个字段在 HTTP 规范中就拼错了**，所以考虑到兼容性也必须将错就错。(正确的拼写应该是 Referrer。)
- User-Agent:浏览器的用户代理字符串。

如果需要发送额外的请求头部，可以使用 setRequestHeader()方法。服务器通过读取自定义头部可以确定适当的操作。自定义头部一定要区别于浏览器正常发送的头部， 否则可能影响服务器正常响应。有些浏览器允许重写默认头部，有些浏览器则不允许。

### GET 和 POST 请求

最常用的请求方法是 GET 请求，用于向服务器查询某些信息。查询字符串中的每个名和值都必须使用 encodeURIComponent()编码，所有名/值对必须以和号(&)分隔。

第二个最常用的请求是 POST 请求，用于向服务器发送应该保存的数据。每个 POST 请求都应该在 请求体中携带提交的数据，而 GET 请求则不然。POST 请求的请求体可以包含非常多的数据，而且数据 可以是任意格式。

默认情况下，对服务器而言，POST 请求与提交表单是不一样的。服务器逻辑需要读取原始 POST 数据才能取得浏览器发送的数据。不过，可以使用 XHR 模拟表单提交。为此，第一步需要把 `Content- Type` 头部设置为`"application/x-www-formurlencoded"`，这是提交表单时使用的内容类型。第二步是创建对应格式的字符串。POST 数据此时使用与查询字符串相同的格式。

POST 请求相比 GET 请求要占用更多资源。从性能方面说，**发送相同数量的数据， GET 请求比 POST 请求要快两倍。**

### XMLHttpRequest Level 2

XMLHttpRequest Level 2 又进一步发展了 XHR 对象。并非所有浏览器都实现了 XMLHttpRequest Level 2 的所有部分，但所有浏览器都实现了其中部分功能。

**1. FormData 类型**

现代 Web 应用程序中经常需要对表单数据进行序列化，因此 XMLHttpRequest Level 2 新增了 FormData 类型。FormData 类型便于表单序列化，也便于创建与表单类似格式的数据然后通过 XHR 发送。下面的代码创建了一个 FormData 对象，并填充了一些数据:

```jsx
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText);
    } else {
      alert("Request was unsuccessful: " + xhr.status);
    }
  }
};
xhr.open("post", "postexample.php", true);
let form = document.getElementById("user-info");
xhr.send(new FormData(form));
```

使用 FormData 的另一个方便之处是不再需要给 XHR 对象显式设置任何请求头部了。XHR 对象能 够识别作为 FormData 实例传入的数据类型并自动配置相应的头部。

**2. 超时**

IE8 给 XHR 对象增加了一个 timeout 属性，用于表示发送请求后等待多少毫秒，如果响应不成功 就中断请求。之后所有浏览器都在自己的 XHR 实现中增加了这个属性。

```jsx
xhr.timeout = 1000; // 设置 1 秒超时
xhr.ontimeout = function () {
  alert("Request did not return in a second.");
};
```

**3. overrideMimeType()方法**

```jsx
let xhr = new XMLHttpRequest();
xhr.open("get", "text.php", true);
xhr.overrideMimeType("text/xml");
xhr.send(null);
```

这个例子强制让 XHR 把响应当成 XML 而不是纯文本来处理。为了正确覆盖响应的 MIME 类型， 必须在调用 send()之前调用 overrideMimeType()。

### 进度事件

Progress Events 是 W3C 的工作草案，定义了客户端-服务器端通信。这些事件最初只针对 XHR，现 在也推广到了其他类似的 API。有以下 6 个进度相关的事件。

- loadstart:在接收到响应的第一个字节时触发。
- progress:在接收响应期间反复触发。
- error:在请求出错时触发。
- abort:在调用 abort()终止连接时触发。
- load:在成功接收完响应时触发。
- loadend:在通信完成时，且在 error、abort 或 load 之后触发。

每次请求都会首先触发 loadstart 事件，之后是一个或多个 progress 事件，接着是 error、abort 或 load 中的一个，最后以 loadend 事件结束。

### 跨源资源共享

CORS 背后的基本思路就是使用自定义的 HTTP 头部允许浏览器和服务器相互了解，以确实请求或响应 应该成功还是失败。

对于简单的请求，比如 GET 或 POST 请求，没有自定义头部，而且请求体是 text/plain 类型， 这样的请求在发送时会有一个额外的头部叫 **Origin。** Origin 头部包含发送请求的页面的源(协议、 域名和端口)，以便服务器确定是否为其提供响应。

`Origin: http://www.nczonline.net`

如果服务器决定响应请求，那么应该发送 Access-Control-Allow-Origin 头部

`Access-Control-Allow-Origin: http://www.nczonline.net`

如果没有这个头部，或者有但源不匹配，则表明不会响应浏览器请求。否则，服务器就会处理这个 请求。注意，无论请求还是响应都不会包含 cookie 信息。现代浏览器通过 XMLHttpRequest 对象原生支持 CORS。在尝试访问不同源的资源时，这个行为 会被自动触发。

出于安全考虑，跨域 XHR 对象也施加了一些额外限制。

- 不能使用 setRequestHeader()设置自定义头部。
- 不能发送和接收 cookie。
- getAllResponseHeaders()方法始终返回空字符串。

### 预检请求

CORS 通过一种叫预检请求(preflighted request)的服务器验证机制，允许使用自定义头部、除 GET 和 POST 之外的方法，以及不同请求体内容类型。

客户端

```
Origin: http://www.nczonline.net
Access-Control-Request-Method: POST //请求希望使用的方法。
Access-Control-Request-Headers: NCZ //(可选)要使用的逗号分隔的自定义头部列表。
```

服务端

```
Access-Control-Allow-Origin: http://www.nczonline.net //与简单请求相同。
Access-Control-Allow-Methods: POST, GET //允许的方法(逗号分隔的列表)。
Access-Control-Allow-Headers: NCZ //服务器允许的头部(逗号分隔的列表)
Access-Control-Max-Age: 1728000 //缓存预检请求的秒数
```

### 凭据请求

默认情况下，跨源请求不提供凭据(cookie、HTTP 认证和客户端 SSL 证书)。

客户端

```jsx
withCredentials：true
```

服务端

```
Access-Control-Allow-Credentials: true
```

### 替代性跨源技术

### 图片探测

这种动态创建图片的技术经常用于图片探测(image pings)。图片探测是与服务器之间简单、跨域、单向的通信。数据通过查询字符串发送，响应可以随意设置，不过一般是位图图片或值为 204 的状态码。 浏览器通过图片探测拿不到任何数据，但可以通过监听 onload 和 onerror 事件知道什么时候能接收 到响应。

```jsx
let img = new Image();
img.onload = img.onerror = function () {
  alert("Done!");
};
img.src = "http://www.example.com/test?name=Nicholas";
```

图片探测频繁用于跟踪用户在页面上的点击操作或动态显示广告。当然，图片探测的缺点是只能发送 GET 请求和无法获取服务器响应的内容。这也是只能利用图片探测实现浏览器与服务器单向通信的原因。

### JSONP

JSONP 是“JSON with padding”的简写，是在 Web 服务上流行的一种 JSON 变体。

SONP 调用是通过动态创建 `<script>` 元素并为 src 属性指定跨域 URL 实现的。

只能发送 get 请求，缺点是不好确定 JSONP 请求是否失败。

```jsx
function handleResponse(response) {
  console.log(`
          You're at IP address ${response.ip}, which is in
          ${response.city}, ${response.region_name}`);
}
let script = document.createElement("script");
script.src = "http://freegeoip.net/json/?callback=handleResponse";
document.body.insertBefore(script, document.body.firstChild);
```

### Fetch

Fetch API 能够执行 XMLHttpRequest 对象的所有任务，但更容易使用，接口也更现代化，能够在 Web 工作线程等现代 Web 工具中使用。XMLHttpRequest 可以选择异步，而 Fetch API 则必须是异步。Fetch API 是 WHATWG 的一个“活标准”(living standard)，用规范原文说，就是“Fetch 标准定义请求、响应，以及绑定二者的流程:**获取(fetch)**”。

Fetch API 本身是使用 JavaScript 请求资源的优秀工具，同时这个 API 也能够应用在服务线程 (service worker)中，提供拦截、重定向和修改通过 fetch()生成的请求接口。

### 中断请求

Fetch API 支持通过 AbortController/AbortSignal 对中断请求。调用 AbortController. abort()会中断所有网络传输，特别适合希望停止传输大型负载的情况。中断进行中的 fetch() 请求会导致包含错误的拒绝。

```jsx
let abortController = new AbortController();
fetch('wikipedia.zip', { signal: abortController.signal }) .catch(() => console.log('aborted!');
// 10 毫秒后中断请求
setTimeout(() => abortController.abort(), 10);
// 已经中断
```

### Web Socket

Web Socket(套接字)的目标是通过一个长时连接实现与服务器全双工、双向的通信。在 JavaScript 中创建 Web Socket 时，一个 HTTP 请求会发送到服务器以初始化连接。服务器响应后，连接使用 HTTP 25 的 Upgrade 头部从 HTTP 协议切换到 Web Socket 协议。这意味着 Web Socket 不能通过标准 HTTP 服务 器实现，而必须使用支持该协议的专有服务器。

因为 Web Socket 使用了自定义协议，所以 URL 方案(scheme)稍有变化:不能再使用 `http://` 或 `https://`， 而要使用 `ws://` 和 `wss://`。前者是不安全的连接，后者是安全连接。

### 安全

需要验证请求发送者拥有对资源的访问权限。可以通过如下方式实现。

- 要求通过 SSL 访问能够被 Ajax 访问的资源。
- 要求每个请求都发送一个按约定算法计算好的令牌(token)。

以下手段对防护 CSRF 攻击是无效的。

- 要求 POST 而非 GET 请求(很容易修改请求方法)。
- 使用来源 URL 验证来源(来源 URL 很容易伪造)。
- 基于 cookie 验证(同样很容易伪造)。

### 小结

Ajax 是无须刷新当前页面即可从服务器获取数据的一个方法，具有如下特点。

- 让 Ajax 迅速流行的中心对象是 **`XMLHttpRequest(XHR)`。**
- 这个对象最早由微软发明，并在 IE5 中作为通过 JavaScript 从服务器获取 XML 数据的一种手段。
- 之后，Firefox、Safari、Chrome 和 Opera 都复刻了相同的实现。W3C 随后将 XHR 行为写入 Web 标准。
- 虽然不同浏览器的实现有些差异，但 XHR 对象的基本使用在所有浏览器中相对是规范的，因此可以放心地在 Web 应用程序中使用。

XHR 的一个主要限制是同源策略，即通信只能在相同域名、相同端口和相同协议的前提下完成。

访问超出这些限制之外的资源会导致安全错误，除非使用了正式的跨域方案。这个方案叫作跨源资源共享(CORS，Cross-Origin Resource Sharing)，XHR 对象原生支持 CORS。图片探测和 JSONP 是另外两种 跨域通信技术，但没有 CORS 可靠。 Fetch API 是作为对 XHR 对象的一种端到端的替代方案而提出的。这个 API 提供了优秀的基于期约 的结构、更直观的接口，以及对 Stream API 的最好支持。

**Web Socket** 是与服务器的全双工、双向通信渠道。与其他方案不同，Web Socket 不使用 HTTP，而 使用了自定义协议，目的是更快地发送小数据块。这需要专用的服务器，但速度优势明显。

## 第二十五章 客户端存储

Progress Events 是 W3C 的工作草案，定义了客户端  服务器端通信。这些事件最初只针对 XHR，现 在也推广到了其他类似的 API。有以下 6 个进度相关的事件。

### 小结

Web Storage 定义了两个对象用于存储数据:sessionStorage 和 localStorage。前者用于严格 保存浏览器一次会话期间的数据，因为数据会在浏览器关闭时被删除。后者用于会话之外持久保存数据。

IndexedDB 是类似于 SQL 数据库的结构化数据存储机制。不同的是，IndexedDB 存储的是对象，而 不是数据表。对象存储是通过定义键然后添加数据来创建的。游标用于查询对象存储中的特定数据，而 索引可以针对特定属性实现更快的查询。

有了这些存储手段，就可以在客户端通过使用 JavaScript 存储可观的数据。因为这些数据没有加密， 所以要注意不能使用它们存储敏感信息。

## 第二十六章 模块

### 小结

模块模式是管理复杂性的永恒工具。开发者可以通过它创建逻辑彼此独立的代码段，在这些代码段之间声明依赖，并将它们连接在一起。此外，这种模式也是经证明能够优雅扩展到任意复杂度且跨平台 方案。

多年以来，CommonJS 和 AMD 这两个分别针对服务器端环境和受延迟限制的客户端环境的模块系统长期分裂。两个系统都获得了爆炸性增强，但为它们编写的代码则在很多方面不一致，经常也会带有冗余的样板代码。而且，这两个系统都没有在浏览器中实现。缺乏兼容导致出现了相关工具，从而让在浏览器中实现模块模式成为可能。

ECMAScript 6 规范重新定义了浏览器模块，集之前两个系统之长于一身，并通过更简单的声明性语法暴露出来。浏览器对原生模块的支持越来越好，但也提供了稳健的工具以实现从不支持到支持 ES6 模块的过渡。

## 第二十七章 工作者线程

### 小结

工作者线程可以运行异步 JavaScript 而不阻塞用户界面。这非常适合复杂计算和数据处理，特别是 需要花较长时间因而会影响用户使用网页的处理任务。工作者线程有自己独立的环境，只能通过异步消 息与外界通信。

工作者线程可以是专用线程、共享线程。专用线程只能由一个页面使用，而共享线程则可以由同源 的任意页面共享。

服务工作者线程用于让网页模拟原生应用程序。服务工作者线程也是一种工作者线程，但它们更像 是网络代理，而非独立的浏览器线程。可以把它们看成是高度定制化的网络缓存，它们也可以在 PWA 中支持推送通知。

## 第二十八章 最佳实践

### 编码规范

与大多数面向对象语言不同， JavaScript 并不强迫开发者把任何东西都定义为对象。它支持任何编程风格，包括传统的面向对象编程、声明式编程，以及函数式编程。

1. 可读性

以下这些地方应该写注释：

- 函数和方法
- 大型代码块
- 复杂的算法
- 使用黑科技

1. 变量和函数命名

以下是关于命名的通用规则：

- 变量名应该是名词，例如 car 或 person。
- 函数名应该以动词开始，例如 getName()。
- 返回布尔值的函数通常以 is 开头，比如 isEnabled()。
- 对变量和函数都使用符合逻辑的名称，不用担心长度。
- 变量、函数和方法应该以小写字母开头，使用驼峰大小写(camelCase)形式，如 getName()和 isPerson。类名应该首字母大写，如 Person、RequestFactory。常量值应该全部大写并以 下划线相接，比如 REQUEST_TIMEOUT。
- 名称要尽量用描述性和直观的词汇，但不要过于冗长。

### 编码惯例

1. 尊重对象所有权
2. 不声明全局变量
3. 不要比较 null
4. 使用常量

### 其他性能优化注意事项

- 原生方法很快。如：**Math 对象**。
- switch 语句很快。
- 位操作很快。

### 小结

随着 JavaScript 开发日益成熟，最佳实践不断涌现。曾经的业余爱好如今也成为了正式的职业。因此，**前端开发也需要像其他编程语言一样，注重可维护性、性能优化和部署。**

为保证 JavaScript 代码的可维护性，可以参考如下编码惯例。

- 其他语言的编码惯例可以作为添加注释和确定缩进的参考，但 JavaScript 作为一门适合松散类型的语言也有自己的一些特殊要求。
- 由于 JavaScript 必须与 HTML 和 CSS 共存，因此各司其职尤为重要:JavaScript 负责定义行为， HTML 负责定义内容，而 CSS 负责定义外观。
- 如果三者职责混淆，则可能导致难以调试的错误和可维护性问题。

随着 Web 应用程序中 JavaScript 代码量的激增，性能也越来越重要。因此应该牢记如下这些事项。

- 执行 JavaScript 所需的时间直接影响网页性能，其重要性不容忽视。
- 很多适合 C 语言的性能优化策略同样也适合 JavaScript，包括循环展开和使用 **switch** 语句而不是 if 语句。
- 另一个需要重视的方面是 DOM 交互很费时间，因此应该尽可能限制 DOM 操作的数量。

开发 Web 应用程序的最后一步是上线部署。以下是本章讨论的相关要点。

- 为辅助部署，应该建立构建流程，将 JavaScript 文件合并为较少的(最好是只有一个)文件。
- 构建流程可以实现很多源代码处理任务的自动化。例如，可以运行 JavaScript 验证程序，确保没有语法错误和潜在的问题。
- 压缩可以让文件在部署之前变得尽量小。
- 启用 HTTP 压缩可以让网络传输的 JavaScript 文件尽可能小，从而提升页面的整体性能。

# 生酮饮食（keto）

## 基础知识

## **生酮饮食**

**生酮饮食**（英语：ketogenic diet）字面意思是“会产生酮体的饮食”，其为一种高[脂肪](https://zh.wikipedia.org/wiki/%E8%84%82%E8%82%AA)，充足[蛋白质](https://zh.wikipedia.org/wiki/%E8%9B%8B%E7%99%BD%E8%B3%AA)，极[低碳水化合物饮食][https://zh.wikipedia.org/wiki/%e4%bd%8e%e7%a2%b3%e6%b0%b4%e5%8c%96%e5%90%88%e7%89%a9%e9%a3%b2%e9%a3%9f]([1)](https://zh.wikipedia.org/zh/%E7%94%9F%E9%85%AE%E9%A3%B2%E9%A3%9F#cite_note-Masood2021-1)。这种饮食的特色是让食物严重缺乏碳水化合物，强迫身体燃烧脂肪而非[碳水化合物](https://zh.wikipedia.org/wiki/%E7%B3%96%E7%B1%BB)，进而产生酮体；医学上主要在用于治疗难以控制（难治）的[儿童癫痫](https://zh.wikipedia.org/w/index.php?title=%E5%85%92%E7%AB%A5%E7%99%B2%E7%99%87&action=edit&redlink=1)。

## **生酮作用**

**生酮作用**（英语：Ketogenesis，又称**酮体生成**）是指[脂肪酸降解](https://zh.wikipedia.org/wiki/%E8%84%82%E8%82%AA%E9%85%B8%E4%BB%A3%E8%AC%9D)过程结果所致的[酮体](https://zh.wikipedia.org/wiki/%E9%85%AE%E4%BD%93)生成过程。

## 酮体

**酮体**（英语：Ketone bodies）是脂肪酸在肝内 β-氧化时特有的中间代谢产物，它包括[丙酮](https://zh.wikipedia.org/wiki/%E4%B8%99%E9%85%AE)、[乙酰乙酸](https://zh.wikipedia.org/wiki/%E4%B9%99%E9%85%B0%E4%B9%99%E9%85%B8)和[β-羟丁酸](https://zh.wikipedia.org/wiki/%CE%92-%E7%BE%A5%E4%B8%81%E9%85%B8)三种化合物。不过严格意义上来讲，β-羟丁酸是一种羟基酸，而非[酮](https://zh.wikipedia.org/wiki/%E9%85%AE)类。当机体处于饥饿、[禁食](https://zh.wikipedia.org/wiki/%E7%A6%81%E9%A3%9F)或某些病理状态（如[糖尿病](https://zh.wikipedia.org/wiki/%E7%B3%96%E5%B0%BF%E7%97%85)），酮体才会大量堆积。酮体可以提供一种替代的能源，对某些组织细胞来说非常重要。

身体在上述状态时，[脂肪](https://zh.wikipedia.org/wiki/%E8%84%82%E8%82%AA)动员加强，大量的[脂肪酸](https://zh.wikipedia.org/wiki/%E8%84%82%E8%82%AA%E9%85%B8)被肝细胞吸收和氧化；而同时为了维持[血糖](https://zh.wikipedia.org/wiki/%E8%A1%80%E7%B3%96)浓度的稳定，也会刺激体内[糖质新生](https://zh.wikipedia.org/wiki/%E7%B3%96%E8%B3%AA%E6%96%B0%E7%94%9F)作用。糖质新生所需原料[草酰乙酸](https://zh.wikipedia.org/wiki/%E8%8D%89%E9%85%B0%E4%B9%99%E9%85%B8)因为被大量消耗，影响到草酰乙酸所参与的另一代谢途径[三羧酸循环](https://zh.wikipedia.org/wiki/%E4%B8%89%E7%BE%A7%E9%85%B8%E5%BE%AA%E7%8E%AF)，使大量中间物[乙酰辅酶 A](https://zh.wikipedia.org/wiki/%E4%B9%99%E9%86%AF%E8%BC%94%E9%85%B6A)无法消耗、出现堆积，因而生成酮体。

## **酮症**

**酮症**是一种代谢状态，当体内的葡萄糖不足时，肝脏会将脂肪转换成脂肪酸与[酮体](https://zh.wikipedia.org/wiki/%E9%85%AE%E4%BD%93)，取代原本由[葡萄糖](https://zh.wikipedia.org/wiki/%E8%91%A1%E8%90%84%E7%B3%96)负责的能量来源。当血中酮体的含量大于 0.5mM，且有长时间的低血糖及低[胰岛素](https://zh.wikipedia.org/wiki/%E8%83%B0%E5%B3%B6%E7%B4%A0)含量，即为‘酮症’。

## **胰岛素抵抗**

**胰岛素抵抗**（英语：insulin resistance）又称**胰岛素抗性**[[1]][https://zh.wikipedia.org/wiki/%E8%83%B0%E5%B2%9B%E7%B4%A0%E6%8A%B5%E6%8A%97#cite_note-1]([2)](<https://zh.wikipedia.org/wiki/%E8%83%B0%E5%B2%9B%E7%B4%A0%E6%8A%B5%E6%8A%97#cite_note-2>)，是指[胰脏](https://zh.wikipedia.org/wiki/%E8%83%B0%E8%87%9F)并没有任何病理问题时，[脂肪细胞](https://zh.wikipedia.org/wiki/%E8%84%82%E8%82%AA%E7%B4%B0%E8%83%9E)、[肌肉细胞](https://zh.wikipedia.org/wiki/%E8%82%8C%E8%82%89%E7%B4%B0%E8%83%9E)和[肝](https://zh.wikipedia.org/wiki/%E8%82%9D)细胞对正常浓度的[胰岛素](https://zh.wikipedia.org/wiki/%E8%83%B0%E5%B2%9B%E7%B4%A0)反应不足的现象，亦即这些细胞需要更高的胰岛素浓度才能对胰岛素产生反应。随着情况发展，可能胰岛素的分泌量尽管提升很多却也无法满足需求，引起肌肉细胞吸收和肝细胞储备的[葡萄糖](https://zh.wikipedia.org/wiki/%E8%91%A1%E8%90%84%E7%B3%96)量降低，以及脂肪细胞储存的[甘油三酸酯](https://zh.wikipedia.org/wiki/%E7%94%98%E6%B2%B9%E4%B8%89%E9%85%B8%E9%85%AF)的水解，分别提升[血浆](https://zh.wikipedia.org/wiki/%E8%A1%80%E6%B5%86)中糖和自由[脂肪酸](https://zh.wikipedia.org/wiki/%E8%84%82%E8%82%AA%E9%85%B8)的含量，进而导致[代谢综合征](https://zh.wikipedia.org/wiki/%E4%BB%A3%E8%AC%9D%E7%97%87%E5%80%99%E7%BE%A4)。

## 糖异化

**糖异生**（英语：Gluconeogenesis[[1]](https://zh.wikipedia.org/wiki/%E7%B3%96%E5%BC%82%E7%94%9F#cite_note-1)）又称**糖异生作用**、**糖原发育不良作用**，指的是非碳水化合（[乳酸](https://zh.wikipedia.org/wiki/%E4%B9%B3%E9%85%B8)、[丙酮酸](https://zh.wikipedia.org/wiki/%E4%B8%99%E9%85%AE%E9%85%B8)、[甘油](https://zh.wikipedia.org/wiki/%E7%94%98%E6%B2%B9)、生糖[氨基酸](https://zh.wikipedia.org/wiki/%E6%B0%A8%E5%9F%BA%E9%85%B8)等）转变为[葡萄糖](https://zh.wikipedia.org/wiki/%E8%91%A1%E8%90%84%E7%B3%96)的过程，所以又称为**葡萄糖新生**[[2]](https://zh.wikipedia.org/wiki/%E7%B3%96%E5%BC%82%E7%94%9F#cite_note-2)。糖异生保证了机体的[血糖](https://zh.wikipedia.org/wiki/%E8%A1%80%E7%B3%96)水平处于正常水平。糖异生的主要[器官](https://zh.wikipedia.org/wiki/%E5%99%A8%E5%AE%98)是[肝](https://zh.wikipedia.org/wiki/%E8%82%9D)。肾在正常情况下糖异生能力只有肝的十分之一，但长期饥饿与酸中毒时肾糖异生能力可大为增强。

## 血脑屏障

**脑血管障壁**（英语：blood–brain barrier ，BBB），也称为**血脑屏障**或**血脑障壁**，指在[血管](https://zh.wikipedia.org/wiki/%E8%A1%80%E7%AE%A1)和[脑](https://zh.wikipedia.org/wiki/%E8%85%A6)之间有一种选择性地阻止某些物质由血液进入大脑的“屏障”。

脑血管障壁几乎不让任何物质通过，除了[氧气](https://zh.wikipedia.org/wiki/%E6%B0%A7%E6%B0%A3)、[二氧化碳](https://zh.wikipedia.org/wiki/%E4%BA%8C%E6%B0%A7%E5%8C%96%E7%A2%B3)和[血糖](https://zh.wikipedia.org/wiki/%E8%A1%80%E7%B3%96)，大部分的[药物](https://zh.wikipedia.org/wiki/%E8%97%A5%E7%89%A9)和[蛋白质](https://zh.wikipedia.org/wiki/%E8%9B%8B%E7%99%BD%E8%B3%AA)由于[分子](https://zh.wikipedia.org/wiki/%E5%88%86%E5%AD%90)结构过大，一般无法通过。

## 大脑供能

葡萄糖作为大脑的主要供能系统，大脑每天能消耗葡萄糖 100 克左右，这些葡萄糖主要由我们的血糖进行供应，所以吃甜的食物会让我们兴奋让大脑兴奋是对的！

如果血糖降低或者是血糖水平降低比如长期饥饿时，大脑无法得到充足的糖分供能就会利用肝生成的酮体提供能量。

饥饿期达到 3 天时每天大脑会消耗肝提供的酮体 50 克左右，饥饿达到两周后每天消耗的酮体可以达到 100 克！但是大脑无法提供正常工作，亢奋会降低！

## Omega-6

欧米茄 6（OMEGA6）在人体内至关重要，[胆固醇](https://baike.baidu.com/item/%E8%83%86%E5%9B%BA%E9%86%87/471445)必须与欧米茄 6 的亚油酸（LA）相结合，才能正常运转和代谢；人脑中的[不饱和脂肪酸](https://baike.baidu.com/item/%E4%B8%8D%E9%A5%B1%E5%92%8C%E8%84%82%E8%82%AA%E9%85%B8/352596)欧米茄 6（OMEGA6）和欧米茄 3（OMEGA3）各占一半；欧米茄 6 的[花生四烯酸](https://baike.baidu.com/item/%E8%8A%B1%E7%94%9F%E5%9B%9B%E7%83%AF%E9%85%B8/1201342)（AA）所产生的[前列腺素](https://baike.baidu.com/item/%E5%89%8D%E5%88%97%E8%85%BA%E7%B4%A0/4802031)PGE2，是人体许多生命功能所必需的激素类化学物质，但它会加速癌细胞的生长，必须由**欧米茄 3**来抑制。

## Omega-3

OMEGA-3 ，又被写作 Ω-3 、ω-3 ，中文称“欧美加 3 ” 、“欧米伽 3 ” ，为一组多元不饱和脂肪酸，常见于深海鱼类、海豹油、和某些植物中，对人体健康十分有益。在化学结构上，OMEGA-3 是一条由碳、氢原子相互连结而成的长链（ 18 个碳原子以上），其间带有 3-6 个不饱和键（即[双键](https://baike.baidu.com/item/%E5%8F%8C%E9%94%AE/4151287)）。因其第一个不饱和键位于甲基一端的第 3 个[碳原子](https://baike.baidu.com/item/%E7%A2%B3%E5%8E%9F%E5%AD%90/8784262)上，故名 OMEGA-3 。

Omega-3[多元不饱和脂肪](https://baike.baidu.com/item/%E5%A4%9A%E5%85%83%E4%B8%8D%E9%A5%B1%E5%92%8C%E8%84%82%E8%82%AA/4265224)酸是人体无法自行合成的[脂肪酸](https://baike.baidu.com/item/%E8%84%82%E8%82%AA%E9%85%B8/478673)，同时也是人体合成各种[荷尔蒙](https://baike.baidu.com/item/%E8%8D%B7%E5%B0%94%E8%92%99/33422)及内生性物质必要的营养素，只有靠食物外来的补充这些油酸，才能让人体的生理机能得以正常运作。

## 酮流感

当你刚开始生酮饮食时，会产生一些类似感冒的症状，比如说头痛，身上发冷，感觉疲劳等等。这种情况，大部分的小酮人在生酮初期都会经历。这种症状被称为"酮流感"(keto flu)，也被称为诱导流感(induction flu)，低碳水化合物流感(low carb flu)或阿特金斯流感(Atkins flu)。

### 症状

1. 脑雾
2. 头疼
3. 发冷
4. 喉咙酸痛
5. 昏昏沉沉
6. 失眠
7. 暴躁
8. 肌肉酸痛
9. 反胃
10. 难以集中注意力
11. 糖瘾
12. 胃痛

### 对策

1. 大量喝水
2. 喝骨头汤
3. 补充电解质
4. 吃更多脂肪，尤其是 MCT 油
5. 保证充足睡眠
6. 做一些温和的锻炼
7. 增加一些碳水摄入

## 多巴胺

多巴胺在整个这个行动发起的过程中，至少起了两个关键作用：

1. 多巴胺设定了门槛的高低。多巴胺越多，发起行动所需要的动力就越低。往往多巴胺越多，人的冲动性行为就越多，多巴胺越低，人就显得越麻木、反应就越慢。以吸毒这个行为为例，多巴胺越多，「摄入毒品」这一举动所需要的动力门槛就越低，大脑就更难抑制住吸毒行为。（帕金森大脑中多巴胺水平偏低）
2. 多巴胺还给行动选择带来了「学习」这个技能。比如说，如果基底核发起了一个行动 A，并且并且行动之后多巴胺水平升高了，中脑皮层通路就会做出相应改变，使得下一次遇到类似的环境/场景时，更倾向于选择行动 A。

## 内啡肽

[跑步者的愉悦感](https://zh.wikipedia.org/w/index.php?title=%E8%B7%91%E6%AD%A5%E8%80%85%E7%9A%84%E6%84%89%E6%82%85%E6%84%9F&action=edit&redlink=1)是指当运动量超过某一阶段时，体内便会分泌脑内啡。长时间、连续、中等至高强度的运动、深呼吸也是分泌脑内啡的条件。长时间运动把肌肉内的[糖原](https://zh.wikipedia.org/wiki/%E7%B3%96%E5%8E%9F)用尽，脑内啡便会分泌。这些运动包括[跑步](https://zh.wikipedia.org/wiki/%E8%B7%91%E6%AD%A5)、[游泳](https://zh.wikipedia.org/wiki/%E6%B8%B8%E6%B3%B3)、[越野滑雪](https://zh.wikipedia.org/wiki/%E8%B6%8A%E9%87%8E%E6%BB%91%E9%9B%AA)、长距离[划船](https://zh.wikipedia.org/wiki/%E5%88%92%E8%88%B9)、骑[单车](https://zh.wikipedia.org/wiki/%E5%96%AE%E8%BB%8A)、[举重](https://zh.wikipedia.org/wiki/%E8%88%89%E9%87%8D)、[有氧运动舞](https://zh.wikipedia.org/wiki/%E6%9C%89%E6%B0%A7%E8%88%9E%E8%B9%88)或球类运动（例如[篮球](https://zh.wikipedia.org/wiki/%E7%B1%83%E7%90%83)、[足球](https://zh.wikipedia.org/wiki/%E8%B6%B3%E7%90%83)或[美式足球](https://zh.wikipedia.org/wiki/%E7%BE%8E%E5%BC%8F%E8%B6%B3%E7%90%83)）。

## 可以吃什么

- 防弹咖啡

防弹咖啡是一种富含脂肪，热量超过 460 卡路里，不含[碳水化合物](https://baike.baidu.com/item/%E7%A2%B3%E6%B0%B4%E5%8C%96%E5%90%88%E7%89%A9/88328)的咖啡。它的配方主要为低霉菌咖啡豆、无盐草饲料黄油、中链甘油三酸酯油（MCT 油，一种易消化脂肪）。

- 黄油
- 椰子油
- 橄榄油
- 防弹咖啡
- 牛排
- 培根
- 黄瓜
- 夏威夷果
- 奶酪

## 不能多吃

## 花生

1. 致癌的黄曲霉素，“偏爱”长在花生上
2. Omega-6 脂肪酸爆高，导致炎症
3. 植酸、凝集素，妨碍营养吸收
4. **非常容易暴食 → 瓜子理论**

> 瓜子理论，[管理学](https://baike.baidu.com/item/%E7%AE%A1%E7%90%86%E5%AD%A6/250)的一门理论。[理论](https://baike.baidu.com/item/%E7%90%86%E8%AE%BA/1732500)内容：1．无论人们喜欢与否，很容易拿起第一颗瓜子；2．一旦吃上第一颗，就会吃起第二颗、第三颗……停不下来；3．在吃瓜子的过程中，人们可能会做一些别的事情，比如去洗手间等等，但回到座位后，都会继续吃瓜子，不[需要](https://baike.baidu.com/item/%E9%9C%80%E8%A6%81)他人提醒、[督促](https://baike.baidu.com/item/%E7%9D%A3%E4%BF%83/2979176)；4．大多数情况下，人们会一直吃下去，直到吃光为止。

# 设备

- 生酮试纸
- 酮体检测仪

# 徒步游记之香巴拉

May 2, 2022

## 什么是香巴拉？

即香山至八大处，详情见链接：

[香八拉\_百度百科](https://baike.baidu.com/item/%E9%A6%99%E5%85%AB%E6%8B%89/2669699?fr=aladdin)

[北京户外最经典的徒步路线--香八拉](https://zhuanlan.zhihu.com/p/50388215)

## 我的行程

先去公司取了一下行李，园区的绿化还是很不错的。带了一袋牛肉干，一根火腿肠，一个士力架，两瓶水一瓶饮料。

![15C6352B-A105-43D2-96B4-029827AF3C92.](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/15C6352B-A105-43D2-96B4-029827AF3C92.jpeg)

![1AB60A4E-159D-43C3-820D-E8B10E717FFB.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/1AB60A4E-159D-43C3-820D-E8B10E717FFB.jpeg)

打车到 10 号线知春路地铁站，然后乘坐十号线西郊线到达香山站，然后步行到此次徒步的起点，**香山邮局**。

![449A24CA-2B00-4032-A448-3E4495A93C7D.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/449A24CA-2B00-4032-A448-3E4495A93C7D.jpeg)

从香山邮局向**好汉坡**方向行进，中途会途径一个村庄。

![B51D0D6D-B943-488B-ACB2-FD4A89F3C83D.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/B51D0D6D-B943-488B-ACB2-FD4A89F3C83D.jpeg)

![81ABAF9A-FDEF-452D-AD99-496D11F9E51F_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/81ABAF9A-FDEF-452D-AD99-496D11F9E51F_1_102_o.jpeg)

此时北京正被疫情的阴霾笼罩，正式进入香山需要申请防火码，然后检查 48 小时内核酸报告并扫描登记健康宝。

![A9D2BBA1-19FA-4495-87D9-94313B1D4E20_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/A9D2BBA1-19FA-4495-87D9-94313B1D4E20_1_102_o.jpeg)

向**好汉坡**方向前进。

![05351B38-7E78-4910-8496-C9A94D90B5CA_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/05351B38-7E78-4910-8496-C9A94D90B5CA_1_102_o.jpeg)

![B40E6D62-AC3D-48CC-8093-98745A725F87_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/B40E6D62-AC3D-48CC-8093-98745A725F87_1_102_o.jpeg)

![57637695-D95A-4CCC-BFC2-4603F9523CB9_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/57637695-D95A-4CCC-BFC2-4603F9523CB9_1_102_o.jpeg)

开始攀爬好汉坡，路程不算很长，但对体力消耗还是很大的。

![35C09540-9B00-4BC3-B8FB-EE085A12D3B2_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/35C09540-9B00-4BC3-B8FB-EE085A12D3B2_1_102_o.jpeg)

![95970D7D-C60D-421A-A7F7-F1612FFDE1AC_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/95970D7D-C60D-421A-A7F7-F1612FFDE1AC_1_102_o.jpeg)

![06416B18-B27A-4418-B02A-85109DD1B1CF.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/06416B18-B27A-4418-B02A-85109DD1B1CF.jpeg)

![374BF781-0239-4E77-8EC9-8522A9BE446C_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/374BF781-0239-4E77-8EC9-8522A9BE446C_1_102_o.jpeg)

爬上好汉坡后有一个可供休息补给的零食铺，我买了个一根烤肠和一瓶零度可乐。

![2F1E828B-2578-4997-BC87-57A8DD38B9BE_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/2F1E828B-2578-4997-BC87-57A8DD38B9BE_1_102_o.jpeg)

此时有两个线路可供选择，一个是向北走，从植物园旁下山，路途一小时左右。另一个是向南走，即向八大处方向，时间不好估计。我继续了本次徒步的目标，即向南走。

![5614429F-B8B7-42A7-898F-C181AFE25C35_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/5614429F-B8B7-42A7-898F-C181AFE25C35_1_102_o.jpeg)

![BEC01CCC-D483-409E-B838-CA841B321C15_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/BEC01CCC-D483-409E-B838-CA841B321C15_1_102_o.jpeg)

![F22A379D-CECB-4BD7-8CB1-7A473F37DB24_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/F22A379D-CECB-4BD7-8CB1-7A473F37DB24_1_102_o.jpeg)

**北马场**

![235B0A41-F912-43BF-8DE9-C5B46FE6EAB0_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/235B0A41-F912-43BF-8DE9-C5B46FE6EAB0_1_102_o.jpeg)

到达本次徒步的关键节点，**水库**。

![B72E6CC3-6388-4F1A-86F9-CC07A4DF58BD_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/B72E6CC3-6388-4F1A-86F9-CC07A4DF58BD_1_102_o.jpeg)

在**八大处公园**入口处，发现一只逗狗。

![21F205E9-22A2-4A7D-A665-4AB89E465861_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/21F205E9-22A2-4A7D-A665-4AB89E465861_1_102_o.jpeg)

![1A709CAE-5446-4946-B90C-635B2BCED36E_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/1A709CAE-5446-4946-B90C-635B2BCED36E_1_102_o.jpeg)

穿过八大处，向出口进发。

![AB5DCAF2-F622-40EC-B27C-FF7F83209291_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/AB5DCAF2-F622-40EC-B27C-FF7F83209291_1_102_o.jpeg)

记录一个可供野餐的好草坪。

![F99FE110-9F37-487B-9426-97154C8144F1_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/F99FE110-9F37-487B-9426-97154C8144F1_1_102_o.jpeg)

无名英雄广场。

![FBB23B28-782F-4B70-BE9B-76BEEA8D2038_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/FBB23B28-782F-4B70-BE9B-76BEEA8D2038_1_102_o.jpeg)

到达本次徒步的重点，**西山国家森林公园**的入口。

![4BC80733-0C63-4049-BC8C-61FFB8A125FE_1_102_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/4BC80733-0C63-4049-BC8C-61FFB8A125FE_1_102_o.jpeg)

全部行程

![81A96B2F-1F9A-4000-9CB9-15BD6A71550D_1_101_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/81A96B2F-1F9A-4000-9CB9-15BD6A71550D_1_101_o.jpeg)

![24DBEC5B-6D87-4A2B-A7D0-0C5BAA00576D_1_101_o.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/24DBEC5B-6D87-4A2B-A7D0-0C5BAA00576D_1_101_o.jpeg)

## 总结

第一次尝试户外徒步，也是一次入门级的徒步。不断在上山和下山中前进，经常处于前后无人，对出口迷茫，但没有退路的状态，即为什么要爬山？因为山就在哪里。如何前进？路就在脚下。

对体力的消耗还是很大的，在别无选择的前进中，激发出体能的潜力。总体的感觉还是和打代码有些相似，山重水复疑无路，柳暗花明又一村。发现适当的解决方案时会有些许的成就感。

## 最后

去盒马和久久丫买了点好吃的。。。

![75C01194-63B5-4E37-AB21-2E91F028401B.jpeg](%E5%BE%92%E6%AD%A5%E6%B8%B8%E8%AE%B0%E4%B9%8B%E9%A6%99%E5%B7%B4%E6%8B%89%20fe50444282524c07ba092561b4f96b03/75C01194-63B5-4E37-AB21-2E91F028401B.jpeg)

# 《Javascript 悟道》读书笔记

## **基本原则**

ppt 中会包含大量的只有少数人知道的奇闻趣事
因为 js 很多地方的确有点奇怪，但是可能自己对 js 不是很精通，可能觉得 js 这么设计是很有道理的，在老道的吐槽下，可以达到对 js 祛魅的效果
本位很多的观点都是十分主观，我也不进行评论，还原作者的观点，以作者为准。
最后本次分享主要是达到一个抛砖引玉的效果，这本书和一般的技术书还是很不一样的，大家对这本书感兴趣可以去阅读一下。

## **命名**

因为 JavaScript 对于变量名的长度没有限制，所以不要吝惜你的起名才华。我希望你在命名的时候尽可能描述清楚被赋名者的含义，而不要使用各种隐晦的缩写。

JavaScript 的命名能以下划线（\_）或者美元符号（$）开头和结尾，还能以数字结尾，但我认为你不该这么做。JavaScript 允许我们做很多本不该做的事情。这些命名习惯应该留给代码生成器或者宏处理器，而人类应该去做人类该做的事情。

因为 JavaScript 没有私有属性，所以通常只能将对应的公有属性名或者全局变量名加上下划线前缀或下划线后缀来从语义上表示其为私有。

大多数语言命名时使用空格

FORTRAN 首先打破了桎梏，允许在命名时使用空格。然而，后来包括 JavaScript 在内的大多数编程语言没有继承这个优良传统，反而学习了它的一些糟粕。例如，使用等号（=）表示赋值，用圆括号（()）而不是花括号（{}）包裹 if 语句的条件表达式。

不过在出现这么一门语言之前，我还是推荐你使用下划线分隔变量名中的多个单词。这是因为，万一哪天真有更好的编程语言出现，这种命名法可以让你最便捷地将代码迁移至下一门语言。

JavaScript 中的所有名字都应该以小写字母开头，这一切都拜 JavaScript 中的 new 运算符所赐。

所有的构造函数都应该以大写字母开头，而其他任何名字都应该以小写字母开头。

## **保留字**

存空间有限的另一个遗留产物，因为保留字的设计可以给编译器节约少许字节。
我们现在不必再受这些事情的困扰了。可惜这几十年来，人们的思维已经固化。对于现代程序员来说，保留字的设计真的是糟粕。扪心自问，你能否记住所有的保留字？
还有一种糟心的情况是，你在起变量名的时候，尽管有个单词可以完美地阐释该变量的意义，但很不巧，它是一个你从来不用的保留字，甚至是一个还没有被实现的预保留字。
此外，保留字对于现代编程语言的设计者来说也不是好东西。脆弱的保留字策略会使我们不能干净利落地为一门流行语言添加新特性，给我们添堵。真希望能有一门强硬的新语言出现，让我们不用再为“五斗保留字”折腰。

## **数值**

JavaScript 只有一种数值类型这件事经常被人们诟病，但我反而认为这是 JavaScript 最成功的设计之一：这个设计让程序员不必浪费时间在几种相似的数据类型之间做选择，毕竟有时候花了时间还会选错；能避免那些由于数据类型之间的转换而造成的错误；甚至还可以避免整数类型的溢出错误。

JavaScript 的“整数”可比 Java 的整数可靠多了，因为它们不会溢出。

作为一门编程语言，Java 的数值运算系统在算错的时候甚至连 Warning 都不会报。int 类型总出错，还怎么指望通过它来避免错误呢？

## **零**

零是独一无二的。理论上来说，在一个数值系统中只应存在一个零。然而事不遂人愿

在 IEEE754 标准中有两个零：0 和-0。你知道 JavaScript 为帮你抹平 0 与-0 的不同做了多大努力吗？它让我们几乎可以忽略-0 的存在。不过仍然需要注意以下几种情况：

## **NaN**

NaN 是 Not a Number 的缩写。你说怪不怪？虽然它的含义是“不是一个数”，但是 typeof 对它的结果又告诉大家 NaN 是一个数（"number"）。

最让人困惑的是，NaN 居然不等于它自己！这是 IEEE 754 的糟粕，JavaScript 却将其照搬了过来，没有做任何处理。

因此，当我们要判断一个值是不是 NaN 时，应当使用 Number.isNaN(value)。Number.isFinite(value)函数会在值为 NaN、Infinity 或者-Infinity 的时候返回 false。

对于 NaN 而言，唯一有意义的运算就是 Number.isNaN(NaN)。除此之外，不要在任何场景用 NaN。

## **布尔**

布尔（boolean）类型是以英国数学家乔治·布尔（George Boole）命名的，他发明了代数逻辑系统。克劳德·香农将布尔乔治·布尔的系统应用在了数字电路的设计上，所以我们称计算机电路为逻辑电路。

<、<=、>和>=的结果都是准确的。不过在其他情况下，这些比较大多是无意义的。JavaScript 并不会阻止你比较不同的类型，这些情况需要你自行规避。所以要尽可能避免在不同类型之间进行比较。

答应我，永远不要用这两个运算符；答应我，务必使用===和!==。

剩下的值就全都是幻真的了，比如空对象、空数组，甚至"false"和"0"这样看起来像幻假的字符串。

这些幻假的值虽然表面上看起来像 false，但实际上大多是装出来的。幻真的值也一样。这些犯蠢的类型是设计上的缺陷，但这并不能全怪 JavaScript。JavaScript 沿用的是 C 语言的习惯。

C 语言程序员有一个流派，就是利用隐式类型转换“特性”让条件判断尽可能简洁。

理论上，一个条件判断的结果只应为 true 或 false，其余的值都应该在编译时就抛错。然而 JavaScript 并非如此，它的条件表达式可以写得如 C 语言般简洁。当条件判断语句意外地传入了错误类型的值时，JavaScript 不会报错。这就很可能让程序进入另一个本不该进入的条件分支。Java 就不一样，它要求条件判断位中的值必须是布尔类型，这样可以避免很多潜在的错误。唉，真希望 JavaScript 也是这样的。

虽然 JavaScript 并没有学习这些好榜样，但我还是希望你能假装它已经做到了，然后在条件判断位中始终使用布尔类型。如果我们在编码的时候严于律己，就能写出更好的程序。

## **数组**

数组真是最伟大的数据结构。

JavaScript 的第一个版本并没有将数组设计进去，但由于 JavaScript 的对象实在太强大了，以至于几乎没人发现这个纰漏。如果不考虑性能，数组能做的事，对象基本上都能做。

其实，JavaScript 的数组几乎就是对象，它们仅有四处不同。

- 数组有一个神奇的 length 属性。该属性并不是指数组中元素的数量，而是指数组元素的最高序数加 1。
- 数组对象都继承自 Array.prototype，该原型比 Object.prototype 多了一些更实用的函数。
- 数组与对象的写法不同
- 虽然 JavaScript 眼中的数组和对象几乎一样，但 JSON 眼中的它们很不一样。

JavaScript 自身也对数组感到迷惑。如果对数组进行 typeof 操作，返回将是"object"，这显然是有问题的。

自古以来，人们都习惯用 1 来代表计数的开始。从 20 世纪 60 年代中期开始，一小股有影响力的程序员认为，计数应当从 0 开始。到了今天，几乎所有程序员都习惯了这种以 0 开始的计数法。不过，其他人（包括大多数数学家）还是习惯以 1 开始。数学家通常将原点标记为 0，但还是将有序集合的第一个元素标为 1。至于他们为什么这么做，至今仍是个谜。

有一个论点是从 0 开始可以提高效率，但并没有什么有利的证据；还有一个主张其正确性的论点是从 0 开始可以减少“差一错误”（off-by-wun）1，但人们对此也表示怀疑。也许有一天我们能找到有力的证据来证明，对于程序员来说从 0 开始更好。

**差一错误**是在计数时由于边界条件判断失误导致结果多了一或少了一的错误，通常指 [计算机编程](https://zh.wikipedia.org/wiki/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BC%96%E7%A8%8B) 中 [循环](https://zh.wikipedia.org/wiki/%E7%A8%8B%E5%BA%8F%E5%BE%AA%E7%8E%AF) 多了一次或者少了一次的程序错误，属于 [逻辑错误]的一种。

indexOf

如果遍历了整个数组还没有匹配的值，则返回-1。我个人认为这个设计有错误，因为-1 也是一个数，与其他返回的序号都是数值类型。

JavaScript 还有很多类似的设计错误，这些底型在一开始设计的时候就有问题。

forEach 和 find 方法都有提前退出的能力（every 和 some 就是 forEach 的可提前退出形态）。map、reduce 和 filter 则没有这个能力。

reduce 方法有逆序版本 reduceRight，而可怜的 forEach、map、filter 和 find 都没有这种令人羡慕的逆序版本。

我甚至怀疑正是这些缺憾才导致 for 语句一直没有被废除。

## **对象**

JavaScript 为“对象”一词赋予了新的含义。在 JavaScript 中，除了两种底型之外（null 和 undefined），万物皆对象。

在其他语言中，这类数据结构通常被称为哈希表（hashtable）、映射表（map）、记录（record）、结构体（struct）、关联数组（associative array）或字典（dictionary）

我建议不要在对象中存储 undefined。尽管 JavaScript 允许我们在对象中存储这个值，并且会正确返回 undefined 值，但是当对象中不存在某个属性的时候，JavaScript 返回的也是 undefined。这会产生二义性。我个人认为，为某个属性赋值 undefined 意在删除该属性，然而 JavaScript 并没有这样做。要删除某个属性，正确的做法是使用 delete 运算符。

JavaScript 的一个设计错误是对象上的属性名必须为字符串。有时候，我们的确需要用一个对象或者数组作为键名。很可惜的是，JavaScript 中的对象会在这种情况下做一件蠢事——直接把要作为键名的值通过 toString 方法进行转换。我们之前也看到了，对象的 toString 方法返回的完全是糟粕。

对于这种情况，JavaScript 也算有自知之明，为我们准备了备用方案——WeakMap。这类对象的键名是对象，不能是字符串，并且它的接口也与普通的对象完全不同

WeakMap 并不允许我们检视对象中的内容。除非拥有对应的键名，否则无法访问其中的内容。WeakMap 与 JavaScript 的垃圾回收机制可以融洽相处。如果 WeakMap 中的一个键名在外没有了任何副本，那么这个键名所对应的属性会被自动删除。这可以防止一些潜在的内存泄漏情况。

一种只允许字符串作为键名，而另一种居然只允许对象作为键名。就不能好好地设计出一种既支持字符串又支持对象作为键名的类型吗？

WeakMap 这个名字起得就够差劲了，Map 更不知所云。它与数组的 map 方法没有半点关系，更与绘制地图毫不沾边。所以我一直不推崇 Map，但是 WeakMap 和数组的 map 方法则是吾之所爱。

JavaScript 还有一种叫 Symbol 的类型，具有 WeakMap 的一些能力。但我不推荐使用 Symbol，因为它真的很多余。我个人的习惯就是不使用各种多余的功能，以此来简化操作。

// 字符串的全等运算非常有用。这也是我认为不需要 Symbol 的原因之一，毕竟内容相同的字符串会被认为是同一个对象。不过在 Java 之类的语言中，字符串是不能全等的。

## **底型**

底型是用于指示递归数据结构结尾的特殊值，也可用于表示值不存在。在一般的编程语言中，常以 nil、none、nothing 或者 null 表示。

JavaScript 有两种底型：null 和 undefined。其实 NaN 也可以算作一种底型，主要用于表示不存在的数值。不过我认为过多底型属于语言设计上的失误。

在 JavaScript 中，可以说只有 null 和 undefined 不是对象。如果基于它们去访问一些属性，就会触发异常。

从一方面看，null 和 undefined 是非常类似的；但从另外一些方面来看，它们的行为又不一样——互有交集，却又无法完全相互替代。
有时候，它们的表象一致，但是实际表现不同，这就很容易造成混乱。我们经常不得不花时间决定当下到底该使用哪个底型，这些虚无缥缈的理论又会导致更多混乱，而混乱就是各种 bug 之源。如果只保留两者之一，程序将更美好。我们虽然不可能改变 JavaScript 这门编程语言来只留一种底值，但是可以从自身做起，只用一种 2。我个人建议淘汰 null，只用 undefined。

因为 JavaScript 自身也在用 undefined。如果你用 let 或者 var 声明一个变量却没有初始化它，这个值就是 undefined。这其实很神奇，你定义了一个未定义（undefined）的变量。如果你调用一个函数，却没往其中传入足量的参数，那么那些没有传参数的值就是 undefined；如果你访问一个对象中不存在的属性，得到的也是 undefined；数组也一样，如果你访问其中不存在的元素，得到的还是 undefined。

只有在创建空对象的时候，我才会使用 null——Object.create(null)。不过我也是不得已而为之，因为 Object.create()或者 Object.create(undefined)会触发异常，这是语言规范的设计错误造成的。

type of null === ‘’object 这就有可能导致一些程序逻辑上的错误。这也是我认为应该避免使用 null 的原因之一。

## **this**

Self 语言是 Smalltalk 语言的一种方言，用原型替代了类。一个对象可以直接继承自另一个对象。原来的模型由于高耦合性而使扩展性变得脆弱和膨胀，而 Self 语言的原型特性是一种出色的简化。原型模型相比之下更轻巧、更具表现力。
JavaScript 实现了原型模型的一个怪异变体。

2007 年，多个研究性项目尝试开发出 JavaScript 的安全子集，而其中最大的问题就是 this 的管理。在方法调用中，this 会被绑定到对应的对象上。这种行为有时候是好的，但在其作为函数被调用时，this 就会被绑定到全局对象上，这就是一件糟糕的事了。我建议的方案是完全取消 this，因为我认为它既没用又会造成问题。如果将 this 从 JavaScript 中移除，JavaScript 仍是一门图灵完备的语言。所以，我自身已经开始了去 this 化的编程方式，这样就可以免受其害了。自从这么做之后，我发现用 JavaScript 编程并没有变难，反而变简单了，写出来的程序也更轻巧、优雅。因此我建议大家遵循去 this 化的原则。你会发现这是一个明智的决定，生活也会因此变得更加阳光明媚。我并不是要夺走你的 this，只是想让你成为一个无忧无虑的程序员。用“类”写代码的程序员终将走向一片凄迷的“代码坟场”。

this 真是个坏家伙。

## **写在最后**

这些改进的最大受益者就是现在可以用更少精力来完成更多、更好工作的程序员。这些改进的最大对手同样是这些程序员，他们通常以怀疑和敌对的态度去迎接这些新范式。他们利用自己的知识和经验来提出令人信服的论点，然而事后再看，这些论点全是错的。他们待在旧范式的舒适区，不愿意接受新范式。大家都很难说出新范式和糟糕思想之间的区别。

以上每个转变都花了 20 多年才完成。函数式编程花的时间甚至翻了一番。所花时间如此之长，仅仅是因为我们的惯性思维作怪。新范式必须在老一代程序员退休或者去世后才有出头之日。

普朗克在物理学中观测到了类似的现象：葬礼越多，科学越进步。

# React 框架选择指北

React 是当前非常流行的用于构建用户界面的 JavaScript 库， 它不仅可以为应用的每一个状态设计出简洁的视图。而且，当数据变动时，React 还能高效更新并渲染合适的组件。

然而要想开发一个完整的前端应用，仅仅使用 React 是远远不够的，我们需要以下各种工具的帮助如：

- 本地环境开发
- 生产环境打包
- opimizations
- 模块按需加载和打包
- 将最新的 ES 语法或 TS 转译成 ES5
- 热更新

手动去实现以上功能是繁琐且没必要的，目前 React 有三个较为流行的框架可供我们选择即：Create React App、Gatsby、Next.js，下面我将逐一对比他们之间的优劣和不同。

![https://user-images.githubusercontent.com/33340988/127197921-1e3393d7-bb63-431e-8060-dc24a1781a0f.jpg](https://user-images.githubusercontent.com/33340988/127197921-1e3393d7-bb63-431e-8060-dc24a1781a0f.jpg)

## **Create React App (CRA)**

Create React App 是 FaceBook 的 React 团队官方出的一个构建 React 单页面应用的脚手架工具。它本身集成了 Webpack，并配置了一系列内置的 loader 和默认的 npm 的脚本，可以很轻松的实现零配置就可以快速开发 React 的应用。

它适用于以下类型的网站：

- 管理后台
- 仪表盘
- 数据分析
- form 表单
- 内网应用

CRA 的优势 ✅ ：

- 官方出品
- 零配置
- CSR（即页面完全在浏览器渲染），简单易于学习
- 服务器和客户的代码完全解耦
- 易于部署，因为打包后的文件是静态文件

CRA 的劣势 ⛔️：

- 打包后的代码可能会臃肿
- 需要手动配置路由、状态管理、代码分割、样式文件等
- 不能用于需要 SEO 检索的网站
- 首屏效果不好，因为 CSR 页面在初始加载时比较慢，

需要注意的是，相比于 Gatsby 和 Next ，CRA 并不是一个框架，正如它官网所描述的：

> Create React App 是一个官方支持的创建 React 单页应用程序的方法。

## **Gatsby**

Gatsby 不仅仅是一个静态网站生成器，它更是一个**渐进式 Web 应用生成器**💪。它的使用背景与 CRA 完全不同。通过 Gatsby 建立的网站，很容易搜索引擎检索到，而且页面的渲染性能非常好。完美支持个人网站、博客、文档网站（PS: React 的官方文档使用的就是 Gatsby），甚至是电子商务网站。而且 Gatsby 可以在构建时通过 GraphQL 获取数据。

可以在 [官方展示页面](https://www.gatsbyjs.com/showcase/) 上查看有哪些页面是用 Gatsby 构建的。

Gatsby 的优势 ✅ ：

- 页面渲染性能优秀
- 对 SEO 友好
- 对打包文件进行了优化
- 轻松部署到 CDN（基于出色的扩展功能）
- 可以创建一个具有离线功能的 PWA 应用
- 丰富的插件系统

Gatsby 的劣势 ⛔️：

- 使用起来相较于 CRA 更为复杂
- 需要了解 GraphQL 和 Node.Js 的相关知识
- 配置繁重
- 构建时间会随着内容的增加而变长
- 有些功能可能需要付费

值得强调的是，丰富的插件系统也是选择 Gatsby 的一个原因，比如 Gatsby 提供许多博客主题插件，其他例如谷歌分析、图片压缩、预加载插件等等。

## **Next.js**

Next.js 适用于高动态或者面向用户的网页，这些页面需要优秀的 SEO，并且可能每分每秒都在变化。

举个例子：今日头条的首页会根据每个人不同的喜好来推送不同的信息流。如果使用 Gatsby 或 Create React App，会首先渲染一个空页面，然后通过 HTTP 调用来获取信息流的新闻数据。然后有了 Next ，可以在服务器端进行数据的获取，并返回完整的页面。

可以在 Next.js 的[展示页面](https://nextjs.org/showcase) 查看有哪些应用是用 Next.js 构建的。

Next.js 的优势 ✅ ：

- 支持服务器端预渲染
- 对 SEO 友好
- 零配置
- 适用于面向用户的高动态内容
- 还可以像 Gatsby 一样做 SSG （ Server Side Generation）

Next.js 的劣势 ⛔️：

- 使用起来比 CRA 更复杂
- SSR 增加了额外的复杂程度
- 扩展取依赖于服务器
- 没有丰富的插件生态系统
- 有些功能可能需要付费

## **总结**

我们需要分析我们想要构建什么类型的网站，以便在 CRA、Gatsby 或 Next.js 之间做出正确的选择，因为他们之间差距很大，适用于不同的场景。

如果我们对项目的需求有足够的了解，在这三者之间挑选就很容易多了。

原文链接：

[When to pick Gatsby, Next.Js or Create React App](https://dev.to/alexandrudanpop/react-applications-when-to-pick-gatsby-or-next-js-or-create-react-app-50l1)

# 编程

# 《他改变了中国：江泽民传》书摘

## **简介**

> 《他改变了中国：江泽民传》（英语：The Man Who Changed China: The Life and Legacy of Jiang Zemin）是一部有关中国第三代最高领导人、前中共中央总书记江泽民的传记，作者为罗伯特·劳伦斯·库恩，于 2005 年以英语和中文两种语言出版，出版后产生了广泛的影响和争议。这本书由兰登书屋集团在全球除中国以外的地区出版发行。在中国，它被上海世纪出版集团以《他改变了中国：江泽民传》的标题出版。

## **书摘**

> 1946 年 4 月，江加人了共产觉，此时距他 20 岁生日还有 4 个月。

- 辉煌的起点

> 在以后的岁月里，厉恩虞成为南京中学的校长;“文化大革命”期间他受尽折磨直到 1975 年才获得平反。1978 年，他死于癌症。非常令人遗憾的是，他没能亲眼看到他曾经向之传授共产主义理论的年轻人最终成为世界上最大的共产党的总书记，1998 年 7 月，厉逝世 20 周年之际，江主席专门撰写了一篇文章《忆厉恩虞同志》。

- 优秀耀眼却命运如此不同

> 在整个 1947 年春季，江参加了一个接一个的抗议活动。从 4 月到 6 月，反内战的集会接连不断。5 月，全国部分地区又爆发了多次反饥饿的示威这场持续了一个月的名为“反饥饿运动”的系列政治行动揭开了纪念五四运动 28 周年的序幕，并把江泽民这代抗议学生和他们著名的前辈联系在了一起。

```text
1919 -> 1947 -> 1966 -> 1996 ->2026 -> 2060
1919 五四运动
1947 抗日胜利
1966 文革开始
1996 香港回归
2026 复兴之路
2060 ...
```

> 一天，一个工人要江泽民修理一台坏了的马达。“我大吃一惊，”江在 50 年后回忆道，他的感受仍然十分新鲜，“我根本不知道该如何着手。不管怎么说，我是个大学生。但我学过的微积分、物理和工程学课程却没有一门教过我如何处理这样的问题。“从此以后，江泽民必须成为“修理东西”的行家

- 真实的社会与大学之间有很大的差距

> 国民觉后来轰炸了上海的发电厂。江亲手启动了工厂的备用发电机，以防止厂里的冰激凌融化变质。对解放事业的这一贡献使他终生感到自豪。

- 为解放工作做过真正的贡献

> 在被接管之后，工厂成为益民公司的一部分，并改名为“上海益民食品一厂”。整个公司都隶属于华东工业部。1949 年 9 月的一天,汪道涵(华东工业部部长一位崭露头角的党的领导人）来工厂视察，在视察中，他看到了一家陈旧但士分整洁的乳品厂，到处散发着新鲜冰激凌的香味。此外，更重要的是，他发现了一个很有潜力的年轻人。
> “江泽民充满了活力，”回忆起他们初次见面的情景，汪说道，“他是党员,而且给人一种值得信赖的感觉。我觉得他前途无量。”

- 命运转折

> 江始终对自己在葛被免职一事中所起的作用感到于心不安。“几十年来,甚至直到今天,江都非常后悔自己对葛冬青的做法。”沈永言回忆说。“江向他道歉了好儿次。1962 年给‘右派’摘帽的时候，江特别关照了他，葛是第一批被摘帽的。

- 一个好人，更是一个真实的人

> 每天，江穿着蓝色工作服在厂里巡视。他和工人们聊天，询问机器的运转情况。他不懂就问，从不不懂装懂的态度是出了名的。他还很关心下属，无论是在工作还是在生活中。1960 年，跟江同事的一个年轻工程师想结婚 但因为厂里没有能分给新婚夫妇房子而无法完婚。当时江和 6 名其他家庭成员仍住在那套三居室的小单元房里，但他却马上为这位朋友腾出了一间房。此后两年,这对小夫妻一直和拥挤的江家合住。

- 不懂就问

> 而在当时，人们试图采用务实的方法解决中国的问题。最具革新精神的领域之一是由刘少奇的门生薄一波所领导的第一机械工业部。他营造了以工作成绩为奖惩依据的环境，像江泽民汶样的人可以在这种环境中崭露头角。

- 薄一波，第一机械工业部

> 武汉热工机械研究所——包括一个原子能研究中心在内的一项重要工程刚刚成立。汪道涵建议由不到 39 岁却有着动力工程领域过硬履历的江担任所兼党委副书记。身兼两职给了江很大的权力，这一任命把江提拔进了高级领导干部的行列。
> 江对于这一任命心情复杂。虽然他将成为有 300 多人的新机构的领导,但他更喜欢在北京工作的前景。新职务的一个不利因素是,他的家庭没法与他同行，家人不得不留在上海——这是一段 20 年分居生活的开始。尽管江每年有一个月的假期可以与家人团聚,两地分居还是使这个家庭，龙其是他的妻子在情感上付出了代价。另一个不利用素是，武汉作为湖北省的省会处于政治主流之外。不过,事实很快证明，这一点反而是天大的喜事。在此后的几件中，政治的主流是任何人都最不愿卷人的。

- 暴风雨来临，远离漩涡中心

> 是什么原因使江泽民遭受的迫害相对较轻呢？首先，他离北京和上海比较远——那两个地方被看成是滋生反对毛以及破坏共产主义的“走资派"的温床。另外,江的个人行为无懈可击：他没什么财产，从不追求浮华的生活方式。为了把迫害他的人搞糊涂，江强调他的父亲是共产党的烈士,而对他成长的文化背景和所接受的精英教育则经描淡写。那时江还不知道，他的母校扬州中学是红卫兵攻击的早期目标，他们用鲜亮的大红色把这栋“封建”大楼涂抹得面目全非。

> 江的语言能力对他的领导地位极为重要。他抓住一切机会练习罗马尼亚语，当他不能用这门新学会的语言表达自己的想法时，他还可以同东欧人说俄语，同西欧人说英语。他发现罗马尼亚人民活泼热情、思想开放，他很喜欢与他们在一起。这是他在对外关系中的第一次官方经历。国内那些迫切希望能够取得任何形式外交胜利的上级认为，这是外交上的 一个漂亮仗。江后来回忆说，此次经历让他“张开双眼看世界”。此行标志着他一生中留给后人的主要成就之一的发端：促进中国与世界其他地区的友好往来。

- 语言才能

> 在这动荡的年代，两个家庭始终保持着联系。在汪道涵被清洗与罢黜之后，江泽民在武汉，江的妻子在上海给了汪的女儿以庇护。这不是没有危险的，因为任何与已被罢黜的汪的接触，都会给那些想打倒江的人以方便的借口。

- 重感情

> 邓小平在政治局会议上发表讲话说：“现在，我们的主要任务是要不拘一格地发现和提拔有前途的中青年干部。”他提信“四个转变”，以产生新代的共产觉领导人员，要寻求“革命化、年轻化、知识化、专业化”的人才。
> 听了邓的指示之后,已完全恢复权力的汪道涵找到谷牧，推荐江泽民在新成立的委员会中担任高级职务。(汪本人刚被委以中国最重要的职位之一:上海市市长。)谷牧在 20 世纪 50 年代当过上海市委副书记，他记起了过去的江，并任命他为两个委员会的副主任兼秘书长、觉组成员。
> 经过 4 年鳌伏之后,54 岁的江终于成了副部长。在几周之内,江以尤投票权代表的身份列席了人大常委会的一次会议，并在会上作了有关建立经济特区的简要报告。江还首次被选举为中国人民政治协商会议委员。政协代表着中国的各界别、各团体、各少数民族和各民主觉派，它们组成一个在共产党领导下的“爱国统一战线”

- 改革开放 + 高人指路

> 1982 年 5 月，江泽民被任命为电子工业部第一副部长兼党组副书记。这足个重妥的提升。
> 1982 年 9 月，邓小平在第十二次觉代表大会致开幕词，题为〝中国特色的社会主义"，从此以后这就成为定义中国改華计划的词组。邓认为，马列理论必领适应中国的文化，这也是江后来进一步发展的主题。对西方人来说,邓的改革似乎是试探性的蹒跚学步，但在中国,这些改革却被视为大胆而影响深远。

- 1982 电子工业部第一副部长兼党组副书记

> 就在这次党代会上，江泽民成为中央委员会——制订政策并选举产生政治局——第 210 名委员。通过进入中国政治权力的核心，江已经越过了成为高级职务候选人的最后一-个障碍。他几乎完全符合当时的四项标准：出身革命家庭，做过 30 年有知识的管理人员，又是几个领域的专家，而且只有 56 岁，相对来说仍属年轻。
> 当江第一次出席觉的中央委员会会议，坐到座位上的时候，他环顾四周，感到非常地亲切自然。他认识许多中央委员，包括几名在上海地下党时期的同事，一些老一辈的领导曾同他的养父江上青共同战斗过，其中很多人后来成了江的支持者、尤其是张爱萍将军。江最近的领导是副总理谷牧,谷牧还是中央书记处成员，这是个管理党务的机构。

> 江泽民给他妹妹的对联写的是有关诸葛亮的内容。诸葛亮生活在 3 世纪，被认为是中国最伟大的军事战略家。
> 一边写着“攻心”。——意即“努力赢得人心”。
> 另一边写着“审势“——意即“判断时机”，换句话说就是估计形势。

- 攻心
- 审势

> 汪道涵的上海市长任期将于 1985 年届满，北京方面在物色他的接班人。不管是什么原因——有人说是汪年纪偏大，领导缺三活力，另一些人将此归咎于缺少中央政府的支持，上海这一中国最重要的商业中心没有繁荣起来。
> “我当然参加了让谁来接替我任上海市长的讨论，”汪道涵回忆说，〝副总理万里来征求我的意见。他提出好儿个极有竞争力的人选。我推荐了江。

- 上海市长

> 现在也到了江泽民重新考虑自己的事业的时候了。1989 年他将满 63 岁。传统上为退休的高级领导人准备的职务——全国人大常委会副委员长或全国政协副主席——并没有吸引力。江想彻底改变一下。他想成为母校上海交通大学的教授。
> 尽管江可以利用上海市委书记的职务来确保在大学里谋得一个席位，但他更希望通过自己的学术成就来取得。他回忆起翻译过有关电力问题的俄文著作，就和老朋友沈永言联系，希望恢复这项工作。在内心里，江仍然是一位知识分子，出版著作令他感到自豪。他还准备在大学里进行—次题为《当前电力节约与能源开发趋势》的讲座，他将就这一课题撰写一篇技术论文。

- 真正的知识分子

> 江泽民一直密切关注着首都的局势发展，他打破自己的禁令与上海学生进行了对话，他走出来，彻夜不眠地劝说学生们停止抗议活动。凌晨，江作出了最勇敢的举动，他手拿扩音器走到在外滩的人群中间。

- 站在学生中

> 到了凌晨 2 时 45 分，已经绝食 5 天的学生们停止了行动。当天晚些时候,江泽民看望了住院学生并希望他们能够迅速恢复健康。江以非暴力手段出;色地结束了上海的示威游行。而与此同时，他又向中共中央发去电报，表示完仝支持实施戒严。

- 手段巧妙，站位清晰

> 这期间，邓小平与中国的 8 位高级领导人见面，确定了赵紫阳的继任者。作出这一历史性的决定花了 5 个小时。
> “经过漫长与仔细的考虑之后，〞邓告诉以他为核心的领导集体，上海市委书江泽民同志看来确实是个合适的人选。我认为他挑得起这副担子。陈云、先念同志和我都倾向让江泽民同志任;总书记。其他人有什么看法？〞
> 杨尚昆表示同意。他強调，〝新的领与集体(必须)保持改革开放的形象，赢得人民的信任”，并补充说奶果它“墨守成规，死板僵化，不思进取”，那么人民不会信任亡，党员不会尊敬它，那就会不断出乱子，“经济增长也就无从谈起〞。他说,中国如果再次闭关锁国，那将是“很可怕”的，
> 元老薄一波也支持新一代的领导人。“只要我们不碍手碍脚，放手让
> 他们去干，”他说，我想他们会做得很好。”
> 邓小平随后要水就任命以江泽民为总书记的新一届政治局常委进行正式表决。结果是全票通过。

- 中央已经决定了

> 江泽民接到书记处的紧急通知，要他立即赶到北京。当他匆忙赶到机场时，发现等着他的是一架专机，但是在北京南苑机场接他的汽车却是一辆普通的大众桑塔纳。直到此时，江才被告知邓小平将在西山别墅见他。这套伪装是为了防止江被愤怒的示威者认出而采取的预防措施。
> 当邓提出由他担任,总书记时，江大为惊讶。他表示了他对邓的感谢和对党的忠诚，保证他会做觉要他做的一切。“我担心，“江说，“我担当不起党赋子的伟大使命。”
> 江泽民对这一任命感觉很复杂。他是有抱负的，但并非野心勃动。他在上海很愉快。当时，他向邓解释说，他没有在中央工作的经验是一个缺陷，在与那些已在中央工作数十年的同事打交道时更是如此。邓回答道：“我们都支持你。我们将帮助你克服任何困难，你不必担心。”当晚，江乘同一架飞机回到了上海。

- 有所犹豫，高处不胜寒

> 江也怀疑自己是否能在北京的精英中站住脚。就像他以前经常做的，他拜访了汪道涵，征求他的意见。
> “我知道他是总书记的合适人选，但是我能看出他的矛盾心情。所以我写了领导 1840 年抗英鸦片战争的中国民族英雄林则徐的一副对联来勉励他：’苟利国家生死以，岂因祸福避趋之。’大意是如果对国家有利，就要不惧生死。”

- 苟利国家生死以，岂因祸福避趋之

> 江泽民处理上海的示威者时，表现出良好的直觉。他对示威者进行安抚并态度温和，同时又在涉及觉的权力的问题上寸步不让。最后，他果断处理《导报》问题这件事表明在必要的时候，他愿意采取行动。

- 直觉

> “如果三哥，就像他自己说的那样，毫无准备，”江泽慧说，“我们就更没有淮备了！真的让我们大吃一惊。我的第一反应是历史的重担已落在他的肩上。
> “我们并末感到极度快乐，“她吐露说，“我们当然也没有庆祝。他的任命不值得庆祝。这是在‘六•四’后不久，国家将向什么方向前进尚不清楚。这是段非常闲难的时期。

- ”国家将向什么方向前进尚不清楚。这是段非常闲难的时期。“

> 8 月初，江泽民前往上海视察，由同事朱镕基、吴邦国、陈至立陪同，所有这些人最后都去了北京，在中央担任显要职务。值得注意的是，这时江作了第一次职务任命，将时任上海市委副书记的曾庆红任命为党的中央委员会办公厅副主任（副部级）。这是个起协调作用的关键职位，具有很大影响。江任命他忠诚的秘书贾廷安为“江办”主任，这也是个副部级的职位。(贾随江从上海来到了北京。）
> 这一选择非常明智，曾庆红具有机智的政治敏镜感、完美的政治背景以及个人关系：他的父亲曾是军队指挥官、党的高级领导和政府高级官员,在华东很有影响，尤其在上海。汪道涵也是其父的门生之一。他的母亲曾是一位早期的党的工作者，是参加过长征而幸存下来的少数女性之一并曾任一家幼儿园的园长，许多高千子女都曾在这家幼儿园就读。事实证明，不论是在行政工作还是在政治策略上面,曾庆红对江的帮助都是无可估量的。

- 曾入阁

> 江泽民在党校发表讲话 3 天后，他来到邓小平家，寻求这位最高领导人对使用“社会主义市场经济”这 面改革新旗帜的同意。讲话前江没有和邓磋商。在邓南方谈话后，一切问题便由江自己来解决。在此意义上，南方谈话确实是对江的一次考验，而他的党校讲话正是最后一次考试。

- 一切问题便由江自己来解决
- 最后一次考试。

> 江对记者说：“我坚持这样一种思想，那就是干一行，爱一行，钻一行。因此，我现在读一些有关历史、科技和世界事务的书籍。”江说他喜欢古典音乐，但也不排斥快节奏的音乐，比如迪斯科，“年轻人喜欢这个”。

- 干一行，爱一行，钻一行

> 到 1992 年 12 月，《解放军报》至少发表了 12 篇社论，拥戴江为“觉的领导核心"和唯一的“军队统帅”。他的领导被称为反映了“老红军的传统〞江赢得了对中国武装部队的领导。

- 军队

> 虽然当时正下着雨，但中国国家主席来到校园的消息还是迅速传开了。很快就有数百名学生赶来,围拢在这位著名的访客身边。“学生应该具有广博的知识，”江提出;忠告，“文学艺术，例如托尔斯泰、莎士比亚、巴尔扎克、但丁、莱昂纳多•达•芬奇的作品，可以提高你们的审美情趣，丰富你们的思想和生活。不要局限在你们的专业里面。”江说，理科学生需要了解更多的文科知识，文科学生则需要了解更多的理科知识。“如果你们想学习其他国家的先进知识，”他补充说，“你们就必须掌握外语。在我的学生时代，我们每天早晨 5 点钟就起床，背通 60 个英语单词。”海南大学的校长担心中国的元首会耽误行程，试图劝说江离开。不过，这个曾两度想做一名教授的人正在自得其乐。“中国的末来在你们身上，〞江对周围的人说道，“当今世界的竞争主要是知识的竞争一位古代圣贤说过‘天下兴亡，匹夫有责。“江最后用毛泽东那句含义深远的话作为自己的结束语：“世界是你们的，也是我们的，但归根结底是你们的。”

- 知识分子

> 对改革速度缓慢依旧感到恼火的邓小平，将富有进取心的上海市委书记朱镕基提升为副总理。朱在国务院具体分管工业、农业和财政。尽管他们的个性不同，江和朱在上海时却合作得很好。作为一名热忱的改革者,朱镕基使国务院在政策问题上形成一种新的平衡。

- 朱入阁

> 邓小平委托出席晚宴的薄一波(中国的“长寿元老”之一）代为宣读他的致词。“有个我一直在考虑怎么才能解决的难题，”邓告诉薄，“在觉内以及在国内外，我个人的作用和影响被认为是特别巨大的，甚至是不可或缺的。这不是一件好事。有一天如果我真的死了，这可能会给觉和国家造成动荡。我希望在很短的一段时间里，中央和省一级领导班子能统一思想，下定决心,紧密团结在以江泽民同志为核心的觉中央周围。
> 薄一波在《人民日报》撰文称，从邓到江的过渡与 1949 年新中国成立时确立毛泽东为第一代领导人，以及 1978 年改革开始时确认邓小平为第二代领导人有着同样重要的历史意义。“我们必须拥护江泽民作为唯一的核心，"薄写道。

- 薄一波与江的缘分

> 接下来的数天内,政治局势迅速明朗起来。中国人民解放军和人民武装警察部队发表了支持江的声明。3 位高级将领也紧随其后。江对军队工作多年的投人获得丰厚的回报，证明了邓对其继承人所提建议的英明：“在每 5 个工作日中，要有 4 天与军队高层待在一起。“

- 小平逝世，平稳过渡

# 防抖(debounce)、截流(throttle)

## 防抖 debounce

连续点击，最后一次点击一秒后执行一次。

```js
function debounce(fn, delay) {
  let timer = null;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
}

const get = () => {
  console.log("debounce");
};
a = debounce(get, 1000);
a();
```

## 节流 throttle

连续点击，每隔一秒执行一次。

```js
function throttle(fn, time) {
  let begin = new Date();
  return function () {
    if (new Date() - begin < time) {
      return false;
    }
    fn();
    begin = new Date();
  };
}

const get = () => {
  console.log(666);
};
a = throttle(get, 1000);
```

# 其他

# 互联网常用名词

## 服务器

### [Linux](https://www.linux.org/)

Linux 是一种自由和开放源码的类 UNIX 操作系统。该操作系统的内核由林纳斯·托瓦兹在 1991 年 10 月 5 日首次发布，在加上用户空间的应用程序之后，成为 Linux 操作系统。Linux 也是自由软件和开放源代码软件发展中最著名的例子。只要遵循 GNU 通用公共许可证（GPL），任何个人和机构都可以自由地使用 Linux 的所有底层源代码，也可以自由地修改和再发布。大多数 Linux 系统还包括像提供 GUI 的 X Window 之类的程序。除了一部分专家之外，大多数人都是直接使用 Linux 发行版，而不是自己选择每一样组件或自行设置。

Linux 严格来说是单指操作系统的内核，因操作系统中包含了许多用户图形接口和其他实用工具。如今 Linux 常用来指基于 Linux 的完整操作系统，内核则改以 Linux 内核称之。由于这些支持用户空间的系统工具和库主要由理查德·斯托曼于 1983 年发起的 GNU 计划提供，自由软件基金会提议将其组合系统命名为 GNU/Linux[7][8]，但 Linux 不属于 GNU 计划，这个名称并没有得到社群的一致认同。

Linux 最初是作为支持英特尔 x86 架构的个人电脑的一个自由操作系统。目前 Linux 已经被移植到更多的计算机硬件平台，远远超出其他任何操作系统。Linux 可以运行在服务器和其他大型平台之上，如大型计算机和超级计算机。世界上 500 个最快的超级计算机已 100％运行 Linux 发行版或变种[9]。Linux 也广泛应用在嵌入式系统上，如手机（Mobile Phone）、平板电脑（Tablet）、路由器（Router）、电视（TV）和电子游戏机等。在移动设备上广泛使用的 Android 操作系统就是创建在 Linux 内核之上。

通常情况下，Linux 被打包成供个人计算机和服务器使用的 Linux 发行版，一些流行的主流 Linux 发布版，包括 Debian（及其派生版本 Ubuntu、Linux Mint）、Fedora（及其相关版本 Red Hat Enterprise Linux、CentOS）和 openSUSE 等。Linux 发行版包含 Linux 内核和支撑内核的实用程序和库，通常还带有大量可以满足各类需求的应用程序。个人计算机使用的 Linux 发行版通常包含 X Window 和一个相应的桌面环境，如 GNOME 或 KDE。桌面 Linux 操作系统常用的应用程序，包括 Firefox 网页浏览器、LibreOffice 办公软件、GIMP 图像处理工具等。由于 Linux 是自由软件，任何人都可以创建一个符合自己需求的 Linux 发行版。

### [CentOS](https://zh.wikipedia.org/wiki/CentOS)

CentOS（Community Enterprise Operating System）是 Linux 发行版之一，它是来自于 Red Hat Enterprise Linux（RHEL）依照开放源代码规定发布的源代码所编译而成。由于出自同样的源代码，因此有些要求高度稳定性的服务器以 CentOS 替代商业版的 Red Hat Enterprise Linux 使用。两者的不同，在于 CentOS 并不包含封闭源代码软件。CentOS 对上游代码的主要修改是为了移除不能自由使用的商标。[3]2014 年，CentOS 宣布与 Red Hat 合作[4]，但 CentOS 将会在新的委员会下继续运作，并不受 RHEL 的影响[5]。

CentOS 和 RHEL 一样，都可以使用 Fedora EPEL 来补足软件。

### [Ubuntu](https://zh.wikipedia.org/wiki/Ubuntu)

Ubuntu（国际音标：/ʊˈbʊntuː/，uu-BUUN-too）[7][8]是基于 Debian，以桌面应用为主的 Linux 发行版。Ubuntu 有三个正式版本，包括桌面版、服务器版及用于物联网设备和机器人的 Core 版。前述三个版本既能安装于实体电脑，也能安装于虚拟电脑。从 17.10 版本开始，Ubuntu 以 GNOME 为默认桌面环境。[9]

Ubuntu 是著名的 Linux 发行版之一，也是目前最多用户的 Linux 版本。Ubuntu 每六个月（即每年的四月与十月）发布一个新版本，长期支持（LTS）版本每两年发布一次。普通版本一般只支持 9 个月，但 LTS 版本一般能提供 5 年的支持。

Ubuntu 由英国 Canonical 公司发布，他们提供商业支持[10]。它是基于自由软件，其名称来自非洲南部祖鲁语或科萨语的“Ubuntu”一词（译为乌班图），意思是“人性”、“我的存在是因为大家的存在”，[11]是非洲传统的一种价值观。

Canonical 由南非企业家 Mark Shuttleworth 创立。Canonical 通过销售与 Ubuntu 相关的技术支持和其他服务来产生收益。[12]Ubuntu 项目公开承诺开源软件开发的原则；鼓励人们使用自由软件，研究它的运作原理，改进和分发。[13][14]

### [Debian](https://zh.wikipedia.org/wiki/Debian)

Debian（/ˈdɛbiən/[5]）是完全由自由软件组成的类 UNIX 操作系统，其包含的多数软件使用 GNU 通用公共许可协议授权，并由 Debian 计划的参与者组成团队对其进行打包、开发与维护。

Debian 计划最初由伊恩·默多克于 1993 年发起，Debian 0.01 版在 1993 年 9 月 15 日发布[6]，而其第一个稳定版本则在 1996 年发布。[7]

该计划的具体工作在互联网上协调完成，由 Debian 计划领导人带领一个志愿者团队开展工作，并以三份奠基性质的文档作为工作指导：Debian 社群契约、Debian 宪章和 Debian 自由软件指导方针。操作系统版本定期进行更新，候选发布版本将在经历过一定时间的冻结之后进行发布。

作为最早的 Linux 发行版之一，Debian 在创建之初便被定位为在 GNU 计划的精神指导下进行公开开发并自由发布的项目。该决定吸引自由软件基金会的注意与支持，他们为该项目提供从 1994 年 11 月至 1995 年 11 月为期一年的赞助。[8]赞助终止后，Debian 计划创立非营利机构 Software in the Public Interest 以提供支持并令其持有 Debian 商标作为保护机构。Debian 也接受世界多个非营利组织的资金支持。

### [Unix shell](https://zh.wikipedia.org/wiki/Unix_shell)

Unix shell，一种壳层与命令行界面，是 UNIX 操作系统下传统的用户和计算机的交互界面。第一个用户直接输入命令来执行各种各样的任务。

普通意义上的 shell 就是可以接受用户输入命令的程序。它之所以被称作 shell 是因为它隐藏了操作系统低层的细节。同样的 Unix 下的图形用户界面 GNOME 和 KDE，有时也被叫做“虚拟 shell”或“图形 shell”。

Unix 操作系统下的 shell 既是用户交互的界面，也是控制系统的脚本语言。当然在这点也有别于 Windows 下的命令行，虽然也提供了很简单的控制语句。在 Windows 操作系统下，可能有些用户从来都不会直接的使用 shell，然而在 Unix 系列操作系统下，shell 仍然是控制系统启动、X Window 启动和很多其他实用工具的脚本解释程序。

### Z shell

Z shell（Zsh）是一款可用作交互式登录的 shell 及脚本编写的命令解释器。Zsh 对 Bourne shell 做出了大量改进，同时加入了 Bash、ksh 及 tcsh 的某些功能。

自 2019 年起，macOS 的默认 Shell 已从 Bash 改为 Zsh。

### Bash

Bash，Unix shell 的一种，在 1987 年由布莱恩·福克斯为了 GNU 计划而编写。1989 年发布第一个正式版本，原先是计划用在 GNU 操作系统上，但能运行于大多数类 Unix 系统的操作系统之上，包括 Linux 与 Mac OS X v10.4 起至 macOS Mojave 都将它作为默认 shell，而自 macOS Catalina，默认 Shell 以 zsh 取代。

### [whoami](https://zh.wikipedia.org/wiki/Whoami)

whoami 是操作系统中用于查看当前有效用户名的命令，自 Windows Server 2003 以来每个 Windows 操作系统和大多数类 Unix 操作系统上都可以找到。它是英文“Who am I？”（我是谁？）的拼接结果。当被调用时，打印当前用户的有效用户名。它与 Unix 命令 id -un 具有相同的效果。

在类 Unix 操作系统上，命令的输出与*USER 稍有不同*，_因为 whoami 输出用户正在使用的用户名_，*而*USER 输出用于登录的用户名。例如，假使用户以用户名 John 登录并使用命令 su（su 默认不调用 login shell）获得了 root 权限，此时若使用 whoami 命令会输出 root，而 echo $USER 对应的输出则是 John。

该程序最早创建于 BSD 2.9 中，作为命令“who am i”我是谁的一种便利形式，即伯克利 Unix（Berkeley Unix）打印登录用户身份的方式。[1] GNU 版本由 Richard Mlynarik 编写，是 GNU 核心工具组（coreutils）的一部分。 该命令也可作为 Windows 2000 Resource Kit[2]和 Windows XP SP2 支持工具的一部分[3]。 除此以外，文件服务器上 Netware 的公共文件夹内也包含了该程序。它还输出当前工作站所连接的服务器的用户名。

## 数据库

### MySQL

MySQL（官方发音为/maɪ ˌɛskjuːˈɛl/“My S-Q-L”[5]，但也经常被读作/maɪ ˈsiːkwəl/“My Sequel”）原本是一个开放源码的关系数据库管理系统，原开发者为瑞典的 MySQL AB 公司，该公司于 2008 年被昇阳微系统（Sun Microsystems）收购。2009 年，甲骨文公司（Oracle）收购昇阳微系统公司，MySQL 成为 Oracle 旗下产品。

MySQL 在过去由于性能高、成本低、可靠性好，已经成为最流行的开源数据库，因此被广泛地应用在 Internet 上的中小型网站中。随着 MySQL 的不断成熟，它也逐渐用于更多大规模网站和应用，比如维基百科、Google 和 Facebook 等网站。非常流行的开源软件组合 LAMP 中的“M”指的就是 MySQL。

### MongoDB

MongoDB 是一种面向文档的数据库管理系统，用 C++等语言撰写而成，以解决应用程序开发社区中的大量现实问题。MongoDB 由 MongoDB Inc.（当时是 10gen 团队）于 2007 年 10 月开发，2009 年 2 月首度推出，现以服务器端公共许可（SSPL）分发。

### 关系数据库

关系数据库（英语：Relational database），是创建在关系模型基础上的数据库，借助于集合代数等数学概念和方法来处理数据库中的数据。现实世界中的各种实体以及实体之间的各种联系均用关系模型来表示。关系模型是由埃德加·科德于 1970 年首先提出的，并配合“科德十二定律”。现如今虽然对此模型有一些批评意见，但它还是数据存储的传统标准。标准数据查询语言 SQL 就是一种基于关系数据库的语言，这种语言执行对关系数据库中数据的检索和操作。 关系模型由关系数据结构、关系操作集合、关系完整性约束三部分组成。

### NoSQL

NoSQL（最初表示 Non-SQL[1]，后来有人转解为 Not only SQL[2][3]），是对不同于传统的关系数据库的数据库管理系统的统称。 允许部分资料使用 SQL 系统存储，而其他资料允许使用 NOSQL 系统存储。其数据存储可以不需要固定的表格模式以及元数据（metadata），也经常会避免使用 SQL 的 JOIN 操作，一般有水平可扩展性的特征。

### Redis

Redis 是一个使用 ANSI C 编写的开源、支持网络、基于内存、分布式、可选持久性的键值对存储数据库。从 2015 年 6 月开始，Redis 的开发由 Redis Labs 赞助，而 2013 年 5 月至 2015 年 6 月期间，其开发由 Pivotal 赞助。[1]在 2013 年 5 月之前，其开发由 VMware 赞助。[2][3]根据月度排行网站 DB-Engines.com 的数据，Redis 是最流行的键值对存储数据库。[4]

### [Ruby](https://zh.wikipedia.org/wiki/Ruby)

Ruby 是一种面向对象、指令式、函数式、动态的通用编程语言。在 20 世纪 90 年代中期由日本计算机科学家松本行弘（Matz）设计并开发。

遵守 BSD 许可证和 Ruby License[10][注 1]。它的灵感与特性来自于 Perl、Smalltalk、Eiffel、Ada 以及 Lisp 语言。由 Ruby 语言本身还发展出了 JRuby（Java 平台）、IronRuby（.NET 平台）等其他平台的 Ruby 语言替代品。

### [Nginx](https://zh.wikipedia.org/wiki/Nginx)

Nginx（发音同“engine X”）是异步框架的网页服务器，也可以用作反向代理、负载平衡器和 HTTP 缓存。该软件由伊戈尔·赛索耶夫（Игорь Сысоев）开发并于 2004 年首次公开发布[6]。2011 年成立同名公司以提供支持服务[7]。2019 年 3 月 11 日，Nginx 公司被 F5 网络公司以 6.7 亿美元收购[8]。

Nginx 是免费的开源软件，根据类 BSD 许可证的条款发布。一大部分 Web 服务器使用 Nginx[9]，通常作为负载均衡器。[10]

## 网络

### [反向代理](https://zh.wikipedia.org/wiki/%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86)

反向代理在电脑网络中是代理服务器的一种。服务器根据客户端的请求，从其关系的一组或多组后端服务器（如 Web 服务器）上获取资源，然后再将这些资源返回给客户端，客户端只会得知反向代理的 IP 地址，而不知道在代理服务器后面的服务器集群的存在[1]。

与前向代理不同，前向代理作为客户端的代理，将从互联网上获取的资源返回给一个或多个的客户端，服务端（如 Web 服务器）只知道代理的 IP 地址而不知道客户端的 IP 地址；而反向代理是作为服务器端（如 Web 服务器）的代理使用，而不是客户端。客户端借由前向代理可以间接访问很多不同互联网服务器（集群）的资源，而反向代理是供很多客户端都通过它间接访问不同后端服务器上的资源，而不需要知道这些后端服务器的存在，而以为所有资源都来自于这个反向代理服务器。

反向代理在现时的互联网中并不少见，而另一些例子，像是 CDN、SNI 代理等，是反向代理结合 DNS 的一类延伸应用。

### [CDN(内容分发网络)](https://zh.wikipedia.org/wiki/%E5%85%A7%E5%AE%B9%E5%82%B3%E9%81%9E%E7%B6%B2%E8%B7%AF)

内容分发网络（英语：Content Delivery Network 或 Content Distribution Network，缩写：CDN）是指一种透过互联网互相连接的电脑网络系统，利用最靠近每位用户的服务器，更快、更可靠地将音乐、图片、视频、应用程序及其他文件发送给用户，来提供高性能、可扩展性及低成本的网络内容传递给用户。

### [HTTP(超文本传输协议)](https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE)

超文本传输协议（英语：HyperText Transfer Protocol，缩写：HTTP）是一种用于分布式、协作式和超媒体信息系统的应用层协议[1]。HTTP 是万维网的数据通信的基础。

设计 HTTP 最初的目的是为了提供一种发布和接收 HTML 页面的方法。通过 HTTP 或者 HTTPS 协议请求的资源由统一资源标识符（Uniform Resource Identifiers，URI）来标识。

HTTP 的发展是由蒂姆·伯纳斯-李于 1989 年在欧洲核子研究组织（CERN）所发起。HTTP 的标准制定由万维网协会（World Wide Web Consortium，W3C）和互联网工程任务组（Internet Engineering Task Force，IETF）进行协调，最终发布了一系列的 RFC，其中最著名的是 1999 年 6 月公布的 RFC 2616，定义了 HTTP 协议中现今广泛使用的一个版本——HTTP 1.1。

### [HTTPS(超文本传输安全协议)](https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE)

超文本传输安全协议（英语：HyperText Transfer Protocol Secure，缩写：HTTPS；常称为 HTTP over TLS、HTTP over SSL 或 HTTP Secure）是一种通过计算机网络进行安全通信的传输协议。

HTTPS 经由 HTTP 进行通信，但利用 SSL/TLS 来加密数据包。HTTPS 开发的主要目的，是提供对网站服务器的身份认证，保护交换资料的隐私与完整性。这个协议由网景公司（Netscape）在 1994 年首次提出，随后扩展到互联网上。

历史上，HTTPS 连接经常用于万维网上的交易支付和企业信息系统中敏感信息的传输。在 2000 年代末至 2010 年代初，HTTPS 开始广泛使用，以确保各类型的网页真实，保护账户和保持用户通信，身份和网络浏览的私密性。

另外，还有一种安全超文本传输协议（S-HTTP）的 HTTP 安全传输实现，但是 HTTPS 的广泛应用而成为事实上的 HTTP 安全传输实现，S-HTTP 并没有得到广泛支持。

### [IPS(互联网协议套件)](https://zh.wikipedia.org/wiki/TCP/IP%E5%8D%8F%E8%AE%AE%E6%97%8F)

互联网协议套件（英语：Internet Protocol Suite，缩写 IPS）[1]是网络通信模型，以及整个网络传输协议家族，为网际网络的基础通信架构。它常通称为 TCP/IP 协议族（英语：TCP/IP Protocol Suite，或 TCP/IP Protocols），简称 TCP/IP[2]。因为该协议家族的两个核心协议：TCP（传输控制协议）和 IP（网际协议），为该家族中最早通过的标准[3]。由于在网络通讯协议普遍采用分层的结构，当多个层次的协议共同工作时，类似计算机科学中的堆栈，因此又称为 TCP/IP 协议栈（英语：TCP/IP Protocol Stack）[4][5] 。这些协议最早发源于美国国防部（缩写为 DoD）的 ARPA 网项目，因此也称作 DoD 模型（DoD Model）[6]。这个协议族由互联网工程任务组负责维护。

TCP/IP 提供了点对点链接的机制，将资料应该如何封装、寻址、传输、路由以及在目的地如何接收，都加以标准化。它将软件通信过程抽象化为四个抽象层，采取协议堆栈的方式，分别实现出不同通信协议。协议族下的各种协议，依其功能不同，分别归属到这四个层次结构之中[7][8]，常视为是简化的七层 OSI 模型。

**OSI 模型**

- 应用层（application layer）：HTTP、SMTP、FTP、SSH、DNS
- 表示层（presentation layer）：ASCLL
- 会话层（session layer）：RPC
- 传输层（transport layer）：TCP、UDP、TLS／SSL、RTP
- 网络层（network layer）：IP(IPv4、IPv6)、ICMP
- 数据链路层（data link layer）：以太网、MAC
- 物理层（physical layer）：调制调节器、无线电、光纤

**为什么 DNS 使用 UDP 而不是 TCP?**

> DNS 在进行区域传输的时候使用 TCP，普通的查询使用 UDP。为什么查询是使用 UDP 呢？网络上大部分答案都说 UDP 性能更好，打开网页速度快。如果是这样的话，为什么 HTTP 却是使用 TCP 呢？

浏览器响应时间= DNS 域名解析时间+ TCP 连接建立时间 + HTTP 交易时间 采用 TCP 传输，则域名解析时间为：DNS 域名解析时间 = TCP 连接时间 + DNS 交易时间 采用 UDP 传输，则域名解析时间为：DNS 域名解析时间 = DNS 交易时间

总结：

- 使用 UDP 传输是由于效率高，传输小于等于 512 字节报文。
- 使用 TCP 传输是由于可以传输大于 512 字节报文。

### [TCP(传输控制协议)](https://zh.wikipedia.org/wiki/TCP)

传输控制协议（英语：Transmission Control Protocol，缩写：TCP）是一种面向连接的、可靠的、基于字节流的传输层通信协议，由 IETF 的 RFC 793 定义。在简化的计算机网络 OSI 模型中，它完成第四层传输层所指定的功能。用户数据报协议（UDP）是同一层内另一个重要的传输协议。

在因特网协议族（Internet protocol suite）中，TCP 层是位于 IP 层之上，应用层之下的中间层。不同主机的应用层之间经常需要可靠的、像管道一样的连接，但是 IP 层不提供这样的流机制，而是提供不可靠的包交换。

应用层向 TCP 层发送用于网间传输的、用 8 位字节表示的数据流，然后 TCP 把数据流分割成适当长度的报文段（通常受该计算机连接的网络的数据链路层的最大传输单元（MTU）的限制）。之后 TCP 把结果包传给 IP 层，由它来透过网络将包传送给接收端实体的 TCP 层。TCP 为了保证不发生丢包，就给每个包一个序号，同时序号也保证了传送到接收端实体的包的按序接收。然后接收端实体对已成功收到的包发回一个相应的确认信息（ACK）；如果发送端实体在合理的往返时延（RTT）内未收到确认，那么对应的数据包就被假设为已丢失并进行重传。TCP 用一个校验和函数来检验数据是否有错误，在发送和接收时都要计算校验和。

## [UDP(用户数据报协议)](https://zh.wikipedia.org/wiki/UDP)

用户资料包协议（英语：User Datagram Protocol，缩写：UDP；又称用户资料包协议）是一个简单的面向资料包的通信协议，位于 OSI 模型的传输层。该协议由 David P. Reed 在 1980 年设计且在 RFC 768 中被规范。典型网络上的众多使用 UDP 协议的关键应用在一定程度上是相似的。

在 TCP/IP 模型中，UDP 为网络层以上和应用层以下提供了一个简单的接口。UDP 只提供资料的不可靠传递，它一旦把应用程序发给网络层的资料发送出去，就不保留资料备份（所以 UDP 有时候也被认为是不可靠的资料包协议）。UDP 在 IP 资料包的头部仅仅加入了复用和资料校验字段。

UDP 适用于不需要或在程序中执行错误检查和纠正的应用，它避免了协议栈中此类处理的开销。对时间有较高要求的应用程序通常使用 UDP，因为丢弃资料包比等待或重传导致延迟更可取。

## [DNS(域名系统)](https://zh.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F)

域名系统（英语：Domain Name System，缩写：DNS）是互联网的一项服务。它作为将域名和 IP 地址相互映射的一个分布式数据库，能够使人更方便地访问互联网。DNS 使用 TCP 和 UDP 端口 53[1]。当前，对于每一级域名长度的限制是 63 个字符，域名总长度则不能超过 253 个字符。

开始时，域名的字符仅限于 ASCII 字符的一个子集。2008 年，ICANN 通过一项决议，允许使用其它语言作为互联网顶级域名的字符。使用基于 Punycode 码的 IDNA 系统，可以将 Unicode 字符串映射为有效的 DNS 字符集。因此，诸如“XXX.中国”、“XXX.台湾”的域名可以在地址栏直接输入并访问，而不需要安装插件。但是，由于英语的广泛使用，使用其他语言字符作为域名会产生多种问题，例如难以输入、难以在国际推广等。

## [TLS/SSL](https://zh.wikipedia.org/wiki/%E5%82%B3%E8%BC%B8%E5%B1%A4%E5%AE%89%E5%85%A8%E6%80%A7%E5%8D%94%E5%AE%9A)

传输层安全性协议（英语：Transport Layer Security，缩写：TLS）及其前身安全套接层（英语：Secure Sockets Layer，缩写：SSL）是一种安全协议，目的是为互联网通信提供安全及数据完整性保障。网景公司（Netscape）在 1994 年推出首版网页浏览器－网景导航者时，推出 HTTPS 协议，以 SSL 进行加密，这是 SSL 的起源。IETF 将 SSL 进行标准化，1999 年公布 TLS 1.0 标准文件（RFC 2246）。随后又公布 TLS 1.1（RFC 4346，2006 年）、TLS 1.2（RFC 5246，2008 年）和 TLS 1.3（RFC 8446，2018 年）。在浏览器、电子邮件、即时通信、VoIP、网络传真等应用程序中，广泛使用这个协议。许多网站，如 Google、Facebook、Wikipedia 等也以这个协议来创建安全连线，发送资料。目前已成为互联网上保密通信的工业标准。

SSL 包含记录层（Record Layer）和传输层，记录层协议确定传输层数据的封装格式。传输层安全协议使用 X.509 认证，之后利用非对称加密演算来对通信方做身份认证，之后交换对称密钥作为会谈密钥（Session key）。这个会谈密钥是用来将通信两方交换的资料做加密，保证两个应用间通信的保密性和可靠性，使客户与服务器应用之间的通信不被攻击者窃听。

## [URI(统一资源标志符)](https://zh.wikipedia.org/wiki/%E7%BB%9F%E4%B8%80%E8%B5%84%E6%BA%90%E6%A0%87%E5%BF%97%E7%AC%A6)

统一资源标志符（英语：Uniform Resource Identifier，缩写：URI）在电脑术语中是用于标志某一互联网资源名称的字符串。 该种标志允许用户对网络中（一般指万维网）的资源通过特定的协议进行交互操作。URI 的最常见的形式是统一资源定位符（URL），经常指定为非正式的网址。更罕见的用法是统一资源名称（URN），其目的是通过提供一种途径。用于在特定的名字空间资源的标志，以补充网址。

## [gRPC](https://zh.wikipedia.org/wiki/GRPC)

gRPC (gRPC Remote Procedure Calls) 是 Google 发起的一个开源远程过程调用 (Remote procedure call) 系统。该系统基于 HTTP/2 协议传输，使用 Protocol Buffers 作为接口描述语言。[2]

其他功能：

- 认证（ authentication）
- 双向流（bidirectional streaming）
- 流控制（flow control）
- 超时（timeouts）

最常见的应用场景是：

- 微服务框架下，多种语言服务之间的高效交互。
- 将手机服务、浏览器连接至后台
- 产生高效的客户端库

## Wget

GNU Wget（常简称为 Wget）是一个在网络上进行下载的简单而强大的自由软件，其本身也是 GNU 计划的一部分。它的名字是“World Wide Web”和“Get”的结合，同时也隐含了软件的主要功能。目前它支持通过 HTTP、HTTPS，以及 FTP 这三个最常见的 TCP/IP 协议协议下载。

## cURL

cURL 是一个开源项目，主要的产品是 curl（命令行工具）和 libcurl（C 语言的 API 库），两者功能均是：基于网络协议，对指定 URL 进行网络传输。[3][4]

cURL 涉及是任何网络协议传输，不涉及对具体数据的具体处理。（如：html 的渲染等）

## ping

ping（呯）是一种计算机网络工具，用来测试数据包能否透过 IP 协议到达特定主机。ping 的运作原理是向目标主机传出一个 ICMP 的请求回显数据包，并等待接收回显回应数据包。程序会按时间和成功响应的次数估算丢失数据包率（丢包率）和数据包往返时间（网络时延，Round-trip delay time）。

在 1983 年 12 月，Mike Muuss 编写了首个这样的程序，用于在 IP 网络出现问题时方便探查其根源。因为这个程序的运作原理与潜水艇的主动声纳相似，他便用声纳的声音来为程序取名。David L. Mills 曾提出另一个取名：Packet Internet Grouper/Gopher（后者指地鼠）。

网络管理员之间也常将 ping 用作动词，如“ping 一下计算机 XXX，看它是否开着。”

## [HTTP 压缩](https://zh.wikipedia.org/wiki/HTTP%E5%8E%8B%E7%BC%A9)

HTTP 压缩是一种内置到网页服务器和网页客户端中以改进传输速度和带宽利用率的方式。[1]

HTTP 数据在从服务器发送前就已压缩：兼容的浏览器将在下载所需的格式前宣告支持何种方法给服务器；不支持压缩方法的浏览器将下载未经压缩的数据。最常见的压缩方案包括 brotil、gzip 和 Deflate，但可用方案的完整列表由 IANA 维护。[2]此外，第三方可能开发新的方法并纳入到其自身的产品，例如 Google 的面向 HTTP 共享字典压缩（SDCH）方案就实现在 Google Chrome 浏览器和使用在 Google 的服务器上。

在 HTTP 中有两种不同的方式可以完成压缩。在较低层级，Transfer-Encoding 头可以指示 HTTP 消息的有效载荷被压缩。在较高层级，Content-Encoding 头可以指示一个被转码、缓存或引用的资源已压缩。使用 Content-Encoding 的压缩比 Transfer-Encoding 有更广泛的支持，并且某些浏览器不宣告 Transfer-Encoding 压缩以避免触发服务器的缺陷。[3]

## [gzip](https://zh.wikipedia.org/wiki/Gzip)

Gzip 是一种压缩文件格式并且也是一个在类 Unix 上的一种文件解压缩的软件，通常指 GNU 计划的实现，此处的 gzip 代表 GNU zip。也经常用来表示 gzip 这种文件格式。软件的作者是 Jean-loup Gailly 和 Mark Adler。在 1992 年 10 月 31 日第一次公开发布，版本号 0.1，1993 年 2 月，发布了 1.0 版本。

OpenBSD 中所包含的 gzip 版本实际上是 compress 程序，其对 gzip 文件的支持在 OpenBSD 3.4 中被添加，此处的 g 代表免费（gratis）[1]。

## [Secure Shell](https://zh.wikipedia.org/wiki/Secure_Shell)

Secure Shell（安全外壳协议，简称 SSH）是一种加密的网络传输协议，可在不安全的网络中为网络服务提供安全的传输环境[1]。SSH 通过在网络中创建安全隧道来实现 SSH 客户端与服务器之间的连接[2]。SSH 最常见的用途是远程登录系统，人们通常利用 SSH 来传输命令行界面和远程执行命令。SSH 使用频率最高的场合是类 Unix 系统，但是 Windows 操作系统也能有限度地使用 SSH。2015 年，微软宣布将在未来的操作系统中提供原生 SSH 协议支持[3]，Windows 10 1803 版本已提供 OpenSSH 工具[4]。

在设计上，SSH 是 Telnet 和非安全 shell 的替代品。Telnet 和 Berkeley rlogin、rsh、rexec 等协议采用明文传输，使用不可靠的密码，容易遭到监听、嗅探和中间人攻击[5]。SSH 旨在保证非安全网络环境（例如互联网）中信息加密完整可靠。

不过，SSH 也被指出有被嗅探甚至解密的漏洞。早在 2011 年，中国的互联网审查机构已经有能力针对 SSH 连线的刺探及干扰。[6][7]而后爱德华·斯诺登泄露的文件也指出，美国国家安全局有时能够把 SSH 协议传输的信息解密出来，从而读出 SSH 会话的传输内容[8]。2017 年 7 月 6 日，非营利组织维基解密确认美国中央情报局已经开发出能够在 Windows 或 Linux 操作系统中窃取 SSH 会话的工具。[9]

## [FTP(文件传输协议)](https://zh.wikipedia.org/wiki/%E6%96%87%E4%BB%B6%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE)

文件传输协议（英语：File Transfer Protocol，缩写：FTP）是一个用于在计算机网络上在客户端和服务器之间进行文件传输的应用层协议。文件传送（file transfer）和文件访问（file access）之间的区别在于：前者由 FTP 提供，后者由如 NFS 等应用系统提供[1]。RFC 959 定义了此规范。

FTP 是一个 8 位的客户端-服务器协议，能操作任何类型的文件而不需要进一步处理，就像 MIME 或 Unicode 一样。但是，FTP 有着极高的延时，这意味着，从开始请求到第一次接收需求数据之间的时间，会非常长；并且不时的必须执行一些冗长的登录进程。

# 前端

## [CommonJS](https://zh.wikipedia.org/wiki/CommonJS)

CommonJS 是一个项目，其目标是为 JavaScript 在网页浏览器之外创建模块约定。创建这个项目的主要原因是当时缺乏普遍可接受形式的 JavaScript 脚本模块单元，模块在与运行 JavaScript 脚本的常规网页浏览器所提供的不同的环境下可以重复使用。

## [ECMAScript](https://zh.wikipedia.org/wiki/ECMAScript)

ECMAScript 是一种由 Ecma 国际（前身为欧洲计算机制造商协会）在标准 ECMA-262 中定义的脚本语言规范。这种语言在万维网上应用广泛，它往往被称为 JavaScript 或 JScript，但实际上后两者是 ECMA-262 标准的实现和扩展。

## [Ecma 国际](https://zh.wikipedia.org/wiki/Ecma%E5%9B%BD%E9%99%85)

Ecma 国际（英语：Ecma International）是一家国际性会员制度的信息和电信标准组织。1994 年之前，名为欧洲计算机制造商协会（European Computer Manufacturers Association）。因为计算机的国际化，组织的标准牵涉到很多其他国家，因此组织决定改名表明其国际性。现名称已不属于首字母缩略字。

组织在 1961 年的日内瓦创建为了标准化欧洲的计算机系统。在欧洲制造、销售或开发计算机和电信系统的公司都可以申请成为会员。

## [W3C(万维网联盟)](https://zh.wikipedia.org/wiki/%E4%B8%87%E7%BB%B4%E7%BD%91%E8%81%94%E7%9B%9F)

万维网联盟（英语：World Wide Web Consortium，縮寫 W3C），又称 W3C 理事会，是万维网的主要国际标准组织[2]，为半自治非政府组织（quasi-autonomous nongovernmental organization）。

## [TC39](https://tc39.es/)

所属 Ecma International 的 TC39 是一个由 JavaScript 开发者、实现者、学者等组成的团体，与 JavaScript 社区合作维护和发展 JavaScript 的标准。

我们在 GitHub 上开发 JavaScript（正式名称为 ECMAScript）规范，每两个月开会讨论一次提案。要了解更多关于这个过程的信息，请查看新语言功能提案的五个阶段。请参阅我们的会议议程和会议记录，了解更多信息。

## [Cookie](https://zh.wikipedia.org/wiki/Cookie)

Cookies（复数形态：Cookies），又称“小甜饼”。类型为“小型文本文件”[1]，指某些网站为了辨别用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）。由网景公司的前雇员卢·蒙特利在 1993 年 3 月发明[2]。最初定义于 RFC 2109，历经 RFC 2965，至现在的 RFC 6265。目前使用最广泛的 Cookie 标准却不是 RFC 中定义的任何一个，而是在网景公司制定的标准上进行扩展后的产物。

## **对谈(Session)**

在[电脑科学](https://zh.wikipedia.org/wiki/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6)领域来说，尤其是在[网路](https://zh.wikipedia.org/wiki/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C)领域，**对谈**（**session**，Microsoft Windows 中文版译作**工作阶段**、**连线阶段**）是一种持久网路协定，在使用者（或使用者代理）端和伺服器端之间建立关联，从而起到交换封包的作用机制，session 在[网路协定](https://zh.wikipedia.org/wiki/%E7%BD%91%E7%BB%9C%E5%8D%8F%E8%AE%AE)（例如[telnet](https://zh.wikipedia.org/wiki/Telnet)或[FTP](https://zh.wikipedia.org/wiki/FTP)）中是非常重要的部分。

在不包含[会话层](https://zh.wikipedia.org/wiki/%E4%BC%9A%E8%AF%9D%E5%B1%82)（例如[UDP](https://zh.wikipedia.org/wiki/%E7%94%A8%E6%88%B7%E6%95%B0%E6%8D%AE%E6%8A%A5%E5%8D%8F%E8%AE%AE)）或者是无法长时间驻留[会话层](https://zh.wikipedia.org/wiki/%E4%BC%9A%E8%AF%9D%E5%B1%82)（例如[HTTP](https://zh.wikipedia.org/wiki/HTTP)）的传输协定中，会话的维持需要依靠在传输资料中的进阶别程式。例如，在浏览器和远端主机之间的 HTTP 传输中，HTTP cookie 就会被用来包含一些相关的资讯，例如 session ID，参数和权限资讯等。

## [CORS(跨域资源共享)](https://zh.wikipedia.org/wiki/%E8%B7%A8%E4%BE%86%E6%BA%90%E8%B3%87%E6%BA%90%E5%85%B1%E4%BA%AB)

跨域资源共享（英语：Cross-origin resource sharing，缩写：CORS），用于让网页的受限资源能够被其他域名的页面访问的一种机制。[1]

通过该机制，页面能够自由地使用不同源（英语：cross-origin）的图片、样式、脚本、iframes 以及视频。[2]一些跨域的请求（特别是 Ajax）常常会被同源策略（英语：Same-origin policy）所禁止的。跨源资源共享定义了一种方式，为的是浏览器和服务器之间能互相确认是否足够安全以至于能使用跨源请求（英语：cross-origin requests）。[3]比起纯粹的同源请求，这将更为自由和功能性的（functionality），但比纯粹的跨源请求更为安全。

跨域资源共享是一份浏览器技术的规范，提供了 Web 服务从不同网域传来沙盒脚本的方法，以避开浏览器的同源策略[4]。

## [JSONP](https://zh.wikipedia.org/wiki/JSONP)

JSONP（JSON with Padding）是资料格式 JSON 的一种“使用模式”，可以让网页从别的网域获取资料。另一个解决这个问题的新方法是跨来源资源共享。

由于同源策略，一般来说位于 server1.example.com 的网页无法与 server2.example.com 的服务器沟通，而 HTML 的 `<script>`元素是一个例外。利用 `<script>`元素的这个开放策略，网页可以得到从其他来源动态产生的 JSON 资料，而这种使用模式就是所谓的 JSONP。用 JSONP 抓到的资料并不是 JSON，而是任意的 JavaScript，用 JavaScript 解释器执行而不是用 JSON 解析器解析。

## [同源策略](https://zh.wikipedia.org/wiki/%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5)

同源策略是指在 Web 浏览器中，允许某个网页脚本访问另一个网页的数据，但前提是这两个网页必须有相同的 URI、主机名和端口号，一旦两个网站满足上述条件，这两个网站就被认定为具有相同来源。此策略可防止某个网页上的恶意脚本通过该页面的文档对象模型访问另一网页上的敏感数据。 同源策略对 Web 应用程序具有特殊意义，因为 Web 应用程序广泛依赖于 HTTP cookie[1]来维持用户会话，所以必须将不相关网站严格分隔，以防止丢失数据泄露。

值得注意的是同源策略仅适用于脚本，这意味着某网站可以通过相应的 HTML 标签[2]访问不同来源网站上的图像、CSS 和动态加载脚本等资源。而跨站请求伪造就是利用同源策略不适用于 HTML 标签的缺陷。

## [XML](https://zh.wikipedia.org/wiki/XML)

可扩展标记语言（英语：Extensible Markup Language，简称：XML）是一种标记语言。XML 是从标准通用标记语言（SGML）中简化修改出来的。它主要用到的有可扩展标记语言、可扩展样式语言（XSL）、XBRL 和 XPath 等。

## SSG(static site generator)

[https://www.cloudflare.com/zh-cn/learning/performance/static-site-generator/](https://www.cloudflare.com/zh-cn/learning/performance/static-site-generator/)

### **什么是静态网站生成器？**

静态网站生成器是一种基于原始数据和一组模板生成完整静态 HTML 网站的工具。从本质上讲，静态站点生成器自动完成对单个 HTML 页面进行编码的任务，并让这些页面提前准备好为用户提供服务。因为这些 HTML 页面是预先构建的，所以它们可以在用户的浏览器中非常快速地加载。

静态网站生成器是内容管理系统 (CMS) 的替代品，后者是另一种用于管理 Web 内容、生成网页和实施模板的工具。（模板是 Web 内容的可重用格式；开发人员使用模板来避免一遍又一遍地编写相同的格式。）静态站点生成器通常是  [JAMstack](https://www.cloudflare.com/learning/performance/what-is-jamstack/) Web 开发方法的一部分。

### **什么是静态网站？**

静态网站由一个或多个 HTML 网页组成，这些网页每次都以相同的方式加载。静态网站与动态网站形成对比，动态网站根据一些不断变化的数据输入（例如用户的位置、一天中的时间或用户操作）进行不同的加载。静态网页是可以快速加载的简单 HTML 文件，而动态网页需要在浏览器中执行 JavaScript 代码才能呈现。

### **静态网站生成器和 CMS 之间有什么区别？**

在互联网的早期，网站被存储为静态 HTML 站点，所有网页都预先布局和硬编码。这是低效的，因为它需要开发人员手动编码每个网页。

内容管理系统 (CMS) 的出现让开发人员能够避免所有这些手动设置。内容存储在 CMS 数据库中，而不是提前对页面进行编码，当用户请求页面时，服务器会执行以下操作：

1. 查询数据库，寻找正确的内容
2. 识别该内容将适合的模板
3. 生成页面
4. 向用户提供页面

CMS 中的内容必须适合 CMS 数据库提供的字段之一，但只要符合要求，它就应该每次都出现在网站上的适当位置。

静态站点生成器是这两种方法的折衷方案。与 CMS 一样，它允许开发人员使用模板并自动生成网页——但它会提前完成后者，而不是响应用户的请求。这可以提高[网站性能](https://www.cloudflare.com/learning/performance/why-site-speed-matters/)，因为网页可以立即交付给最终用户。它还为开发人员提供了更大的定制能力，因为他们不受 CMS 提供的数据库字段的限制。

## SSR(serve side render)

**SSR 服务器端渲染**（英语：server side render）指一般情况下，一个[web 页面](https://zh.wikipedia.org/w/index.php?title=Web%E9%A1%B5%E9%9D%A2&action=edit&redlink=1)的数据彩现完全由[客户端](https://zh.wikipedia.org/wiki/%E5%AE%A2%E6%88%B7%E7%AB%AF)或者[浏览器](https://zh.wikipedia.org/wiki/%E6%B5%8F%E8%A7%88%E5%99%A8)端来完成。先从服务器请求，然后到页面；再通过[AJAX](https://zh.wikipedia.org/wiki/AJAX)请求到页面数据并把相应的数据填充到[模板](https://zh.wikipedia.org/wiki/%E6%A8%A1%E6%9D%BF)，形成完整的页面来呈现给用户。服务器端彩现把数据的初始请求放在了服务器端，服务器端收到请求后，把数据填充到模板形成完整的页面，由服务器端把彩现的完整的页面返回给客户端。这样减少了一次客户端到服务器端的[HTTP](https://zh.wikipedia.org/wiki/HTTP)请求，加快了相应速度，一般用于效能最佳化。[[1]](https://zh.wikipedia.org/zh-hk/%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%B8%B2%E6%9F%93#cite_note-1)

# 其他

## [JSON](https://zh.wikipedia.org/wiki/JSON)

JSON（JavaScript Object Notation, /ˈdʒeɪsən/）是由道格拉斯·克罗克福特构想和设计的一种轻量级资料交换格式。其内容由属性和值所组成，因此也有易于阅读和处理的优势。JSON 是独立于编程语言的资料格式，其不仅是 JavaScript 的子集，也采用了 C 语言家族的习惯用法，目前也有许多编程语言都能够将其解析和字符串化，其广泛使用的程度也使其成为通用的资料格式。

## [Homebrew](https://zh.wikipedia.org/wiki/Homebrew)

Homebrew 是一款自由及开放源代码的软件包管理系统，用以简化 macOS 系统上的软件安装过程，最初由马克斯·霍威尔（Max Howell）写成。因其可扩展性得到了一致好评，而在 Ruby on Rails 社区广为人知。

Homebrew 使用 GitHub，通过用户的贡献扩大对软件包的支持。2012 年，Homebrew 是 GitHub 上拥有最多新贡献者的项目。2013 年，Homebrew 同时成为 GitHub 上最多贡献者及最多已关闭问题的项目。

## [WebP](https://zh.wikipedia.org/wiki/WebP)

WebP（发音：weppy[6][7]）是一种同时提供了有损压缩与无损压缩（可逆压缩）的图片文件格式[8]。

WebP 最初在 2010 年 9 月发布，其支持库于 2018 年 4 月发布 1.0 版本。截至 2021 年 5 月，已有 94%的浏览器支持此格式[9]。

WebP 的设计目标是在减少文件大小的同时，达到和 JPEG、PNG、GIF 格式相同的图片质量，并希望借此能够减少图片档在网络上的发送时间。[10]根据 Google 较早的测试，WebP 的无损压缩比网络上找到的 PNG 档少了 45％的文件大小，即使这些 PNG 档在使用 pngcrush 和 PNGOUT 处理过，WebP 还是可以减少 28％的文件大小[11]。

WebP 支持的像素最大数量是 16383x16383。有损压缩的 WebP 仅支持 8-bit 的 YUV 4:2:0 格式。而无损压缩（可逆压缩）的 WebP 支持 VP8L 编码与 8-bit 之 ARGB 色彩空间。又无论是有损或无损压缩皆支持 Alpha 透明通道、ICC 色彩配置、XMP 诠释资料。

WebP 有静态与动态两种模式。动态 WebP（Animated WebP）支持有损与无损压缩、ICC 色彩配置、XMP 诠释资料、Alpha 透明通道。

## [PNG](https://zh.wikipedia.org/wiki/PNG)

便携式网络图形（英语：Portable Network Graphics，PNG）是一种支持无损压缩的位图图形格式，支持索引、灰度、RGB 三种颜色方案以及 Alpha 通道等特性。PNG 的开发目标是改善并取代 GIF 作为适合网络传输的格式而不需专利许可，所以被广泛应用于互联网及其他方面上。

PNG 另一个非正式的名称来源为递归缩写：“PNG is Not GIF”。PNG 的官方念法是“平”（/pɪŋ/），[1]但是多数人是当成三个英文字母分开读。[2]

PNG 图片大多数都使用 PNG 作为扩展名，其互联网媒体类型为 image/png。[3]PNG 于 1997 年 3 月作为知识性 RFC 2083 发布，于 2004 年作为 ISO/IEC 标准发布。

## [GIF](https://zh.wikipedia.org/wiki/GIF)

图像互换格式（英语：Graphics Interchange Format，简称 GIF）是一种位图图形文件格式，以 8 位色（即 256 种颜色）重现真彩色的图像。它实际上是一种压缩文档，采用 LZW 压缩算法进行编码，有效地减少了图像文件在网络上传输的时间。它是目前万维网广泛应用的网络传输图像格式之一。

## [JPEG](https://zh.wikipedia.org/wiki/JPEG)

JPEG 或称 JPG，是一种针对照片影像而广泛使用的有损压缩标准方法，由联合图像专家小组（英语：Joint Photographic Experts Group）开发。此团队创立于 1986 年，1992 年发布了 JPEG 的标准而在 1994 年获得了 ISO 10918-1 的认定。JPEG 与视频音频压缩标准的 MPEG（Moving Picture Experts Group）很容易混淆，但两者是不同的组织及标准。

JPEG 本身只有描述如何将一个影像转换为字节的数据流（streaming），但并没有说明这些字节如何在任何特定的存储媒体上被封存起来。JPEG 的压缩方式通常是有损压缩，即在压缩过程中图像的质量会遭受到可见的破坏，有一种以 JPEG 为基础的标准 Lossless JPEG 是采用无损的压缩方式，但 Lossless JPEG 并没有受到广泛的支持。

一个由 C-Cube Microsystems 等公司所创建的额外标准，称为 JFIF（JPEG File Interchange Format，JPEG 文件交换格式，联合图像专家小组文件交换格式）详细说明如何从一个 JPEG 流，产出一个适合于电脑存储和传输（像是在互联网上）的文件。在普遍的用法，当有人称呼一个“JPEG 文件”，一般而言他是意指一个 JFIF 文件，或有时候是一个 Exif JPEG 文件。然而，也有其他以 JPEG 为基础的文件格式，像是 JNG。

使用 JPEG 格式压缩的图片文件一般也被称为 JPEG Files，最普遍被使用的扩展名格式为.jpg，其他常用的扩展名还包括.JPEG、.jpe、.jfif 以及.jif。JPEG 格式的资料也能被嵌进其他类型的文件格式中，像是 TIFF 类型的文件格式。

JPEG/JFIF 是万维网上最普遍的被用来存储和传输照片的格式。它并不适合于线条绘图（drawing）和其他文字或图标（iconic）的图形，因为它的压缩方法用在这些类型的图形上，得到的结果并不好（PNG 和 GIF 通常是用来存储这类的图形；GIF 每个像素只有 8 比特，并不很适合于存储彩色照片，PNG 可以无损地存储照片，但是文件太大的缺点让它不太适合在网络上传输）。

对于 JFIF 的 MIME 媒体类型是 image/JPEG（定义于 RFC 1341）。

## [Base64](https://zh.wikipedia.org/wiki/Base64)

Base64（基底 64）是一种基于 64 个可打印字符来表示二进制数据的表示方法。每 6 个比特为一个单元，对应某个可打印字符。3 个字节相当于 24 个比特，对应于 4 个 Base64 单元，即 3 个字节可由 4 个可打印字符来表示。在 Base64 中的可打印字符包括字母 A-Z、a-z、数字 0-9，这样共有 62 个字符，此外两个可打印符号在不同的系统中而不同。一些如 uuencode 的其他编码方法，和之后 BinHex 的版本使用不同的 64 字符集来代表 6 个二进制数字，但是不被称为 Base64。 Base64 常用于在通常处理文本数据的场合，表示、传输、存储一些二进制数据，包括 MIME 的电子邮件及 XML 的一些复杂数据。

## [JIT(即时编译)](https://zh.wikipedia.org/wiki/%E5%8D%B3%E6%99%82%E7%B7%A8%E8%AD%AF)

在计算机技术中，即时编译（英语：just-in-time compilation，缩写为 JIT；又译及时编译[1]、实时编译[2]），也称为动态翻译或运行时编译[3]，是一种执行计算机代码的方法，这种方法涉及在程序执行过程中（在执行期）而不是在执行之前进行编译。[4]通常，这包括源代码或更常见的字节码到机器码的转换，然后直接执行。实现 JIT 编译器的系统通常会不断地分析正在执行的代码，并确定代码的某些部分，在这些部分中，编译或重新编译所获得的加速将超过编译该代码的开销。

JIT 编译是两种传统的机器代码翻译方法——提前编译（AOT）和解释——的结合，它结合了两者的优点和缺点。[4]大致来说，JIT 编译将编译代码的速度与解释的灵活性、解释器的开销以及额外的编译开销（而不仅仅是解释）结合起来。JIT 编译是动态编译的一种形式，允许自适应优化，比如动态重编译和特定于微架构的加速[nb 1][5]——因此，在理论上，JIT 编译比静态编译能够产生更快的执行速度。解释和 JIT 编译特别适合于动态编程语言，因为运行时系统可以处理后期绑定的数据类型并实施安全保证。

## [Unicode](https://zh.wikipedia.org/wiki/Unicode)

Unicode，联盟官方中文名称为统一码[1]，是计算机科学领域的业界标准。它整理、编码了世界上大部分的文字系统，使得电脑可以用更为简单的方式来呈现和处理文字。

Unicode 伴随着通用字符集的标准而发展，同时也以书本的形式[2]对外发表。Unicode 至今仍在不断增修，每个新版本都加入更多新的字符。目前最新的版本为 2021 年 9 月公布的 14.0.0[3]，已经收录超过 14 万个字符（第十万个字符在 2005 年获采纳）。Unicode 除了视觉上的字形、编码方法、标准的字符编码资料外，还包含了字符特性（如大小写字母）、书写方向、拆分标准等特性的资料库。

Unicode 的发展由非营利机构统一码联盟负责，该机构致力于让 Unicode 方案取代既有的字符编码方案。因为既有的方案往往空间非常有限，亦不适用于多语环境。

Unicode 备受认可，并广泛地应用于电脑软件的国际化与本地化过程。有很多新科技，如可扩展置标语言（Extensible Markup Language，简称：XML）、Java 编程语言以及现代的操作系统，都采用 Unicode 编码。Unicode 也被 ISO 作为国际标准采纳于通用字符集，即 ISO/IEC 10646，且 Unicode 兼容 ISO/IEC 10646 且完整对应各个版本标准。[4][5]

## [UTF-8](https://zh.wikipedia.org/wiki/UTF-8)

UTF-8（8-bit Unicode Transformation Format）是一种针对 Unicode 的可变长度字符编码，也是一种前缀码。它可以用一至四个字节对 Unicode 字符集中的所有有效编码点进行编码，属于 Unicode 标准的一部分，最初由肯·汤普逊和罗布·派克提出。[2][3]由于较小值的编码点一般使用频率较高，直接使用 Unicode 编码效率低下，大量浪费内存空间。UTF-8 就是为了解决向后兼容 ASCII 码而设计，Unicode 中前 128 个字符，使用与 ASCII 码相同的二进制值的单个字节进行编码，而且字面与 ASCII 码的字面一一对应，这使得原来处理 ASCII 字符的软件无须或只须做少部分修改，即可继续使用。因此，它逐渐成为电子邮件、网页及其他存储或发送文字优先采用的编码方式。

自 2009 年以来，UTF-8 一直是万维网的最主要的编码形式（对所有，而不仅是 Unicode 范围内的编码）（并由 WHATWG 宣布为强制性的“适用于所有事物(for all things)”，[4]截止到 2019 年 11 月， 在所有网页中，UTF-8 编码应用率高达 94.3%（其中一些仅是 ASCII 编码，因为它是 UTF-8 的子集），而在排名最高的 1000 个网页中占 96％。[5] 第二热门的多字节编码方式 Shift JIS 和 GB 2312 分别具有 0.3％和 0.2％的占有率。[6][7][1]Internet 邮件联盟（ Internet Mail Consortium, IMC）建议所有电子邮件程序都能够使用 UTF-8 展示和创建邮件，[8] W3C 建议 UTF-8 作为 XML 文件和 HTML 文件的默认编码方式。[9]互联网工程工作小组（IETF）要求所有互联网协议都必须支持 UTF-8 编码[10]。互联网邮件联盟（IMC）建议所有电子邮件软件都支持 UTF-8 编码。[11]

## [ASCII](https://zh.wikipedia.org/wiki/ASCII)

ASCII（发音： /ˈæski/ ASS-kee[1]，American Standard Code for Information Interchange，美国信息交换标准代码）是基于拉丁字母的一套电脑编码系统。它主要用于显示现代英语，而其扩展版本延伸美国标准信息交换码则可以部分支持其他西欧语言，并等同于国际标准 ISO/IEC 646。

1968 年版 ASCII 编码速见表 美国信息交换标准代码是这套编码系统的传统命名，互联网号码分配局现在更倾向于使用它的新名字 US-ASCII[2]。

美国信息交换标准代码是美国电气和电子工程师协会里程碑之一。

ASCII 由电报码发展而来。第一版标准发布于 1963 年[3][4]，1967 年经历了一次主要修订[5][6]，最后一次更新则是在 1986 年，至今为止共定义了 128 个字符；其中 33 个字符无法显示（一些终端提供了扩展，使得这些字符可显示为诸如笑脸、扑克牌花式等 8-bit 符号），且这 33 个字符多数都已是陈废的控制字符。控制字符的用途主要是用来操控已经处理过的文字。在 33 个字符之外的是 95 个可显示的字符。用键盘敲下空白键所产生的空白字符也算 1 个可显示字符（显示为空白）。

ASCII 的局限在于只能显示 26 个基本拉丁字母、阿拉伯数字和英式标点符号，因此只能用于显示现代美国英语（且处理 naïve、café、élite 等外来语时，必须去除附加符号）。虽然 EASCII 解决了部分西欧语言的显示问题，但对更多其他语言依然无能为力。因此，现在的软件系统大多采用 Unicode，特别是与 ASCII 向下兼容的 UTF-8。

## [拒绝服务攻击(Dos)](https://zh.wikipedia.org/wiki/%E9%98%BB%E6%96%B7%E6%9C%8D%E5%8B%99%E6%94%BB%E6%93%8A)

拒绝服务攻击（英语：denial-of-service attack，简称 DoS 攻击）亦称洪水攻击，是一种网络攻击手法，其目的在于使目标电脑的网络或系统资源耗尽，使服务暂时中断或停止，导致其正常用户无法访问。

当黑客使用网络上两个或以上被攻陷的电脑作为“僵尸”向特定的目标发动“拒绝服务”式攻击时，称为分布式拒绝服务攻击（distributed denial-of-service attack，简称 DDoS 攻击）。据 2014 年统计，被确认为大规模 DDoS 的攻击>已达平均每小时 28 次。[1]DDoS 发起者一般针对重要服务和知名网站进行攻击，如银行、信用卡支付网关、甚至根域名服务器等。

DoS 也常见于部分网络游戏，被心怀不满的玩家或是竞争对手广泛使用。DoS 也常被用于抗议，自由软件基金会创办人理查德·斯托曼曾表示，DoS 是“网络街头抗议”的一种形式。[2]

## [Docker](https://zh.wikipedia.org/wiki/Docker)

Docker 是一个开放源代码软件，是一个开放平台，用于开发应用、交付（shipping）应用、运行应用。 Docker 允许用户将基础设施（Infrastructure）中的应用单独分割出来，形成更小的颗粒（容器），从而提高交付软件的速度。[1]

Docker 容器与虚拟机类似，但二者在原理上不同。容器是将操作系统层虚拟化，虚拟机则是虚拟化硬件，因此容器更具有便携性、高效地利用服务器。 容器更多的用于表示 软件的一个标准化单元。由于容器的标准化，因此它可以无视基础设施（Infrastructure）的差异，部署到任何一个地方。另外，Docker 也为容器提供更强的业界的隔离兼容。[2]

Docker 利用 Linux 核心中的资源分离机制，例如 cgroups，以及 Linux 核心名字空间（namespaces），来创建独立的容器（containers）。这可以在单一 Linux 实体下运作，避免启动一个虚拟机造成的额外负担[3]。Linux 核心对名字空间的支持完全隔离了工作环境中应用程序的视野，包括行程树、网络、用户 ID 与挂载文件系统，而核心的 cgroup 提供资源隔离，包括 CPU、存储器、block I/O 与网络。从 0.9 版本起，Dockers 在使用抽象虚拟是经由 libvirt 的 LXC 与 systemd - nspawn 提供界面的基础上，开始包括 libcontainer 库做为以自己的方式开始直接使用由 Linux 核心提供的虚拟化的设施，

依据行业分析公司“451 研究”：“Dockers 是有能力打包应用程序及其虚拟容器，可以在任何 Linux 服务器上执行的依赖性工具，这有助于实现灵活性和便携性，应用程序在任何地方都可以执行，无论是公用云端服务器、私有云端服务器、单机等。” [4]

## [Kubernetes(k8s)](https://zh.wikipedia.org/wiki/Kubernetes)

Kubernetes（常简称为 K8s）是用于自动部署、扩展和管理“容器化（containerized）应用程序”的开源系统。[3]该系统由 Google 设计并捐赠给 Cloud Native Computing Foundation（今属 Linux 基金会）来使用。

它旨在提供“跨主机集群的自动部署、扩展以及运行应用程序容器的平台”。[4] 它支持一系列容器工具，包括 Docker 等。

## [对象储存(OSS)](https://zh.wikipedia.org/wiki/%E5%AF%B9%E8%B1%A1%E5%AD%98%E5%82%A8)

对象存储（英语：Object storage）是一种计算机数据存储架构，它将数据作为对象进行管理，与其他存储架构不同（如文件系统将数据作为文件层次结构进行管理，而块存储则将数据作为扇区和轨道内的块进行管理）。[1] 每个对象通常包括数据本身、数量不等的元数据和一个全局唯一的标识符。对象存储可以在多个层面实现，包括设备层面（对象存储设备）、系统层面和接口层面。在每一种情况下，对象存储都试图实现其他存储架构所不具备的能力，如可由应用程序直接编程的接口，可跨越多个物理硬件实例的命名空间，以及数据管理功能，如数据复制和对象级粒度的数据分发。

对象存储系统允许保留大量的非结构化数据。对象存储的用途包括：在 Facebook 上存储照片，在 Spotify 上存储歌曲，或在在线协作服务（如 Dropbox）中存储文件。[2]

## **软件即服务(SaaS)**

**软件即服务**（英语：Software as a Service，缩写：**SaaS**，发音：/sæs/或/sɑs/ [[1]](https://zh.wikipedia.org/zh-hk/%E8%BD%AF%E4%BB%B6%E5%8D%B3%E6%9C%8D%E5%8A%A1#cite_note-1)），亦可称为「按需即用软件」（即「一经要求，即可使用」）[[2]](https://zh.wikipedia.org/zh-hk/%E8%BD%AF%E4%BB%B6%E5%8D%B3%E6%9C%8D%E5%8A%A1#cite_note-ITChannelGlossary-2)，它是一种[软件](https://zh.wikipedia.org/wiki/%E8%BD%AF%E4%BB%B6)交付模式[[3]](https://zh.wikipedia.org/zh-hk/%E8%BD%AF%E4%BB%B6%E5%8D%B3%E6%9C%8D%E5%8A%A1#cite_note-3)。在这种交付模式中，软件仅需通过网络，不须经过传统的安装步骤即可使用，软件及其相关的[数据](https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE)集中[寄存](https://zh.wikipedia.org/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E6%89%98%E7%AE%A1%E6%9C%8D%E5%8A%A1)于[云端](https://zh.wikipedia.org/wiki/%E4%BA%91%E8%AE%A1%E7%AE%97)服务。用户通常使用[精简客户端](https://zh.wikipedia.org/wiki/%E7%B2%BE%E7%B0%A1%E5%AE%A2%E6%88%B6%E7%AB%AF)，一般即经由[网页浏览器](https://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E6%B5%8F%E8%A7%88%E5%99%A8)来存取、存取软件即服务。SaaS 最大的特色在于软件本身并没有被下载到用户的硬碟，而是储存在提供商的云端或者伺服器。相较于传统软件需要花钱购买和下载，软件即服务只需要用户租用软件，线上使用，不但大大减少了用户购买风险, 也无需下载软件本身，无装置要求的限制[[4]](https://zh.wikipedia.org/zh-hk/%E8%BD%AF%E4%BB%B6%E5%8D%B3%E6%9C%8D%E5%8A%A1#cite_note-4)。

对于许多商业应用来说，软件即服务已经成为一种常见的交付模式。这些商业应用包括[会计系统][https://zh.wikipedia.org/wiki/%e4%bc%9a%e8%ae%a1%e7%b3%bb%e7%bb%9f]([2)](https://zh.wikipedia.org/zh-hk/%E8%BD%AF%E4%BB%B6%E5%8D%B3%E6%9C%8D%E5%8A%A1#cite_note-ITChannelGlossary-2)、[协同软件](https://zh.wikipedia.org/wiki/%E7%BE%A4%E4%BB%B6)、[客户关系管理](https://zh.wikipedia.org/wiki/%E5%AE%A2%E6%88%B7%E5%85%B3%E7%B3%BB%E7%AE%A1%E7%90%86)、[管理资讯系统](https://zh.wikipedia.org/wiki/%E7%AE%A1%E7%90%86%E4%BF%A1%E6%81%AF%E7%B3%BB%E7%BB%9F)、[企业资源计划](https://zh.wikipedia.org/wiki/%E4%BC%81%E4%B8%9A%E8%B5%84%E6%BA%90%E8%AE%A1%E5%88%92)、开票系统、[人力资源管理](https://zh.wikipedia.org/wiki/%E4%BA%BA%E5%8A%9B%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86)、[内容管理](https://zh.wikipedia.org/wiki/%E5%85%A7%E5%AE%B9%E7%AE%A1%E7%90%86)、以及服务台管理[[5]](https://zh.wikipedia.org/zh-hk/%E8%BD%AF%E4%BB%B6%E5%8D%B3%E6%9C%8D%E5%8A%A1#cite_note-5)。软件即服务已经被吸纳进所有领先的[企业级软件](https://zh.wikipedia.org/wiki/%E4%BC%81%E4%B8%9A%E7%BA%A7%E8%BD%AF%E4%BB%B6)公司的战略中[[6]](https://zh.wikipedia.org/zh-hk/%E8%BD%AF%E4%BB%B6%E5%8D%B3%E6%9C%8D%E5%8A%A1#cite_note-6)。这些公司的最大的卖点之一就是通过将硬件和软件维护及支援外包给软件即服务的提供者，来降低资讯科技（Information Technology，简称 IT）成本[[7]](https://zh.wikipedia.org/zh-hk/%E8%BD%AF%E4%BB%B6%E5%8D%B3%E6%9C%8D%E5%8A%A1#cite_note-7)。

根据一份[高德纳集团](https://zh.wikipedia.org/wiki/%E9%AB%98%E5%BE%B7%E7%BA%B3%E5%92%A8%E8%AF%A2%E5%85%AC%E5%8F%B8)（Gartner Group，也称顾能集团）的评估[[8]](https://zh.wikipedia.org/zh-hk/%E8%BD%AF%E4%BB%B6%E5%8D%B3%E6%9C%8D%E5%8A%A1#cite_note-8)，软件即服务的销售在2010年达到了100亿美元，并且曾被预计在2011年要达到121亿美元，比2010年上升20.7%。高德纳集团估计，到2015年，软件即服务的收入将会超过它的2010年的收入的2倍以上，并且达到预计的213亿美元。[客户关系管理](https://zh.wikipedia.org/wiki/%E5%AE%A2%E6%88%B7%E5%85%B3%E7%B3%BB%E7%AE%A1%E7%90%86)系统持续成为软件即服务的最大市场。在客户关系管理市场中的软件即服务曾被预测会从2010年的32亿美元上升到2011年的38亿美元[[9]](https://zh.wikipedia.org/zh-hk/%E8%BD%AF%E4%BB%B6%E5%8D%B3%E6%9C%8D%E5%8A%A1#cite_note-9)。

「软件即服务」（SaaS）的术语被认为是云端运算的命名法的一部分，还有[IaaS](https://zh.wikipedia.org/wiki/%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD%E5%8D%B3%E6%9C%8D%E5%8A%A1)、[PaaS](https://zh.wikipedia.org/wiki/%E5%B9%B3%E5%8F%B0%E5%8D%B3%E6%9C%8D%E5%8A%A1)、[桌面即服务](https://zh.wikipedia.org/w/index.php?title=%E6%A1%8C%E9%9D%A2%E5%8D%B3%E6%9C%8D%E5%8A%A1&action=edit&redlink=1)（DaaS）都被认为是[云端运算](https://zh.wikipedia.org/wiki/%E4%BA%91%E8%AE%A1%E7%AE%97)的学术名称[[10]](https://zh.wikipedia.org/zh-hk/%E8%BD%AF%E4%BB%B6%E5%8D%B3%E6%9C%8D%E5%8A%A1#cite_note-10)。

## **基础设施即服务(LaaS)**

**基础设施即服务**（英语：Infrastructure as a Service，简称  **IaaS**）是提供消费者处理、储存、网络以及各种基础运算资源，以部署与执行操作系统或应用程序等各种软件。

IaaS 是[云服务](https://zh.wikipedia.org/wiki/%E9%9B%B2%E7%AB%AF%E9%81%8B%E7%AE%97)的最底层，主要提供一些基础资源。它与  [PaaS](https://zh.wikipedia.org/wiki/PaaS)  的区别是，用户需要自己控制底层，实现[基础设施](https://zh.wikipedia.org/wiki/%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD)的使用逻辑。

客户端无须购买[服务器](https://zh.wikipedia.org/wiki/%E4%BC%BA%E6%9C%8D%E5%99%A8)、软件等网络设备，即可任意部署和运行处理、存储、网络和其它基本的计算资源，不能控管或控制底层的基础设施，但是可以控制[操作系统](https://zh.wikipedia.org/wiki/%E4%BD%9C%E6%A5%AD%E7%B3%BB%E7%B5%B1)、[储存装置](https://zh.wikipedia.org/wiki/%E5%84%B2%E5%AD%98%E8%A3%9D%E7%BD%AE)、已部署的应用程序，有时也可以有限度地控制特定的网络元件，像是主机端[防火墙](<https://zh.wikipedia.org/wiki/%E9%98%B2%E7%81%AB%E5%A2%99_(%E7%BD%91%E7%BB%9C)>)。 [[1]][https://zh.wikipedia.org/wiki/%E5%9F%BA%E7%A4%8E%E8%A8%AD%E6%96%BD%E5%8D%B3%E6%9C%8D%E5%8B%99#cite_note-1]([2)](<https://zh.wikipedia.org/wiki/%E5%9F%BA%E7%A4%8E%E8%A8%AD%E6%96%BD%E5%8D%B3%E6%9C%8D%E5%8B%99#cite_note-%E9%9B%B21-2>)  下面这些都属于 IaaS。

- [Amazon EC2](https://zh.wikipedia.org/wiki/Amazon_EC2)
- Digital Ocean
- RackSpace Cloud
- [OpenStack](https://zh.wikipedia.org/wiki/OpenStack)

## **平台即服务(PaaS)**

**平台即服务**（英语：platform as a service，[缩写](https://zh.wikipedia.org/wiki/%E7%BC%A9%E5%86%99)：**PaaS**）是一种[云计算](https://zh.wikipedia.org/wiki/%E9%9B%B2%E7%AB%AF%E9%81%8B%E7%AE%97)服务，提供运算平台与解决方案服务。在云计算的典型层级中，PaaS 层介于[软件即服务](https://zh.wikipedia.org/wiki/%E8%BB%9F%E9%AB%94%E5%8D%B3%E6%9C%8D%E5%8B%99)与[基础设施即服务](https://zh.wikipedia.org/wiki/%E5%9F%BA%E7%A4%8E%E8%A8%AD%E6%96%BD%E5%8D%B3%E6%9C%8D%E5%8B%99)之间。

PaaS 提供用户将云端基础设施部署与创建至客户端，或者借此获得使用[编程语言](https://zh.wikipedia.org/wiki/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80)、[程序库](https://zh.wikipedia.org/wiki/%E7%A8%8B%E5%BC%8F%E5%BA%AB)与服务。用户不需要管理与控制云端基础设施（包含网络、服务器、操作系统或存储），但需要控制上层的应用程序部署与应用托管的环境。[[1]](https://zh.wikipedia.org/wiki/%E5%B9%B3%E5%8F%B0%E5%8D%B3%E6%9C%8D%E5%8A%A1#cite_note-nist-1)

PaaS 将软件研发的平台做为一种服务，以[软件即服务](https://zh.wikipedia.org/wiki/%E8%BB%9F%E9%AB%94%E5%8D%B3%E6%9C%8D%E5%8B%99)（SaaS）模式交付给用户。因此，PaaS 也是 SaaS 模式的一种应用。但是，PaaS 的出现可以加快 SaaS 的发展，尤其是加快 SaaS 应用的开发速度。

PaaS 提供软件部署平台（runtime），抽象掉了硬件和操作系统细节，可以无缝地扩展（scaling）。开发者只需要关注自己的业务逻辑，不需要关注底层。下面这些都属于 PaaS。

- [Heroku](https://zh.wikipedia.org/wiki/Heroku)
- [Google App Engine](https://zh.wikipedia.org/wiki/Google_App_Engine)
- [OpenShift](https://zh.wikipedia.org/wiki/OpenShift)
- [AWS Elastic Beanstalk](https://zh.wikipedia.org/wiki/AWS_Elastic_Beanstalk)
