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
