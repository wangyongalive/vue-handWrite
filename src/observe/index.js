// 在data中的数据 都使用Object.defineProperty()重新定义 es5
// Object.defineProperty()不能兼容ie8及以下 vue2无法兼容ie8版本
export function observe(data) {
  console.log(data);
}
