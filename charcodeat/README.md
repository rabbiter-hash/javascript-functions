# charCodeAt()函数

> `charCodeAt()` 是 JavaScript 中 **字符串（String）** 的一个实例方法，用来：
>
> 返回指定位置字符的**UTF-16 编码单元值（0-65535）

## 一、基本参数和用法

### 1.1、用法

```js
str.charCodeAt(index);
```

### 1.2、参数

- `index`： 要获取的字符位置（从0开始）；
- 返回值：一个整数（UTF-16编码）；
- 如果index超出范围 -> 返回NaN；

## 二、基础用法

### 2.1、获取单个字符的编码

```js

let str = "ABC";

console.log(str.charCodeAt(0)); // 65
console.log(str.charCodeAt(1)); // 66
console.log(str.charCodeAt(2)); // 67
// 正好对应unicdoe表中的项
```

### 2.2、遍历字符串并获取编码

```js
let str = "hello";
for(let i=0; i < str.length; i++){
    console.log(str[i], str.charCodeAt(i));
}
/*
    h 104
    e 101
    l 108
    l 108
    o 111
*/

```

### 2.3、判定大小写字母

```js
function isUpperCase(char){
    let code = char.charCodeAt(0);
    // 大写字母是65-90
    return code >= 65 && code <= 90;
}
console.log(isUpperCase("A")); // true
console.log(isUpperCase("a")); // false
```

ASCII 范围：

- A-Z → 65-90
- a-z → 97-122
- 0-9 → 48-57

## 三、常见用法

### 3.1、字符转数字

```js
function charToNumber(char){
    return char.charCodeAt(0) - 48;
}
const result = charToNumber("5");
console.log(result); // 5
console.log(typeof "5"); // string
console.log(typeof result); // number
```

### 3.2、实现简单的凯撒加密（字符位移）

```js
function caesar(str, shift){
    let result = "";
    
    for(let i=0; i<str.length; i++){
        const code = str.charCodeAt(i);
        console.log(code);
        result += String.fromCharCode( code + shfit);
    }
    
    return result;
}
console.log(caesar("ABC", 1)); // BCD
```

### 3.3、判定字符类型

```js
function isDigit(char){
    let code = char.charCodeAt(0);
    return code >= 48 && code <= 57;
}
console.log(isDigit("48")); // true
console.log(isDigit("A")); // false
```

## 四、坑

### 4.1、返回的是 `UTF-16` 编码单元

返回的是`UTF-16`编码单元，不是完整的`unicode`。

JS内部使用 `UTF-16`，对于普通字符没有问题，但是对于`emoji`或者特殊字符就会出问题：

```js
"😊".length; // 2
"😊".charCodeAt(0); // 55357
"😊".charCodeAt(1); // 56842
```

正确获取完整的`Unicode`：用`codePointAt()`

```js
"😊".codePointAt(0); // 128522
```

### 4.2、越界返回NaN

不会报错。

```js
let str = "ABC";
console.log(str.charCodeAt(10)); // NaN
```

值得注意的是，越界会悄悄污染逻辑。

### 4.3、index默认是0

```js
console.log("ABC".charCodeAt()); // 65
// 不传参数默认取第0位；
```

### 4.4、不能直接处理多字节字符遍历

```js
let str = "😊";

for (let i = 0; i < str.length; i++) {
    console.log(str.charCodeAt(i));
}
// 会打印两个数字：65,66
```

正确写法：

```js
let str = "😊";
for (let char of str){
    console.log(char.codePointAt(0));
}
// 128522
```

## 五、其他

### 5.1、底层原理

Js字符串底层是：

>  UTF-16 编码的不可变字符序列

UTF-16 特点：

- 1 个编码单元 = 16 位
- 普通字符 → 1 个单元
- emoji / 部分汉字扩展区 → 2 个单元

### 5.2、适合和不适合

适合：

- 判断 ASCII 范围
- 简单加密
- 处理纯英文字符串
-  算法题

不适合：

- 处理 emoji
- 处理复杂 Unicode 字符
- 国际化场景
