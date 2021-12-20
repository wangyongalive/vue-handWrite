// 在data中的数据 都使用Object.defineProperty()重新定义 es5
// Object.defineProperty()不能兼容ie8及以下 vue2无法兼容ie8版本
import { isObject } from "../utl/index";

class Observe {
  constructor(value) {
    // vue如果数据的层次过多 需要递归的去解析对象中的属性 依次增加set和get方法
    this.walk(value);
  }
  walk(data) {
    let keys = Object.keys(data); //
    keys.forEach((key) => {
      defineReactive(data, key, data[key]); // 定义响应式数据
    });
  }
}

function defineReactive(data, key, value) {
  observe(value); // 递归实现深度检测
  Object.defineProperty(data, key, {
    set(newVal) {
      if (newVal === value) return;
      observe(newVal); // 继续劫持用户设置的值，因为用户可能设置的值是一个对象
      value = newVal;
    },
    get() {
      //  获取值的时候做一些操作
      return value;
    },
  });
}
export function observe(data) {
  let isObj = isObject(data);
  if (!isObj) {
    return;
  }
  return new Observe(data); // 用来观测数据
}
