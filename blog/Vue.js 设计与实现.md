> 根据《Vue.js 设计与实现》 阅读整理而来

<!-- - 框架设计概览
- 响应系统
- 渲染器
- 组件化
- 编译器
- 服务端渲染 -->

- [第一章 框架设计概览](https://github.com/exposir/exposir.github.io/issues/9)
- [第二章 框架设计的核心要素](https://github.com/exposir/exposir.github.io/issues/9#issuecomment-1262427442)

## 第一章 框架设计概览

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

```jsx
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

```jsx
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

## 第二章 框架设计的核心要素

- 提升用户的开发体验
- 控制框架代码的体积
- 框架要做到良好的 Tree-Shaking
- 框架应该输出怎样的构建产物（IIFE、ESM、CJS）

