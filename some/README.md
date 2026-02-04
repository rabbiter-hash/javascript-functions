# some函数

> `some`：数组中【只要有一个元素】满足条件，就返回`true`，否则返回`flase`。
>
> 短路判定：有就行。

## 一、基本用法和参数

```js
arr.some(callack(element, index, array), thisArg);
```

### 1.1、参数解析

#### 1.1.1、callback（必须）

```js
(element, index, array) => boolean
```

- element：当前遍历的元素
- index：当前元素的索引；
- array：原数组；

**callback必须返回布尔值（或可转成布尔）**

#### 1.1.2、thisArg（可选，冷门但有坑）

```js
arr.some(function(item){
    return item > this.limit
}, {limit: 10})
```

指定callback内的`this`

> 箭头函数用不到`thisArg`（箭头函数没有自己的`this`）

## 二、常用的用法（必会）

#### 2.1、用法1：是否存在某个值（经典）

```js
const nums = [1, 3, 5, 8];
nums.some(n => n % 2===0); // true
```

### 2.2、用法2：是否存在【不合法数据】（常见）

```js
const inputs = ['123', '45', 'abc'];
console.log(inputs.some(v => isNaN(v)));
```

> 表单校验 / 数据清洗必用

### 2.3、用法3：对象数组中是否有符合条件的对象

```js
const users = [
    {
        name: 'Tom', banned: false
    },
    {
        name: 'Jerry', banned: true
    }
]

console.log(users.some(u => u.banned)); // true
```

### 2.4、配合字符串

```js
const keywords = ["js", "vue", "react"];
const title = "learn react hooks";
console.log(keywords.some( k => title.includes(k))); // true
```

### 2.5、替换复杂的if/for

#### 2.5.1、老式写法

```js
// 老式写法
let found = false;
for (let i=0; i<=arr.length; i++){
    if(arr[i] > 10){
        found = true;
        break;
    }
}
```

#### 2.5.2、用some

```js
const found = arr.some( f => f >= 10);
```

### 2.6、权限、白名单校验

```js
const roles = ["editor", "user"];
const allow = ["admin", "editor"];

console.log(roles.some(r => allow.includes(r)));
```

## 三、`some`的5个【必踩坑】

### 3.1、不会遍历整个数组（短路）

```js
[1, 2, 3, 4].some( n=>{
    console.log(n);
    return n > 2;
});
```

> 一旦返回true，立刻停止。

### 3.2、空数组永远是flase

```js
[].some( x=> x > 0);
```

可对比方法`every`，空数组就会返回`true`;

### 3.3、不能 async / await（非常重要）

```js
await arr.some(async item => {
  return await check(item)
})
// ❌ 完全不生效

```

> 👉 `some` **不会等待 Promise**

正确做法（之一）：

```js
for (const item of arr) {
  if (await check(item)) return true
}
return false

```

## 四、什么时候“该用 some”？

✔ 只关心 **有没有**
✔ 希望 **提前结束**
✔ 想写 **语义清晰的布尔判断**

❌ 不适合：

- 需要返回元素
- 需要异步
- 需要遍历全部