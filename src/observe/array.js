// 重写的数组7个变异方法  push shift unshift pop reverse sort splice
let oldArrayMethods = Array.prototype;
// value.__proto__  = arrayMethods 原型链查找的问题， 会向上查找，先查找我重写的，重写的没有会继续向上查找
// arrayMethods.__proto__ = oldArrayMethods
export let arrayMethods = Object.create(oldArrayMethods);

const methods = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];
methods.forEach((method) => {
  arrayMethods[method] = function (...args) {
    // AOP切片编程
    let result = oldArrayMethods[method].apply(this, args); // 调用原生的数组方法
    // push unshift 添加的元素可能还是一个对象
    let inserted; // 当前用户插入的元素
    let ob = this.__ob__; // 这里的this 是value
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
      case "splice":
        inserted = args.slice(2);
      default:
        break;
    }
    if (inserted) ob.observeArray(inserted); // 将新增的属性继续观测

    return result;
  };
});
