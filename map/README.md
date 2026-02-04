# map函数

> JavaScript 中的 `Array.prototype.map()`

## 一、基本用法和参数

```js
array.map(callbackFn, thisArg?)
```

### 1.1、参数解析

#### 1.1.1、callbackFn（必传）

```js
(element, index, array) => newElement
```

- `element`：当前遍历到的元素（最常用）
- `index`：当前索引（可选）
- `array`：原数组（极少用）
- **返回值**：会成为新数组中的对应项 ⭐

#### 1.1.2、thisArg（可选）

- 指定 `callbackFn` 中 `this` 的指向
- 实际项目中 **99% 不用**

## 二、常见用法

### 2.1、数组映射（——对应变换）

```js
const nums = [1, 2, 3];
const res = nums.map(n=>n * 2); // [2, 4, 6]
```

> **核心：**
>
> - 原数组有多少项
> - 新数组就有多少项
> - 顺序不变

### 2.2、提取对象中的某个字段

```js
const users = [
    {id: 1, name: "bob"},
    {id: 2, name: "alanb"},
];
const userNames = users.map( u => u.name);
console.log(userNames); // ['bob', 'alanb']
```

### 2.3、结构转换（后端——>前端常见）

```js
const data = [
    {id: 1, price: 100},
]
const res = data.map( item => ({
    value: item.id,
    lable: item.price + "元",
}));
console.log(res); 
```

### 2.3、字符串数组处理成数字数组

```js
console.log(['1', '2', '3'].map(Number));
// [1, 2, 3]
```

不要写成：

```js
consoe.log(['1','2', '3'].map(parseInt)); 
//[1, NaN, NaN]
```

> 原因：
>  `parseInt(value, index)`
>  index 被当成 radix（进制）了（经典大坑）

## 三、map的核心特性

### 3.1、map一定返回【新数组】

```js
const arr = [1, 2, 3];
const res = arr.map( x => x);

console.log(res === arr); // false
```

###  3.2、map不会改变原数组

```js
const arr = [1, 2, 3];
const res = arr.map( x => x*2);
console.log(arr) // [1, 2, 3]
```

## 四、map常见坑

### 4.1、忘记return

```js
[1, 2, 3].map(n => {
    n * 2;
});
// [undefined, undefined, undefined]
```

应该：

```js
[1, 2, 3].map( n => n * 2);
// 或者
[1, 2, 3].map( n => {
    return n * 2;
})
```

### 4.2、用map做【副业】

```js
const res = [];
[1, 2, 3].map( n => {
    res.push(n * 2);
});
```

循环是`foreach`的工作，应该写作：

```js
[1, 2, 3].forEach( n => res.push(n * 2));
```

> **xx**：
>
> - **map：我要一个新数组**
> - **forEach：我只是循环干点事**

### 4.3、map不能中断

```js
[1, 2, 3, 4].map(n => {
    if(n===2) return;
    return n;
});
```

> 不能有 break / continue
>
> 只能返回 `undefined`

### 4.4、稀疏数组问题

```js
const arr = [1, , 3];
arr.map( x => x * 2);
// [2, empty, 6]
```

