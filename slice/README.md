# slice()函数

> slice() 是JavaScript中一个非常核心且高频使用的方法，主要用于：
>
>  截取数组的一部分
>
>  截取字符串的一部分
>
>  做“浅拷贝”
>
>  处理函数参数（类数组转数组）

它不会修改原数据（这一点非常重要）。

## 一、Array基本参数和用法

> Array.prototype.slice()

### 1.1、语法

```js
arr.slice(start, end)
```

#### 1.1.1、参数解释

##### 1.1.1.1、start

- 类型：number；
- 是否必须：否；
- 说明：起始索引（包含）；

##### 1.1.1.2、end

- 类型：number；
- 是否必须：否；
- 说明：结束索引（不包含）；

#### 1.1.2、规则

> 左闭右开区间
>
> [start, end)

包前不包后。

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.slice(1, 4)); 
// [2, 3, 4];
```

#### 1.1.3、参数详解

##### 1.1.3.1、只有start

```js
arr.slice(2);
```

表示：

> 从索引为2一直到数组末尾

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.slice(2));
// [3, 4, 5]
```

##### 1.1.3.2、start 和 end都有

```js
arr.slice(1, 3);
```

从索引1开始到索引为3的位置结束（不包含索引3的值）

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.slice(1, 4));
// [2, 3, 4]
```

#### 1.1.3.3、start为负数

负数表示数组尾部进行计算：

- -1：最后一个
- -2：倒数第二个

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.slice(-1)); // 5
console.log(arr.slice(-2)); // [4, 5]
```

**注**：end为负数

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.slice(1, -1));
// [2, 3, 4]; //也是左闭右开原则。从索引为1的值开始，到索引为-1的元素结束（不包含索引为-1的元素）
```

#### 1.1.3.4、start  > end

返回空数组

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.slice(2, 1));
```

#### 1.1.3.5、end大于数组长度

返回从start到数组末尾的所有元素

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.slice(1, 1000)); 
// [2, 3, 4, 5]
```



## 二、常见用法

### 2.1、数组浅拷贝

```js
const arr = [1, 2, 3];
const copy = arr.slice();
console.log(copy);
```

等价于：

```js
const copy = [...arr];
```

注意：是浅拷贝

```js
const arr = [{a:1}];
const copy = arr.slice();

copy[0].a = 100;
console.log(arr[0].a); // 100
```

### 2.2、截取部分数据（分页）

```js
function paginate(arr, page, size){
    const start = (page - 1) * size;
    const end = start + size;
    return arr.slice(start, end);
}
```

### 2.3、删除前n项

```js
arr.slice(n);
```

### 2.4、获取最后n项

```js
arr.slice(-n);
```

### 2.5、类数组转数组

```js
function test(){
    const args = Array.prototpye.slice.call(arguments);
    console.log(args);
}
```

等价现代写法：

```js
const args = Array.from(arguments);
```

## 三、slice的底层特性

### 3.1、不会改变原数组

```js
const arr = [1, 2, 3];
arr.slice(1);
console.log(arr);
// [1, 2, 3];
```

### 3.2、返回新数组

```js
const arr = [1, 2, 3];
console.log(arr === arr.slice()); // false
```

