# reduce 函数

> reduce是数组的方法，用于**把数组缩减成一个值**（可以是数字、字符串、对象、数组等）

## 一、基础用法

```js
array.reduce(callable, initialValue)
```

### 1.1、参数解析

#### 1.1.1、callback（必须）

执行数组中的每个元素的函数，接受**4**个参数：

```js
callback(accumulator, currentValue, currentIndex, array)
```

- accumulator（累加器）：上一次回调的返回值，或者`initialValue`；
- currentValue（当前元素）：正在处理的数组元素；
- currentIndex（当前索引）：正在处理元素的索引；
- `array`（原数组）：调用`reduce`的数组本身。

#### 1.1.2、`initialValue（可选）`

累加器（accumulator）的初始值，如果不传：

- `reduce`会把数组的**第一个元素**作为`accumulator`的初始值，**回调从第二个元素开始执行**；
- 如果数组为空且没有`initialValue`，会报错——**TypeError**

### 1.2、基本用法示例

#### 1.2.1、数组求和

```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, curVal)=>sum + curVal, 0);

console.log(sum); // 15
```

解释：

- 初始`acc=0`，第一次执行`0+1=1`；
- 第二次执行`1+2=3`；
- ...直到最后返回15；

#### 1.2.2、数组求积（乘法）

```js
const numbers = [1, 2, 3, 4, 5];
const multiArray = numbers.reduce((acc, curVal)=>acc * curVal, 1);

console.log(multiArray); // 120
```

### 1.3、复杂用法

#### 1.3.1、数组去重

```js
const arr = [1, 2, 2, 3, 4, 4, 5];
const uniqueArr = arr.reduce((acc, cur) => {
    if(!acc.includes(cur)) {
        acc.push(cur);
    }
    return acc;
}, []);
```

*****注： 这里用 **空数组 `[]` 作为初始值**，累加不重复元素。

#### 1.3.2、统计对象数组中的某个字段

```js
const people = [
    { name: "Alice", age: 21 },
    { name: "Bob", age: 25 },
    { name: "Alice", age: 22 },
];

const countByName = people.reduce((acc, cur)=>{
    acc[cur.name] = (acc[cur.name] || 0) + 1;
}, {});
console.log(countByName);
```

### 1.4、常见的坑和注意点

#### 1.4.1、初始值没给的情况

```js
[].reduce((acc, cur) => acc + cur); 
// TypeError: Reduce of empty array with no initial value
```

- 空数组 **必须提供 `initialValue`**

- 非空数组没提供，`reduce` 会用第一个元素作为初始值，从第二个元素开始执行回调。

#### 1.4.2、回调必须返回累加器

```js
[1,2,3].reduce((acc, cur)=>{acc + cur}); // undefined
```

- 上面会返回 `undefined`，因为用 `{}` 包裹没有 `return`。

- 正确写法：

  ```js
  [1,2,3].reduce((acc, cur) => acc + cur, 0);
  ```

  或者：

  ```js
  [1,2,3].reduce((acc, cur) => { return acc + cur }, 0);
  ```

#### 1.4.3、不改变原数组

`reduce`是不会改变原数组的。

#### 1.4.4、累加器类型要注意

累加器可以是数字、字符串、数组、对象等，但要注意初始类型，最好明确指定`initialValue`。

### 1.5、进阶用法

#### 1.5.1、扁平化数组

```js
const nestedArr = [[1,2],[3,4],[5]];
const flatArr = nestedArr.reduce((arr, cur)=>acc.concat(cur), []);

console.log(flatArr);
```

#### 1.5.2、将数组转对象

```js
const keys = ['a', 'b', 'c'];
const values = [1, 2, 3];
const convert2Obj = keys.reduce((acc, key, i) => {
    acc[key] = values[i];
    return acc;
},{})

console.log(convert2Obj);
```

### 1.6、总结

1. **尽量总是提供 `initialValue`**，可避免空数组报错，也保证类型一致。

2. **回调必须返回累加器**，否则结果会错。

3. **适合做数组聚合、统计、去重、扁平化**。

4. **不要把 `reduce` 用得太复杂**，有时候用 `map` + `filter` 可读性更高。