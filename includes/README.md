# includes()函数

> `includes()` 用来**判断某个值是否存在于数组或字符串中**，返回 **boolean**。

## 一、基本参数和用法

### 1.1、数组includes()

```js
arr.includes(searchElement, fromIndex);
```

#### 1.1.1、参数解析

#### 1.1.2、searchElement

需要查找的元素

#### 1.1.3、fromIndex（可选）

从哪个索引开始查找。

### 1.2、字符串includes()

```js
str.includes(searchString, position)
```

#### 1.2.1、searchString

需要查找的子字符串

#### 1.2.2、position（可选）

从第几个字符开始

## 二、常用用法

### 2.1、数组includes

#### 2.1.1、判断数组中是否包含某个值

```js
// ================================================
// 1.1 判断数组中是否包含某值
// ================================================
const nums = [1, 2, 3, 4];

console.log(nums.includes(3)); // true
console.log(nums.includes(5)); // false
```

#### 2.1.2、指定起始查找位置

```js
const arr = [1, 2, 3, 2];
console.log(arr.includes(2, 2)); // true (从索引2开始)
console.log(arr.includes(2, 3)); // true
console.log(arr.includes(2, 4)); // false
```

#### 2.1.3、负数索引

```js
const arr = [1, 2, 3, 4];

console.log(arr.includes(2, -3)); 
// 等价于 arr.includes(2, arr.length - 3);
// 也就是从索引为 1 开始
```

### 2.2、字符串includes()的常见用法

#### 2.2.1、判断子串是否存在

```js
const str = "JavaScript is awesome!";

console.log(str.includes("Script")); // true
console.log(str.includes("script")); // flase（区分大小写）
```

#### 2.2.2、搜索 、过滤

```js
const keyword = 'js';
const title = 'Learn JavaScript Today';
console.log(title.toLowerCase().includes(keyword)); // true
```

## 三、includes() 和 indexOf()

`includes()`可以判定`NaN`

```js
[NaN].includes(NaN); // true
[NaN].indexOf(NaN); // -1
```

## 四、includes()常见坑

### 4.1、includes 不能用于对象深比较

```js
const arr = [{a:1}];
console.log(arr.includes({a:1})); // false
```

比较的是引用地址，不是内容

可以使用：

```js
arr.some(item => item.a === 1);
```

### 4.2、数组元素是对象 、数组

```js
const a = {x:1};
const arr = [a];
console.log(arr.includes(a)); // true
console.log(arr.includes({x:1})); // false
```

同一个引用才算相等

### 4.3、includes不能做为条件判断逻辑

```js
if(arr.includes){
    //永远为true
}

// 正确姿势
if(arr.includes(value)){
    // statements
}
```

### 4.4、includes 不等于 模糊匹配

```js
["apple", "bannanaf"].includes("app"); //false
```

数组`includes()`是严格匹配元素.

## 五、实例

### 5.1、权限白名单判定

```js
const roles = ["admin", "editor"];
if(roles.includes(userRole)){
    // statment
}
```

### 5.2、状态判定

```js
const doneStatus = ["success", "finished"];
doneStatus.includes(status)
```

### 5.3、防止重复添加

```js
if(!arr.includes(value)){
    arr.push(value);
}
```

### 5.4、与filter和some搭配

```js
const blacklist = ["spam", "ad"];
words.filter(word => !blacklist.includes(word));
```

