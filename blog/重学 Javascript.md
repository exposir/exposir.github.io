# 重学 Javascript

> Javascript 高级程序设计 + Modern JavaScript Tutorial + MDN

[现代 JavaScript 教程](https://zh.javascript.info/)

[MDN Web Docs](https://developer.mozilla.org/zh-CN/)

- [第一章 什么是 JavaScript](https://github.com/exposir/exposir.github.io/discussions/22)
- [第二章 HTML 中的 JavaScript](https://github.com/exposir/exposir.github.io/discussions/22#discussioncomment-3765300)
- [第三章 语言基础](https://github.com/exposir/exposir.github.io/discussions/22#discussioncomment-3765301)
- [第四章 变量、作用域与内存](https://github.com/exposir/exposir.github.io/discussions/22#discussioncomment-3765302)
- [第五章 基本引用类型](https://github.com/exposir/exposir.github.io/discussions/22#discussioncomment-3765303)
- [第六章 集合引用类型](https://github.com/exposir/exposir.github.io/discussions/22#discussioncomment-3765304)
- [第七章 迭代器与生成器](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262431437)
- [第八章 对象、类与面向对象编程](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262432663)
- [第九章 代理与反射](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262433176)
- [第十章 函数](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262433322)
- [第十一章 期约与异步函数](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262433901)
- [第十二章 BOM](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262434123)
- [第十三章 客户端检测](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262434278)
- [第十四章 DOM](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262434580)
- [第十五章 DOM 扩展](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262434857)
- [第十六章 DOM2 和 DOM3](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262435740)
- [第十七章 事件](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262436326)
- [第十八章 动画与 Canvas 图形](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262437184)
- [第十九章 表单脚本](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262437461)
- [第二十章 Javascript API](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262437634)
- [第二十一章 错误处理与调试](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262437776)
- [第二十二章 处理 XML](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262437933)
- [第二十三章 JSON](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262438107)
- [第二十四章 网络请求与远程资源](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262438313)
- [第二十五章 客户端存储](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262439053)
- [第二十六章 模块](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262439229)
- [第二十七章 工作者线程](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262439385)
- [第二十八章 最佳实践](https://github.com/exposir/exposir.github.io/issues/1#issuecomment-1262439561)

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

## 第五章 基本引用类型   [⬆️](/exposir/exposir.github.io/issues/1)

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

## 第六章 集合引用类型  [⬆️](/exposir/exposir.github.io/issues/1)

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
