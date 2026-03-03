# every()函数

> every() 是数组的迭代方法，用于：
>
> - 判断数组中 `所有元素` 是否都满足某个条件；
> - 只要有一个不满足，就立刻返回`false`
> - 全部满足才会返回`true`

## 一、基本参数和用法

### 1.1、语法

```js
arr.every(callback(element, index, array), thisArg);
```

### 1.2、参数解析

#### 1.2.1、callback（必须）

回调函数，会为数组中的每个元素都执行一次。

它接收三个参数：

- element：当前元素
- index：当前索引
- array：原数组

#### 1.2.2、thisArg（可选）

指定callback里面的`this`指向。

```js
arr.every(function(item){
    return item > this.limit;
}, {limit: 10})
```

## 二、常见用法

### 2.1、判定是否都大于0

```js
const arr = [1, 2, 3, 4, 5];
const result = arr.every(item => item > 0);
console.log(result); // true
```

### 2.2、数组校验

```js
const users = [
    {name: "Tom", age: 20},
    {name: "Jack", age: 30},
];
const isValid = users.every(user => user.age >= 18);
console.log(isValid); // true
```

### 2.3、判定数组是否全部为某类型数据

```js
const example = [1, 2, 3];
const allNumbers = example.every( item => typeof item === "number");
console.log(allNumbers); // true
```

### 2.4、判定数组是否为空

```js
[].every(item => item > 0); //true
```

> 空数组调用every()永远返回true；来源于数学上的“全称命题 vacuously true（空真）”

### 2.5、结合includes判断子集

```js
const arr1 = [1, 2];
const arr2 = [1, 2, 3, 4];
const isSubSet = arr1.every( item => arr2.includes(item));
console.log(isSubSet);
```

### 2.6、配合正则做字符串校验

```js
const chars = ["a", "b", "c"];
const isLowerCase = chars.every( ch => /[a-z]/.test(ch));
console.log(isLowerCase);
```



## 三、核心执行机制

- 从左到右遍历
- 一旦返回false就立刻停止遍历
- 所有都为true才返回true

## 四、执行流程

```js
for (let i = 0; i < arr.length; i++){
    if(!callback(arr[i], i, arr)){
        return false;
    }
}
return true;
```

本质上是：带提前终止功能的for循环。

## 五、对比函数some

some是截取、截断，有一个条件满足就返回。

every是所有，一定要全部满足。

## 六、常见坑

### 6.1、用了大括号忘记return

```js
arr.every(item => {
    item > 0; // 忘记return的情况
})
```

那么结果永远都是`false`；

### 6.2、空数组调用every的时候永远返回true

```js
const arr = [];
if(arr.every(item => item > 0)){
    console.log('全部大于0');
}
```

上面的代码会执行。

### 6.3、不会遍历空位（稀疏数组）

```js
const arr = [1, , 3];
arr.every(item => item !== undefined);
```

中间的空位不会执行`callback`，和`forEach()`一样。

### 6.4、every函数不是返回数组，只会返回boolean

## 七、高阶用法

### 7.1、用every实现类型守卫

```js
function isNumberArray(arr){
    return Array.isArray(arr) && arr.every(item => typeof item === "number");
}
```

### 7.2、做二维数组判断

```js
const matrix = [
    [1, 2],
    [3, 4]
];

const isValidMatrix = matrix.every(
    row => Array.isArray(row) && row.every(n => typeof n === "number");
)
```

