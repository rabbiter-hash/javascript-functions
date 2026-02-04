# sort函数

> `Array.prototype.sort` 的基本语法
>
> 参数只有一个：`compareFunction`，可选，用来定义【两个元素如何比较，谁前谁后】

## 一、基本用法和参数

```js
arr.sort([compareFunction])
```

参数只有一个：`compareFunction`

- **可选**
- 用来定义「两个元素如何比较、谁排前谁排后」

如果 **不传参数**，那坑就开始了 

### 1.1、`compareFunction` 到底是什么

```js
function compare(a, b) {
  return 负数 | 0 | 正数
}
```

- `< 0`：a排在b**前面**；
- `> 0`：a排在b的**后面**；
- `=0` ： 顺序不变；
- 不是返回true / false

### 1.2、排序本质

> sort 会不断拿两个元素 `a` 和 `b`，丢进 compare 函数，看你让谁靠前。

## 二、用法

### 2.1、数值排序

#### 2.1.1、升序

```js
arr.sort((a, b) => a - b);
```

#### 2.1.2、降序

```js
arr.sort((a, b) => b - a);
```

### 2.2、字符串排序

#### 2.2.1、基础字符串排序

```js
['banana', 'apple', 'cherry'].sort(); 
// ['apple', 'banana', 'cherry']
```

不传默认值就直接排出来了；

#### 2.2.2、国际化 、 中文排序

```js
arr.sort((a, b) => a.localeCompare(b));

["张三","李四", "王五"].sort((a, b) => a.localeCompare(b, "zh")); 
```

### 2.3、对象数组排序

#### 2.3.1、按年龄升序

```js
users.sort((a, b) => a.age - b.age);
```

#### 2.3.2、按名字排序

```js
users.sort((a, b) => a.name.localeCompare(b.name));
```

#### 2.3.3、多条件排序（先age，后score）

```js
arr.sort((a, b) => {
    if(a.age !== b.age){
        return a.age - b.age;
    }
    return b.score - a.score;
})
```

**说明：**第一个条件不等就直接 return

## 三、坑

### 3.1、不传参数时的默认行为

#### 3.1.1、相对数字（会影响排序）

默认是 按字符串 `Unicode` 排序

```js
[10, 2, 1].sort();
// => [1, 10, 2]
```

所有元素先转成字符串

再按 Unicode（字典序）比较

#### 3.1.2、相对字符串（正常行为）

```js
["banana", "apple", "cherry"].sort();
// ["apple", "banana", "cherry"]
```

### 3.2、sort会修改原数组

```js
const arr = [3, 1, 2];
const res = arr.sort((a, b) => a - b);

console.log(arr === res) // true
```

**注：不是返回新数组**

如果不需要改原数组：

```js
const arr = [3, 1, 2];
cosnt res = [...arr].sort((a, b) => a - b);
console.log(arr === res); // false
```

### 3.3、compare 函数返回 true / false （错误）

```js
// 错误示例
arr.sort((a, b) => a > b); // 这是错误的
```

实际返回的是`true/false ` -> 会被转成`1/0`，排序结果不稳定，跟浏览器相关。所以一定要使用：

```js
arr.sort((a, b) => a - b);
```

## 四、高级用法

### 4.1、先映射再排序

能提高性能和可读性。

```js
arr.map( item => ({item, key: item.age})).sort((a, b) => a.key - b.key).map(obj => obj.item);
```

### 4.2、按时间排序

```js
arr.sort((a, b) => new Date(a.date) - new Date(b.date));
```

更快的方法：

```js
arr.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
```

## 五、总结

`sort` 的核心是 **compare 函数返回数值而不是布尔值**，
 默认按字符串排序，**会修改原数组**，
 数值排序用 `a - b`，字符串排序用 `localeCompare`。

## 六、几个例子

### 6.1、数字升序  / 降序

#### 6.1、升序

```js
const nums = [10, 2, 5, 1, 9];

nums.sort((a, b) => a - b);
console.log(nums); // [1, 2, 5, 9, 10]
```

#### 6.2、降序

```js
const nums = [10, 2, 5, 1, 9];
nums.sort((a, b) => b - a);
console.log(nums); //[10, 9, 5, 2, 1]
```

### 6.2、字符串排序

#### 6.2.1、英文字符串排序

```js
const fruits = ["banana", "apple", "cherry"];
fruits.sort();
console.log(fruits); // ["apple", "banana", "cherry"]
```

#### 6.2.2、中文排序

```js
const names = ["张三", "李四", "王五"];
names.sort((a, b) => a.localeCompare(b, "zh"));
console.log(names);// ["李四", "王五", "张三"]

```

### 6.3、对象数组

#### 6.3.1、按某个字段排序（年龄）

```js
const users = [
    {name: "Tom", age: 18},
    {name: "Lucy", age: 22},
    {name: "Jack", age: 20}
]
users.sort((a, b) => a.age - b.age);
console.log(users);
```

#### 6.3.2、按字符串排序（姓名）

```js
const users = [
    {name: "Tom", age: 18},
    {name: "Lucy", age: 22},
    {name: "Jack", age: 20}
]
users.sort((a, b) => a.name.localeCompare(b.name));
```

### 6.4、多条件排序

#### 6.4.1、先按年龄排序（升序），如果年龄相等，就按分数排序（降序）

```js
const students = [
  { name: "A", age: 18, score: 90 },
  { name: "B", age: 18, score: 95 },
  { name: "C", age: 20, score: 88 }
];
students.sort((a, b)=>{
    if(a.age !== b.age){
        return a.age - b.age;
    }
    return b.score - a.score;
})
```

### 6.5、时间、日期排序

#### 6.5.1、按时间从早到晚

```js
const posts = [
    {title: "A", time: "2024-01-10"},
    {title: "B", time: "2023-12-01"},
    {title: "C", time: "2025-02-25"},
];
posts.sort((a, b) => Date.parse(a.time) - Date.parse(b.time));
console.log(posts);
```

### 6.6、不修改原数组的安全写法

#### 6.6.1、保留原数组

```js
const arr = [3, 1, 2];
const res = [...arr].sort((a, b) => a-b);
console.log(arr);
console.log(res);
```

#### 6.6.2、特殊值处理（undefined / null ）

```js
const arr = [3, undefined, 1, 2];

arr.sort((a, b) => (a ?? Infinity) - (b ?? Infinity));
console.log(arr);
// [ 1, 2, 3, undefined ]

```

### 6.7、反写 compare 

```js
const arr = [1, 2, 3];
arr.sort((a, b) => {
    console.log(a, b, a-b);
    return a - b;
})
```

