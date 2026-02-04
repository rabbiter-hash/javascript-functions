# filter()函数

> 从数组中“筛选”出满足条件的元素，返回一个新数组
>
> 核心特征记牢：
>
> -  **返回新数组**
> -  **不修改原数组**
> -  **返回的数组长度 ≤ 原数组**
> -  **不会改变元素本身（除非你在回调里手动改）**

## 一、基本参数和用法

```js
array.filter(callback, thisArg);
```

### 1.1、参数解析

#### 1.1.1、callback（核心和必须）

```js
(element, index, array) => boolean
```

- `element`：当前遍历到的元素
- `index`：当前元素的索引
- `array`：原数组

返回的值必须是`boolean`（或能转成boolean）

- true：保留这个元素
- false：丢弃这个元素

#### 1.1.2、thisArt（几乎不用）

```js
array.filter(function(item){
    return item > this.min
}, {min: 10})
```

- 作为callback里的this；
- 箭头函数会忽略它；

## 二、常见用法

### 2.1、筛选数字

```js
const nums = [1, 2, 3, 4, 5];
const even = nums.filter( t => t%2 ===0 );
console.log(even) // [2, 4]
```

### 2.2、筛选对象数组（高频）

```js
const users = [
    { name: "Tom", age: 18},
    { name: "Jerry", age: 22},
    { name: "Lucy", age: 16}
]
const audlts = users.filter( u => u.age > 18);
console.log(audlts); // Tom, Jerry
```

### 2.3、条件组合（逻辑与/或）

```js
products.filter(p => p.price > 100 && p.stock > 0)
```

## 三、filter的本质

> 本质就是**循环**+**条件判定**

```js
const result = [];
for(let i=0; i < arr.length; i++){
    if(callback(arr[i], i, arr)){
        result.push(arr[i])
    }
}

return result
```

注意：push 的是“原元素”，不是回调的返回值！

## 四、filter常见坑

### 4.1、filter不能“修改元素”

```js
const test = [1, 2, 3].filter(x => x*2);

console.log(test); //[ 1, 2, 3 ]
```

解释：

- `x * 2`返回的是 `2/4/6`；
- JS会转成` boolean`；
- 非0就是true；
- 所以结果应该是`[1, 2, 3]`

`filter`不负责变形，**只负责筛选**，要生成新数据应该用map.

```js
const test = [1, 2, 3].filter(x => x > 1).map( x => x * 2);
console.log(test); // [4, 6]
```

### 4.2、忘记return

在不使用箭头函数的时候，忘记使用return

```js
arr.filter( x => {
    x > 10
})
```

等价于：

```js
arr.filter( x => {
    return undeifned
})
```

这样的结果会导致判定的时候全是false，导致结果[]；

正确写法：

```js
arr.filter( x => x > 10);
// 或者
arr.filter( x => {
    return x > 10
})
```

### 4.3、用filter删除某个索引

能用。专家不推荐。

```js
arr.filter((_, index) => index !==2);
```

- 可读性差
- 索引会变化
- 很容易出bug

### 4.4、filter不会扁平化数组

```js
[1, [2, 3], 4].filter(Boolean);
// [1, [2,3], 4]
// filter只看一层；
```

### 4.5、稀疏数组会别跳过

```js
const arr = [1, , 3];
arr.filter(Boolean);
// [1, 3]
```

 空位不会执行 callback

## 五、真实项目常用

### 5.1、搜索功能

```js
list.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()));
```

### 5.2、权限过滤

```js
routes.filter( r => r.meta?.permission)
```

### 5.3、删除空数据再处理

```js
data.filter(Boolean).map(process)
```

## 六、Boolean必会

### 6.1、去掉假值

```js
const arr = [0, 1, '', 'hi', null, undefined, false]
arr.filter(Boolean);
// [1, "hi"]
```

会过滤掉：

- `false`
- `0`
- `''`
- `null`
- `undefined`
- `NaN`

### 6.2、去重（配合indexOf）

```js
const arr = [1, 2, 2, 3, 3];
const unique = arr.filter(
    (item, index, array) => array.indexOf(item)
)
```

时间复杂度 O(n²)，大数组**别用**

更优：

```js
[...new Set(arr)]
```

